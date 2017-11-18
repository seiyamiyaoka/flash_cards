import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import QuestionForm from './QuestionForm'

class DetailQuestion extends Component {
  // ここにstaticを使うとnavigationで渡ってきた値を際適宜することができる
  // quiz_numを増やすことによって次のページに推移する
  // collect_answerで正解数をカウント


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

  render() {
    let { questionNum, startQuetion, collect_answer } = this.state
    return(
      <View style={{flex: 1}}>
        <View style={{flex: 6, justifyContent: 'center', alignItems: 'center'}}>
         <Text>
           {this.props.navigation.state.params.category}
         </Text>
        </View>
        <View style={{flex: 4, justifyContent: 'center', alignItems: 'center'}}>
         { startQuetion === false &&
           <View>
             <TouchableOpacity onPress={() => this.setState(
               {startQuetion: true})}>
               <Text style={[styles.start, {borderRadius: 4,
                                            borderWidth: 0.5,
                                            borderColor: 'black',padding: 20, color: 'black', margin: 5, width: 100}]}>start!!!!</Text>
             </TouchableOpacity>
           </View>
          }
         { startQuetion === true &&
            <QuestionForm
             question={this.props.quiz.questions}
             navigation={this.props.navigation}
            />
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

function mapStateToProps(state, {navigation}) {
  // debugger
  const { category } = navigation.state.params
  return {
    category,
    quiz: state.questions[category]
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

export default connect(mapStateToProps)(DetailQuestion)
