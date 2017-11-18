import React, { Component } from 'react'
import { Text, View, TouchableOpacity, TextInput, Picker } from 'react-native'
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
      <View>
        <TextInput
          onChangeText={(title) => this.setState({title})}
          placeholder="Type title here"
          value={this.state.title}
        />
        <TextInput
          onChangeText={(answer) => this.setState({answer})}
          placeholder="Type answer here"
          value={this.state.answer}
        />
        <Text>select answer true or false</Text>
        <Picker
          selectedValue={this.state.answerFlag}
          onValueChange={(itemValue, itemIndex) => this.setState({answerFlag: itemValue})}
        >
          <Picker.Item label="true" value="true" />
          <Picker.Item label="false" value="false" />
        </Picker>

        <TouchableOpacity onPress={() => this.submit(this.state)}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default connect(null)(AddCard)
