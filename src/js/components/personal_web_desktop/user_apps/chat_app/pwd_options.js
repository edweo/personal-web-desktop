import ChatApp from './chat_app.js'
import icon from './icon.png'

export const options = {
  name: 'Chat',
  icon,
  exe: () => new ChatApp(),
  multiple_windows: true,
  window_padding: false,
  window_options_bar: false,
  window_bottom_bar: false,
  resizable: false
}
