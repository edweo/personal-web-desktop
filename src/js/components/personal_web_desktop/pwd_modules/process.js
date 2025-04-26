/**
 * Process for the Personal Web Desktop environment
 *
 * Created by: ea224pg
 * 2024-01-09 Linnaeus University
 */
export default class Process {
  #name
  #pID
  #processWindow
  #app

  /**
   * Creates a process of application in the PWD
   * @param {string} name process/app name
   * @param {number} pID process id
   * @param {HTMLElement} processWindow process window
   * @param {HTMLElement} app app web component
   */
  constructor (name, pID, processWindow, app) {
    this.#name = name
    this.#pID = pID
    this.#processWindow = processWindow
    this.#app = app
  }

  get name () {
    return this.#name
  }

  get pID () {
    return this.#pID
  }

  get processWindow () {
    return this.#processWindow
  }

  get app () {
    return this.#app
  }

  getPositionOnScreen () {
    return this.#processWindow.getBoundingClientRect()
  }
}
