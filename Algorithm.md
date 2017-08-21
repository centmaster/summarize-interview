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







### 算法问题分类

#### 树

##### 广度优先遍历，深度优先遍历

```javascript
var levelOrderTraversal = function(node) {
  if(!node) {
    throw new Error('Empty Tree')
  }

  var que = []
  que.push(node)
  while(que.length !== 0) {
    node = que.shift()
    console.log(node.value)
    if(node.left) que.push(node.left)
    if(node.right) que.push(node.right)
  }
}			//广度利用队列
```

```javascript
var preOrderUnRecur = function(node) {
  if(!node) {
    throw new Error('Empty Tree')
  }
  var stack = []
  stack.push(node)
  while(stack.length !== 0) {
    node = stack.pop()
    console.log(node.value)    
    if(node.right) stack.push(node.right)
    if(node.left) stack.push(node.left)
  }
}				//深度利用栈
```

##### 后序遍历

```javascript
var postOrder = function (node) {  
if(node){  
postOrder(node.left);  
postOrder(node.right);  
console.log(node.value);  
}  
}  
```



#### 链表

  （2）链表反转；

```javascript
let pre=head;
let cur=head.next;
pre.next=null;
while(cur.next!==null){
  let temp=cur.next;
  cur.next=pre;
  pre=cur;
  cur=temp;
}
```

  （3）链表排序；

```javascript
function sort(){
let i=head;
let j=head.next;
let base=i.val;
while(j!==null){
  if(j.val<base){
    i=i.next;
    swap(i,j);
  }
  j=j.next;
}
swap(i,head);
 sort(head,i);
  sort(i.next,j)
}

```

  （4）合并两个有序链表；

  （5）求出链表倒数第k个值；

```javascript
let fa=sl=head;
for(var i=0;i<k-2;i++){
  fa=fa.next;
}
while(fa.next!=null){
  sl=sl.next;
  fa=fa.next;
}
return sl.val;
```

  （6）判断链表是否有环，有环返回相遇节点；

​		快慢针，能相遇就说明有

  （7）在一个有环链表中找到环的入口；

​		从快慢相遇点开始走，另一个从起始点开始走，就能走到

​		推倒。设环长r，非环长l，相遇点距环口m.

​		l+m+t1r=(l+m+t2r)/2

​		l+m=(2*t1-t2)r=tr

​		l=tr-m=(r-m)+(t-1)r		所以一开始从那里走的话一定会在交叉点相会

  （8）删除当前给定节点node；

​		node.next=temp;

​		node.val=temp.val;

​		node.next=temp.next;		

  （9）找出链表的中间节点。快慢指针









#### 其他

##### 斐波纳切 注意尾部回调

```javascript
function fib(x,m=1,n=0){
	if(x>2){
  	x--;
  	return fib(x,m+n,m);
  }else{
  return m+n;
  }
  
}
```

##### 数组去重

```javascript
		var array = [1,3,4,4,5,6];
        function filt(array){
          var result=[];
          var hash = {};
          array.forEach(function(item){
            if(!hash[item]){
              result.push(item);
              hash[item]=true;
            }
          })
          console.log(result);
        }
		filt();
```

##### 判断两个json是否相同

```javascript
const x={a:1,b:2},y={b:2,a:1},z={a:2,b:3};
//我能想到的方法就是便利每个变量，然后对比
deter(x,y)  //true
deter(x,z)  //false
```













### 数据结构

##### 栈的实现

```javascript
	function stack(){
      this.dataStore=[];
      this.top=0;
      this.push=push;
      this.pop=pop;
      this.peek=peek;
	}

	function push(element){
      this.dataStore[top++]=element;
	}
	function pop(element){
      return this.dataStore[--this.top];
	}
	function peek(){
      return this.dataStore[this.top-1];
	}
	function length(){
      return this.top;
	}
	function clear(){
      this.top=0;
	}
```

##### 队列的实现

```javascript
	function Queue(){
      this.dataStore=[];
      this.enqueue=enqueue;
      this.dequeue=dequeue;
      this.front=front;
      this.back=back;
      this.toString=toString;
      this.empty=empty;
    }
	function enqueue(element){
      this.dataStore.push(element);
	}
	function dequeue(element){
      this.dataStore.shift();
	}
	function front(){
      return this.dataStore[0];
	}
	function back(){
      return this.dataStore[this.dataStore.length-1];
	}
	function toString(){
      var resstr='';
      for(var i=0;i<this.dataStore.length;i++){
        resstr+=this.dataStore[i]+'/n';
      }
      return resstr;
	}
	function empty(){
      return this.dataStore.length==0?true:false;
	}
	
```

##### 链表的实现

```javascript
	function Node(element){
      this.element=element;
      this.next=null;
	}
	function llist(){
      this.head=new Node('head');
      this.find=find;
      this.insert=insert;
      this.remove=remove;
      this.display=display;
	}
	function find(item){
      var curNode=this.head;
      while(curNode!=item){
        curNode=curNode.next;
      }
      return curNode;
	}
	function insert(newELement,item){
      var newNode=new Node(newElment);
      var current=this.find(item);
      newNode.next=current.next;
      current.next=newNode;
	}
	function display(){
      var curNode=this.head;
      while(!(curNode.next==null)){
        print(curNode.next.element);
        curNode=curNode.next;
      }
	}
	function findprevious(item){
		var curNode=this.head;
      	while(!(curNode.next==null)&&(curNode.next.element!=item)){
          curNode=curNode.next;
      	}
      	return curNode;
    }
	function remove(item){
      var previous=findprevious(item);
      if(!(previous.next.next==null)){
        previous.next=previous.next.next;
      }
	}

	//双向链表
	function Node(element){
      this.element=element;
      this.next=null;
      this.previous=null;
	}
	function LList(){
      this.head=new Node('head');
      this.find=find;
      this.insert=insert;
      this.display=display;
      this.remove=remove;
      this.findlast=findlast;
      this.dispReverse=dispReverse;
	}
	funciton dispReverse(){
      var curNode=this.head;
      curNode=this.findLast();
      while(!(curNode==null)){
        print(curNode.element);
        curNode=curNode.previous;
      }
	}
	function findLast(){
      var curNode=this.head;
      while(!(curNode.next==null)){
        curNode=curNode.next;
      }
      return curNode;
	}
	

	
```

##### 深度优先和广度优先的遍历

```javascript
function wideTraversal(selectNode) {  
    var nodes = [];  
    if (selectNode != null) {  
        var queue = [];  
        queue.unshift(selectNode);  
        while (queue.length != 0) {  
            var item = queue.shift();  
            nodes.push(item);  
            var children = item.children;  
            for (var i = 0; i < children.length; i++)  
                queue.push(children[i]);  
        }  
    }  
    return nodes;   
}




var preOrder = function (node) {
  if (node) {
    console.log(node.value);
    preOrder(node.left);
    preOrder(node.right);
  }
}

var inOrder = function (node) {
  if(node){
    inOrder(node.left);
    console.log(node.value);
    inOrder(node.right);
  }
}

var postOrder = function (node) {
  if (node) {
    postOrder(node.left);
    postOrder(node.right);
    console.log(node.value);
  }
}
```





