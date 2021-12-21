import {input} from './input.mjs';

function solve(input) {
    let arr = input.split('\n');
    let horizontal = 0;
    let depth = 0;
    let aim = 0;
    
    for (let i = 0; i < arr.length; i++) {
        let [command, unit] = arr[i].split(' ');
        switch (command) {
            case 'forward': 
                horizontal += Number(unit);
                depth += aim * unit;
                break;
            case 'down': aim += Number(unit);
                break;
            case 'up': aim -= Number(unit);
                break;
        }
    }
    console.log(horizontal * depth);
}

solve(input);
