import icon from '../../icon.png'

const template = document.createElement('template')
template.innerHTML = `
<div class="wrapper p-8 bg-gradient-to-r from-blue-300 to-violet-500">
    <img class="memory-icon" src="" alt="Memory Game icon">
    <h1 class="text-2xl font-bold text-white">Welcome to the Memory Game</h1>
    <div class="flex gap-2 w-full">
        <input class="p-2 bg-white rounded w-full outline-none text-xl" type="text" placeholder="username">
        <select class="match rounded bg-white p-2" name="match" id="match"></select>
        <select class="size rounded bg-white p-2" name="size" id="size"></select>
    </div>
    <button class="bg-blue-300 rounded p-2 w-full font-bold border-blue-400 border-2 text-white">START</button>
</div>
`

export default class WelcomeScreen extends HTMLElement {
  #inputHTML
  #sizeSelectHTML
  #matchSelectHTML

  constructor (maxUniqueImages) {
    super()
    this.appendChild(template.content.cloneNode(true))

    this.#inputHTML = this.querySelector('input')
    this.#sizeSelectHTML = this.querySelector('.size')
    this.#matchSelectHTML = this.querySelector('.match')

    this.querySelector('.memory-icon').src = icon
    this.#addMatchOptionsSelection()
    this.#updateGridSizesSelection(maxUniqueImages, 2)

    this.#matchSelectHTML.addEventListener('change', e => {
      e.stopPropagation()
      this.#updateGridSizesSelection(maxUniqueImages, e.target.value)
    })

    this.querySelector('button').addEventListener('click', e => {
      e.stopPropagation()
      if (this.#inputHTML.value.length > 0) {
        const options = {
          toMatch: this.#matchSelectHTML.value,
          gridSize: JSON.parse(this.#sizeSelectHTML.value)
        }
        const startEvent = new Event('game-start', { bubbles: true })
        startEvent.name = this.#inputHTML.value
        startEvent.options = options
        this.dispatchEvent(startEvent)
      }
    })
  }

  #addMatchOptionsSelection () {
    for (let i = 2; i <= 4; i++) {
      this.#addMatchOption(i)
    }
  }

  /**
   * Updates the selecet HTML element with new possible options
   * @param {number} maxUniqueImages total amount of unique images available to choose from
   * @param {number} matches desired amount of cards to match in the game (1, 2, 3, 4...)
   */
  #updateGridSizesSelection (maxUniqueImages, matches) {
    this.#sizeSelectHTML.textContent = '' // Clear previous

    const maxGridSize = maxUniqueImages * matches

    let rows = 2
    let columns = 2
    let currentGridSize = columns * rows

    while (currentGridSize <= maxGridSize) {
      // Combinations like 2x2, 4x4, 8x8 etc...
      this.#addGridSizeOption(rows, columns)

      // Check different combinations for 2x2 with at most 2 additional: 2x4, 4x2
      let tempPower = 2
      for (let i = 0; i < 1; i++) {
        if (currentGridSize * tempPower <= maxGridSize) {
          this.#addGridSizeOption(rows * tempPower, columns)
          this.#addGridSizeOption(rows, columns * tempPower)
          tempPower *= 2
        } else {
          break
        }
      }

      rows += 2
      columns += 2
      currentGridSize = columns * rows
    }
  }

  /**
   * Adds HTML option to select amount of cards to match
   * @param {number} toMatch Amount of cards to match inside the grid
   */
  #addMatchOption (toMatch) {
    const option = document.createElement('option')
    option.value = toMatch
    option.textContent = `🎯 ${toMatch}`
    this.#matchSelectHTML.appendChild(option)
  }

  /**
   * Adds HTML option to select grid size
   * @param {number} rows amount of rows
   * @param {number} columns amount of columns
   */
  #addGridSizeOption (rows, columns) {
    const option = document.createElement('option')
    option.value = JSON.stringify({ rows, columns })
    option.textContent = `🔲 ${rows}x${columns}`
    this.#sizeSelectHTML.appendChild(option)
  }
}

customElements.define('welcome-screen', WelcomeScreen)
