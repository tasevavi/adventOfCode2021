const fs = require('fs');

function solve() {
    const input = fs.readFileSync('input.txt')
        .toString()
        .split('\n')
        .map(element => Number(element));

    let countLargerNumbers = 0;
    for (let i = 0; i < input.length; i++) {
        let firstNumber = input[i];
        let secondNumber = input[i+1];
        if(secondNumber > firstNumber) {
            countLargerNumbers += 1;
        }
    }
    
    console.log('Numbers larger than the previous number:', countLargerNumbers);
}

solve();
 
