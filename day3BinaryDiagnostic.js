function solve(arr) {

    let oxArr = arr;
    let co2Arr = arr;
    let ox = findNumber(oxArr, findCount, priority = 0);
    let co2 = findNumber(co2Arr, findCount, priority = 1);
    
    function findNumber(arr, findCount, priority) {
        let position = 0;
        while(arr.length > 1) {
            let copyArr = findCount(arr, position, priority);
            arr = copyArr;
            position+=1;
        }

        let number = parseInt(arr[0],2);
        return number;
    }
    
    function findCount(arr, indexPosition, priority) {
        let zeroarr = [];
        let onearr = [];
        for (let i = 0; i < arr.length; i++) {
            let line = arr[i];
            let digit = line[indexPosition];
            if (digit === '0') {
                zeroarr.push(line);
            } else {
                onearr.push(line);
            }
        }
         
        if (priority === 0) {
            if (zeroarr.length > onearr.length) {
                return zeroarr;
            } else {
                return onearr;
            } 
        } else {
            if (zeroarr.length <= onearr.length) {
                return zeroarr;
            } else {
                return onearr;
            } 
        }
        
    }
  
    let result = ox * co2;
    console.log(result);
}
