import icon from '../../icon.png'

const template = document.createElement('template')
template.innerHTML = `
<div class="chat-welcome-wrapper bg-gradient-to-br from-blue-200 to-green-300 flex flex-col 
            w-full h-full items-center justify-center">
    <div class="w-6/12 flex flex-col gap-2 bg-gradient-to-br from-blue-500 to-violet-200 bg-opacity-20 p-4 rounded">
      <div class="flex flex-col mb-4">
        <img src="" alt="chat app icon" class="w-5/12 h-5/12 self-center mb-2">
        <h2 class="text-white text-center font-bold">Chatting made easy. Meet new people and exchange ideas!</h2>
      </div>
      <input type="text" name="username" id="username" placeholder="username" class="input-username font-bold px-1 py-0.5 rounded">
      <div>
          <div class="flex items-start gap-2">
            <label for="accept-terms" class="flex items-start gap-1">
              <input type="checkbox" name="accept-terms" id="accept-terms" class="checkbox-terms">
              <p class="text-white text-xs leading-none">I agree to the rules and terms of the chat service. I will not engage in offensive behaviour using the service.</p>
            </label>
          </div>
      </div>
      <button class="btn-start-chat bg-gradient-to-br from-blue-600 to-violet-600 rounded w-full px-1 py-0.5 text-white font-bold mt-4">START CHATTING</button>
      <p class="notification bg-white bg-opacity-30 rounded px-1 py-0.5 text-red-400 text-xs"></p>
    </div>
</div>
`

export default class ChatWelcomeScreen extends HTMLElement {
  #inputHTML
  #checkboxHTML
  #notificationHTML

  constructor () {
    super()
    this.appendChild(template.content.cloneNode(true))

    const iconWelcome = this.querySelector('img')
    iconWelcome.src = icon

    this.#inputHTML = this.querySelector('.input-username')
    this.#checkboxHTML = this.querySelector('.checkbox-terms')
    this.#notificationHTML = this.querySelector('.notification')

    this.#hideNotification()
  }

  connectedCallback () {
    this.#addBtnClickEventListener()
  }

  #enterChatApp (username) {
    const enterChatAppEvent = new Event('enter-chat-app', { bubbles: true })
    enterChatAppEvent.username = username
    this.dispatchEvent(enterChatAppEvent)
  }

  #addBtnClickEventListener () {
    const onClick = e => {
      e.stopPropagation()
      const username = this.#inputHTML.value
      if (username.length > 0) {
        if (this.#checkboxHTML.checked) {
          this.#enterChatApp(username)
        } else {
          this.#showNotification('You must agree to the terms of service', 'red')
        }
      } else {
        this.#showNotification('You must enter a username', 'red')
      }
    }
    this.querySelector('.btn-start-chat').addEventListener('click', onClick)
  }

  #hideNotification () {
    this.#notificationHTML.style.display = 'none'
  }

  #showNotification (text, color) {
    this.#notificationHTML.style.display = 'unset'
    this.#notificationHTML.textContent = text
    this.#notificationHTML.style.color = color
  }
}

customElements.define('chat-welcome-screen', ChatWelcomeScreen)
