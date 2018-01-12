//借助别的变量，数据量大的时候，性能相对差
function quickSort(arr) {
    /*
     * 创建len保存数组的长度，每次获取数组的长度都要实时查询不利于性能；
     * index作为保存取到的中间值；
     * pivot保存比较参照物；
     * left、right作为子数组的容器；
     */
     var len = arr.length,
         index,
         pivot,
         left=[],
         right=[];
     // 如果数组只有一位，就直接返回数组,递归的终止条件；
     if (len <= 1) return arr;
 
     //获取中间值的索引，使用Math.floor向下取整；
     index = Math.floor(len / 2);
 
     // 使用splice截取中间值，第一个参数为截取的索引，第二个参数为截取的长度；
     // 如果此处使用pivot=arr[index]; 那么将会出现无限递归的错误；
     // splice影响原数组，原数组长度减一；
     pivot = arr.splice(index, 1);
     len -= 1;
 
     // 小于arr[pivot]的存到left数组里，大于arr[pivot]的存到right数组；
     for (var i = 0; i < len; i++) {
         if (pivot > arr[i]) {
             left.push(arr[i]);
         } else {
             right.push(arr[i]);
         }
     }
     // 不断把分割的左右子数组传入quickSort，直到分割的只有一位直接返回子数组本身，递归终止；
     
     // 把每次分割的数组一层一层的用concat连接起来；
     // 每一层left里的元素都小于对应的pivot,right里的元素都大于对应的pivot；
     return quickSort(left).concat(pivot, quickSort(right));
 }
