import React, { Component } from 'react'
import { Text, View, ScrollView ,ToastAndroid, TouchableOpacity,Dimensions,StatusBar} from 'react-native'
import {Actions} from 'react-native-router-flux'
import { Icon } from '@ant-design/react-native';
const {width}=Dimensions.get('window');

export default class Release extends Component {
    constructor(){
        super();
        this.state={
            tits:[],
            pages:1
        }
    }
    
    componentDidMount(){
        fetch('https://cnodejs.org/api/v1/topics?page=1&limit=10')
            .then((res)=>res.json())
            .then(res=>{
                this.setState({tits:res.data})
            }
        )    
    }
    //上一页
    lastPage = () => {
        if(this.state.pages>1){
            this.setState({pages:this.state.pages-1},()=>{
                fetch('https://cnodejs.org/api/v1/topics?page='+this.state.pages+'&limit=10')
                .then(res=>res.json())
                .then(res=>{
                    this.setState({tits: res.data});
                })
            })
        }
        else{
            ToastAndroid.show('已经是第一页了', 100);
        }
    }
    //下一页
    nextPage = () => {
        this.setState({pages:this.state.pages + 1},()=>{
            fetch('https://cnodejs.org/api/v1/topics?page=' + this.state.pages +'&limit=10')
                .then((res)=>res.json())
                .then(res=>{
                    this.setState({tits:res.data})
                }
            )  
        });
          
    }

    
  

    render() {
        return (
            <View style={{backgroundColor:'#f7f5f5'}}>
            <StatusBar barStyle="dark-content" />
            <ScrollView>
               {/* 导航栏 */}
                <View style={{'width':width,flexDirection:'row',height:55,justifyContent:"flex-start",paddingTop:8,backgroundColor:'#f23030'}}>  
                    <Icon  style={{marginTop:5,marginLeft:8,color:'white'}} size={30} name='left' onPress={()=>Actions.pop()}/>
                    <View style={{width:'80%'}}>
                        <Text  style={{flex:1,textAlign:'center',color:'white',fontSize:20,marginTop:6}}>我的发布</Text>
                    </View>
                    <Icon  style={{marginTop:5,marginRight:8,color:'white'}} size={30} name='ellipsis'/>
                </View>
                {/* 获取数据 */}
                <View style={{flex:1,'width':width,height:500,backgroundColor:'white',alignItems:'center'}}>
                <View style={{backgroundColor:'white',width:'80%',height:420,justifyContent:'center'}} >
                    {
                        this.state.tits.map((item)=>(
                            <View style={{flexDirection:'row',marginTop:10}}>
                                {/* 1、获取数据内容 */}
                                <Text numberOfLines={1} style={{width:'55%',lineHeight:30,marginRight:'5%',color:'grey'}}>
                                    {item.title}
                                </Text>
                                {/* 2、截取年月日显示 */}
                                <Text style={{marginRight:'5%',color:'grey',lineHeight:30}}>
                                    {item.create_at.slice(0,10)}
                                </Text>
                                {/* 3、右边随机显示回复状况 */}
                                <Text style={{color:"grey",lineHeight:30}}>
                                    {item.title.length%2==0 ? <Text>已回复</Text> : <Text style={{color:'red'}}>待回复</Text>}
                                </Text>
                            </View>
                        ))
                    }
                </View>

                {/* 翻页 */}
                <View style={{width:'80%',backgroundColor:'white',height:60,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    <TouchableOpacity 
                        onPress={()=>this.lastPage()} 
                        style={{width:80,height:30,borderRadius:15,backgroundColor:'red',justifyContent:'center',alignItems:'center'}} 
                    >
                        <Text style={{color:'#fff'}}>上一页</Text>
                    </TouchableOpacity>

                    <Text style={{marginTop:6,marginLeft:'20%',marginRight:'20%'}}>
                        第 {this.state.pages} 页
                    </Text>

                    <TouchableOpacity 
                        onPress={()=>this.nextPage()} 
                        style={{width:80,height:30,borderRadius:15,backgroundColor:'red',justifyContent:'center',alignItems:'center'}} >
                            <Text style={{color:'#fff'}}>下一页</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </ScrollView> 
            </View>
        )
    }
}
