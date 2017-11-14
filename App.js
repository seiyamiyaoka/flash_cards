import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import History from './components/History'
import NewDeck from './components/NewDeck'
import AddCard from './components/AddCard'
import DetailQuestion from './components/DetailQuestion'
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
  }
})

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
