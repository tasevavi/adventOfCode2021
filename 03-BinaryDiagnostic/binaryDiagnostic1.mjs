import {input} from 'input.mjs';

function solve(input) {
    let arr = input.split('\n);
    let gamma = '';
    let epsilon = '';

    for (let k = 0; k < 12; k++) {
        let zeroes = 0;
        let ones = 0;
        let zeroarr = [];
        let onearr = [];
        for (let i = 0; i < arr.length; i++) {
            let line = arr[i];
            let digit = line[k];
            if (digit === '0') {
                zeroes +=1;
                zeroarr.push(line);
            } else {
                ones +=1;
                onearr.push(line);
            }
        }

        if (zeroes < ones) {
            gamma += '0';
            epsilon += '1';
        } else {
            epsilon += '0';
            gamma += '1';
        }
    
    }
    
    let gammarate = parseInt(gamma, 2);
    let epsilonrate = parseInt(epsilon, 2);
    let energy = gammarate * epsilonrate;
    console.log(energy);
}

solve(input);
