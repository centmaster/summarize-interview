## 算法与数据结构

### 基础知识

##### 二进制

```javascript
let a=123;
let b=a.toString(2);
if(a<0){
  b=~b+1;  //取反加一就是取负值
}
```







### 问题分类

斐波纳切 注意尾部回调

```
function fib(x,m=1,n=0){
	if(x>2){
  	x--;
  	return fib(x,m+n,m);
  }else{
  return m+n;
  }
  
}
```