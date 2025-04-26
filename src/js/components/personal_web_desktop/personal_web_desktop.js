import TaskbarPWD from './pwd_components/taskbar_pwd/taskbar_pwd.js'

import ProcessIdService from './pwd_services/process_id_service.js'
import RunningProcessesService from './pwd_services/running_processes_service.js'
import DesktopDisplayingService from './pwd_services/desktop_displaying_service.js'
import EventsService from './pwd_services/events_service.js'

import * as SystemApps from './system_apps.js'
import * as UserApps from './user_apps.js'
import background from './background.png'

const settings = {
  taskbarHeight: 44 // height is dictated by the inner items inside the taskbar
}

const template = document.createElement('template')
template.innerHTML = `
<div class="pwd flex justify-center items-center">
    <div class="desktop flex justify-start items-start h-full relative">
        <!-- Content inside desktop -->
    </div>
    <!-- taskbar-pwd is placed here -->
</div>
`

/**
 * Personal Web Desktop environment for web-browser
 *
 * Created by: ea224pg
 * 2024-01-09 Linnaeus University
 */
export default class PersonalWebDesktop extends HTMLElement {
  // used for running programs and creating a process - programs appear in taskbar
  #user_programs
  #system_apps

  // Services
  #runningProcessesService
  #processIdService
  #desktopDisplayService
  #eventsService

  // HTML Elements
  #pwdHTML
  #desktopHTML

  // Web Components
  #taskbarWebComp

  constructor () {
    super()
    this.appendChild(template.content.cloneNode(true))

    this.#pwdHTML = this.querySelector('.pwd')
    this.#desktopHTML = this.querySelector('.desktop')

    // Create Taskbar element
    this.#taskbarWebComp = new TaskbarPWD(settings.taskbarHeight)
    this.#pwdHTML.appendChild(this.#taskbarWebComp)
    this.#taskbarWebComp.classList.add('backdrop-blur-md')

    // Initialize services
    this.#processIdService = new ProcessIdService()
    this.#desktopDisplayService = new DesktopDisplayingService(this.#desktopHTML, this.#pwdHTML)
    this.#runningProcessesService = new RunningProcessesService(
      this.#processIdService,
      this.#desktopDisplayService)
    this.#eventsService = new EventsService(this, this.#runningProcessesService, this.#desktopDisplayService)

    // Configure System Programs
    this.#system_apps = [
      SystemApps.TaskManager_(this.#runningProcessesService)
    ]

    // Configure User Programs
    this.#user_programs = [
      UserApps.QuizGame_(),
      UserApps.MemoryGame_(),
      UserApps.ChatApp_(),
      UserApps.QuotesApp_()
    ]

    // Load System Apps
    this.#system_apps.forEach(systemApp => {
      this.#taskbarWebComp.addTaskbarItem(systemApp)
      this.#runningProcessesService.runProgramSystem(systemApp)
    })

    // Load User Apps
    this.#user_programs.forEach(installedApp => {
      this.#taskbarWebComp.addTaskbarItem(installedApp)
    })
  }

  connectedCallback () {
    this.#eventsService.start()
    this.#desktopDisplayService.setBackgroundImage(background)
  }
}

customElements.define('personal-web-desktop', PersonalWebDesktop)
