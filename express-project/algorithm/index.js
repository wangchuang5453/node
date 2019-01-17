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
            if (arr[i] < arr[i + 1]) return false
        }
        return true
    }
}

const Sort = {
    selectionSort(arr, fn) { // 选择排序
        let len = arr.length
        for (let i = 0; i < len; i++) {
            let minIndex = i;
            for (let j = i + 1; j < len; j++) {
                if (fn(arr[j], arr[minIndex])) {
                    minIndex = j;
                }
            }
            let mid = arr[i]
            arr[i] = arr[minIndex]
            arr[minIndex] = mid
        }
    }
}

function main() {
    // let n = 10
    // let arr = SortTestHelper.generateRandomArray(n, 0, n)
    // let arr = [3,5,3.2,5.6,55,19.8,19.9]
    // let arr = ['H', 'B', 'D', 'C','E', 'S', 'A']
    let arr = [
        {name: 'a', age: 10},
        {name: 'g', age: 13},
        {name: 'c', age: 13},
        {name: 'd', age: 14},
        {name: 'e', age: 19},
        {name: 'f', age: 11},
    ]
    let fn = function (a, b) {
        return a.age == b.age ? a.name < b.name : a.age < b.age;
    }
    // Sort.selectionSort(arr, fn);
    SortTestHelper.testSort('selection', Sort.selectionSort, fn, arr)
    console.log(arr)
    console.log(SortTestHelper.isSorted(arr))
}

main()

var arr = [1,2,35,33,5,3,3,23,5,6,1,44,33,6];

var count = arr.reduce(function(allElements, ele){
    if (ele in allElements) {
        allElements[ele]++;
    } else {
        allElements[ele] = 1;
    }
    return allElements;
}, {});

