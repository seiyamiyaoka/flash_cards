import React, { Component } from 'react'
import { Text, View, TouchableOpacity, TextInput, Picker, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { addQuestion } from '../actions'

class AddCard extends Component {
  state = {
    category: "",
    title: "",
    answer: "",
    answerFlag: true
  }

  submit = (state) => {
    state.answerFlag === "true"
     ? state.answerFlag = true
     : state.answerFlag = false
    // reduxに登録
    formatData = {
      category: state.category,
      question: {
        question: state.title,
        answer: state.answer,
        answerFlag: state.answerFlag
      }
    }

    this.props.dispatch(addQuestion(formatData))
    // AsyncStorageに登録
    // debugger
    this.props.navigation.goBack()
    // stateをからにする
  }

  componentDidMount() {
    this.setState({category: this.props.navigation.state.params.category})
  }

  render() {
    const { category } = this.props.navigation.state.params
    return (
      <View style={{flex: 1, justifyContent: "center", alignItems: 'center'}}>
        <TextInput
          style={{textAlign: 'center', borderColor: 'gray', borderWidth: 1, width: 300, marginBottom: 10}}
          onChangeText={(title) => this.setState({title})}
          placeholder="Type title here"
          value={this.state.title}
        />
        <TextInput
          style={{textAlign: 'center', borderColor: 'gray', borderWidth: 1, width: 300, marginBottom: 20 }}
          onChangeText={(answer) => this.setState({answer})}
          placeholder="Type answer here"
          value={this.state.answer}
        />
        <Text style={{marginTop: 45, fontWeight: 'bold'}}>select answer true or false</Text>
        <Picker
          style={{borderColor: 'gray', width: 300}}
          selectedValue={this.state.answerFlag}
          onValueChange={(itemValue, itemIndex) => this.setState({answerFlag: itemValue})}
        >
          <Picker.Item label="true" value="true" />
          <Picker.Item label="false" value="false" />
        </Picker>

        <TouchableOpacity onPress={() => this.submit(this.state)}>
          <Text style={[addCardStyle.positiveButton, {justifyContent: 'center'}]}>Submit</Text>
        </TouchableOpacity>
      </View>
    )
  }
}


const addCardStyle = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 24,
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
})

export default connect(null)(AddCard)
