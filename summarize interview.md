(1)事件委托
<ul id="ul">
	<li>aaaaaaaa</li>
	<li>bbbbbbbb</li>
	<li>cccccccc</li>
</ul>
window.onload = function(){
	var oUl = document.getElementById("ul");
	var aLi = oUl.getElementsByTagName("li");
/*
这里要用到事件源：event 对象，事件源，不管在哪个事件中，只要你操作的那个元素就是事件源。
ie：window.event.srcElement
标准下:event.target
nodeName:找到元素的标签名
*/
	oUl.onmouseover = function(ev){
		var ev = ev || window.event;
		var target = ev.target || ev.srcElement;
		//alert(target.innerHTML);
		if(target.nodeName.toLowerCase() == "li"){
		target.style.background = "red";
		}
	}
	jq怎么进行时间委托
	$("父元素").on("click","子元素",function(){ //执行代码 })
	以click事件为例：
	
	普通绑定事件：$('.btn1').click(function(){}绑定
	
	on绑定事件：$(document).on('click','.btn2',function(){}绑定


(2)css 伪类元素使用顺序 //love hate
link visit hover active

(3)css选择器的权重与优先级
权重1000	内联样式表                	     style=""  	      
权重100 	ID选择器			      id
权重10  	类，伪类和属性选择器	     class	     	
权重1   	类型选择器和微元素选择器    div p

发散:层叠样式表的层叠代表什么意思
层叠代表了样式的优先级，产生冲突时以优先级高的为准
权重相同时取后面定义的样式
带有上下文关系的选择器比单纯的选择器权重要高

(4)媒体查询
@media mediatype and|not|only (media feature) {
    CSS-Code;
}
@media screen and (max-device-width:960px)
{background:red;}
}
<!--满足条件时，使用mystylesheet.css文件-->
<link rel="stylesheet" media="mediatype and|not|only (media feature)" href="mystylesheet.css">

(5)常用的块级元素和内联元素
块级:<div> <h1> <form> <ol> <ul> <p> <table>
内联:<a> <span> <img> <big> <textarea><input>
可变元素:<button>

(6)css属性overflow属性定义溢出元素内容区的内容会如何处理。
参数是scroll时候，必会出现滚动条。
参数是auto时候，子元素内容大于父元素时出现滚动条。
参数是visible时候，溢出的内容出现在父元素之外。
参数是hidden时候，溢出隐藏。

(7)Difference of RGBA and Opacity
opacity会继承父元素的 opacity 属性，而RGBA设置的元素的后代元素不会继承不透明属性。

(8)link和@import的区别
区别1：link是XHTML标签，除了加载CSS外，还可以定义RSS等其他事务；@import属于CSS范畴，只能加载CSS。
!!!区别2：link引用CSS时，在页面载入时同时加载；@import需要页面网页完全载入以后加载。
区别3：link是XHTML标签，无兼容问题；@import是在CSS2.1提出的，低版本的浏览器不支持。
区别4：link支持使用Javascript控制DOM去改变样式；而@import不支持。

(9)src和href的区别
src是物件的来源地址，是引入的感觉。
href是一种链接前往，是引用的的感觉。

(10)css中clear的作用是什么？
对于CSS的清除浮动(clear)，一定要牢记：这个规则只能影响使用清除的元素本身，不能影响其他元素。
清除浮动:clear:both   overflow:hidden（相当于让父元素贴紧内容)  zoom:1

(11)为什么要初始化CSS样式
因为浏览器的兼容性，因为每个浏览设计时都有自己的特性，没有统一的规定，所以对于某些标签是不同的，不进行浏览器初始化，则会造成浏览器显示页面有微小的差异

(12)浏览器兼容问题
IE6 双边距 bug：在 IE6 下，如果对元素设置了浮动，同时又设置了margin-left或margin-right，margin值会加倍。

box{ float:left; width:10px; margin:0 0 0 10px;}

这种情况之下 IE6 会产生20px的距离
解决方案：在float的标签样式控制中加入 _display:inline; 将其转化为行内属性。

 超链接访问过后 hover 样式就不出现了，被点击访问过的超链接样式不在具有 hover 和 active 

浏览器默认的margin和padding不同
解决方案：加一个全局的 *{margin:0;padding:0;} 来统一。

(13)浮动元素引起的问题和解决办法？
1. 父元素的高度无法被撑开，影响与父元素同级的元素
2. 与浮动元素同级的非浮动元素会跟随其后
3. 若非第一个元素浮动，则该元素之前的元素也需要浮动，否则会影响页面显示的结构

额外标签法，<div style="clear:both;"></div>

parent:after{

    content:".";
    height:0;
    visibility:hidden;
    display:block;
    clear:both;
}
设置 overflow 为 hidden 或者 auto

(14)http状态码有那些？分别代表是什么意思？
1xx: 信息性状态码，表示服务器接收到请求正在处理。
2xx: 成功状态码，表示服务器正确处理完请求。
3xx: 重定向状态码，表示请求的资源位置发生改变，需要重新请求。301永久重定向，302临时重定向。
4xx: 客户端错误状态码，服务器无法处理该请求。 404 not found 5xx: 服务器错误状态码，服务器处理请求出错。

(15)请写一个表格以及对应的CSS，使表格奇数行为白色背景，偶数行为灰色背景，鼠标移上去时为黄色背景
<style>
  .table tr:nth-child(odd){
      background-color:white;
  }
  .table tr:nth-child(even){
      background-color:gray;
  }
  .table tr:hover{
      background-color:yellow;
  }
</style>

(16)target的值：_blank         在新窗口打开链接
                           _self            在当前框架中打开链接
                           _parent       在父框架打开链接
                           _top             在当前窗口打开链接
                   	     framename  在指定框架打开链接

(17)H5新标签
<article>  <aside>  <audio> <canvas> <footer> <hgroup> <mark> <nav> <source>
* 拖拽释放(Drag and drop) API 
  语义化更好的内容标签（header,nav,footer,aside,article,section）
  音频、视频API(audio,video)
  画布(Canvas) API
  地理(Geolocation) API
  本地离线存储 localStorage 长期存储数据，浏览器关闭后数据不丢失；
  sessionStorage 的数据在浏览器关闭后自动删除

(18)背景色彩和文字色彩的HTML代码如下。
bgcolol——背景色彩
text——非可链接文字的色彩
link——可链接文字的色彩
alink——正被点击的可链接文字的色彩
vlink——已经点击(访问)过的可链接文字的色彩

(19)表单元素，设置表单提交方式和路径的属性为method和action.

(20)css3 有哪些新特性
CSS3实现圆角（border-radius），阴影（box-shadow）， 
   对文字加特效（text-shadow、），线性渐变（gradient），旋转（transform） 
   在CSS3中唯一引入的伪元素是::selection. //使被选中文本变红
  媒体查询，多栏布局 

(21)CSS中可以和不可以继承的属性
Bd 不可继承的：display、margin、border、padding、background、height、min-height、max-height、width、min-width、max-width、overflow、position、left、right、top、bottom、z-index、float、clear、table-layout、vertical-align、page-break-after、page-bread-before和unicode-bidi。
所有元素可继承：visibility和cursor。 内联元素可继承：letter-spacing、word-spacing、white-space、line-height、color、font、font-family、font-size、font-style、font-variant、font-weight、text-decoration、text-transform、direction。 终端块状元素可继承：text-indent和text-align。 列表元素可继承：list-style、list-style-type、list-style-position、list-style-image。

(22)动画实现方案，并对比说明各自特点。
css3旋转，transform, transition, animate

(23)rem是CSS3新增的一个相对单位（root em，根em），这个单位引起了广泛关注。这个单位与em有什么区别呢？区别在于使用rem为元素设定字体大小时，仍然是相对大小，但相对的只是HTML根元素。这个单位可谓集相对大小和绝对大小的优点于一身，通过它既可以做到只修改根元素就成比例地调整所有字体大小，又可以避免字体大小逐层复合的连锁反应。目前，除了IE8及更早版本外，所有浏览器均已支持rem。对于不支持它的浏览器，应对方法也很简单，就是多写一个绝对单位的声明。

(24)要使页面的 <a> 标签中，文字超出 80 像素的部分显示为 .....
display:block；
overflow:hidden;
white-space:nowrap;//文本不会换行，文本会在在同一行上继续，直到遇到 <br> 标签为止。
text-overflow:ellipsis;//	显示省略符号来代表被修剪的文本。

(25)input 的 type 属性值列举 3 个
text password radio checkbox button reset submit

(26)AMD 和 CMD 的区别有哪些？
AMD 是 RequireJS 在推广过程中对模块定义的规范化产出。
CMD 是 SeaJS 在推广过程中对模块定义的规范化产出。
1. 对于依赖的模块，AMD 是提前执行，CMD 是延迟执行。
2. CMD 推崇依赖就近，AMD 推崇依赖前置

(27)new操作符具体干了什么呢?
1. 创建一个空对象，并且 this 变量引用该对象，同时还继承了该函数的原型
2. 属性和方法被加入到 this 引用的对象中
3. 新创建的对象由 this 所引用，并且最后隐式的返回 this
   var obj  = {};
   obj.__proto__ = Base.prototype;
   Base.call(obj); 



(28).函数声明和函数表达式之间的区别
(1)函数声明必须有标识符，也就是常说的函数名；函数表达式可以省略函数名。
(2)函数声明是在浏览器准备执行代码的时候执行的。
（记住变量提升，函数声明感觉有点像）
(3)ECMAScript规范中表示，函数声明语句可以出现在全局代码中，或者内嵌在其他函数中，但是不能出现在循环、条件判、或者try/finally以及with语句中。
(4)可以创建一个函数表达式即刻执行。
(function(){
alert('博主的名字是：myvin 。');
})()

(29)减少页面加载时间的方法


(30)实现水平垂直居中
   position: absolute;
        width:100px;
        height: 50px;
        top:50%;
        left:50%;
        margin-left:-50px;
        margin-top:-25px;
        text-align: center;
    
         position: absolute;
            top:50%;
            left:50%;
            width:100%;
            transform:translate(-50%,-50%);
            text-align: center;
    
            display: flex;
           justify-content: center;
           align-items: center;
    
           display:table-cell; //让元素渲染成表格单元格


(32).cookie和session. Local storage


(33)同源策略与跨域(https://earthsplitter.github.io/2017/03/21/%E5%90%8C%E6%BA%90%E6%94%BF%E7%AD%96%E4%B8%8E%E8%B7%A8%E5%9F%9F%E8%AF%A6%E8%A7%A3/)

协议，端口，域名 完全相同

非ajax请求:
1.document.domain
对于只有前缀(二级、三级等域名)不同的网页，可以设置 document.domian 来规避同源策略.具有相同domain的可以互相读取Cookie.

2.fragment identifer
改变url #后边的data 。父窗口可以操作dom改变子窗口src，反之亦然

3.window.name
name是window一个属性，无论window的内容如何变化，他不变
利用iframe，在iframe中指向跨域网站，检测到onload后取回

4.window.postMessage
H5新出的，用于跨域父子窗口通讯，不受同源策略限制
popup.postMessage('Hello World!', 'http://bbb.com');
//子窗口向父窗口发送消息


ajax请求
1.websocket
不实行同源策略
2.JSONP
请求的是js文件
优势在于兼容低级别浏览器，但是只能GET
其设计思路是因为浏览器不对 <script> 标签进行限制，因此可以利用这一点来进行跨域请求。
声明一个回调函数，其参数为要获取(服务器提供的data)，对参数进行操作(比如渲染进DOM)
create一个<script>标签动态加入DOM tree，在src的URL中向服务器传递该函数名
服务器返回一个js脚本文件，将数据包括在url中给的回调函数里，运行回调函数
3.CORS(cross origin resource sharing)
无法兼容低级别浏览器
分为简单请求(GET,POST,HEAD)和非简单请求
在请求头加入origin字段指定源。然后还有其他三个字段
非简单请求，origin还有其他字段，问两次，第一次预检，之后和普通cors一样


(34)请解释 <script>、<script async> 和 <script defer> 的区别。

(35)ES6新特性
箭头函数，类，字符串模板，let const，for of ，genertator，模块，Map Set，Promise

(36)即时通讯消息的几种方式

轮询:定时像ajax发送请求       适用于小型应用
优点：后端程序编写比较容易。 
缺点：请求中有大半是无用，浪费带宽和服务器资源。 

长轮询：客户端像服务端发ajax请求，服务器服务器接到请求后 hold 住连接，直到有新消息才返回响应信息并关闭连接，客户端处理完响应信息后再向服务器发送新的请求。 
优点：在无消息的情况下不会频繁的请求，耗费资小。 
缺点：服务器hold连接会消耗资源，返回数据顺序无保证，难于管理维护。

长连接：在页面里嵌入一个隐蔵iframe，将这个隐蔵 iframe 的 src 属性设为对一个长连接的请求或是采用 xhr 请求，服务器端就能源源不断地往客户端输入数据。 
优点：消息即时到达，不发无用请求；管理起来也相对便。 
缺点：服务器维护一个长连接会增加开销。 

WebSocket是 HTML5 开始提供的一种浏览器与服务器间进行全双工通讯的网络技术。依靠这种技术可以实现客户端和服务器端的长连接，双向实时通信。
特点:
a、事件驱动
b、异步
c、使用 ws 或者 wss 协议的客户端 socket
d、能够实现真正意义上的推送功能

之前的都要主动拉，websocket是双方互相推送

(37)react的优势、diff算法的理解、为什么要单向数据流、组件交互。prop和state的区别

优势:功能组件化，遵守前端的可维护原则

https://zhuanlan.zhihu.com/p/20346379?refer=purerender
diff算法:
传统diff算法 ，remove，add，change挨个遍历每个节点，复杂度为n3

reactdiff算法:
把复杂度降低为n。
1.DOM节点跨层级少  tree diff 
如果节点不存在，直接删除，不会进一步去其它层比较
2.比较组件，不同组件基本不同DOM  component diff
不同类型的组件，存在相似DOM树的机会不多。所以不同组件比较出不同就直接删
3.同一层级的子节点通过id区分 element diff
插入，移动，删除三个操作。

React 通过制定大胆的 diff 策略，将 O(n3) 复杂度的问题转换成 O(n) 复杂度的问题；
React 通过分层求异的策略，对 tree diff 进行算法优化；
React 通过相同类生成相似树形结构，不同类生成不同树形结构的策略，对 component diff 进行算法优化；
React 通过设置唯一 key的策略，对 element diff 进行算法优化；
建议，在开发组件时，保持稳定的 DOM 结构会有助于性能的提升；
建议，在开发过程中，尽量减少类似将最后一个节点移动到列表首部的操作，当节点数量过大或更新操作过于频繁时，在一定程度上会影响 React 的渲染性能。

单向数据流
实现了真正的数据驱动，以数据为核心

props和state的区别:(有点像public和private)
state只能存在于组件内部。props当做数据源，state用来存放状态信息


(38)jq里边load和ready的区别
按加载时间来说。load等所有元素加载完成(图片，渲染)，ready等dom树加载完成就行。
按数量来说，load只能使用一次，后边的会覆盖之前的，ready可以重复使用


(39)http
 增删改查
POST DELETE PUT GET



 (40)闭包的优点缺点
优点：
1. 逻辑连续，当闭包作为另一个函数调用的参数时，避免你脱离当前逻辑而单独编写额外逻辑。
2. 方便调用上下文的局部变量。
3. 加强封装性，第2点的延伸，可以达到对变量的保护作用。
   缺点：
   闭包有一个非常严重的问题，那就是内存浪费问题，这个内存浪费不仅仅因为它常驻内存，更重要的是，对闭包的使用不当会造成无效内存的产生

函数和函数内部能访问到的变量的总和就是闭包。
目的:隐藏变量(间接访问一个变量)
问题:一直不释放变量，造成资源浪费

闭包的场景：
1.使用闭包可以在JavaScript中模拟块级作用域；
2.闭包可以用于在对象中创建私有变量。


(41)cookie和session的区别
cookie存于客户端。
session存于服务器端。
服务器鉴别session需要至少从客户端传来一个session_id，session_id通常存于cookie中，或是url（很少用url，主要涉及安全性和SEO的影响）
所以在工程上session离了cookie基本没法用，但是cookie可以单独使用，不过cookies是明文存储，安全性很低，只使用cookie的话盗取了cookie基本就获取了用户所有权限。
另外浏览器每次访问网页都会带上cookie，如果cookie存储内容过多，会严重占用服务器端带宽，影响性能。
所以如果你是简单或且安全不敏感的应用，可以只使用cookie。否则还是需要cookie配合session。
不过现有语言和框架基本都可以让你简单地使用session，而无需考虑session和cookie的关系。

(42).localstorage，sessionstorage（合起来叫webstorage）
HTML5 提供了两种在客户端存储数据的新方法：
localStorage - 没有时间限制的数据存储
sessionStorage - 针对一个 session 的数据存储
之前，这些都是由 cookie 完成的。但是 cookie 不适合大量数据的存储，因为它们由每个对服务器的请求来传递，这使得 cookie 速度很慢而且效率也不高。
在 HTML5 中，数据不是由每个服务器请求传递的，而是只有在请求时使用数据。它使在不影响网站性能的情况下存储大量数据成为可能。
对于不同的网站，数据存储于不同的区域，并且一个网站只能访问其自身的数据。
HTML5 使用 JavaScript 来存储和访问数据.
localStorage 方法存储的数据没有时间限制。第二天、第二周或下一年之后，数据依然可用。
sessionStorage 方法针对一个 session 进行数据存储。当用户关闭浏览器窗口后，数据会被删除。
都会在浏览器端保存，有大小限制，同源限制
cookie会在请求时发送到服务器，作为会话标识，服务器可修改cookie；web storage不会发送到服务器
cookie有path概念，子路径可以访问父路径cookie，父路径不能访问子路径cookie
有效期：cookie在设置的有效期内有效，默认为浏览器关闭；sessionStorage在窗口关闭前有效，localStorage长期有效，直到用户删除
共享：sessionStorage不能共享，localStorage在同源文档之间共享，cookie在同源且符合path规则的文档之间共享
localStorage的修改会促发其他文档窗口的update事件
cookie有secure属性要求HTTPS传输
浏览器不能保存超过300个cookie，单个服务器不能超过20个，每个cookie不能超过4k。web storage大小支持能达到5M


(43).1+'1'='11'
'1'+1='11'
1+1+'1'='21'
1+'1'+1='111'
如果一个运算数是 Boolean 值，在检查相等性之前，把它转换成数字值。false 转换成 0，true 为 1。
如果一个运算数是字符串，另一个是数字，在检查相等性之前，要尝试把字符串转换成数字。
如果一个运算数是对象，另一个是字符串，在检查相等性之前，要尝试把对象转换成字符串。
如果一个运算数是对象，另一个是数字，在检查相等性之前，要尝试把对象转换成数字。
在比较时，该运算符还遵守下列规则：
值 null 和 undefined 相等。
在检查相等性时，不能把 null 和 undefined 转换成其他值。
如果某个运算数是 NaN，等号将返回 false，非等号将返回 true。
如果两个运算数都是对象，那么比较的是它们的引用值。如果两个运算数指向同一对象，那么等号返回 true，否则两个运算数不等。

(44).[]==true //false
[]==[] //false
[]=={}//false
([])//true
[]==false//true
{}==false//false
null==undefined//true

(45).数组去重
var a=[1,1,3,3,3,5];
(1).var b=new Set(a);
var res=[];
for(var c of b){
res.push(c);
}

(2).var res=[];
for(var i=0;i<a.length;i++){
if(res.indexOf(a[i])==-1){
   res.push(a[i]);
  }
}

(3).需要排序的时候，先排序，然后相邻的一样就删除

(4).for(var i=a.length-1;i>=0;i--){
if(a.indexOf(a[i])==i){
   res.push(a[i]);
  }
}

(5)res=a.filter(function(element,index,self){
     return self.indexOf(element)===index;
});


(46)for...in出来的是index，for....of 出来的是value，不过of好像没法遍历对象


(47)javascript有哪些方法定义对象
1对象字面量： var obj = {};
2构造函数：Object(){}
 var obj = new Object();//== var obj =new Object()  obj=Object
3Object.create(): 
var obj = Object.create(Object.prototype);

(48)js中arguments是对象，不是数组。转数组。
function fn(){
  var arr=Array.prototype.slice.call(arguments,0);
}

(49)区分数组和对象
instanceOf
Object.prototype.toString.call(a)==='[Object Array]'


(50)js原型链
prototype与_proto_的关系
        ①prototype是构造函数的属性. 
        ②_proto_是实例对象的属性

![prototype](/Users/deepglint/Downloads/prototype.png)

(51)gulp webpack底层实现


(52)js基本数据类型(没有Array)
string number boolean null undefined Symbol



(53)css3伪类和伪元素



(54)XSS CSRF
Cross SiteScript
http://blog.csdn.net/ghsau/article/details/17027893
http://www.cnblogs.com/hyddd/archive/2009/04/09/1432744.html

(55)哪些操作会造成内存泄漏
内存泄漏指任何对象在您不再拥有或需要它之后仍然存在。
垃圾回收器定期扫描对象，并计算引用了每个对象的其他对象的数量。如果一个对象的引用数量为 0（没有其他对象引用过该对象），或对该对象的惟一引用是循环的，那么该对象的内存即可回收。

1. setTimeout 的第一个参数使用字符串而非函数的话，会引发内存泄漏。
2. 闭包
3. 控制台日志
4. 循环（在两个对象彼此引用且彼此保留时，就会产生一个循环）

(56)如何判断当前脚本运行在浏览器还是node环境中？
看全局变量。node的全局变量时global，而浏览器时window

(57)js的同源策略
概念：
同源策略是客户端脚本（尤其是Javascript）的重要的安全度量标准。它最早出自Netscape Navigator2.0，其目的是防止某个文档或脚本从多个不同源装载。
这里的同源策略指的是：协议，域名，端口相同，同源策略是一种安全协议，指一段脚本只能读取来自同一来源的窗口和文档的属性。

为什么要有同源限制：
我们举例说明：比如一个黑客程序，他利用Iframe把真正的银行登录页面嵌到他的页面上，当你使用真实的用户名，密码登录时，他的页面就可以通过Javascript读取到你的表单中input中的内容，这样用户名，密码就轻松到手了。

（58）eval是做什么的
1. 它的功能是把对应的字符串解析成JS代码并运行
2. 应该避免使用eval，不安全，非常耗性能（2次，一次解析成js语句，一次执行）

(59)用promise手写ajax
 function get(){
    $.ajax({
    url:'test.php'
    }).then(function(){
    return $.ajax({url:'test1.php'});
    })
 }

(60)手写一个类的继承，并解释一下。new对象的过程发生了什么
function Student(name){         //构造函数
    this.name=name;
}

Student.prototype.hello=function(){
    console.log('say hello');
}

var xiaoming = new Student('xiaoming');


// 原型对象:继承
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

var xiaoming = createStudent('小明');

ES6:
class Student{
    constructor(name){
    this.name = name;
    }
    
    hello(){
     alert('Hello' + this.name)
    }
}

var xiaoming = new Studeng('xiaoming');

class PriStudent extends Student{
    constructor(name,grade){
    super(name);
    this.grade = grade;
    }
    
    myGrade(){
    alert(this.grade);
    }
}


在 JavaScript 中，使用 new 关键字后，意味着做了如下四件事情：
创建一个新的对象，这个对象的类型是 object；
设置这个新的对象的内部、可访问性和[[prototype]]属性为构造函数（指prototype.construtor所指向的构造函数）中设置的；
执行构造函数，当this关键字被提及的时候，使用新创建的对象的属性； 返回新创建的对象（除非构造方法中返回的是‘无原型’）。
在创建新对象成功之后，如果调用一个新对象没有的属性的时候，JavaScript 会延原型链向止逐层查找对应的内容。这类似于传统的‘类继承’。
var obj  = {};
obj.__proto__ = Base.prototype;
Base.call(obj);


(61)对闭包的理解，实现一个暴露内部变量，而且外部可以访问修改的函数（get和set，闭包实现）
function f1(){
    var n=1;
    nAdd = function(){n+=1;}
    function f2(){
    alert(n);
    }
    return f2;
}

var result =f1();
result();
nAdd();
result();


(62)transition animation 的区别

transition是两针的，设置开头结尾。animation是很多帧的
不同点：

1.  触发条件不同。transition通常和hover等事件配合使用，由事件触发。animation则和gif动态图差不多，立即播放。

2.  循环。 animation可以设定循环次数。

3.  精确性。 animation可以设定每一帧的样式和时间。tranistion 只能设定头尾。 animation中可以设置每一帧需要单独变化的样式属性， transition中所有样式属性都要一起变化。

4.  与JavaScript的交互。animation与js的交互不是很紧密。tranistion和js的结合更强大。js设定要变化的样式，transition负责动画效果，天作之合，比之前只能用js时爽太多。

结论：

1. 如果要灵活定制多个帧以及循环，用animation.

2. 如果要简单的from to 效果，用 transition.

3. 如果要使用js灵活设定动画属性，用transition.


(63)AMD和CMD


(64)检验json变化

(65)队列、堆、栈、堆栈的区别？
队列是先进先出：就像一条路，有一个入口和一个出口，先进去的就可以先出去。
而栈就像一个箱子，后放的在上边，所以后进先出。
栈(Stack)是操作系统在建立某个进程时或者线程
堆（Heap)是应用程序在运行的时候请求操作系统分配给自己内存

(66)SEO


(67)低版本浏览器不支持HTML5标签怎么解决？
引入js，js中有解析的代码
<!--[if IE]><script src="style/js/html5.js"></script><![endif]-->

在html中直接插入
for(var i=0; i<tags.length; i++)document.createElement(tags[i]);})(["article","aside","details","figcaption","figure","footer","header","hgroup","nav","section","menu","video"]);</script>
通过插入dom节点相应的标签让他认识

(68)圣杯布局  http://www.jianshu.com/p/f9bcddb0e8b4
写结构的时候要注意，父元素的的三栏务必先写中间盒子。因为中间盒子是要被优先渲染嘛~并且设置其自适应，也就是width:100%。
具体结果见test

(69)内置的方法
Array
indexOf slice(start,end) push pop shift unshift splice sort reverse concat join

String
substring(start,end) indexOf charAt substr(start,length) search(reExp) concat split toLowerCase

Object
constructor hasOwnProperty  toString([Object Object])  valueOf(return Object)

(70)浏览器内置对象
Window      Window 对象表示浏览器中打开的窗口
Navigator   Navigator 对象包含有关浏览器的信息  版本 语言 系统 运行平台
Screen      Screen 对象包含有关客户端显示屏幕的信息。  屏幕高度 亮度 分辨率
History     History 对象包含用户（在浏览器窗口中）访问过的 URL。
Location    Location 对象包含有关当前 URL 的信息。 域名 端口 主机


(71)原生js读取cookie
document.cookie  读 写就是等号后边写
document.cookie.split(';') 把cookie分开
localStorage
localStorage.setItem  .getItem


(72)Ajax Request
原生和superagent
function getSignIn(authsecret) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', Url + 'auth/' + authsecret, false);
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    code here
                }
            }
            xhr.setRequestHeader("Content-Type", "application/json ;charset=utf-8");
            xhr.setRequestHeader("Accept", "application/json");
            xhr.send();
        }

superagent.get(cnodeUrl)
        .set("Cookie",'nforum[UTMPUSERID]=centmaster; nforum[PASSWORD]=3BiOD9Oa3bii6juOdrIr4A%3D%3D; nforum[UTMPKEY]=31287208; nforum[UTMPNUM]=915; Hm_lvt_a2cb7064fdf52fd51306dd6ef855264a=1492694821; Hm_lpvt_a2cb7064fdf52fd51306dd6ef855264a=1492912244')
        .end(function(err, res) {
        code here
        }

(73)http Response header里边都有啥（Request)
Response
Connection:keep-alive
Content-Length:21
Content-Type:text/html;charset=UTF-8
Date:Tue, 09 May 2017 09:26:47 GMT
Set-Cookie:SERVERID=aff739a092fc0d444b

Request
Accept:text/plain, */*; q=0.01
Accept-Encoding:gzip, deflate, sdch, br
Accept-Language:zh-CN,zh;q=0.8,en;q=0.6
Connection:keep-alive
Cookie:
Host:www.nowcoder.com
Referer:https://www.nowcoder.com/discuss/7600?type=0&order=3&pos=4600&page=2
User-Agent:Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36
X-Requested-With:XMLHttpRequest

(74)为什么一定是三次握手？不是两次？为什么要四次挥手？（http://www.jellythink.com/archives/705）
“已失效的连接请求报文段”的产生在这样一种情况下：client发出的第一个连接请求报文段并没有丢失，而是在某个网络结点长时间的滞留了，以致延误到连接释放以后的某个时间才到达server。
本来这是一个早已失效的报文段。但server收到此失效的连接请求报文段后，就误认为是client再次发出的一个新的连接请求。于是就向client发出确认报文段，同意建立连接。假设不采用“三次握手”，那么只要server发出确认，新的连接就建立了。
你听得到吗---我听得到你听得到吗---我听得到，blabla

因为tcp是全双工，接收到FIN意味着没有数据再发来，但是还可以继续发送数据。两对  我不发了--收到


(75)http2


(76)浏览器中输入url后发生了什么（http://www.jianshu.com/p/c1dfc6caa520）
在修改hosts文件后，所有OS中DNS缓存会被清空，而浏览器缓存则不发生变化。safari只要10s缓存，所以一般用safari检查
1. DNS域名解析
   在浏览器DNS缓存中搜索
   在操作系统DNS缓存中搜索
   读取系统hosts文件，查找其中是否有对应的ip
   向本地配置的首选DNS服务器发起域名解析请求

2. 建立TCP连接
   三次握手

3. 发起HTTP请求
   请求方法：
   GET:获取资源
   POST:传输实体主体
   HEAD:获取报文首部
   PUT:传输文件
   DELETE:删除文件
   OPTIONS:询问支持的方法
   TRACE:追踪路径

4. 接受响应结果

状态码：

1**：信息性状态码
2**：成功状态码
200：OK 请求正常处理
204：No Content请求处理成功，但没有资源可返回
206：Partial Content对资源的某一部分的请求
3**：重定向状态码
301：Moved Permanently 永久重定向
302：Found 临时性重定向
304：Not Modified 缓存中读取
4**：客户端错误状态码
400：Bad Request 请求报文中存在语法错误
401：Unauthorized需要有通过Http认证的认证信息
403：Forbidden访问被拒绝
404：Not Found无法找到请求资源
5**：服务器错误状态码
500：Internal Server Error 服务器端在执行时发生错误
503：Service Unavailable 服务器处于超负载或者正在进行停机维护

//401 403之间的区别

5. 浏览器解析html

6. 浏览器布局渲染

(77)常见的原生javascript DOM操作(https://segmentfault.com/a/1190000004076145)
1创建节点
document.createElement('div')
document.createTextNode('chen')
2节点关系
parentNode chlidNodes nextSibling previousSibling
firstChild lastChild
3节点元素关系（只算元素，不算节点）
childern nextElementSibling previousELementSibling
4节点操作
appendChild insertBefore replaceChild removeChild cloneNode(true)
5元素选择
querySelector(返回匹配的第一个元素） querySelectorAll
getElementById getElementByTageName getElementByName getELmentByClassName
6属性操作
setAttribute removeAttribute getAttribute hasAttribute
7事件
addEventListener("click",function,true)第三个参数true表示捕获false表示冒泡
removeEventListener 无法解绑匿名函数
attachEvent detachEvent 支持IE8一下
8获取元素相关计算后的值
getComputedStyle  currentStyle

(78)常见的浏览器兼容问题
1不同浏览器的标签默认的外补丁和内补丁不同
解决方案：CSS里    *{margin:0;padding:0;}
2块属性标签float后，又有横行的margin情况下，在IE6显示margin比设置的大
解决方案：在float的标签样式控制中加入 display:inline;将其转化为行内属性
3图片默认有间距
解决方案：使用float属性为img布局


(79)lazyload实现原理
先吧图片的src设个随便的，然后自定义属性data-src里放真实地址。当检测到视窗滚动到
img[i].src = img[i].getAttribute("data-src");
var seeHeight = document.documentElement.clientHeight; //可见区域高度
var scrollTop = document.documentElement.scrollTop || document.body.scrollTop; //滚动条距离顶部高度
if (img[i].offsetTop < seeHeight + scrollTop)

限制触发频率
到一秒了刷新，没到一秒再delay半秒

(80)移动端性能优化 （优化体验 优化速度
1加载优化
合并js css
使用雪碧图
尽量缓存资源
使用长cache
压缩html css js
首屏加载 按需加载 滚屏加载
增加loading进度条
减少cookie cookie会影响加载速度
避免重定向
异步加载第三方资源
预加载（提前加载下一页）
2css优化
css写在头部，js写在尾部或异步
避免图片和iFrame等空src
避免重设图片大小
display 重绘 回流
值为0时不需要任何单位
不要使用过多fontsize
避免在html中写style
3图片优化
图片不宽于640 大小也要合适
图片尽量避免使用DataURL DataURL图片没有使用图片的压缩算法文件会变大，并且要解码后再渲染，加载慢耗时长
4脚本优化
减少重绘和回流
使用事件代理，避免批量绑定
5渲染优化
HTML使用viewport
<meta name="viewport" content="width=device-width, initial-scale=1">
减少dom节点
尽量使用css3动画
所有影响首屏加载和渲染的代码应在处理逻辑中后置
float在渲染中计算量比较大

(81)回流和重回    回流必将引起重绘，而重绘不一定会引起回流。
Dom树       呈现树  绘制页面
css样式
1. 当render tree中的一部分(或全部)因为元素的规模尺寸，布局，隐藏等改变而需要重新构建。
   这就称为回流(reflow)。每个页面至少需要一次回流，就是在页面第一次加载的时候。在回流的时候，
   浏览器会使渲染树中受到影响的部分失效，并重新构造这部分渲染树，完成回流后，浏览器会重新绘制受影响的部分到屏幕中，该过程成为重绘。
2. 当render tree中的一些元素需要更新属性，而这些属性只是影响元素的外观，风格，而不会影响布局的，比如background-color。则就叫称为重绘。
   回流是结构在改变，重绘是样式在改变


(82)如何解决requirejs的循环依赖问题
a依赖b，b依赖a
二次这依赖的时候，b依赖注入reqrire，用require('a')来引用a。

(83)AMD和CMD的区别有哪些
1.对于依赖的模块，AMD 是提前执行，CMD 是延迟执行。不过 RequireJS 从 2.0 开始，也改成可以延迟执行（根据写法不同，处理方式不同）。CMD 推崇 as lazy as possible.
2. CMD 推崇依赖就近，AMD 推崇依赖前置。
3. AMD 的 API 默认是一个当多个用，CMD 的 API 严格区分，推崇职责单一

(84)form表单当前页面无刷新提交
JS:document.forms[0].target="rfFrame"
把提交的target改成iframe的名字

(85)vue 父子 同级 之间数据怎么流动的

(86)数组和链表的区别
2、数组
优点：
1、可以利用偏移地址来访问元素，效率高，为O(1)；
2、可以使用折半方法查找元素，效率较高；
缺点：
1、空间连续，存储效率低
2、插入和删除元素效率比较低，且比较麻烦；
3、链表
优点：
1、插入和删除元素不需要移动其余元素，效率高，为O(1)；
2、不要求连续空间，空间利用效率高
缺点：
1、不提高随机访问元素的限制
2、查找元素和搜索元素的效率低，最快情况为O(1)，平均情况为O(N)；
因此对于经常插入和删除的操作，数据结构采用链表或者使用二叉搜索树；

(87)伪类和伪元素的区别
伪类 :active :first-child
伪元素:first-letter :before
CSS 伪类用于向某些选择器添加特殊的效果。
CSS 伪元素用于将特殊的效果添加到某些选择器。
:Pseudo-classes
::Pseudo-elements


(88)margin 坍塌
1.当两个对象为上下关系时，而且都具备margin属性时，上面的margin-bottom与下面的margin-top会发生塌陷
当margin-bottom和margin都为正数时，结果为两者之间的最大值
当margin-bottom和margin-top为一正一负时，结果为两者之和。
2.当两个对象为上下包含关系
父元素无填充内容，且没有设置border时，子元素的margin-top不会起作用
父元素设置border属性，子元素的margin-top起作用
父元素有填充内容，子元素的margin-top会起作用，当margin-top小于填充内容时，距离为填充内容的高度

解决办法
1.需要给父div设置：边框，当然可以设置边框为透明;
border:1px solid transparent
或
border-top:1px solid transparent
2.内层元素绝对定位，或者float脱离文档流，或者外层换成padding
3.BFC 还可以清浮动

如何形成BFC 对父元素添加下面效果就可以清浮动
float为 left|right
overflow为 hidden|auto|scroll
display为 table-cell|table-caption|inline-block
position为 absolute|fixed

(89)display 的值和意义
none block  inline(默认，内敛元素，不换行） inline-block
table inherit list-item(元素作为列表显示)  run-in(根据上下文决定块级还是内敛)

position 属性
static  relative(偏移之后，原本占据空间还在占据。并没有脱离文档流)
absolute(脱离文档流，变成块，然后相对于包含块定位) fixed(块相对于整个视窗)

(90)TCP和UDP的区别(http://www.cnblogs.com/bizhu/archive/2012/05/12/2497493.html)
三次握手和四次挥手！！
TCP是一个面向连接的协议，收发数据前必须建立可靠的链接
UDP是非链接协议，也由于不链接，可以一次像多个发送。包的标题很短。
1.基于连接与无连接；
2.对系统资源的要求（TCP较多，UDP少）；
3.UDP程序结构较简单；
4.流模式与数据报模式 ；
5.TCP保证数据正确性，UDP可能丢包，TCP保证数据顺序，UDP不保证。

(91)w3c事件与IE事件的区别(http://caibaojian.com/javascript-stoppropagation-preventdefault.html)
IE事件为事件冒泡，Netspace为事件捕获
防止冒泡  阻止儿子告诉爸爸
w3c的方法是e.stopPropagation()，IE则是使用e.cancelBubble = true
阻止默认行为  直接把行为屏蔽掉
e.preventDefault()  e.returnValue=false

(92)ajax readyState 5个状态的含义
　0 － （未初始化）还没有调用send()方法
　　1 － （载入）已调用send()方法，正在发送请求
　　2 － （载入完成）send()方法执行完成，已经接收到全部响应内容
　　3 － （交互）正在解析响应内容
　　4 － （完成）响应内容解析完成，可以在客户端调用了

(93)实现可以拖动的div

(94)webpack是干嘛的(http://www.jianshu.com/p/01a606c97d76)
模块打包机，一切皆模块
看看源码吧

(95)js设计模式

(96)react vue angular

(97)原生ajax的四个过程
实例化，open，send,onreadystatechange，然后是req,readyState和status。

(98)animation实现动画效果
@-webkit-keyframes anim1{
    0%{
        transform:sacle(1);Cookie 是否会被覆盖，localStorage是否会被覆盖。
    }
    
    100%{
        transform:sacle(0.5)
    }
}
animation 属性是一个简写属性，用于设置六个动画属性：
animation-name
animation-duration
animation-timing-function
animation-delay
animation-iteration-count
animation-direction

transition:width
2s;

i:first-child{
    animation:anim1 0.7s ease-in-out infinite;
    }

(99)网络分层结构。4层，应用层，传输层，网络层和数据链路层。依次是http等应用，TCP/UDP，IP和物理连接。然后又追问了一下ssl在哪一层。ssl是socket，是单独的一层。如果要算应该算传输层。


(100)1.怎么得到一个页面的a标签（就说了getElementByTagName和选择器）
     2.怎么在页面里放置一个很简单的图标，不能用img和background-img
     （说了canvas，或者一些库有icon库，data-icon).

(101)Css实现保持长宽比1:1
用vh vw这种比例单位


(102)原生JS添加class
function hasClass(obj, cls) {
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

function addClass(obj, cls) {
    if (!this.hasClass(obj, cls)) obj.className += " " + cls;
}

function removeClass(obj, cls) {
    if (hasClass(obj, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        obj.className = obj.className.replace(reg, ' ');
    }
}



(103)同源策略限制什么？不限制什么？



(104)PromiseStatus：用于记录Promise对象的三种状态，这三中状态分别是：
     pending：待定状态，Promise对象刚被初始化的状态
     fulfilled：完成状态，承诺被完成了的状态
     rejected：拒绝状态，承诺完成失败的状态


(105)静态属性（怎么继承？）实例属性，原型对象属性  （https://segmentfault.com/q/1010000004196727）
function Myobject(){
    this.instanceProp="456";
    this.instanceMethod=function(){};
}
Myobject.prototype.protoProp="789";
Myobject.prototype.protoMethod=function(){

};

Myobject.staticProp="123";
Myobject.staticMethod =function(){

};

var myobject=new Myobject();

staticProp就是静态属性？
staticMethod就是静态方法
静态是面向对象的编程语言中的叫法吧
函数也是对象，只要声明函数后，就可以往这个函数添加属性和方法

instanceProp就是个实例属性
instanceMethod就是个实例方法
实例对象的属性和方法只在使用new操作符创建以这个函数为构造函数的实例对象后才存在
当函数作为普通函数或一个对象方法调用时，是另外一种情况了

protoProp为原型对象的属性
protoMethod为原型对象的方法
为一个函数的原型对象赋值后就会存在，以这个函数为构造函数创建的实例对象能够访问到原型的属性及方法
JS中通过基于原型(基于对象)的方式来实现对象继承的~~


(106)eval('a')&&eval(a)区别是啥
eval的作用就是转换成js语言。不管加不加都是字符串
eval(2+2) = 4   eval(2+'2')=22
里边并没有变量提升，因为是顺序解析字符串

(107) 如何按照第一个字的拼音排序
var arr = ["张三","李四","王五","阿三"];
    document.write(arr+"");
    arr.sort(function(a,b){
        return a.localeCompare(b);
    });
    document.write(arr);

(108)flex 布局

(109)用函数表达式，没声明函数之前调用会报错吗？
undefined

(110)邮箱的正则表达式


(111)body 三块不包定位

(112)

(113)对象中定义getter setter  //可以做到不让别人设置这个属性，并返回这个属性不能被改变
var book = {
  _year: 2004, edition: 1
};
Object.defineProperty(book, "year", {
  get: function() { return this._year; },
  set: function(newValue) {
    if (newValue > 2004) {
      this._year = newValue; this.edition += newValue - 2004;
    }
  }
});
book.year = 2005;
alert(book.edition); //2

定义多个属性用Object.defineProperties(book,{
year:{}})


(114)判断两个对象是否相等
简单的办法就是 JSON.stringify(obj_a) === JSON.stringify(obj_b);  性能比较差


(115)isArray isFunction isNull
Object.prototype.toString.call(test)=='[Object Array]' //'[Object Function]' '[Object Null]' 简直万能啊,连Undefined都可以
instanceOf也可以判断前两个

(116)await async es7 （http://www.ruanyifeng.com/blog/2015/05/async.html）（http://www.jianshu.com/p/2afb088abd08）
三个并行加载的js，在全部加载完成之后执行init
promise实现出来一个剩下99个就不要了 都出错才退出

async await是为了配合promise才出来的。await只等promise函数


(117).CSS中可以通过哪些属性定义，使得一个DOM元素不显示在浏览器可视范围内？　　

　　最基本的：

　　设置display属性为none，或者设置visibility属性为hidden

　　技巧性：

　　设置宽高为0，设置透明度为0，设置z-index位置在-1000

(118)css中可以让文字在垂直和水平方向上重叠的两个属性是什么？


　　垂直方向：line-height

　　水平方向：letter-spacing

(119)　浏览器的默认字体高都是16px。所以未经调整的浏览器都符合: 1em=16px。那么12px=0.75em, 10px=0.625em。



(120)使用content css
 //一种常见利用伪类清除浮动的代码
 2  .clearfix:after {
 3     content:".";       //这里利用到了content属性
 4     display:block; 
 5     height:0;
 6     visibility:hidden; 
 7     clear:both; }
 8 
 9 .clearfix { 
10     *zoom:1; 
11 }


(121)css禁止的写法

(122)案：

caller是返回一个对函数的引用，该函数调用了当前函数；

callee是返回正在被执行的function函数，也就是所指定的function对象的正文。

那么问题来了？如果一对兔子每月生一对兔子；一对新生兔，从第二个月起就开始生兔子；假定每对兔子都是一雌一雄，试问一对兔子，第n个月能繁殖成多少对兔子？（使用callee完成）

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16caller是返回一个对函数的引用，该函数调用了当前函数；

callee是返回正在被执行的function函数，也就是所指定的function对象的正文。
var result=[];
function fn(n){  //典型的斐波那契数列
   if(n==1){
        return 1;
   }else if(n==2){
           return 1;
   }else{
        if(result[n]){
                return result[n];
        }else{
                //argument.callee()表示fn()
                result[n]=arguments.callee(n-1)+arguments.callee(n-2);
                return result[n];
        }
   }
}

(123)clone任意类型
Object.prototype.clone = function() {
    var o = this.constructor === Array ? [] : {};
    for (var e in this) {
        o[e] = typeof this[e] === "object" ? this[e].clone() : this[e];
    }
    return o;
}

(124)

(125)

(126)

(127)


(128)

(129)


(130)


(131)

(132)

(133)

(134)


(135)


(136)

(137)

(138)

(139)

(140)


























1.以下文档声明正确的是：(C)
A. <!doctype html>	B. <!DOCTYPE HTML 4.01>	C. <!DOCTYPE XHTML 1.0>	D. <!DOCTYPE XHTML 1.0 Frameset>
2.以下均为自封闭标签的是：(C)
A. html,script	B. link,style	C. meta,input	D. img,textarea
3.以下标签包含顺序正确的有：(BC)
A. a>p>span	B. h2>p>a	C. ul>li>div	D. span>a>input
4.定义提供有关页面的元信息的标签是：(A)
A. meta	B. DOCTYPE	C. base	D. var
5.使表单支持文件上传功能，至少需要设置form标签的哪些属性(AC)
A. action	B. name	C. method	D. enctype
6.以下有关样式表定义说法有误的是：(D)
A. 样式表都需要定义选择器	B. 一组样式表可以定义多组属性	C. 每组属性之间需要用;分隔	D. 属性名不能使用字母和-以外的字符
7.以下选择器定义的样式表可作用于相同标签时，权重最高的是：(A)
A. .main p.inner	B. div.main > p	C. body .main p	D. .header + .main p
8.IE6中，以下CSS选择器被支持的有：(AB)
A. span + p	B. ul > li	C. :after	D. .nav.current
9.下列均属于行内标签的一组是：(C)
A. span,p	B. ul,li	C. a,strong	D. div,dl
10.下列哪些position定义时, left属性可以生效：(CD)
A. static	B. relative	C. fixed	D. absolute
11.以下javascript代码片段存在语法错误的是：(D)
A. var fn = function(){};	B. Math.PI * 3	C. var c = 2.toString()	D. '7'-4
12.选择正确的通用JSON格式(非javascript对象)：(CD)
A. {name:"lili"}	B. ["ok",{"id":2}]	C. {"amount":1.44e+10,"owner":null}	D. {"male":true,"friends":["a","b"]}
13.代码 `var a = {a:2}, b; b = a; b.a = ++a.a - 2; 则: a.a的值为： ` (B)
A. 0	B. 1	C. 2	D. 3
14.以下不属于javascript中Array对象方法或属性的有：(B)
A. splice,slice	B. sort,shuffle	C. concat,join	D. shift,unshift
15.以下匹配javascript中变量名的正则表达式是：(C)
A. [object Object]	B. [object Object]	C. [object Object]	D. [object Object]
16.表示请求被客户端缓存的HTTP-code为：(C)
A. 200	B. 404	C. 304	D. 500
17.下列哪项属于GET请求和POST请求的不同点：(AC)
A. 支持form标签表单提交	B. 支持XMLHttpRequest	C. 支持文件上传	D. 支持下载文件
18.对于服务器返回js资源文件正确的MIME为：(D)
A. text/script	B. application/javascript	C. text/javascript	D. script/text
19.UserAgent: Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36 表示以下哪款浏览器(D)
A. Microsoft Windows IE	B. Apple Safari	C. Mozilla Firefox	D. Google Chrome
20.下列哪项信息一般不是浏览器发送给服务器的：(D)
A. cookie	B. user-agent	C. Accept-Encoding	D. Content-Type
21.同源策略, 是最常用的WEB安全策略, 这里的同源包括：(ABC)
A. 协议相同	B. 域名相同	C. 端口相同	D. 请求路径相同
22.下列哪些场景下不需要遵循同源策略(ABC)
A. XMLHttpRequest	B. iframe间js操作	C. WebSocket通信	D. 多媒体(Audio/Video)文件播放
23.下列哪种常用的WEB服务器默认的端口号不含80：(C)
A. Apache	B. IIS	C. Tomcat	D. Nginx
24.以下哪些方式有利于从HTTP请求上对资源加载进行优化(ABCD)
A. 合并过多的零碎文件	B. 拆分过大的资源文件	C. 服务器开启gzip压缩	D. 对资源文件进行压缩
25.以下哪些方式能有效的避免服务器的资源缓存(ABCD)
A. 采用cdn优化资源	B. 使用MD5重命名资源和引入	C. 更新资源时添加必要的时间戳标记	D. 模块化资源, 实现按需异步加载



