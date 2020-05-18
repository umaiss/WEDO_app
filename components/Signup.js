import React, { Component } from 'react';
import { View, Text,  TouchableOpacity, SafeAreaView, StatusBar, Image, ActivityIndicator, StyleSheet, Alert } from 'react-native';

import { responsiveFontSize, responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import { TextInput,Button } from 'react-native-paper';
import * as firebase from 'firebase'
import 'firebase/firestore'

import { signup, emailVerification } from './Auth'
import { ScrollView } from 'react-native-gesture-handler';

console.disableYellowBox = true;

export default class Signup extends Component {




    constructor(props) {
        super(props)
        this.state = {
            UserName: '', email: '',
            password: '', PhoneNumber: '',
            address:'',   CNIC:'',

            errUs: '', errem: '',
            errps: '', errpn: '',
            errCNIC:'',
           

            formEmptyDialog: false, formErrorDialog: false, btnIndicator: false,
            btnDisabled: false, signupErrorDialog: false, signupError: '',
        }
        this.initialState = this.state
        this.validate = this.validate.bind(this)
        this.goToLogin = this.goToLogin.bind(this)
        this.isFormEmpty = this.isFormEmpty.bind(this)
        this.isErrorFree = this.isErrorFree.bind(this)
    }

    validate(text, type) {
        if (type == 'UserName') {
            this.setState({ UserName: text })
            let msg = this.getMatch(/^[a-zA-Z]+(([\'\,\.\-][a-zA-Z])?[a-zA-Z])$/, text, "Username only contains alphabets")
            this.setState({ errfn: msg })
        }
        else if (type == 'email') {
            this.setState({ email: text })
            let msg = this.getMatch(/[A-Za-z]+([A-Za-z0-9]|[.]|[_])*[@][A-Za-z]+[.]com$/, text, "Email format example abc@abc.com")
            this.setState({ errem: msg })
        }
        else if (type == 'password') {
            this.setState({ password: text })
            let msg = this.getMatch(/^.{6,20}$/, text, "Password must be between 8 to 20 characters")
            this.setState({ errps: msg })
        }
        else if (type == 'PhoneNumber') {
            this.setState({ PhoneNumber: text })
            let msg = this.getMatch(/^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/, text, "Phone Number Incorrect")
            this.setState({ errpn: msg })
        }
        else if (type == 'Address') {
            this.setState({ address: text })
        }
    }

    isFormEmpty() {
        if (this.state.UserName != '' && this.state.email != '' && this.state.password != '' && this.state.PhoneNumber != '' && this.state.address != '' && this.state.CNIC != '')
            return false
        this.setState({ formEmptyDialog: true })
        return true
    }

    isErrorFree() {
        if (this.state.errUs == '' && this.state.errem == '' && this.state.errps == '' && this.state.errpn == '' && this.state.errad == ''&& this.state.errCNIC == '')
            return true
        this.setState({ formErrorDialog: true })
        return false
    }

    getMatch(regex, text, errMsg) {
        let msg = ''
        if (regex.test(text))
            msg = ""
        else
            msg = errMsg
        return msg
    }

    /* goToLogin = async () => {
         console.log('hello i am pressed')
         let obj = { 'name': 'name' }
         await firebase.firestore().collection('Users').doc().set(obj).then(() => console.log('hello world')).catch((error) => console.log('hello2\n:::::', error));
     }*/

    goToLogin = async () => {
        if (!this.isFormEmpty() && this.isErrorFree()) {
            this.setState({ btnDisabled: true })
            this.setState({ btnIndicator: true })

            await signup(this.state.email, this.state.password).then(async () => {
                var user = firebase.auth().currentUser;
                if (user) {
                    var userObj = {
                        UserName: this.state.UserName,
                        email: this.state.email,
                        password: this.state.password,
                        phonenumber: this.state.PhoneNumber,
                        address: this.state.address,
                        CNIC:this.state.CNIC,
                        type: 'Super User',
                        userID: user.uid,
                    }
                } else
                    throw new Exception()
                console.log('heloo')
                await firebase.firestore().collection('Users').doc().set(userObj).then(() => console.log('hello world')).catch((error) => console.log(error));
                // emailVerification()
                this.setState(this.initialState)
                this.props.navigation.navigate('Login')
            }).catch((error) => {
                Alert.alert(error.message)
                this.setState({ signupError: error.message })
                this.setState({ signupErrorDialog: true })
            }
            ).finally(() => {
                this.setState({ btnDisabled: false })
                this.setState({ btnIndicator: false })
            })
        }
    }

    render() {
        let btnDisplay;
        if (this.state.btnIndicator)
            btnDisplay = <ActivityIndicator size={responsiveHeight(4)} color={'white'} />
        else
            btnDisplay = <Text style={Styles.btnTxt}>SIGN UP</Text>

        return (
          
            <View style={Styles.container}>
                <ScrollView>
               
               

                <Text style={Styles.HearderText}>Sign Up</Text>

                <View style={Styles.Username}>
                 <TextInput 
                    label='Username'
                    mode='outlined'
                    theme={{ colors: { primary: "#BE1E2D" }}}
                    value={this.state.UserName}
                    onChangeText={text => this.validate(text, "UserName")}
                  
                />   
            </View>
                     <Text style={Styles.error}>
                    {this.state.errUs}
                    </Text>
            

                <View style={Styles.email}>
                 <TextInput 
                    label='Email'
                    value={this.state.email}
                    mode='outlined'
                    theme={{ colors: { primary: "#BE1E2D" }}}
                    onChangeText={text => this.validate(text, "email")}/>
                    </View>
                    <Text style={Styles.error}>
                    {this.state.errem}
                    </Text>
                    

                <View style={Styles.pass}>
                <TextInput 
                label='Password'
                value={this.state.password}
                secureTextEntry={true}
                mode='outlined'
                theme={{ colors: { primary: "#BE1E2D" }}}
                onChangeText={text => this.validate(text, "password")}/>
                 </View>
                  <Text style={Styles.error}>
                   {this.state.errps}
                   </Text>


             

                <View style={Styles.phone}>
                <TextInput 
                label='Phone No'
                keyboardType='number-pad'
                mode='outlined'
                theme={{ colors: { primary: "#BE1E2D" }}}
                value={this.state.PhoneNumber}
                onChangeText={text => this.validate(text, "PhoneNumber")}/>
                </View>
                   <Text style={Styles.error}>{
                    this.state.errpn}
                    </Text> 

                    <View style={Styles.CNIC}>
                <TextInput 
                label='CNIC'
                keyboardType='number-pad'
                mode='outlined'
                theme={{ colors: { primary: "#BE1E2D" }}}
                value={this.state.CNIC}
                onChangeText={text => this.validate(text, "CNIC")}/>
                </View>
                   <Text style={Styles.error}>{
                    this.state.errCNIC}
                    </Text> 


                <View style={Styles.address
                
                }>
                <TextInput 
                label='Address'
                theme={{ colors: { primary: "#BE1E2D" }}}
                value={this.state.address}
                mode='outlined'
                onChangeText={text => this.validate(text, "Address")} />
                 </View>
                <Text style={Styles.error}>{
               this.state.errsn}
                </Text>
    


                <View style={Styles.btn}>
                <Button   mode="outlined"
                color='#BE1E2D' 

                 onPress={this.goToLogin}
                
                >
               Sign Up
                </Button>
                 </View>

                 <View style={{flexDirection:'row',alignSelf:'center'}}>
                     <Text>Already have an account? </Text>

                     <TouchableOpacity onPress={() => {
                        this.props.navigation.navigate('Login')}}>
                         <Text style={{color:'#BE1E2D'}}>  Login</Text>

                     </TouchableOpacity>


                     </View>
                     </ScrollView>
                     




                </View>
               

 
        )
    }
}

const Styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    HearderText: {
        justifyContent: 'flex-start',
        textAlign: 'center',
        fontSize: responsiveFontSize(2.8),
        fontWeight: 'bold',
        width: 200,
        marginBottom: 60,
        color: 'black',
        alignSelf:'center'
    },
  
 
  
    error: {
        
        color: 'red',
        paddingTop: 5,
        alignSelf:'center'
    },
    Username:{
        width: responsiveWidth(80),
      alignSelf:'center'
    
    },
    email:{
        width: responsiveWidth(80),
        justifyContent:'center',
        alignSelf:'center'
        
        
    },
    pass:{
        width: responsiveWidth(80),
       justifyContent:'center',
       alignSelf:'center'
     
       
    },
    phone:{
        width: responsiveWidth(80),
       justifyContent:'center',
       alignSelf:'center'
      
        
    },
    CNIC:{
        width: responsiveWidth(80),
       justifyContent:'center',
       alignSelf:'center'
      
        
    },
    address:{
        width: responsiveWidth(80),
        alignSelf:'center',
     
       justifyContent: 'center',
      
       
    },
    
    btn:{
        justifyContent:'center',
        width: responsiveWidth(50),
        alignSelf:'center'
        
       
       

    }
})
