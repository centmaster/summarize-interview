## ES6入门  个人总结

#### ES6生命变量的六种方式

let const promise reflect proxy generator decorator Symbol Iterator 结构赋值

Array: .from .of …(扩展运算符) .copyWithin .find .findindex .includes .fill .entires .keys .values

Object: 属性表达式 .is .assign 

class

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

###### const必须声明的时候赋值

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


var getJSON = function(url) {
  var promise = new Promise(function(resolve, reject){
    var client = new XMLHttpRequest();
    client.open("GET", url);
    client.onreadystatechange = handler;
    client.responseType = "json";
    client.setRequestHeader("Accept", "application/json");
    client.send();

    function handler() {
      if (this.readyState !== 4) {
        return;
      }
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };
  });

  return promise;
};

getJSON("/posts.json").then(function(json) {
  console.log('Contents: ' + json);
}, function(error) {
  console.error('出错了', error);
});
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



#### 8.Proxy&&Reflect

##### Proxy

写在一起是因为是配套使用的。

Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。

- get() set() has() deleteProperty() difineProperty()//与属性有关的方法
- getOwnPropertyDescriptor() ownKeys()//Own的属性描述和属性keys
- getPrototypeOf() setPrototypeOf()//与原型有关的方法
- isExtensible()判断是否可以扩展 preventExtensions()阻止添加新属性
- apply()//调用方法有关
- construct()//和new 有关的
- revocabal //用来取消proxy实例

```javascript
var proxy = new Proxy(target, handler);

var obj = new Proxy({}, {
  get: function (target, key, receiver) {
    console.log(`getting ${key}!`);
    return Reflect.get(target, key, receiver);
  },
  set: function (target, key, value, receiver) {
    console.log(`setting ${key}!`);
    return Reflect.set(target, key, value, receiver);
  }
});
```

this的指向问题：指向proxy而不是指向对象



##### Reflect

1.将`Object`对象的一些明显属于语言内部的方法（比如`Object.defineProperty`），放到`Reflect`对象上。现阶段，某些方法同时在`Object`和`Reflect`对象上部署，未来的新方法将只部署在`Reflect`对象上。也就是说，从`Reflect`对象上可以拿到语言内部的方法。

2.修改某些`Object`方法的返回结果，让其变得更合理。比如，`Object.defineProperty(obj, name, desc)`在无法定义属性时，会抛出一个错误，而`Reflect.defineProperty(obj, name, desc)`则会返回`false`。

3.让`Object`操作都变成函数行为。某些`Object`操作是命令式

```javascript
// 老写法
'assign' in Object // true

// 新写法
Reflect.has(Object, 'assign') // true
```

4.`Reflect`对象的方法与`Proxy`对象的方法一一对应，只要是`Proxy`对象的方法，就能在`Reflect`对象上找到对应的方法。这就让`Proxy`对象可以方便地调用对应的`Reflect`方法，完成默认行为，作为修改行为的基础。也就是说，不管`Proxy`怎么修改默认行为，你总可以在`Reflect`上获取默认行为。



#### 9.Iterator与for…of 循环

因为现在已经有四种数据类型，Iterator 接口的目的，就是为所有数据结构，提供了一种统一的访问机制，即`for...of`循环。

##### 默认Iterator接口———[Symbol.iterator]

Iterator 接口的目的，就是为所有数据结构，提供了一种统一的访问机制，即`for...of`循环。当使用`for...of`循环遍历某种数据结构时，该循环会自动去寻找 Iterator 接口。

原生具备 Iterator 接口的数据结构如下。

- Array
- Map
- Set
- String
- TypedArray
- 函数的 arguments 对象

```javascript
const obj = {
  [Symbol.iterator] : function () {
    return {
      next: function () {
        return {
          value: 1,
          done: true
        };
      }
    };
  }			//每次调用next方法，都会返回一个代表当前成员的信息对象，具有value和done两个属性。
};

NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];//简便的赋方法

let iterable = {
  a: 'a',
  b: 'b',
  c: 'c',
  length: 3,
  [Symbol.iterator]: Array.prototype[Symbol.iterator]
};
for (let item of iterable) {
  console.log(item); // undefined, undefined, undefined  键名不是数字不行
}
```

##### 3.调用Iterator接口的场合

1.结构赋值

2.扩展运算符（…)

3.yield

4.遍历

##### 4.遍历器对象的return(),throw()

遍历器对象除了具有`next`方法，还可以具有`return`方法和`throw`方法。如果你自己写遍历器对象生成函数，那么`next`方法是必须部署的，`return`方法和`throw`方法是否部署是可选的。

`return`方法的使用场合是，如果`for...of`循环提前退出（通常是因为出错，或者有`break`语句或`continue`语句），就会调用`return`方法。如果一个对象在完成遍历前，需要清理或释放资源，就可以部署`return`方法。

##### 5.for…of 好在哪里

forEach:不能break跳出

for…in:

主要是用来遍历对象。但是遍历对象其实也能用for(x of arr.keys())

遍历数组有三个问题：（1)index本来是数字，它处理成字符串

​					 (2)遍历顺序不定

​					 (3)原型链上其他的值也会被遍历到

##### 6.为对象添加Iterator接口

```javascript
let obj = {
  data: [ 'hello', 'world' ],
  [Symbol.iterator]() {
    const self = this;
    let index = 0;
    return {
      next() {
        if (index < self.data.length) {
          return {
            value: self.data[index++],
            done: false
          };
        } else {
          return { value: undefined, done: true };
        }
      }
    };
  }
};
```

#### 10.Generator函数

然后，Generator 函数的调用方法与普通函数一样，也是在函数名后面加上一对圆括号。不同的是，调用 Generator 函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象，也就是上一章介绍的遍历器对象（Iterator Object）。

```javascript
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}
var hw = helloWorldGenerator();
hw.next()
// { value: 'hello', done: false }
hw.next()
// { value: 'world', done: false }
hw.next()
// { value: 'ending', done: true }
hw.next()
```

与Iterator接口的关系

```javascript
var myIterable = {};
myIterable[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};
[...myIterable] // [1, 2, 3]

function* gen(){
  // some code
}
var g = gen();
g[Symbol.iterator]() === g  		//他自己本身返回的就是iterator
```

next方法

```javascript
function* foo(x) {
  var y = 2 * (yield (x + 1));
  var z = yield (y / 3);
  return (x + y + z);
}

var a = foo(5);
a.next() // Object{value:6, done:false}
a.next() // Object{value:NaN, done:false}
a.next() // Object{value:NaN, done:true}

var b = foo(5);
b.next() // { value:6, done:false }
b.next(12) // { value:8, done:false }
b.next(13) // { value:42, done:true }
```

for…of遍历

```javascript
function *foo() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
  return 6;
}

for (let v of foo()) {
  console.log(v);
}
// 1 2 3 4 5 		一旦done:true 循环就会终止
```

利用generator为对象添加Iterator接口

```javascript
function* objectEntries(obj) {
  let propKeys = Reflect.ownKeys(obj);

  for (let propKey of propKeys) {
    yield [propKey, obj[propKey]];
  }
}

let jane = { first: 'Jane', last: 'Doe' };

for (let [key, value] of objectEntries(jane)) {
  console.log(`${key}: ${value}`);
}
// first: Jane
// last: Doe
```

当然也可以加上遍历器接口

```javascript
function* objectEntries() {
  let propKeys = Object.keys(this);

  for (let propKey of propKeys) {
    yield [propKey, this[propKey]];
  }
}

let jane = { first: 'Jane', last: 'Doe' };

jane[Symbol.iterator] = objectEntries;

for (let [key, value] of jane) {
  console.log(`${key}: ${value}`);
}
// first: Jane
// last: Doe
```

其他调用Iterator接口的也可以使用。这就可以把generator看成一种数据类型

```javascript
function* numbers () {
  yield 1
  yield 2
  return 3
  yield 4
}
// 扩展运算符
[...numbers()] // [1, 2]

// Array.from 方法
Array.from(numbers()) // [1, 2]

// 解构赋值
let [x, y] = numbers();
x // 1
y // 2

// for...of 循环
for (let n of numbers()) {
  console.log(n)
}
// 1
// 2
```

return,throw

```javascript
function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

var g = gen();

g.next()        // { value: 1, done: false }
g.return('foo') // { value: "foo", done: true }
g.next()        // { value: undefined, done: true }
```

可以利用yield*来用generator调用另一个generator

```javascript
function* foo() {
  yield 'a';
  yield 'b';
}
function* bar() {
  yield 'x';
  yield* foo();
  yield 'y';
}
// 等同于
function* bar() {
  yield 'x';
  yield 'a';
  yield 'b';
  yield 'y';
}
```

```javascript
function* inner() {
  yield 'hello!';
}

function* outer1() {
  yield 'open';
  yield inner();
  yield 'close';
}

var gen = outer1()
gen.next().value // "open"
gen.next().value // 返回一个遍历器对象
gen.next().value // "close"

function* outer2() {
  yield 'open'
  yield* inner()
  yield 'close'
}

var gen = outer2()
gen.next().value // "open"
gen.next().value // "hello!"
gen.next().value // "close"
```

实际上，任何数据结构只要有 Iterator 接口，就可以被`yield*`遍历。

如果把`g`当作普通的构造函数，并不会生效，因为`g`返回的总是遍历器对象，而不是`this`对象。

```javascript
function* g() {
  this.a = 11;
}

let obj = g();
obj.a // undefined
```

Generator函数也不能跟`new`命令一起用，会报错。因为返回的是指针，不是this，指针中有next。调用next后返回对象

那么，有没有办法让 Generator 函数返回一个正常的对象实例，既可以用`next`方法，又可以获得正常的`this`？

```javascript
function* F() {
  this.a = 1;
  yield this.b = 2;
  yield this.c = 3;
}
var f = F.call(F.prototype);

f.next();  // Object {value: 2, done: false}
f.next();  // Object {value: 3, done: false}
f.next();  // Object {value: undefined, done: true}

f.a // 1
f.b // 2
f.c // 3
```

##### 应用

```javascript
function* main() {
  var result = yield request("http://some.url");
  var resp = JSON.parse(result);
    console.log(resp.value);
}

function request(url) {
  makeAjaxCall(url, function(response){
    it.next(response);		//必须要加上参数，yield本身没有返回值
  });
}

var it = main();
it.next();
```

For…of本质是一个while循环

```javascript
var it = iterateJobs(jobs);
var res = it.next();

while (!res.done){
  var result = res.value;
  // ...
  res = it.next();
}
```

Thunk和co用来处理generator的异步处理

#### 11.async

`async`函数就是将 Generator 函数的星号（`*`）替换成`async`，将`yield`替换成`await`，仅此而已。

`async`函数的返回值是 Promise 对象，这比 Generator 函数的返回值是 Iterator 对象方便多了。你可以用`then`方法指定下一步的操作。

`async`函数返回一个 Promise 对象，可以使用`then`方法添加回调函数。当函数执行的时候，一旦遇到`await`就会先返回，等到异步操作完成，再接着执行函数体内后面的语句。

下面是一个例子。

```javascript
async function getStockPriceByName(name) {
  var symbol = await getStockSymbol(name);
  var stockPrice = await getStockPrice(symbol);
  return stockPrice;
}

getStockPriceByName('goog').then(function (result) {
  console.log(result);
});
```

`async`函数返回的 Promise 对象，必须等到内部所有`await`命令后面的 Promise 对象执行完，才会发生状态改变，除非遇到`return`语句或者抛出错误。

正常情况下，`await`命令后面是一个 Promise 对象。如果不是，会被转成一个立即`resolve`的 Promise 对象。

多个`await`命令后面的异步操作，如果不存在继发关系，最好让它们同时触发。

```javascript
// 写法一
let [foo, bar] = await Promise.all([getFoo(), getBar()]);
```

`await`命令只能用在`async`函数之中，如果用在普通函数，就会报错。



#### 12.Class

注意，定义“类”的方法的时候，前面不需要加上`function`这个关键字，直接把函数定义放进去了就可以了。另外，方法之间不需要逗号分隔，加了会报错。

```javascript
//定义类
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
  [methodName]() {
    // ...
  }
}
```

下面代码表明，类的数据类型就是函数，类本身就指向构造函数。

使用的时候，也是直接对类使用`new`命令，跟构造函数的用法完全一致。

```javascript
class Point {
  // ...
}

typeof Point // "function"
Point === Point.prototype.constructor // true

var b=new Point() //与构造函数使用方法一样,必须要加new否则报错
```

类的所有方法都定义在类的`prototype`属性上面。

```javascript
class Point {
  constructor() {
    // ...
  }

  toString() {
    // ...
  }

  toValue() {
    // ...
  }
}

// 等同于

Point.prototype = {
  constructor() {},
  toString() {},
  toValue() {},
};


//这样也可以
Object.assign(Point.prototype, {
  toString(){},
  toValue(){}
});
```

区别于ES5，类的内部所有定义的方法，都是不可枚举的（non-enumerable）

`constructor`方法是类的默认方法，通过`new`命令生成对象实例时，自动调用该方法。一个类必须有`constructor`方法，如果没有显式定义，一个空的`constructor`方法会被默认添加。

```javascript
class Point {
}

// 等同于
class Point {
  constructor() {}
}
```

子类必须在`constructor`方法中调用`super`方法，否则新建实例时会报错。这是因为子类没有自己的`this`对象，而是继承父类的`this`对象，然后对其进行加工。如果不调用`super`方法，子类就得不到`this`对象。在子类的构造函数中，只有调用`super`之后，才可以使用`this`关键字，否则会报错。这是因为子类实例的构建，是基于对父类实例加工，只有`super`方法才能返回父类实例。

```javascript
class ColorPoint extends Point {
}

// 等同于
class ColorPoint extends Point {
  constructor(...args) {
    super(...args);
  }
}
```

与 ES5 一样，实例的属性除非显式定义在其本身（即定义在`this`对象上），否则都是定义在原型上（即定义在`class`上）。

```javascript
//定义类
class Point {

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }

}

var point = new Point(2, 3);

point.toString() // (2, 3)

point.hasOwnProperty('x') // true
point.hasOwnProperty('y') // true
point.hasOwnProperty('toString') // false
point.__proto__.hasOwnProperty('toString') // true
```

```javascript
const MyClass = class Me {
  getClassName() {
    return Me.name;		//只能在内部看到结果是Me，外部读不到
  }
};
```

不存在变量提升。否则，下面这种情况，提升完因为let Foo(还没声明，没提升)，就会报错

```javascript
{
  let Foo = class {};
  class Bar extends Foo {
  }
}
```

原则上讲是不存在私有属性和方法的。

```javascript
class Widget {
  foo (baz) {
    bar.call(this, baz);
  }

  // ...曲线救国，或者用symbol
}

function bar(baz) {
  return this.snaf = baz;
}
```

私有方法使用#号。

```javascript
class Foo {
  #a;
  #b;
  #sum() { return #a + #b; }  //也相应的私有方法
  printSum() { console.log(#sum()); }
  constructor(a, b) { #a = a; #b = b; }
}
```

注意内部this的指向。说白了跟其他的方法里边包了this，调用上下文不一致一样

```javascript
class Logger {
  printName(name = 'there') {
    this.print(`Hello ${name}`);
  }

  print(text) {
    console.log(text);
  }
}

const logger = new Logger();
const { printName } = logger;
printName();


//使用箭头函数解决

class Logger {
  constructor() {
    this.printName = (name = 'there') => {
      this.print(`Hello ${name}`);
    };
  }

  // ...
}
```

类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上`static`关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。

父类的静态方法，可以被子类继承。静态方法也是可以从`super`对象上调用的。

```javascript
class Foo {
  static classMethod() {
    return 'hello';
  }
}

Foo.classMethod() // 'hello'

var foo = new Foo();
foo.classMethod()
// TypeError: foo.classMethod is not a function
```

下面的写法为`Foo`类定义了一个静态属性`prop`。

目前，只有这种写法可行，因为 ES6 明确规定，Class 内部只有静态方法，没有静态属性。

```javascript
class Foo {
}

Foo.prop = 1;
Foo.prop // 1
```

`new`是从构造函数生成实例的命令。ES6 为`new`命令引入了一个`new.target`属性，该属性一般用在在构造函数之中，返回`new`命令作用于的那个构造函数。如果构造函数不是通过`new`命令调用的，`new.target`会返回`undefined`，因此这个属性可以用来确定构造函数是怎么调用的。

```javascript
class Shape {
  constructor() {
    if (new.target === Shape) {
      throw new Error('本类不能实例化');
    }
  }
}

class Rectangle extends Shape {
  constructor(length, width) {
    super();
    // ...
  }
}

var x = new Shape();  // 报错
var y = new Rectangle(3, 4);  // 正确
```

Object.getPrototypeOf()

```javascript
Object.getPrototypeOf(ColorPoint) === Point
// true    判断一个类是否继承了另一个类
```

super关键字，既可以当作函数使用，也可以当作对象使用

第一种情况，`super`作为函数调用时，代表父类的构造函数。ES6 要求，子类的构造函数必须执行一次`super`函数。`super()`在这里相当于`A.prototype.constructor.call(this)`。代表了父类`A`的构造函数，但是返回的是子类`B`的实例

第二种情况，`super`作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。

```javascript
class A {
  p() {
    return this;
  }
}

class B extends A {
  constructor() {
    super();
    console.log(super.p()); // this是B中的this	A.prototype.p()
  }
}
```

由于`super`指向父类的原型对象，所以定义在父类实例上的方法或属性，是无法通过`super`调用的。

```javascript
class A {
  constructor() {
    this.p = 2;
  }
}

class B extends A {
  get m() {
    return super.p;
  }
}//调用不到
```

ES5 的继承，实质是先创造子类的实例对象`this`，然后再将父类的方法添加到`this`上面（`Parent.apply(this)`）。ES6 的继承机制完全不同，实质是先创造父类的实例对象`this`（所以必须先调用`super`方法），然后再用子类的构造函数修改`this`

ES6 允许继承原生构造函数定义子类，因为 ES6 是先新建父类的实例对象`this`，然后再用子类的构造函数修饰`this`，使得父类的所有行为都可以继承。

```javascript
class MyArray extends Array {
  constructor(...args) {
    super(...args);
  }
}
```

Mixin 模式指的是，将多个类的接口“混入”（mix in）另一个类。它在 ES6 的实现如下。

```javascript
function mix(...mixins) {
  class Mix {}

  for (let mixin of mixins) {
    copyProperties(Mix, mixin);
    copyProperties(Mix.prototype, mixin.prototype);
  }

  return Mix;
}

function copyProperties(target, source) {
  for (let key of Reflect.ownKeys(source)) {
    if ( key !== "constructor"
      && key !== "prototype"
      && key !== "name"
    ) {
      let desc = Object.getOwnPropertyDescriptor(source, key);
      Object.defineProperty(target, key, desc);
    }
  }
}
```

#### 13.修饰器

类的修饰

```javascript
@testable
class MyTestableClass {
  // ...
}

function testable(target) {
  target.isTestable = true;
}

MyTestableClass.isTestable // true
```

方法的修饰

```javascript
class Person {
  @readonly
  name() { return `${this.first} ${this.last}` }
}
function readonly(target, name, descriptor){
  // descriptor对象原来的值如下
  // {
  //   value: specifiedFunction,
  //   enumerable: false,
  //   configurable: true,
  //   writable: true
  // };
  descriptor.writable = false;
  return descriptor;
}

readonly(Person.prototype, 'name', descriptor);
// 类似于   修饰类不可写
Object.defineProperty(Person.prototype, 'name', descriptor);
```

为什么不能修饰函数？因为函数有变量提升

```javascript
var counter = 0;

var add = function () {
  counter++;
};

@add
function foo() {
}

//变量提升之后
@add
function foo() {
}

var counter;
var add;

counter = 0;

add = function () {
  counter++;
};
```

由于存在函数提升，使得修饰器不能用于函数。类是不会提升的，所以就没有这方面的问题。

Mixin模式

```javascript
export function mixins(...list) {
  return function (target) {
    Object.assign(target.prototype, ...list);
  };
}

import { mixins } from './mixins';

const Foo = {
  foo() { console.log('foo') }
};

@mixins(Foo)
class MyClass {}

let obj = new MyClass();
obj.foo() // "foo"
```

#### 14.Module的加载实现

ES6 模块的设计思想，是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。CommonJS 和 AMD 模块，都只能在运行时确定这些东西。比如，CommonJS 模块就是对象，输入时必须查找对象属性。

export

```javascript
export var firstName = 'Michael';
export {firstName, lastName, year};
export function multiply(x, y) {
  return x * y;//可以输出类
};
export {		//使用as重命名
  v1 as streamV1,
  v2 as streamV2,
  v2 as streamLatestVersion
};
```

`export`语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值。

```javascript
export var foo = 'bar';
setTimeout(() => foo = 'baz', 500);
```

上面代码输出变量`foo`，值为`bar`，500毫秒之后变成`baz`。

import

`import`命令具有提升效果，会提升到整个模块的头部，首先执行。

由于`import`是静态执行，所以不能使用表达式和变量，这些只有在运行时才能得到结果的语法结构。

```javascript
import {firstName, lastName, year} from './profile';
import * as circle from './circle';//整体加载
```

Export default

当你不知道输出了什么模块也懒得看api的时候。

```javascript
// 第一组  
export default function crc32() { // 输出
  // ...
}

import crc32 from 'crc32'; // 输入   因为只能输出一个default，所以没必要加大括号了

// 第二组
export function crc32() { // 输出
  // ...
};

import {crc32} from 'crc32'; // 输入   
```

`defer`与`async`的区别是：前者要等到整个页面正常渲染结束，才会执行；后者一旦下载完，渲染引擎就会中断渲染，执行这个脚本以后，再继续渲染。一句话，`defer`是“渲染完再执行”，`async`是“下载完就执行”。另外，如果有多个`defer`脚本，会按照它们在页面出现的顺序加载，而多个`async`脚本是不能保证加载顺序的。

浏览器加载 ES6 模块，也使用`<script>`标签，但是要加入`type="module"`属性。

```javascript
<script type="module" src="foo.js"></script>
```

浏览器对于带有`type="module"`的`<script>`，都是异步加载，不会造成堵塞浏览器，即等到整个页面渲染完，再执行模块脚本，等同于打开了`<script>`标签的`defer`属性。

ES6 模块也允许内嵌在网页中，语法行为与加载外部脚本完全一致。

```javascript
<script type="module">
  import utils from "./utils.js";

  // other code
</script>
```

##### ES6模块加载与commonJS的差异

它们有两个重大差异。

- CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
- CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。











