import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, TouchableOpacity } from 'react-native'


class QuestionForm extends Component {
  state = {
    questionNum: 0,
    answer: "",
    answerFlag: null,
    collect_answer: 0,
    result: null,
    hide: true,
    answered: false,
    showAnswer: false,
    lsatQuestionAnsered: false
  }

  // resultAnswers = () => {
  //
  // }

  answer = (userAnswer) => {
    const answer = userAnswer
    // debugger
    answer.userAnswer === this.state.answerFlag ? this.setState({ collect_answer: this.state.collect_answer + 1, result: true, hide: false })
                                                : this.setState({ result: false, hide: false })
    this.setState({ answered: true })
    if (this.state.questionNum + 1 === this.props.navigation.state.params.question.length ) {
      this.setState({lsatQuestionAnsered: true})
    }

  }

  show = () => {
    this.setState({showAnswer: true})
  }

  incrementQuestion = () => {
    this.setState({questionNum: this.state.questionNum + 1,
                   showAnswer: false})
  }
  componentDidMount() {
    // debugger
    this.setState({answer: this.props.navigation.state.params.question[this.state.questionNum].answer,
                   answerFlag: this.props.navigation.state.params.question[this.state.questionNum].answerFlag})
  }
  render() {
    const { question, category } = this.props.navigation.state.params
    const { navigation } = this.props
    let { questionNum } = this.state
    // debugger
    return(
      <View>
      { this.state.lsatQuestionAnsered === true
          ? <View>
              <Text>{this.state.collect_answer / question.length * 100} parsent!!!</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Text>back start</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('DetailQuestion', {category: category})}>
                <Text>restart quiz</Text>
              </TouchableOpacity>
            </View>
          : <View>
              <Text>{this.state.questionNum + 1} / { question.length }</Text>
              <Text>
                {question[questionNum].question}
              </Text>
                {this.state.hide === false &&(
                  this.state.result === true
                    ? <Text>collect! {question[questionNum].answer}</Text>
                    : <Text>Incollect! Answer: {question[questionNum].answer}</Text>
                  )
                }

                {question.length !== this.state.questionNum && this.state.answered === true && (
                  <TouchableOpacity onPress={() => this.incrementQuestion()}>
                    <Text>Next</Text>
                  </TouchableOpacity>
                )}
                { this.state.showAnswer === false && (
                  <View>
                  <TouchableOpacity onPress={() => this.answer({ userAnswer: true })}>
                    <Text>Collect!</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.answer({ userAnswer: false })}>
                    <Text>InCollect!</Text>
                  </TouchableOpacity>
                  </View>
                ) }
                <TouchableOpacity onPress={() => this.show()}>
                  <Text>show answer</Text>
                </TouchableOpacity>

                { this.state.showAnswer === true && (
                  <View>
                  <Text>
                   {question[questionNum].answer}
                  </Text>
                  <TouchableOpacity onPress={() => this.incrementQuestion()}>
                    <Text>Next</Text>
                  </TouchableOpacity>
                  </View>
                ) }
              </View>
            }
          </View>
    )
  }
}


// export default QuestionForm
export default QuestionForm
