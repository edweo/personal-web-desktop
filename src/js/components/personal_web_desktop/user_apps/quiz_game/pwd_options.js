import QuizGame from './quiz_game.js'
import icon from './icon.png'

export const options = {
  name: 'Quiz Game',
  icon,
  exe: () => new QuizGame(),
  multiple_windows: true,
  window_padding: true,
  window_options_bar: false,
  window_bottom_bar: false,
  resizable: false
}
