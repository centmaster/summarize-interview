/**
 * Created by centmaster on 2017/5/12.
 */
//http://www.jianshu.com/p/7fd6d41d43b0

function BubbleSort() {
    var temp=0;
    for(var i=0;i<arr.length;i++){
        for(var j=0;j<i;j++){
            if(arr[j]>arr[i]){
                temp=arr[i];
                arr[i]=arr[j];
                arr[j]=temp;
            }
        }
    }
    console.log(arr);
}






