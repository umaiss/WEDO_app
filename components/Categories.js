
import React, { Component } from 'react';
import { View, Text,Dimensions,StyleSheet,FlatList,TouchableOpacity,Image ,ScrollView} from 'react-native';
import { Appbar } from 'react-native-paper';
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
        { name: 'food',  image: require('./img/food.jpg'),price:'200',categorie:1},
        { name: 'baking', image: require('./img/baking.jpg'),price:'200',categorie:1},
        { name: 'sketching',image:  require('./img/sketching.jpg'),price:'200',categorie:2},
        { name: 'video',  image: require('./img/download.jpg'),price:'200',categorie:2},
        { name: 'sketching ',image: require('./img/sketching.jpg'),price:'200',categorie:3},
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
            <Text>Descp Food and Details</Text>
            <Text style={{fontSize:20,color:"green"}}>${item.price}</Text>
          </TouchableOpacity>
        )
    }
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















