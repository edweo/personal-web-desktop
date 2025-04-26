import NavWindow from './sub_components/nav_window/nav_window.js'
import OptionFieldEditable from './sub_components/option_field/option_field_editable.js'
import ChatWindowMessage from './modules/chat_window_message.js'
import ChatConnectionSocket from './modules/chat_connection_socket.js'
import SocketMessage from './modules/socket_message.js'
import ChatWelcomeScreen from './sub_components/chat-welcome-screen/chat_welcome_screen.js'
import chatIcon from './icon.png'

const template = document.createElement('template')
template.innerHTML = `
<div class="chat-wrapper">
    <nav class="bg-gradient-to-b from-blue-400 to-violet-500 p-1 flex flex-col gap-1 justify-end sticky z-40">
      <!-- Nav buttons will appear here -->
    </nav>
    <div class="main-window">
        <div class="chat-window w-full h-full flex justify-start items-center p-2 flex-col gap-1">
            <!-- ChatWindowMessage Bubbles will be added here -->
        </div>
        <div class="msg-window w-full p-2 gap-2 flex auto-cols-auto z-20">
            <textarea name="msg-area" id="msg-area" placeholder="message" class="msg-area rounded p-2 leading-tight col-span-3
                        h-10 font-bold resize-none w-full"></textarea>
            <div class="flex gap-2">
              <button class="btn-send rounded flex items-center justify-center p-2 text-black bg-white bg-opacity-50 hover:bg-opacity-60 w-10">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 
                                    20.875L5.999 12Zm0 0h7.5" />
                </svg>
              </button>
              <button class="emoji-menu-btn bg-white bg-opacity-50 hover:bg-opacity-60 w-10 rounded flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 
                  0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 
                  .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                </svg>
              </button>
            </div>   
        </div>
        <div class="emoji-menu-wrapper w-full h-fit flex items-center justify-center">
          <div class="emoji-menu px-1 py-1 gap-1 justify-start items-start w-fit h-fit overflow-y-scroll">
            <!-- EMOJIS will be loaded here -->
          </div>
        </div>
    </div>
</div>
`

/**
 * Chat application for the Personal Web Desktop environment
 *
 * Created by: ea224pg
 * 2024-01-09 Linnaeus University
 */
export default class ChatApp extends HTMLElement {
  static #EMOJIS = ['😀', '😃', '😄', '😅', '😎', '🥳', '🧐', '😇', '😍', '😘', '😐', '😴', '🙁', '😵', '😂',
    '🤗', '😒', '😌', '😮', '😱', '🙃', '🤭', '😢', '🤩', '😕', '🥰', '😊', '👋', '🤟', '🤝', '💪', '👍', '👌', '👎',
    '🙌', '👀', '💯', '🎉', '🎁', '🎓', '⌛', '🎸', '🎧', '💻', '🎵', '📷', '🔧', '📫', '💼', '🛒', '📌', '💳', '🌍',
    '🏝️', '🎃', '🎄', '🎆', '🎇', '🎟️', '🏆', '✏️', '📃', '🗑️', '📔', '🌡️', '⚖️', '📡', '🔑', '💡', '🗓️'
  ]

  static #windowTransitionStyle = 'ease-in 0.2s'
  static #windowTransitionMS = 200 // Proportional to #windowTransitionStyle
  static #chatWindowMessages = []

  // -----Main Chat Application-------
  // State
  #chatSocket = null
  #emojiMenuOffset
  #isEmojiMenuOpen = false

  // Accessibility
  #shiftPressedDown = false

  // HTML elements
  #chatWrapperHTML
  #navBarHTML
  #mainWindowHTML
  #chatWindowHTML
  #msgWindowHTML
  #msgAreaHTML
  #btnSendHTML
  #emojiMenuWrapperHTML
  #emojiMenuHTML
  #emojiMenuBtnHTML

  // -----Navigation menu-------
  // Web components
  #welcomeScreenComp

  // Nav Window Show/Hide state management
  #currentNavWindowShown = null
  #currentNavBtnSelected = null
  #navWindowCloseInProgress = false

  // Nav Windows
  #profileWindowComp
  #aboutWindowComp

  // Editable fields / nav window content
  #usernameEditableField
  #channelEditableField
  #clearMessageCacheBtn

  constructor () {
    super()
    this.appendChild(template.content.cloneNode(true))

    this.#chatWrapperHTML = this.querySelector('.chat-wrapper')

    this.#navBarHTML = this.querySelector('nav')
    this.#mainWindowHTML = this.querySelector('.main-window')
    this.#chatWindowHTML = this.querySelector('.chat-window')
    this.#msgAreaHTML = this.querySelector('.msg-area')
    this.#msgWindowHTML = this.querySelector('.msg-window')
    this.#btnSendHTML = this.querySelector('.btn-send')
    this.#emojiMenuWrapperHTML = this.querySelector('.emoji-menu-wrapper')
    this.#emojiMenuHTML = this.querySelector('.emoji-menu')
    this.#emojiMenuBtnHTML = this.querySelector('.emoji-menu-btn')
    this.#hideChatUI()
  }

  connectedCallback () {
    const usernameFromStorage = localStorage.getItem('username')
    const channelFromStorage = localStorage.getItem('channel')
    if (!usernameFromStorage && !channelFromStorage) {
      this.#welcomeScreenComp = new ChatWelcomeScreen()
      this.#chatWrapperHTML.append(this.#welcomeScreenComp)
      this.addEventListener('enter-chat-app', e => {
        e.stopPropagation()
        this.#initializeChatUI(e.username, 'default')
      })
    } else { // Name/channel cached in storage
      this.#initializeChatUI(usernameFromStorage, channelFromStorage)
    }
  }

  #hideChatUI () {
    this.#navBarHTML.style.display = 'none'
    this.#mainWindowHTML.style.display = 'none'
  }

  /**
   * Initializes chat UI
   * @param {string} username username to start with
   * @param {string} channel channel to start with
   */
  #initializeChatUI (username, channel) {
    this.#navBarHTML.style.display = 'flex'
    this.#mainWindowHTML.style.display = 'grid'

    // NOTE: order of these initializations/function calls matter more or less
    this.#chatSocket = new ChatConnectionSocket(
      (msg, color) => this.#showEventChatWindow(msg, color),
      (chatWindowMessage) => this.#addChatMessageBubbleToWindow(chatWindowMessage), this)
    this.#chatSocket.initializeUsername(username)
    this.#chatSocket.initializeChannel(channel)

    // Initialize nav menu
    this.#initializeNavWindows(this.#chatSocket)
    this.#initializeNavButtons()
    this.#initializeEmojisMenu()

    // Load messages from localStorage
    const cachedMessages = localStorage.getItem('cachedMessages')
    if (cachedMessages) {
      ChatApp.#chatWindowMessages = JSON.parse(cachedMessages)
      // Display messages on chat screen
      ChatApp.#chatWindowMessages.forEach(messageJSON => {
        this.#restoreMessageFromJSON(messageJSON)
      })
    }

    // Event listeners
    this.#addBtnSendClickEventListener()
    this.#addInputKeyDownEventListener()
  }

  #hideEmojiMenu () {
    this.#emojiMenuWrapperHTML.style.transform = `translateY(${(this.#emojiMenuOffset)}px)`
    this.#isEmojiMenuOpen = false
  }

  #showEmojiMenu () {
    this.#emojiMenuWrapperHTML.style.transform = `translateY(${-(this.#emojiMenuOffset)}px)`
    this.#isEmojiMenuOpen = true
  }

  #initializeEmojisMenu () {
    const menu = document.createElement('div')
    menu.classList.add('emoji-menu')
    ChatApp.#EMOJIS.forEach(emoji => {
      const btn = document.createElement('button')
      btn.classList.add('btn-emoji')
      btn.textContent = emoji
      btn.addEventListener('click', e => {
        e.stopPropagation()
        this.#msgAreaHTML.value = this.#msgAreaHTML.value + emoji
      })
      this.#emojiMenuHTML.appendChild(btn)
    })
    this.#emojiMenuWrapperHTML.style.top = (this.#mainWindowHTML.getBoundingClientRect().height) + 'px'
    this.#emojiMenuOffset = this.#emojiMenuWrapperHTML.getBoundingClientRect().height + this.#msgWindowHTML.getBoundingClientRect().height
    this.#emojiMenuBtnHTML.addEventListener('click', e => {
      e.stopPropagation()
      if (!this.#isEmojiMenuOpen) {
        this.#showEmojiMenu()
      } else {
        this.#hideEmojiMenu()
      }
    })
  }

  /**
   * Sends a message via chat socket
   * @param {string} inputMsg message to send
   */
  #sendMessage (inputMsg) {
    const socketMessage = new SocketMessage()
      .addType('message')
      .addData(inputMsg)
      .addUsername(this.#chatSocket.getUsername())
      .addChannel(this.#chatSocket.getChannel())

    // Send message via socket
    this.#chatSocket.sendChatMessage(socketMessage).then(messageWasSent => {
      if (messageWasSent) {
        // Show message on chat window
        const chatWindowMessage = new ChatWindowMessage(this.#chatSocket.getUsername(), new Date().toLocaleString(), inputMsg, true)
        this.#addChatMessageBubbleToWindow(chatWindowMessage)

        // Reset input field
        this.#msgAreaHTML.value = ''
      }
    })
  }

  /**
   * Validates input message and proceeds to send it via socket
   * @param {string} inputMsg message
   */
  #validateAndSendMessage (inputMsg) {
    if (inputMsg.length > 0) {
      this.#sendMessage(inputMsg)
    }
  }

  #addBtnSendClickEventListener () {
    this.#btnSendHTML.addEventListener('click', e => {
      e.stopPropagation()
      this.#validateAndSendMessage(this.#msgAreaHTML.value)
    })
  }

  /**
   * Add message to chat window as a message bubble
   * @param {ChatWindowMessage} chatWindowMessage message to add
   */
  #addChatMessageBubbleToWindow (chatWindowMessage) {
    this.#addElementToChatWindow(this.#createMessageBubble(chatWindowMessage))
    ChatApp.#chatWindowMessages.push(chatWindowMessage.getJSON())
    localStorage.setItem('cachedMessages', JSON.stringify(ChatApp.#chatWindowMessages))
  }

  #restoreMessageFromJSON (chatWindowMessageJSON) {
    this.#addElementToChatWindow(this.#createMessageBubble(ChatWindowMessage.fromJSON(chatWindowMessageJSON)))
  }

  #addInputKeyDownEventListener () {
    this.#msgAreaHTML.addEventListener('keydown', e => {
      e.stopPropagation()
      switch (e.key) {
        case 'Enter': {
          if (this.#shiftPressedDown) return
          e.preventDefault()
          this.#validateAndSendMessage(e.target.value)
          break
        }
        case 'Shift': {
          this.#shiftPressedDown = true
          const releaseShiftKey = e => {
            e.stopPropagation()
            if (e.key !== 'Shift') return
            this.#shiftPressedDown = false
            this.removeEventListener('keyup', releaseShiftKey)
          }
          this.addEventListener('keyup', releaseShiftKey)
          break
        }
      }
    })
  }

  /**
   * Initialize nav windows menu
   * @param {ChatConnectionSocket} chatSocket chat socket
   */
  #initializeNavWindows (chatSocket) {
    // Profile
    this.#profileWindowComp = this.#createNavWindow('Profile', null)
    this.#usernameEditableField = this.#createEditableField('👤 Username', chatSocket.getUsername(), (val, signal) => this.updateUsername(val, signal))
    this.#channelEditableField = this.#createEditableField('📡 Channel', chatSocket.getChannel(), (val, signal) => this.updateChannel(val, signal))
    this.#profileWindowComp.addContent(this.#usernameEditableField)
    this.#profileWindowComp.addContent(this.#channelEditableField)
    this.#profileWindowComp.addContent(this.#createClearCacheButton())

    // About
    this.#aboutWindowComp = this.#createNavWindow('About', this.#aboutWindowContent())
  }

  #aboutWindowContent () {
    const aboutContent = document.createElement('div')
    aboutContent.className = 'about-content'

    const icon = document.createElement('img')
    icon.src = chatIcon
    icon.classList.add('about-icon')

    const titleApp = document.createElement('h1')
    titleApp.textContent = 'Chat'
    titleApp.classList.add(...['font-bold'])

    const textApp = document.createElement('p')
    textApp.textContent = 'This is an application made to chat with other students at Linnaeus University.'
    textApp.classList.add(...['text-xs'])

    const copyrightText = document.createElement('p')
    copyrightText.textContent = '© 2023-2024 - Linnaeus University - ea224pg'
    copyrightText.className = 'copyright-text'

    aboutContent.append(icon, titleApp, textApp, copyrightText)

    return aboutContent
  }

  #createClearCacheButton () {
    this.#clearMessageCacheBtn = document.createElement('button')
    this.#clearMessageCacheBtn.textContent = 'Clear Message Cache'
    this.#clearMessageCacheBtn.className = 'rounded w-full text-white font-bold'
    this.#clearMessageCacheBtn.style.backgroundColor = '#26b0b0'
    this.#clearMessageCacheBtn.addEventListener('click', e => {
      e.stopPropagation()
      localStorage.removeItem('cachedMessages')
      this.#showEventChatWindow('✉️ Cleared message cache')
      ChatApp.#chatWindowMessages = []
    })
    return this.#clearMessageCacheBtn
  }

  #initializeNavButtons () {
    const navButtons = [
      this.#createNavBtn('Profile', '🙋‍♂️', this.#profileWindowComp),
      this.#createNavBtn('About', '‍❔', this.#aboutWindowComp)
    ]

    navButtons.forEach(btn => {
      this.#navBarHTML.appendChild(btn)
    })
  }

  /**
   * Adds any HTML element to the chat window
   * @param {HTMLElement} element html element
   */
  #addElementToChatWindow (element) {
    this.#chatWindowHTML.appendChild(element)
    this.#scrollToBottomChatWindow()
  }

  /**
   * Updates username
   * @param {string} username new username
   * @param {boolean} signalChangeToSocket should the change be notified to the socket
   */
  updateUsername (username, signalChangeToSocket) {
    const p1 = document.createElement('span')
    p1.textContent = '👤 Changed username from '
    p1.style.color = 'blue'

    const p2 = document.createElement('span')
    p2.textContent = this.#chatSocket.getUsername()
    p2.style.color = 'violet'

    const p3 = document.createElement('span')
    p3.textContent = ' to '
    p3.style.color = 'blue'

    const p4 = document.createElement('span')
    p4.textContent = username
    p4.style.color = 'violet'

    if (signalChangeToSocket) this.#chatSocket.changeUsername(username)
    else {
      this.#showEventChatWindowCustomDestructured(p1, p2, p3, p4)
      if (this.#usernameEditableField) this.#usernameEditableField.updateCurrentValue(username)
    }
  }

  /**
   * Updates channel
   * @param {string} channel new channel
   * @param {boolean} signalChangeToSocket should the change be notified to the socket
   */
  updateChannel (channel, signalChangeToSocket) {
    const p1 = document.createElement('span')
    p1.textContent = '📡 Changed channel from '
    p1.style.color = 'blue'

    const p2 = document.createElement('span')
    p2.textContent = this.#chatSocket.getChannel()
    p2.style.color = 'violet'

    const p3 = document.createElement('span')
    p3.textContent = ' to '
    p3.style.color = 'blue'

    const p4 = document.createElement('span')
    p4.textContent = channel
    p4.style.color = 'violet'

    if (signalChangeToSocket) this.#chatSocket.changeChannel(channel)
    else {
      this.#showEventChatWindowCustomDestructured(p1, p2, p3, p4)
      if (this.#channelEditableField) this.#channelEditableField.updateCurrentValue(channel)
    }
  }

  /**
   * Shows event/notification in chat window
   * @param {string} message message to show
   * @param {string} color OPTIONAL CSS color (default violet/pink)
   */
  #showEventChatWindow (message, color) {
    const eventMsg = document.createElement('p')
    eventMsg.textContent = message
    eventMsg.classList.add('message-event')
    if (color !== null) eventMsg.style.color = color
    this.#addElementToChatWindow(eventMsg)
  }

  /**
   * More custom/manual version of {@link ChatApp.#showEventChatWindow} which allows inline styling of span elements
   * Mostly used for highlighting words somewhere in the text
   *
   * NOTE: spaces are not added between span elements
   * @param {HTMLSpanElement} elements parameters of span HTML elements
   */
  #showEventChatWindowCustomDestructured (...elements) {
    const container = document.createElement('span')
    container.classList.add('message-event')
    elements.forEach(element => {
      container.appendChild(element)
    })
    this.#addElementToChatWindow(container)
  }

  #scrollToBottomChatWindow () {
    this.#chatWindowHTML.scrollTop = this.#chatWindowHTML.scrollHeight
  }

  /**
   * Creates message bubble from ChatWindowMessage class object
   * @param {ChatWindowMessage} message message object
   * @returns {HTMLDivElement} message bubble element
   */
  #createMessageBubble (message) {
    const msgWrapper = document.createElement('div')
    msgWrapper.classList.add(...['message-wrapper', message.isMyMessage ? 'message-right' : 'message-left'])

    const username = document.createElement('p')
    username.classList.add('message-username')
    username.textContent = message.author

    const msgBubble = document.createElement('div')
    msgBubble.classList.add(...['message-bubble', message.isMyMessage ? 'bubble-right' : 'bubble-left'])
    msgBubble.textContent = message.message
    msgBubble.style.backgroundColor = message.isMyMessage ? '#26b0b0' : '#797bf8'

    const date = document.createElement('p')
    date.classList.add('message-date')
    date.textContent = message.date

    // ADDS HOVER TO SHOW DATE BELOW MESSAGE
    // date.style.visibility = 'hidden'
    // this.#addHoverEventMessageBubble(msgWrapper, msgBubble, username, date)

    msgWrapper.append(username, msgBubble, date)
    return msgWrapper
  }

  /**
   * Adds hover effect to show the date on a message bubble
   * @param {HTMLElement} msgBubble message bubble
   * @param {HTMLElement} date date
   */
  #addHoverEventMessageBubble (msgBubble, date) {
    const hideDate = e => {
      e.stopPropagation()
      date.style.visibility = 'hidden'
    }

    const showDate = e => {
      e.stopPropagation()
      date.style.visibility = 'visible'
      msgBubble.addEventListener('mouseleave', hideDate)
    }

    msgBubble.addEventListener('mouseover', showDate)
  }

  /**
   * Creates editable field used in nav windows
   * @param {string} title option field title
   * @param {string} currentValue current value
   * @param {Function} onClickEdit onclick function
   * @returns {OptionFieldEditable} HTML element field option
   */
  #createEditableField (title, currentValue, onClickEdit) {
    return new OptionFieldEditable(title, currentValue, onClickEdit)
  }

  /**
   * Creates nav menu button
   * @param {string} value html value
   * @param {string} textContent button inner content
   * @param {NavWindow} navWindow corresponding window which will be opened when pressing button
   * @returns {HTMLButtonElement} navigation menu button
   */
  #createNavBtn (value, textContent, navWindow) {
    const btn = document.createElement('button')
    btn.classList.add('nav-btn')
    btn.textContent = textContent
    btn.value = value
    btn.addEventListener('click', e => {
      e.stopPropagation()
      this.#showNavWindow(navWindow, btn)
      const closeNavBar = e => {
        e.stopPropagation()
        this.#hideNavWindow(navWindow)
        this.#mainWindowHTML.removeEventListener('click', closeNavBar)
        btn.classList.remove('nav-btn-selected')
        this.#hideNavWindow(navWindow)
        this.#currentNavWindowShown = null
        this.#currentNavBtnSelected = null
      }
      this.#mainWindowHTML.addEventListener('click', closeNavBar)
    })
    this.#btnAddHoverTooltipEventListener(btn, value)
    return btn
  }

  #btnAddHoverTooltipEventListener (btn, value) {
    const tooltip = this.#createNavBtnTooltip(value)
    this.#chatWrapperHTML.appendChild(tooltip)

    const showTooltip = e => {
      e.stopPropagation()
      tooltip.style.display = 'block'
      const chatWrapperRect = this.#chatWrapperHTML.getBoundingClientRect()
      const rectBtn = btn.getBoundingClientRect()
      const heightDifference = btn.offsetHeight - tooltip.offsetHeight
      tooltip.style.top = ((heightDifference / 2) + (rectBtn.top - chatWrapperRect.top)) + 'px'
      tooltip.style.left = ((rectBtn.right - chatWrapperRect.left) + 8) + 'px'
      btn.addEventListener('mouseleave', hideTooltip)
    }

    const hideTooltip = e => {
      e.stopPropagation()
      tooltip.style.display = 'none'
      btn.removeEventListener('mouseleave', hideTooltip)
    }

    btn.addEventListener('mouseover', showTooltip)
  }

  #createNavBtnTooltip (title) {
    const tooltip = document.createElement('h1')
    tooltip.textContent = title
    tooltip.classList.add('nav-btn-tooltip')
    return tooltip
  }

  #createNavWindow (title, extraCustomContent) {
    const navWindow = new NavWindow(true, title, extraCustomContent)
    navWindow.setLeftAbsolute(-200)
    navWindow.style.transition = ChatApp.#windowTransitionStyle
    this.#chatWrapperHTML.appendChild(navWindow)
    return navWindow
  }

  #showNavWindow (navWindowHTML, btnHTML) {
    if (this.#navWindowCloseInProgress) return // Don't process if some other nav bar is still closing
    if (this.#currentNavWindowShown === null) { // Shows nav window when no other window shown
      this.#slideNavWindow(navWindowHTML)
      this.#selectNewNavWindow(navWindowHTML, btnHTML)
    } else { // Some nav window is already open
      if (this.#currentNavWindowShown !== navWindowHTML) { // Hides current nav window and shows another
        this.#hideNavWindow(this.#currentNavWindowShown)
        // Let the previous windows completely close before opening the next one
        this.#navWindowCloseInProgress = true
        setTimeout(() => {
          this.#slideNavWindow(navWindowHTML)
          this.#navWindowCloseInProgress = false
        }, ChatApp.#windowTransitionMS)
        this.#currentNavBtnSelected.classList.remove('nav-btn-selected')
        this.#selectNewNavWindow(navWindowHTML, btnHTML)
      } else { // Same nav-btn clicked hides the nav window for that same button
        this.#hideNavWindow(navWindowHTML)
        this.#currentNavBtnSelected.classList.remove('nav-btn-selected')
        this.#currentNavWindowShown = null
        this.#currentNavBtnSelected = null
      }
    }
  }

  #slideNavWindow (navWindowHTML) {
    navWindowHTML.style.transform = `translateX(${200 + this.#navBarHTML.offsetWidth}px)`
  }

  #selectNewNavWindow (navWindowHTML, btnHTML) {
    this.#currentNavWindowShown = navWindowHTML
    this.#currentNavBtnSelected = btnHTML
    btnHTML.classList.add('nav-btn-selected')
  }

  #hideNavWindow (navWindowHTML) {
    navWindowHTML.style.transform = 'translateX(0px)'
  }

  async close () {
    return new Promise((resolve, reject) => {
      if (this.#chatSocket !== null) {
        this.#chatSocket.closeConnection()
      }
      resolve(true)
    })
  }
}

customElements.define('chat-app', ChatApp)
