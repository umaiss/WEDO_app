import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Button,
    TextInput,
    Image
  } from 'react-native';
import { responsiveWidth, responsiveHeight} from 'react-native-responsive-dimensions';

import { Form,Textarea } from 'native-base';
import ImagePicker from 'react-native-image-picker';
export default class AddStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filePath: {},
    };
  }

    state ={
        title:'',
        
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



       <View style={styles.container}>
         <ScrollView>
     
<View>
<Text style={styles.text}>Store Name</Text>
<TextInput 
      style={styles.textfield}
      onChangeText={Title => onChangeText(Title)}
      value={this.state.title}
    />
    </View>

    <Form >
            <Textarea rowSpan={5} bordered placeholder="TDescription" style={{borderRadius:10,marginTop:20,backgroundColor:'#e6e6e6'}}/>
          </Form>


  

    <View style={{flexDirection:'row'}}>
<Text style={styles.text1}>Categories</Text>
<TextInput 
      style={styles.Ctextfield}
    //   onChangeText={Title => onChangeText(Title)}
    //   value={this.state.title}
    />

    </View>

    <View style={{flexDirection:'row'}}>
<Text style={styles.text1}>Location</Text>
<TextInput 
      style={styles.Ltextfield}
    //   onChangeText={Title => onChangeText(Title)}
    //   value={this.state.title}
    />

    </View>

    <View style={styles.container1}>
          {/*<Image 
          source={{ uri: this.state.filePath.path}} 
          style={{width: 100, height: 100}} />*/}
         
         <Button title="Choose File" onPress={this.chooseFile.bind(this)} />
          <Image
            source={{ uri: this.state.filePath.uri }}
            style={{ width: 250, height: 250 }}
          />
         
        </View>
</ScrollView>

</View>

    );
  }
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
   },
   container1: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
   text:{
       fontWeight: 'bold',
       fontSize:15,
       marginLeft:5,
   },
   text1:{
    fontWeight: 'bold',
    fontSize:15,
    marginLeft:5,
    marginTop: 20,
},
   textfield:{
     height: 40,
     backgroundColor:'#e6e6e6', 
      width:responsiveWidth(95),
      marginLeft:5
   },
 
  Ctextfield:{
    height: 40,
     width:responsiveWidth(50),
     marginLeft:120,
     marginTop:10,
     
    backgroundColor:'#e6e6e6',
  },
  Ltextfield:{
    height: 40, 
     width:responsiveWidth(50),
     marginLeft:135,
     marginTop:10,
     
    backgroundColor:'#e6e6e6',
     
  },

  



});