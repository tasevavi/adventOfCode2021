import {input} from './input.mjs';

function solve(input) {
    let arr = input.split('\n').map(x => Number(x));
    let countLargerNumbers = 0;
    for (let i = 0; i < arr.length; i++) {
        let firstNumber = arr[i];
        let secondNumber = arr[i+1];
        if(secondNumber > firstNumber) {
            countLargerNumbers += 1;
        }
    }
    console.log('Numbers larger than the previous number:',countLargerNumbers);
}

solve(input);