const fs = require('fs');

function solve() {
    const input = fs.readFileSync('input.txt')
        .toString()
        .split('\n')
        .map(element => Number(element));

    let increaseCount = 0;
    for (let i = 0; i < input.length; i++) {
        let sumOne = input[i] + input[i+1] + input[i+2];
        let sumTwo = input[i+1] + input[i+2] + input[i+3];
        if(sumTwo > sumOne) {
            increaseCount +=1;
        }
    }
    
     console.log('Sums larger than the previous sum:', countLargerSums);
}

solve();
