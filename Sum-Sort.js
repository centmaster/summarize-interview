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



