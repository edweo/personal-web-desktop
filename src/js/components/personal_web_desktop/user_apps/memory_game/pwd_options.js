import MemoryGame from './memory_game.js'
import icon from './icon.png'

export const options = {
  name: 'Memory Game',
  icon,
  exe: () => new MemoryGame(),
  multiple_windows: true,
  resizable: false
}
