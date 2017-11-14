export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_QUESTION = "ADD_QUESTION"

export function receiveQuestions(questions) {
  questions = JSON.parse(questions)
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}

export function addDeck(deck) {
  return {
    type: ADD_DECK,
    deck
  }
}

export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
  }
}
