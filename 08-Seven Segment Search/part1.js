const fs = require('fs');

function main() {
    const outputValues = fs.readFileSync('input.txt')
        .toString()
        .split('\r\n')
        .map(line => line.split(' | ')[1]);
        
    let totalCount = 0;
    outputValues.forEach(element => {
        let valuesCount = element.split(' ').filter(el => el.length ==2||el.length==3||el.length==4||el.length==7).length;
        totalCount +=valuesCount;
    });
    console.log(totalCount);
}

main();
