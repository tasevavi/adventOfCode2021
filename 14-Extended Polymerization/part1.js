const fs = require('fs');
const input = fs.readFileSync('input.txt').toString();

function main() {
    let inputArr = input.split('\r\n\r\n');
    const initialPolymer = inputArr.shift();
    const insertionRules = inputArr[0].split('\r\n').map(x => x.split(' -> '));
    let result = initialPolymer;
    for (let step = 0; step < 10; step ++) {
        let currentPolymer = '';
        for (let i=0; i < result.length-1; i++) {
            let currentPair = result[i] + result[i+1];
            let combination = insertElement(currentPair, insertionRules);
            currentPolymer = createNewPolymer(combination, currentPolymer);
        }
        result = currentPolymer;
    } 

    let elementQuantities = findElementsCount(result);
    let sortedElements = Object.entries(elementQuantities)
        .sort((a, b) => b[1]-a[1]);
    let mostCommon = sortedElements[0][1];
    let leastCommon = sortedElements[sortedElements.length-1][1];
    let difference = mostCommon - leastCommon;
    console.log(difference);
}

function findElementsCount(result) {
    let elementQuantities = {};
    for (let i=0; i<result.length; i++) {
        let element = result[i];
        if (elementQuantities[element]) {
            elementQuantities[element] += 1;
        } else {
            elementQuantities[element] = 1;
        }
    }
    return elementQuantities;
}

function createNewPolymer(combination, currentPolymer) {
    currentPolymer = currentPolymer.slice(0, currentPolymer.length-1);
    currentPolymer += combination;
    return currentPolymer;
}

function insertElement(currentPair, insertionRules) {
    let elementToInsert = insertionRules.find(x => x[0] === currentPair)[1];
    let combination = currentPair[0] + elementToInsert + currentPair[1];
    return combination;
}

main();
