import CardRotatable from '../card_rotatable/card_rotatable.js'
import questionIcon from './question-mark.png'

const template = document.createElement('template')
template.innerHTML = `
<div class="board-wrapper bg-gradient-to-r from-blue-300 to-violet-500">
    <!-- Memory Cards will be placed here  -->
</div>
`

export default class MemoryBoard extends HTMLElement {
  static #DEFAULT_BOARD_SIZE = 500

  #images
  #sizeParams
  #boardHTML

  #toMatch
  #matchedCards
  #remainingCardsToMatch
  #incorrectGuesses

  /**
   * Creates MemoryBoard
   * @param {object} sizeParams { columns: number, rows: number}
   * @param {Array} imagesPaths array with image paths
   * @param {number} toMatch amount of card to match, n >= 2
   */
  constructor (sizeParams, imagesPaths, toMatch) {
    super()
    this.appendChild(template.content.cloneNode(true))
    this.#sizeParams = sizeParams
    this.#images = imagesPaths
    this.#toMatch = toMatch
    this.#boardHTML = this.querySelector('.board-wrapper')
    this.style.width = MemoryBoard.#DEFAULT_BOARD_SIZE + 'px'
    this.style.height = MemoryBoard.#DEFAULT_BOARD_SIZE + 'px'
    this.#matchedCards = []
    this.#incorrectGuesses = 0
  }

  connectedCallback () {
    const squaresAmount = this.#createBoardSquares(this.#sizeParams)
    this.#remainingCardsToMatch = this.#appendImageCardsToBoard(this.#images, squaresAmount)
    this.#giveFocusToSquare(1)
    this.addEventListener('add-square-click', e => {
      e.stopPropagation()
      e.preventDefault()
      this.#addRotatableCardClickListener(e.target)
    })
  }

  /**
   * Appends randomly shuffled rotatable cards to the grid
   * @param {Array} images array of image paths
   * @param {number} squaresInBoard amount of squares in the board (2x2 -> 4, 3x3 -> 9)
   * @returns {number} amount of rotatable cards added to the board
   */
  #appendImageCardsToBoard (images, squaresInBoard) {
    this.#shuffleArray(images)
    const uniqueCardSets = Math.floor(squaresInBoard / this.#toMatch)

    // Maybe could be optimized to not be O(N^2) complexity
    // * Might not be worth the hassle for such simple operation that realistically will not be needed for large inputs
    //
    // Creates duplicate card elements for matching
    const cardsToAppend = []
    for (let i = 1; i < uniqueCardSets + 1; i++) {
      const imgPath = images[i - 1]
      // Create copies of element using this.#toMatch amount
      for (let j = 0; j < this.#toMatch; j++) {
        const img = this.#createCardImage(imgPath)
        const questionImg = this.#createCardQuestionMark(questionIcon)
        const options = {
          bgFront: '#5a6e96',
          bgBack: '#5a6e96'
        }
        // const cardRotatable = new CardRotatable(img, questionImg, i, options)
        const cardRotatable = new CardRotatable(questionImg, img, i, options)
        this.#addRotatableCardClickListener(cardRotatable)
        cardsToAppend.push(cardRotatable)
      }
    }

    // Append cards in random order
    this.#shuffleArray(cardsToAppend)
    let squareId = 1
    cardsToAppend.forEach(card => {
      const square = this.#boardHTML.querySelector(`.sq-${squareId}`)
      square.append(card)
      squareId++
    })

    return cardsToAppend.length
  }

  #createCardImage (imgPath) {
    const img = document.createElement('img')
    img.src = imgPath
    img.classList.add('card-image')
    img.draggable = false
    return img
  }

  #createCardQuestionMark (iconPath) {
    const img = document.createElement('img')
    img.src = iconPath
    img.classList.add('card-question')
    img.draggable = false
    return img
  }

  /**
   * Adds key-press events on squares in the grid
   * @param {HTMLElement} square square element
   */
  #addNavigationKeyboardSquareListener (square) {
    square.addEventListener('keydown', e => {
      e.stopPropagation()
      const currentSquareId = Number(e.target.classList[1].split('-')[1])
      const columns = this.#sizeParams.columns
      const rows = this.#sizeParams.rows

      // Handle key press
      switch (e.key) {
        case 'ArrowUp':
          this.#handleArrowUp(currentSquareId, columns, rows)
          break
        case 'ArrowDown':
          this.#handleArrowDown(currentSquareId, columns, rows)
          break
        case 'ArrowLeft':
          this.#handleArrowLeft(currentSquareId, columns)
          break
        case 'ArrowRight':
          this.#handleArrowRight(currentSquareId, columns)
          break
        case 'Enter':
          e.target.firstChild.click()
          break
      }
    })
  }

  #handleArrowUp (squareId, columns, rows) {
    const nextSquareId = (squareId <= columns)
      ? ((rows - 1) * columns) + squareId
      : squareId - columns
    this.#giveFocusToSquare(nextSquareId)
  }

  #handleArrowDown (squareId, columns, rows) {
    const squaresExcludingLastRow = columns * (rows - 1)
    const nextSquareId = (squareId > squaresExcludingLastRow)
      ? squareId - squaresExcludingLastRow
      : squareId + columns
    this.#giveFocusToSquare(nextSquareId)
  }

  #handleArrowLeft (squareId, columns) {
    const nextSquareId = (squareId % columns === 1)
      ? squareId + (columns - 1)
      : squareId - 1
    this.#giveFocusToSquare(nextSquareId)
  }

  #handleArrowRight (squareId, columns) {
    const nextSquareId = (squareId % columns === 0)
      ? squareId - (columns - 1)
      : squareId + 1
    this.#giveFocusToSquare(nextSquareId)
  }

  #giveFocusToSquare (id) {
    this.#findSquareById(id).focus()
  }

  #findSquareById (id) {
    return this.#boardHTML.querySelector(`.sq-${id}`)
  }

  /**
   * Adds event listener to a rotatable card which handles logic for matching correct cards
   * @param {CardRotatable} cardRotatable rotatable card component
   */
  #addRotatableCardClickListener (cardRotatable) {
    const eventListener = (e) => {
      e.stopPropagation()
      cardRotatable.rotateCard()
      cardRotatable.disableRotate()
      cardRotatable.removeEventListener('click', eventListener) // Make flipped card un-clickable

      // Add first card to match after
      const matchedCards = this.#matchedCards.length
      if (matchedCards === 0) {
        this.#matchedCards.push(cardRotatable)
      } else if (matchedCards > 0) { // Check consecutive cards that they match
        const prevCard = this.#matchedCards[matchedCards - 1]

        // Correct match
        if (prevCard.id === cardRotatable.id && prevCard !== cardRotatable) {
          // Correct amount of cards matched
          if (this.#matchedCards.length === this.#toMatch - 1) {
            // Send event to remove event listeners for each matched car

            // Hide correctly matched cards from memory game
            this.#matchedCards.forEach(card => {
              card.setAllFacesBackground('linear-gradient(135deg, rgba(48, 180, 193, 0.35) 0%, rgba(55, 30, 111, 0.72) 50%, rgba(0, 212, 255, 0.31) 100%)')
              const square = card.parentElement
              square.classList.add('square-no-pointer')
              this.#remainingCardsToMatch--
            })
            this.#matchedCards = []
            this.#remainingCardsToMatch--
            cardRotatable.setAllFacesBackground('linear-gradient(135deg, rgba(48, 180, 193, 0.35) 0%, rgba(55, 30, 111, 0.72) 50%, rgba(0, 212, 255, 0.31) 100%)')
            cardRotatable.parentElement.classList.add('square-no-pointer') // Hovering over square shows no pointer (click incentive)

            // Player has won the game and matched all the cards correctly
            if (this.#remainingCardsToMatch === 0) {
              setTimeout(() => { // Added some delay to let the card flip fully instead of instantly showing victory screen
                const winnerEvent = new Event('game-winner', { bubbles: true })
                winnerEvent.incorrectGuesses = this.#incorrectGuesses
                this.dispatchEvent(winnerEvent)
              }, 300)
            }
          } else { // Correct card match, but amount of matches still not reached
            this.#matchedCards.push(cardRotatable)
          }
        } else { // Incorrect match, reset and hide cards
          // Allows for other cards to be rotated while processing current incorrect instance
          this.#incorrectGuesses++
          const copyArray = [...this.#matchedCards]
          this.#matchedCards = []
          // Restore click failed matched cards
          const addClickEventBack = new Event('add-square-click', { bubbles: true })
          setTimeout(() => {
            copyArray.forEach(card => {
              card.enableRotate()
              card.rotateCard()
              setTimeout(() => card.dispatchEvent(addClickEventBack), 300) // let card flip back before adding event
            })
            cardRotatable.enableRotate()
            cardRotatable.rotateCard()
            // cardRotatable.dispatchEvent(addClickEventBack)
            setTimeout(() => cardRotatable.dispatchEvent(addClickEventBack), 300) // let card flip back before adding event
          }, 300) // Same as in 'card_rotatable.css' card-rotatable .wrapper -> transition: all 0.3s ease in;
        }
      }
    }

    cardRotatable.addEventListener('click', eventListener)
  }

  /**
   * Creates board with squares
   * @param {object} sizeParams { columns: number, rows: number}
   * @returns {number} total squares amount created (board size)
   */
  #createBoardSquares (sizeParams) {
    const { columns, rows } = sizeParams

    const boardWrapper = this.querySelector('.board-wrapper')
    boardWrapper.style.gridTemplateColumns = `repeat(${columns}, auto)`
    boardWrapper.style.gridTemplateRows = `repeat(${rows}, auto)`

    const squaresAmount = columns * rows
    for (let i = 1; i < squaresAmount + 1; i++) {
      const square = document.createElement('div')
      square.tabIndex = 0
      this.#addNavigationKeyboardSquareListener(square)

      square.classList.add(...['square', `sq-${i}`])
      boardWrapper.appendChild(square)
    }

    // Adjust Board Size according if it is 4x4 or 4x2 or 2x4
    if (columns < rows) {
      this.style.width = `${MemoryBoard.#DEFAULT_BOARD_SIZE * (columns / rows)}px`
    } else if (rows < columns) {
      this.style.height = `${MemoryBoard.#DEFAULT_BOARD_SIZE * (rows / columns)}px`
    }

    return squaresAmount
  }

  /**
   * Shuffles an array using the Fisher-Yates Sorting algorithm
   * Reference: https://www.freecodecamp.org/news/how-to-shuffle-an-array-of-items-using-javascript-or-typescript/
   * @param {Array} array to be shuffled
   * @returns {Array} shuffled array
   */
  #shuffleArray (array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }
}

customElements.define('memory-board', MemoryBoard)
