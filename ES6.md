## ES6入门  个人总结

#### ES6生命变量的六种方式

var function let const import class

#### 1.let/const

##### let

1.块级作用域

```javascript
var funcs = [],
    object = {
        a: true,
        b: true,
        c: true
    };

for (let key in object) {
    funcs.push(function() {
        console.log(key);
    });
}

funcs.forEach(function(func) {
    func();     // outputs "a", then "b", then "c"
});				//if change to var then outputs c c c
```

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

##### const

声明一个只读常量，一旦声明不能改变。声明也必须带着值

实质是，对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指针，`const`只能保证这个指针是固定的，至于它指向的数据结构是不是可变的，就完全不能控制了。也就是说，可以再往对象里填东西，但不能重复声明。

const同时也满足，块级作用域，变量不提升，暂时性死区。

###### const必须生命的时候赋值

##### 块级作用域

在ES6浏览器中，允许块级作用域中声明函数

因为外边看不到块里边的变量，所以提案，do用来得到块级作用域中的变量

```javascript
let x = do {
  let t = f();
  t * t + 1;
};
```

let与const表现相同，因为在每个块级作用于中都没有被改变。for循环就不行，因为i++试图更改const

```javascript
var funcs = [],
    object = {
        a: true,
        b: true,
        c: true
    };

// doesn't cause an error
for (const key in object) {
    funcs.push(function() {
        console.log(key);
    });
}

funcs.forEach(function(func) {
    func();     // outputs "a", then "b", then "c"
});
```

##### 顶层对象

一般我们顶层对象和全局是不区分的。let和const声明的全局对象不属于顶层对象（window，global）

#### 2.函数的扩展

##### 基本的用法

```javascript
function log(x, y = 'World') {
  console.log(x, y);		//设置初始值不能有重复的参数
}

function foo(x = 5) {
  let x = 1; // error
  const x = 2; // error
}

function fetch(url, { body = '', method = 'GET', headers = {} }) {
  console.log(method);					//与赋值结构一同使用
}
fetch('http://example.com', {})
// "GET"
fetch('http://example.com')
// 报错

function f(x = 1, y) {
  return [x, y];			//省略值只能在末尾
}
f() // [1, undefined]
f(2) // [2, undefined])
f(, 1) // 报错
f(undefined, 1) // [1, 1]

(function (a, b, c = 5) {}).length // 2。 length属性返回参数没有默认值的个数
(function (a, b = 1, c) {}).length // 1。 在尾部的参数不计入
(function(...args) {}).length // 0

function f(y = x) {
  let x = 2;		//赋值是在一开始完成的
  console.log(y);
}
f() // ReferenceError: x is not defined


var x = 1;			//这个比较复杂，如果把var去掉，foo()的结果就是2.
function foo(x, y = function() { x = 2; }) {
  var x = 3;
  y();
  console.log(x);
}

foo() // 3
x // 1
```

##### rest参数

```javascript
const sortNumbers = (...numbers) => numbers.sort(); //rest本来就是数组，不需要像arguments一样转

function f(a, ...b, c) {
 						 // 不能这么些，rest之后不能再有其他参数，会报错
}
```

##### 严格模式

规定只要函数参数使用了默认值、解构赋值、或者扩展运算符，那么函数内部就不能显式设定为严格模式，否则会报错。禁止这种写法的原因是因为先解析参数，可是函数执行才判断严格模式。

##### name属性

```javascript
var f = function () {};
// ES5
f.name // ""
// ES6		
f.name // "f"

function foo() {};
foo.bind({}).name // "bound foo"  会加bound
```

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

var getTempItem = id => ({ id: id, name: "Temp" }); //直接返回对象的话要加括号


// ES6   这就是箭头函数的this，就是直接绑定不变且根据父亲this的指向
function foo() {
  setTimeout(() => {
    console.log('id:', this.id);
  }, 100);
}
// ES5
function foo() {
  var _this = this;
  setTimeout(function () {
    console.log('id:', _this.id);
  }, 100);
}
```

除了`this`，以下三个变量在箭头函数之中也是不存在的，指向外层函数的对应量： `arguments`、`super`、`new.target`。由于箭头函数没有自己的`this`，所以当然也就不能用`call()`、`apply()`、`bind()`这些方法去改变`this`的指向。

##### 替换掉call，apply，bind绑定

```javascript
foo::bar;
// 等同于
bar.bind(foo);
```

##### 尾部调用优化！！！

我们知道，函数调用会在内存形成一个“调用记录”，又称“调用帧”（call frame），保存调用位置和内部变量等信息。如果在函数`A`的内部调用函数`B`，那么在`A`的调用帧上方，还会形成一个`B`的调用帧。等到`B`运行结束，将结果返回到`A`，`B`的调用帧才会消失。如果函数`B`内部还调用函数`C`，那就还有一个`C`的调用帧，以此类推。所有的调用帧，就形成一个“调用栈”（call stack）。

```javascript
function f() {
  let m = 1;
  let n = 2;
  return g(m + n);
}
f();
// 等同于
function f() {
  return g(3);
}
f();
```

##### 尾部递归！！！（栈溢出）

```javascript
function Fibonacci (n) {
  if ( n <= 1 ) {return 1};
  return Fibonacci(n - 1) + Fibonacci(n - 2);
}


function Fibonacci2 (n , ac1 = 1 , ac2 = 1) {
  if( n <= 1 ) {return ac2};
  return Fibonacci2 (n - 1, ac2, ac1 + ac2);
}
```

改写有两种：

1.函数式编程有一个概念，叫做柯里化（currying），意思是将多参数的函数转换成单参数的形式。这里也可以使用柯里化。f(x,y,z)===>f(x)g(y)n(z)

2.使用默认值，就可以只传一个参数

ES6 的尾调用优化只在严格模式下开启，正常模式是无效的。

这是因为在正常模式下，函数内部有两个变量，可以跟踪函数的调用栈。

- `func.arguments`：返回调用时函数的参数。
- `func.caller`：返回调用当前函数的那个函数。

尾调用优化发生时，函数的调用栈会改写，因此上面两个变量就会失真。严格模式禁用这两个变量，所以尾调用模式仅在严格模式下生效。

###### 允许最后一个参数有分号

#### 3.Promise基本用法

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

##### Promise.all()

```javascript
var p = Promise.all([p1, p2, p3]);
```

当三个都resolve的时候才会继续往下走，有一个reject了就直接reject了。返回的是一个数组，方法参数可以不是数组

##### Promise.race()

```
var p = Promise.race([p1, p2, p3]);
```

只要`p1`、`p2`、`p3`之中有一个实例率先改变状态，`p`的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给`p`的回调函数。会先把p1包装成Promise

##### Promise.resolve()

```javascript
var jsPromise = Promise.resolve($.ajax('/whatever.json'));
```

有时需要将现有对象转为Promise对象，`Promise.resolve`方法就起到这个作用

##### Promise.reject()

##### Promise.done()

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

##### Promise.finally()

`finally`方法用于指定不管Promise对象最后状态如何，都会执行的操作。它与`done`方法的最大区别，它接受一个普通的回调函数作为参数，该函数不管怎样都必须执行。

#### 4.变量的结构赋值

##### 数组

等号右边不是可遍历的结构，将会报错。Set也可以结构赋值

```javascript
let [a, b, c] = [1, 2, 3];
let [x, y = 'b'] = ['a']; // x='a', y='b'
let [x = 1] = [null];  x // null  必须要严格等于undefined才会使用默认值
let [x = f()] = [1];  //惰性求值
let [x = 1, y = x] = [1, 2]; // x=1; y=2
```

##### 对象

```javascript
let { foo, bar } = { foo: "aaa", bar: "bbb" };  //按照属性名来对应
let { foo: baz } = { foo: "aaa", bar: "bbb" };
baz // "aaa"
foo // error: foo is not defined
var {x: y = 3} = {x: 5}; y // 5
let arr = [1, 2, 3];
let {0 : first, [arr.length - 1] : last} = arr;
first // 1
last // 3
```

##### 字符串

```javascript
const [a, b, c, d, e] = 'hello';
let {length : len} = 'hello';
```

##### 数值和布尔值

解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。

```javascript
let {toString: s} = 123;
s === Number.prototype.toString // true
```

##### 函数

```javascript
[[1, 2], [3, 4]].map(([a, b]) => a + b);  // [ 3, 7 ]
function move({x = 0, y = 0} = {}) {
  return [x, y];				//设置默认值
}
```

##### 圆括号问题

变量声明不能使用圆括号，模式（就是一个对象的感觉）不能使用

###### 用途

```javascript
let jsonData = {
  id: 42,
  status: "OK",
  data: [867, 5309]
};
let { id, status, data: number } = jsonData;  //json快速赋值

let x = 1;
let y = 2;
[x, y] = [y, x];				//交换

for (let [key, value] of map) {
  console.log(key + " is " + value);	//遍历Map
}
```

#### 5.数组的扩展

##### 扩展运算符

替代apply

```javascript
f.apply(null, args);
f(...args);
// ES5 的写法
Math.max.apply(null, [14, 3, 77])
// ES6 的写法
Math.max(...[14, 3, 77])

arr1.push(...arr2);
```

应用

```javascript
// ES5
[1, 2].concat(more)
// ES6
[1, 2, ...more]

// ES5
a = list[0], rest = list.slice(1)
// ES6
[a, ...rest] = list

[...'hello']  // [ "h", "e", "l", "l", "o" ] 将字符串转换成数组

var nodeList = document.querySelectorAll('div');
var array = [...nodeList];   　　　　　　//将Iterator 接口的对象转换成真正数组
```

##### Array.from

`Array.from`方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象。第一个参数为对象，第二个参数可以像map一样操作，最后一个参数绑定this

```javascript
Array.from(arrayLike, x => x * x);
```

##### Array.of

`Array.of`方法用于将一组值，转换为数组

主要其实是为了弥补Array(2)这个bug，要是我想这样呢

```javascript
Array.of(3) // [3]
```

##### copyWithin

```javascript
Array.prototype.copyWithin(target, start = 0, end = this.length)

[1, 2, 3, 4, 5].copyWithin(0, 3) // [4, 5, 3, 4, 5]
```

##### find && findindex

```javascript
[1, 4, -5, 10].find((n) => n < 0)  // -5
```

主要是弥补了indexOf无法识别NAN，因为其内部用的是‘===’来判断的

##### includes

感觉和上边这个差不多，只不过返回T/F。两个共同弥补indexOf

##### fill

全部擦除然后添上。允许第二，三个参数选择起始和结束位置

##### entries()，keys() 和 values()

最后一点！数组的空位处理标准都不一样，ES6按undefined来。总之避免使用空位



#### 6.对象的扩展

##### 属性的简洁表示

```javascript
var baz = {foo};
 return {x, y};
// 等同于
var baz = {foo: foo};
```

class是关键字，不要使用这种方式

##### 属性名表达式

```javascript
obj['a' + 'bc'] = 123;

let obj = {
  [propKey]: true,
  ['a' + 'bc']: 123
};
```

属性的简洁表示和属性名表达式不能同时使用

如果属性名表达式是一个对象，命名就是`[object Object]`，这一点要特别小心。

##### Object.is()

```javascript
Object.is(+0, -0) // false
Object.is(NaN, NaN) // true
```

近似于三等号，只是有上边这两个区别。

##### Object.assign()

将源对象（source）的所有可枚举属性，复制到目标对象（target）。浅复制

```javascript
Object.assign(target, source1, source2);

var v1 = 'abc';
var v2 = true;
var v3 = 10;
var obj = Object.assign({}, v1, v2, v3);//除了字符串其他基本类型都不行
console.log(obj); // { "0": "a", "1": "b", "2": "c" }

var target = { a: { b: 'c', d: 'e' } }
var source = { a: { b: 'hello' } }
Object.assign(target, source)  // { a: { b: 'hello' } }  冲突就直接覆盖

Object.assign([1, 2, 3], [4, 5]) // [4, 5, 3] 把数组视为对象

function clone(origin) {
  return Object.assign({}, origin);
}			//克隆对象

options = Object.assign({}, DEFAULTS, options);//这样可以用来设置默认值。最好用简单类型
```

如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。

如果该参数不是对象，则会先转成对象，然后返回。

##### 属性的遍历

ES6 一共有5种方法可以遍历对象的属性。

ps：`JSON.stringify()`：只串行化对象自身的可枚举的属性

**（1）for...in**

`for...in`循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。

**（2）Object.keys(obj)**

`Object.keys`返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）。

**（3）Object.getOwnPropertyNames(obj)**

`Object.getOwnPropertyNames`返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）。

**（4）Object.getOwnPropertySymbols(obj)**

`Object.getOwnPropertySymbols`返回一个数组，包含对象自身的所有 Symbol 属性。

**（5）Reflect.ownKeys(obj)**

`Reflect.ownKeys`返回一个数组，包含对象自身的所有属性，不管属性名是 Symbol 或字符串，也不管是否可枚举。

以上的5种方法遍历对象的属性，都遵守同样的属性遍历的次序规则。

- 首先遍历所有属性名为数值的属性，按照数字排序。
- 其次遍历所有属性名为字符串的属性，按照生成时间排序。
- 最后遍历所有属性名为 Symbol 值的属性，按照生成时间排序。

##### Null传到运算符

```javascript
const firstName = message?.body?.user?.firstName || 'default';
```

上面代码有三个`?.`运算符，只要其中一个返回`null`或`undefined`，就不再往下运算，而是返回`undefined`。



#### 7.Symbol

ES5 的对象属性名都是字符串，这容易造成属性名的冲突。比如，你使用了一个他人提供的对象，但又想为这个对象添加新的方法（mixin 模式），新方法的名字就有可能与现有方法产生冲突。如果有一种机制，保证每个属性的名字都是独一无二的就好了，这样就从根本上防止属性名的冲突。这就是 ES6 引入`Symbol`的原因



#### 8.Proxy



