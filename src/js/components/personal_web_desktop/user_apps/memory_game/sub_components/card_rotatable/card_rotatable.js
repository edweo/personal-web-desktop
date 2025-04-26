const template = document.createElement('template')
template.innerHTML = `
<div class="wrapper rounded">
    <div class="card-front card-face rounded"></div>
    <div class="card-back card-face rounded"></div>
</div>
`

export default class CardRotatable extends HTMLElement {
  #cardWrapper
  #cardFront
  #cardBack
  #isFrontFaceCard // current facing face of card (front or back)
  #id
  #disabledRotate

  /**
   * Creates rotatable card HTML element
   * @param {HTMLElement} front element at front of card
   * @param {HTMLElement} back element at back of card
   * @param {number} id could be used to identify multiple rotatable cards (matching, sorting, re-ordering)
   * @param {object} options for background colors
   */
  constructor (front, back, id, options) {
    super()
    this.appendChild(template.content.cloneNode(true))

    this.#cardWrapper = this.querySelector('.wrapper')
    this.#cardFront = this.#cardWrapper.querySelector('.card-front')
    this.#cardBack = this.#cardWrapper.querySelector('.card-back')
    this.#id = id
    this.#isFrontFaceCard = true
    this.#disabledRotate = false

    if (front) this.#cardFront.appendChild(front)
    if (back) this.#cardBack.appendChild(back)

    if (options) {
      const { bgFront, bgBack } = options
      this.setBackgroundColorFront(bgFront)
      this.setBackgroundColorBack(bgBack)
    }
  }

  get id () {
    return this.#id
  }

  rotateCard () {
    if (!this.#disabledRotate) {
      this.#isFrontFaceCard
        ? this.#cardWrapper.style.transform = 'rotateY(180deg)'
        : this.#cardWrapper.style.transform = ''
      this.#isFrontFaceCard = !this.#isFrontFaceCard
    }
  }

  disableRotate () {
    this.#disabledRotate = true
    this.#cardWrapper.style.cursor = 'unset'
  }

  enableRotate () {
    this.#disabledRotate = false
    this.#cardWrapper.style.cursor = 'pointer'
  }

  /**
   * Sets front face color
   * @param {string} color css color string-like
   */
  setBackgroundColorFront (color) {
    this.#cardFront.style.backgroundColor = color
  }

  /**
   * Sets back face color
   * @param {string} color css color string-like
   */
  setBackgroundColorBack (color) {
    this.#cardBack.style.backgroundColor = color
  }

  /**
   * Sets front and back face colors
   * @param {string} color css color string-like
   */
  setAllFacesBackgroundColor (color) {
    this.setBackgroundColorFront(color)
    this.setBackgroundColorBack(color)
  }

  setAllFacesBackground (background) {
    this.#cardBack.style.background = background
    this.#cardFront.style.background = background
  }
}

customElements.define('card-rotatable', CardRotatable)
