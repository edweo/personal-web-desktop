import SocketMessage from './socket_message.js'
import ChatWindowMessage from './chat_window_message.js'
import { SOCKET_ADDRESS } from '../config.js'

export default class ChatConnectionSocket {
  static #SOCKET_CHAT_ADDRESS = SOCKET_ADDRESS
  static #username = null
  static #channel = null
  static #myLastSentMessage
  static #localChatClients = []

  // State
  #socket
  #chatClientComp

  // Outside functions
  #showEventChatWindow // Displays event/notification to the chat window, such as CONNECTION ESTABLISHED
  #addChatMessageBubbleToWindow

  constructor (showEventChatWindow, addChatMessageBubbleToWindow, chatClientComp) {
    this.#showEventChatWindow = showEventChatWindow
    this.#addChatMessageBubbleToWindow = addChatMessageBubbleToWindow
    this.#chatClientComp = chatClientComp
    ChatConnectionSocket.#localChatClients.push(chatClientComp)
    this.#establishConnection()
  }

  initializeUsername (username) {
    ChatConnectionSocket.#username = username
    localStorage.setItem('username', username)
  }

  initializeChannel (channel) {
    ChatConnectionSocket.#channel = channel
    localStorage.setItem('channel', channel)
  }

  changeUsername (username) {
    if (ChatConnectionSocket.#username === username) return
    if (this.#shouldBroadcast()) {
      ChatConnectionSocket.#localChatClients.forEach(localChatClient => {
        localChatClient.updateUsername(username, false)
      })
    } else {
      this.#chatClientComp.updateUsername(username, false)
    }
    localStorage.setItem('username', username)
    ChatConnectionSocket.#username = username
  }

  getUsername () {
    return ChatConnectionSocket.#username
  }

  changeChannel (channel) {
    if (ChatConnectionSocket.#channel === channel) return
    if (this.#shouldBroadcast()) {
      ChatConnectionSocket.#localChatClients.forEach(localChatClient => {
        localChatClient.updateChannel(channel, false)
      })
    } else {
      this.#chatClientComp.updateChannel(channel, false)
    }
    localStorage.setItem('channel', channel)
    ChatConnectionSocket.#channel = channel
  }

  getChannel () {
    return ChatConnectionSocket.#channel
  }

  #shouldBroadcast () {
    return ChatConnectionSocket.#localChatClients.length > 1
  }

  #establishConnection () {
    // this.#showEventChatWindow('Trying to connect to chat...')
    this.#socket = new WebSocket(ChatConnectionSocket.#SOCKET_CHAT_ADDRESS)

    // NOT USED FOR NOW
    // this.#socket.addEventListener('open', e => {
    //   e.stopPropagation()
    // })

    this.#socket.addEventListener('message', e => {
      e.stopPropagation()
      this.#handleIncomingSocketMessage(e.data)
    })

    this.#socket.addEventListener('close', e => {
      e.stopPropagation()
      this.#showEventChatWindow('CONNECTION CLOSED', 'red')
    })

    this.#socket.addEventListener('error', e => {
      e.stopPropagation()
      this.#showEventChatWindow(('SOCKET ERROR: ' + e), 'red')
    })
  }

  closeConnection () {
    if (this.#socket.readyState !== 1) return
    this.#socket.close()
    ChatConnectionSocket.#localChatClients =
        ChatConnectionSocket.#localChatClients.filter(client => client !== this.#chatClientComp)
  }

  /**
   * Send message via socket
   * @param {SocketMessage} socketMessage message to send
   * @returns {Promise<boolean>} returns true if message was sent via socket
   */
  async sendChatMessage (socketMessage) {
    return new Promise((resolve, reject) => {
      if (this.#socket.readyState !== 1) {
        return resolve(false)
      } else {
        ChatConnectionSocket.#myLastSentMessage = {
          username: socketMessage.username,
          channel: socketMessage.channel,
          data: socketMessage.data
        }
        this.#socket.send(JSON.stringify(socketMessage.build()))
        return resolve(true)
      }
    })
  }

  /**
   * Handles incoming socket message
   * @param {string} incomingMessageSocket socket message JSON string
   */
  #handleIncomingSocketMessage (incomingMessageSocket) {
    const msg = JSON.parse(incomingMessageSocket)
    switch (msg.type) {
      case 'message':
        this.#handleSocketMessage(msg)
        break
      case 'notification':
        this.#handleSocketChatNotification(msg)
        break
      case 'heartbeat':
        break
    }
  }

  /**
   * Handles received message from socket
   * @param {object} msg message from socket
   */
  #handleSocketMessage (msg) {
    // Filter and show only messages from other clients (not the current process window client)
    if (!this.#isBroadcastMessageFromThisClient(msg)) {
      const chatWindowMessage = new ChatWindowMessage(msg.username, new Date().toLocaleString(), msg.data, false)
      this.#addChatMessageBubbleToWindow(chatWindowMessage)
    }
  }

  /**
   * Handles socket messages of type 'notification'
   * @param {object} msg message object
   */
  #handleSocketChatNotification (msg) {
    switch (msg.data) {
      case `${msg.username} has joined the chat`:
        this.#showEventChatWindow(`🔌 ${msg.data}`)
        break
      case 'You are connected!':
        this.#showEventChatWindow(`🔌 ${msg.data}`, 'green')
        break
      default:
        this.#showEventChatWindow(msg.data)
        break
    }
  }

  /**
   * Checks if received message was sent from this computer
   * @param {object} msg message object
   * @returns {boolean} true if broadcast message to other open clients
   */
  #isBroadcastMessageFromThisClient (msg) {
    let isMyMsg
    if (ChatConnectionSocket.#myLastSentMessage === null) {
      isMyMsg = false
    } else {
      const strMsg = JSON.stringify({ username: msg.username, channel: msg.channel, data: msg.data })
      isMyMsg = JSON.stringify(ChatConnectionSocket.#myLastSentMessage) === strMsg
    }
    return isMyMsg
  }
}
