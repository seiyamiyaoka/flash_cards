import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

class TopQuestions extends Component {
  render() {
    const { questions, navigate } = this.props
    const keys = Object.keys(questions.questions)
    return (
      <View>
      {
        keys.map(key => (
          <View key={key}>
          <TouchableOpacity
            onPress={() => navigate.navigate(
              'DetailQuestion',
              {category: key}
            )}
          >
            <Text>{questions.questions[key].title}</Text>
          </TouchableOpacity>
            <Text>{questions.questions[key].questions.length} :cards</Text>
          </View>
        ))
      }
      </View>
    )
  }
}

function mapStateToProps(questions) {
  return {
    questions
  }
}

export default connect(mapStateToProps)(TopQuestions)
