import {input} from './input.mjs';

function main(input) {
    
    let heightmap = splitInput(input);
    let lowPoints = findLowPoints(heightmap);
    let basinSizes = lowPoints.map(point => findBasinSize(heightmap, point));
    let result = findSum(basinSizes);
    console.log('Result:', result);
}

function findSum(basinSizes) {
    let sortedSizes = basinSizes.sort((a,b) => b-a);
    let result = sortedSizes.splice(0,3).reduce((a,b) => a*b);
    return result;
}

function findBasinSize(heightmap, lowestPoint) {
    let visited = new Array(heightmap.length);
    for (let i=0; i < visited.length; i++) {
        visited[i] = new Array(heightmap[0].length).fill(0);
    }
    
    findBasinSizeRecursive(heightmap, lowestPoint, visited);
    
    let basinSize = visited.flat().filter(x => x === 1).length;
    return basinSize;
}

function findBasinSizeRecursive(heightmap, currentPoint, visited) {
    let row = currentPoint.row;
    let col = currentPoint.col;
    if (visited[row][col]) {
        return;
    }

    if (heightmap[row][col] === 9) {
        return;
    }

    visited[row][col] = 1;
    findBasinSizeRecursive(heightmap, {row: row+1, col: col}, visited);
    findBasinSizeRecursive(heightmap, {row: row-1, col: col}, visited);
    findBasinSizeRecursive(heightmap, {row: row, col: col+1}, visited);
    findBasinSizeRecursive(heightmap, {row: row, col: col-1}, visited);
    
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

function findLowPoints(heightmap) {
    let lowPoints = [];
    for (let row=1; row < heightmap.length-1; row++) {
        for (let col=1; col < heightmap[row].length-1; col++) {

           if (checkIsSmallest(heightmap[row][col], heightmap[row][col-1], heightmap[row][col+1], 
                heightmap[row-1][col], heightmap[row+1][col])) {
                lowPoints.push({row, col});
            }
        }
    }
    return lowPoints;
}

function checkIsSmallest(cPos, lPos, rPos, upPos, botPos) {
    return cPos < lPos && cPos < rPos && cPos < upPos && cPos < botPos;
}

main(input);
