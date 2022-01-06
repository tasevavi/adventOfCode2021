const fs = require('fs');

function main() {
    const input = fs.readFileSync('testInput.txt') 
        .toString()
        .split('\r\n\r\n');

    const [initialPolymer, insertionRules] = [...input];
    const rules = parseRules(insertionRules);
    
    let result = findElementsCount(initialPolymer, 40, rules);
    findTotalCount(result);
}

const stateOfPairs = {};

function findElementsCount(initialPolymer, step, rules) {
    if (step === 0) {
        return countElements(initialPolymer);
    } else {
        const combination = enrichPolymer(initialPolymer, rules);
        let pairs = [];
        for (let i = 0; i < combination.length-1; i++) {
            const currentElement = combination[i]+combination[i+1];
            pairs.push(currentElement);
        }
        
        const counts = pairs.map(pair => {
            const nextStep = step-1;
            const key = pair + step;
            const value = stateOfPairs[key];
            if (value) {
                return value;
            } else {
                const newValue = findElementsCount(pair, nextStep, rules);
                stateOfPairs[key] = newValue;
                return newValue;
            }
        });
        
        const aggregated = aggregateCounts(counts);
        const duplicateRemoved = removeDuplicate(pairs, aggregated);
        return duplicateRemoved;
    }
}

function removeDuplicate(pairs, aggregated) {
    pairs.slice(1).forEach(pair => {
        aggregated[pair[0]]--;
    });

    return aggregated;
}

function enrichPolymer(polymerTemplate, rules) {
    let result = '';
    for (let i=0; i < polymerTemplate.length-1; i++) {
        let currentPair = polymerTemplate[i] + polymerTemplate[i+1];
        let combination = insertElement(currentPair, rules);
        result += combination[0];
        result += combination[1];
    }

    return result += polymerTemplate[polymerTemplate.length-1];
}

function insertElement(currentPair, rules) {
    let elementToInsert = rules[currentPair];
    let combination = currentPair[0] + elementToInsert;
    return combination;
}

function aggregateCounts(counts) {
    const base = {};
    counts.forEach(obj => {
        for (const key in obj) {
            if (base.hasOwnProperty(key)) {
                base[key] += obj[key];
            } else {
                base[key] = obj[key]
            }
        }
    });

    return base;
}

function countElements(polymerTemplate) {
    const elements = {};
    for(let i=0; i < polymerTemplate.length; i++) {
        const currentElement = polymerTemplate[i];
        if (elements[currentElement]) {
            elements[currentElement] += 1;
        } else {
            elements[currentElement] = 1;
        }
    }
    return elements;
}

function parseRules(insertionRules) {
    const rawRules = insertionRules.split('\r\n');
    const rules = {};
    for (let i = 0; i < rawRules.length; i++) {
        const [pair, elementToInsert] = rawRules[i].split(' -> ');
        rules[pair] = elementToInsert;
    }

    return rules;
}

function findTotalCount(result) {
    let sortedElements = Object.entries(result)
        .sort((a, b) => b[1]-a[1]);
    let mostCommon = sortedElements[0][1];
    let leastCommon = sortedElements[sortedElements.length-1][1];
    let difference = mostCommon - leastCommon;
    console.log(difference);
}

main();
