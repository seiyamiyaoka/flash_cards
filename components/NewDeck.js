import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
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

    this.toIndivisualView(deck)
    createQuestionDeck({
      [deck]: { title: deck, questions: [] }
    })
    this.setState({text: ""})
  }

  toIndivisualView = (deckName) => {
    this.props.navigation.dispatch(NavigationActions.navigate({
      routeName: 'DetailQuestion',
      params: { category: deckName }
    }))
  }

  // 作成後にhomeに戻るボタン

  render() {
    return(
      <View style={{alignItems: 'center'}}>
        <Text style={deckStyle.title}>What is the title of your new deck?</Text>
        <TextInput
         style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 300}}
         onChangeText={(text) => this.setState({text})}
         placeholder="Type here"
         value={this.state.text}
         />
        <TouchableOpacity onPress={() => this.submit(this.state.text)}>
          <Text style={deckStyle.positiveButton}>Submit</Text>
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

const deckStyle = StyleSheet.create({
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

export default connect(mapStateToProps)(NewDeck)
