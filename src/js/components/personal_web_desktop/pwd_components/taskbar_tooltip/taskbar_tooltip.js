const template = document.createElement('template')
template.innerHTML = `
<div class="wrapper-tooltip flex bg-white rounded pl-2 pr-2 pt-1 pb-1">
    <h1 class="text text-xs leading-none"></h1>
</div>
`

/**
 * Tooltip for the Personal Web Desktop environment
 *
 * Created by: ea224pg
 * 2024-01-09 Linnaeus University
 */
export default class TaskbarTooltip extends HTMLElement {
  #text
  #wrapperTooltip

  constructor (text) {
    super()
    this.appendChild(template.content.cloneNode(true))
    this.#text = text
    this.#wrapperTooltip = this.querySelector('.wrapper-tooltip')
    this.querySelector('.text').textContent = text
  }

  /**
   * Sets the absolute values of top/left/bottom/right
   * params = { top: 5, left: 5, bottom: 5, right: 5 }
   * @param {object} params absolute set parameters. Unwanted params can be excluded.
   */
  setAbsolute (params) {
    if ('top' in params) this.#wrapperTooltip.style.top = params.top + 'px'
    if ('left' in params) this.#wrapperTooltip.style.left = params.left + 'px'
    if ('bottom' in params) this.#wrapperTooltip.style.bottom = params.bottom + 'px'
    if ('right' in params) this.#wrapperTooltip.style.right = params.right + 'px'
  }
}

customElements.define('taskbar-tooltip', TaskbarTooltip)
