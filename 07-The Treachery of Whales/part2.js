const fs = require('fs');

function main() {
	const positions = fs.readFileSync('input.txt')
		.toString()
		.split(',');

    const largestPostionNumber = Math.max(...positions);
    const middlePostionNumber = Math.round(largestPostionNumber/2);
    const leftHalf = positions.filter(p => p < middlePostionNumber).length; 
    const rigthHalf = positions.length - leftHalf;
    let minimalFuel = Number.MAX_SAFE_INTEGER;
    let startPos = undefined;
    let endPos = undefined;
    
    const totalFuel = (position) => {
        let totalFuel = 0;
        for (let i = 0; i < positions.length; i++) {
            let distance = Math.abs(position - positions[i]);
            totalFuel += ((distance + 1)/2)*distance;
        }
        return totalFuel;
    }

    if (leftHalf > rigthHalf) {
        startPos = 0;
        endPos = middlePostionNumber;
    } else if (leftHalf < rigthHalf) {
        startPos = middlePostionNumber;
        endPos = positions.length;
    }

    for (let i = startPos; i < endPos; i++) {
        let position = i;
        let currentFuel = totalFuel(position);
        if (currentFuel < minimalFuel) {
            minimalFuel = currentFuel;
        }
    }
    
    console.log(`Minimal fuel = ${minimalFuel}`);
}
    
main();
