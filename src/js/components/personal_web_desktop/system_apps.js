import Program from './pwd_modules/program.js'

import * as TaskManager from './system_apps/task_manager'

export const TaskManager_ = (...params) => {
  return new Program(TaskManager.options, params)
}
