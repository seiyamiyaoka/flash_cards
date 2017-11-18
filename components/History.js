import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { fetchQuestionsResult } from '../utils/api'
import { receiveQuestions } from '../actions'
import TopQuestions from './TopQuestions'

class History extends Component {

  componentDidMount() {
    const { dispatch } = this.props
    fetchQuestionsResult()
      .then(questions => {
        dispatch(receiveQuestions(questions))
      })
  }
  render() {
    const { questions } = this.props
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      { Object.keys(questions.questions).length !== 0
        ? <TopQuestions questions={questions} navigate={this.props.navigation} />
        : <Text>Nothing Question</Text>
       }
      </View>
    )
  }
}

function mapStateToProps(questions, deck) {
  return {
    questions
  }
}

export default connect(mapStateToProps)(History)
