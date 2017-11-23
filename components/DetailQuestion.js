import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import QuestionForm from './QuestionForm'
import { NavigationActions } from 'react-navigation'

class DetailQuestion extends Component {
  // ここにstaticを使うとnavigationで渡ってきた値を際適宜することができる
  // quiz_numを増やすことによって次のページに推移する
  // collect_answerで正解数をカウント
  // react-navigationをインポートしてdispatchでstoreにアクセスするように変更


  // TODO: onPressをした際に条件分岐でcomponentの出し分けをしてしまっているのでボタンを押した時に, questionFormのviewを表示するようにする
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

  startQuestion = (question, category) => {
    this.setState({startQuestion: true})
    this.props.navigation.navigate('QuestionForm', {question: question, category: category})
  }

  render() {
    let { questionNum, startQuetion, collect_answer } = this.state
    const { category } = this.props
    return(
      <View style={{flex: 1}}>
        <View style={{flex: 6, justifyContent: 'center', alignItems: 'center'}}>
         <Text>
           {this.props.navigation.state.params.category}
         </Text>
        </View>
        <View style={{flex: 4, justifyContent: 'center', alignItems: 'center'}}>
         { this.props.quiz.questions.length > 0 && startQuetion === false &&
           <View>
             <TouchableOpacity onPress={() => this.startQuestion(this.props.quiz.questions, category)}>
               <Text style={[styles.start, {borderRadius: 4,
                                            borderWidth: 0.5,
                                            borderColor: 'black',padding: 20, color: 'black', margin: 5, width: 100}]}>start!!!!</Text>
             </TouchableOpacity>
           </View>
          }
          <TouchableOpacity onPress={() => this.props.navigation.navigate(
            'AddCard',
            {category: this.props.category}
          )}>
            <Text style={[styles.start, {backgroundColor: 'black', padding: 20, borderRadius: 5}]}>add Card</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    padding: 20,
  },
  start: {
    textAlign: 'center',
    color: 'white'
  },
  add: {
    textAlign: 'center',
    color: 'black'
  }
});

function mapStateToProps(state, {navigation}) {
  // debugger
  const { category } = navigation.state.params
  return {
    category,
    quiz: state.questions[category]
  }
}

export default connect(mapStateToProps)(DetailQuestion)
