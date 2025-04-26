import TaskManager from './task_manager.js'
import icon from './icon.png'

export const options = {
  name: 'Task Manager',
  icon,
  exe: (runningProcessesService) => new TaskManager(runningProcessesService),
  multiple_windows: false,
  resizable: true
}
