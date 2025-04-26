import Program from './pwd_modules/program.js'

import * as QuizGame from './user_apps/quiz_game'
import * as MemoryGame from './user_apps/memory_game/'
import * as ChatApp from './user_apps/chat_app'
import * as QuotesApp from './user_apps/quotes_app/'

export const QuizGame_ = () => {
  return new Program(QuizGame.options, undefined)
}

export const MemoryGame_ = () => {
  return new Program(MemoryGame.options, undefined)
}

export const ChatApp_ = () => {
  return new Program(ChatApp.options, undefined)
}

export const QuotesApp_ = () => {
  return new Program(QuotesApp.options, undefined)
}
