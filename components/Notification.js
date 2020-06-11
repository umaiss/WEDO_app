import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PushNotification from 'react-native-push-notification'

export default class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  async componentDidMount(){
    PushNotification.configure({
     
      
        // (required) Called when a remote is received or opened, or local notification is opened
        onNotification: function (notification) {
          console.log("NOTIFICATION:", notification);
      
        },
       
      });
  }

  render() {
    return (
      <View>
        <Text> Notification </Text>
      </View>
    );
  }
}
