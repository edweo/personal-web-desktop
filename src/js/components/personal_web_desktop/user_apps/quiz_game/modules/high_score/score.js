/** Score class to represent a user with the corresponding score in the quiz game */
export default class Score {
  #sessionScore
  #username

  constructor (username, sessionScore) {
    this.#sessionScore = sessionScore
    this.#username = username
  }

  get sessionScore () {
    return this.#sessionScore
  }

  get username () {
    return this.#username
  }

  /**
   * Returns JSON stringify of {@link Score}
   * @returns {string} JSON string
   */
  toJSON () {
    return JSON.stringify(this.toObject())
  }

  /**
   * Returns JS object of {@link Score}
   * @returns {object} JS Object
   */
  toObject () {
    return {
      username: this.#username,
      score: this.#sessionScore
    }
  }
}
