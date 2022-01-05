const fs = require('fs');

function main() {
    const allFish = fs.readFileSync('input.txt')
        .toString()
        .split(',');

    for (let i = 0; i < 80; i++) {
        for (let currentFishCycle = 0; currentFishCycle < allFish.length; currentFishCycle++) {
            if (allFish[currentFishCycle] === 0) {
                allFish.push(9);
                allFish[currentFishCycle] = 6;
            } else {
                allFish[currentFishCycle] -= 1;
            }
        }
    }
    
    const result = allFish.length;
    console.log(result);
}

main();
