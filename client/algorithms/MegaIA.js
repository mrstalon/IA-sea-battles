let predictCoordinates = function(array) {
    let x = getRandomInt(0, 10);
    let y = getRandomInt(0, 10);

    if (array[x][y] !== undefined && array[x][y] !== '-' && array[x][y] !== 2) {
        return [x, y];
    } else {
        return predictCoordinates(array);
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

export default predictCoordinates;