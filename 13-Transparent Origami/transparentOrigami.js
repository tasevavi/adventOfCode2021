const fs = require('fs');
const input = fs.readFileSync('input.txt').toString();

function main() {
    const [dots, foldingInstructions ]= input.split('\r\n\r\n');
    let dotsArr = dots
        .split('\r\n')
        .map(element => element
            .split(',')
            .map(element => Number(element)));
    let folds = foldingInstructions
        .split('\n')
        .map(element => element
            .split(' ')[2]
            .split('=')
            .map(el => el.trim()));
    const xLength = Math.max(...dotsArr.map(x => x[0])) + 1;
    const yLength = Math.max(...dotsArr.map(y => y[1])) + 1;
    let matrix = createMatrix(yLength, xLength);
    for(let i =0; i < dotsArr.length; i++) {
        fillMatrix(matrix, dotsArr[i]);
    }
  
    //Part 1 
    //loop only once
    for(let instruction = 0; instruction < folds.length; instruction++) {  
        matrix = fold(folds[instruction], matrix);
    }
    console.log('final:\n', matrix.join('\n'));
    //Part 1 
    // let dotsCount = matrix.flat().filter(x => x === '#').length;
    // console.log(dotsCount);
}

function fold(instruction, matrix) {
    let [position, number] = [...instruction];
    number = Number(number);
    if (position === 'y') {
        matrix = foldHorizontal(matrix, number);
    } else {
        matrix = foldVertical(matrix, number);
    }

    return matrix;
}

function foldVertical(matrix, number) {
    for (let i=0; i < matrix.length; i++) {
        let row = matrix[i];
        let slicedrow = row.slice(number+1);
        row = row.slice(0, number);
        for (let j = 0; j < row.length; j++) {
            let itemToInsert = slicedrow[slicedrow.length-1-j];
            row[j] = itemToInsert === '#' ? '#' : row[j];
        }
        matrix[i] = row;
    }

    return matrix;
}

function foldHorizontal(matrix, number) {
    let slicedMatrix = matrix.slice(number+1);
    matrix = matrix.slice(0,number);
    for (let i=slicedMatrix.length-1; i >= 0; i--) {
        let row = slicedMatrix[i];
        for (let j =0; j < row.length; j++) {
            let insertIndex = slicedMatrix.length-i-1;
            matrix[insertIndex][j] = row[j] === '#' ? '#' : matrix[insertIndex][j];
        }
    }
    return matrix;
}

function fillMatrix(matrix, coordinates) {
    const [x,y] = [...coordinates];
    matrix[y][x] = '#';
}

function createMatrix(yLength, xLength) {
    let matrix = new Array(yLength); 
    for (let j =0; j<matrix.length; j++) {
        matrix[j] = new Array(xLength).fill('.');
    }   
    return matrix;
}

main();
