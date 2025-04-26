import ProcessWindow from '../pwd_components/process_window/process_window.js'
import Process from '../pwd_modules/process.js'

/**
 * Running Processes Service for the Personal Web Desktop environment
 *
 * Responsible for managing processes running in the OS, as well as closing running and creating new processes
 *
 * Created by: ea224pg
 * 2024-01-09 Linnaeus University
 */
export default class RunningProcessesService {
  #running_processes_by_program_name = new Map()
  #running_processes_by_pID = new Map()
  #running_system_processes_by_program_name = new Map()
  #running_system_processes_by_pID = new Map()

  // Service dependencies
  #processIdService
  #desktopDisplayService

  constructor (processIdService, desktopDisplayService) {
    this.#processIdService = processIdService
    this.#desktopDisplayService = desktopDisplayService
  }

  get running_processes_by_program_name () {
    return this.#running_processes_by_program_name
  }

  #createProcess (program) {
    const uniqueId = this.#processIdService.generateUniqueProcessIDAndAddActive()
    const app = program.createProgramInstance()
    return new Process(program.name, uniqueId,
      new ProcessWindow(
        uniqueId,
        program.iconPath,
        program.name,
        program.options,
        app
      ),
      app
    )
  }

  async runProgram (program) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check if program is a system application
        const systemProgram = this.#running_system_processes_by_program_name.get(program.name)
        if (systemProgram) {
          const process = systemProgram.get(systemProgram.keys().next().value)
          this.#desktopDisplayService.openMinimisedWindow(process.processWindow, process.pID)
          resolve(null)
          return
        }

        // Checks if program options allows to open multiple windows
        if (program.options.multiple_windows === false && this.processGroupNameIsRunning(program.name)) return

        const process = this.#createProcess(program)

        // Show process window on desktop
        // TODO place next window few pixels lower and more to the left
        this.#desktopDisplayService.addProcessWindowToDesktop(process.processWindow, process.pID)

        // Update OS state
        if (this.#running_processes_by_program_name.has(program.name)) {
          this.#running_processes_by_program_name.get(program.name).set(process.pID, process)
        } else {
          const processes = new Map()
          processes.set(process.pID, process)
          this.#running_processes_by_program_name.set(program.name, processes)
        }

        this.#running_processes_by_pID.set(process.pID, process)
        resolve(process)
      }, 0)
    })
  }

  runProgramSystem (systemProgram) {
    setTimeout(() => {
      // Check if already running in the OS
      const name = systemProgram.name
      if (this.#running_system_processes_by_program_name.has(name)) return

      const process = this.#createProcess(systemProgram)

      this.#desktopDisplayService.addProcessWindowToDesktop(process.processWindow, process.pID)
      this.#desktopDisplayService.minimiseWindow(process.processWindow, process.pID)

      const processes = new Map()
      processes.set(process.pID, process)
      this.#running_system_processes_by_program_name.set(name, processes)

      this.#running_system_processes_by_pID.set(process.pID, process)
    }, 0)
  }

  #stopProcess (process) {
    setTimeout(() => {
      this.#running_processes_by_pID.delete(process.pID)
      this.#running_processes_by_program_name.get(process.name).delete(process.pID)

      // Stop and remove process
      if (this.#running_processes_by_program_name.get(process.name).size === 0) this.#running_processes_by_program_name.delete(process.name)

      // Close desktop window
      this.#desktopDisplayService.closeWindow(process.processWindow, process.pID)

      // Remove active IDs
      this.#processIdService.removeActiveProcessId(process.pID)
    }, 0)
  }

  findProcessById (pID) {
    const process = this.#running_processes_by_pID.get(pID)
    const processSystem = this.#running_system_processes_by_pID.get(pID)
    if (process) return process
    if (processSystem) return processSystem
  }

  findSystemProcess (name) {
    const process = this.#running_system_processes_by_program_name.get(name)
    return process.get(process.keys().next().value)
  }

  isProcessSystemApp (pID) {
    return this.#running_system_processes_by_pID.has(pID)
  }

  processGroupNameIsRunning (name) {
    return this.#running_processes_by_program_name.get(name) !== undefined
  }

  processInstancesInGroupNameAreRunning (name) {
    const processGroup = this.#running_processes_by_program_name.get(name)
    if (processGroup !== undefined) {
      return processGroup.size
    }
    return 0
  }

  /**
   * Attempts to close a process
   * @param {number} pID process id
   * @returns {boolean} true if close was successful
   */
  async closeProcess (pID) {
    return new Promise((resolve, reject) => {
      // Minimise system processes
      const systemProcess = this.#running_system_processes_by_pID.get(pID)
      if (systemProcess) {
        this.#desktopDisplayService.minimiseWindow(systemProcess.processWindow, systemProcess.pID)
        resolve(false)
        return
      }

      if (this.#processIdService.isProcessIdActive(pID)) {
        const process = this.findProcessById(pID)
        this.#stopProcess(process)
        process.app.close().then(result => {
          if (result) {
            resolve(true)
          } else {
            resolve(false)
          }
        })
      } else {
        resolve(false)
      }
    })
  }
}
