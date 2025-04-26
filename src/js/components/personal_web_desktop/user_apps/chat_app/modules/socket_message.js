import { API_KEY } from '../config.js'

/**
 * Socket message used in chat application to send messages to the socket
 */
export default class SocketMessage {
  static KEY = API_KEY

  constructor () {
    this.type = ''
    this.data = ''
    this.username = ''
    this.channel = ''
  }

  addType (type) {
    this.type = type
    return this
  }

  addData (data) {
    this.data = data
    return this
  }

  addUsername (username) {
    this.username = username
    return this
  }

  addChannel (channel) {
    this.channel = channel
    return this
  }

  /**
   * Build the JSON object from added items
   * @returns {{data: string, channel: string, type: string, key: string, username: string}} message JSON representation
   */
  build () {
    return {
      type: this.type,
      data: this.data,
      username: this.username,
      channel: this.channel,
      key: SocketMessage.KEY
    }
  }
}
