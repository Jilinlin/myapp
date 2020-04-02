import React,{useState,useEffect} from 'react';
import {StyleSheet,View,Text, Image,AsyncStorage, BackHandler,ToastAndroid } from 'react-native';
import {Router, Overlay, Scene, Tabs, Drawer, Lightbox, Modal, Actions} from 'react-native-router-flux';
import { Icon } from '@ant-design/react-native';
import SplashScreen from 'react-native-splash-screen';
import SwiperPage from './src/common/SwiperPage';//轮播
import Register from './src/common/Register';//注册
import Login from './src/common/Login';//登录
import Home from './src/home/Home';//首页
import Goods from './src/goods/Goods';//分类
import Userinfor from './src/userinfor/Userinfor';//个人中心
import Release from './src/userinfor/Release';//我的发布

// 封装功能

console.disableYellowBox = true;
//const rootUrl = 'https://www.fastmock.site/mock/65721c49c01f167ea082d0dc81fb0c41/api';

const App = () => {
	// AsyncStorage.removeItem('isIntsall');
	// AsyncStorage.removeItem('user');
	// AsyncStorage.clear();
	let [isLogin,setLogin] = useState(false); 
	let [isInstall,setInstall] = useState(true); 
	// 实现 Tabs
	let now = 0;

	let init =()=>{
	// useEffect(()=>{
		// AsyncStorage.getItem('isInstall')
		// 	.then(res=>{
		// 		console.log('isInstall',res);
		// 		if(res){
		// 			setInstall(false);
		// 			AsyncStorage.getItem('user')  //为了保证顺序执行
		// 				.then(res=>{
		// 				let user = JSON.parse(res)
		// 				console.log(user)
		// 				if(!user){
		// 					SplashScreen.hide();
		// 				}
		// 				if(user&&user.token){
		// 					setLogin(true);
		// 					SplashScreen.hide();
		// 					// console.log(isLogin)
		// 				}
		// 			})
		// 		}
		// 	})

		AsyncStorage.getItem('isInstall')
			.then(res=>{
				console.log('isInstall',res);
				if(res){
					setInstall(false);
				}
			})

		//AsyncStorage.removeItem('user');//删除数据
		// AsyncStorage.clear()
		AsyncStorage.getItem('user')
			.then(res=>{
				let user = JSON.parse(res)
				console.log(user)
				if(!user){
					SplashScreen.hide();
				}
				if(user&&user.token){
					setLogin(true);
					SplashScreen.hide();
					// console.log(isLogin)
				}
				if (user.status == '111' || user.status == '222') {
					SplashScreen.hide();
				}
		})
	// },[])
	}

	useEffect(()=>{
		init();//封装
	},[])

	let afterInstall = ()=>{
		console.log('after Install');
		setInstall(false);
	}

	if(isInstall){
		// 引导页
		return <View style={{flex:1}}>
			<SwiperPage afterInstall={afterInstall} />
		</View>
	}

	return (
		<Router
			backAndroidHandler={()=>{
				if(Actions.currentScene != 'home'&&Actions.currentScene == 'login'&&Actions.currentScene != 'register'){
					Actions.pop();
					return true;
				}else{
					if(new Date().getTime()-now<2000){
						BackHandler.exitApp();
					}else{
						ToastAndroid.show('确定要退出吗',100);
						now = new Date().getTime();
						return true;
					}
				}	
			}}
		>
			<Overlay>
			<Modal key="modal" hideNavBar>
        {/* <Scene key="login" component={Login}/> */}
				<Lightbox key="lightbox">
          {/* <Scene/> */}
					{/* <Drawer 
						key="drawer"
						contentComponent={()=><Text>drawer</Text>}
						drawerIcon={()=><Icon name="menu"/>}
						drawerWidth={400}
					> */}
						<Scene key="root">
							<Tabs 
								key='tabbar'
								hideNavBar								
								activeTintColor="red"
								inactiveTintColor="gray"
								tabBarStyle={{backgroundColor:'white'}}
							>
        
								{/* 首页 */}
								<Scene key='homePage'
									title='首页'
									icon={
										({focused})=><Icon 
											color={focused?'red':'gray'} 
											name="home"
										/>
									}
									hideNavBar
								>
									<Scene key='home' 
										component={Home}
									/>
								</Scene>

								{/* 商品分类 */}
								<Scene key='goodsPage'
									title='商品分类'
									icon={
										({focused})=><Icon 
											color={focused?'red':'gray'} 
											name="file"
										/>
									}
									hideNavBar
								>
									<Scene key="goods" component={Goods}/>
								</Scene>


								{/* 用户中心 */}
								<Scene 
									key='userPage'
									hideDrawerButton
									icon={({focused})=>
										<Icon 
											color={focused?'red':'gray'} 
											name='file'/>
										}
									title="用户中心"
									hideNavBar
								>	
									<Scene key="userInfor" component={Userinfor}/>
									<Scene key="release" component={Release}/>
								</Scene>
								
							</Tabs>
						</Scene>
					{/* </Drawer> */}
					{/* <Scene key='light' component={Mybox}/> */}
				</Lightbox>
				<Scene initial={!isLogin} key="login" component={Login}/>
				<Scene key='register' component={Register} />
				{/* <Scene key="login" component={ShowMyName}/>
				<Scene key="login1" component={Login}/> */}
			</Modal>
			{/* <Scene component={Message}/> */}
			</Overlay>
		</Router>
	);
};

export default App;