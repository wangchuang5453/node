var arr = [1,2,35,33,5,3,3,23,5,6,1,44,33,6];

var count = arr.reduce(function(allElements, ele){
    if (ele in allElements) {
        allElements[ele]++;
    } else {
        allElements[ele] = 1;
    }
    return allElements;
}, {});