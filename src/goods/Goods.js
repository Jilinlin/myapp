import React,{Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  TextInput,
  FlatList
} from 'react-native';

export default class Goods extends Component{
    render(){
        return (
            <>
            <View style={{backgroundColor:'#f7f5f5'}}>
              <StatusBar barStyle="dark-content" />
              <SafeAreaView>
                <FlatList
                  ListHeaderComponent={
                    <View>
                          {/* 搜索框  */}
                          <View style={{flexDirection:'row',height:40,justifyContent:"center",marginTop:20}}>
                            <View style={{
                              width:"90%",
                              backgroundColor:'#eee',
                              borderRadius:2,
                              marginRight:10,
                              flexDirection:'row',
                              alignItems:'center',
                              paddingLeft:5
                            }}>
                              <TextInput placeholder='请输入商品名称'/>
                              <Image style={{width:20,height:20,position:'absolute',right:10}} source={require('../../assets/search1.png')}/>
                            </View>
                        </View>
                        {/* 导航栏  */}
                        <View style={{
                          flexDirection:'row', //主轴方向是纵轴还是横轴
                          justifyContent:'space-evenly',//定义主轴对齐方式
                          alignItems:"center",//定义交叉轴对齐方式
                          flexWrap:'wrap',//换行
                        }}>
                          {/* 多个View时 超出自动隐藏 */}
                          <View style={styles.box}><Text style={{color:'red'}}>综合</Text></View>
                          <View style={styles.box}><Text style={{color:'#3e3e3e'}}>销量</Text></View>
                          <View style={styles.box}><Text style={{color:'#3e3e3e'}}>新品</Text></View>
                          <View style={styles.box}><Text style={{color:'#3e3e3e'}}>价格</Text></View>
                          <View style={styles.box}><Text style={{color:'#3e3e3e'}}>信用</Text></View>
                        </View>  
                    </View>
                  }//生成一个头部组件       
                  numColumns={2}//实现多列布局
                  data={[
                    { 
                      url1:require('../../assets/pic1.png'),
                      txt1:'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳',
                      txt2:'36.00'
                    },
                    { 
                      url1:require('../../assets/pic2.png'),
                      txt1:'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳',
                      txt2:'36.00'
                    },
                    { 
                      url1:require('../../assets/pic1.png'),
                      txt1:'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳',
                      txt2:'36.00'
                    },
                    { 
                      url1:require('../../assets/pic2.png'),
                      txt1:'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳',
                      txt2:'36.00'
                    },
                    { 
                      url1:require('../../assets/pic1.png'),
                      txt1:'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳',
                      txt2:'36.00'
                    },
                    { 
                      url1:require('../../assets/pic2.png'),
                      txt1:'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳',
                      txt2:'36.00'
                    },
                  ]}
                  renderItem={
                      ({item})=>
                      <View style={styles.box1}>
                        <Image style={styles.img} source={item.url1}/>
                        <Text style={styles.txt1}>{item.txt1}</Text>
                        <Text style={styles.txt2}>{item.txt2}</Text>
                      </View>
                  }
                />
              </SafeAreaView>
              </View>
            </>
          )
    }
}
const styles = StyleSheet.create({
  box:{
   width:'15%',
   height:60,
   paddingLeft:20,
   paddingTop:20
 },
  box1:{
    width:'45%',
    height:250,
    margin:10,
    backgroundColor:'white'
  },
  img:{
    width:'50%',
    height:120,
    marginLeft:45,
    marginTop:40,
    marginBottom:20
  },
  txt1:{
    color:'#b1b1b1',
    fontSize:13,
    marginLeft:9,
    marginRight:1
  },
  txt2:{
    color:'red',
    fontSize:13,
    marginLeft:9,
    marginTop:8
  }
});


