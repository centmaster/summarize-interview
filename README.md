# 面经总结

#### 前言

这个面经的来源一共分为三部分。第一部分是市面上的面经结合自己的知识总结。第二部分就是自己的面经，大大小小面了也有一些了，希望自己也能总结总结造福自己造福后人。最后一部分就是针对自己做过的东西，简历上的东西做的总结，不具有普遍性。当然文件夹里还有一些算法题，平常做前端的也要动动脑嘛。希望自己和大家都能找到满意的工作。



## 第一部分 前端面经总结

### html基础

#### h5标签了解多少

```html
<header><aside><nav><footer><hgroup><canvas><vedio><source><mark>
```



> 语义化的好处
>
> 1去掉样式能让页面清晰的呈现出来
>
> 2屏幕阅读器会按标记读你的网页
>
> 3.有益于SEO，爬虫



### CSS基础

##### 





### Js基础

#### ES6

let const Map Set => generator promise class

##### let/const

###### ES6生命变量的六种方式

var function let const import class

###### let	

1.块级作用域

2.不存在变量提升

```javascript
// var 的情况
console.log(foo); // 输出undefined
var foo = 2;

// let 的情况
console.log(bar); // 报错ReferenceError
let bar = 2;
```

3.暂时性死区

```javascript
var tmp = 123;

if (true) {
  tmp = 'abc'; // ReferenceError
  let tmp;
}
```

4.在同一个块级作用域中不允许重复声明

###### const

声明一个只读常量，一旦声明不能改变。声明也必须带着值

实质是，对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指针，`const`只能保证这个指针是固定的，至于它指向的数据结构是不是可变的，就完全不能控制了。也就是说，可以再往对象里填东西，但不能重复声明。

const同时也满足，块级作用域，变量不提升，暂时性死区。

###### 块级作用域

在ES6浏览器中，允许块级作用域中声明函数

因为外边看不到块里边的变量，所以提案，do用来得到块级作用域中的变量

```javascript
let x = do {
  let t = f();
  t * t + 1;
};
```

###### 顶层对象

一般我们顶层对象和全局是不区分的。let和const声明的全局对象不属于顶层对象（window，global）



#### for in 和for of的区别是什么

for in 遍历的是索引. 还可以遍历对象，但是可能会遍历到继承的元素方法，使用hasOwnProperty（）判断

for of遍历的是对应的元素值

遍历对象新出的 Object.keys() Object.values. Object.entires()



#### 闭包 ！（这个真的很重要）

http://www.jianshu.com/p/21a16d44f150

###### 什么是闭包？

利用块状作用域把外部的变量hold住

###### 闭包与setTimeout

改变函数使得输出12345

```javascript
for (var i=1; i<=5; i++) { 
    setTimeout( function timer() {
        console.log(i);
    }, i*1000 );
}
```

answer

```javascript
for (var i=1; i<=5; i++) { 
	(setTimeout(function timer(){
      console.log(i);
	},i*1000)
     })(i)
}
for(var i=1;i<5;i++){
  setTimeout((function timer(){
    return function(i){
      console.log(i)
    })(i)
  },i*1000)
}
```

#### 原型链与构造对象

##### 原型继承

```javascript
// 原型对象:
var Student = {
    name: 'Robot',
    height: 1.2,
    run: function () {
        console.log(this.name + ' is running...');
    }
};

function createStudent(name) {
    // 基于Student原型创建一个新对象:
    var s = Object.create(Student);
    // 初始化新对象:
    s.name = name;
    return s;
}


//构造函数
function Student(name) {
    this.name = name;
    this.hello = function () {
        alert('Hello, ' + this.name + '!');
    }
}
var xiaoming = new Student('小明'); //一定要有new，创建新的对象，默认返回this
xiaoming.name; // '小明'
xiaoming.hello(); // Hello, 小明!
```

####this的使用

##### this的误区

指向自身，this指向函数的作用域。 //this取决于调用位置

##### this对象绑定规则（箭头函数不满足）

new>call或者apply>上下文对象调用>严格模式下绑定undefined否则global

```javascript
var p= {
   data:{
      flag: true
   },
   init: ()=>{
     console.log(this.data.flag)
   }
}			 //箭头函数没有自己的this，他的this值继承自外部。而这里就是继承p的，p的上下文this是全局				window对象了，所以会报						undefined的错误
p.init()     //结果是undefined，如果是普通函数结果是true
```



#### 箭头函数

##### 箭头函数有几个使用注意点。

（1）函数体内的`this`对象，就是定义时所在的对象，而不是使用时所在的对象。

（2）不可以当作构造函数，也就是说，不可以使用`new`命令，否则会抛出一个错误。

（3）不可以使用`arguments`对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。

（4）不可以使用`yield`命令，因此箭头函数不能用作 Generator 函数。

```javascript
function foo() {
  setTimeout(() => {
    console.log('id:', this.id);
  }, 100);
}

var id = 21;

foo.call({ id: 42 });
// id: 42
```



#### Promise

##### 基本用法

```javascript
var promise = new Promise(function(resolve, reject) {
  // ... some code
  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);		//catch和then都返回的是一个新的promise对象
  }
});		//then中第一个func为resolve的回调，第二个参数可选，catch更好，因为也可捕获之前then中的错误
promise.then().catch. or promise.then(()=>{},()=>{});
```

##### 其他一些方法

###### Promise.all()

```javascript
var p = Promise.all([p1, p2, p3]);
```

当三个都resolve的时候才会继续往下走，有一个reject了就直接reject了。返回的是一个数组，方法参数可以不是数组

###### Promise.race()

```
var p = Promise.race([p1, p2, p3]);
```

只要`p1`、`p2`、`p3`之中有一个实例率先改变状态，`p`的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给`p`的回调函数。会先把p1包装成Promise

###### Promise.resolve()

```javascript
var jsPromise = Promise.resolve($.ajax('/whatever.json'));
```

有时需要将现有对象转为Promise对象，`Promise.resolve`方法就起到这个作用

###### Promise.reject()

###### Promise.done()

Promise对象的回调链，不管以`then`方法或`catch`方法结尾，要是最后一个方法抛出错误，都有可能无法捕捉到（因为Promise内部的错误不会冒泡到全局）。因此，我们可以提供一个`done`方法，总是处于回调链的尾端，保证抛出任何可能出现的错误。

```javascript
asyncFunc()
  .then(f1)
  .catch(r1)
  .then(f2)
  .done();
```

它的实现代码相当简单。

```javascript
Promise.prototype.done = function (onFulfilled, onRejected) {
  this.then(onFulfilled, onRejected)
    .catch(function (reason) {
      // 抛出一个全局错误
      setTimeout(() => { throw reason }, 0);
    });
};
```

从上面代码可见，`done`方法的使用，可以像`then`方法那样用，提供`Fulfilled`和`Rejected`状态的回调函数，也可以不提供任何参数。但不管怎样，`done`都会捕捉到任何可能出现的错误，并向全局抛出。

###### Promise.finally()

`finally`方法用于指定不管Promise对象最后状态如何，都会执行的操作。它与`done`方法的最大区别，它接受一个普通的回调函数作为参数，该函数不管怎样都必须执行。

### vue

#### vue的生命周期

beforecreate    created

beforemounted	mounted

beforeupdate	updated

activated	deactivated

beforedestory	destroyed

#### vue的生命周期各阶段都做了什么？

`beforeCreate` 实例创建前：这个阶段实例的data、methods是读不到的
`created` 实例创建后：这个阶段已经完成了数据观测(data observer)，属性和方法的运算， watch/event 事件回调。mount挂载阶段还没开始，$el 属性目前不可见，数据并没有在DOM元素上进行渲染
`beforeMount`：在挂载开始之前被调用：相关的 render 函数首次被调用。
`mounted`：el选项的DOM节点 被新创建的 vm.$el 替换，并挂载到实例上去之后调用此生命周期函数。此时实例的数据在DOM节点上进行渲染
`beforeUpdate`：数据更新时调用，但不进行DOM重新渲染，在数据更新时DOM没渲染前可以在这个生命函数里进行状态处理
`updated`：这个状态下数据更新并且DOM重新渲染，当这个生命周期函数被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。当实例每次进行数据更新时updated都会执行
`beforeDestory`：实例销毁之前调用。
`destroyed`：Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。	

#### vue生命周期在真实场景下的业务应用

`created`：进行ajax请求异步数据的获取、初始化数据
`mounted`：挂载元素内dom节点的获取
`nextTick`：针对单一事件更新数据后立即操作dom
`updated`：任何数据的更新，如果要做统一的业务逻辑处理
`watch`：监听具体数据变化，并做相应的处理



#### vue和react的区别

###### 共同点

都是组件化

提供合理的钩子函数

ajax，route等功能都不在核心包里，而是以插件的方式加载

使用 Virtual DOM

###### 区别

React依赖Virtual DOM,而Vue.js使用的是DOM模板

当组件状态发生变化的时候，react树会自上而下发生变化。需要通过shouldComponentUpdate方法避免某些组件渲染，然而这个时候也要保证props是这个子组件根。vue的渲染是自动追踪的。

vue有scope 自己的css作用域，相互之间不影响

ReactNative  vs  Vue+Veex 阿里，跨平台框架



#### vue中socpe css怎么实现的

这个可选 `scoped` 属性会自动添加一个唯一的属性（比如 `data-v-21e5b78`）为组件内 CSS 指定作用域，编译的时候 `.list-container:hover` 会被编译成类似 `.list-container[data-v-21e5b78]:hover`。



#### vue-router怎么实现的（history）

`vue-router` 默认 hash 模式 —— 使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。

#### vuex是为什么出现的

子组建之间通讯，还要通过父组件非常麻烦

我们经常会采用父子组件直接引用或者通过事件来变更和同步状态的多份拷贝

### 构建工具

#### webpack

具体请查简书   http://www.jianshu.com/p/b83a251d53db

```javascript
// webpack.config.js

var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devtool: "source-map", 					//配置生成 Source Maps 的选项  将编译前后代码每行一												一对应起来，有四个不同轻重的选项。
    entry: __dirname + "/app/main.js", 		//入口文件路径
    output: {
        path: __dirname + "/build/", 		//存放打包后文件的地方路径
        filename: "[name]-[hash].js" 		//打包后的文件名
    },
    devServer: {							//构建本地服务器
        port: "9000",
        inline: true,						//改变文件自动刷新
        historyApiFallback: true,
        hot: true
    },
    module: {								//loader进行文件预处理，允许js之外所有静态自由
        loaders: [{							//匹配不同文件进行解析
            test: /\.json$/,
            loader: "json-loader"
        }, {
            test: /\.js$/,
            exclude: /node_modules/, 		//编译打包时需要排除 node_modules 文件夹
            loader: "babel-loader"			//.babelrc将babel配置写到这个文件中
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",						
                use: "css-loader?modules!postcss-loader"		
              								//cssmodules运用模块
           									//postcss 解析scss,less之类的 
              								//css-loader 使你能够使用类似 @import 和 													url(...) 的方法实现 require() 的功能
              								//style-loader 将所有的计算后的样式加入页面中
            })
        }]
    },
    plugins: [								//插件
        new webpack.BannerPlugin("Copyright Flying Unicorns inc."), 
      										//在这个数组中new一个实例就可以了
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html" //new一个插件的实例，并传入相关的参数
        }),
        new webpack.HotModuleReplacementPlugin(), //热加载插件
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin("[name]-[hash].css")		
    ]
}
```







#### webpack vs gulp&grunt

前者的工作流程是，将整个项目作为一个主体，通过给定的主文件，根据整个文件开始找到项目的所有依赖。然后通过loaders处理，最后打包成一个浏览器可以识别的js文件。

后者就有点像小孩。在配置文件中给出需要对文件的各种操作命令，然后他会帮你操作完成。

#### vue-cli webpack配置分析





## 第二部分 自己面过的经

http://exam.webfuture.cn/index.html  









## 第三部分 计算机网络

#### http状态码

1xx：信息性状态码，表示服务器接受请求正在处理

2xx：成功状态码，表示服务器正确处理完请求

3xx：重定向状态码，表示请求资源位置发生改变，需要重新重定向

4xx：服务器端错误状态码，服务器无法处理该请求

5xx：服务器错误状态码，服务器处理请求错误

> 面试官问了问题，是直接返回404好还是返回200在response的body中返回404比较好



|      | 1**：信息性状态码                               |
| ---- | ---------------------------------------- |
|      | 2**：成功状态码                                |
|      | 200：OK 请求正常处理                            |
|      | 204：No Content请求处理成功，但没有资源可返回            |
|      | 206：Partial Content对资源的某一部分的请求           |
|      | 3**：重定向状态码                               |
|      | 301：Moved Permanently 永久重定向              |
|      | 302：Found 临时性重定向                         |
|      | 304：Not Modified 缓存中读取                   |
|      | 4**：客户端错误状态码                             |
|      | 400：Bad Request 请求报文中存在语法错误              |
|      | 401：Unauthorized需要有通过Http认证的认证信息         |
|      | 403：Forbidden访问被拒绝                       |
|      | 404：Not Found无法找到请求资源                    |
|      | 5**：服务器错误状态码                             |
|      | 500：Internal Server Error 服务器端在执行时发生错误   |
|      | 503：Service Unavailable 服务器处于超负载或者正在进行停机维护 |

####  计算机网络---自顶向下总结(http://www.jianshu.com/p/48f2bebaeb40)

##### 应用层   进程与计算机网络间的接口

###### 协议

http协议（web） ：无状态，乱序是TCP考虑的事，拉协议

FTP协议（文件传输）

SMTP协议（电子邮件）：推协议

###### DNS

主机名—>IP地址转换的目录服务

通常从请求主机到本地DNS服务器的查询是递归的，其余的查询是迭代的

###### 攻击

DDos：向处理如.com域的域名服务器发送大量DNS请求，使得大部分合法请求无法获得响应

DNS反射：请求中冒充目标主机源地址，大量请求DNS服务器，DNS就大量向源地址主机发送回答，淹没目标主机

##### 传输层 为应用程序提供正确的应用级进程之间的交付服务

###### 协议

TCP：有连接的，需要握手包到底的。稳定但是大。HTTP FTP    head:20bit

TCP does error checking and error recovery. Erroneous packets are retransmitted from the source to the destination.

UDP：										DNS,VOIP.   	        8bit	

UDP does error checking but simply discards erroneous packets. Error recovery is not attempted.

##### 网络层

仅在网络层提供连接服务的计算机网络成为虚电路；仅在网络层提供无连接服务的计算机网络称为数据报网络



##### 链路层



##### 物理层



#### http报文格式



## 第四部分 数据结构和算法

### 数据结构

#### 栈的实现

```javascript
	function stack(){
      this.dataStore=[];
      this.top=0;
      this.push=push;
      this.pop=pop;
      this.peek=peek;
	}

	function push(element){
      this.dataStore[top++]=element;
	}
	function pop(element){
      return this.dataStore[--this.top];
	}
	function peek(){
      return this.dataStore[this.top-1];
	}
	function length(){
      return this.top;
	}
	function clear(){
      this.top=0;
	}
```

#### 队列的实现

```javascript
	function Queue(){
      this.dataStore=[];
      this.enqueue=enqueue;
      this.dequeue=dequeue;
      this.front=front;
      this.back=back;
      this.toString=toString;
      this.empty=empty;
    }
	function enqueue(element){
      this.dataStore.push(element);
	}
	function dequeue(element){
      this.dataStore.shift();
	}
	function front(){
      return this.dataStore[0];
	}
	function back(){
      return this.dataStore[this.dataStore.length-1];
	}
	function toString(){
      var resstr='';
      for(var i=0;i<this.dataStore.length;i++){
        resstr+=this.dataStore[i]+'/n';
      }
      return resstr;
	}
	function empty(){
      return this.dataStore.length==0?true:false;
	}
	
```

#### 链表的实现

```javascript
	function Node(element){
      this.element=element;
      this.next=null;
	}
	function llist(){
      this.head=new Node('head');
      this.find=find;
      this.insert=insert;
      this.remove=remove;
      this.display=display;
	}
	function find(item){
      var curNode=this.head;
      while(curNode!=item){
        curNode=curNode.next;
      }
      return curNode;
	}
	function insert(newELement,item){
      var newNode=new Node(newElment);
      var current=this.find(item);
      newNode.next=current.next;
      current.next=newNode;
	}
	function display(){
      var curNode=this.head;
      while(!(curNode.next==null)){
        print(curNode.next.element);
        curNode=curNode.next;
      }
	}
	function findprevious(item){
		var curNode=this.head;
      	while(!(curNode.next==null)&&(curNode.next.element!=item)){
          curNode=curNode.next;
      	}
      	return curNode;
    }
	function remove(item){
      var previous=findprevious(item);
      if(!(previous.next.next==null)){
        previous.next=previous.next.next;
      }
	}

	//双向链表
	function Node(element){
      this.element=element;
      this.next=null;
      this.previous=null;
	}
	function LList(){
      this.head=new Node('head');
      this.find=find;
      this.insert=insert;
      this.display=display;
      this.remove=remove;
      this.findlast=findlast;
      this.dispReverse=dispReverse;
	}
	funciton dispReverse(){
      var curNode=this.head;
      curNode=this.findLast();
      while(!(curNode==null)){
        print(curNode.element);
        curNode=curNode.previous;
      }
	}
	function findLast(){
      var curNode=this.head;
      while(!(curNode.next==null)){
        curNode=curNode.next;
      }
      return curNode;
	}
	

	
```

### 算法

#### 数组去重

```javascript
		var array = [1,3,4,4,5,6];
        function filt(array){
          var result=[];
          var hash = {};
          array.forEach(function(item){
            if(!hash[item]){
              result.push(item);
              hash[item]=true;
            }
          })
          console.log(result);
        }
		filt();
```





## 第五部分 简历和面试技巧总结

#### 反问面试官的最后一个问题

###### 这次面试我还有哪些需要提高的地方

###### 在公司里的部门，做什么



#### 

##### 

