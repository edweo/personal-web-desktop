const template = document.createElement('template')
template.innerHTML = `
<div draggable="false" class="item w-full h-full items-center flex justify-center rounded"></div>
`

/**
 * Taskbar Item for the Personal Web Desktop environment
 *
 * Created by: ea224pg
 * 2024-01-09 Linnaeus University
 */
export default class TaskbarItem extends HTMLElement {
  #itemHTML
  #name

  /**
   * Creates taskbar icon for launching an app
   * @param {string} name app name
   * @param {string} iconPath app icon path
   * @param {number} size app icon size in pixels, height and width
   * @param {HTMLElement} program app web component to run
   */
  constructor (name, iconPath, size, program) {
    super()
    this.appendChild(template.content.cloneNode(true))

    this.#itemHTML = this.querySelector('.item')

    this.#name = name

    // Set width and height
    this.style.height = size + 'px'
    this.style.width = size + 'px'

    // Set image
    this.querySelector('.item').appendChild(this.#createIconApp(iconPath, size))

    this.#addHoverTooltipEventListener()
    this.#addClickItemEventListener(program)
  }

  get name () {
    return this.#name
  }

  /**
   * Creates a favicon for application
   * @param {string} path path to icon
   * @param {number} size icon size in px
   * @returns {HTMLImageElement} html img element
   */
  #createIconApp (path, size) {
    const icon = document.createElement('img')
    icon.src = path
    icon.width = size - 10
    icon.heigth = size - 10
    return icon
  }

  #addClickItemEventListener (program) {
    this.#itemHTML.addEventListener('click', e => {
      e.preventDefault()
      const runProgramEvent = new Event('run-program', { bubbles: true })
      runProgramEvent.program = program
      this.dispatchEvent(runProgramEvent)
    })
  }

  #addHoverTooltipEventListener () {
    this.addEventListener('mouseover', e => {
      const timeOut = setTimeout(() => {
        e.preventDefault()
        e.stopPropagation()
        const displayTooltipEvent = new Event('display-taskbar-tooltip', { bubbles: true })
        displayTooltipEvent.name = this.#name

        // Calculate tooltip position above taskbar item
        const rect = this.getBoundingClientRect()
        const windowWidth = window.innerWidth

        // Use LEFT absolute
        const absoluteParams = { bottom: 5 }
        if (windowWidth / 2 > rect.x) {
          const leftOffset = (rect.right - rect.width * 1.5)
          absoluteParams.left = leftOffset <= 0 ? 5 : leftOffset
        // Use RIGHT absolute
        } else {
          const rightOffset = (windowWidth - rect.x - rect.width * 1.5)
          absoluteParams.right = rightOffset <= 0 ? 5 : rightOffset
        }

        displayTooltipEvent.absoluteParams = absoluteParams
        this.dispatchEvent(displayTooltipEvent)

        const hideTooltip = (e) => {
          const hideTooltipEvent = new Event('hide-taskbar-tooltip', { bubbles: true })
          this.dispatchEvent(hideTooltipEvent)
          this.removeEventListener('mouseout', hideTooltip)
        }

        this.addEventListener('mouseout', hideTooltip)
      }, 300)

      const cancelTimeout = (e) => {
        clearTimeout(timeOut)
        this.removeEventListener('mouseout', cancelTimeout)
      }

      this.addEventListener('mouseout', cancelTimeout)
    })
  }
}

customElements.define('taskbar-item', TaskbarItem)
