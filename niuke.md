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







