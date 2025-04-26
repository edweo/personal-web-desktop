import WelcomeScreen from './sub_components/welcome_screen/welcome_screen.js'
import MemoryBoard from './sub_components/memory_board/memory_board.js'
import VictoryScreen from './sub_components/victory_screen/victory_screen.js'
import memoryImages from './card_images.js'

const template = document.createElement('template')
template.innerHTML = `
<div class="memory-game-wrapper bg-gradient-to-r from-blue-400 to-violet-600">
  <!-- Dynamic content will be loaded here such as welcome screen, game board and victory screen -->
</div>
`

/**
 * Memory Game for the Personal Web Desktop environment
 *
 * Created by: ea224pg
 * 2024-01-09 Linnaeus University
 */
export default class MemoryGame extends HTMLElement {
  #welcomeScreenComp
  #memoryBoardComp
  #victoryScreen

  #images
  #username
  #options

  constructor () {
    super()
    this.appendChild(template.content.cloneNode(true))

    this.#welcomeScreenComp = new WelcomeScreen(memoryImages.length)
    this.querySelector('.memory-game-wrapper').appendChild(this.#welcomeScreenComp)

    this.#images = memoryImages

    this.addEventListener('game-start', e => {
      e.stopPropagation()
      this.#username = e.name
      this.#options = e.options
      this.#memoryBoardComp = new MemoryBoard(this.#options.gridSize, this.#images, this.#options.toMatch)
      this.querySelector('.memory-game-wrapper').appendChild(this.#memoryBoardComp)
      this.#welcomeScreenComp.remove()
    })

    this.addEventListener('game-winner', e => {
      e.stopPropagation()
      this.#victoryScreen = new VictoryScreen(e.incorrectGuesses, this.#username)
      this.querySelector('.memory-game-wrapper').appendChild(this.#victoryScreen)
      this.#memoryBoardComp.remove()
    })

    this.addEventListener('game-restart', e => {
      e.stopPropagation()
      this.#memoryBoardComp = new MemoryBoard(this.#options.gridSize, this.#images, this.#options.toMatch)
      this.querySelector('.memory-game-wrapper').appendChild(this.#memoryBoardComp)
      this.#victoryScreen.remove()
    })

    this.addEventListener('change-settings', e => {
      e.stopPropagation()
      this.#welcomeScreenComp = new WelcomeScreen(memoryImages.length)
      this.querySelector('.memory-game-wrapper').appendChild(this.#welcomeScreenComp)
      this.#victoryScreen.remove()
    })
  }

  async close () {
    return new Promise((resolve, reject) => {
      return resolve(true)
    })
  }
}

customElements.define('memory-game', MemoryGame)
