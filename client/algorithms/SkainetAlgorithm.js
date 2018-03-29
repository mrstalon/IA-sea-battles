let predictCoordinates = function(array) {
    for(let i=array.length-1; i!=-1; i--) {
        for(let r=array[i].length-1; r!=-1; r--) {
            if (array[i][r] === 1 || array[i][r] === 0) {
                return [i , r];
            }
        }
    }
}

export default predictCoordinates;