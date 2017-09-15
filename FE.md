

# 前端技术积累

[TOC]

#### 前言

这个面经的来源一共分为三部分。第一部分是市面上的面经结合自己的知识总结。第二部分就是自己的面经，大大小小面了也有一些了，希望自己也能总结总结造福自己造福后人。最后一部分就是针对自己做过的东西，简历上的东西做的总结，不具有普遍性。当然文件夹里还有一些算法题，平常做前端的也要动动脑嘛。希望自己和大家都能找到满意的工作。



## 第一部分 前端面经总结

大赞！https://github.com/paddingme/Front-end-Web-Development-Interview-Question/tree/master/%E5%89%8D%E7%AB%AF%E8%AF%95%E9%A2%98

### html基础

##### SEO

###### html

避免空链接（因为还是会请）

避免深层级嵌套

显示设置宽高

避免脚本阻塞加载

###### css

避免使用@import

###### JS

事件代理

避免频繁的dom操作

###### 网络

减少http请求次数

减少dns查找次数（缓存三十分钟，可以分块）

减少重定向

首屏加载，滚屏加载

能使用GET就用GET

使用外部js，css

减少cookie

##### GET POST

| &       | get        | post   |
| ------- | ---------- | ------ |
| 后退/刷新   | 无害         | 请求重新提交 |
| 书签      | 可做书签       | 不可做    |
| 缓存      | 可被缓存       | 不能被缓存  |
| 历史      | 保留在浏览器记录里  | 不保留    |
| 对数据长度限制 | 限制（2048字符） | 不限制    |
| 安全性     | url中暴露数据   | 相对安全   |
| 可见性     | url中可见     | 不可见    |

你要给GET加上request body，给POST带上url参数，技术上是完全行的通的。

业界不成文的规定是，(大多数)浏览器通常都会限制url长度在2K个字节，而(大多数)服务器最多处理64K大小的url。超过的部分，恕不处理。如果你用GET服务，在request body偷偷藏了数据，不同服务器的处理方式也是不同的，有些服务器会帮你卸货，读出数据，有些服务器直接忽略，所以，虽然GET可以带request body，也不能保证一定能被接收到

GET和POST还有一个重大区别，简单的说：

**GET产生一个TCP数据包;POST产生两个TCP数据包。**

对于GET方式的请求，浏览器会把http header和data一并发送出去，服务器响应200(返回数据);

而对于POST，浏览器先发送header，服务器响应100 continue，浏览器再发送data，服务器响应200 ok(返回数据)。

##### What's the difference between HTML and XHTML?

XHTML is not so much different from HTML 4.01 standard. The major differences are:

- XHTML elements must be **properly nested**.
- XHTML elements must always be **closed**.
- XHTML elements must be in **lowercase**.
- XHTML documents must have **one root element**.

##### XML到底是啥，和html有啥区别

一种语言的标准，比html更底层吧。XML是爹，主要是为了数据格式化，和json很像

##### XPath又是啥，干了什么

XPath stands for XML Path Language.It uses a non-XML syntax to provide a flexible way of addressing (pointing to) different parts of an [XML](https://developer.mozilla.org/en-US/docs/XML) document.

XPath is mainly used in一种xml语言-- [XSLT](https://developer.mozilla.org/en-US/docs/XSLT), but can also be used as a much more powerful way of navigating through the [DOM](https://developer.mozilla.org/en-US/docs/DOM) of any XML-like language document, such as HTML and [XUL](https://developer.mozilla.org/en-US/docs/XUL), instead of relying on the [`document.getElementById`](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById) method, the [`element.childNodes`](https://developer.mozilla.org/en-US/docs/Web/API/Element/childNodes) properties, and other DOM Core features.

document.evaluate

##### 怪异模式和标准模式最大的区别是什么

盒模型，怪异模式按IE那种border里边都算宽高。

##### 如何判断 一个对象是dom对象

Obj instanceof HTMLElement   //HTMLCollection    HTMLDivElement.    nodeType

##### h5标签了解多少

```html
<header><aside><nav><footer><hgroup><canvas><vedio><source><mark>
```



> 语义化的好处
>
> 1去掉样式能让页面清晰的呈现出来
>
> 2屏幕阅读器会按标记读你的网页／移动端友好
>
> 3.有益于SEO，爬虫
>
> 4.方便同事共同开发

##### 浏览器内核

Gecko:Firefox

Presto:opera

Webkit:chrome,safari

Trident:IE

区分浏览器—navigator.userAgent

判断是否是IE-window.ActiveXObject

##### NodeList 和 HTMLCollection之间的关系？

主要不同在于HTMLCollection是元素集合而NodeList是节点集合（即可以包含元素，也可以包含文本节点）。所以 node.childNodes 返回 NodeList，而 node.children 和 node.getElementsByXXX 返回 HTMLCollection 

##### rem实现自适应

相对于根元素决定字体大小。

##### 常见兼容性问题

```
* 上下margin重合问题
ie和ff都存在，相邻的两个div的margin-left和margin-right不会重合，但是margin-top和margin-bottom却会发生重合。
解决方法，养成良好的代码编写习惯，同时采用margin-top或者同时采用margin-bottom。
```

##### DOM操作——怎样添加、移除、移动、复制、创建和查找节点

```
（1）创建新节点

      createDocumentFragment()    //创建一个DOM片段

      createElement()   //创建一个具体的元素

      createTextNode()   //创建一个文本节点

（2）添加、移除、替换、插入

      appendChild()

      removeChild()

      replaceChild()

      insertBefore() //在已有的子节点前插入一个新的子节点

（3）查找

      getElementsByTagName()    //通过标签名称

      getElementsByName()    //通过元素的Name属性的值(IE容错能力较强，会得到一个数组，其中包括id等于name值的)

      getElementById()    //通过元素Id，唯一性
```

##### document.write和 innerHTML的区别

```
document.write只能重绘整个页面

innerHTML可以重绘页面的一部分
```

##### DOM操作插入节点

```javascript
(() => {
    const ndContainer = document.getElementById('js-list');
    if (!ndContainer) {
        return;
    }

    const total = 30000;
    const batchSize = 4; // 每批插入的节点次数，越大越卡
    const batchCount = total / batchSize; // 需要批量处理多少次
    let batchDone = 0;  // 已经完成的批处理个数

    function appendItems() {
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < batchSize; i++) {
            const ndItem = document.createElement('li');
            ndItem.innerText = (batchDone * batchSize) + i + 1;
            fragment.appendChild(ndItem);
        }

        // 每次批处理只修改 1 次 DOM
        ndContainer.appendChild(fragment);

        batchDone += 1;
        doBatchAppend();
    }

    function doBatchAppend() {
        if (batchDone < batchCount) {
            window.requestAnimationFrame(appendItems);
        }
    }

    // kickoff
    doBatchAppend();

    ndContainer.addEventListener('click', function (e) {
        const target = e.target;
        if (target.tagName === 'LI') {
            alert(target.innerHTML);
        }
    });
})();
```

###### 知识点

DocumentFragment:文档碎片，虚拟的dom，优化了多次插入。

requestAnimationFrame:因为电脑屏幕是60帧，setInterval这些16.7并不好。

- 浏览器可以优化并行的动画动作，更合理的重新排列动作序列，并把能够合并的动作放在一个渲染周期内完成，从而呈现出更流畅的动画效果。
- 在一个浏览器标签页里运行一个动画，当这个标签页不可见时，浏览器会暂停它，这会减少CPU，内存的压力，节省电池电量。

如果想自己设置频率：

```javascript
var fps = 15;
function draw() {
    setTimeout(function() {
        requestAnimationFrame(draw);
        // Drawing code goes here
    }, 1000 / fps);
}
```

### CSS基础

##### Overflow :hidden 是否形成新的块级格式化上下文？

```
<div>
    <p>I am floated</p>
    <p>So am I</p>
</div>
```

```
div {overflow: hidden;}
p {float: left;}
```

A：会形成。

会触发BFC的条件有：

- float的值不为none。
- overflow的值不为visible。
- display的值为table-cell, table-caption, inline-block 中的任何一个。
- position的值不为relative 和static。



####flex的使用

##### 容器属性

Main axis:主轴线 从左到右 Cross axis:交叉轴线 从上到下

```javascript
flex-direction: row | row-reverse | column | column-reverse; 
```

```javascript
flex-wrap: nowrap | wrap | wrap-reverse;
```

```javascript
justify-content: flex-start | flex-end | center | space-between | space-around;主轴对齐方式
```

```javascript
align-items: flex-start | flex-end | center | baseline | stretch;
```

```javascript
align-content: flex-start | flex-end | center | space-between | space-around | stretch;
定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用
```

##### 项目属性

```javascript
order: <integer>;   数值越小，排列越靠前，默认为0
```

```javascript
flex-grow: <number>; 默认为0，即如果存在剩余空间，也不放大
```

```javascript
flex-shrink: <number>; 缩小比例，默认为1，即如果空间不足，该项目将缩小。如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小
```

```javascript
flex-basis: <length> | auto;  定义了在分配多余空间之前，项目占据的主轴空间。就是设宽度
```

```javascript
flex: none|[ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
            该属性有两个快捷值：auto (1 1 auto) 和 none (0 0 auto)。
```

```javascript
align-self: auto | flex-start | flex-end | center | baseline | stretch;
允许单个项目有与其他项目不一样的对齐方式
```

##### 实战

###### 骰子实现1239排列

```css
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-content: space-between;
```

###### 圣杯布局

```html
<body class="HolyGrail">
  <header>...</header>
  <div class="HolyGrail-body">
    <main class="HolyGrail-content">...</main>
    <nav class="HolyGrail-nav">...</nav>
    <aside class="HolyGrail-ads">...</aside>
  </div>
  <footer>...</footer>
</body>
```

```css
.HolyGrail {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

header,
footer {
  flex: 1;
}

.HolyGrail-body {
  display: flex;
  flex: 1;
}

.HolyGrail-content {
  flex: 1;
}

.HolyGrail-nav, .HolyGrail-ads {
  /* 两个边栏的宽度设为12em */
  flex: 0 0 12em;
}

.HolyGrail-nav {
  /* 导航放到最左边 */
  order: -1;
}
```

###### 固定低栏

```html
<body class="Site">
  <header>...</header>
  <main class="Site-content">...</main>
  <footer>...</footer>
</body>
```

```css
.Site {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.Site-content {
  flex: 1;
}
```



##### css选择器

| [*element*,*element*](http://www.w3school.com.cn/cssref/selector_element_comma.asp) | div,p           | 选择所有 <div> 元素和所有 <p> 元素。        | 1    |
| ---------------------------------------- | --------------- | ------------------------------- | ---- |
| [*element* *element*](http://www.w3school.com.cn/cssref/selector_element_element.asp) | div p           | 选择 <div> 元素内部的所有 <p> 元素。        | 1    |
| [*element*>*element*](http://www.w3school.com.cn/cssref/selector_element_gt.asp) | div>p           | 选择父元素为 <div> 元素的所有 <p> 元素。      | 2    |
| [*element*+*element*](http://www.w3school.com.cn/cssref/selector_element_plus.asp) | div+p           | 选择紧接在 <div> 元素之后的所有 <p> 元素。     | 2    |
| [[*attribute*\]](http://www.w3school.com.cn/cssref/selector_attribute.asp) | [target]        | 选择带有 target 属性所有元素。             | 2    |
| [[*attribute*=*value*\]](http://www.w3school.com.cn/cssref/selector_attribute_value.asp) | [target=_blank] | 选择 target="_blank" 的所有元素。       | 2    |
| [[*attribute*~=*value*\]](http://www.w3school.com.cn/cssref/selector_attribute_value_contain.asp) | [title~=flower] | 选择 title 属性包含单词 "flower" 的所有元素。 | 2    |
| [[*attribute*\|=*value*\]](http://www.w3school.com.cn/cssref/selector_attribute_value_start.asp) | [lang\|=en]     | 选择 lang 属性值以 "en" 开头的所有元素。      | 2    |



##### screen关键词是指设备物理屏幕的大小还是指浏览器的视窗？

```
@media only screen and (max-width: 1024px) {margin: 0;}

```

A: 浏览器视窗



##### Difference between block  inline-block inline

大体来说HTML元素各有其自身的布局级别（block元素还是inline元素）：

常见的块级元素有 DIV, FORM, TABLE, P, PRE, H1~H6, DL, OL, UL 等。

常见的内联元素有 SPAN, A, STRONG, EM, LABEL, INPUT, SELECT, TEXTAREA, IMG, BR 等。

block元素可以包含block元素和inline元素；但inline元素只能包含inline元素。

- display:block

1. 1. block元素会独占一行，多个block元素会各自新起一行。默认情况下，block元素宽度自动填满其父元素宽度。
   2. block元素可以设置width,height属性。块级元素即使设置了宽度,仍然是独占一行。
   3. block元素可以设置margin和padding属性。

- display:inline

1. 1. inline元素不会独占一行，多个相邻的行内元素会排列在同一行里，直到一行排列不下，才会新换一行，其宽度随元素的内容而变化。
   2. inline元素设置width,height属性无效。
   3. inline元素的margin和padding属性，水平方向的padding-left, padding-right, margin-left, margin-right都产生边距效果；但竖直方向的padding-top, padding-bottom, margin-top, margin-bottom不会产生边距效果。

- display:inline-block

1. 1. 简单来说就是将对象呈现为inline对象，但是对象的内容作为block对象呈现。之后的内联对象会被排列在同一行内。比如我们可以给一个link（a元素）inline-block属性值，使其既具有block的宽度高度特性又具有inline的同行特性。

      ​

##### Difference between transition and animation

###### transition

```css
img{
    height:15px;
    width:15px;
}

img:hover{
    height: 450px;
    width: 450px;
}
img{
    transition: 1s 1s height ease;
}
```

只选择效果时间。transition的优点在于简单易用，但是它有几个很大的局限。

（1）transition需要事件触发，所以没法在网页加载时自动发生。

（2）transition是一次性的，不能重复发生，除非一再触发。

（3）transition只能定义开始状态和结束状态，不能定义中间状态，也就是说只有两个状态。

（4）一条transition规则，只能定义一个属性的变化，不能涉及多个属性。



##### css圆角

如果是长度，就是圆角的半径，0就是直角。

如果是百分比，超过50%，四个角就合成椭圆了



##### mypic.jpg会被浏览器加载吗？

```
<div id="test1">
    <span id="test2"></span>
</div>

#test1 {
    display: none;
}
#test2 {
    background-image: url('mypic.jpg');
    visibility: hidden;
}

```

A: 不会被下载。

##### What is Flash of Unstyled Content? How do you avoid FOUC?

原因大致为：1，使用import方法导入样式表。2，将样式表放在页面底部3，有几个样式表，放在html结构的不同位置。其实原理很清楚：当样式表晚于结构性html加载，当加载到此样式表时，页面将停止之前的渲染。此样式表被下载和解析后，将重新渲染页面，也就出现了短暂的花屏现象。

解决方法：使用LINK标签将样式表放在文档HEAD中。

##### 隐藏元素的方法

Display,visibility,opacity,position:absolute;top:-9999px;

##### { box-sizing: border-box; } 

固定了盒子的尺寸，无论怎么调整边距都不会改变盒子的大小.似乎是padding变了

### Js基础

##### JS原生自定义事件

**在某个对象上绑定不同类别的一个或多个方法，并且让它们分别执行**

```javascript
var eventHandle = {
    on: function(obj,events,fn){
        obj.listeners = obj.listeners || {};
        obj.listeners[events] = obj.listeners[events] || [];
        obj.listeners[events].push(fn);
    },
    fire: function(obj,events){
        for(var i = 0, n = obj.listeners[events].length; i &lt; n; i++){
            console.log(obj.listeners[events]);
            obj.listeners[events][i] && obj.listeners[events][i]();
        }
    },
    off: function(obj,events){
        for(var i = 0, n = obj.listeners[events].length; i &lt; n; i++){
            obj.listeners[events][i] = null;
        }
    }
};

//绑定自定义事件，
eventHandle.on(oDiv,"eventType1",function(){console.log(1);});//准备执行方法1
eventHandle.on(oDiv,"eventType1",function(){console.log(2);});//准备执行方法2
eventHandle.on(oDiv,"eventType1",function(){console.log(3);});//准备执行方法3
eventHandle.on(oDiv,"eventType2",function(){console.log(4);});//准备执行方法4

//触发执行
eventHandle.fire(oDiv,"eventType1");//执行eventType1下的所有方法
```

##### 原型链

原型	构造函数		实例三者之间关系

JavaScript万物都是对象，对象和对象之间也有关系，并不是孤立存在的。对象之间的继承关系，在JavaScript中是通过prototype对象指向父类对象，直到指向Object对象为止，这样就形成了一个原型指向的链条，专业术语称之为原型链。

- 每个对象都有一个指向它的原型的的内部链接(此链接还没有规范的访问方式，一般用__proro__代替),这个原型也有自己的原型，直到每个对象的原型为`null`为止
- 任意一个函数都可以作为构造器即`var someFun = new AnyFun()`
- 每个函数都有一个`prototype`属性，其它对象没有，该属性也是一个对象，该对象有一个`constructor`属性指向该函数
- 使用`new`去实例化一个函数后，得到的是一个对象。该函数的实例的原型指向构造函数的`prototype`属性
- 每个对象都有自己的属性和方法，如果没有找到就会沿着自己的原型链一直往上去找

##### js的继承和继承的方法和优缺点？ 

http://www.zyy1217.com/2017/03/13/JavaScript%E5%AE%9E%E7%8E%B0%E7%BB%A7%E6%89%BF%E7%9A%84%E6%96%B9%E5%BC%8F/

区别类的继承和实例化

非常常用的类继承是这个样子的：

`B.prototype = new A()`
这时候特别容易和实例化给混淆了(反正我混了*—*)：
`b = new A()`

##### js的继承方式

下面的这些怎么判断，直接看是不是在prototype上，在的话就会共用，不在的话就没有复用。

那为什么放在原型上就可以复用呢？

因为每个实例都可以顺着原型链找到student.prototype，所以放在上游大家就能复用了。不放在上游等于没次构造函数就实例化一次，浪费了。

1.原型链继承

```javascript
let Super = functioin(name) {
    this.name = name;
    this.setName = (newName) => {
        this.name = name;
    };
    this.getName = () => {
        return this.name;
    }
}

let Sub = function(sex) {
    this.sex = sex;
}
Sub.prototype = new Super('eric');  //通过改变原型对象实现继承
let sub1 = new Sub('male')
     sub2 = new Sub('female');

sub1.setName('ada');
// 这里必须通过setName方法来修改继承来的name属性。
// 如果通过sub1.name== 'ada',就打不到目的，因为此时sub1对象上没有name属性，
// 这样等于为该对象添加了新的属性，而不是修改继承而来的name属性。
console.log(sub2.name); // ada,可见此sub2的name也会被修改掉
console.log(sub1.getName === sub2.getName) // true,复用了方法
```

**优点：**父类的方法得到了复用。

**缺点：**同理父类的属性也是复用，即子类实例没有自己的属性。

new多个实例，改变其中一个，其他的属性也会被更改

2.借用构造函数

```javascript
let Super = function(name) {
    this.name = name;
    this.getName = () => {
        return this.name;
    }
}
let Sub = function(sex,name) {
    Super.call(this,name); // 调用父类方法为子类实例添加属性
    this.sex = sex;
}

let sub1 = new Sub('male','eric'),
     sub2 = new Sub('female','eric');
sub1.name = 'ada';
console.log(sub2.name); // eric,实例的属性没有相互影响

console.log(sub1.getName === sub2.getName); // false,可见方法没有复用
```

**优点：**子类的每个实例都有自己的属性（name），不会相互影响。

**缺点：**但是继承父类方法的时候就不需要这种特性，没有实现父类方法的复用。

3.组合继承    

```javascript
let Super = function(name) {
    this.name = name;
}
Super.prototype = {
    constructor: Super, // 保持构造函数和原型对象的完整性
    getName() {
        return this.name;
    }
}
let Sub = function(sex) {
    Super.call(this,'eric'); //继承父类属性
    this.sex = sex;
}
Sub.prototype = new Super('eric'); //继承父类方法
Sub.prototype.constructor = Sub;
let sub1 = new Sub('male'),
    sub2 = new Sub('female');
// 可以按上述两种方法验证，复用了父类的方法，实例没有复用，达到目的
```

**优点：**继承了上述两种方式的优点，摒弃了缺点，复用了方法，子类又有各自的属性。

**缺点：**因为父类构造函数被执行了两次，子类的原型对象(Sub.prototype)中也有一份父类的实例属性，而且这些属性会被子类实例(sub1,sub2)的属性覆盖掉，也存在内存浪费。

4.原型式继承

```javascript
function object(o) {
	function F(){}
	F.prototype = o;
	return new F();
}
```

5.寄生组合继承

```javascript
let Super = function(name) {
    this.name = name;
}
Super.prototype = {
    constructor: Super,
    getName() {
        return this.name;
    }
}
let Sub = function(sex,name) {
    Super.call(this,name);
    this.sex = sex;
}
// 组合继承的缺点就是在继承父类方法的时候调用了父类构造函数，从而造成内存浪费，
// 现在只要解决了这个问题就完美了。那在复用父类方法的时候，
// 使用Object.create方法也可以达到目的，没有调用父类构造函数，问题解决。
Sub.prototype = Object.create(Super.prototype);
Sub.prototype.constructor = Sub;
```

这特么不就是，你原型用人家的原型没动构造函数，你直接又把人家构造函数拿过来。齐活！

通过在父类原型和子类原型之间加入一个临时的构造函数F，切断了子类原型和父类原型之间的联系，这样当子类原型做修改时就不会影响到父类原型。

6.es6中的class

```javascript
class Super() {
    constructor(props) {
        this.name = props.name || 'eric';
    }
    setName(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
}
class Sub extends Super {
    constructor(props) {
        super(props); // 创建实例，继承父类属性和方法
        this.sex = props.sex || 'male';
    }
}
let sub1 = new Sub({
    name: 'eric',
    sex: 'male'
})
let sub2 = new Sub({
    name: 'eric',
    sex: 'female'
})

sub1.setName('ada');
console.log(sub1.getName(),sub2.getName()) // ada,eric,属性没复用，各自实例都有自己的属性。
console.log(sub1.getName === sub2.getName) // true; 复用了父类的方法
console.log(Sub.prototype.sex) // undefined
// 子类原型对象上没有父类构造函数中赋值的属性，不是组合式继承
```

**由以上结果可以看到es6中的class只不过是一种语法糖，通过上面的验证得知符合寄生组合继承的特点**



##### 原始数据结构类型和引用类型的区别

（讲的特好https://segmentfault.com/a/1190000008472264）

###### 原始数据类型

1.基本数据类型的值都是不可变的

```javascript
var name = "change";
name = "change1";
console.log(name)//change1
```

原来的change并没有改变，只是将指针指向了change1

2.基本数据类型不可以添加属性和方法

3.基本数据类型的赋值是简单的赋值。就直接把值给你

4.基本数据类型值的比较是值的比较

5.基本数据类型存放在栈区

包括变量的标识符和值

###### 引用数据类型

1.引用类型的值是可以改变的

2.引用类型可以添加属性和方法

3.引用类型的赋值是对象的引用（只是把指针给你）

4.引用类型的比较是引用的比较

5.引用类型是同时存在栈和堆中

引用类型的存储需要在内存的栈区和堆区共同完成，栈区保存变量标识符和指向堆内存的地址

###### 基本包装类型

ECMAScript还提供了三个特殊的引用类型Boolean,String,Number.我们称这三个特殊的引用类型为基本包装类型，也叫包装对象.

```javascript
var s1 = "helloworld";
var s2 = s1.substr(4);
```

所以当第二行代码访问s1的时候，后台会自动完成下列操作：

1. 创建String类型的一个实例；// var s1 = new String("helloworld");
2. 在实例上调用指定方法；// var s2 = s1.substr(4);
3. 销毁这个实例；// s1 = null;

正因为有第三步这个销毁的动作，所以你应该能够明白为什么基本数据类型不可以添加属性和方法，这也正是基本装包类型和引用类型主要区别：对象的生存期.使用new操作符创建的引用类型的实例，在执行流离开当前作用域之前都是一直保存在内存中.而自动创建的基本包装类型的对象，则只存在于一行代码的执行瞬间，然后立即被销毁

```javascript
var a=new String('A');
var b=new String('A');
a==b	//false
```

###### Null 和 Undefined 的区别

```javascript
Number(Null)//0
5+Null //5
Number(undefined)// NaN
5 + undefined// NaN
```

**null表示"没有对象"，即该处不应该有值**

（1） 作为函数的参数，表示该函数的参数不是对象。

（2） 作为对象原型链的终点。 //new Object(null). 没有继承任何对象，自己就是终点

**undefined表示"缺少值"，就是此处应该有一个值，但是还没有定义**

（1）变量被声明了，但没有赋值时，就等于undefined。

（2) 调用函数时，应该提供的参数没有提供，该参数等于undefined。

（3）对象没有赋值的属性，该属性的值为undefined。

（4）函数没有返回值时，默认返回undefined。

##### Object.defineProperty(obj, prop, descriptor)

descriptor中定义的参数用来定义或修改的属性的描述符

`configurable` 当且仅当该属性的 configurable 为 true 时，该属性`描述符`才能够被改变，也能够被删除。

`enumerable `当且仅当该属性的 enumerable 为 true 时，该属性才能够出现在对象的枚举属性中。。 

属性特性 `enumerable` 决定这个属性是否能被 `for...in` 循环或 `Object.keys` 方法遍历得到

`writable`当且仅当该属性的 writable 为 true 时，该属性才能被`[赋值运算符]`改变。

`value`该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。

`get`一个给属性提供 getter 的方法，如果没有 getter 则为 `undefined`。该方法返回值被用作属性值。

`set`一个给属性提供 setter 的方法，如果没有 setter 则为 `undefined`。该方法将接受唯一参数，并将该参数的新值分配给该属性。

##### 关于对象添加getter和setter的方法

1.通过对象初始化器在创建对象的时候指明（也可以称为通过字面值创建对象时声明）

```javascript
(function () {
    var o = {
        a : 7,
        get b(){return this.a +1;},//通过 get,set的 b,c方法间接性修改 a 属性
        set c(x){this.a = x/2}
    };
    console.log(o.a);
    console.log(o.b);
    o.c = 50;
    console.log(o.a);
})();
```

2.使用 `Object.create` 方法. Object.create(proto, [ propertiesObject ])

```javascript
(function () {
    var o = null;
    o = Object.create(Object.prototype,//指定原型为 Object.prototype
            {
                bar:{
                    get :function(){
                        return this.a;
                    },
                    set : function (val) {
                        console.log("Setting `o.bar` to ",val);
                        this.a = val;
                    },
                    configurable :true
                }
            }//第二个参数
        );
    o.a = 10;
    console.log(o.bar);
    o.bar = 12;
    console.log(o.bar);
})();
```

3.使用 `Object.defineProperty` 方法.    Object.defineProperty(obj, prop, descriptor)

```javascript
(function () {
    var o = { a : 1}//声明一个对象,包含一个 a 属性,值为1
    Object.defineProperty(o,"b",{
        get: function () {
            return this.a;
        },
        set : function (val) {
            this.a = val;
        },
        configurable : true
    });

    console.log(o.b);
    o.b = 2;
    console.log(o.b);
})();
```

4.使用 `Object.defineProperties`方法.   Object.defineProperties(obj, props)

```javascript
(function () {
    var obj = {a:1,b:"string"};
    Object.defineProperties(obj,{
        "A":{
            get:function(){return this.a+1;},
            set:function(val){this.a = val;}
        },
        "B":{
            get:function(){return this.b+2;},
            set:function(val){this.b = val}
        }
    });

    console.log(obj.A);
    console.log(obj.B);
    obj.A = 3;
    obj.B = "hello";
    console.log(obj.A);
    console.log(obj.B);
})();
```

##### 对象的扩展，密封以及冻结

- 扩展特性

  - `Object.isExtensible` 方法

    可扩展和上述的可修改不是一个概念

    ```javascript
    //对象是否可以扩展与对象的属性是否可以配置无关
    empty = Object.create({},{
        "a":{
            value : 1,
            configurable : false,//不可配置
            enumerable : true,//可枚举
            writable : true//可写
        }
    });
    console.log(Object.isExtensible(empty) === true);//true
    ```

  - `Object.preventExtensions` 方法

    修改为不可扩展。如果为当前不可扩展对象 empty 修改属性是成功的，这是因为一个对象的属性是否可以被修改与该对象是否可以扩展无关，而是与该对象在创建的时候是否声明为不可重写有关

- 密封特性

  - `Object.isSealed` 方法

    密封对象是指那些不能添加新的属性，不能删除已有属性，以及不能修改已有属性的可枚举性、可配置性、可写性，但可以修改已有属性的值的对象。

    ```javascript
    (function () {
        //新建的对象默认不是密封的
        var empty = {};
        console.log(Object.isSealed(empty) === false);//true

        //如果把一个空对象变得不可扩展,则它同时也会变成个密封对象.
        Object.preventExtensions(empty);
        console.log(Object.isSealed(empty) === true);//true

        //但如果这个对象不是空对象,则它不会变成密封对象,因为密封对象的所有自身属性必须是不可配置的.
        var hasProp = {fee : "fie foe fum"};
        Object.preventExtensions(hasProp);
        console.log(Object.isSealed(hasProp) === false);//true

        //如果把这个属性变得不可配置,则这个对象也就成了密封对象.
        Object.defineProperty(hasProp,"fee",{configurable : false});
        console.log(Object.isSealed(hasProp) === true);//true
    })();
    ```

  - `Object.seal` 方法

  ```javascript
  Object.seal(o);  //与下面的操作效果相同

  Object.defineProperty(o,"a",{configurable:false,writable:false});
  Object.preventExtensions(o);
  ```

- 冻结特性

  - `Object.isFrozen` 方法

     冻结对象是指那些不能添加新的属性，不能修改已有属性的值，不能删除已有属性，以及不能修改已有属性的可枚举性、可配置性、可写性的对象。也就是说，这个对象永远是不可变的。


-   `Object.freeze` 方法

    - `浅冻结` 与 `深冻结`

      倘若一个对象的属性是一个对象，那么对这个外部对象进行冻结，内部对象的属性是依旧可以改变的，这就叫浅冻结，若把外部对象冻结的同时把其所有内部对象甚至是内部的内部无限延伸的对象属性也冻结了，这就叫深冻结。

      深冻结：遍历递归操作冻结每一层

##### 事件代理

###### Jquery

```javascript
$("#tab").bind("click",function(ev)){
   var $obj=$(ev.target);
   $obj.css("background","red");
}
```

###### Js

```javascript
  var ulNode=document.getElementById("list");
  ulNode.addEventListener('click',function(e){
       if(e.target&&e.target.nodeName.toUpperCase()=="LI"){/*判断目标事件是否为li*/
         alert(e.target.innerHTML);
       }
     },false);
```

##### async和defer的作用是什么？有什么区别

1.<script src="example.js"></script>

没有defer或async属性，浏览器会立即加载并执行相应的脚本。也就是说在渲染script标签之后的文档之前，不等待后续加载的文档元素，读到就开始加载和执行，此举会阻塞后续文档的加载；
2.<script async src="example.js"></script>

有了async属性，表示后续文档的加载和渲染与js脚本的加载和执行是并行进行的，即异步执行；（异步加载，加载完马上执行）
3.<script defer src="example.js"></script>

有了defer属性，加载后续文档的过程和js脚本的加载(此时仅加载不执行)是并行进行的(异步)，js脚本的执行需要等到文档所有元素解析完成之后，DOMContentLoaded事件触发执行之前。(不耽误后边文档加载，但是都加载完执行。)



##### event对象属性方法

onblur onload onkeyup onmouseup

##### for in 和for of的区别是什么

for in 遍历的是索引. 还可以遍历对象，但是可能会遍历到继承的元素方法，使用hasOwnProperty（）判断

for of遍历的是对应的元素值

遍历对象新出的 Object.keys() Object.values. Object.entires()

##### 遍历对象

Object.keys.    for..in

##### 深复制与浅复制

1.直接用等号赋值 浅复制

2.Object.assign() 居然也是浅复制.   因为copy对象的时候是复制指针

```javascript
 let obj1 = { a: 0 , b: { c: 0}};
  let obj2 = Object.assign({}, obj1);
  console.log(JSON.stringify(obj2)); // { a: 0, b: { c: 0}}
  
  obj1.a = 1;
  console.log(JSON.stringify(obj1)); // { a: 1, b: { c: 0}}
  console.log(JSON.stringify(obj2)); // { a: 0, b: { c: 0}}
  
  obj2.a = 2;
  console.log(JSON.stringify(obj1)); // { a: 1, b: { c: 0}}
  console.log(JSON.stringify(obj2)); // { a: 2, b: { c: 0}}
  
  obj2.b.c = 3;
  console.log(JSON.stringify(obj1)); // { a: 1, b: { c: 3}}
  console.log(JSON.stringify(obj2)); // { a: 2, b: { c: 3}}
  
  // Deep Clone
  obj1 = { a: 0 , b: { c: 0}};
  let obj3 = JSON.parse(JSON.stringify(obj1));
  obj1.a = 4;
  obj1.b.c = 4;
  console.log(JSON.stringify(obj3)); // { a: 0, b: { c: 0}}
```

3.jQuery.extend     vue的touch函数？

4.Json.parse. Json.stringify

##### 闭包 ！

###### 什么是闭包？

定义：当函数可以记住并访问所在的词法作用域，即使函数是在当前词法作用域之外执行，这时就产生了闭包。

辨认：就两点，1内部有一个函数保存了作用域内的变量   2这个变量暴露暴露出来

例子：

```javascript
function wait(message){
  setTimeout(function timer(){
    console.log(message)
  },1000);
}   //不是非得return出去才叫暴露


function setup(name,selector){
  $(selector).click(function activator(){
    console.log(name)
  });
}  //在任务中，只要使用了回调函数，实际上就是在使用闭包
```

```javascript
function Counter(start) {
    var count = start;
    return {
        increment: function() {
            count++;
        },

        get: function() {
            return count;
        }
    }
}

var foo = Counter(4);
foo.increment();
foo.get(); // 5    其实这就是模块的写法
```

###### 闭包与setTimeout

因为for循环他们共享同一个

```javascript
var result = [];
for (var i=0; i < 5; i++) {
    result.push(function () { return i });  // (*)
}
console.log(result[3]()); // 5 (not 3)
```

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
	(function(i){
  setTimeout(()=>{
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
             
for(var i = 0; i < 10; i++) {
    setTimeout((function(e) {
        return function() {
            console.log(e);
        }
    })(i), 1000)
}
```

```javascript
var output = function (i) {
    setTimeout(function() {
        console.log(new Date, i);
    }, 1000);
};

for (var i = 0; i < 5; i++) {
    output(i);  // 这里传过去的 i 值被复制了
}

console.log(new Date, i);
```

使用Promise

```javascript
const tasks = []; // 这里存放异步操作的 Promise
const output = (i) => new Promise((resolve) => {
    setTimeout(() => {
        console.log(new Date, i);
        resolve();
    }, 1000 * i);
});

// 生成全部的异步操作
for (var i = 0; i < 5; i++) {
    tasks.push(output(i));
}

// 异步操作完成之后，输出最后的 i
Promise.all(tasks).then(() => {
    setTimeout(() => {
        console.log(new Date, i);
    }, 1000);
});
```

```javascript
// 模拟其他语言中的 sleep，实际上可以是任何异步操作
const sleep = (timeountMS) => new Promise((resolve) => {
    setTimeout(resolve, timeountMS);
});

(async () => {  // 声明即执行的 async 函数表达式
    for (var i = 0; i < 5; i++) {
        await sleep(1000);
        console.log(new Date, i);
    }

    await sleep(1000);
    console.log(new Date, i);
})();
```

变异啦！

```javascript
for (var i = 0; i < 5; i++) {
  (function() {
    setTimeout(function() {
      console.log(i);
    }, i * 1000);
  })(i);
}          //内部其实没有对参数的引用，所以还是55555

for (var i = 0; i < 5; i++) {
  (function(i) {
    setTimeout(function() {
      console.log(i);
    }, i * 1000);
  })();
}			//undefined x5


for (var i = 0; i < 5; i++) {
  setTimeout((function(i) {
    console.log(i);
  })(i), i * 1000);
}				//立即执行函数立即执行，setTimeout就等于传了个undefined。会立刻输出01234

setTimeout(function() {
  console.log(1)
}, 0);
new Promise(function executor(resolve) {
  console.log(2);
  for( var i=0 ; i<10000 ; i++ ) {
    i == 9999 && resolve();
  }
  console.log(3);
}).then(function() {		//2 3 5 4 1
  console.log(4);					
});
console.log(5);		
//执行过程如下：
JavaScript引擎首先从macrotask queue中取出第一个任务，
执行完毕后，将microtask queue中的所有任务取出，按顺序全部执行；
然后再从macrotask queue中取下一个，
执行完毕后，再次将microtask queue中的全部取出；
循环往复，直到两个queue中的任务都取完。

解释：
代码开始执行时，所有这些代码在macrotask queue中，取出来执行之。
后面遇到了setTimeout，又加入到macrotask queue中，
然后，遇到了promise.then，放入到了另一个队列microtask queue。
等整个execution context stack执行完后，
下一步该取的是microtask queue中的任务了。
因此promise.then的回调比setTimeout先执行 
```



##### 创建对象的三种方法

###### 原型对象

```javascript
//Object.create(proto, [ propertiesObject ]) 第二个参数为新要添加的属性
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
```

###### 构造函数

```javascript
function Student(props) {
    this.name = props.name || '匿名'; // 默认值为'匿名'
    this.grade = props.grade || 1; // 默认值为1
}

Student.prototype.hello = function () {
    alert('Hello, ' + this.name + '!');
};

function createStudent(props) {
    return new Student(props || {})
}
```

###### class 实现

```javascript
class Student {
    constructor(name) {
        this.name = name;
    }

    hello() {
        alert('Hello, ' + this.name + '!');
    }
}
class PrimaryStudent extends Student {
    constructor(name, grade) {
        super(name); // 记得用super调用父类的构造方法!
        this.grade = grade;
    }

    myGrade() {
        alert('I am at grade ' + this.grade);
    }
}
```

##### 上下文和作用域

在当前作用域中无法找到某个变量时，引擎就会在外层嵌套的作用域中继续寻找。直到找到该变量，或抵达最外层的作用域为止。

```javascript
function foo(){
  console.log(a);  //2
}

function bar(){
  var a=3;
  foo();
}

var a=2;

bar();
```

作用域分为两种，词法作用域和动态作用域。js是词法作用域。

词法作用域最重要的特征是它的定义过程发生在代码书写阶段。

##### this的误区

指向自身，this指向函数的作用域。 //this取决于调用位置

##### this和上下文作用域

分成声明和赋值两个步骤。一开始先声明，然后赋值的时候如果没声明再声明（全局作用域），最后赋值。

this不是author-time binding，而是 runtime binding。

当函数作为对象方法调用时，`this`指向该对象。

```javascript
var o = {
  prop: 37,
  f: function() {
    return this.prop;
  }
};

console.log(o.f()); // logs 37
```



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

特殊情况！

1.隐式丢失

```javascript
function thisTo(){
   console.log(this.a);
}
var data={
    a:2,
    foo:thisTo //通过属性引用this所在函数 
};
var a=3;//全局属性

var newData=data.foo; //这里进行了一次引用赋值 
newData(); // 3
```

感觉都是这个意思。反正就是只拿方法，他就自己找全局了嘛。

##### 深度拷贝对象https://www.zhihu.com/question/23031215

```javascript
 window.val = 1;
  var obj = {
    val: 2,
    dbl: function () {
      this.val *= 2;
      val *= 2;
      console.log(val);
      console.log(this.val);
    }
  };
  // 说出下面的输出结果
  obj.dbl();
  var func = obj.dbl;
  func();      		// 2 4 8 8


  var obj = {
    say: function () {
      var f1 = () => {
        console.log(this); // obj
        setTimeout(() => {
          console.log(this); // obj
        })
      }
      f1();
    }
  }
  obj.say()
  
    var obj = {
    say: function () {
      var f1 = function () {
        console.log(this);    // window, f1调用时,没有宿主对象,默认是window
        setTimeout(() => {
          console.log(this); // window
        })
      };
      f1();
    }
  }
  obj.say()
```



```javascript
var a=10;
(function test(){
  console.log(a);//undefined
  a=100;
  console.log(a);//100
  console.log(this.a);//10
  var a;
})()
```



#### 正则表达式

RegExp 是JS中的类，同Array类似。

第一个参数正则匹配。第二个参数（g:全局查找  i:不区分大小写  m:多行查找）

##### 正则表达式的方法

test()—return boolean

exec()—return a Array with index and input

search()—return index and u can both input RegExp or String                               //字符串带的方法

replace()—as it looks like 

##### difference between [] {} ()

[0-9] 查找任何从 0 至 9 的数字

{8} 表示位数为8位

()的作用是提取匹配的字符串。表达式中有几个`()`就会得到几个相应的匹配字符串。比如`(\s+)`表示连续空格的字符串

##### ^ 和 $

`^` 匹配一个字符串的开头，比如 (`^a`) 就是匹配以字母`a`开头的字符串

`$` 匹配一个字符串的结尾,比如 (`b$`) 就是匹配以字母`b`结尾的字符串

`^`还有另个一个作用就是取反，比如`[^xyz]`表示匹配的字符串不包含`xyz`

##### \d \s \w .

`\d` 匹配一个非负整数， 等价于 `[0-9]`；

`\s` 匹配一个空白字符；

`\w` 匹配一个英文字母或数字，等价于`[0-9a-zA-Z]`；

`.` 匹配除换行符以外的任意字符，等价于`[^\n]`。

##### * + ?

`*`表示匹配前面元素0次或多次，比如`(\s*)`就是匹配0个或多个空格；

`+` 表示匹配前面元素1次或多次，比如`(\d+)`就是匹配由至少1个整数组成的字符串；

`?`表示匹配前面元素0次或1次，相当于`{0,1}`，比如`(\w?)` 就是匹配最多由1个字母或数字组成的字符串 。

##### 还有一些语法

[adgk]   查找给定集合内的任何字符。

`\W`  查找非单词字符。

`\d`  查找数字。

`\D` 查找非数字字符。

`\b` 匹配单词边界。

`\B` 匹配非单词边界。

`\0` 查找 NULL 字符。

`\n` 查找换行符。

`\f` 查找换页符。

`\r` 查找回车符。

`\t` 查找制表符。

`\v` 查找垂直制表符。

`\xxx` 查找以八进制数 xxx 规定的字符。

`\xdd` 查找以十六进制数 dd 规定的字符。

`\uxxxx` 查找以十六进制数 xxxx 规定的 Unicode 字符。

n{X,Y} `X`和 `Y` 为正整数。前面的模式`n` 连续出现至少 `X`次，至多 `Y`次时匹配

?=n 匹配任何其后紧接指定字符串`n` 的字符串。

?!n 匹配任何其后没有紧接指定字符串 `n` 的字符串



#### vue

##### diff算法

https://segmentfault.com/a/1190000008782928

###### 为什么要virtual dom

操作dom太耗资源，所以优化为操作对象

###### 核心：**比较只会在同层级进行, 不会跨层级比较。**

更新流程：

1.先判断两个vnode的key和sel是否相同。不值的比较就直接用新节点替代老节点。否则进入第二步

2.节点的比较有5种情况

1. `if (oldVnode === vnode)`，他们的引用一致，可以认为没有变化。
2. `if(oldVnode.text !== null && vnode.text !== null && oldVnode.text !== vnode.text)`，文本节点的比较，需要修改，则会调用`Node.textContent = vnode.text`。
3. `if( oldCh && ch && oldCh !== ch )`, 两个节点都有子节点，而且它们不一样，这样我们会调用`updateChildren`函数比较子节点，这是diff的核心，后边会讲到。
4. `else if (ch)`，只有新的节点有子节点，调用`createEle(vnode)`，`vnode.el`已经引用了老的dom节点，`createEle`函数会在老dom节点上添加子节点。
5. `else if (oldCh)`，新节点没有子节点，老节点有子节点，直接删除老节点。

3.通过设置的key进行遍历比较子节点

###### 结论

- 尽量不要跨层级的修改dom
- 设置key可以最大化的利用节点
- 不要盲目相信diff的效率，在必要时可以手工优化

##### 自己写一个vue组件

https://juejin.im/entry/58a11c648d6d81006c9d739d

仿照着分页自己写了个conole-panel的控制台。主要实现了，黑色背景，字体，以及随着控制log的增加，自动跟随到最新的信息。大概的思路就是自己写个普通的组件，要填的通过props传进来。然后vue.use引用就好了

##### 父子组件间通信

```javascript
<div id="counter-event-example">
  <p>{{ total }}</p>
  <button-counter v-on:increment="incrementTotal"></button-counter>
  <button-counter v-on:increment="incrementTotal"></button-counter>
</div>
  
Vue.component('button-counter', {
  template: '<button v-on:click="incrementCounter">{{ counter }}</button>',
  data: function () {
    return {
      counter: 0
    }
  },
  methods: {
    incrementCounter: function () {
      this.counter += 1
      this.$emit('increment')
    }
  },
})
new Vue({
  el: '#counter-event-example',
  data: {
    total: 0
  },
  methods: {
    incrementTotal: function () {
      this.total += 1
    }
  }
})
```

##### 非父子组件间通信

如果2个组件不是父子组件那么如何通信呢？这时可以通过eventHub来实现通信. 
所谓eventHub就是创建一个事件中心，相当于中转站，可以用它来传递事件和接收事件.

```
let Hub = new Vue(); //创建事件中心11
```

组件1触发：

```
<div @click="eve"></div>
methods: {
    eve() {
        Hub.$emit('change','hehe'); //Hub触发事件
    }
}123456123456
```

组件2接收:

```
<div></div>
created() {
    Hub.$on('change', () => { //Hub接收事件
        this.msg = 'hehe';
    });
}123456123456
```

这样就实现了非父子组件之间的通信了.原理就是把Hub当作一个中转站！

##### vue的生命周期

beforecreate    created

beforemounted	mounted

beforeupdate	updated

activated	deactivated

beforedestory	destroyed

##### vue的生命周期各阶段都做了什么？

`beforeCreate` 实例创建前：这个阶段实例的data、methods是读不到的
`created` 实例创建后：这个阶段已经完成了数据观测(data observer)，属性和方法的运算， watch/event 事件回调。mount挂载阶段还没开始，$el 属性目前不可见，数据并没有在DOM元素上进行渲染
`beforeMount`：在挂载开始之前被调用：相关的 render 函数首次被调用。
`mounted`：el选项的DOM节点 被新创建的 vm.$el 替换，并挂载到实例上去之后调用此生命周期函数。此时实例的数据在DOM节点上进行渲染
`beforeUpdate`：数据更新时调用，但不进行DOM重新渲染，在数据更新时DOM没渲染前可以在这个生命函数里进行状态处理
`updated`：这个状态下数据更新并且DOM重新渲染，当这个生命周期函数被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。当实例每次进行数据更新时updated都会执行
`beforeDestory`：实例销毁之前调用。
`destroyed`：Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。	

##### vue生命周期在真实场景下的业务应用

`created`：进行ajax请求异步数据的获取、初始化数据
`mounted`：挂载元素内dom节点的获取
`nextTick`：针对单一事件更新数据后立即操作dom
`updated`：任何数据的更新，如果要做统一的业务逻辑处理
`watch`：监听具体数据变化，并做相应的处理



react的写法

```javascript
class Brother2 extends React.Component{
  constructor(props){
    super(props);
    this.state = {}
  }
  
  render(){
    return (
      <div>
         {this.props.text || "兄弟组件未更新"}
      </div>
    )
  }
}
class Parent extends React.Component{
  constructor(props){
    super(props);
    this.state = {}
  }
  refresh(){
    return (e)=>{
      this.setState({
        text: "兄弟组件沟通成功",
      })
    }
  }
  render(){
    return (
      <div>
        <h2>兄弟组件沟通</h2>
        <Brother1 refresh={this.refresh()}/>
        <Brother2 text={this.state.text}/>
      </div>
    )
```

##### react组件之间交流方式

父子：父组件更新组件状态／子组件触发更新父组件状态—也在props里调用父亲组件的方法改变state

兄弟：借助父组件更新，层次比较深就很不方便／React提供了一种上下文方式（挺方便的），可以让子组件直接访问祖先的数据或函数，无需从祖先组件一层层地传递数据到子组件中。






##### vuex是为什么出现的

- 管理多个组件共享状态。
- 全局状态管理。
- 状态变更跟踪。
- 让状态管理形成一种规范，使代码结构更清晰。

##### 源码中的遍历对象

```javascript
     function touch(obj){
       if(obj === 'Object'){
         if(Array.isArray(obj)){
           obj.forEach(ele => {touch(ele)})
         }else{
           let keys=Object.keys(obj)
           for(let key in keys){
             touch(obj[key])
           }
         }
       }
       console.log(obj);
     }
```

#### 构建工具

##### webpack

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



##### Webpack中 —save-dev 和 —save 的区别

前者是开发时候用的，后者是发布之后也要用的

##### 模块系统

###### CommonJS

Nodejs

优点：

- 服务器端模块便于重用
- [NPM](https://www.npmjs.com/) 中已经有将近20万个可以使用模块包

缺点：

- 同步的模块加载方式不适合在浏览器环境中，同步意味着阻塞加载，浏览器资源是异步加载的

###### AMD

[Asynchronous Module Definition](https://github.com/amdjs/amdjs-api) 规范其实只有一个主要接口 `define(id?, dependencies?, factory)`，它要在声明模块的时候指定所有的依赖 `dependencies`，并且还要当做形参传到 `factory` 中，对于依赖的模块提前执行，依赖前置。

```
define("module", ["dep1", "dep2"], function(d1, d2) {
  return someExportedValue;
});
require(["module", "../file"], function(module, file) { /* ... */ });

```

优点：

- 适合在浏览器环境中异步加载模块

缺点：

- 提高了开发成本，代码的阅读和书写比较困难，模块定义方式的语义不顺畅
- 不符合通用的模块化思维方式，是一种妥协的实现

实现：

- [RequireJS](http://requirejs.org/)

###### CMD

[Common Module Definition](https://github.com/cmdjs/specification/blob/master/draft/module.md) 规范和 AMD 很相似，尽量保持简单，并与 CommonJS 和 Node.js 的 Modules 规范保持了很大的兼容性。

```
define(function(require, exports, module) {
  var $ = require('jquery');
  var Spinning = require('./spinning');
  exports.doSomething = ...
  module.exports = ...
})

```

优点：

- 依赖就近，延迟执行
- 可以很容易在 Node.js 中运行

缺点：

- 依赖 SPM 打包，模块的加载逻辑偏重

实现：

- [Sea.js](http://seajs.org/)

AMD | 速度快 | 会浪费资源 | 预先加载所有的依赖，直到使用的时候才执行

CMD | 只有真正需要才加载依赖 | 性能较差 | 直到使用的时候才定义依赖

AMD和CMD最大的区别是对依赖模块的执行时机处理不同，而不是加载的时机或者方式不同，二者皆为异步加载模块。
AMD依赖前置，js可以方便知道依赖模块是谁，立即加载；而CMD就近依赖，需要使用把模块变为字符串解析一遍才知道依赖了那些模块，这也是很多人诟病CMD的一点，牺牲性能来带来开发的便利性，实际上解析模块用的时间短到可以忽略。

```javascript
//CMD
define(function(require,exports,module){
    var a = require("./a");
    a.doSomethis();
    var b = require("./b")//依赖可以就近书写
    b.doSomething()
})
//AMD
define(['./a,./b'],function(a,b){//依赖必须一开始就写好
    a.dosomething()
    b.dosomething()
})
```



##### webpack vs gulp&grunt

前者的工作流程是，将整个项目作为一个主体，通过给定的主文件，根据整个文件开始找到项目的所有依赖。然后通过loaders处理，最后打包成一个浏览器可以识别的js文件。

后者就有点像小孩。在配置文件中给出需要对文件的各种操作命令，然后他会帮你操作完成。

##### 清除浮动

清除浮动 还是 闭合浮动

外边距重合，父div撑不起来

清除浮动指的是运用clear属性去解决浮动父容器高度塌陷的问题，clear属性规定元素的哪一侧不允许其他浮动元素。
可选择的值有：left, right, both, none, inherit

**清除浮动方法1**：通过在浮动元素的末尾添加一个空元素，设置 clear：both属性，after伪元素其实也是通过 content 在元素的后面生成了内容为一个点的块级元素。

**清除浮动方法2**：BFC（Block Format Content）清理浮动，BFC可以**阻止垂直外边距折叠**、**不会重叠浮动元素**、可以**包含浮动**。因此清理浮动在BFC的语境下就是“包含浮动”，也即让父容器形成BFC就可以。



##### 会触发BFC的条件有：

- float的值不为none。

- overflow的值不为visible。

- display的值为table-cell, table-caption, inline-block 中的任何一个。

- position的值不为relative 和static。

  在CSS当中，相邻的两个盒子（可能是兄弟关系也可能是祖先关系）的外边距可以结合成一个单独的外边距。这种合并外边距的方式被称为折叠，并且因而所结合成的外边距称为折叠外边距.

  两个相邻的外边距都是正数时，折叠结果是它们两者之间较大的值。

  两个相邻的外边距都是负数时，折叠结果是两者绝对值的较大值。

  两个外边距一正一负时，折叠结果是两者的相加的和。

  ps：一个包另一个，被包的那个的margin就被吃掉了，还是贴在一起的！！！

  还有一种就是里边是float外边div，就撑不开，跑外边来了

##### css圆角

如果是长度，就是圆角的半径，0就是直角。

如果是百分比，超过50%，四个角就合成椭圆了

##### 浏览器渲染

兵分三路。HTML/SVG/XHTML负责DOM树，css负责css树，js通过相应的api操作这两个树，解析完成后通过两个树变成渲染树。

ps：Rendering Tree 渲染树并不等同于DOM树，因为一些像Header或display:none的东西就没必要放在渲染树中了。

##### 回流与重绘

1. 当render tree中的一部分(或全部)因为元素的规模尺寸，布局，隐藏等改变而需要重新构建。这就称为回流(reflow)。每个页面至少需要一次回流，就是在页面第一次加载的时候。在回流的时候，浏览器会使渲染树中受到影响的部分失效，并重新构造这部分渲染树，完成回流后，浏览器会重新绘制受影响的部分到屏幕中，该过程成为重绘。 Resize ,Add or delete element
2. 当render tree中的一些元素需要更新属性，而这些属性只是影响元素的外观，风格，而不会影响布局的，比如background-color。则就叫称为重绘。 Change color

注意：回流必将引起重绘，而重绘不一定会引起回流。

浏览器很聪明，回流重绘到一定数量才会发生。

###### 如何减少回流和重绘

一次性更改style，绝对定位复杂操作的动画。不要把DOM结点的属性值放在一个循环里当成循环里的变量。千万不要使用table布局

- 当你增加、删除、修改DOM结点时，会导致Reflow或Repaint
- 当你移动DOM的位置，或是搞个动画的时候。
- 当你修改CSS样式的时候。
- 当你Resize窗口的时候（移动端没有这个问题），或是滚动的时候。
- 当你修改网页的默认字体时。



## 第二部分 计算机网络

##### 在css/js代码上线之后开发人员经常会优化性能，从用户刷新网页开始，一次js请求一般情况下有哪些地方会有缓存处理？

dns缓存（地址），cdn缓存（文件），浏览器缓存，服务器缓存。



##### 关于cookie的一切

**cookie的属性**：

Domain：域，表示当前cookie所属于哪个域或子域下面。（www.jianshu.com）

Path：表示cookie的所属路径。（／）

Expire time/Max-age：表示了cookie的有效期。expire的值，是一个时间，过了这个时间，该cookie就失效了。或者是用max-age指定当前cookie是在多长时间之后而失效。如果服务器返回的一个cookie，没有指定其expire time，那么表明此cookie有效期只是当前的session，即是session cookie，当前session会话结束后，就过期了。对应的，当关闭（浏览器中）该页面的时候，此cookie就应该被浏览器所删除了（2017-10-20T02:16:19.000Z）

secure：表示该cookie只能用https传输。一般用于包含认证信息的cookie，要求传输此cookie的时候，必须用https传输。

httponly：表示此cookie必须用于http或https传输。这意味着，浏览器脚本，比如javascript中，是不允许访问操作此cookie的。

**服务器发送cookie给客户端**：

从服务器端，发送cookie给客户端，是对应的Set-Cookie。包括了对应的cookie的名称，值，以及各个属性。

Set-Cookie: lu=Rg3vHJZnehYLjVg7qi3bZjzg; Expires=Tue, 15 Jan 2013 21:47:38 GMT; Path=/; Domain=.169it.com; HttpOnly

**从客户端把cookie发送到服务器**：

从客户端发送cookie给服务器的时候，是不发送cookie的各个属性的，而只是发送对应的名称和值。

**关于修改，设置cookie**：

除了服务器发送给客户端（浏览器）的时候，通过Set-Cookie，创建或更新对应的cookie之外，还可以通过浏览器内置的一些脚本，比如javascript，去设置对应的cookie，对应实现是操作js中的document.cookie。

**Cookie的缺陷：**

(1)cookie会被附加在每个HTTP请求中，所以无形中增加了流量。

(2)由于在HTTP请求中的cookie是明文传递的，所以安全性成问题。（除非用HTTPS)

(3)Cookie的大小限制在4KB左右。对于复杂的存储需求来说是不够用的。





##### 浏览器缓存机制

Cache-Control：max-age=600。设置有效时长

Expires：一个时间节点，表示在这个时间节点之前都是有效的

Last-Modified（或 Etag）：最后一次更新时间节点

Etag：相当于一个tagid，上传到server端检查id是否一致

###### 200 for cache   vs  304 not Modify

 200 OK (from cache)  是浏览器没有跟服务器确认，直接用了浏览器缓存；而 304 Not Modified 是浏览器和服务器多确认了一次缓存有效性，再用的缓存

304<——>由last-modify&&etag控制。

200 for cache<——>由Cache-Control && Expires控制。前者优先级更高





##### http报文格式
###### 请求报文           

请求行		//三个字段：方法字段，URL字段，HTTP版本

请求头部		//Host 请求主机名，Accept 客户端可识别的内容类型列表，User-Agent 产生请求的浏览器类型，					      Connection 是否持续保持连接

请求正文		//POST

###### 响应报文

状态行   	       //由HTTP协议版本号， 状态码， 状态消息

响应头部.        //Date：服务器生成响应报文并发送的日期和时间，该时间是服务器在它的文件系统中检索到该对象，插入到响应报文，并发送该响应报文的时间。Server:表示该报文是由一台Apache Web服务器产生的。Last-Modified： 对象创建或最后修改的时间。Content-Type：指定了实体中的对象是HTML(text/html),编码类型是UTF-8

空行告诉下一行是正文

响应正文

![sanciwoshou](/Users/deepglint/Downloads/sanciwoshou.png)

##### 为什么要三次握手，四次挥手

三次是为了server端一直等待。server 说好，但是服务器端没收到或者发的没收到。

四次是因为双方都有可能还有信息没有发，所以需要各自都说不发了。

##### 为什么要重定向

其中一个原因跟搜索引擎排名有关。如果一个页面有两个地址，就像http://www.yy.com/和http://yy.com/，搜索引擎会认为它们是两个网站，结果造成每个搜索链接都减少从而降低排名。

301 or 302

他们的不同在于。301表示旧地址A的资源已经被永久地移除了（这个资源不可访问了），**搜索引擎在抓取新内容的同时也将旧的网址交换为重定向之后的网址**；

302表示旧地址A的资源还在（仍然可以访问），这个重定向只是临时地从旧地址A跳转到地址B，**搜索引擎会抓取新的内容而保存旧的网址。 SEO302好于301**

反向代理

所有服务器前面加个代理来分配大量的请求响应



##### http状态码

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



## 第三部分 简历和面试技巧总结

##### 回答职业规划类型问题

体现扎根动机，公司优秀多向公司学习

##### 反问面试官的最后一个问题

###### 这次面试我还有哪些需要提高的地方

###### 在公司里的部门，做什么

##### 平常关注的前端消息

知乎，前端周刊 https://zhuanlan.zhihu.com/p/27966492

​	   前端外看评论 https://zhuanlan.zhihu.com/FrontendMagazine

​	   前端学习指南 https://zhuanlan.zhihu.com/study-fe

​	   前端大哈 https://zhuanlan.zhihu.com/qianduandaha

##### 看过的前端书籍

权威指南，你不知道的js，understunding es6，阮es6，DOM编程艺术，bad things about JavaScript，图解http，css secrets ,css 权威指南，算法导论，jquery实战，黑客与画家,编写高质量JavaScript代码的68个有效方法,Head First HTML5 Programming,数据结构与算法JavaScript描述，编写高质量代码--Web前端开发修炼之道，javascript秘密花园，javascript的怪癖，Git教程，css编写规范，深入理解javascript，typescript，

廖雪峰 阮一峰

##### 公众号

前端大全

算法与数学之美

36氪

IFE

#### 简历内容具体分析

##### 弹幕

功能实现：

颜色随机 span.style.color = colors[index];

高度：算出一共能多少行，随机行数

一开始在屏幕的最右侧：

var screenW = window.innerWidth;
span.style.left = screenW +'px';

动态往左：arr[i] -= 2。oSpan[i].style.left = arr[i]+'px';

判断是否超出屏幕：if (arr[i] < -oSpan[i].offsetWidth)

细节处理：

观看量35万的视5000条弹幕。可以设置屏幕的弹幕数，vip有优先权。

bilibili也会出现弹幕太多覆盖屏幕，只能关了再看。会有遮盖，不过颜色不同，行高固定。

使用的是transform translate

##### chorme插件

调试安卓手机

所以也不用再在chrome上安装ADB插件了 但需要下载最新的chrome

chrome://inspect

手机上看到的内容pc端可以同步审查元素

##### mock后端数据

json-server

##### react生命周期

http://www.jianshu.com/p/4784216b8194

##### git版本控制

Master		正式发版用

Develop		开发重大版本

Feature		开发某种特定功能

Release		发布正式版本之前（即合并到Master分支之前），我们可能需要有一个预发布的版本进行测试

Fixbug		修补bug分支

后三种为临时分支，用完就删



Dev

git checkout -b develop master		创建分枝

git checkout master				切换到Master分支

git merge --no-ff develop			对Develop分支进行合并

这次合并是“快进模式”，也就是直接把`master`指向`dev`的当前提交，所以合并速度非常快。



Feature

git checkout -b feature-x develop

git checkout develop

git merge --no-ff feature-x		

git branch -d feature-x			删除分支



Release

git checkout -b release-1.2 develop

git checkout master

git merge --no-ff release-1.2

git tag -a 1.2			 			对合并生成的新节点，做一个标签



Fixbug

git checkout -b fixbug-0.1 master

git checkout master

git merge --no-ff fixbug-0.1

git tag -a 0.1.1

git checkout develop

git merge --no-ff fixbug-0.1

git checkout develop

git merge --no-ff fixbug-0.1



##### 滚屏加载

```javascript
$(function(){ 
    var winH = $(window).height(); //页面可视区域高度 
    var i = 1; //设置当前页数 
    $(window).scroll(function () { 
        var pageH = $(document.body).height(); 
        var scrollT = $(window).scrollTop(); //滚动条top 
        var aa = (pageH-winH-scrollT)/winH; 
        if(aa<0.02){ 
            $.getJSON("result.php",{page:i},function(json){ 
                if(json){ 
                    var str = ""; 
                    $.each(json,function(index,array){ 
                        var str = "<div class=\"single_item\"><div class=\"element_head\">"; 
                        var str += "<div class=\"date\">"+array['date']+"</div>"; 
                        var str += "<div class=\"author\">"+array['author']+"</div>"; 
                        var str += "</div><div class=\"content\">"+array['content']+"</div></div>"; 
                        $("#container").append(str); 
                    }); 
                    i++; 
                }else{ 
                    $(".nodata").show().html("别滚动了，已经到底了。。。"); 
                    return false; 
                } 
            }); 
        } 
    }); 
}); 
```

Js：

网页可见区域宽： document.body.clientWidth
网页可见区域高： document.body.clientHeight
网页可见区域宽： document.body.offsetWidth (包括边线的宽)
网页可见区域高： document.body.offsetHeight (包括边线的高)
网页正文全文宽： document.body.scrollWidth
网页正文全文高： document.body.scrollHeight
网页被卷去的高： document.body.scrollTop
网页被卷去的左： document.body.scrollLeft
网页正文部分上： window.screenTop
网页正文部分左： window.screenLeft
屏幕分辨率的高： window.screen.height
屏幕分辨率的宽： window.screen.width
屏幕可用工作区高度： window.screen.availHeight
屏幕可用工作区宽度： window.screen.availWidth

JQuery:

$(document).ready(function(){
alert($(window).height()); //浏览器当前窗口可视区域高度
alert($(document).height()); //浏览器当前窗口文档的高度
alert($(document.body).height());//浏览器当前窗口文档body的高度
alert($(document.body).outerHeight(true));//浏览器当前窗口文档body的总高度 包括border padding margin
alert($(window).width()); //浏览器当前窗口可视区域宽度
alert($(document).width());//浏览器当前窗口文档对象宽度
alert($(document.body).width());//浏览器当前窗口文档body的宽度
alert($(document.body).outerWidth(true));//浏览器当前窗口文档body的总宽度

###### 当数据量很大的时候，更细致的分析(https://juejin.im/post/58b545f0b123db005734634e)

问题：

1.设置阀值，不要等到最后再拉动加载，比如可以提前一页

2.top，temp，bottom三块，滚动过程中不断改变数组中数据，保证数据长度一定。

3.dom操作是阻塞的

衡量标准：

1.使用window.performance

HTML5带来的performance API功能强大。我们可以使用其performance.now()精确计算程序执行时间。performance.now()与Date.now()不同的是，返回了以微秒（百万分之一秒）为单位的时间，更加精准。并且与 Date.now() 会受系统程序执行阻塞的影响不同，performance.now() 的时间是以恒定速率递增的，不受系统时间的影响（系统时间可被人为或软件调整）。

2.使用console.time方法与console.timeEnd方法

其中console.time方法用于标记开始时间，console.timeEnd方法用于标记结束时间，并且将结束时间与开始时间之间经过的毫秒数在控制台中输出。



解决思路：

但是我这里想从移动端主要浏览器处理滚动的方式入手，来思考这个问题：

1）在Android机器上，用户滚动屏幕时，滚动事件高频率发生——在Galaxy－SIII手机上，大约频率是一秒一百次。这意味着，滚动处理函数也被调用了数百次，而这些又都是成本较大的函数。

2）在Safari浏览器上，我们遇到的问题恰恰是相反的：用户每次滚动屏幕时，滚动事件只在滚动动画停止时才触发。当用户在iPhone上滚动屏幕时，不会运行更新界面的代码（滚动停止时才会运行一次）。



“截流和防抖动函数”（Throttle和Debounce）。
简单总结一下：

1）Throttle允许我们限制激活响应的数量。我们可以限制每秒回调的数量。反过来，也就是说在激活下一个回调之前要等待多少时间;

2）Debounce意味着当事件发生时，我们不会立即激活回调。相反，我们等待一定的时间并检查相同的事件是否再次触发。如果是，我们重置定时器，并再次等待。如果在等待期间没有发生相同的事件，我们就立即激活回调。

##### 

基于以上，我的解决方案是既不同于Throttle，也不同于Debounce，但是和这两个思想，尤其是Throttle又比较类似：把滚动事件替换为一个带有计时器的滚动处理程序，每100毫秒进行简单检查，看这段时间内用户是否滚动过。如果没有，则什么都不做；如果有，就进行处理。

其中，是否发生滚动由lastScrollY === window.scrollY来判断。 document.body.scrollTop



DOM回收

每加载一次数据，就生成“.page-container .J-PageContainer_页数”的div，在滚动多屏之后，早已移除视窗的div的子节点进行了remove()，并且为了保证滚动条的正确比例和防止高度塌陷，显示声明了2956px的高度。

###### 总结—一共就四点优化    

dom回收，维持dom数量。     

对于滚动事件的监听

不要等到拉到最后再加载。

墓碑（Tombstones）—先占位



