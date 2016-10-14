/**
 * Created by Administrator on 2016/8/31.
 */
function cloneObj(obj) {
  var o;
  if (obj.constructor == Object) {
    o = new obj.constructor();
  } else {
    o = new obj.constructor(obj.valueOf());
  }
  for (var key in obj) {
    if (typeof(obj[key]) == 'object') {
      o[key] = cloneObj(obj[key]);
    } else {
      o[key] = obj[key];
    }
  }
  return o;
}
var obj1 = {
  color: "red",
  say: function () {
    alert("ddd");
  }
}
var obj2 = cloneObj(obj1);
var origin = [1, 2, 3, 4, 5]
//console.log("origon: ", origin);
var deep = cloneObj(origin);
deep[0] = 0;
//console.log("deepcopy: ", origin);
var obj6 = origin;
obj6[0] = 0;
//console.log("equal: ", origin);
//for(var i = 0; i < 3; i ++){
//  setTimeout(function(){
//    console.log(i)
//  }, 0)
//}
function Person(name, sex) {
  this.name = name;
  this.sex = sex;
}
 //定义Person的原型，原型中的属性可以被自定义对象引用
Person.prototype = {
  getName: function() {
    return this.name;
  },
  getSex: function() {
    return this.sex;
  }
}
function Employee(name, sex, employeeID) {
  this.name = name;
  this.sex = sex;
  this.employeeID = employeeID;
}
//var a = new Employee("tom", "man", 123);
//console.log(a.constructor)
//// 将Employee的原型指向Person的一个实例
//// 因为Person的实例可以调用Person原型中的方法, 所以Employee的实例也可以调用Person原型中的所有属性。
//Employee.prototype = new Person();
//
//var zhang = new Employee("ZhangSan", "man", "1234");
//console.log(zhang.getSex()); // "ZhangSan
//function Animal(name){
//  this.name = name;
//}
//Animal.color = "black";
//Animal.prototype.say = function(){
//  console.log("I'm " + this.name);
//};
//var cat = new Animal("cat");
//
//console.log(
//  cat.name, //cat
//  cat.height //undefined
//);
//cat.say(); //I'm cat
//
//console.log(
//  Animal.name, //Animal
//  Animal.color //black
//);
////Animal.say(); //Animal.say is not a function
////继承=====================================
//function Person(sex){
//  this.sex = "man";
//}
//function Jerry(name, age){
//  this.name = name;
//  this.age = age;
//}
//function Tom(name, age){
//  Person.call(this, arguments);
//  this.name = name;
//  this.age = age;
//}
//var tom = new Tom("tom", 12);
//console.log(tom) //Tom { sex: 'man', name: 'tom', age: 12 }
//Jerry.prototype = new Person();
//Jerry.prototype.constructor = Jerry();
//var jerry = new Jerry("Jerry", 12)
//console.log(jerry)  //Person { name: 'Jerry', age: 12 }
//console.log(jerry.sex); //man
//console.log(jerry.constructor == Jerry.prototype.constructor)
//function Person(sex){
//}
//Person.prototype.sex = "man"
//Jerry.prototype = Person.prototype;
//console.log("Jerry.prototype.constructor", Jerry.prototype.constructor) //Person
//Jerry.prototype.constructor = Jerry;                                     //Jerry
//console.log("Jerry.prototype.constructor", Jerry.prototype.constructor)
//var jerry = new Jerry("JERRY", 12);
//console.log(jerry.sex);
//console.log(Person.prototype)
//var tom = new Tom("TOM", "12")
//console.log(tom);

//继承=====================================
//Person.prototype.MaxNumber = 9999;
//Person.__proto__.MinNumber = -9999;
//var will = new Person("Will", 28);
////will->Person.prototype->Object.prototype->null
//console.log(will.MaxNumber); // 9999
//console.log(will.MinNumber); // undefined
//console.log(will.prototype);
//console.log(Person.__proto__);
//console.log(Object.prototype);
//var obj = {
//  name: "tom",
//  age: 15
//}
//console.log(obj.prototype)


//typeof     数字： number    字符串： string  未定义： undified   null,数组，对象: object  function: function
//toString   数字： [object Number]    数组：[object Array] 字符串： [object String]
//           undified: [object Undefined]   null: [object Null]  对象：[object Object]  function: [object Function]


var a = function(){
  return ;
}
function toString(obj){
  return Object.prototype.toString.call(obj);
}
//console.log(typeof(a))

//console.log(2 == [[[2]]])
var a = {
  c: 1,
  d: 2,
  e: 4
}
console.dir(a)
var array = [1, 2, 3, 4, 5];
Array.prototype.max = function () {
  return Math.max.apply(Math, this)
}
Array.prototype.min = function () {
  return Math.min.apply(Math, this)
}
Array.prototype.map = function (fn) {
  var newArr = [];
  for (var i = 0, len = this.length; i < len; i++) {
    newArr[i] = fn.apply(null, [this[i], i, this]);
  }
  return newArr;
}
Array.prototype.forEach = function (fn) {
  for (var i = 0, len = this.length; i < len; i++) {
    fn.apply(this, [this[i], i, this]);
  }
}
Array.prototype.every = function (fn) {
  for (var i = 0, len = this.length; i < len; i++) {
    if (!fn.apply(this, [this[i], i, this])) {
      return false;
    }
  }
  return true;
}
Array.prototype.some = function (fn) {
  for (var i = 0, len = this.length; i < len; i++) {
    if (fn.apply(this, [this[i], i, this])) {
      return true;
    }
  }
  return false;
}
Array.prototype.filter = function(fn){
  var newArr = [];
  for(var i = 0; i < this.length; i ++){
    if (fn.apply(this, [this[i], i, this])) {
      newArr[i] = this[i];
    }
  }
  return newArr;
}

//console.log("array: ", array);
var b = array.map(function (value, key) {
  return value * 2;
})
var b = array.filter(function(value, index){
  return value < 3;
})
//console.log(b);
//console.log("b: ", b);
//console.log(b.max());
//console.log(array.indexOf(1))
//var str = "ssdddddd";
//var c = str.substring(1,2);
////console.log(c)
////console.log(true != null)
//function obj(name, age){
//  this.name = name;
//  this.age = age;
//}
//obj.prototype.sex = "man";
//var tom = new obj("tom", 12);
//for(var i in tom){
//  if (tom.hasOwnProperty(i)){
//    console.log(tom[i])
//
//  }
//}
//function test(){
//  console.log(x);
//}
//var x ;
//
//test();
//var obj = {
//  name: "Tom",
//  age: 12,
//  sex: "man"
//}
//function Person(){
//  console.log(this.name)   //Tom
//}
//Person.apply(obj);

//if(!("a" in window)){
//  var a = 2;
//}
//console.log(a)
//var a = 3;

function remove(arr, item) {
  var newArr = [];
  for (var i = 0, len = arr.length; i < len; i++) {
    if (arr[i] !== item) {
      newArr.push(arr[i])
    }
  }
  return newArr;
}
function getUrlParam(sUrl, sKey) {
  var item = sUrl.split("?")[1].split("&");
  var result = {};
  for (var i = 0, len = item.length; i < len; i++) {
    var key = item[i].split("=")[0],
      value = item[i].split("=")[1];
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(value);
  }
  if(!sKey){
    return result;
  }
  return result[sKey].length > 1? result[sKey]: result[sKey][0];
}
//console.log(getUrlParam("http?key=1&key=21", "key"))
function commonParentNode(oNode1, oNode2) {
  if(oNode1.contains(oNode2)){
    return oNode1;
  }else if(oNode2.contains(oNode1)){
    return oNode2;
  }else{
    return arguments.callee(oNode1.parentNode, oNode2);
  }
}
function namespace(oNamespace, sPackage) {
  var param = sPackage.split(".");
  for(var i = 0, len = param.length; i < len; i ++){
    if(!oNamespace[param[i]]){
      oNamespace[param[i]] = {}
    }
    oNamespace = oNamespace[param[i]];
  }
}
Array.prototype.uniq = function () {
  var arr = this.sort();
  for(var i = 0, len = arr.length; i < len - 1;  ){
    if(arr[i] === arr[i+1]) {
      arr.splice(i, 1);
    }else{
      i ++;
    }
  }
  return arr;
}



function fibonacci(n){
  if(n==1||n==2)
    return 1;
  return fibonacci(n-1)+fibonacci(n-2);
}

function formatDate(oDate, sFormation) {

}
console.log(new Date(1409894060000))
//formatDate(new Date(1409894060000), 'yyyy-MM-dd HH:mm:ss 星期w')
function cssStyle2DomStyle(sName) {
  if(sName[0] == "-"){
    sName = sName.slice(1)
  }
  var item = sName.split("-");
  for(var i = 1, len = item.length; i < len; i ++){
    item[i] = item[i][0].toUpperCase().concat(item[i].slice(1));
  }
  return item.join("");
}
//console.log(cssStyle2DomStyle("-webkit-border-image "))
function count(str) {
  var total = {};
  for(var i = 0, len = str.length; i < len; i ++){
    total[str[i]] = !total[str[i]]? 1: total[str[i]]+1
  }
  return total;
}
function strLength(s, bUnicode255For1) {
  var length = s.length
  if(bUnicode255For1){
    return length;
  }
  for(var i = 0; i < length; i ++){
    if(s.charCodeAt(i) > 255){
      length ++;
    }
  }
  return length;
}
function getRandom(bottom, top){
  var random = Math.floor(Math.random() *(top - bottom + 1) + bottom);
  return random;
}
var arr = [];
for(var i = 0; i < 100; i ++){
  var random = getRandom(0, 10);
  arr.push(random)
}
//console.log(arr)
function f(n){
//insert your code here.... and go crazy!
  var sum = 0;
  for(var i = 0; i <= n; i ++){
    sum += i;
  }
  return sum;
};

//function cli(ele){
//  var ele = document.getElementById("kol");
//  ele.click();
//}
//var timer = setInterval(cli, 1000);
function aaa(){

}
//console.log(typeof(true));
//console.log(typeof(1));
//console.log(typeof("22"));
//console.log(typeof({}));
//console.log(typeof(null));
//console.log(typeof([1]));



function unEqual(arr){
  var newArr = [],
    obj = {};
  for(var i = 0, len = arr.length; i < len; i ++){
    if(!obj[arr[i]]){
      newArr.push(arr[i]);
      obj[arr[i]] = 1;
    }
  }
  return newArr;
}
//console.log("aaa",unEqual([1,1,3,2,4,1,3]))
function test(){
  var x = 5;
}

//console.log(new test().x);
//var ccccc = {
//  name: "tom",
//  age: 12
//}
//var c = Object.create(ccccc);
//c.sex = "man"
//console.log(c.hasOwnProperty("sex"))

