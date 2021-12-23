import {input} from './input.mjs';

function main(input){
    let linesArr = input.split('\n').map(l => l.trim());
    let syntaxErrorScore = 0;
    const points = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137
    };

    linesArr.forEach(line => {
        let illegalChar = checkIsCorrupted(line);
        if (illegalChar !== undefined) {
            syntaxErrorScore += points[illegalChar];
        }
    });

    console.log('Syntax Error Score:', syntaxErrorScore);
}

function checkIsCorrupted(line) {
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
            return currentLine[j];
        }
    }

    return undefined;
}

main(input);
