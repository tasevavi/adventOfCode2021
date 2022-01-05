const fs = require('fs');

function main() {
    const input = fs.readFileSync('input.txt')
        .toString()
        .split('\n\n');
    
    const boards = splitBoards(input);
    const numbers = [99,56,7,15,81,26,75,40,87,59,62,24,58,34,78,86,44,65,18,94,20,17,98,29,57,92,14,32,46,79,85,84,35,68,55,22,41,61,90,11,69,96,23,47,43,80,72,50,97,33,53,25,28,51,49,64,12,63,21,48,27,19,67,88,66,45,3,71,16,70,76,13,60,77,73,1,8,10,52,38,36,74,83,2,37,6,31,91,89,54,42,30,5,82,9,95,93,4,0,39];
    
    for (let i = 1; i <= numbers.length; i++) {
        let numbersDrawn = numbers.slice(0, i);
        for (let b = 0; b < boards.length; b++) {
            let board = boards[b];
            let winningRow = checkRows(board, numbersDrawn);
            if ( winningRow >= 0) {
                let lastNumber = numbersDrawn[numbersDrawn.length-1];
                let result = calculateRows(board, winningRow, lastNumber);
                console.log(result);
                return result;
            }

            let winningCol = checkColumns(board, numbersDrawn);
            if ( winningCol >= 0) {
                let lastNumber = numbersDrawn[numbersDrawn.length-1];
                let result = calculateColumns(board, lastNumber, numbersDrawn);
                console.log(result);
                return result;
            }
        }
    }
    
}

function splitBoards(input) {
    let lines = input[0].split('\r\n');
    let boardsArr = [];
    for (let i = 0; i < lines.length; i += 6) {
        let singleBoardArr = [];
        for (let j = i; j < i +5; j++) {
            let currentLine = lines[j];
            let row = currentLine.split(' ').filter(x => x !== '').map(x => Number(x));
            singleBoardArr.push(row);
        }
        boardsArr.push(singleBoardArr);
    }
    return boardsArr;
}

function calculateRows(board, winningRow, lastNumber) {
    let sum = 0;

    for (let i = 0; i < 5; i++) {
        let row = board[i];
        if (i !== winningRow) {
            for (let n = 0; n < 5; n++) {
                sum += row[n];
            }
        }
    }

    return sum * lastNumber;
}

function calculateColumns(board, lastNumber, numbersDrawn) {
    let sum = 0;

    for (let c = 0; c < 5; c++) {
        for (let i =0; i < 5; i++) {
            let currentNumber = board[i][c];
            if (!numbersDrawn.includes(currentNumber)) {
                sum += currentNumber;
            }
        }
    }

    return sum * lastNumber;
}

function checkRows(board, numbers) {
    for (let r = 0; r < 5; r++) {
        let row = board[r];
        let isRowFine = true;
        for (let i =0; i < 5; i++) {
            let currentNumber = row[i];
            if (!numbers.includes(currentNumber)) {
                isRowFine = false;
            }
        }
        if (isRowFine) {
            return r;
        } 
    }
    return -1;
}

function checkColumns(board, numbers) {
    for (let c = 0; c < 5; c++) {
        let isColFine = true;
        for (let i =0; i < 5; i++) {
            let currentNumber = board[i][c];
            if (!numbers.includes(currentNumber)) {
                isColFine = false;
            }
        }
        if (isColFine) {
            return c;
        } 
    }
    return -1;
}

main();
