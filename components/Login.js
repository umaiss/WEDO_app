import React, { Component } from 'react';
import { View, Text, SafeAreaView, StatusBar, Image, TouchableOpacity, Alert, AsyncStorage, StyleSheet, Dimensions } from 'react-native';
// import { Card, CardItem, } from 'native-base'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import { TextInput, Button } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { AccessToken, LoginManager } from 'react-native-fbsdk';


import { GoogleSignin } from '@react-native-community/google-signin';

import Icon from 'react-native-vector-icons/dist/FontAwesome';
import * as firebase from 'firebase'
import 'firebase/firestore'
import { login } from './Auth'
var { width } = Dimensions.get("window")

console.disableYellowBox = true;

export default class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: 'mianumais1997@gmail.com',
            password: '123456789',
            token: null,

            errem: '',
            errps: '',


            formEmptyDialog: false, formErrorDialog: false,
        }
        this.initialState = this.state
        this.validate = this.validate.bind(this)
        this.isFormEmpty = this.isFormEmpty.bind(this)
        this.isErrorFree = this.isErrorFree.bind(this)
    }

    validate(text, type) {
        if (type == 'email') {
            this.setState({ email: text })
            let msg = this.getMatch(/[A-Za-z]+([A-Za-z0-9]|[.]|[_])*[@][A-Za-z]+[.]com$/, text, "Email format example abc@abc.com")
            this.setState({ errem: msg })
        }
        else if (type == 'password') {
            this.setState({ password: text })
            let msg = this.getMatch(/^.{6,20}$/, text, "Password must be between 8 to 20 characters")
            this.setState({ errps: msg })
        }
    }

    isFormEmpty() {
        if (this.state.email != '' && this.state.password != '')
            return false
        this.setState({ formEmptyDialog: true })
        return true
    }

    isErrorFree() {
        if ( this.state.errem == '' && this.state.errps == '' )
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

    SubmitForm = async () => {
        console.log('i am login', this.state)
        await AsyncStorage.setItem('Email', this.state.email)
      
        
        
        console.log('umais here')
        
      

        await login(this.state.email, this.state.password).then(async () => {
            console.log('Hello Home')
            this.props.navigation.navigate('Dashboard')
        })
    }


    // //google signin


    componentDidMount = () => {
        GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/drive.readonly'],
            webClientId: '274125605863-ut2clilahh2kmu5l6ooi93ekovn73l6k.apps.googleusercontent.com',
            offlineAccess: true
        });
    }

    async googleLogin() {
        try {
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            const userInfo = await GoogleSignin.signIn();
            const credential = firebase.auth.GoogleAuthProvider.credential(userInfo.idToken, userInfo.accessToken)
            const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
            if (!firebaseUserCredential.user) {
                throw new Error('Something went wrong obtaining the users access token');
            }
            this.setState({ googleLogin: true })
        }
        catch (error) {
            console.log(error.message);
            this.setState({ googleLogin: false })
        }
        finally {
            if (this.state.googleLogin) {
                await getCurrentUid().then(async uid => {
                    await getUserFirestoreObj().then(async user => {
                        if (!user) {
                            await firebase.firestore().collection('Users').add({
                                'phoneNumber': '',
                                'userID': uid,
                                'type': 'Super User',
                                'account': 'google'
                            })
                        }
                        this.props.navigation.navigate('Main')
                    }).catch(error => {
                        this.setState({ loginMessage: error.message })
                        this.setState({ loginDialog: true })
                    })
                })
            }
            else {
                console.log('google login error');
                this.setState({ loginMessage: error.message })
                this.setState({ loginDialog: true })
            }
        }
    }


    // //end google signin






    _AuthFB() {
        const dhis = this
        // Attempt a login using the Facebook login dialog asking for default permissions.
        LoginManager.logInWithPermissions(["public_profile", "email"]).then(
            function (result) {
                if (result.isCancelled) {
                    console.log("Login cancelled");
                } else {
                    console.log(
                        "Login success with permissions: " +
                        result.grantedPermissions.toString()
                    );
                    dhis._setDataFB()
                }
            },
            function (error) {
                console.log("Login fail with error: " + error);
            }
        );
    }


    async _setDataFB() {
        // get token from facebook
        const tokenData = await AccessToken.getCurrentAccessToken().then(
            (data) => {
                return data.accessToken.toString()
            }
        )
        // get data about profile from api graph
        const datajson = await this.apiGraphFace(tokenData)

        if (datajson.success) {
            // variable para enviar post
            const data_fb = {
                id_facebook: datajson.data.id,
                email: datajson.data.email,
                name: datajson.data.name,
                picture: datajson.data.picture
            }
            this.setState(data_fb);
        }
    }


    async apiGraphFace(token) {

        const resface = await fetch('https://graph.facebook.com/v2.10/me?fields=id,name,email,picture.width(500)&access_token=' + token)
            .then((response) => response.json())
            .then((json) => {
                const data = {
                    data: json,
                    success: true
                }
                return data;
            })
            .catch((error) => {
                const data = {
                    message: error,
                    success: false
                }
                return data;
            })

        return resface;
    }


    render() {
        return (
            <View style={Styles.container}>
               
<ScrollView>
<Image source={require('./img/unnamed.png')} style={{ height: responsiveHeight(26), width: responsiveWidth(62), marginTop: 45,marginBottom:20, alignSelf: 'center' }} />

                <View style={Styles.email}>
                    <TextInput
                        label='Email'
                        mode='outlined'
                        value={this.state.email}
                        theme={{ colors: { primary: "#BE1E2D" }}}
                        onChangeText={text => this.validate(text, "email")} />
                </View>
                <Text style={Styles.error}>
                    {this.state.errem}
                </Text>


                <View style={Styles.pass}>
                    <TextInput
                        label='Password'
                        value={this.state.password}
                        theme={{ colors: { primary: "#BE1E2D" }}}
                        mode='outlined'
                        selectionColor='red'
                        underlineColor='red'
                        
                        secureTextEntry={true}
                        onChangeText={text => this.validate(text, "password")} />
                </View>
                <Text style={Styles.error}>
                    {this.state.errps}
                </Text>
                <View style={{marginLeft:'55%'}}>
                <TouchableOpacity   onPress={() => {
                        this.props.navigation.navigate('ForgotPassword')}}>
                    <Text style={{color:'#BE1E2D'}}>
                        Forgotten Password?

                        </Text>

                    </TouchableOpacity>
                 </View>





                <View style={Styles.btn}>
                    <Button  mode="outlined"
                    color='#BE1E2D'
                        onPress={this.SubmitForm} >
                        login
                </Button>
                </View>

               <View style={{alignSelf:'center', flexDirection:'row', marginTop:20}}>

      

<Button
onPress={this.googleLogin}
  icon={({ size, color }) => (
    <Image
      source={require('./img/google.png')}
      style={{ width: 45, height: 45,}}
    />
  )}
/>
<Button
onPress={this._AuthFB}
  icon={({ size, color }) => (
    <Image
      source={require('./img/facebook.png')}
      style={{ width: 50, height: 50,  }}
    />
  )}
/>         
          
          </View>      
                
                <View
            style={{
              marginTop: 20,
              marginLeft: 50,
              marginRight: 50,
              borderBottomColor: 'black',
              borderBottomWidth: 1,
            }}
          />

                <View style={{ flexDirection: 'row', marginTop:10,alignSelf:"center" }}>
                    <Text>Don't have account?</Text>
                    <TouchableOpacity onPress={() => {
                        this.props.navigation.navigate('Signup')
                    }}>
                        <Text style={{ color: '#BE1E2D' }}>  Sign Up</Text>
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

    email: {

        width: responsiveWidth(80),
        justifyContent: 'center',
        alignSelf:"center"

    },
    pass: {
        width: responsiveWidth(80),
        justifyContent: 'center',
        paddingTop: 10,
        alignSelf:"center"
        
        
    },
    btn: {
        justifyContent: 'center',
        width: responsiveWidth(50),
        marginTop:'5%',
        alignSelf:"center"

    },
    error: {

        color: 'red',
        paddingTop: 5,
        alignSelf: 'center'
    },


})