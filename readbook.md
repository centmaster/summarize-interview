

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

##### 将生命变量和函数区分

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

