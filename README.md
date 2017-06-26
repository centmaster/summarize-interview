# 面经总结

#### 前言

这个面经的来源一共分为三部分。第一部分是市面上的面经结合自己的知识总结。第二部分就是自己的面经，大大小小面了也有一些了，希望自己也能总结总结造福自己造福后人。最后一部分就是针对自己做过的东西，简历上的东西做的总结，不具有普遍性。当然文件夹里还有一些算法题，平常做前端的也要动动脑嘛。希望自己和大家都能找到满意的工作。



## 第一部分 前端面经总结

### html

##### h5标签了解多少

```html
<header><aside><nav><footer><hgroup><canvas><vedio><source><mark>
```



> 语义化的好处
>
> 1去掉样式能让页面清晰的呈现出来
>
> 2屏幕阅读器会按标记读你的网页
>
> 3.有益于SEO，爬虫



### CSS

##### 



### Js

##### ES6新特性了解多少

let const Map Set => generator promise class

##### eval是做什么用的

把字符串解析成js代码运行。因为按顺序解析，所以没有变量提升

##### for in 和for of的区别是什么

for in 遍历的是索引. 还可以遍历对象，但是可能会遍历到继承的元素方法，使用hasOwnProperty（）判断

for of遍历的是对应的元素值

##### 闭包 ！（这个真的很重要）

http://www.jianshu.com/p/21a16d44f150

http://www.jianshu.com/p/9b4a54a98660



##### 原型链与构造对象







### vue

##### vue的生命周期

beforecreate    created

beforemounted	mounted

beforeupdate	updated

activated	deactivated

beforedestory	destroyed

#### vue的生命周期各阶段都做了什么？

`beforeCreate` 实例创建前：这个阶段实例的data、methods是读不到的
`created` 实例创建后：这个阶段已经完成了数据观测(data observer)，属性和方法的运算， watch/event 事件回调。mount挂载阶段还没开始，$el 属性目前不可见，数据并没有在DOM元素上进行渲染
`beforeMount`：在挂载开始之前被调用：相关的 render 函数首次被调用。
`mounted`：el选项的DOM节点 被新创建的 vm.$el 替换，并挂载到实例上去之后调用此生命周期函数。此时实例的数据在DOM节点上进行渲染
`beforeUpdate`：数据更新时调用，但不进行DOM重新渲染，在数据更新时DOM没渲染前可以在这个生命函数里进行状态处理
`updated`：这个状态下数据更新并且DOM重新渲染，当这个生命周期函数被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。当实例每次进行数据更新时updated都会执行
`beforeDestory`：实例销毁之前调用。
`destroyed`：Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。	

#### vue生命周期在真实场景下的业务应用

`created`：进行ajax请求异步数据的获取、初始化数据
`mounted`：挂载元素内dom节点的获取
`nextTick`：针对单一事件更新数据后立即操作dom
`updated`：任何数据的更新，如果要做统一的业务逻辑处理
`watch`：监听具体数据变化，并做相应的处理



##### vue和react的区别

###### 共同点

都是组件化

提供合理的钩子函数

ajax，route等功能都不在核心包里，而是以插件的方式加载

使用 Virtual DOM

###### 区别

React依赖Virtual DOM,而Vue.js使用的是DOM模板

当组件状态发生变化的时候，react树会自上而下发生变化。需要通过shouldComponentUpdate方法避免某些组件渲染，然而这个时候也要保证props是这个子组件根。vue的渲染是自动追踪的。

vue有scope 自己的css作用域，相互之间不影响

ReactNative  vs  Vue+Veex 阿里，跨平台框架



##### vue中socpe css怎么实现的

这个可选 `scoped` 属性会自动添加一个唯一的属性（比如 `data-v-21e5b78`）为组件内 CSS 指定作用域，编译的时候 `.list-container:hover` 会被编译成类似 `.list-container[data-v-21e5b78]:hover`。



##### vue-router怎么实现的（history）

`vue-router` 默认 hash 模式 —— 使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。

##### vuex是为什么出现的

子组建之间通讯，还要通过父组件非常麻烦

我们经常会采用父子组件直接引用或者通过事件来变更和同步状态的多份拷贝

#### 构建工具

##### webpack

具体请查简书   http://www.jianshu.com/p/b83a251d53db

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







##### webpack vs gulp&grunt

前者的工作流程是，将整个项目作为一个主体，通过给定的主文件，根据整个文件开始找到项目的所有依赖。然后通过loaders处理，最后打包成一个浏览器可以识别的js文件。

后者就有点像小孩。在配置文件中给出需要对文件的各种操作命令，然后他会帮你操作完成。

##### vue-cli webpack配置分析





## 第二部分 自己面过的经

http://exam.webfuture.cn/index.html  









## 第三部分 计算机网络

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

 

## 第四部分 数据结构和算法

### 数据结构





## 第五部分 简历和面试技巧总结





#### 

##### 

