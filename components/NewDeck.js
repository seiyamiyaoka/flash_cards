import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { addDeck } from '../actions'
import { createQuestionDeck } from '../utils/api'


class NewDeck extends Component {
  state = {
    text: ""
  }

  // 新しいdeck作成
  submit = (deck) => {
    this.props.dispatch(addDeck({
      [deck]: { title: deck, questions: [] }
    }))

    this.toHome()
    createQuestionDeck({
      [deck]: { title: deck, questions: [] }
    })
    this.setState({text: ""})
  }

  toHome = () => {
    this.props.navigation.dispatch(NavigationActions.back({key: 'NewDeck'}))
  }

  // 作成後にhomeに戻るボタン

  render() {
    return(
      <View>
        <Text>What is the title of your new deck?</Text>
        <TextInput
         onChangeText={(text) => this.setState({text})}
         placeholder="Type here"
         value={this.state.text}
         />
        <TouchableOpacity onPress={() => this.submit(this.state.text)}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    state
  }
}

export default connect(mapStateToProps)(NewDeck)
