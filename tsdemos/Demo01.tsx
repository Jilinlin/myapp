import React,{Component} from 'react';
import {View,Text} from "react-native";
import Desc from './Desc';

//（一）
// 类型断言： 可以确定地指定一个值的类型 对象类型
// 形式：
//（1） <Type>值 在jsx中不能用
//（2） 值 as 类型

//声明接口
// interface Person{
//     name:string;
//     age:number;
// }

// //声明变量
// let user1:Person = {name:'a',age:20}
// // let user2:Person = {} //会报错
// let user2 = {} as Person; //正确
// user2.name = 'liu';
// user2.age = 18;
// // user2.job = 'aaa';//报错

// // 断言用于 联合类型 或者 any任意类型
// function getLength(p1:string|number):number{

//     // return p1.length //报错
//     return (p1 as string).length //使用断言

// }

//（二）
// 类的声明定义 
// 用es5 创建一个Person类，有name和age属性，调用时传入
// function Person1(name:string,age:number){
//     this.name = name;
//     this.age = age;
// }
// let user = new Person1('zhangsan',20);
// console.log(user);
//{"age": 20, "name": "zhangsan"}

// // es6类的形式
// class Person{
//     name:string;
//     age:number;
//     constructor(name:string,age:number){
//         this.name = name;//前面要声明 不然找不到
//         this.age = age;
//     }
//     sayName(){

//     }
// }
// let user = new Person('zhangsan',20);

// //继承
// class Worker extends Person{
//     job:string;
//     constructor(name:string,age:number,job:string){
//         super(name,age);
//         this.job = job;
        
//     }
// }
// let worker = new Worker('zhang',18,'chengxuyuan');


// （三）
// 泛型 静态属性、静态方法
// static修饰的属性是静态属性 不能被访问 是写死的
// class Person{
//     name:string;
//     age:number;
//     constructor(name:string,age:number){
//         this.name = name;//前面要声明 不然找不到
//         this.age = age;
//     }
//     sayName(){

//     }
// }
// let user = new Person('zhangsan',20);

// class Worker extends Person{
//     //静态属性
//     static money:number;
//     static job:string = 'chengxuyuan1';
//     constructor(name:string,age:number,job:string){
//         super(name,age);
        
//     }
// }
// let worker = new Worker('zhang',18,'chengxuyuan');
// console.log(Worker.job);//通过类访问
// Worker.money = 122;

// （四）访问修饰符
// pubilc
// class Person{
//     //访问修饰符
//     protected name:string;
//     age:number;
//     constructor(name:string,age:number){
//         this.name = name;//前面要声明 不然找不到
//         this.age = age;
//     }
//     sayName(){

//     }
// }
// let user = new Person('zhangsan',20);

// class Worker extends Person{
//     //静态属性
//     static money:number;
//     private job:string = 'chengxuyuan1';
//     constructor(name:string,age:number,job:string){
//         super(name,age);
        
//     }
// }
// let worker = new Worker('zhang',18,'chengxuyuan');
// console.log(Worker.job);//通过类访问
// Worker.money = 122;

// （五）泛型
// 泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。
// 使用泛型来创建可重用的组件，一个组件可以支持多种类型的数据
// 1、泛型函数
// function identity<T>(arg: T): T {
//     return arg;
// }
// console.log(identity<string>('params1'));
// console.log(identity<number>(100));

// // 与any的区别
// function getMsg(msg:any):any{
//     return msg;
// }
// console.log(getMsg(1011));

// //传数组
// function getMsg1<U>(msg:U):U[]{
//     return [msg];
// }
// console.log(getMsg1(1011));

//2、泛型接口
// interface GenericIdentityFn<T> {
//     (arg: T): T;
// }

// function identity<T>(arg: T): T {
//     return arg;
// }

// let myIdentity: GenericIdentityFn<number> = identity;

// interface GenericIdentityFn<T> {
//     (arg: T): T;
// }
// let myIdentity1: GenericIdentityFn<number> = function(arg){return arg};
// console.log(myIdentity1(1))

// 3、泛型类
// class AddData<T>{
//     list:T[] = [];
//     add(data:T):T[]{
//         this.list.push(data);
//         return this.list;
//     }
// }
// let data1 = new AddData<number>()
// data1.list.push(1)


// 不是声明 是调用
interface Props{
    name:string;
    data:{
        id:string,
        title:string
    }
}
interface State{
    title:string
}

export default class Demo01 extends Component<Props,State>{
    // constructor(props:any){
    //     super(props);
    // }
    constructor(props:Props){
        super(props);
        this.state={
            title:'100'
        }
    }
    componentDidMount(){
        this.setState({title:'100'})
    }
    
    render(){
        return(
            <View>
                <Text>demo01</Text>
                <Desc/>

            </View>
        )
    }
}