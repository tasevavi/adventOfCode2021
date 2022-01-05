const fs = require('fs');

function main() {
	const fish = fs.readFileSync('input.txt')
        .toString()
        .split(',');
	
	const fishAges = new Array(9).fill(0);
	for (let i = 0; i < fish.length; i++) {
		let currentFish = fish[i];
		fishAges[currentFish] +=1;
	}
	
	let daysToSpawn = 9;
	for (let index = 0; index <256; index++) {
		let currentlyBreeding = index % daysToSpawn;
		let breedingFish = fishAges[currentlyBreeding];
		let oldfish = (currentlyBreeding + 7) % daysToSpawn;
		fishAges[oldfish] += breedingFish;
	}

	const totalFish = fishAges.reduce((a,b) => a+b);
	console.log('totalFish=', totalFish);
}

main();
