/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';

import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Splash from './components/Splash';
import Sellerdashboard from './components/Sellerdashboard';
// import Startpage from './components/Startpage';
import ForgotPassword from './components/ForgotPassword';
import AddStore from './components/AddStore';
import AddDashboard from './components/AddDashboard';
import PaymentsOptions from './components/PaymentsOptions';
import AddDeal from './components/AddDeal';
import Map from './components/Map';
import Auth from './components/Auth';
import * as firebase from 'firebase'
import firestore from 'firebase/firestore'
import PaymentIntegration from './components/PaymentIntegration';
import Notification from './components/Notification';
import Chat from './components/chat';
import CustomeOrder from './components/CustomeOrder'



    const RootStack = createStackNavigator(
      {
        
        Splash:Splash,
        
        // Startpage:Startpage,
        Login:Login,
        Signup:Signup,
        Dashboard:Dashboard,
        Sellerdashboard:Sellerdashboard,
        ForgotPassword:ForgotPassword,
        AddStore:AddStore,
        AddDashboard:AddDashboard,
        AddDeal:AddDeal,
        PaymentsOptions:PaymentsOptions,
        Map:Map,
        Auth:Auth,
        PaymentIntegration:PaymentIntegration,
        Notification:Notification,
        chat:Chat,
        CustomeOrder:CustomeOrder


       
      },
      {
       defaultNavigationOptions:
        {
          header:null
        }
      }
    );
    var firebaseConfig = {
      apiKey: "AIzaSyAKXfxK4q2zXYtqPEKidqFS0UeaL8I_-5k",
      authDomain: "wedo-f313d.firebaseapp.com",
      databaseURL: "https://wedo-f313d.firebaseio.com",
      projectId: "wedo-f313d",
      storageBucket: "wedo-f313d.appspot.com",
      messagingSenderId: "274125605863",
      appId: "1:274125605863:web:fffa88a6e7a05eeff88b42"
      
    };
    
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    
    
    
    const AppContainer = createAppContainer(RootStack);
    
    export default class App extends Component {
      render() 
      {
        return <AppContainer />
        
      }
    }
    
 
