function quickSort(arr) {
    var len = arr.length,
        index,
        pivot,
        left = [],
        right = [];
    if (len <= 1) return arr;

    index = Math.floor(len / 2);

    pivot = arr.splice(index, 1);
    len -= 1;

    for (var i = 0; i < len; i++) {
        if (pivot > arr[i]) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    return quickSort(left).concat(pivot, quickSort(right));
}
