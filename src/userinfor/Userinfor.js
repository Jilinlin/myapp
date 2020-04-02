import React,{Component} from 'react';
import { Actions } from 'react-native-router-flux';
import Button from 'react-native-button';
import { Icon } from '@ant-design/react-native';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Dimensions,
    PixelRatio,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
const {width}=Dimensions.get('window');

const options = {//定义选项
    title: '选择图片', 
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照', 
    chooseFromLibraryButtonTitle: '选择照片', 
    cameraType: 'back',
    mediaType: 'photo',
    videoQuality: 'high', 
    durationLimit: 10, 
    maxWidth: 300,
    maxHeight: 300,
    quality: 0.8, 
    angle: 0,
    rotation:90,
    allowsEditing: false, 
    noData: false,
    storageOptions: {
        skipBackup: true
    }
};

export default class Mine extends Component{

    constructor(props) {
        super(props);
        this.state = {
            avatarSource: require('../../assets/touxiang.png'),//默认头像
            username:''
        };
     }

    componentDidMount(){
        AsyncStorage.getItem('uri')//获得本地存储内容并赋值
            .then((res)=>{
                if(res !== null){
                   let ImageUri = {uri:res}
                    this.setState({
                        avatarSource:ImageUri
                    }) 
                }else{
                this.setState({avatarSource: require('../../assets/touxiang.png')});
                }
                
            });
    }

    selectPhotoTapped() {//调用照相机函数
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };
                this.setState({
                    avatarSource: source
                });
                AsyncStorage.setItem('uri',response.uri,()=>{console.log('store success',source.uri)})//进行本地存储
            }
        });
    }
    //退出登录
    tuichu = () => {
        AsyncStorage.removeItem('user',(error)=>{
            error?console.log('清除本地存储失败'):console.log('已清除本地存储');
        })
        .then(()=>{
            Actions.replace('login');//回到登录页且不能返回上一页
        })
    }


    render(){
        return (
            <>
            <View style={{backgroundColor:'#f7f5f5'}}>
            {/* 一、头部 */}
            <View
                style={{'width':width,height:165,backgroundColor:'#e92d2d',justifyContent:'center',alignItems:'center'}}//backgroundColor:'#e92d2d'
            >
                <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)} >
                    <View style={[styles.avatar, styles.avatarContainer]}>
                        <Image style={styles.avatarimg}  source={this.state.avatarSource} />
                    </View>
                </TouchableOpacity>               
                <Text style={{fontSize:17,color:'white',marginTop:5}}>BINNU DHILLON</Text>
            </View>

            {/* 二、个人中心 */}
            <View> 
                <View style={styles.box} >
                    <Icon name='smile'/>
                    <Text style={styles.txt}>我的个人中心</Text>
                </View>
                <View style={{'width':width,height:215,flexDirection:'row',flexWrap:'wrap',borderBottomWidth:5,borderBottomColor:'#e6e6e6'}}>
                    <View style={styles.box1}>
                        <Icon name='setting'/> 
                        <Text style={styles.txt1}>账号管理</Text>
                    </View>
                    <View style={styles.box1}>
                        <Icon name='compass'/>
                        <Text style={styles.txt1}>收货地址</Text>
                    </View>
                    <View style={styles.box1}>
                        <Icon name='solution'/>
                        <Text style={styles.txt1}>我的信息</Text>
                    </View>
                    <View style={styles.box1}>
                        <Icon name='file-text'/>
                        <Text style={styles.txt1}>我的订单</Text>
                    </View>
                    <View style={styles.box1}>
                        <Icon name='qrcode'/>
                        <Text style={styles.txt1}>我的二维码</Text>
                    </View>
                    <View style={styles.box1}>
                        <Icon name='database'/>
                        <Text style={styles.txt1}>我的积分</Text>
                    </View>
                    <View style={styles.box1}>
                        <Icon name='star'/>
                        <Text style={styles.txt1}>我的收藏</Text>
                    </View>
                </View>
            </View>


            {/* 三、E族活动 */}
            <View>
                <View style={styles.box}>
                    <Icon name='tag'/>
                    <Text style={styles.txt}>E族活动</Text>
                </View>
                <View style={{'width':width,height:140,flexDirection:'row',flexWrap:'wrap'}}>
                    <View style={styles.box1}>
                        <Icon name='tool'/>
                        <Text style={styles.txt1}>居家维修保养</Text>
                    </View>
                    <View style={styles.box1}>
                        <Icon name='car'/>
                        <Text style={styles.txt1}>出行接送</Text>
                    </View>
                    <View style={styles.box1}>
                        <Icon name='user'/>
                        <Text style={styles.txt1}>我的受赠人</Text>
                    </View>
                    <View style={styles.box1}>
                        <Icon name='home'/>
                        <Text style={styles.txt1}>我的住宿优惠</Text>
                    </View>
                    <View style={styles.box1}>
                        <Icon name='flag'/>
                        <Text style={styles.txt1}>我的活动</Text>
                    </View>
                    <View style={styles.box1}>
                        <Button onPress={()=>{Actions.release()}} style={{textAlign:'center'}}>
                            <Icon name='form'  style={{textAlign:'center',position:'absolute',left:15,top:0}} />
                            <Text  style={styles.txt1}>{"\n"}我的发布</Text>
                        </Button>
                    </View>
                </View>
            </View>

            {/* 四、底部 */}
            {/* <View style={{'width':width,height:30,justifyContent:'center',alignItems:"center",backgroundColor:'#e6e6e6'}}>
                <Text style={{color:'white'}}>BINNU DHILLON | 退出</Text>
            </View> */}
            <View style={{ alignItems: 'center' }}>
                <TouchableOpacity
                    style={{
                        // width: '80%',
                        // height: 30,
                        // backgroundColor: '#f23030',
                        // // marginTop: 30,
                        // // marginBottom: 30,
                        // alignItems: 'center',
                        // justifyContent: 'center' 
                        'width':width,
                        height:30,
                        justifyContent:'center',
                        alignItems:"center", 
                        borderTopWidth:5,
                        borderTopColor:'#e6e6e6',      
                    }}
                    onPress={this.tuichu}>
                    <Text style={{ color: 'gray' }}>{this.state.username}BINNU DHILLON | 退出登录</Text>
                </TouchableOpacity>
            </View>
            </View>
            </>
          )
    }
}
const styles = StyleSheet.create({
    box:{
        // width:'100%',
        'width':width,
        height:45,
        flexDirection:'row',
        borderBottomWidth:1,
        borderBottomColor:'#e6e6e6',
        paddingTop:10,
        paddingLeft:10
    },
    txt:{
        marginLeft:10,
        color:'gray',
    },
    box1:{
        'width':1/3*width,
        height:70,
        justifyContent:'center',
        alignItems:'center',
    },
    txt1:{
        color:'gray',
        marginTop:8
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    avatarContainer: {
        borderColor: '#9B9B9B',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        borderRadius: 50,
        width: 100,
        height: 100
    },
    avatarimg: {
        borderRadius: 50,
        width: 100,
        height: 100,
        zIndex:999
    }
});


