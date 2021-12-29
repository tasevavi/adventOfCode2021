const fs = require('fs');

function main() {
    const input = fs.readFileSync('day5/input.txt')
        .toString()
        .split('\r\n')
        .map(line => line.split(' -> '))
        .map(arr => arr.map(element => element.split(',').map(digit => Number(digit))));
    
    let overlaps = [...new Array(1000)].map(() => new Array(1000).fill(0));
    checkOverlaps(input, overlaps);
    const result = countOverlaps(overlaps);
    console.log('Points where coordinates overlap:',result);
}

function countOverlaps(overlaps) {
    let result = 0;
    overlaps.forEach(row => {
        result += row.filter(x => x > 1).length;
    })
    return result;
}

function checkOverlaps(input, overlaps) {
    input.forEach(arr => {
        let [x1, y1] = arr[0];
        let [x2, y2] = arr[1];
        if (x1 === x2) {
            let [start, end] = [y1, y2].sort((a,b) => a-b);
            for (let i=start; i<=end; i++) {
                overlaps[i][x1] += 1;
            }
        } else if (y1 === y2) {
            let [start, end] = [x1, x2].sort((a,b) => a-b);
            for(let i=start; i<=end; i++) {
                overlaps[y1][i] += 1;
            }
        }
    });
}

main();
