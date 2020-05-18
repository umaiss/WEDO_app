import React, { Component } from 'react';
import { StyleSheet, View, Image, ImageBackground, TouchableOpacity, ScrollView,Dimensions, FlatList } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {  Card, Text, Body,Form,Textarea } from 'native-base';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Searchbar } from 'react-native-paper';
import Carousel,{ ParallaxImage,Pagination } from 'react-native-snap-carousel';



import Cart from './Cart';
import Categories from './Categories';
import Order from './Order';
import Profile from './Profile';
import Map from './Map';

const { width: screenWidth } = Dimensions.get('window')
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstQuery: '',
      
      deals: [
        {  image: require('./img/food.jpg') },
        {  image: require('./img/baking.jpg') },
        {  image: require('./img/sketching.jpg') },
        {  image: require('./img/download.jpg') },
        {  image: require('./img/sketching.jpg') },
      ]

    };
  }

  

  // renderCarouselItem = ({ item }) =>
  //   <View style={styles.cardContainer}>
  //     <Text style={styles.cardTitle}>{item.name}</Text>
  //     <Image style={styles.cardImage} source={item.image} />
  //   </View>
 
  _renderItem ({item, index}, parallaxProps) {
    return (
        <View style={styles.item}>
            <ParallaxImage
                
                containerStyle={styles.imageContainer}
                style={styles.image}
                parallaxFactor={0.4}

                
            />
            
           
            <Image style={styles.title} source={item.image} />
             
        </View>
    );
}
get pagination () {
  const { deals, activeSlide } = this.state;
  return (
      <Pagination
        dotsLength={deals.length}
        activeDotIndex={activeSlide}
        dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 5,
            backgroundColor: 'black'
        }}
        inactiveDotStyle={{
            // Define styles for inactive dots here
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
  );
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
              onPress={() => this.props.navigation.navigate('Map789')} >
              <Image source={require('./img/pin.png')} style={{ height: responsiveHeight(7.5), width: responsiveWidth(10), flex: 1 }} />
            </TouchableOpacity>

          </View>

        
          {/* <Carousel
            ref={(c) => { this._carousel = c; }}
            data={this.state.coordinates}
            containerCustomStyle={styles.carousel}
            renderItem={this.renderCarouselItem}
            sliderWidth={Dimensions.get('window').width}
            itemWidth={300}
          /> */}
          <View>

            <Carousel
                sliderWidth={screenWidth}
                sliderHeight={screenWidth}
                itemWidth={screenWidth - 60}
                data={this.state.deals}
                renderItem={this._renderItem}
                hasParallaxImages={true}
            />
            { this.pagination }
            </View>



        





          <View>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Order')}>
              <Card style={styles.card}>

                <Image source={require('./img/easyindiancooking-07343d8ce3ce47da8c3b5d7ac2df5532.jpg')} style={{ height: responsiveHeight(24), width: responsiveWidth(99), flex: 1, borderTopLeftRadius: 10, borderTopRightRadius: 10 }} />


                <Body>
                  <Text style={styles.innerText}>COOKING</Text>

                </Body>
              </Card>
            </TouchableOpacity>
            <View style={styles.direction}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('AddStore')} >
                <Card style={styles.card}>

                  <Image source={require('./img/bread-background-wheat-aromatic-crispbread-grains-copy-space-top-view-bakery-grocery-food-store-concept-134406721.jpg')} style={{ height: responsiveHeight(24), width: responsiveWidth(50), flex: 1, borderTopLeftRadius: 10, borderTopRightRadius: 10 }} />
                  <Body>

                    <Text style={styles.innerText}>BAKING</Text>

                  </Body>
                </Card>
              </TouchableOpacity>
          

        


              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Sellerdashboard')} >


                <Card style={styles.card}>

                  <Image source={require('./img/Sketching2.jpg')} style={{ height: responsiveHeight(24), width: responsiveWidth(50), flex: 1, borderTopLeftRadius: 10, borderTopRightRadius: 10 }} />

                  <Body>

                    <Text style={styles.innerText}>SKETCHING</Text>

                  </Body>
                </Card>
              </TouchableOpacity>
            </View>

            <View style={styles.direction}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('PaymentOptions')}>
                <Card style={styles.card}>
                  <Image source={require('./img/images.jpg')} style={{ height: responsiveHeight(24), width: responsiveWidth(50), flex: 1, borderTopLeftRadius: 10, borderTopRightRadius: 10 }} />
                  <Body>
                    <Text style={styles.sinnerText}>LEARN FROM VIDEO</Text>
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
  Dashboard: {
    screen: Dashboard,
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
        <Icon name="map-signs" color={"#BE1E2D"} size={25} />
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
  
  item: {
    width: screenWidth - 200,
    height: screenWidth - 200,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
    
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },


});
export default createAppContainer(TabNavigator);