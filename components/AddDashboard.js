import React,{Component} from 'react';
import { StyleSheet,  View, Image, ImageBackground,TouchableOpacity,ScrollView,FlatList } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Container, Header, Content, Card, CardItem, Thumbnail,Right, Text, Button, Left, Body, Input,Item} from 'native-base';

import { responsiveWidth, responsiveHeight} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Searchbar } from 'react-native-paper';



import Cart from './Cart';
import Categories from './Categories';
import Order from './Order';
import Profile from './Profile';

class Dashboard extends Component {
  constructor(props){ 
    super(props);
    this.state={

    };
  }
  

  render(){
    return (
    <View>
       

      <ScrollView>
      <View style={{ flexDirection:'row'}}>
      

<TouchableOpacity 
        onPress={() => this.props.navigation.navigate('Order')} >
              <Image source={require('./img/pin.png')}  style={{height:responsiveHeight(7.5), width:responsiveWidth(10),flex:1}}/>
           </TouchableOpacity>
     
     </View>

        
      
     <View > 
  
     <Container style={{ backgroundColor:'#e6e6e6'}}>
        
        <Content>
          
          <Card >
            
            <CardItem  cardBody  onPress={() => this.props.navigation.navigate('AddStore')}>
            <TouchableOpacity
        onPress={() => this.props.navigation.navigate('Order')} >
              <Image source={require('./img/easyindiancooking-07343d8ce3ce47da8c3b5d7ac2df5532.jpg')} style={{height:responsiveHeight(24), width:responsiveWidth(99), flex: 1}}/>
           </TouchableOpacity>
            </CardItem>
            
            
            <CardItem>
              
              <Body>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('AddStore')}>
                  <Text style={styles.innerText}>Add Store</Text>
                </TouchableOpacity>
              </Body>
              
            </CardItem>
            </Card>



            <Card >
            
            <CardItem  cardBody  onPress={() => this.props.navigation.navigate('AddDeal')}>
            <TouchableOpacity
        onPress={() => this.props.navigation.navigate('Order')} >
              <Image source={require('./img/easyindiancooking-07343d8ce3ce47da8c3b5d7ac2df5532.jpg')} style={{height:responsiveHeight(24), width:responsiveWidth(99), flex: 1}}/>
           </TouchableOpacity>
            </CardItem>
            
            
            <CardItem>
              
              <Body>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('AddDeal')}>
                  <Text style={styles.innerText}>Add Deal</Text>
                </TouchableOpacity>
              </Body>
              
            </CardItem>
            </Card>

           
           
        </Content>
      </Container>

</View>


</ScrollView>

    </View>
  );
}
}


const TabNavigator = createBottomTabNavigator({
  Dashboard:{  
    screen:Dashboard,  
    navigationOptions:{  
      tabBarLabel:'Home',  
      
      tabBarIcon:()=>(  
          <Icon name="home" color={"#BE1E2D"} size={25} tintColor="black"/>  
      )  
    }  
  },  
  Order:{  
    screen:Order,  
    navigationOptions:{  
      tabBarLabel:'Order', 
      tabBarIcon:()=>(  
          <Icon name="shopping-bag" color={"#BE1E2D"} size={25} />  
      )  
    }  
  },  

  Cart:{  
    screen:Cart,  
    navigationOptions:{  
      tabBarLabel:'Cart',  
      tabBarIcon:({tintColor})=>(  
          <Icon name="shopping-cart" color={"#BE1E2D"} size={25}/>  
      )  
    }  
  },
  Categories:{  
    screen:Categories,  
    navigationOptions:{  
      tabBarLabel:'categroies', 
      
      tabBarIcon:({tintColor})=>(  
          <Icon name="list-ul" color={"#BE1E2D"} size={25} />  
      )  
    }  
  },

  Profile:{  
    screen:Profile,  
    navigationOptions:{  
      tabBarLabel:'Profile', 
      
      tabBarIcon:({tintColor})=>(  
          <Icon name="user-circle" color={"#BE1E2D"} size={25}/>  
      )  
    }  
  },
});




const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    
  },
  direction:
  {
    flexDirection : 'row'

  },


  
  sketching:{
    paddingLeft : 50
  },

  baking:{
    paddingLeft : 50
  },

  innerText:{
    paddingLeft : 160
  },
 

});
export default createAppContainer(TabNavigator);