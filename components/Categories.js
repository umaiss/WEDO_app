import React, { Component } from 'react';
import { Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity, 
} from 'react-native';
var {height, width } = Dimensions.get('window');
import Swiper from 'react-native-swiper'
import { Appbar } from 'react-native-paper';


export default class Categories extends Component {

  constructor(props)
  {
    super(props);
    this.state = {
      dataBanner:[],
      dataCategories: [],
      dataFood:[],
      selectCatg:0
    }
  } 

  componentDidMount(){
    const url = "http://tutofox.com/foodapp/api.json"
    return fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {

      this.setState({
        isLoading: false,
        dataBanner: responseJson.banner,
        dataCategories: responseJson.categories,
        dataFood: responseJson.food
      });


    })
    .catch((error) =>{
      console.error(error);
    });
  }
  render() {
    return (
      <ScrollView >
          <Appbar.Header style={{backgroundColor:'#BE1E2D'}}>
           
           <Appbar.BackAction
             onPress={() =>this.props.navigation.goBack()}
           />
           <Appbar.Content
             title="Categories"
           />
         </Appbar.Header>
        <View style={{ flex: 20, backgroundColor: "f2f2f2"}}>
          <View style = {{width: width, alignItems: 'center'}}>
           
             <Swiper style = {{height:width/2}} showsButtons= {false} autoplay={true} autoplayTimeout={1} >
               {
                 this.state.dataBanner.map((itemmap)=> {
                   return (
                     <Image style = {styles.Imagebanner} resizeMode="contain" source={{uri:itemmap}}/>
                   )
                 })
               }
               </Swiper>    
          </View>
          <View style={{width:width, borderRadius:20, paddingVertical:20, backgroundColor:'white'}}>
            <Text style={styles.titleCatg}>Categories {this.state.selectCatg}</Text>
            <FlatList
              horizontal={true}
              data={this.state.dataCategories}
              renderItem={({ item }) => this._renderItem(item)}
              keyExtractor = { (item,index) => index.toString()}
            />
            <FlatList
              
              data={this.state.dataFood}
              numColumns={2}
              renderItem={({ item }) => this._renderItemFood(item)}
              keyExtractor = { (item,index) => index.toString()}
            />
            <View style={{height:20}}/>
          </View>
               
               
          
        </View>
      </ScrollView>
    ); 
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
            source={{uri:item.image}} />
            <View style={{height:((width/2)-20)-90, backgroundColor:'transparent', width:((width/2)-20)-10}} />
            <Text style={{fontWeight:'bold',fontSize:22,textAlign:'center'}}>
              {item.name}
            </Text>
            <Text>hello</Text>
            <Text style={{fontSize:20,color:"green"}}>RS{1000}</Text>
          </TouchableOpacity>
        )
    }
  }

  _renderItem(item){
    return(
      <TouchableOpacity style={[styles.divCategorie,{backgroundColor:item.color}]}
      onPress={()=>this.setState({selectCatg:item.id})}>
        <Image
          style={{width:100,height:80}}
          resizeMode="contain"
          source={{uri : item.image}} />
        <Text style={{ fontSize:22}}>{item.name}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  Imagebanner:{
    height: width/2,  
    width: width-40,
    borderRadius:10,
    marginHorizontal:20
  },
  divCategorie:{
    backgroundColor: 'red',
    margin:5, alignItems:'center',
    borderRadius:10,
    padding:10
  },
  titleCatg:{
    fontSize:30,
    fontWeight:'bold',
    textAlign:'center',
    marginBottom:10
  },
  imageFood:{
    width:((width/2)-20)-10,
    height: ((width/2)-20)-30,
    backgroundColor:'transparent'
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


})