import Score from './score.js'

/** Class that manages the localStorage for storing HighScores in the quiz game */
export default class HighScoreManager {
  static #MAX_HIGH_SCORES = 5
  static HIGH_SCORE_LOCAL_STORAGE = 'highScores'

  /**
   * Checks if the username and score is a new high-score
   * @param {string} username session username
   * @param {number} time quiz time completed in seconds
   * @returns {boolean} true if new high score
   */
  isNewHighScore (username, time) {
    const score = new Score(username, time)
    const currentHighScoresJSON = this.getHighScoresLocalStorageJSON()

    // If the very first high-score
    if (!currentHighScoresJSON) {
      this._updateHighScoreLocalStorage([score.toObject()])
      return true
    }

    // If high-score has score entries
    const highScoresArray = Object.values(currentHighScoresJSON)
    const isNewHighScore = this.#isNewHighScore(highScoresArray, score)
    if (isNewHighScore) {
      this._updateHighScoreLocalStorage(highScoresArray)
      return true
    }

    return false
  }

  /**
   * Sorts array of {@link Score} objects in ascending order based on score
   * @param {object} a score object 1
   * @param {object} b score object 2
   * @returns {number} predicate smaller or larger
   */
  #sortHighScoresArrayAscendingScore (a, b) {
    return a.score - b.score
  }

  /**
   * Retrieves high-score data from localStorage
   * @returns {any} JSON Object of high scores
   */
  getHighScoresLocalStorageJSON () {
    return JSON.parse(localStorage.getItem(HighScoreManager.HIGH_SCORE_LOCAL_STORAGE))
  }

  /**
   * Updates high scores in localStorage
   * @param {[]} newHighScoreArray new high-scores array
   * @private
   */
  _updateHighScoreLocalStorage (newHighScoreArray) {
    localStorage.setItem(HighScoreManager.HIGH_SCORE_LOCAL_STORAGE, JSON.stringify(newHighScoreArray))
  }

  /**
   * Private abstraction implementation of {@link HighScoreManager.isNewHighScore}
   * @param {[]} highScoresArray current high scores in array form
   * @param {object} score session score for checking if new high-score
   * @returns {boolean} true if new high score
   */
  #isNewHighScore (highScoresArray, score) {
    // If high score does not contain MAX_HIGH_SCORE amount of entries
    if (highScoresArray.length < HighScoreManager.#MAX_HIGH_SCORES) {
      highScoresArray.push(score.toObject())
      highScoresArray.sort(this.#sortHighScoresArrayAscendingScore)
      return true
    // Check if new high score entry
    } else {
      const newHighScoreFound = highScoresArray.find(entry => score.sessionScore < entry.score)
      if (newHighScoreFound) {
        const highScoreIndex = highScoresArray.indexOf(newHighScoreFound)

        // Add new entry
        highScoresArray.splice(highScoreIndex, 0, score.toObject())

        // Pop last entry
        highScoresArray.pop()
        return true
      }
    }
    return false
  }
}
