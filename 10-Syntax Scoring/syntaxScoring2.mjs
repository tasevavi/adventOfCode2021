import {input} from './input.mjs';

function main(input){
    let linesArr = input.split('\n').map(l => l.trim());
    let allPoints = [];

    linesArr.forEach(line => {
        let incompliteLine = checkIsIncomplete(line);
        if (incompliteLine !== undefined) {
            let linePoints = addPoints(incompliteLine);
            allPoints.push(linePoints);
        }
    });

    let middleScore = allPoints.sort((a,b) => a-b).splice(allPoints.length/2, 1)[0];
    console.log('Middle Score:', middleScore);
}

function addPoints(line) {
    const pointsTable = {
        '(': 1,
        '[': 2,
        '{': 3,
        '<': 4
    };
    
    let totalScore = 0;
    let points = 0;
    for (let i=line.length; i > 0; i--) {
        let char = line[i-1];
        points = (totalScore * 5) + pointsTable[char];
        totalScore = points;
    }   
    return points;
}

function checkIsIncomplete(line) {
    let currentLine = line.split('');
    const closingChars = {
        '{': '}',
        '(': ')',
        '[': ']',
        '<': '>'
    };

    for (let i=0; i < currentLine.length-1;) {
        let char = currentLine[i];
        if (closingChars[char] === currentLine[i+1]) {
            currentLine.splice(i, 2);
            i--;
        } else {
            i++;
        }

    }

    for (let j=0; j < currentLine.length; j++) {
        if (!closingChars[currentLine[j]]) {
            return undefined;
        }
    }

    return currentLine;
}

main(input);
