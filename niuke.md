## 网上看到别人的面经

低版本浏览器不支持HTML5标签怎么解决

```html
<!--[if lt IE 9]>
  <script src="http://cdn.staticfile.org/html5shiv/r29/html5.js"></script>
<![endif]-->
```

##### CSS W3C盒子和IE盒子的如何互相转化

box-sizing属性`box-sizing: content-box|border-box|initial|inherit;`

inherit表明从父元素继承；initial表明默认值；
content-text表示width和height属性只包含内容区的大小；
border-box表示width和height属性是`border + padding + content`的大小

##### 原型链https://segmentfault.com/q/1010000005182807

- 每个对象都有一个指向它的原型的的内部链接(此链接还没有规范的访问方式，一般用__proro__代替),这个原型也有自己的原型，直到每个对象的原型为`null`为止
- 任意一个函数都可以作为构造器即`var someFun = new AnyFun()`
- 每个函数都有一个`prototype`属性，其它对象没有，该属性也是一个对象，该对象有一个`constructor`属性指向该函数
- 使用`new`去实例化一个函数后，得到的是一个对象。该函数的实例的原型指向构造函数的`prototype`属性
- 每个对象都有自己的属性和方法，如果没有找到就会沿着自己的原型链一直往上去找

##### Array对象自带的排序函数底层是怎么实现的？

查阅资料发现，V8 引擎 sort 函数只给出了两种排序 InsertionSort 和 QuickSort，数组长度小于等于 22 的用插入排序 InsertionSort，比22大的数组则使用快速排序 QuickSort。

插入排序：遍历序列，每次i都从头开始比放到合适位置

##### 邮箱 正则https://segmentfault.com/q/1010000006661187

```
/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+\.){1,63}[a-z0-9]+$/
```

##### 面向对象 面向过程

它的设计上的特点是：继承、封装、多态

面向对象设计的核心思想是模块化，对问题进行抽象。





