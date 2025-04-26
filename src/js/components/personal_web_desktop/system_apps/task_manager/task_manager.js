import Process from '../../pwd_modules/process.js'

const template = document.createElement('template')
template.innerHTML = `
<div class="task-manager-content">
    <div class="top-bar">
        <div class="top-bar-column column-left"><p class="pl-2">APP</p></div>  
        <div class="top-bar-column column-right"><p class="pr-2">PID</p></div>
    </div>
    
    <div class="process-display"></div>
    
    <div class="actions flex p-1 justify-end gap-1">
        <button class="btn-show-task bg-blue-300 pl-1 pr-1 rounded text-white text-m hover:bg-blue-500 font-bold flex flex-row gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 
            .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 
            .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
          </svg>
          SHOW
        </button>
        <button class="btn-hide-task bg-blue-300 pl-1 pr-1 rounded text-white text-m hover:bg-blue-500 font-bold flex flex-row gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244
            19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 
            10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 
            0-4.243-4.243m4.242 4.242L9.88 9.88" />
          </svg>
          HIDE
        </button>
        <button class="btn-end-task bg-blue-300 pl-1 pr-1 rounded text-white text-m hover:bg-blue-500 font-bold flex flex-row gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 
            12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
          </svg>
          END
        </button>
    </div>
</div>
`

/**
 * Task Manager for the Personal Web Desktop environment (system app)
 *
 * Created by: ea224pg
 * 2024-01-09 Linnaeus University
 */
export default class TaskManager extends HTMLElement {
  #nameGroups = new Map()

  // Dependency services
  #runningProcessesService

  #currentlySelectedRow = null
  #previouslySelectedRow = null
  #currentlySelectedProcessGroup = null

  #processDisplayHTML
  #endTaskBtn
  #showTaskBtn
  #hideTaskBtn

  constructor (runningProcessesService) {
    super()
    this.appendChild(template.content.cloneNode(true))

    this.#processDisplayHTML = this.querySelector('.process-display')
    this.#endTaskBtn = this.querySelector('.btn-end-task')
    this.#showTaskBtn = this.querySelector('.btn-show-task')
    this.#hideTaskBtn = this.querySelector('.btn-hide-task')

    this.#runningProcessesService = runningProcessesService

    this.#endTaskBtn.addEventListener('click', e => {
      e.stopPropagation()
      if (this.#currentlySelectedRow !== null && this.#previouslySelectedRow !== null) {
        const closeEvent = new Event('close-process', { bubbles: true })
        closeEvent.pID = Number(this.#currentlySelectedRow.querySelector('.id').textContent)
        this.dispatchEvent(closeEvent)
        this.#currentlySelectedRow = null
        this.#previouslySelectedRow = null
      } else if (this.#currentlySelectedProcessGroup !== null) {
        const processGroup = this.#findKeyOfProcessGroup(this.#currentlySelectedProcessGroup.parentElement)
        this.#closeAllProcessesBelongingToGroupName(processGroup)
      }
    })

    this.#showTaskBtn.addEventListener('click', e => {
      e.stopPropagation()
      if (this.#currentlySelectedRow !== null && this.#previouslySelectedRow !== null) {
        const pID = Number(this.#currentlySelectedRow.querySelector('.id').textContent)
        const isMinimised = this.#isProcessMinimised(pID)
        if (isMinimised) {
          const showEvent = new Event('show-minimised-process', { bubbles: true })
          showEvent.pID = pID
          this.dispatchEvent(showEvent)
          this.#unselectAnySelectedRows()
          this.unmarkProcessIsMinimised(pID)
        }
      } else if (this.#currentlySelectedProcessGroup !== null) {
        const processGroup = this.#findKeyOfProcessGroup(this.#currentlySelectedProcessGroup.parentElement)
        this.#showAllProcessesBelongingToGroupName(processGroup)
      }
    })

    this.#hideTaskBtn.addEventListener('click', e => {
      e.stopPropagation()
      if (this.#currentlySelectedRow !== null && this.#previouslySelectedRow !== null) {
        const pID = Number(this.#currentlySelectedRow.querySelector('.id').textContent)
        const isMinimised = this.#isProcessMinimised(pID)
        if (!isMinimised) {
          const showEvent = new Event('minimise-process', { bubbles: true })
          showEvent.pID = pID
          this.dispatchEvent(showEvent)
          this.#unselectAnySelectedRows()
        }
      } else if (this.#currentlySelectedProcessGroup !== null) {
        const processGroup = this.#findKeyOfProcessGroup(this.#currentlySelectedProcessGroup.parentElement)
        this.#hideAllProcessesBelongingToGroupName(processGroup)
      }
    })
  }

  #showAllProcessesBelongingToGroupName (groupName) {
    this.#callEventOnAllProcessesWithinGroupName(groupName, 'show-minimised-process')
  }

  #hideAllProcessesBelongingToGroupName (groupName) {
    const processGroup = this.#nameGroups.get(groupName)
    if (!processGroup) return

    // TODO this could be moved to the running processes service, and just make single
    // TODO event call to events service with the desired group name to delete
    const processRowsHTML = processGroup.querySelectorAll('.process-row')
    for (const processRow of processRowsHTML) {
      // TODO could be refactored into #callEventOnAllProcessesWithinGroupName with some predicate function
      const isProcessHidden = processRow.querySelector('.svg-hidden') !== null
      if (!isProcessHidden) {
        const event = new Event('minimise-process', { bubbles: true })
        event.pID = Number(processRow.querySelector('.id').textContent)
        this.dispatchEvent(event)
      }
    }
  }

  #closeAllProcessesBelongingToGroupName (groupName) {
    this.#callEventOnAllProcessesWithinGroupName(groupName, 'close-process')
  }

  #callEventOnAllProcessesWithinGroupName (groupName, eventName) {
    const processGroup = this.#nameGroups.get(groupName)
    if (!processGroup) return

    // TODO this could be moved to the running processes service, and just make single
    // TODO event call to events service with the desired group name to delete
    const processRowsHTML = processGroup.querySelectorAll('.process-row')
    for (const processRow of processRowsHTML) {
      const event = new Event(eventName, { bubbles: true })
      event.pID = Number(processRow.querySelector('.id').textContent)
      this.dispatchEvent(event)
    }
  }

  /**
   * Creates a new name group section in task manager for grouping multiple windows of same app
   * @param {string} groupName name of the application
   * @param {string} iconPath app icon path
   * @returns {HTMLDivElement} returns name group div element
   */
  #createNewNameGroupDivForProcesses (groupName, iconPath) {
    const nameGroup = document.createElement('div')
    nameGroup.classList.add('task-manager-process-group')

    const topBar = document.createElement('div')
    topBar.classList.add('process-group-top-bar')

    topBar.addEventListener('click', e => {
      e.stopPropagation()
      if (this.#currentlySelectedProcessGroup === null) {
        topBar.classList.add('selected-process-group')
        this.#currentlySelectedProcessGroup = topBar
        this.#unselectAnySelectedRows()
      } else if (this.#currentlySelectedProcessGroup === topBar) {
        this.#currentlySelectedProcessGroup.classList.remove('selected-process-group')
        this.#unselectAnySelectedRows()
        this.#unselectAnySelectedProcessGroup()
      } else {
        this.#currentlySelectedProcessGroup.classList.remove('selected-process-group')
        this.#currentlySelectedProcessGroup = topBar
        topBar.classList.add('selected-process-group')
        this.#unselectAnySelectedRows()
      }
    })

    const iconAndNameSection = document.createElement('div')
    iconAndNameSection.classList.add('process-top-bar-title')

    const icon = document.createElement('img')
    icon.src = iconPath
    icon.classList.add('icon')

    const groupNameLabel = document.createElement('label')
    groupNameLabel.classList.add('process-group-name-label')
    groupNameLabel.textContent = groupName

    iconAndNameSection.append(icon, groupNameLabel)

    const arrowDownSVG = this.#createArrowDownButton()
    const showProcessList = e => {
      e.stopPropagation()
      processList.style.display = 'flex'
      arrowDownSVG.removeEventListener('click', showProcessList)
      arrowDownSVG.addEventListener('click', hideProcessList)
      arrowDownSVG.style.transform = 'rotate(180deg)'
    }

    const hideProcessList = e => {
      e.stopPropagation()
      processList.style.display = 'none'
      arrowDownSVG.removeEventListener('click', hideProcessList)
      arrowDownSVG.addEventListener('click', showProcessList)
      arrowDownSVG.style.transform = 'rotate(0deg)'
    }

    arrowDownSVG.addEventListener('click', showProcessList)

    topBar.append(iconAndNameSection, arrowDownSVG)

    const processList = document.createElement('div')
    processList.classList.add('task-manager-process-list')
    processList.style.display = 'none'

    nameGroup.append(topBar, processList)

    this.#nameGroups.set(groupName, nameGroup)
    return nameGroup
  }

  #unselectAnySelectedRows () {
    if (this.#currentlySelectedRow === null) return
    this.#currentlySelectedRow.classList.remove('selected-row')
    this.#currentlySelectedRow = null
    this.#previouslySelectedRow = null
  }

  #unselectAnySelectedProcessGroup () {
    if (this.#currentlySelectedProcessGroup === null) return
    this.#currentlySelectedProcessGroup.classList.remove('selected-process-group')
    this.#currentlySelectedProcessGroup = null
  }

  unselectEverythingInTaskManager () {
    this.#unselectAnySelectedProcessGroup()
    this.#unselectAnySelectedRows()
  }

  #createHiddenSVGElement () {
    const hiddenSvg = document.createElement('div')
    hiddenSvg.classList.add('svg-hidden')

    // TODO using innerHTML might not be a safe option, could create a new custom element or somehow use textContent
    hiddenSvg.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244
    19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 
    10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 
    0-4.243-4.243m4.242 4.242L9.88 9.88" />
    </svg>
    `
    return hiddenSvg
  }

  #createArrowDownButton () {
    const svg = document.createElement('button')
    svg.classList.add('task-manager-process-group-button')

    // TODO using innerHTML might not be a safe option, could create a new custom element or somehow use textContent
    svg.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
    stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
    `
    return svg
  }

  /**
   * Add process to the task manager
   * @param {Process} process pwd process
   */
  addProcess (process) {
    const groupNameCount = this.#getTotalRunningProcessesByName(process.name)
    let nameGroup
    let isNewNameGroup = false
    if (groupNameCount === 1) { // Create new group in task manager
      nameGroup = this.#createNewNameGroupDivForProcesses(process.name, process.processWindow.iconPath)
      isNewNameGroup = true
    } else if (groupNameCount > 1) { // Add to current group in task manager
      nameGroup = this.#nameGroups.get(process.name)
    } else {
      throw new Error('ERROR: Something happened while adding process in task manager')
    }

    const row = document.createElement('div')
    row.classList.add(...['process-row', `id-${process.pID}`])

    const processDiv = document.createElement('div')
    processDiv.classList.add(...['column-left', 'process-name'])
    processDiv.textContent = process.name

    const icon = document.createElement('img')
    icon.src = process.processWindow.iconPath
    icon.classList.add('icon')

    processDiv.prepend(icon)

    const id = document.createElement('div')
    id.classList.add(...['column', 'id'])
    id.textContent = process.pID

    row.append(processDiv, id)

    row.addEventListener('click', e => {
      row.classList.add('selected-row')

      if (this.#currentlySelectedRow === null && this.#previouslySelectedRow === null) {
        this.#currentlySelectedRow = row
        this.#previouslySelectedRow = row
        this.#unselectAnySelectedProcessGroup()
      } else {
        this.#currentlySelectedRow.classList.remove('selected-row')
        if (this.#currentlySelectedRow === row) {
          this.#currentlySelectedRow = null
          this.#previouslySelectedRow = null
        } else {
          this.#previouslySelectedRow = this.#currentlySelectedRow
          this.#currentlySelectedRow = row
        }
        this.#unselectAnySelectedProcessGroup()
      }
    })

    nameGroup.querySelector('.task-manager-process-list').appendChild(row)
    this.#refreshNameGroupActiveProcessesCount(process.name, groupNameCount)

    // Does not re-append existing name group, which moves it down in the task manager
    if (isNewNameGroup) this.#processDisplayHTML.append(nameGroup)
  }

  /**
   * Returns the total amount of instances running of a specific application of name
   * @param {string} processName name of the process
   * @returns {number} processes running count
   */
  #getTotalRunningProcessesByName (processName) {
    return this.#runningProcessesService.processInstancesInGroupNameAreRunning(processName)
  }

  #refreshNameGroupActiveProcessesCount (nameOfGroupName, count) {
    const nameGroup = this.#nameGroups.get(nameOfGroupName)
    if (nameGroup) {
      nameGroup.querySelector('.process-group-name-label').innerText = `${nameOfGroupName} (${count})`.toString()
    }
  }

  #isProcessMinimised (pID) {
    const processRow = this.#findRowByProcessId(pID)
    return processRow.classList.contains('process-minimised')
  }

  markProcessIsMinimised (pID) {
    const processRow = this.#findRowByProcessId(pID)
    processRow.querySelector('.process-name').append(this.#createHiddenSVGElement())
    processRow.classList.add('process-minimised')
  }

  unmarkProcessIsMinimised (pID) {
    const processRow = this.#findRowByProcessId(pID)
    const markedSvgHTML = processRow.querySelector('.svg-hidden')
    if (markedSvgHTML) {
      markedSvgHTML.remove()
      processRow.classList.remove('process-minimised')
    }
  }

  removeProcess (pID) {
    const processRow = this.#findRowByProcessId(pID)
    const processGroupList = processRow.parentElement
    const processGroup = processGroupList.parentElement
    processRow.remove()
    this.#currentlySelectedRow = null
    this.#previouslySelectedRow = null

    // Remove name group from task manager if it is the last process since we do not need to display empty app groups
    const processesCount = processGroupList.childElementCount
    if (processesCount === 0) {
      const keyOfGroupName = this.#findKeyOfProcessGroup(processGroup)
      if (keyOfGroupName !== null) {
        this.#nameGroups.delete(keyOfGroupName)
        processGroup.remove()
      } else {
        throw new Error('ERROR: Something happened when removing process group in task manager')
      }
    } else { // Update current count of apps open in the task manger UI
      const processGroupKey = this.#findKeyOfProcessGroup(processGroup)
      if (processGroupKey !== null) {
        this.#refreshNameGroupActiveProcessesCount(processGroupKey, processesCount)
      } else {
        throw new Error('ERROR: Something happened and group process was not found')
      }
    }
  }

  #findRowByProcessId (pID) {
    return this.#processDisplayHTML.querySelector(`.id-${pID}`)
  }

  #findKeyOfProcessGroup (processGroupHTML) {
    for (const [key, value] of this.#nameGroups.entries()) {
      if (value === processGroupHTML) {
        return key
      }
    }
    return null
  }

  // DEPRECATED - NOT USED: would need updating to use the #nameGroups MAP variable if implemented
  #updateAllProcesses (runningProcessesService) {
    this.#processDisplayHTML.textContent = ''

    // Display running processes
    for (const [, processMap] of runningProcessesService.running_processes_by_program_name) {
      for (const [, process] of processMap) {
        this.addProcess(process)
      }
    }
  }

  async close () {
    return true
  }
}

customElements.define('task-manager', TaskManager)
