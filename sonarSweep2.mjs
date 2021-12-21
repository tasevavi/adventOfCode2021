import {input} from './input.mjs';

function solve(input) {
    let arr = input.split('\n').map(x => Number(x));
    let countLargerSums = 0;
    for (let i = 0; i < arr.length; i++) {
        let sumOne = arr[i] + arr[i+1] + arr[i+2];
        let sumTwo = arr[i+1] + arr[i+2] + arr[i+3];
        if(sumTwo > sumOne) {
            countLargerSums += 1;
        }
    }

    console.log('Sums larger than the previous sum:', countLargerSums);
}

solve(input);