import Question from './question.js'

/** Extension of {@link Question} with alternatives instead of input question */
export default class QuestionAlternatives extends Question {
  #alternatives
  constructor (id, question, nextURL, message, alternatives) {
    super(id, question, nextURL, message)
    this.#alternatives = alternatives
  }
}
