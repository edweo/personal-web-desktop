const template = document.createElement('template')
template.innerHTML = `
<div class="option-field-wrapper">
    <h1 class="title text-white"></h1>
    <div class="field bg-gradient-to-b from-blue-400 to-violet-500 rounded w-full font-bold px-1 py-0.5 
                flex justify-between items-center gap-2">
        <h2 class="field-name text-white break-normal"></h2>
    </div>
    <div class="dropdown-container overflow-hidden w-full">
      <div class="dropdown-menu w-full flex p-1 gap-1">
        <input type="text" placeholder="new" class="w-full h-6 font-xs p-1 bg-white rounded">
        <button class="edit-btn bg-white text-blue-800 text-xs rounded px-1 py-0.5 font-bold self-start h-full">✏️</button>
      </div>
    </div>
</div>
`

export default class OptionFieldEditable extends HTMLElement {
  #titleHTML
  #currentValueHTML
  #fieldHTML
  #dropdownContainerHTML
  #dropdownHTML
  #editBtnHTML
  #inputHTML

  constructor (title, currentValue, onClickEdit) {
    super()
    this.appendChild(template.content.cloneNode(true))

    this.#titleHTML = this.querySelector('.title')
    this.#currentValueHTML = this.querySelector('.field-name')
    this.#dropdownContainerHTML = this.querySelector('.dropdown-container')
    this.#dropdownHTML = this.querySelector('.dropdown-menu')
    this.#editBtnHTML = this.querySelector('.edit-btn')
    this.#fieldHTML = this.querySelector('.field')
    this.#inputHTML = this.querySelector('input')

    this.#titleHTML.textContent = title
    this.#currentValueHTML.textContent = currentValue

    this.#fieldHTML.addEventListener('click', e => {
      e.stopPropagation()
      this.#showDropdownMenu()
    })

    this.#editBtnHTML.addEventListener('click', e => {
      e.stopPropagation()
      if (this.#inputHTML.value.length > 0) {
        onClickEdit(this.#inputHTML.value, true)
        this.updateCurrentValue(this.#inputHTML.value)
        this.#inputHTML.value = ''
        this.#hideDropdownMenu()
      }
    })
  }

  updateCurrentValue (val) {
    this.#currentValueHTML.textContent = val
  }

  connectedCallback () {
    this.#dropdownHTML.style.top = `-${this.#dropdownContainerHTML.offsetHeight}px`
    this.#hideDropdownMenu()
  }

  #showDropdownMenu () {
    this.#dropdownContainerHTML.style.display = 'flex'
    this.#dropdownHTML.style.transform = `translateY(${this.#dropdownContainerHTML.offsetHeight}px)`
  }

  #hideDropdownMenu () {
    this.#dropdownContainerHTML.style.display = 'none'
  }
}

customElements.define('option-field-editable', OptionFieldEditable)
