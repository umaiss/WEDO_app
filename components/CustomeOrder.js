import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {Appbar } from 'react-native-paper';
var { width } = Dimensions.get("window")
export default class CustomeOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filePath: {},
    };
  }

  chooseFile = () => {
    var options = {
      title: 'Select Image',
      customButtons: [
        { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        let source = response;
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          filePath: source,
        });
      }
    });
  };

  render() {
    return (
      <View style={styles.Container}>
        
        <Appbar.Header style={{backgroundColor:'#BE1E2D'}}>
           
           <Appbar.BackAction
             onPress={() =>this.props.navigation.goBack()}
           />
           <Appbar.Content
             title="Custom Order"
           />
         </Appbar.Header>
         <View style={styles.container}>
   
      <TouchableOpacity style={styles.buttonContainer}
               onPress={() => this.props.navigation.navigate('chat')}
              >
                <Text  style={{color:'white'}}>Talk to person</Text>  
              </TouchableOpacity>  


              <TouchableOpacity style={styles.buttonContainer}
              onPress={this.chooseFile}
              >
                <Text  style={{color:'white'}}>Upload picture</Text>  
              </TouchableOpacity>  

          <Image
            source={ this.state.filePath }
            style={{ width: 250, height: 250 }}
          />


<TouchableOpacity style={{
               backgroundColor:"#BE1E2D",
               width:width-40,
               alignItems:'center',
               padding:10,
               borderRadius:5,
               margin:20
             }}
             onPress={()=>{this.props.navigation.navigate('PaymentsOptions')}}>
             <Text style={{
                 fontSize:24,
                 fontWeight:"bold",
                 color:'white'
               }}>
               CHECKOUT
             </Text>
           </TouchableOpacity>  
         
        
</View>





      </View>
    );
  }
}

const styles = StyleSheet.create({
Container:{
    flex:1,
},
container:{
  marginTop:'30%',
  justifyContent:'center',
  alignItems:'center'
},

    buttonContainer: {
        marginTop:6,
        height:35,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:7,
        width:300,
        backgroundColor: "#BE1E2D",
      },
})
