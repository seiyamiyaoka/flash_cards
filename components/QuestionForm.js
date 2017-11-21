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
          ? <View style={{marginLeft: 10, marginRight: 10, marginTop: 40, alignItems: 'center'}}>
              <Text style={QuestionStyles.mainContent}>{this.state.collect_answer / question.length * 100} parsent!!!</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Text style={[QuestionStyles.negativeButton, {backgroundColor: 'green', width: 100, padding: 10 }]}>back start</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('DetailQuestion', {category: category})}>
                <Text style={[QuestionStyles.negativeButton, {backgroundColor: 'purple', width: 100, padding: 10}]}>restart quiz</Text>
              </TouchableOpacity>
            </View>
          : <View style={{flex: 1}}>
              <View style={{marginLeft: 10, marginRight: 10}}>
                <Text>{this.state.questionNum + 1} / { question.length }</Text>
              </View>
              <View style={{height: 45, marginTop: 90, marginLeft: 10, marginRight: 10, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={QuestionStyles.mainContent}>
                  {question[questionNum].question}
                </Text>
              </View>
                {this.state.hide === true && (
                  <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 30}}>
                    <TouchableOpacity onPress={() => this._show()}>
                      <Text style={{color: 'red'}}>show answer</Text>
                    </TouchableOpacity>
                  </View>
                )}
                {this.state.hide === false &&(
                  this.state.result === true
                    ? <View style={{alignItems: 'center'}}>
                        <Text style={{color: 'blue'}}>collect! {question[questionNum].answer}</Text>
                      </View>
                    : <View style={{alignItems: 'center'}}>
                        <Text style={{color: 'red'}}>Incollect! Answer: {question[questionNum].answer}</Text>
                      </View>
                  )
                }

                {question.length !== this.state.questionNum && this.state.answered === true && this.state.showAnswer === true && (
                  <View style={{alignItems: 'center'}}>
                    <TouchableOpacity onPress={() => this._incrementQuestion()}>
                      <Text style={{color: 'white', width: 100, margin: 20, padding: 20, backgroundColor: 'skyblue'}}>Next</Text>
                    </TouchableOpacity>
                    <Text>
                     {question[questionNum].answer}
                    </Text>
                  </View>
                )}
                { this.state.showAnswer === false && this.state.answered === false &&(
                  <View style={{alignItems: 'center'}}>
                    <TouchableOpacity onPress={() => this._answer({ userAnswer: true })}>
                      <Text style={QuestionStyles.positiveButton}>Collect</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this._answer({ userAnswer: false })}>
                      <Text style={QuestionStyles.negativeButton}>InCollect</Text>
                    </TouchableOpacity>
                  </View>

                ) }


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
