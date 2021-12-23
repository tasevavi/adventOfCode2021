import {input} from './input.mjs';

function main(input) {
    let heightmap = splitInput(input);
    let sumRiskLevel = 0;
    
    for (let i=1; i < heightmap.length-1; i++) {
        let currentLine = heightmap[i]; 
        let topLine = heightmap[i-1];
        let bottomLine = heightmap[i+1];
        for (let i=0; i < currentLine.length; i++) {
            let currentPosition = currentLine[i]; 
            let leftPosition = currentLine[i-1] !== undefined ? currentLine[i-1] : 9;
            let rigthPosition = currentLine[i+1] !== undefined ? currentLine[i+1] : 9;
            let upPosition = topLine[i];
            let bottomPosition = bottomLine[i];

            let isSmallest = checkIsSmallest(currentPosition, leftPosition, rigthPosition, upPosition, bottomPosition);
            if (isSmallest) {
                let risk = currentPosition + 1;
                sumRiskLevel += risk;
            }
        }
    }

    console.log('Sum of risk levels:', sumRiskLevel);
}

function splitInput(input) {
    let heightmap = input.split('\n').map(line => {
        return ('9'+line+'9').split('').map(e => Number(e))
    });
    let simulateLine = new Array(heightmap[0].length).fill(9);
    heightmap.push(simulateLine);
    heightmap.unshift(simulateLine);
    return heightmap;
}

function checkIsSmallest(cPos, lPos, rPos, upPos, botPos) {
    return cPos < lPos && cPos < rPos && cPos < upPos && cPos < botPos;
}

main(input);
