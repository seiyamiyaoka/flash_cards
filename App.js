import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { setLocalNotification } from './utils/helper'
import { MainNavigator } from './navigation/routes'
import store from './store'

export default class App extends React.Component {
  componentDidMount() {
    return setLocalNotification()
  }
  render() {
    return (
      <Provider store={store}>
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
