const template = document.createElement('template')
template.innerHTML = `
<div class="wrapper bg-gradient-to-r from-blue-300 to-violet-500">
    <h1 class="text-white text-2xl font-bold">WINNER!</h1>
    <h2 class="font-bold text-white"></h2>
    <h3 class="font-bold"></h3>
    <button class="btn-again bg-blue-300 rounded p-2 text-white w-full">PLAY AGAIN</button>
    <button class="btn-options bg-blue-300 rounded p-2 text-white w-full">CHANGE SETTINGS</button>
</div>
`

export default class VictoryScreen extends HTMLElement {
  constructor (incorrectGuesses, username) {
    super()
    this.appendChild(template.content.cloneNode(true))

    const guessHTML = this.querySelector('h3')
    guessHTML.textContent = `Incorrect guesses: ${incorrectGuesses}`
    const color = incorrectGuesses < 4
      ? 'text-green-500'
      : 'text-red-500'
    guessHTML.classList.add(color)

    this.querySelector('h2').textContent = `🏆 ${username}`

    this.querySelector('.btn-again').addEventListener('click', () => {
      const restartEvent = new Event('game-restart', { bubbles: true })
      this.dispatchEvent(restartEvent)
    })

    this.querySelector('.btn-options').addEventListener('click', () => {
      const restartEvent = new Event('change-settings', { bubbles: true })
      this.dispatchEvent(restartEvent)
    })
  }
}

customElements.define('victory-screen', VictoryScreen)
