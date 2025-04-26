const template = document.createElement('template')
template.innerHTML = `
<div class="nav-window-wrapper bg-blue-950 p-4">
    <h1 class="title font-bold text-white mb-6"></h1>
    <div class="content w-full flex flex-col justify-center items-center rounded gap-3"></div>
</div>
`

export default class NavWindow extends HTMLElement {
  #navWindowWrapperHTML
  #titleHTML
  #contentHTML

  constructor (isAbsolute, title, extraCustomContent) {
    super()
    this.appendChild(template.content.cloneNode(true))

    this.#navWindowWrapperHTML = this.querySelector('.nav-window-wrapper')
    this.#titleHTML = this.querySelector('.title')
    this.#contentHTML = this.querySelector('.content')
    this.#titleHTML.textContent = title

    if (extraCustomContent) this.#contentHTML.append(extraCustomContent)

    if (isAbsolute) {
      this.style.position = 'absolute'
      this.#navWindowWrapperHTML.style.position = 'absolute'
      this.setTopAbsolute(0)
      this.setLeftAbsolute(0)
    }
  }

  addContent (elementHTML) {
    this.#contentHTML.appendChild(elementHTML)
  }

  setLeftAbsolute (px) {
    this.#navWindowWrapperHTML.style.left = px + 'px'
  }

  setTopAbsolute (px) {
    this.#navWindowWrapperHTML.style.top = px + 'px'
  }
}

customElements.define('nav-window', NavWindow)
