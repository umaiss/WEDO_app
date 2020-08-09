import React, {Component} from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Dimensions,
  Animated,
  TextInput,
  KeyboardAvoidingView,
  FlatList,
  TouchableHighlight
} from 'react-native';

import { GiftedChat } from 'react-native-gifted-chat';

import {
  Container,
  Header,
  Content,
  Text,
  Button,
  Icon,
  Left,
  Right,
  Body,
  Segment,
  Footer,
  Thumbnail
} from "native-base";
import { getData, addToArray, saveData } from './Auth';
import firebase from 'firebase'
// import firebase from '../../backend/utility';
// var firestore = firebase.firestore();
//var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
const buttonHeight = 50;

export default class Chat extends Component {
  constructor(props) {
    super(props);
    // Create and Reset initial State Longitude (lng) and Latitude (lat)
    this.state = {
      data: null,
      currentUserId: firebase.auth().currentUser.uid,
     // friendID: this.props.navigation.state.params.friendID,
      messages:[]
    };

  }

  componentWillMount() {
    this.getMessages();
    console.log(this.state.friendID);
    console.log(this.state.currentUserId);
  }


  async getMessages(){

    friendID = this.state.friendID
    let messages = await getData("chats",
   this.state.currentUserId, this.state.friendID);
    if(messages)
    await this.setState({ messages: messages });
    else
    return 0;
    let that = this;
   
   firebase.firestore().collection("chats").doc(this.state.currentUserId)
    .onSnapshot(function(doc) {
    that.setState({ messages: doc.data()[friendID].reverse() });
    });
    }


    async onSend(messages = []) {
      this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages,
     messages)
      }));
      messages[0].createdAt = Date.parse(messages[0].createdAt)
      await addToArray("chats", this.state.currentUserId,
      this.state.friendID, messages[0]);
      messages[0].user._id = 2;
      await addToArray("chats",
      this.state.friendID,
     this.state.currentUserId, messages[0]);
      messages[0].user._id = 1;
      }

      render() {
        return (
        <GiftedChat
        messages={this.state.messages}
        isAnimated={true}
        onSend={messages => this.onSend(messages)}
        user={{
        _id: 1,
        }}
        />
        );
        }
  
}

const styles = StyleSheet.create({
  container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#F5FCFF',
  },
 });