import React, {Component} from 'react';
import {View, Text, Image, TextInput,AsyncStorage,TouchableOpacity, Alert} from 'react-native';
import { Icon } from '@ant-design/react-native';
import { Actions } from 'react-native-router-flux';
import {myFetch} from '../utils/index'

export default class Login extends Component {
    constructor(){
        super();
        this.state = {
            username:'',
            pwd:'',
            isloading:false
        }
    }
    userhandle = (text)=>{
        this.setState({username:text})
    }
    pwdhandle = (text)=>{
        this.setState({pwd:text})
    }
    login=()=>{
        // myFetch.get('/topics',{limit:4,user:'sss'})
        //     .then(res=>console.log(res))
        //this.setState({isloading:true})//
        if(this.state.username != '' && this.state.pwd != ""){
            this.setState({
              isloading:true
            })
            myFetch.post('/login',{
                username:this.state.username,
                pwd:this.state.pwd
            // }).then(res=>console.log(res))     
            }).then(res=>{
                // 根据返回状态进行判断，正确时跳转首页
                // if(res){

                // }
                if(res.data.status == '111'){
                  Alert.alert('账户已经存在啦');
                  this.setState({ isloading: false });
                }
                else if(res.data.status == '222'){
                  Alert.alert('连接错误');
                  this.setState({ isloading: false });
                }
                else{
                  AsyncStorage.setItem('user',JSON.stringify(res.data))//存储
                    .then(()=>{
                        this.setState({isloading:false})
                        Actions.homePage()//跳转
                    })
                }
                console.log(res.data);                 
            })            
        }
        else{
          this.setState({
            num:1
          })
          Alert.alert('用户名或密码不能为空哦~');
        }    
    }
  render() {
    return (
      <View style={{flex: 1,justifyContent: 'center'}}>
        <View
          style={{ alignItems: 'center'}}>
              {/* <Text>{this.state.username}</Text> */}
          <View
            style={{
              width: '80%',
              marginRight: 10,
              borderBottomColor: '#ccc',
              borderBottomWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 20,
            }}>
            <Icon name="user" color="red"/>
            <TextInput placeholder="用户名"
                onChangeText={this.userhandle}
            />
          </View>
          <View
            style={{
              width: '80%',
              marginRight: 10,
              borderBottomColor: '#ccc',
              borderBottomWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 20,
            }}>
            <Icon name="lock" color="red"/>
            <TextInput placeholder="密码" 
                onChangeText={this.pwdhandle}
                secureTextEntry={true} 
            />
          </View>
          <TouchableOpacity 
              style={{
                  width: '80%',
                  height: 40,
                  backgroundColor: '#ccc',
                  marginTop: 30,
                  alignItems: 'center',
                  justifyContent: 'center'
              }}
              onPress={this.login}>
              <Text>登录</Text>
          </TouchableOpacity>
          <TouchableOpacity 
              style={{
                  width: '80%',
                  height: 40,
                  backgroundColor: '#ccc',
                  marginTop: 30,
                  alignItems: 'center',
                  justifyContent: 'center'
              }}
              onPress={() => Actions.register()}>
              <Text>注册</Text>
          </TouchableOpacity>
        </View>
        {
            //正在登录弹窗
            this.state.isloading
            ? <View style={{ alignItems: 'center',marginTop:55 }}><Text style={{ fontSize: 15,color:'red' }}>正在登录中...</Text></View>
            : null
        }
      </View>
    );
  }
}