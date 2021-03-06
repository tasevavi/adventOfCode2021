const fs = require('fs');

function solve() {

    const input = fs.readFileSync('input.txt')
        .toString()
        .split('\n')
        .map(line => line.trim());
    
    let horizontal = 0;
    let depth = 0;
    let aim = 0;
    
    for (let i = 0; i < input.length; i++) {
        let [command, unit] = input[i].split(' ');
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

solve();
