import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import History from './components/History'
import NewDeck from './components/NewDeck'
import AddCard from './components/AddCard'
import { setLocalNotification } from './utils/helper'
import DetailQuestion from './components/DetailQuestion'
import QuestionForm from './components/QuestionForm'
import { TabNavigator, StackNavigator } from 'react-navigation'


const Tabs = TabNavigator({
  Questions: {
    screen: History,
    tabBarLabel: 'Question',
    tabBarIcon: ({tintColor}) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
  },
  NewDeck: {
    screen: NewDeck,
    tabBarLabel: 'NewDeck',
    tabBarIcon: ({tintColor}) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
  },
  // tabBarOptions: {
  //   activeTintColor:
  // }
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  DetailQuestion: {
    screen: DetailQuestion
  },
  AddCard: {
    screen: AddCard
  },
  QuestionForm: {
    screen: QuestionForm
  }
})

export default class App extends React.Component {
  componentDidMount() {
    return setLocalNotification()
  }
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={styles.container}>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
