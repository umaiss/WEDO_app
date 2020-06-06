
import React, { Component } from 'react';
import { StyleSheet, View, Image, TextInput, ImageBackground, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Container, Header, Content, Card, CardItem, Thumbnail, Right, Text, Button, Left, Body, Input, Item, Form, Textarea } from 'native-base';

import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Searchbar } from 'react-native-paper';
import Dialog, { DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog'
// import Textarea from 'react-native-textarea';
import RNFetchBlob from 'react-native-fetch-blob';
import ImagePicker from 'react-native-image-picker';
import * as firebase from 'firebase';
import 'firebase/firestore';




import Cart from './Cart';
import Categories from './Categories';
import Order from './Order';
import Profile from './Profile';
import Map from './Map';

class Sellerdashboard extends Component {
  constructor(props) {
    super(props),
      this.state = {
        visible: false,
        Card2Visible: false,
        imageSource: null,
        firstQuery: '',

      }
  }

  toggleModal = () => {
    this.setState({ visible: !this.state.visible });
  };
  toggleCard2Modal = () => {
    this.setState({ Card2Visible: !this.state.Card2Visible });
   
};


  SelectImage = async () => {
    ImagePicker.showImagePicker({ noDare: true, mediaType: "photo" }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        this.setState({
          avatarSource: response.uri,
          opacity: 0
        });
        const image = response.uri
        const Blob = RNFetchBlob.polyfill.Blob
        const fs = RNFetchBlob.fs
        window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
        window.Blob = Blob

        let uploadBlob = null
        const imageRef = firebase.storage().ref('posts').child("test3.jpg")
        let mime = 'image/jpg'
        fs.readFile(image, 'base64')
          .then((data) => {
            return Blob.build(data, { type: `${mime};BASE64` })
          })
          .then((blob) => {
            uploadBlob = blob
            return imageRef.put(blob, { contentType: mime })
          })
          .then(() => {
            uploadBlob.close()
            return imageRef.getDownloadURL()
          })
          .then((url) => {
            // URL of the image uploaded on Firebase storage
            console.log(url);
          })
          .catch((error) => {
            console.log(error);

          })
      }
    });
  }



  render() {
    const { firstQuery } = this.state;
    return (

      <View style={styles.container} >


        <ScrollView>


          <View style={{ flexDirection: 'row' }}>
            <Searchbar style={{ width: responsiveWidth(90) }}
              placeholder="Search"
              onChangeText={query => { this.setState({ firstQuery: query }); }}
              value={firstQuery}
            />

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Order')} >
              <Image source={require('./img/pin.png')} style={{ height: responsiveHeight(7.5), width: responsiveWidth(10), flex: 1 }} />
            </TouchableOpacity>

          </View>
          <View>

            <View style={styles.direction}>
              <View>
                <TouchableOpacity
                  onPress={() => { this.setState({ visible: true }); }}>
                  <Card style={styles.card}>
                    <ScrollView>


                      <Dialog
                        visible={this.state.visible}
                        footer={
                          <DialogFooter >
                            <DialogButton
                              text="CANCEL"
                              onPress={
                                this.toggleModal
                              }
                            // style={[styles.btn, { backgroundColor: '#DB4437' }]}
                            />
                            <DialogButton
                              text="Add"
                            // style={[styles.btn, { backgroundColor: '#4285F4' }]}
                            />
                          </DialogFooter>
                        }
                      >
                        <DialogContent style={styles.DialogCard}>
                          <View style={styles.AddContainer}>

                            <Text style={styles.ImageText}>Tap To Add Images</Text>
                            <TouchableOpacity style={styles.ProductImagesCard} activeOpacity={0.5} onPress={this.SelectImage}>
                              <View>
                                {
                                  this.state.avatarSource && <Image source={{ uri: this.state.avatarSource }}
                                    style={{ height: responsiveHeight(20), width: responsiveWidth(45), justifyContent: 'center', alignSelf: 'center', borderWidth: 4, borderColor: 'white' }} />
                                }
                              </View>
                            </TouchableOpacity>



                            <TextInput
                              style={styles.inputField}
                              placeholder='Deal Name'
                              keyboardType='Default'
                              underlineColorAndroid="transparent"
                            />

                            <Form >
                              <Textarea rowSpan={5} bordered placeholder="TDescription" style={{ borderRadius: 10, marginTop: 20, backgroundColor: '#e6e6e6' }} />
                            </Form>



                            <TextInput
                              style={styles.inputField}
                              placeholder='Price'
                              keyboardType='Default'
                              underlineColorAndroid="transparent"
                            />

                            <TextInput
                              style={styles.inputField}
                              placeholder='Store Name'
                              keyboardType='Default'
                              underlineColorAndroid="transparent"
                              multiline={true}
                            />



                          </View>
                        </DialogContent>
                      </Dialog>
                    </ScrollView>

                    <Image source={require('./img/bread-background-wheat-aromatic-crispbread-grains-copy-space-top-view-bakery-grocery-food-store-concept-134406721.jpg')} style={{ height: responsiveHeight(24), width: responsiveWidth(50), flex: 1, borderTopLeftRadius: 10, borderTopRightRadius: 10 }} />
                    <Body>

                      <Text style={styles.innerText}>ADD DEAL</Text>

                    </Body>
                  </Card>
                </TouchableOpacity>
              </View>

              <View>
                <TouchableOpacity
                  onPress={() => { this.setState({ Card2Visible: true }); }}>



                  <Card style={styles.card}>

                    <ScrollView>
                      <Dialog
                        visible={this.state.Card2Visible}
                        footer={
                          <DialogFooter >
                            <DialogButton
                              text="CANCEL"
                              onPress={
                                this.toggleCard2Modal
                               
                              }
                            // style={[styles.btn, { backgroundColor: '#DB4437' }]}
                            />
                            <DialogButton
                              text="Add"
                            // style={[styles.btn, { backgroundColor: '#4285F4' }]}
                            />
                          </DialogFooter>
                        }
                      >
                        <DialogContent style={styles.DialogCard}>
                          <View style={styles.AddContainer}>

                            <Text style={styles.ImageText}>Tap To Add Images</Text>
                            <TouchableOpacity style={styles.ProductImagesCard} activeOpacity={0.5} onPress={this.SelectImage}>
                              <View>
                                {
                                  this.state.avatarSource && <Image source={{ uri: this.state.avatarSource }}
                                    style={{ height: responsiveHeight(20), width: responsiveWidth(45), justifyContent: 'center', alignSelf: 'center', borderWidth: 4, borderColor: 'white' }} />
                                }
                              </View>
                            </TouchableOpacity>



                            <TextInput
                              style={styles.inputField}
                              placeholder='Deal Name'
                              keyboardType='Default'
                              underlineColorAndroid="transparent"
                            />

                            <Form >
                              <Textarea rowSpan={5} bordered placeholder="TDescription" style={{ borderRadius: 10, marginTop: 20, backgroundColor: '#e6e6e6' }} />
                            </Form>



                            <TextInput
                              style={styles.inputField}
                              placeholder='Location'
                              keyboardType='Default'
                              underlineColorAndroid="transparent"
                            />
                          </View>
                        </DialogContent>
                      </Dialog>
                    </ScrollView>


                    <Image source={require('./img/Sketching2.jpg')} style={{ height: responsiveHeight(24), width: responsiveWidth(50), flex: 1, borderTopLeftRadius: 10, borderTopRightRadius: 10 }} />

                    <Body>

                      <Text style={styles.innerText}>ADD STORE</Text>

                    </Body>
                  </Card>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.direction}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('PaymentOptions')}>
                <Card style={styles.card}>
                  <Image source={require('./img/images.jpg')} style={{ height: responsiveHeight(24), width: responsiveWidth(50), flex: 1, borderTopLeftRadius: 10, borderTopRightRadius: 10 }} />
                  <Body>
                    <Text style={styles.sinnerText}>UPLOAD VIDEO</Text>
                  </Body>
                </Card>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Categories')}>
                <Card style={styles.card}>


                  <Image source={require('./img/download.jpg')} style={{ height: responsiveHeight(24), width: responsiveWidth(50), flex: 1, borderTopLeftRadius: 10, borderTopRightRadius: 10 }} />
                  <Body>


                    <Text style={styles.innerText}>LIVE VIDEO LECTURE</Text>

                  </Body>

                </Card>
              </TouchableOpacity>
            </View>

          </View>


        </ScrollView>

      </View>
    );
  }
}


const TabNavigator = createBottomTabNavigator({
  Sellerdashboard: {
    screen: Sellerdashboard,
    navigationOptions: {
      tabBarLabel: 'Home',

      tabBarIcon: () => (
        <Icon name="home" color={"#BE1E2D"} size={25} tintColor="black" />
      )
    }
  },
  Order: {
    screen: Order,
    navigationOptions: {
      tabBarLabel: 'Order',
      tabBarIcon: () => (
        <Icon name="shopping-bag" color={"#BE1E2D"} size={25} />
      )
    }
  },

  Cart: {
    screen: Cart,
    navigationOptions: {
      tabBarLabel: 'Cart',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="shopping-cart" color={"#BE1E2D"} size={25} />
      )
    }
  },
  Categories: {
    screen: Categories,
    navigationOptions: {
      tabBarLabel: 'categroies',

      tabBarIcon: ({ tintColor }) => (
        <Icon name="list-ul" color={"#BE1E2D"} size={25} />
      )
    }
  },

  Profile: {
    screen: Profile,
    navigationOptions: {
      tabBarLabel: 'Profile',

      tabBarIcon: ({ tintColor }) => (
        <Icon name="user-circle" color={"#BE1E2D"} size={25} />
      )
    }
  },

  Map: {
    screen: Map,
    navigationOptions: {
      tabBarLabel: 'Map',

      tabBarIcon: ({ tintColor }) => (
        <Icon name="direction" color={"#BE1E2D"} size={25} />
      )
    }
  },
});




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6e6e6'
  },
  direction:
  {
    flexDirection: 'row',
  },


  innerText: {
    textAlign: 'center'
  },

  card: {
    borderRadius: 15,

  },
  DialogCard: {
    height: responsiveHeight(70),
    width: responsiveWidth(80),
    textAlign: 'center',
  },
  inputField: {
    height: responsiveHeight(6),
    width: responsiveWidth(75),
    fontSize: 15,

    top: 20,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#e6e6e6',
  },
  ProductImagesCard: {
    alignSelf: 'center',
    justifyContent: 'center',
    top: 20,
    right: 42,
    marginBottom: 20,
    borderRadius: 10,
    height: responsiveHeight(20),
    width: responsiveWidth(50),
    backgroundColor: 'rgba(96,199,217,0.2)'
  },
  ImageStyle: {
    alignSelf: 'center',
    height: responsiveHeight(15),
    width: responsiveWidth(30),
    justifyContent: 'center',
    resizeMode: 'stretch',
    alignItems: 'center',
    top: 20
  },
  ImageText: {
    fontSize: responsiveFontSize(1.5),
    fontWeight: 'bold',
    alignSelf: 'center',
    bottom: -20,
    marginRight: 80
  },
  NumberBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    left: -40,
  }


});
export default createAppContainer(TabNavigator);