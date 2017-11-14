import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'

class QuestionForm extends Component {
  state = {
    questionNum: 0,
    answer: "",
    answerFlag: null,
    collect_answer: 0,
    result: null,
    hide: true
  }
  answer = (userAnswer) => {
    const answer = userAnswer
    // debugger
    answer.userAnswer === this.state.answerFlag ? this.setState({ collect_answer: this.state.collect_answer + 1, result: true, hide: false })
                                                : this.setState({ result: false, hide: false })
  }

  incrementQuestion = () => {
    this.setState({questionNum: this.state.questionNum + 1})
  }
  componentDidMount() {
    this.setState({answer: this.props.question[this.state.questionNum].answer, answerFlag: this.props.question[this.state.questionNum].answerFlag})
  }
  render() {
    const { question } = this.props
    let { questionNum } = this.state

    return(
      <View>
        <Text>
          {question[questionNum].question}
        </Text>
        {this.state.hide === false &&(
          this.state.result === true
            ? <View>
                <Text>collect! {question[questionNum].answer}</Text>
                <TouchableOpacity onPress={() => this.incrementQuestion()}>
                  <Text>Next</Text>
                </TouchableOpacity>
              </View>
            : <Text>Incollect! Answer: {question[questionNum].answer}</Text>

          )
        }

        <TouchableOpacity onPress={() => this.answer({ userAnswer: true })}>
          <Text>Collect!</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.answer({ userAnswer: false })}>
          <Text>InCollect!</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default QuestionForm
