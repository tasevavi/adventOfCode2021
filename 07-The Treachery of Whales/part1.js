const fs = require('fs');

function main() {
	const positions = fs.readFileSync('input.txt')
		.toString()
		.split(',');

	let largestPostionNumber = Math.max(...positions);
	let middlePostionNumber = Math.round(largestPostionNumber/2);
	let smallerThanMiddle = positions.filter(p => p < middlePostionNumber).length; 
	let biggerThanMiddle = positions.filter(p => p > middlePostionNumber).length;
	let prevFuelCheck = Number.MAX_SAFE_INTEGER;

    const totalFuel = (position) => {
        let totalFuel = 0;
		for (let i = 0; i < positions.length; i++) {
			let fuelForCurrentPosition = Math.abs(position - positions[i]);
			totalFuel += fuelForCurrentPosition;
		}
		return totalFuel;
    }

	if (smallerThanMiddle > biggerThanMiddle) {
		for (let i = 0; i < middlePostionNumber; i++) {
			let position = i;
			let currentFuel = totalFuel(position);
            prevFuelCheck = currentFuel < prevFuelCheck ? currentFuel : prevFuelCheck;
		}
	} else if (smallerThanMiddle < biggerThanMiddle) {
		for (let i = middlePostionNumber; i < positions.length; i++) {
			let position = i;
			let currentFuel = totalFuel(position);
            prevFuelCheck = currentFuel < prevFuelCheck ? currentFuel : prevFuelCheck;
		}
	}
	
    console.log('Fuel spent:',prevFuelCheck);
}
    
main();
