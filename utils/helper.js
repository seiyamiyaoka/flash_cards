import React from 'react'
import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

const NOTIFICATION_KEY = 'CardFlash:nitifications'

export function clearLocalNotification(){
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationAsync)
}

function createNotification() {
  return {
    title: 'lets study!!!!',
    body: 'dont forget study!!',
    ios: {
      sound: true
    }
  }
}

export function setLocalNotification(){
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data)=> {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
        .then(({status}) => {
          if(status === 'granted') {
            // 許可された場合
            Notifications.cancelAllScheduledNotificationAsync()
            let tommorrow = new Date()
            tomorrow.setDate(tommorrow.getDate() + 1)
            tomorrow.setHours(20)
            tomorrow.setMinitus(0)
            Notifications.scheduleLocalNotificationsAsync(
              createNotification(),
              {
                time: tomorrow,
                repeat: 'day'
              }
            )
            AsyncStorage.setItem(NOTIFICATION_KEY, tomorrow)
          }
        })
      }
    })
}
