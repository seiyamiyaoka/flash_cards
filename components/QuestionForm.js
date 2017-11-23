import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { clearLocalNotification } from '../utils/helper'


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

  _answer = (userAnswer) => {
    const answer = userAnswer
    // debugger
    answer.userAnswer === this.state.answerFlag ? this.setState({ collect_answer: this.state.collect_answer + 1, result: true })
                                                : this.setState({ result: false })
    this.setState({ answered: true, showAnswer: true })
    if (this.state.questionNum + 1 === this.props.navigation.state.params.question.length ) {
      this.setState({lsatQuestionAnsered: true})
    }

  }

  _show = () => {
    this.setState({answered: true, showAnswer: true, result: false})
    if (this.state.questionNum + 1 === this.props.navigation.state.params.question.length ) {
      this.setState({lsatQuestionAnsered: true})
    }
  }

  _incrementQuestion = () => {
    this.setState({questionNum: this.state.questionNum + 1,
                   showAnswer: true})
    this.resetState()
  }

  resultView = (style, state, question, navigation, category) => {
    return (
      <View style={{marginLeft: 10, marginRight: 10, marginTop: 40, alignItems: 'center'}}>
          <Text style={style.mainContent}>{state.collect_answer / question.length * 100} parsent!!!</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Text style={[style.negativeButton, {backgroundColor: 'green', width: 100, padding: 10 }]}>
              back start
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('DetailQuestion', {category: category})}>
            <Text style={[style.negativeButton, {backgroundColor: 'purple', width: 100, padding: 10}]}>
              restart quiz
            </Text>
          </TouchableOpacity>
        </View>
    )
  }


  questionHead = (questionNum, length) => {
    return (
      <View style={{marginLeft: 10, marginRight: 10}}>
        <Text>{questionNum + 1} / { length }</Text>
      </View>
    )
  }

  questionTitle = (style, title) => {
    return (
      <View style={{height: 45, marginTop: 90, marginLeft: 10, marginRight: 10, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={style.mainContent}>
          {title}
        </Text>
      </View>
    )
  }

  questionShow = () => {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 30}}>
        <TouchableOpacity onPress={() => this._show()}>
          <Text style={{color: 'red'}}>show answer</Text>
        </TouchableOpacity>
      </View>
    )
  }

  questionResult = (resultBool, answer) => {
    return (
      resultBool === true ? <View style={{alignItems: 'center'}}>
                              <Text style={{color: 'blue'}}>collect! {answer}</Text>
                            </View>
                          : <View style={{alignItems: 'center'}}>
                              <Text style={{color: 'red'}}>Incollect! Answer: {answer}</Text>
                            </View>
    )
  }

  questionNextAndShow = (answer) => {
    return (
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity onPress={() => this._incrementQuestion()}>
          <Text style={{color: 'white', width: 100, margin: 20, padding: 20, backgroundColor: 'skyblue'}}>Next</Text>
        </TouchableOpacity>
        <Text>
         {answer}
        </Text>
      </View>
    )
  }

  questionAnswerButton = (style) => {
    return (
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity onPress={() => this._answer({ userAnswer: true })}>
          <Text style={style.positiveButton}>Collect</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this._answer({ userAnswer: false })}>
          <Text style={QuestionStyles.negativeButton}>InCollect</Text>
        </TouchableOpacity>
      </View>
    )
  }

  componentDidMount() {
    // debugger
    this.setState({answer: this.props.navigation.state.params.question[this.state.questionNum].answer,
                   answerFlag: this.props.navigation.state.params.question[this.state.questionNum].answerFlag})
  }

  resetState = () => {
    this.setState({
      answer: "",
      result: null,
      hide: true,
      answered: false,
      showAnswer: false
    })
  }

  render() {
    const { question, category } = this.props.navigation.state.params
    const { navigation } = this.props
    let { questionNum } = this.state

    return(
      <View style={{flex: 1}}>
      { this.state.lsatQuestionAnsered === true
          ? this.resultView(QuestionStyles, this.state, question, navigation, category)
          : <View style={{flex: 1}}>
              { this.questionHead(this.state.questionNum, question.length) }
              { this.questionTitle(QuestionStyles, question[questionNum].question) }
                {this.state.hide === true && (
                  this.questionShow()
                )}
                {this.state.hide === false &&(
                  this.questionResult(this.state.result, question[questionNum].answer)
                  )
                }
                {question.length !== this.state.questionNum && this.state.answered === true && this.state.showAnswer === true && (
                  this.questionNextAndShow(question[questionNum].answer)
                )}
                { this.state.showAnswer === false && this.state.answered === false &&(
                  this.questionAnswerButton(QuestionStyles)
                )
              }
              </View>
            }
          </View>
    )
  }
}

const QuestionStyles = StyleSheet.create({
  mainContent: {
    textAlign: 'center',
    fontSize: 28,
    margin: 0,
    fontWeight: 'bold'
  },
  positiveButton: {
    color: 'white',
    width: 100,
    margin: 20,
    padding: 20,
    backgroundColor: 'green'
  },
  negativeButton: {
    color: 'white',
    width: 100,
    margin: 20,
    padding: 20,
    backgroundColor: 'red'
  },

})


// export default QuestionForm
export default QuestionForm
