/**
 * Created by centmaster on 2017/5/12.
 */
//http://www.jianshu.com/p/7fd6d41d43b0

function BubbleSort(arr) {
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


function selectionSort(arr) {
    var indexMin = 0,temp;
    for(var i=0;i<arr.length-1;i++){
            indexMin=i;
            for(var j=i+1;j<arr.length;j++){
                if(arr[j]<arr[indexMin]){
                    indexMin=j;
                }
            }
            temp = arr[indexMin];
            arr[indexMin]=arr[i];
            arr[i]=temp;
    }
}


function quickSort(arr) {
    var pivotIndex = Math.floor(arr.length/2);
    var pivot=arr[pivotIndex];
    var left =[];
    var right =[];
    for (var i = 0; i < arr.length; i++){
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return quickSort(left).concat([pivot],quickSort(right));
}

function insertSort(arr) {
    var key;
    for(var i=1;i<arr.length;i++){
        key = arr[i];
        var j=i-1;
        while(j>=0&&arr[j]>key){
            arr[j+1]=arr[j];
            j--;
        }
        arr[j+1]=key;
    }
        return arr;
}


function mergeSort(arr) {  //采用自上而下的递归方法
    var len = arr.length;
    if(len < 2) {
        return arr;
    }
    var middle = Math.floor(len / 2),
        left = arr.slice(0, middle),
        right = arr.slice(middle);
    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right)
{
    var result = [];
    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }

    while (left.length)
        result.push(left.shift());

    while (right.length)
        result.push(right.shift());
    return result;
}


1.快排    O(n2)   O(n*log2n)  不稳定 O(log2n)~O(n)
2.桶排序  n   n2   
    1--100，分成十个桶，分别放到十个桶里
3.插入排序  O(n2)   O(n2)   稳定  O(1)
4.归并排序  O(nlogn)   O(nlogn)   稳定  O(n)
把原始数组分成若干子数组,对每一个子数组进行排序,
继续把子数组与子数组合并,合并后仍然有序,直到全部合并完,形成有序的数组
5.冒泡排序  O(n2)   O(n2)   稳定  O(1)
6.选择排序 O(n2)   O(n2)   稳定  O(1)
每次拿到一个最大（小）的数放到头


        最差时间分析  平均时间复杂度 稳定度 空间复杂度
冒泡排序    O(n2)   O(n2)   稳定  O(1)
快速排序    O(n2)   O(n*log2n)  不稳定 O(log2n)~O(n)
选择排序    O(n2)   O(n2)   稳定  O(1)
二叉树排序   O(n2)   O(n*log2n)  不一顶 O(n)
插入排序    O(n2)   O(n2)   稳定  O(1)
堆排序 O(n*log2n)  O(n*log2n)  不稳定 O(1)
希尔排序    O   O   不稳定 O(1)


快速排序时间复杂度 o(nlogn)

数组有n个元素，因为要递归运算，算出支点pivot的位置，然后递归调用左半部分和有半部分，这个时候理解上是若第一层的话就是n/2，n/2，
若是第二层就是n/4,n/4,n/4,n/4这四部分，即n个元素理解上是一共有几层2^x=n，x=logn，然后每层都是n的复杂度，
那么平均就是O(nlogn)的时间复杂度。但这种肯定是平均情况，如果你是标准排序的情况下，如果已经是ascending的顺序，那么递归只存在右半部分了，
左半部分都被淘汰了。(n-1)(n-2)....*1，这个复杂度肯定就是O(n^2)，这种情况还不如用插入排序作者：

主定理严格推倒



