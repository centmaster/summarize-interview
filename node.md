### 七天学会node—[node教程](http://nqdeng.github.io/7-days-nodejs/#3.1.1)

#### node的[优势](http://blog.csdn.net/yezhenxu1992/article/details/51731237)

Nodejs最赖以自豪的优势莫过于“单线程实现异步IO”

NodeJS使用[CMD](http://wiki.commonjs.org/)模块系统，主模块作为程序入口点，所有模块在执行过程中只初始化一次。

##### http模块

原生是用`http.createServer`方法新建一个app实例，现在则是用Express的构造方法，生成一个Epress实例。两者的回调函数都是相同的。Express框架等于在http模块之上，加了一个中间层。

get listen

