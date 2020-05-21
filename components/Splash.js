import React,{Component} from 'react';
import {
  View,
  StyleSheet,
  Text
} from 'react-native';

import Video from 'react-native-video';

import { responsiveWidth, responsiveHeight} from 'react-native-responsive-dimensions';


export default class Splash extends Component {
    render(){
        return(
            <View  style={{height:responsiveHeight(70), width:responsiveWidth(100), marginLeft:1,marginTop:80} }>
                <Video onEnd={() => this.props.navigation.navigate('Login')} source={require('./video/intro.mp4')} muted={true} style={styles.video} resizeMode={"cover"}></Video>
            </View>
        )
    }
}

const styles=StyleSheet.create({ 
    video:{
       flex:1,
        justifyContent: 'center',
    },
  })