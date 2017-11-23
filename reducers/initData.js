export const INITIAL_STATE =
  {
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
