import { combineReducers } from 'redux'
import { RECEIVE_QUESTIONS, ADD_DECK, ADD_QUESTION } from '../actions'

function questions (state=[], action) {

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
      // advise
      // you should be able to use the spread operator. Something like this should work:
      //  questions: [...state[action.question.category].questions, action.question.question]this
      //  should "spread" the existing objects in a new array and append the new question to the end.
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

// return {
//   ...state,
//   [day]: {
//     ...state[day],
//     [meal]: recipe.label,
//   }
// }
// function deck(state={}, action) {
//   // stateはそのままでdeckを追加するためにaction.deckを追加してみた
//   switch(action.type) {
//     case ADD_DECK:
//       return {
//         ...state,
//         ...action.deck
//       }
//     default:
//       return state
//   }
// }


export default combineReducers({questions})
