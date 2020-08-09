
import React, { Component } from 'react';
import { View, Text,Dimensions,StyleSheet,FlatList,TouchableOpacity,Image ,ScrollView} from 'react-native';
import { Appbar } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
// import icons
import Icon from 'react-native-vector-icons/Ionicons';
var {height, width } = Dimensions.get('window');
export default class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {

      dataCategories: [
        { name: 'food',  image: require('./img/food.jpg'), id:1},
        { name: 'baking', image: require('./img/baking.jpg'), id:2},
        { name: 'sketching',image:  require('./img/sketching.jpg'), id:3},
        { name: 'video',  image: require('./img/download.jpg'), id:4},
        { name: 'sketching ',image: require('./img/sketching.jpg'), id:5},
      ],
      dataFood: [
        { name: 'Chicken masala',  image: require('./img/cooking1.jpg'),price:'200',categorie:1,phone:'0334-1234567'},
        // { name: 'vegetable rice', image: require('./img/cooking2.jpg'),price:'200',categorie:1},
        // { name: 'briyani', image: require('./img/cooking3.jpg'),price:'200',categorie:1},
        { name: 'Chicken karahi', image: require('./img/cooking4.jpg'),price:'200',categorie:1,phone:'0334-1234567'},
        { name: 'zarda', image: require('./img/cooking5.jpg'),price:'200',categorie:1,phone:'0334-1234567'},
        // { name: 'Kheer', image: require('./img/cooking6.jpg'),price:'200',categorie:1},
        { name: 'Meat karahi', image: require('./img/cooking7.jpg'),price:'200',categorie:1,phone:'0334-1234567'},
        { name: 'pastery',image:  require('./img/cakeone.jpg'),price:'200',categorie:2,phone:'0334-1234567'},
        { name: 'cake',  image: require('./img/cake2.jpg'),price:'200',categorie:2,phone:'0334-1234567'},
        { name: 'black pastery',  image: require('./img/cake3.jpg'),price:'200',categorie:2,phone:'0334-1234567'},
        // { name: 'choco cake',  image: require('./img/cake4.jpg'),price:'200',categorie:2},
        { name: 'cream cake',  image: require('./img/cake5.jpg'),price:'200',categorie:2,phone:'0334-1234567'},
        { name: 'portrait',image: require('./img/ske5.jpg'),price:'200',categorie:3,phone:'0334-1234567'},
        // { name: 'pencil sketch ',image: require('./img/ske2.jpg'),price:'200',categorie:3},
        { name: 'digital sketch ',image: require('./img/ske3.jpg'),price:'200',categorie:3,phone:'0334-1234567'},
        { name: 'diital sketch ',image: require('./img/ske4.jpg'),price:'200',categorie:3,phone:'0334-1234567'},
        { name: 'hand make sketch ',image: require('./img/ske1.jpg'),price:'200',categorie:3,phone:'0334-1234567'},
        
      ],
      selectCatg:0
    };
  }

 

  _renderItem(item){
    return(
      <TouchableOpacity style={[styles.divCategorie]}
      onPress={()=>this.setState({selectCatg:item.id})}
     >
        <Image
          style={{width:100,height:80}}
          resizeMode="contain"
          source={item.image} />
        <Text style={{fontWeight:'bold',fontSize:22,color:'white'}}>{item.name}</Text>
      </TouchableOpacity>
    )
  }

  _renderItemFood(item){
    let catg = this.state.selectCatg
    if(catg==0||catg==item.categorie)
    {
      return(
        <TouchableOpacity style={styles.divFood}>
          <Image
            style={styles.imageFood}
            resizeMode="contain"
            source={item.image} />
            <View style={{height:((width/2)-20)-90, backgroundColor:'transparent', width:((width/2)-20)-10}} />
            <Text style={{fontWeight:'bold',fontSize:22,textAlign:'center'}}>
              {item.name}
            </Text>
      <Text>{item.phone}</Text>
            <Text style={{fontSize:20,color:"green"}}>Rs.{item.price}</Text>

            <TouchableOpacity
            onPress={()=>this.onClickAddCart(item)}
            style={{
              width:(width/2)-40,
              backgroundColor:'#BE1E2D',
              flexDirection:'row',
              alignItems:'center',
              justifyContent:"center",
              borderRadius:5,
              padding:4
            }}>
            <Text style={{fontSize:18, color:"white", fontWeight:"bold"}}>Add Cart</Text>
            <View style={{width:10}} />
            <Icon name="ios-add-circle" size={30} color={"white"} />
          </TouchableOpacity>

          <TouchableOpacity
          onPress={()=>this.props.navigation.navigate('CustomeOrder')}
            style={{
              width:(width/2)-40,
              marginTop:5,
              backgroundColor:'#BE1E2D',
              flexDirection:'row',
              alignItems:'center',
              justifyContent:"center",
              borderRadius:5,
              padding:4
            }}>
            <Text style={{fontSize:18, color:"white", fontWeight:"bold"}}>Custom Order</Text>
            <View style={{width:10}} />
           
          </TouchableOpacity>
          </TouchableOpacity>
        )
    }
  }
  onClickAddCart(data){

    const itemcart = {
      food: data,
      quantity:  1,
      price: data.price
    }
 
    AsyncStorage.getItem('cart').then((datacart)=>{
        if (datacart !== null) {
          // We have data!!
          const cart = JSON.parse(datacart)
          cart.push(itemcart)
          AsyncStorage.setItem('cart',JSON.stringify(cart));
        }
        else{
          const cart  = []
          cart.push(itemcart)
          AsyncStorage.setItem('cart',JSON.stringify(cart));
        }
        alert("Add Cart")
      })
      .catch((err)=>{
        alert(err)
      })
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
                       title="Categories"
                     />
                   </Appbar.Header>
      

        <View style={{width:width, borderRadius:20, paddingVertical:20, backgroundColor:'white'}}>
           
            <FlatList
              horizontal={true}
              data={this.state.dataCategories}
              renderItem={({ item }) => this._renderItem(item)}
              keyExtractor = { (item,index) => index.toString() }
            />

<FlatList
              //horizontal={true}
              data={this.state.dataFood}
              numColumns={2}
              renderItem={({ item }) => this._renderItemFood(item)}
              keyExtractor = { (item,index) => index.toString() }
            />
            <View style={{height:20}} />
          </View>

</ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({

  container:{
    backgroundColor:'white'

  },
  
  divCategorie:{
    backgroundColor:'#BE1E2D',
    margin:5, alignItems:'center',
    borderRadius:10,
    padding:10
  },
  imageFood:{
    width:((width/2)-20)-10,
    height:((width/2)-20)-30,
    backgroundColor:'transparent',
    position:'absolute',
    top:-45
  },
  divFood:{
    width:(width/2)-20,
    padding:10,
    borderRadius:10,
    marginTop:55,
    marginBottom:5,
    marginLeft:10,
    alignItems:'center',
    elevation:8,
    shadowOpacity:0.3,
    shadowRadius:50,
    backgroundColor:'white',
  }
 
});















