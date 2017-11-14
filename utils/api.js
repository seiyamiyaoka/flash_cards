import { AsyncStorage } from 'react-native'
import { FETCH_QUESTIONS , formatQuestions} from './_questions'

export function fetchQuestionsResult() {
　return AsyncStorage.getItem(FETCH_QUESTIONS)
    .then(formatQuestions())
}

export function createQuestionDeck(deck) {
  return AsyncStorage.mergeItem(FETCH_QUESTIONS, JSON.stringify(deck))
}
