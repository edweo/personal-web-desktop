import TaskbarTooltip from '../pwd_components/taskbar_tooltip/taskbar_tooltip.js'

/**
 * Desktop Display Service for the Personal Web Desktop environment
 *
 * Responsible for displaying and manipulating elements on the desktop
 *
 * Created by: ea224pg
 * 2024-01-09 Linnaeus University
 */
export default class DesktopDisplayingService {
  #desktopHTML
  #pwdHTML
  #programWindowsOpened = new Map()
  #programWindowsMinimised = new Map()

  #currentSelectedProcessWindow
  #currentHighestZIndex

  #currentTooltip

  constructor (desktopHTML, pwdHTML) {
    this.#desktopHTML = desktopHTML
    this.#pwdHTML = pwdHTML
    this.#currentHighestZIndex = 0
  }

  addProcessWindowToDesktop (processWindow, pID) {
    this.makeWindowHighestInDesktop(processWindow)
    this.#desktopHTML.prepend(processWindow)

    // TODO Transform to x0 y0, next window opened could be slightly lower in x-y coordinates than previous window
    processWindow.getBoundingClientRect()

    this.#programWindowsOpened.set(pID, processWindow)
  }

  closeWindow (processWindow, pID) {
    this.#programWindowsOpened.delete(pID)
    this.#programWindowsMinimised.delete(pID)
    processWindow.remove()

    // Reset z-index to 0
    if (this.#programWindowsOpened.size === 0 &&
        this.#programWindowsMinimised.size === 0) this.#currentHighestZIndex = 0
  }

  minimiseWindow (processWindow, pID) {
    this.#programWindowsOpened.delete(pID)
    this.#programWindowsMinimised.set(pID, processWindow)
    processWindow.classList.add('hidden')
  }

  openMinimisedWindow (processWindow, pID) {
    this.#programWindowsMinimised.delete(pID)
    this.#programWindowsOpened.set(pID, processWindow)
    processWindow.classList.remove('hidden')
    processWindow.style.zIndex = ++this.#currentHighestZIndex
  }

  makeWindowHighestInDesktop (processWindow) {
    if (!processWindow) return

    if (this.#currentSelectedProcessWindow) {
      if (processWindow !== this.#currentSelectedProcessWindow) {
        this.#addSelectedEvent(this.#currentSelectedProcessWindow)
      }
      this.#currentSelectedProcessWindow.unfocusWindow()
    }

    // TODO if current highest z-index max is reached handle - z-index max: 2,147,483,647 (32-bit signed)
    processWindow.focusWindow()
    processWindow.style.zIndex = ++this.#currentHighestZIndex
    this.#currentSelectedProcessWindow = processWindow
  }

  #addSelectedEvent (processWindow) {
    processWindow.addEventListener('click', () => {
      processWindow.dispatchEvent(new Event('window-selected', { bubbles: true }))
    }, { once: true })
  }

  setBackgroundImage (imgPath) {
    this.#pwdHTML.style.backgroundImage = `url(${imgPath})`
  }

  displayTooltip (text, absoluteParams) {
    const tooltip = new TaskbarTooltip(text)
    tooltip.style.zIndex = this.#currentHighestZIndex + 1

    tooltip.setAbsolute(absoluteParams)

    this.#currentTooltip = tooltip
    this.#desktopHTML.append(tooltip)
  }

  hideTooltip () {
    if (this.#currentTooltip) {
      this.#currentTooltip.remove()
      this.#currentTooltip = undefined
    }
  }
}
