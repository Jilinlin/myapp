import React,{Component} from 'react';
import {View,Text,Image, StyleSheet,AsyncStorage,TouchableOpacity} from "react-native";
import Swiper from 'react-native-swiper'
import Button from 'react-native-button'

export default class SwiperPage extends Component{
    // start=()=>{
    //     console.log('start');
    //     AsyncStorage.setItem('isInstall',true,()=>{
    //         console.log('store end')//异步存储 
    //     });
    //     this.props.afterInstall();//先执行  再存储
    // }
    // start= async()=>{
    //     console.log('start');
    //     await AsyncStorage.setItem('isInstall','true',()=>{//需要是字符串
    //         console.log('store end');//异步存储 
    //         this.props.afterInstall();//先执行  再存储
    //     });
        
    // }
    start =  () => {
        AsyncStorage.setItem('isInstall','true',()=>{
            this.props.afterInstall();
        });
  };
    render(){
        return(
                <Swiper style={styles.wrapper} showsButtons={false}>
                    <View style={styles.slide1}>
                        <Image style={styles.img} source={require('../../assets/launch_screen.png')}/>
                    </View>
                    <View style={styles.slide1}>
                        <Image style={styles.img} source={require('../../assets/launch_screen2.png')}/>
                    </View>
                    <View style={styles.slide1}>
                        <Image style={styles.img} source={require('../../assets/launch_screen3.png')}/>
                        {/* <Button onPress={this.start} style={styles.start}>开始体验</Button> */}
                        <TouchableOpacity onPress={this.start} style={styles.start}>
                            <Text style={{color: '#fff'}}>开始体验</Text>
                        </TouchableOpacity>
                    </View>
                </Swiper>
        )
    }
}
const styles = StyleSheet.create({
    img:{
        width: '100%',
        height: '100%'
    },
    slide1: {
      flex: 1,
      height: '100%',
      alignItems: 'center',
    },
    start: {
        position:'absolute',
        bottom: 150,
        width: 120,
        height: 40,
        justifyContent:'center',
        alignItems:'center',
        textAlignVertical: 'center',
        backgroundColor: 'red',
        borderRadius: 20,
    }
})