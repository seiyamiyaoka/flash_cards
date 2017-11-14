import { AsyncStorage } from 'react-native'
export const FETCH_QUESTIONS = 'card_flash:questions'

function setQuestions() {
  const questions = {
    React: {
      title: 'react',
      questions: [
        {
          question: "what is React?",
          answer: 'A library for managing user interfaces ',
          answerFlag: true
        },
        {
          question: "where do you make ajax request in React?",
          answer: "The componentDidMount lifecycle event",
          answerFlag: false
        }
      ]
    },
    JavaScript: {
      title: 'javascript',
      questions: [
        {
          question: "what is a closure?",
          answer: "The combination of a function and the lexical environment within which that function was declared.",
          answerFlag: true
        }
      ]
    }
  }
  AsyncStorage.setItem(FETCH_QUESTIONS, JSON.stringify(questions))
}

export function formatQuestions() {
  return setQuestions()
}
