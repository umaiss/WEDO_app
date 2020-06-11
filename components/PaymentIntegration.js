import React, { Component } from 'react';
import {
  View,
  UIManager,
  StyleSheet,
} from 'react-native';

import { YellowBox } from 'react-native';
import { TextInput, Button, Appbar,Title } from 'react-native-paper';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import Stripe from 'react-native-stripe-api';

YellowBox.ignoreWarnings(['Warning: ...']);

UIManager.setLayoutAnimationEnabledExperimental(true);

import { CreditCardInput } from 'react-native-credit-card-input';
import { ScrollView } from 'react-native-gesture-handler';

export default class PaymentIntegration extends Component {
 state = {
      number: '',
      expmonth: '',
      expyear: '',
      cvc: '',


    }
  

  _onFocus = field => console.log('focusing', field)

  _onChange = formData => console.log(JSON.stringify(formData, null, ' '))

  payme(){
    const apiKey = 'sk_test_3lSfaAQEFJ5YklDTxZpeg02b00qNPkDlHT';
const client = new Stripe(apiKey);
const token =   client.createToken({
  number: '4242424242424242' ,
  exp_month: '09', 
  exp_year: '18', 
  cvc: '111',
  
});

  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
        <Appbar.Header style={{backgroundColor:'#BE1E2D'}}>
           
           <Appbar.BackAction
             onPress={() =>this.props.navigation.goBack()}
           />
           <Appbar.Content
             title="Credit card info"
           />
         </Appbar.Header>
        <CreditCardInput
          autoFocus
          requireName={true}
          requireCVC={true}
          requirePostalCode={true}
          validColor="black"
          invalidColor="red"
          placeholderColor="darkgray"
          labelStyle={{ color: 'black', fontSize: 12 }}
          inputStyle={{ color: 'black', fontSize: 16 }}
          onFocus={this._onFocus}
          onChange={this._onChange}
        />


        <Title>Please enter the card info</Title>

        <View style={styles.pass}>
          <TextInput
            label='Card number'
            value={this.state.number}
            theme={{ colors: { primary: "#BE1E2D" } }}
            selectionColor='red'
            underlineColor='red'
            onChangeText={number => this.setState({ number })} />
        </View>
        


        <View style={styles.pass}>
          <TextInput
            label='Expire month'
            value={this.state.expmonth}
            theme={{ colors: { primary: "#BE1E2D" } }}
            selectionColor='red'
            underlineColor='red'
            onChangeText={expmonth => this.setState({ expmonth })} />
        </View>

        <View style={styles.pass}>
          <TextInput
            label='Expire year'
            value={this.state.expyear}
            theme={{ colors: { primary: "#BE1E2D" } }}
            selectionColor='red'
            underlineColor='red'
            onChangeText={expyear => this.setState({expyear})} />
        </View>

        <View style={styles.pass}>
          <TextInput
            label='CVC'
            value={this.state.cvc}
            theme={{ colors: { primary: "#BE1E2D" } }}
            selectionColor='red'
            underlineColor='red'
            onChangeText={cvc => this.setState({cvc})} />
        </View>

        <View style={styles.btn}>
                    <Button  mode="outlined"
                    color='#BE1E2D'
                        onPress={this.payme} >
                        submit
                </Button>
                </View>
</ScrollView>
      </View>
    );
  }

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
    backgroundColor: 'white',
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
});