/**
 * Timer class which counts in seconds(s) either counting up from 0 or counting down from a specific value until 0
 */
export default class Timer {
  seconds
  #timerSetTimeout
  #timerStopped

  constructor () {
    this.seconds = 0
    this.#timerSetTimeout = null
    this.#timerStopped = true
  }

  /**
   * Start timer counting from 0 seconds until {@link Timer.stopTimer} is called
   * @param {Function} callbackOnEveryTick callback function to call every second
   */
  startTimerIncrementing (callbackOnEveryTick) {
    this.#timerStopped = false
    this.#startTimerIncrementing(callbackOnEveryTick)
  }

  /**
   * Private implementation of {@link Timer.startTimerIncrementing}
   * @param {Function} callbackOnEveryTick callback function to call every second
   */
  #startTimerIncrementing (callbackOnEveryTick) {
    this.#timerSetTimeout = setTimeout(() => {
      this.#increment()
      callbackOnEveryTick()
      this.#startTimerIncrementing(callbackOnEveryTick)
    }, 1000)
  }

  /**
   * Start timer counting down from {@link secondsToStartFrom} seconds until 0 or until {@link Timer.stopTimer} is called
   * @param {number} secondsToStartFrom countdown to start from until 0
   * @param {Function} callbackOnEveryTick callback function to call every second
   * @param {Function} callbackOnTimerFinished callback when countdown reaches 0
   */
  startTimerDecreasing (secondsToStartFrom, callbackOnEveryTick, callbackOnTimerFinished) {
    this.#timerStopped = false
    this.seconds = secondsToStartFrom
    // callbackOnEveryTick()
    this.#startTimerDecreasing(this.seconds, callbackOnEveryTick, callbackOnTimerFinished)
  }

  /**
   * Private implementation of {@link Timer.startTimerDecreasing}
   * @param {number} secondsToStartFrom countdown to start from until 0
   * @param {Function} callbackOnEveryTick callback function to call every second
   * @param {Function} callbackOnTimerFinished callback when countdown reaches 0
   */
  #startTimerDecreasing (secondsToStartFrom, callbackOnEveryTick, callbackOnTimerFinished) {
    this.#timerSetTimeout = setTimeout(() => {
      this.#decrement()
      callbackOnEveryTick()

      if (this.seconds < 1) {
        callbackOnTimerFinished()
        this.stopTimer()
        return
      }

      this.#startTimerDecreasing(this.seconds, callbackOnEveryTick, callbackOnTimerFinished)
    }, 1000)
  }

  #increment () {
    this.seconds++
  }

  #decrement () {
    this.seconds--
  }

  /** Stops timer */
  stopTimer () {
    if (this.#timerSetTimeout === null) return
    clearTimeout(this.#timerSetTimeout)
  }

  /** Resets timer back to 0 seconds */
  resetTimer () {
    if (this.#timerSetTimeout === null) return
    this.seconds = 0
  }

  /**
   * String representation of {@link Timer.seconds}
   * @returns {string} seconds string
   */
  toString () {
    const hh = this.seconds < 3600 ? 0 : Math.floor(this.seconds / 3600)
    const mm = this.seconds < 60 ? 0 : Math.floor((this.seconds % 3600) / 60)
    const ss = this.seconds % 60
    if (hh < 1) return `${mm < 10 ? `0${mm}` : mm}:${ss < 10 ? `0${ss}` : ss}`
    return `${hh < 10 ? `0${hh}` : hh}:${mm < 10 ? `0${mm}` : mm}:${ss < 10 ? `0${ss}` : ss}`
  }
}
