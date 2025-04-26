import UserAppExample from './user_app_example.js'
import icon from './icon.png'

export const options = {
  name: 'User App Example',
  icon,
  exe: () => new UserAppExample(),
  multiple_windows: true,
  window_padding: true,
  resizable: true, // Is your application able to adapt to different window sizes
  window_options_bar: false, // Process Window has no logic to handle this yet, but the bar is visible
  window_bottom_bar: false // Process Window has no logic to handle this yet, but the bar is visible
}
