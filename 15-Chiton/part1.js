const fs = require('fs');

class RiskPoint {
    constructor(x,y,risk) {
        this.x = x;
        this.y = y;
        this.risk = risk;
    }
}

function main() {
    const matrix = fs.readFileSync('input.txt')
        .toString()
        .split('\r\n')
        .map(line => line.split('').map(el => Number(el)));
       
    let lowestRisk = Number.MAX_SAFE_INTEGER;
    const colLength = matrix.length;
    const rowLength = matrix[0].length;
    const visited = createMatrix(colLength, rowLength, 0);
    const bestRisks = createMatrix(colLength, rowLength, Number.MAX_SAFE_INTEGER);
    const maxWorstRisk = (((rowLength - 1 - 0) + (colLength - 1 - 0)) * 9) - matrix[0][0];
    
    tryPath(0, 0, -matrix[0][0]);

    function tryPath(x, y, pathRisk) {

        if (y === colLength-1 && x === rowLength-1) {
            pathRisk += matrix[y][x];
            if (pathRisk < lowestRisk) {
                lowestRisk = pathRisk;
                console.log('Lowest risk:', lowestRisk);
            }
            return;
        }
    
        const currentRisk = matrix[y][x];
        pathRisk += currentRisk;

        if (pathRisk >= bestRisks[y][x]) {
            return;
        }

        if (pathRisk < bestRisks[y][x]) {
            bestRisks[y][x] = pathRisk;
        }
        
        if (pathRisk >= lowestRisk) {
            return;
        }

        const worstRisk = ((rowLength - 1 - x) + (colLength - 1 - y)) * 9 - matrix[0][0];
        
        if ((pathRisk + worstRisk) > maxWorstRisk) {
            return;
        }

        visited[y][x] = 1;
        const neighbors = getNeighbors(x,y);
        neighbors.forEach((n) => {
            tryPath(n.x, n.y, pathRisk);
        });
        
        visited[y][x] = 0;
    }

    function getNeighbors(x,y) {

        let neighbors = [];
        let right = getNeighborSafe(x+1, y);
        if (right) {
            neighbors.push(right);
        }

        let down = getNeighborSafe(x, y+1);
        if (down) {
            neighbors.push(down);
        }

        let left = getNeighborSafe(x-1, y);
        if (left) {
           neighbors.push(left);
        } 

        let up = getNeighborSafe(x, y-1);
        if (up) {
           neighbors.push(up);
        }

        neighbors.sort((a,b) => a.risk-b.risk);
        return neighbors;
    }

    function getNeighborSafe(x,y) {
        if (x < 0 || x >= rowLength || y < 0 || y >= colLength) {
            return undefined;
        }

        if (visited[y][x]) {
            return undefined;
        }

        return new RiskPoint(x,y,matrix[y][x]);
    }
}

function createMatrix(matrixLength, rowLength, initial) {
    const visited = new Array(matrixLength).fill().map(() => new Array(rowLength).fill(initial));
    return visited;
}

main();
