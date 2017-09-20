

## 读书笔记

### Javascript秘密花园

删除属性的唯一方法是使用 `delete` 操作符；设置属性为 `undefined` 或者 `null` 并不能真正的删除属性， 而**仅仅**是移除了属性和值的关联。

一个错误特性被经常使用，那就是扩展 `Object.prototype` 或者其他内置类型的原型对象。

这种技术被称之为 [monkey patching](http://en.wikipedia.org/wiki/Monkey_patch) 并且会破坏*封装*。虽然它被广泛的应用到一些 JavaScript 类库中比如 [Prototype](http://prototypejs.org/), 但是我仍然不认为为内置类型添加一些*非标准*的函数是个好主意。

##### 构造函数

在构造函数内部 - 也就是被调用的函数内 - `this` 指向新创建的对象 `Object`。 这个**新创建**的对象的 [`prototype`](http://bonsaiden.github.io/JavaScript-Garden/zh/#object.prototype) 被指向到构造函数的 `prototype`。

如果被调用的函数没有显式的 `return` 表达式，则隐式的会返回 `this` 对象 - 也就是新创建的对象。

ps: 什么之前修改一个实例的原型链上方法不会改变另一个实例方法。因为并没有真正改变原型链上的方法，改变的这个方法其实是写在这个实例自身上的。覆盖了原来的方法，如果用_proto_找到原型链上的方法改动，另一个也改了。

new Bar() 返回的是新创建的对象，而不是数字的字面值 2。 因此 new Bar().constructor === Bar，但是如果返回的是数字对象，结果就不同了，如下所示

```javascript
function Bar() {
    return new Number(2);
}
new Bar().constructor === Number
```

###### 用工厂模式替代构造函数

```javascript
function Foo() {
    var obj = {};
    obj.value = 'blub';

    var private = 2;
    obj.someMethod = function(value) {
        this.value = value;
    }

    obj.getPrivate = function() {
        return private;
    }
    return obj;
}
```

因为new其实就是隐式返回一个this指向的对象嘛，我自己返回一个对象。

虽然上面的方式比起 `new` 的调用方式不容易出错，并且可以充分利用[私有变量](http://bonsaiden.github.io/JavaScript-Garden/zh/#function.closures)带来的便利， 但是随之而来的是一些不好的地方。

1. 会占用更多的内存，因为新创建的对象**不能**共享原型上的方法。
2. 为了实现继承，工厂方法需要从另外一个对象拷贝所有属性，或者把一个对象作为新创建对象的原型。
3. 放弃原型链仅仅是因为防止遗漏 `new` 带来的问题，这似乎和语言本身的思想相违背。

Ps:如果 `return` 对象的左括号和 `return` 不在一行上就会出错。

##### 数组

```javascript
var foo = [1, 2, 3, 4, 5, 6];
foo.length = 3;
foo; // [1, 2, 3]

foo.length = 6;
foo; // [1, 2, 3]
```

为了更好的性能，推荐使用普通的 `for` 循环并缓存数组的 `length` 属性。 使用 `for in` 遍历数组被认为是不好的代码习惯并倾向于产生错误和导致性能问题。

##### 类型

```
Value               Class      Type
-------------------------------------
"foo"               String     string
new String("foo")   String     object
1.2                 Number     number
new Number(1.2)     Number     object
true                Boolean    boolean
new Boolean(true)   Boolean    object
new Date()          Date       object
new Error()         Error      object
[1,2,3]             Array      object
new Array(1, 2, 3)  Array      object
new Function("")    Function   function
/abc/g              RegExp     object (function in Nitro/V8)
new RegExp("meow")  RegExp     object (function in Nitro/V8)
{}                  Object     object
new Object()        Object     object
```

可以看出来大部分Type都收Object，我们用Object.prototype.toString.call(obj).slice(8, -1);来判断Class("[object Array]")

##### `setTimeout` 和 `setInterval`

当回调函数的执行被阻塞时，`setInterval` 仍然会发布更多的回调指令。在很小的定时间隔情况下，这会导致回调函数被堆积起来。

解决方法：

```javascript
function foo(){
    // 阻塞执行 1 秒
    setTimeout(foo, 100);
}
foo();
```

**绝对不要**使用字符串作为 `setTimeout` 或者 `setInterval` 的第一个参数， 这么写的代码明显质量很差。当需要向回调函数传递参数时，可以创建一个*匿名函数*，在函数内执行真实的回调函数。

另外，应该避免使用 `setInterval`，因为它的定时执行不会被 JavaScript 阻塞。





### 深入理解javascript—编写高质量代码和设计模式

##### 最小全局变量 

```javascript
var a = b = 0;//b就成了全局变量
```

隐式全局变量和明确定义的全局变量间有些小的差异，就是通过 delete 操作符让变量未定义的能力。

- 通过 var 创建的全局变量（任何函数之外的程序中创建）是不能被删除的。
- 无var创建的隐式全局变量（无视是否在函数中创建）是能被删除的。

这表明，在技术上，隐式全局变量并不是真正的全局变量，但它们是全局对象的属性。属性是可以通过 delete 操作符删除的，而变量是不能的

##### 访问全局变量

```javascript
var global = (function () {
   return this;
}());
```

##### 单 var 形式（Single var Pattern）

在函数顶部使用单 var 语句是比较有用的一种形式，其好处在于：

- 提供了一个单一的地方去寻找功能所需要的所有局部变量
- 防止变量在定义之前使用的逻辑错误
- 帮助你记住声明的全局变量，因此较少了全局变量//zxx:此处我自己是有点晕乎的…
- 少代码（类型啊传值啊单线完成）

```javascript
function func() {
   var a = 1,
       b = 2,
       sum = a + b,
       myobject = {},
       i,
       j;
   // function body...
}
```

##### for循环

```javascript
function looper() {
   var i = 0,
        max,
        myarray = [];
   // ...
   for (i = 0, max = myarray.length; i < max; i++) {
      // 使用myarray[i]做点什么
   }
}
```

循环中尽量不要每次去求长度，性能影响很多。

##### for...in

在 for-in 中，属性列表的顺序（序列）是不能保证的。所以最好数组使用正常的 for 循环，对象使用 for-in 循环。

##### 字符串转换成数值

```javascript
+"08" // 结果是 8
Number("08") // 8
parseInt('08') //性能不行。因为不是简单的转化，如果你想输入例如“08 hello”，parseInt()将返回数字，而其它以 NaN 告终。
```

##### 将声明变量和函数区分

对于构造函数，可以使用大驼峰式命名法(upper camel case)，如MyConstructor()。对于函数和方法名称，你可以使用小驼峰式命名法(lower camel case)，像是 myFunction()， calculateArea()和 getFirstName()。

要是变量不是函数呢？开发者通常使用小驼峰式命名法，但还有另外一种做法就是所有单词小写以下划线连接：例如，first_name， favorite_bands，和 old_company_name，这种标记法帮你直观地区分函数和其他标识——原型和对象。

#### 全面解析 Module 模式

##### 引用全局变量

首先我们来看看 Module 模式的基本特征：

1. 模块化，可重用
2. 封装了变量和 function，和全局的 namaspace 不接触，松耦合
3. 只暴露可用 public 的方法，其它私有方法全部隐藏

先看一下最简单的一个实现，代码如下：

```javascript
var Calculator = function (eq) {
    //这里可以声明私有成员
    var eqCtl = document.getElementById(eq);
    return {
        // 暴露公开的成员
        add: function (x, y) {
            var val = x + y;
            eqCtl.innerHTML = val;
        }
    };
};
```

##### 关于闭包

```javascript
(function ($, YAHOO) {
    // 这里，我们的代码就可以使用全局的jQuery对象了，YAHOO也是一样
} (jQuery, YAHOO));

var blogModule = (function () {
    var my = {}, privateName = "博客园";
    function privateAddTopic(data) {
        // 这里是内部处理代码
    }
    my.Name = privateName;
    my.AddTopic = function (data) {
        privateAddTopic(data);
    };
    return my;
} ());    //将变量传入全局
```

##### 扩展

Module 模式的一个限制就是所有的代码都要写在一个文件，但是在一些大型项目里，将一个功能分离成多个文件是非常重要的，因为可以多人合作易于开发。

###### 松散耦合扩展

```javascript
var blogModule = (function (my) {
    my.AddPhoto = function () {
        //添加内部代码  
    };
    return my;
} (blogModule|| {}));  //通过||可以保证结构
```

###### 紧耦合扩展

虽然松耦合扩展很牛叉了，但是可能也会存在一些限制，比如你没办法重写你的一些属性或者函数，也不能在初始化的时候就是用 Module 的属性。紧耦合扩展限制了加载顺序，但是提供了我们重载的机会，看如下例子：

```javascript
var blogModule = (function (my) {
    var oldAddPhotoMethod = my.AddPhoto;
    my.AddPhoto = function () {
        // 重载方法，依然可通过oldAddPhotoMethod调用旧的方法
    };
    return my;
} (blogModule));
```

通过这种方式，我们达到了重载的目的，当然如果你想在继续在内部使用原有的属性，你可以调用 oldAddPhotoMethod 来用。

###### 子模块

最后一个也是最简单的使用方式，那就是创建子模块

```
blogModule.CommentSubModule = (function () {
    var my = {};
    // ...
    return my;
} ());
```

尽管非常简单，我还是把它放进来了，因为我想说明的是子模块也具有一般模块所有的高级使用方式，也就是说你可以对任意子模块再次使用上面的一些应用方法。

##### 自执行函数

function(){}() 这样为什么不行？因为在解析器解析全局的 function 或者 function 内部 function 关键字的时候，默认是认为 function 声明，而不是 function 表达式，如果你不显示告诉编译器，它默认会声明成一个缺少名字的 function，并且抛出一个语法错误信息，因为 function 声明需要一个名字。

```javascript
// 下面这个function在语法上是没问题的，但是依然只是一个语句
// 加上括号()以后依然会报错，因为分组操作符需要包含表达式
function foo(){ /* code */ }(); // SyntaxError: Unexpected token )
// 但是如果你在括弧()里传入一个表达式，将不会有异常抛出
// 但是foo函数依然不会执行
function foo(){ /* code */ }( 1 ); 
// 因为它完全等价于下面这个代码，一个function声明后面，又声明了一个毫无关系的表达式： 
function foo(){ /* code */ } 
( 1 );
```

要解决上述问题，非常简单，我们只需要用大括弧将代码的代码全部括住就行了，因为 JavaScript 里括弧()里面不能包含语句，所以在这一点上，解析器在解析 function 关键字的时候，会将相应的代码解析成 function 表达式，而不是 function 声明。

### 图解http

##### 一次通讯过程

“我们用 HTTP 举例来说明，首先作为发送端的客户端在应用层（HTTP 协议）发出一个想看某个 Web 页面的 HTTP 请求。

接着，为了传输方便，在传输层（TCP 协议）把从应用层处收到的数据（HTTP 请求报文）进行分割，并在各个报文上打上标记序号及端口号后转发给网络层。

在网络层（IP 协议），增加作为通信目的地的 MAC 地址后转发给链路层。这样一来，发往网络的通信请求就准备齐全了。

接收端的服务器在链路层接收到数据，按序往上层发送，一直到应用层。当传输到应用层，才能算真正接收到由客户端发送过来的 HTTP 请求。”

“发送端在层与层之间传输数据时，每经过一层时必定会被打上一个该层所属的首部信息。反之，接收端在层与层传输数据时，每经过一层时会把对应的首部消去。”

###### ip协议

“IP 间的通信依赖 MAC 地址。在网络上，通信的双方在同一局域网（LAN）内的情况是很少的，通常是经过多台计算机和网络设备中转才能连接到对方。而在进行中转时，会利用下一站中转设备的 MAC 地址来搜索下一个中转目标。这时，会采用 ARP 协议（Address Resolution Protocol）。ARP 是一种用以解析地址的协议，根据通信方的 IP 地址就可以反查出对应的 MAC 地址。”

###### TCP协议

“TCP 位于传输层，提供可靠的字节流服务。

所谓的字节流服务（Byte Stream Service）是指，为了方便传输，将大块数据分割成以报文段（segment）为单位的数据包进行管理。而可靠的传输服务是指，能够把数据准确可靠地传给对方。一言以蔽之，TCP 协议为了更容易传送大数据才把数据分割，而且 TCP 协议能够确认数据最终是否送达到对方。”

“发送端首先发送一个带 SYN 标志的数据包给对方。接收端收到后，回传一个带有 SYN/ACK 标志的数据包以示传达确认信息。最后，发送端再回传一个带 ACK 标志的数据包，代表“握手”结束。”

##### url和uri

“URI 用字符串标识某一互联网资源，而 URL 表示资源的地点（互联网上所处的位置）。可见 URL 是 URI 的子集。”

##### 持久链接

“想出了持久连接（HTTP Persistent Connections， “HTTP keep-alive 或 HTTP connection reuse）的方法。持久连接的特点是，只要任意一端没有明确提出断开连接，则保持 TCP 连接状态。”

“持久连接使得多数请求以管线化（pipelining）方式发送成为可能。从前发送请求后需等待并收到响应，才能发送下一个请求。管线化技术出现后，不用等待响应亦可直接发送下一个请求。

这样就能够做到同时并行发送多个请求，而不需要一个接一个地等待响应了。”

###### 使用cookie

第一次请求后，相应头中会有setCookie，之后每次请求头都会带cookie信息。这样就保持联系了

##### 常用的内容编码有以下几种

gzip（GNU zip）

compress（UNIX 系统的标准压缩）

deflate（zlib）

identity（不进行编码）

##### 内容协商

“当浏览器的默认语言为英语或中文，访问相同 URI 的 Web 页面时，则会显示对应的英语版或中文版的 Web 页面。这样的机制称为内容协商（Content Negotiation）”

“包含在请求报文中的某些首部字段（如下）就是判断的基准。这些首部字段的详细说明请参考下一章。

Accept

Accept-Charset

Accept-Encoding

Accept-Language

Content-Language”

“内容协商技术有以下 3 种类型。

服务器驱动协商（Server-driven Negotiation）

由服务器端进行内容协商。以请求的首部字段为参考，在服务器端自动处理。但对用户来说，以浏览器发送的信息作为判定的依据，并不一定能筛选出最优内容。

客户端驱动协商（Agent-driven Negotiation）

由客户端进行内容协商的方式。用户从浏览器显示的可选项列表中手动选择。还可以利用 JavaScript 脚本在 Web 页面上自动进行上述选择。比如按 OS 的类型或浏览器类型，自行切换成 PC 版页面或手机版页面。

透明协商（Transparent Negotiation）

是服务器驱动和客户端驱动的结合体，是由服务器端和客户端各自进行内容协商的一种方法。”

##### 转发机制 

###### 代理

“代理服务器的基本行为就是接收客户端发送的请求后转发给其他服务器。代理不改变请求 URI，会直接发送给前方持有资源的目标服务器。”

“缓存代理

代理转发响应时，缓存代理（Caching Proxy）会预先将资源的副本（缓存）保存在代理服务器上。

当代理再次接收到对相同资源的请求时，就可以不从源服务器那里获取资源，而是将之前缓存的资源作为响应返回。

透明代理

转发请求或响应时，不对报文做任何加工的代理类型被称为透明代理（Transparent Proxy）。反之，对报文内容进行加工的代理被称为非透明代理。”

###### 网关

“网关的工作机制和代理十分相似。而网关能使通信线路上的服务器提供非 HTTP 协议服务。

利用网关能提高通信的安全性，因为可以在客户端与网关之间的通信线路上加密以确保连接的安全。比如，网关可以连接数据库，使用 SQL 语句查询数据。另外，在 Web 购物网站上进行信用卡结算时，网关可以和信用卡结算系统联动。”

###### 不足

“HTTP 主要有这些不足，例举如下。

通信使用明文（不加密），内容可能会被窃听

不验证通信方的身份，因此有可能遭遇伪装

无法证明报文的完整性，所以有可能已遭篡改”







