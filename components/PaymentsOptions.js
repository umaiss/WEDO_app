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
         <Appbar style={styles.header}>
        <Appbar.Action icon="back" onPress={() => console.log('Pressed archive')} />
    
      </Appbar>

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


        
        <View style={Styles.btn}>
                    <Button  mode="outlined"
                    color='#BE1E2D'
                        onPress={this.SubmitForm} >
                        login
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
    bottom: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
    },
     
 
});