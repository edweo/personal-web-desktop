import defaultIcon from './default_icon.png'

const template = document.createElement('template')
template.innerHTML = `
<div class="window rounded overflow-hidden">
    <div class="window-top flex flex-col">
        <div class="flex justify-between">
          <div class="window-info w-full flex gap-1 items-center">
              <img src="" alt="icon" class="icon ml-1" draggable="false">
              <p class="title text-white leading-none">Program</p>
          </div>
          
          <div class="buttons flex">
              <button class="window-btn minimise-btn hover:bg-white/10">                
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 
                  0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
              </button>
          
              <button class="window-btn default-size-btn hover:bg-white/10">                
                <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 24 24" stroke-width="1.5" 
                    stroke="#fff" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6" />
                </svg>
              </button>
              
              <button class="window-btn maximize-btn hover:bg-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 px-1">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </button>
              
              <button class="window-btn close-btn hover:bg-red-700">
                <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="#fff" class="w-6 h-6 px-1">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
          </div>
        </div>
        
        <div class="window-options bg-white">OPTIONS</div>
    </div>
    
    <div class="window-content flex justify-center items-center"></div>
    
    <div class="window-bottom bg-white">BOTTOM</div>
    
    <div class="resize-arrow bg-white bg-opacity-50 cursor-nwse-resize absolute bottom-0 right-0 z-50">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
      stroke="currentColor" class="w-2 h-2">
        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 4.5 15 15m0 0V8.25m0 11.25H8.25" />
      </svg>
    </div>
</div>
`

/**
 * Process Window for the Personal Web Desktop environment
 *
 * Created by: ea224pg
 * 2024-01-09 Linnaeus University
 */
export default class ProcessWindow extends HTMLElement {
  // State
  #pID
  #appComp
  #iconPath
  #pwdOptions

  // in pixels (px), not including the top/bottom of process window, only content (appComp)
  #defaultWindowSizeAppComp
  #currentWindowWidth
  #currentWindowHeight
  #topBarHeight

  // HTML elements
  #infoHTML
  #iconHTML
  #titleHTML
  #optionsHTML
  #contentHTML
  #topHTML
  #bottomHTML
  #resizeArrowHTML

  /**
   * Creates a new Process Window component
   * @param {number} pID process id
   * @param {string} iconPath app icon path
   * @param {string} title app title
   * @param {object} options optional options
   * @param {HTMLElement} appComp app web component to embed in the process window
   */
  constructor (pID, iconPath, title, options, appComp) {
    super()
    this.appendChild(template.content.cloneNode(true))

    this.#pID = pID
    this.#appComp = appComp

    this.#topHTML = this.querySelector('.window-top')
    this.#infoHTML = this.querySelector('.window-info')
    this.#iconHTML = this.querySelector('.icon')
    this.#titleHTML = this.querySelector('.title')
    this.#optionsHTML = this.querySelector('.window-options')
    this.#contentHTML = this.querySelector('.window-content')
    this.#bottomHTML = this.querySelector('.window-bottom')
    this.#resizeArrowHTML = this.querySelector('.resize-arrow')

    this.#titleHTML.textContent = title
    this.#pwdOptions = options

    // Add app icon
    if (iconPath) this.#iconHTML.src = iconPath
    else this.#iconHTML.src = defaultIcon // Default icon

    // Options
    if (options) {
      if (options.window_padding) this.querySelector('.window-content').style.padding = 10 + 'px'

      if (options.window_options_bar) {
        console.log('not implemented window option bar top')
      } else this.querySelector('.window-options').classList.add('hidden')

      if (options.window_bottom_bar) {
        console.log('not implemented window option bar bottom')
      } else this.querySelector('.window-bottom').classList.add('hidden')
    }

    // Embed application web-component
    this.#contentHTML.appendChild(appComp)
    this.#iconPath = iconPath
  }

  connectedCallback () {
    const appRect = this.#appComp.getBoundingClientRect()
    this.#defaultWindowSizeAppComp = { width: appRect.width, height: appRect.height }
    this.#currentWindowWidth = appRect.width
    this.#currentWindowHeight = appRect.height
    this.#topBarHeight = this.#infoHTML.getBoundingClientRect().height

    this.#addDragEvents()
    this.#addResizeWindowEvents()
    this.#addCloseWindowEvent()
    this.#addMaximizeWindowEvent()
    this.#addMinimiseWindowEvent()
    this.#addResizeToDefaultWindowEvent()
  }

  get iconPath () {
    return this.#iconPath
  }

  #resizeAppCompWindow (newWidth, newHeight) {
    const appCompWrapper = this.#appComp.childNodes[1]

    if (appCompWrapper) {
      this.#appComp.childNodes[1].style.width = newWidth + 'px'
      this.#appComp.childNodes[1].style.height = newHeight + 'px'
      this.#currentWindowHeight = newHeight
      this.#currentWindowWidth = newWidth
    } else {
      this.#resizeArrowHTML.style.display = 'none'
      throw new Error('ERROR Re-sizing: application does not have a wrapper')
    }
  }

  #addResizeWindowEvents () {
    // Don't add resize events if app component has no wrapper
    if (!this.#appComp.childNodes[1]) {
      this.#resizeArrowHTML.style.display = 'none'
      return
    }

    if (this.#pwdOptions.resizable !== true) {
      this.#resizeArrowHTML.style.display = 'none'
      return
    }

    const onDrag = ({ movementX, movementY }) => {
      this.#resizeAppCompWindow((this.#currentWindowWidth + movementX), (this.#currentWindowHeight + movementY))
    }

    this.#resizeArrowHTML.addEventListener('mousedown', e => {
      e.stopPropagation()
      document.addEventListener('mousemove', onDrag)
      document.addEventListener('mouseup', removeOnDrag)
    })

    const removeOnDrag = e => {
      e.stopPropagation()
      document.removeEventListener('mousemove', onDrag)
      document.removeEventListener('mouseup', removeOnDrag)
    }
  }

  #addDragEvents () {
    const onDrag = ({ movementX, movementY }) => {
      const rect = this.getBoundingClientRect()
      const x = rect.x
      const y = rect.y
      this.style.transform = `translate(${x + movementX}px, ${y + movementY}px)`
    }

    this.#infoHTML.addEventListener('mousedown', () => {
      this.dispatchEvent(new Event('window-selected', { bubbles: true }))
      document.addEventListener('mousemove', onDrag)
      document.addEventListener('mouseup', removeOnDrag)
    })

    const removeOnDrag = e => {
      document.removeEventListener('mousemove', onDrag)
      document.removeEventListener('mouseup', removeOnDrag)
    }
  }

  #addMinimiseWindowEvent () {
    this.querySelector('.minimise-btn').addEventListener('click', () => {
      const minimiseEvent = new Event('minimise-process', { bubbles: true })
      minimiseEvent.pID = this.#pID
      this.dispatchEvent(minimiseEvent)
    })
  }

  #addCloseWindowEvent () {
    this.querySelector('.close-btn').addEventListener('click', () => {
      // Call close function for the embedded app
      // Closing services such as web-sockets or anything of that nature that can
      // run in the background even when HTML element is removed from the DOM
      if (this.#appComp.close) {
        this.#appComp.close().then(result => {
          if (result === true) {
            const closeEvent = new Event('close-process', { bubbles: true })
            closeEvent.pID = this.#pID
            this.dispatchEvent(closeEvent)
          }
        })
      }
    })
  }

  #addMaximizeWindowEvent () {
    if (this.#pwdOptions.resizable !== true) {
      this.querySelector('.maximize-btn').style.display = 'none'
      return
    }

    this.querySelector('.maximize-btn').addEventListener('click', e => {
      e.stopPropagation()
      const desktopRect = this.parentElement.getBoundingClientRect()
      this.#currentWindowWidth = desktopRect.width
      this.#currentWindowHeight = desktopRect.height - this.#topBarHeight
      this.#resizeAppCompWindow(this.#currentWindowWidth, this.#currentWindowHeight)
      this.style.transform = `translate(${0}px, ${0}px)`
    })
  }

  #addResizeToDefaultWindowEvent () {
    if (this.#pwdOptions.resizable !== true) {
      this.querySelector('.default-size-btn').style.display = 'none'
      return
    }

    this.querySelector('.default-size-btn').addEventListener('click', e => {
      e.stopPropagation()
      this.#currentWindowWidth = this.#defaultWindowSizeAppComp.width
      this.#currentWindowHeight = this.#defaultWindowSizeAppComp.height
      this.#resizeAppCompWindow(this.#currentWindowWidth, this.#currentWindowHeight)
    })
  }

  unfocusWindow () {
    this.querySelectorAll('.window-btn').forEach(btn => {
      const svg = btn.firstElementChild
      svg.setAttribute('fill', '#aaa')
      svg.setAttribute('stroke', '#aaa')
    })

    // this.#topHTML.style.backgroundColor = '#8e96b0'
    this.#topHTML.style.backgroundColor = 'rgb(96, 120, 196)'
  }

  focusWindow () {
    this.querySelectorAll('.window-btn').forEach(btn => {
      const svg = btn.firstElementChild
      svg.setAttribute('fill', '#fff')
      svg.setAttribute('stroke', '#fff')
    })

    // this.#topHTML.style.backgroundColor = '#4b5c87'
    this.#topHTML.style.backgroundColor = 'rgb(40, 50, 98)'
  }
}

customElements.define('process-window', ProcessWindow)
