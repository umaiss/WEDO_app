import React,{Component} from 'react';
import { StyleSheet,  View, Image, ImageBackground,TouchableOpacity, } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title,Text ,Content,Card,CardItem,Thumbnail} from 'native-base';
import CustomHeader from './Dashboard';
import { Conversation } from 'react-native-watson';
import ChatBot  from "react-native-chatbot"; 
import { responsiveWidth, responsiveHeight} from 'react-native-responsive-dimensions';
console.disableYellowBox = true

// Conversation.initialize( "yG6Eid66HK_SYGDa5s0lyz3zXj2_FoiU7bRI1qKi2LUQ" )
// let workspaceId="10f0ecf9-98b7-4d0f-90bf-fce4137e8926"

// Conversation.message(workspaceId)

//             .then(response => {
//                 console.log(JSON.stringify(response))
                
//                 this.setState({output: response.output.text, context: response.context})
//             })
            
// // To continue a conversation, and send the user's response, send the workspaceId and the input (text and saved context)
 
// let input = {
//                 text: this.state.text,
//                 context: this.state.context
//             }
 
// Conversation.message(workspaceId, input)
//     .then(response => {
//         console.log(JSON.stringify(response))
//         this.setState({output: response.output.text, context: response.context})
//     })

const steps = [
  {
    id: "1",
    message: "Hello, ",
    trigger: "2"
  },
{
  id : "2",
  user : true,
  trigger: "3"
} ,

{
    id: "3",
    message: "Whats your name ?",
    trigger: "4"
  },
  {
      id: "4",
      user: true,
      trigger : "5"
  },

  {
      id: "5",
      message: "Hi {previousValue}, How can i help you",
      trigger : 6
  },

  {
      id : 6,
      options: [
        {
          value : "How to order ?",
          label : "How to order ?",
          trigger : "7"
        },
        {
          value : "What Services we provide ?",
          label : "What Services we provide ?",
          trigger : "8"
        },
        {
          value : "Talk to our Representative",
          label : "Talk to our Representative",
          trigger : "13"


        }
        
      ],

    },

  {
    id : "7",
    message : "Login -> Select Category -> Book an Order -> Select Payment option -> Select Delievery Type - > Order Confirmation",
   trigger : "11"
  },
  
  {
    id : "8",
    message : "FOOD",
    trigger : "9"
  },
  {
    id : "9",
    message : "SKETCHING",
    trigger : "10"
  },
  {
    id : "10",
    message : "BAKING",
    trigger : "11"
  },
  {
    id : "13" , 
    message : "0333-123456",
    trigger : "11"
  },
  {
    id : 11,
    message : "Anything else ?",
    trigger : "11.5"
  },

  {
    id : "11.5",
        options : [
      {
        value : "YES",
        label : "YES",
        trigger : "6"
      },
      {
        value : "NO",
        label : "NO",
        trigger : "12"
      }
    ]
  }
  ,
    
    {
      id : "12",
      message : "Thank you for your time.. Take care !!",
      end : true

    }
  
  


  // 
  // 
  // {
  //   id: "Asking options to eat",
  //   message: "Hi {previousValue}, Glad to know you !!",
  //   trigger: "Done"
  // },
  // {
  //   id: "Done",
  //   message: "Have a great day !!",
  //   end: true
  // }
]
  
  



export default class Profile extends Component {
  render(){
    return (
    <View style={styles.container}>

    <ChatBot steps = {steps}

      botBubbleColor = 'grey'
      botFontColor = 'white'
    
    
    />

 
    </View>

  );
}
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
  
  },
  
  
});