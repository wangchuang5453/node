const SortTestHelper = {
    generateRandomArray(n, rangL, rangR) {
        let arr = []
        for (let i = 0; i < n; i++) {
            arr[i] = Math.floor(Math.random() * rangR + rangL)
        }
        return arr
    },
    testSort(name, f, fn, arr) {
        console.time(name + "timer");
        f(arr, fn)
        console.timeEnd(name + "timer");
    },
    isSorted(arr) {
        for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i] > arr[i + 1]) return false
        }
        return true
    }
}

const swapArray = function(arr, index1, index2) {
    arr[index1] = arr.splice(index2, 1, arr[index1])[0];
    return arr;
 }

const Sort = {
    selectionSort(arr, fn) { // 选择排序 n^2
        let len = arr.length
        for (let i = 0; i < len; i++) {
            let minIndex = i;
            for (let j = i + 1; j < len; j++) {
                if (fn(arr[j], arr[minIndex])) {
                    minIndex = j;
                }
            }
            //swapArray(arr, i minIndex) 速度和下面方式差不多
            let mid = arr[i]
            arr[i] = arr[minIndex]
            arr[minIndex] = mid
        }
    },
    insertionSort(arr, fn) { // 插入排序 n^2
        for (let i = 1; i < arr.length; i++) {
            for (let j = i; j > 0; j--) {
                if (fn(arr[j], arr[j-1])) {
                    // swapArray(arr, j, j-1) 比下面方式速度会慢100倍
                    let mid = arr[j]
                    arr[j] = arr[j-1]
                    arr[j-1] = mid
                } else {
                    break
                }
            }
        }
    }
}

function main() {
    // 排序内容及方式

    // let arr = ['H', 'B', 'D', 'C','E', 'S', 'A']
    // let arr = [
    //     {name: 'a', age: 10},
    //     {name: 'g', age: 13},
    //     {name: 'c', age: 13},
    //     {name: 'd', age: 14},
    //     {name: 'e', age: 19},
    //     {name: 'f', age: 11},
    // ]
    // let fn = function (a, b) {
    //     return a.age == b.age ? a.name < b.name : a.age < b.age;
    // }
    // Sort.selectionSort(arr, fn);

    // 1️选择排序
    let n = 10000
    let arr = SortTestHelper.generateRandomArray(n, 0, n)
    let fn = function (a, b) {
        return a < b
    }
    SortTestHelper.testSort('selection', Sort.selectionSort, fn, arr)// n=10,000 77ms  n=100,000 7607ms   规模10倍，时间（100）n^2 倍
    // console.log(arr)
    console.log(SortTestHelper.isSorted(arr))

    // 2️插入排序
    let n1 = 10000
    let arr1 = SortTestHelper.generateRandomArray(n1, 0, n1)
    let fn1 = function (a, b) {
        return a < b
    }
    SortTestHelper.testSort('insert', Sort.insertionSort, fn1, arr1)
    // console.log(arr1)
    console.log(SortTestHelper.isSorted(arr1))
}

main()

