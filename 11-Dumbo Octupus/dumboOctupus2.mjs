import {input} from './input.mjs';

let totalFlashes = 0;

function main() {
    let matrix = input.split('\n').map(line => line.split('').map(n => Number(n)));
    
    for (let i=1;;i++) {
        step(matrix);
        flash(matrix);
        if (matrix.flat().reduce((a,b) => a + b) === 0) {
            console.log('Sync flashing:', i);
            break;
        }
    }
}

function step(matrix) {
    for (let row=0; row<matrix.length; row++) {
        for (let col=0; col<matrix.length; col++) {
            matrix[row][col] +=1;
        }
    }
}

function flash(matrix) {
    let currentTotalFlashes = totalFlashes;
    do {
        for (let row=0; row<matrix.length; row++) {
            for (let col=0; col<matrix.length; col++) {
                if (matrix[row][col] === 10) {
                    matrix[row][col] = 0;
                    totalFlashes += 1;
                    flashNeighbours(matrix, row, col);
                }
            }
        }

        if (currentTotalFlashes === totalFlashes) {
            break;
        } else {
            currentTotalFlashes = totalFlashes;
        }
    } while(true)
    
}

function flashNeighbours(matrix, row, col) {
    flashSafe(matrix, row-1, col-1);
    flashSafe(matrix, row-1, col);
    flashSafe(matrix, row-1, col+1);
    flashSafe(matrix, row, col-1);
    flashSafe(matrix, row, col+1);
    flashSafe(matrix, row+1, col-1);
    flashSafe(matrix, row+1, col);
    flashSafe(matrix, row+1, col+1);
}

function flashSafe(matrix, row, col) {
    if (row >=0 && col >= 0 && row < matrix.length && col < matrix.length) {
        if (matrix[row][col] !== 0 && matrix[row][col] !== 10) {
            matrix[row][col] += 1;
        }
    }
}
main();
