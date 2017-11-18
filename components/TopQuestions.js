import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { connect } from 'react-redux'

class TopQuestions extends Component {
  render() {
    const { questions, navigate } = this.props
    const keys = Object.keys(questions.questions)
    return (
      <ScrollView style={{flex: 1}}>
      {
        keys.map(key => (
          <View key={key} style={styles.questionMain}>
          <TouchableOpacity
            onPress={() => navigate.navigate(
              'DetailQuestion',
              {category: key}
            )}
          >
            <Text>{questions.questions[key].title}</Text>
          </TouchableOpacity>
            <Text style={{color: '#A9A9A9'}}>{questions.questions[key].questions.length} :cards</Text>
          </View>
        ))
      }
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  box: {
    height: 50,
    width: 50,
    backgroundColor: '#e76e63',
    margin: 10,
  },
  questionMain: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'stretch',
    margin: 20,
    padding: 20,
    borderBottomColor: 'black',
    borderTopColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});

function mapStateToProps(questions) {
  return {
    questions
  }
}

export default connect(mapStateToProps)(TopQuestions)
