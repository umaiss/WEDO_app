// import React,{Component} from 'react';
// import { StyleSheet,  View, Image, ImageBackground,TouchableOpacity, } from 'react-native';
// import { TextInput, Button } from 'react-native-paper';
// import firebase from 'firebase';



// export default class ForgotPassword extends Component {
//     state ={
//         email:'',
        
//      }

//      validate(text, type) {
//         if (type == 'email') {
//             this.setState({ email: text })
//             let msg = this.getMatch(/[A-Za-z]+([A-Za-z0-9]|[.]|[_])*[@][A-Za-z]+[.]com$/, text, "Email format example abc@abc.com")
//             this.setState({ errem: msg })
//         }
//         else if (type == 'password') {
//             this.setState({ password: text })
//             let msg = this.getMatch(/^.{6,20}$/, text, "Password must be between 8 to 20 characters")
//             this.setState({ errps: msg })
//         }
//     }

//     isFormEmpty() {
//         if (this.state.email != '' && this.state.password != '')
//             return false
//         this.setState({ formEmptyDialog: true })
//         return true
//     }

//     isErrorFree() {
//         if (this.state.errUs == '' && this.state.errem == '' && this.state.errps == '' && this.state.errpn == '' && this.state.errsn == '')
//             return true
//         this.setState({ formErrorDialog: true })
//         return false
//     }

//     getMatch(regex, text, errMsg) {
//         let msg = ''
//         if (regex.test(text))
//             msg = ""
//         else
//             msg = errMsg
//         return msg
//     }

 

//     // resetpasswod =() =>{ firebase.auth().Resetpassword(this. State. Email)}
//      resetPassword=() =>
// {
//     firebase.auth().sendPasswordResetEmail(this.state.email).then(() => {
//         console.log("Email has been sent to you")
//     }).catch((error) => {
//         throw error
//     })
// }

//   render(){
//     return (
//     <View style={styles.container}>
//                         {/* <View style={Styles.email}>
//                     <TextInput
//                         label='Email'
//                         mode='outlined'
//                         value={this.state.email}
//                         theme={{ colors: { primary: "#BE1E2D" }}}
//                         onChangeText={text => this.validate(text, "email")} />
//                 </View>
//                 <Text style={Styles.error}>
//                     {this.state.errem}
//                 </Text>

//                 <View style={Styles.btn}>
//                     <Button  mode="outlined"
//                     color='#BE1E2D'
//                         onPress={this.SubmitForm} >
//                         login
//                 </Button>
//                 </View> */}


//     </View>

//   );
// }
// }














// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//  },
//  btn: {
//     justifyContent: 'center',
//     width: responsiveWidth(50),
//     marginTop:'5%',
//     alignSelf:"center"

// },
// email: {

//     width: responsiveWidth(80),
//     justifyContent: 'center',
//     alignSelf:"center"

// },
  
// });
