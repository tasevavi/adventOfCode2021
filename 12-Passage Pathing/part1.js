const fs = require('fs');

class Cave {
    constructor(name) {
        this.name = name;
        this.isSmall = name === name.toLowerCase();
        this.isStart = name === 'start';
        this.isEnd = name === 'end';
        this.connectedCaves = new Set();
    }

    addConnectedCave(cave) {
        this.connectedCaves.add(cave)
    }
}

const allCaves = new Map();
const input = fs.readFileSync('input.txt')
    .toString()
    .split('\n')
    .forEach((line) => {
        const [start, end] = line.trim().split('-');
        
        const caveStart = allCaves.get(start) || new Cave(start);
        const caveEnd = allCaves.get(end) || new Cave(end);

        caveStart.addConnectedCave(caveEnd);
        caveEnd.addConnectedCave(caveStart);

        if (!allCaves.has(start)) {
            allCaves.set(start, caveStart);
        }

        if (!allCaves.has(end)) {
            allCaves.set(end, caveEnd);
        }
    });

const paths = [];

const findPaths = (path = []) => {
    const currentCave = path.slice(-1)[0];

    if (currentCave.isEnd) {
        paths.push(path.map(cave => cave.name).join('-'));
        return;
    }

    const cavesToExplore = [...currentCave.connectedCaves].filter((cave) => {
        const visitedSmallCave = cave.isSmall && path.includes(cave);
        return !visitedSmallCave && !cave.isStart;
    });

    cavesToExplore.forEach((cave) => findPaths([...path, cave]));
}

findPaths([allCaves.get('start')]);
console.log('Number of paths:', paths.length);
