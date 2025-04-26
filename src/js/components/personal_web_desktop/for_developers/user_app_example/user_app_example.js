const template = document.createElement('template')
template.innerHTML = `
<div class="user-app-example-wrapper"> <!-- Wrapper is needed to make applications resizable in the PWD -->
    <!-- Content may be added here -->
</div>
`

export default class UserAppExample extends HTMLElement {
  constructor () {
    // Must be included
    super()
    this.append(template.content.cloneNode(true))

    // Additional elements or sub web-components may be added to this class
    // and any other logic may live in the class
  }

  async close () {
    // This method is called by the Process Running Service/Events service
    // Used to close any background tasks such as Web-Socket connections before removing the
    // web-component HTML element
    //
    // Return true if everything went successfully, otherwise false
    return true
  }
}

// Define custom element, name must include '-' between words
customElements.define('user-app-example', UserAppExample)
