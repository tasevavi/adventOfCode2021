const fs = require('fs');

function main() {
    const splitInput = fs.readFileSync('input.txt')
        .toString()
        .split('\r\n');
       
    let sum = 0;
    splitInput.forEach(line => {
        let number = getNumber(line);
        sum += number;
    });    
    console.log(sum);
}

function getNumber(line) {
    let allDigits = line.split(' ');
    let sortedDigits = [];
    for (let i=0; i <allDigits.length; i++) {
        sortedDigits.push(sortElements(allDigits[i]));
    }    

    let tenDigits = sortedDigits.slice(0,10);
    let mixedDigits = sortedDigits.slice(11);
    
    let patern = findPatern(tenDigits);
    let number = Number(mixedDigits.map(e => patern[e]).join(''));
    return number;

    function findPatern(tenDigits) {
        let decoded = {};

        let one = tenDigits.filter(e => e.length == 2)[0];
        let four = tenDigits.filter(e => e.length == 4)[0];
        let seven = tenDigits.filter(e => e.length == 3)[0];
        let eight = tenDigits.filter(e => e.length == 7)[0];
        let three = tenDigits.filter(e => e.length == 5 && checkString(e, seven))[0];
        let nine = tenDigits.filter(e => e.length == 6 && checkString(e, three))[0];
        let zero = tenDigits.filter(e => e.length == 6 && e!== nine && checkString(e, one))[0];
        let six = tenDigits.filter(e => e.length == 6 && e!== zero && e!== nine)[0];
        let five = tenDigits.filter(e => e.length == 5 && checkString(six, e))[0];
        let two = tenDigits.filter(e => e.length == 5 && e!== five && e!== three)[0];

        decoded[zero] = 0;
        decoded[one] = 1;
        decoded[two] = 2;
        decoded[three] = 3;
        decoded[four] = 4;
        decoded[five] = 5;
        decoded[six] = 6;
        decoded[seven] = 7;
        decoded[eight] = 8;
        decoded[nine] = 9;
        return decoded;
    }


    function checkString(string, substring) {
        let allchars = substring.split('');
        for(let i=0; i < allchars.length; i++) {
            let char = allchars[i];
            if (!string.includes(char)) {
                return false;
            }
        }
        return true;
    }

    function sortElements(element) {
        let sorted = element.split('').sort().join('');
        return sorted;
    }
}

main();
