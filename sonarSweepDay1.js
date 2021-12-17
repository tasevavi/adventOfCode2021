function solve(arr) {
    let increaseCount = 0;
    for (let i = 0; i < arr.length; i++) {
        let sumOne = arr[i] + arr[i+1] + arr[i+2];
        let sumTwo = arr[i+1] + arr[i+2] + arr[i+3];
        if(sumTwo > sumOne) {
            increaseCount +=1;
        }
    }

    console.log(increaseCount);
}
