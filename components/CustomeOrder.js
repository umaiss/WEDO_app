import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, TextInput, Modal, TouchableHighlight } from 'react-native';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import DropDownPicker from 'react-native-dropdown-picker';
import ImagePicker from 'react-native-image-picker';
import { Appbar } from 'react-native-paper';
import { Form, Textarea } from 'native-base';
var { width } = Dimensions.get("window")
export default class CustomeOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filePath: {},
      modalVisible: false,
      country: 'uk'
    };
  }
  toggleModal(visible) {
    this.setState({ modalVisible: visible });
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

        <Appbar.Header style={{ backgroundColor: '#BE1E2D' }}>

          <Appbar.BackAction
            onPress={() => this.props.navigation.goBack()}
          />
          <Appbar.Content
            title="Custom Order"
          />
        </Appbar.Header>
        <View style={styles.container}>

          <TouchableOpacity style={styles.buttonContainer}
            onPress={() => this.props.navigation.navigate('chat')}
          >
            <Text style={{ color: 'white' }}>Talk to person</Text>
          </TouchableOpacity>


          <TouchableOpacity style={styles.buttonContainer}
            onPress={this.chooseFile}
          >
            <Text style={{ color: 'white' }}>Upload picture</Text>
          </TouchableOpacity>

          <Image
            source={this.state.filePath}
            style={{ width: 250, height: 250 }}
          />
          <View>
          <Modal animationType={"slide"} transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => { console.log("Modal has been closed.") }}>
              <Text  style={{ textAlign:'center',fontWeight:'bold',fontSize:20 }}>Create custom order</Text>

            <View>


            <DropDownPicker
    items={[
        {label: '1 day', value: 'uk'},
        {label: '2 day', value: 'france'},
        {label:'3 day'},
        {label:'4 day'},
        {label:'5 day'},
        {label:'6 day'},
        {label:'7 day'},
        {label:'8 day'},
        {label:'9 day'},
        {label:'10 day'},
        {label:'11 day'},
        {label:'12 day'},
        {label:'13 day'},
        {label:'14 day'},
        {label:'15 day'},
        {label:'16 day'},
        {label:'17 day'},
        {label:'18 day'},
        {label:'19 day'},
        {label:'20 day'},
        {label:'21 day'},
        {label:'22 day'},
        {label:'23 day'},
        {label:'24 day'},
        {label:'25 day'},
        {label:'26 day'},
        {label:'27 day'},
        {label:'28 day'},
        {label:'29 day'},
        {label:'30 day'},
        {label:'31 day'},
    ]}
    defaultValue={this.state.country}
    containerStyle={{height: 40}}
    style={{backgroundColor: '#fafafa'}}
    itemStyle={{
        justifyContent: 'flex-start'
    }}
    dropDownStyle={{backgroundColor: '#fafafa'}}
    onChangeItem={item => this.setState({
        country: item.value
    })}
/>
              </View>
              <TextInput
                style={styles.inputField}
                placeholder='Rs. price'
                keyboardType='Default'
                underlineColorAndroid="transparent"
              />

              <Form >
                <Textarea rowSpan={5} bordered placeholder="Description" style={{ borderRadius: 10, marginTop: 10, backgroundColor: '#e6e6e6' }} />
              </Form>

              <TouchableHighlight onPress={() => {
                this.toggleModal(!this.state.modalVisible)
              }}>

                <Text style={styles.text}>Next</Text>
              </TouchableHighlight>
        
          </Modal>
          </View>

          <TouchableOpacity style={styles.buttonContainer}
            onPress={() => { this.toggleModal(true) }}
          >
            <Text style={{ color: 'white' }}>create custom order</Text>
          </TouchableOpacity>




          <TouchableOpacity style={{
            backgroundColor: "#BE1E2D",
            width: width - 40,
            alignItems: 'center',
            padding: 10,
            borderRadius: 5,
            margin: 20
          }}
            onPress={() => { this.props.navigation.navigate('PaymentsOptions') }}>
            <Text style={{
              fontSize: 24,
              fontWeight: "bold",
              color: 'white'
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
  Container: {
    flex: 1,
  },
  container: {
    marginTop: '30%',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonContainer: {
    marginTop: 6,
    height: 35,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 7,
    width: 300,
    backgroundColor: "#BE1E2D",
  },

  text: {
    color: '#3f2949',
    marginTop: 10,
    alignSelf: 'center',
  },
  inputField: {
    height: responsiveHeight(6),
    width: responsiveWidth(100),
    fontSize: 15,
    marginVertical:'5%',
    backgroundColor:'#e6e6e6'
  }
})
