/**
 * Process ID Service for the Personal Web Desktop environment
 *
 * Responsible for maintaining process IDs and generating new unique IDs for new processes
 *
 * Created by: ea224pg
 * 2024-01-09 Linnaeus University
 */
export default class ProcessIdService {
  #activeProcessIds
  #currentHighestId
  #removedIds

  constructor () {
    this.#activeProcessIds = new Set()
    this.#removedIds = []
    this.#currentHighestId = 1
  }

  generateUniqueProcessID () {
    if (this.#activeProcessIds.size === 0) return 1
    else {
      if (this.#removedIds.length === 0) return ++this.#currentHighestId
      else return this.#removedIds.pop()
    }
  }

  generateUniqueProcessIDAndAddActive () {
    const uniqueId = this.generateUniqueProcessID()
    this.addActiveProcessId(uniqueId)
    return uniqueId
  }

  isProcessIdActive (pId) {
    return this.#activeProcessIds.has(pId)
  }

  addActiveProcessId (pId) {
    this.#activeProcessIds.add(pId)
  }

  removeActiveProcessId (pId) {
    this.#activeProcessIds.delete(pId)
    this.#removedIds.push(pId)

    // Reset everything if no active processes running
    if (this.#activeProcessIds.size === 0) {
      this.#removedIds = []
      this.#currentHighestId = 1
    }
  }
}
