# 面经总结

#### 前言

这个面经的来源一共分为三部分。第一部分是市面上的面经结合自己的知识总结。第二部分就是自己的面经，大大小小面了也有一些了，希望自己也能总结总结造福自己造福后人。最后一部分就是针对自己做过的东西，简历上的东西做的总结，不具有普遍性。当然文件夹里还有一些算法题，平常做前端的也要动动脑嘛。希望自己和大家都能找到满意的工作。



## 第一部分 前端面经总结

### html

##### h5标签了解多少

<nav><header><article><aside><hgroup><footer><canvas><video><source><mark><time>

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

##### 





#### 构建工具

##### webpack

具体请查简书   http://www.jianshu.com/p/b83a251d53db

```javascript
// webpack.config.js

var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devtool: "source-map", //配置生成 Source Maps 的选项  将编译前后代码每行一一对应起来，有四个不同轻重的选项。
    entry: __dirname + "/app/main.js", //入口文件路径
    output: {
        path: __dirname + "/build/", //存放打包后文件的地方路径
        filename: "[name]-[hash].js" //打包后的文件名
    },
    devServer: {				//构建本地服务器
        port: "9000",
        inline: true,				//改变文件自动刷新
        historyApiFallback: true,
        hot: true
    },
    module: {						//loader进行文件预处理，允许js之外所有静态自由
        loaders: [{					//匹配不同文件进行解析
            test: /\.json$/,
            loader: "json-loader"
        }, {
            test: /\.js$/,
            exclude: /node_modules/, //编译打包时需要排除 node_modules 文件夹
            loader: "babel-loader"			//.babelrc将babel配置写到这个文件中
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",						
                use: "css-loader?modules!postcss-loader"		//cssmodules运用模块
           		//postcss 解析scss,less之类的 
              //css-loader 使你能够使用类似 @import 和 url(...) 的方法实现 require() 的功能
              //style-loader 将所有的计算后的样式加入页面中
            })
        }]
    },
    plugins: [					//插件
        new webpack.BannerPlugin("Copyright Flying Unicorns inc."), //在这个数组中new一个实例就可以了
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









#### 

##### 

