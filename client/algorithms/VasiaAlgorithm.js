let predictCoordinates = function(array) {
    for(let i=0; i<array.length; i++) {
        for(let r=0; r<array[i].length; r++) {
            if (array[i][r] === 1 || array[i][r] === 0) {
                return [i , r];
            }
        }
    }
}

export default predictCoordinates;
