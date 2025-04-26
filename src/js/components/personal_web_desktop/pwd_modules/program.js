/**
 * Program for the Personal Web Desktop environment
 *
 * Created by: ea224pg
 * 2024-01-09 Linnaeus University
 */
export default class Program {
  #name
  #iconPath
  #createProgram
  #options

  /**
   * Create an executable for a program
   * @param {object} options pwd options for the current program
   * @param {Array} classParams embedded app/class parameters to constructor
   */
  constructor (options, classParams) {
    this.#name = options.name
    this.#iconPath = options.icon

    if (classParams) {
      this.#createProgram = () => options.exe(...classParams)
    } else {
      this.#createProgram = () => options.exe()
    }

    this.#options = options
  }

  get name () {
    return this.#name
  }

  get iconPath () {
    return this.#iconPath
  }

  get options () {
    return this.#options
  }

  createProgramInstance () {
    return this.#createProgram()
  }
}
