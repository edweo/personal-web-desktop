/**
 * Events Service for the Personal Web Desktop environment
 *
 * Responsible for handling event listeners in the Document Object Model (DOM) for the OS
 *
 * Created by: ea224pg
 * 2024-01-09 Linnaeus University
 */
export default class EventsService {
  #personalWebDesktop

  // Dependencies Services
  #runningProcessesService
  #desktopDisplayService

  constructor (personalWebDesktop, runningProcessesService, desktopDisplayService) {
    this.#personalWebDesktop = personalWebDesktop
    this.#runningProcessesService = runningProcessesService
    this.#desktopDisplayService = desktopDisplayService
  }

  start () {
    this.#personalWebDesktop.addEventListener('run-program', async e => {
      e.stopPropagation()
      const program = e.program
      this.#runningProcessesService.runProgram(program).then(process => {
        if (process !== null) {
          const taskManager = this.#runningProcessesService.findSystemProcess('Task Manager').app
          taskManager.addProcess(process)
        }
      })
    })

    this.#personalWebDesktop.addEventListener('close-process', async e => {
      e.stopPropagation()
      this.#runningProcessesService.closeProcess(e.pID).then(processClosed => {
        if (!processClosed) return // Ignore failed closed
        const taskManager = this.#runningProcessesService.findSystemProcess('Task Manager').app
        taskManager.removeProcess(e.pID)
      })
    })

    this.#personalWebDesktop.addEventListener('minimise-process', async e => {
      e.stopPropagation()
      const process = this.#runningProcessesService.findProcessById(e.pID)
      this.#desktopDisplayService.minimiseWindow(process.processWindow, e.pID)

      // Ignore system processes, only applies to user apps
      if (!this.#runningProcessesService.isProcessSystemApp(e.pID)) {
        const taskManager = this.#runningProcessesService.findSystemProcess('Task Manager').app
        taskManager.markProcessIsMinimised(e.pID)
        taskManager.unselectEverythingInTaskManager()
      }
    })

    this.#personalWebDesktop.addEventListener('show-minimised-process', async e => {
      e.stopPropagation()
      const process = this.#runningProcessesService.findProcessById(e.pID)
      this.#desktopDisplayService.openMinimisedWindow(process.processWindow, e.pID)

      // Ignore system processes, only applies to user apps
      if (!this.#runningProcessesService.isProcessSystemApp(e.pID)) {
        const taskManager = this.#runningProcessesService.findSystemProcess('Task Manager').app
        taskManager.unmarkProcessIsMinimised(e.pID)
        taskManager.unselectEverythingInTaskManager()
      }
    })

    this.#personalWebDesktop.addEventListener('window-selected', async e => {
      e.stopPropagation()
      this.#desktopDisplayService.makeWindowHighestInDesktop(e.target)
    })

    this.#personalWebDesktop.addEventListener('display-taskbar-tooltip', e => {
      this.#desktopDisplayService.displayTooltip(e.name, e.absoluteParams)
    })

    this.#personalWebDesktop.addEventListener('hide-taskbar-tooltip', e => {
      this.#desktopDisplayService.hideTooltip()
    })
  }
}
