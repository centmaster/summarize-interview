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