/** Simple data class (record) of a question object */
export default class Question {
  #answer
  isCorrectAnswer
  #limit
  constructor (id, question, nextURL, message) {
    this.id = id
    this.question = question
    this.nextURL = nextURL
    this.message = message
  }

  get limit () {
    return this.#limit
  }

  set limit (value) {
    this.#limit = value
  }

  setAnswer (answer) {
    this.#answer = answer
  }

  getAnswer () {
    return this.#answer
  }

  setIsAnswerCorrect (isCorrect) {
    this.isCorrectAnswer = isCorrect
  }

  getIsAnswerCorrect () {
    return this.isCorrectAnswer
  }
}
