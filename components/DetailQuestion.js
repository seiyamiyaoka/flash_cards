import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import QuestionForm from './QuestionForm'

class DetailQuestion extends Component {
  // ここにstaticを使うとnavigationで渡ってきた値を際適宜することができる
  // quiz_numを増やすことによって次のページに推移する
  // collect_answerで正解数をカウント
  state = {
    questionNum: 0,
    startQuetion: false,
    collect_answer: 0
  }

  static navigationOptions = ({ navigation }) => {
    const { category } = navigation.state.params
    return {
      title: `${category} quiz`
    }
  }

  render() {
    let { questionNum, startQuetion, collect_answer } = this.state
    return(
      <View>
         <Text>
           {this.props.navigation.state.params.category}
         </Text>
         { startQuetion === false &&
           <View>
             <TouchableOpacity onPress={() => this.setState(
               {startQuetion: true})}>
               <Text>start!!!!</Text>
             </TouchableOpacity>
           </View>
          }
         { startQuetion === true &&
            <QuestionForm
             question={this.props.quiz.questions}
            />
          }
          <TouchableOpacity onPress={() => this.props.navigation.navigate(
            'AddCard',
            {category: this.props.category}
          )}>
            <Text>add Card</Text>
          </TouchableOpacity>
      </View>
    )
  }
}

function mapStateToProps(state, {navigation}) {
  const { category } = navigation.state.params
  return {
    category,
    quiz: state.questions[category]
  }
}

export default connect(mapStateToProps)(DetailQuestion)
