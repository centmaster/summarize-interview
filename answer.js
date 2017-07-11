1. 题目如下：
  0 1 2 3 4 5 6 7 8 9
  _ _ _ _ _ _ _ _ _ _

请将第二排填上数字，使得第二排每一位数字是对应的第一排数字在第二排出现的次数，并编码实现。

例如:
  0 1 2 3
  1 2 1 0

2. 实现一个 HardMan:
HardMan("jack") 输出:
I am jack

HardMan("jack").learn("computer") 输出
I am jack
Learning computer

HardMan("jack").rest(10).learn("computer") 输出
I am jack
//等待10秒
Start learning after 10 seconds
Learning computer

HardMan("jack").restFirst(5).learn("chinese") 输出
//等待5秒
Start learning after 5 seconds
I am jack
Learning chinese


1
var arr=[0,1,2,3,4,5,6,7,8,9]

function resolve(arr){
	//默认arr大于3；
	let res=[0,2,1];
	for(let i=3;i<arr.length;i++){
		res[i]=0;
	}
	res[0]=arr.length-2-2;
	res[res[0]]=1;
	return res;
}








2
const HardMan=(name) =>{
	class HardMan{
		constructor(name){
			this.lists=[this.init(name)];

			setTimeout(async ()=>{
				for(let todo of this.lists){
					await todo();
				}
			},0)
		}
		init(name){
			return ()=>console.log('I am '+name);
		}

		learn(subject){
			this.lists.push(()=>console.log('Learning '+subject));
			return this;
		}

		holdon(time){
			return ()=>new Promise(
				resolve=>setTimeout(
					()=>resolve(console.log('Start learning after ')),time*1000)
				)
		}

		rest(time){
			 this.lists.push(this.holdon(time));
			 return this;
		}

		restFirst(time){
			this.lists.unshift(this.holdon(time));
			return this;
		}


	}
	return new HardMan(name)
}














