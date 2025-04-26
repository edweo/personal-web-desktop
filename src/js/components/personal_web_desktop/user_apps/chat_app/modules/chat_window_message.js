export default class ChatWindowMessage {
  #author
  #date
  #message
  #isMyMessage

  constructor (author, date, message, isMyMessage) {
    this.#author = author
    this.#date = date
    this.#message = message
    this.#isMyMessage = isMyMessage
  }

  static fromJSON (json) {
    return new ChatWindowMessage(json.author, json.date, json.message, json.isMyMessage)
  }

  get author () {
    return this.#author
  }

  get date () {
    return this.#date
  }

  get message () {
    return this.#message
  }

  get isMyMessage () {
    return this.#isMyMessage
  }

  getJSON () {
    return {
      author: this.#author,
      date: this.#date,
      message: this.#message,
      isMyMessage: this.#isMyMessage
    }
  }
}
