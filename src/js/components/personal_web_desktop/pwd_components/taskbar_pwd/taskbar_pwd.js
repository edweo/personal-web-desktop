import TaskbarItem from '../taskbar_item/taskbar_item.js'

const template = document.createElement('template')
template.innerHTML = `

`

/**
 * Taskbar for the Personal Web Desktop environment
 *
 * Created by: ea224pg
 * 2024-01-09 Linnaeus University
 */
export default class TaskbarPWD extends HTMLElement {
  #height
  #taskbar_items = []

  constructor (height) {
    super()
    this.appendChild(template.content.cloneNode(true))
    this.#height = height
  }

  addTaskbarItem (program) {
    if (this.#isAlreadyOnDesktop(program.name)) return

    const taskbarItem = new TaskbarItem(
      program.name, program.iconPath,
      this.#height - 8,
      program
    )

    this.appendChild(taskbarItem)
    this.#taskbar_items.push(taskbarItem)
  }

  #isAlreadyOnDesktop (programName) {
    for (const taskbarItem in this.#taskbar_items) {
      if (taskbarItem.name === programName) return true
    }
    return false
  }
}

customElements.define('taskbar-pwd', TaskbarPWD)
