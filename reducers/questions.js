import { RECEIVE_QUESTIONS, ADD_DECK, ADD_QUESTION } from '../actions'
import { INITIAL_STATE } from '../utils/initData'

export function questions (state=INITIAL_STATE, action) {

  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions
      }
    case ADD_DECK:
      return {
        ...state,
        ...action.deck
      }
    case ADD_QUESTION:
      return {
        ...state,
        [action.question.category]: {
          title: state[action.question.category].title,
          questions: [...state[action.question.category].questions, action.question.question]
        },
      }
    default:
      return state
  }
}
