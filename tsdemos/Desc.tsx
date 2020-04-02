import React, { Component } from 'react'
import { Text, View } from 'react-native'

// 普通装饰器（无参数）
// 装饰器其实就是一个函数，在函数里可以写一些新的逻辑，
// 包裹后面修饰的内容，将新的逻辑传递到被修饰的内容中去
// 高阶组件也是一个函数 就是装饰器
// @expr 语法其实是语法糖的形式
// function helloWord(target: any) {
//     console.log('hello Word!');
// }
// @helloWord
// class HelloWordClass {
//     sayHello(){
        
//     }
// }

//修饰函数
// class HelloWordClass1 {
//     @helloWord
//     sayHello(){

//     }
// }
//修饰参数
// class HelloWordClass1 {
//     sayHello(@helloWord ? ){

//     }
// }
//修饰属性
// class HelloWordClass1 {
//     @helloWord
//     sayHello:string ?
// }

// class Server{
//     login(){
//         fetch()
//     }
// }

// (一)定义
// 定义函数就是装饰器
// function addUrl(target:any){
//     target.prototype.url='https://www.baidu.com'
// }

// @addUrl
// class HomeServer{
//     url:any
//     // url:string|undefined;
//     getData(){
//         console.log(this.url)
//     }
// }
// let home = new HomeServer();
// home.getData()

// class UserServer{
//     getInfor(){

//     }
// }

// return函数是装饰器
// (二)装饰器工厂 带参数装饰器
// function addUrl(url:string){//装饰器工厂
//     return function(target:any){//函数的调用 这才是装饰器
//         target.prototype.url=url;
//         return class Demo extends target{
//             name:string = 'jilin'
//         }
//     }
    
// }

// @addUrl('https://www.baidu.com')
// class HomeServer{
//     url:any
//     // url:string|undefined;
//     getData(){
//         console.log(this.url)
//         console.log(this.name)
//     }
// }
// let home = new HomeServer();
// home.getData()

// class UserServer{
//     getInfor(){

//     }
// }

// 类装饰器
// function setStatusBar(color:string){
//     return function(WrapComponent:any){
//         return class extends Component{
//             render(){
//                 return(
//                     <>
//                         {/* <StatusBar /> */}
//                         <View style={{height:30,backgroundColor:'blue'}}></View>
//                         <WrapComponent/>
                    
//                     </>
//                 )
//             }
//         }
//     }
// }


//方法装饰器
// function enumerable(value: boolean) {
//     return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//         // target不是方法的原型对象 是最外层类的原型对象 不用再写propType
//         target.name='jilin'//在原型上直接加一个属性
//         console.log(propertyKey)//普通函数名
//         console.log(descriptor)
//         descriptor.enumerable = value;
//     };
// }
// class Greeter {
//     greeting: string;
//     constructor(message: string) {
//         this.greeting = message;
//     }

//     @enumerable(false)
//     greet() {
//         return "Hello, " + this.greeting;
//     }
// }
// console.log(new Greeter('world')c.name)

// function enumerable(value: boolean) {
//     return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//         descriptor.enumerable = value;
//     };
// }
// function log(target:any,methodName:string,des:PropertyDescriptor){//原型对象 方法名 
//     var oldVal = des.value;
//     des.value = function(){
//         console.log('重新赋值新的函数'+methodName+'被调用');
//         return oldVal.apply(this,[...arguments]);
//     }
// }
// class Greeter {
//     greeting: string;
//     constructor(message: string) {
//         this.greeting = message;
//     }
//     @enumerable(false)
//     @log
//     greet(msg:string) {
//         return "Hello, " + this.greeting+msg;
//     }
// }
// new Greeter('world').greet('greet 参数')
// console.log( msg )

//属性装饰器 以下功能没有实现
//成员方法、成员名字
// function DefaultValue(value: string) {
//     return function (target: any, propertyName: string) {
//         target[propertyName] = value;
//     }
// }

// class Hello {
//     @DefaultValue("Hello") 
//     greeting: any;
// }

// console.log('属性装饰器'+new Hello().greeting);

// 参数装饰器
function enumerable(value: boolean) {
    console.log('enum call')
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.enumerable = value;
    };
}
function log(target:any,methodName:string,des:PropertyDescriptor){//原型对象 方法名 
    var oldVal = des.value;
    des.value = function(){
        console.log('重新赋值新的函数'+methodName+'被调用');
        return oldVal.apply(this,[...arguments]);
    }
}
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }

    @enumerable(false)
    @log
    // greet(msg:string,@f2 p1:number,p2:any) {
    //     return "Hello, " + this.greeting+msg;
    // }
    greet(msg:string,p1:number,p2:any) {
        return "Hello, " + this.greeting+msg;
    }
}
new Greeter('world').greet('greet 参数')
console.log( msg )


//类装饰器
// @setStatusBar('red')
export default class Desc extends Component{
    render() {
        return (
            <View>
                <Text>expression </Text>
            </View>
        )
    }
}