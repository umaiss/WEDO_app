import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Image,
    Text
    
  } from 'react-native';
import { Card, } from 'native-base';

import { RadioButton,Button,Appbar } from 'react-native-paper';
import { responsiveWidth, responsiveHeight} from 'react-native-responsive-dimensions';

export default class PaymentsOptions extends Component {
  state = {
    checked: 'first',
  };
  
  render() {
    const { checked } = this.state;
    return (


       <View style={styles.container}>
         <SafeAreaView>
         <ScrollView>


         <Appbar.Header style={{backgroundColor:'#BE1E2D'}}>
           
        <Appbar.BackAction
          onPress={() =>this.props.navigation.goBack()}
        />
        <Appbar.Content
          title="Payment Options"
        />
      </Appbar.Header>

<Card style={styles.card}>
<View style={{flexDirection:'row',flex:1}} >
  <View>
<Image source={require('./img/easypaisa.png')} style={{height:responsiveHeight(15), width:responsiveWidth(25),}}/>
        </View>
      <View style={{marginLeft:270,marginTop:30}}>
      
        <RadioButton  
          value="first"
          color="brown"
          status={checked === 'first' ? 'checked' : 'unchecked'}
          onPress={() => { this.setState({ checked: 'first' }); }}
        />
</View>
        </View>

        </Card>
       



        <Card style={styles.card}>
        <View style={{flexDirection:'row',flex:1,marginTop:20}} >
  <View>
<Image source={require('./img/cash.jpg')} style={{height:responsiveHeight(15), width:responsiveWidth(25),}}/>
        </View>
      <View style={{marginLeft:270,marginTop:20}}>
     
        <RadioButton  
          value="second"
          color="brown"
          status={checked === 'second' ? 'checked' : 'unchecked'}
          onPress={() => { this.setState({ checked: 'second' }); }}
        />
</View>
        </View>
        </Card>


        
        <View style={styles.btn}>
                    <Button  mode="outlined"
                    color='#BE1E2D'onPress={() => {
                      this.props.navigation.navigate('PaymentIntegration')}}
                        >
                        Confirm
                </Button>
                </View>


</ScrollView>
</SafeAreaView>
</View>

    );
  }
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
   },
   btn: {
    justifyContent: 'center',
    width: responsiveWidth(50),
    paddingTop: 10,
    alignSelf:"center"

},

    card:{
      borderRadius:15
    },
 
     
 
});