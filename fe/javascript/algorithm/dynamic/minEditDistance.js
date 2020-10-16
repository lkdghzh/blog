// dynamic program way
// https://blog.csdn.net/a553181867/article/details/89008264
function minEditDistance(sourceStr = '', targetStr = '') {
    const distanceTable = Array.from({ length: sourceStr.length + 1 }, (_, i) => {
        const fisrtColumn = Array.from({ length: targetStr.length + 1 }, (_, j) => j)
        const column = new Array(targetStr.length).fill(i, 0, 1).fill(undefined, 1);
        return i === 0 ? fisrtColumn : column
    });
    for (var i = 1; i <= sourceStr.length; i++) {
        for (var j = 1; j <= targetStr.length; j++) {
            // dp 
            var flag = 1;
            if (sourceStr.charAt(i - 1) == targetStr.charAt(j - 1)) {
                flag = 0
            }
            console.log(`first${i},${j}`, Math.min(distanceTable[i - 1][j] + 1, Math.min(distanceTable[i][j - 1] + 1, distanceTable[i - 1][j - 1] + flag)));
            distanceTable[i][j] = Math.min(distanceTable[i - 1][j] + 1, Math.min(distanceTable[i][j - 1] + 1, distanceTable[i - 1][j - 1] + flag))
        }
    }
    return distanceTable[--i][--j]

}

console.log('sss', minEditDistance('horse', 'ros'))


/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistanceTest = function (word1, word2) {
    console.log(word1, word2);
    const distanceTable = Array.from({ length: word1.length + 1 }, (_, i) => {
        const fisrtColumn = Array.from({ length: word2.length + 1 }, (_, j) => j)
        const column = new Array(word2.length + 1).fill(i, 0, 1).fill(undefined, 1);
        return i === 0 ? fisrtColumn : column
    });
    for (var i = 1; i <= word1.length; i++) {
        for (var j = 1; j <= word2.length; j++) {
            // dp 
            var flag = 1;
            if (word1.charAt(i - 1) === word2.charAt(j - 1)) {
                flag = 0
            }
            const left = distanceTable[i - 1][j] + 1;
            const top = distanceTable[i][j - 1] + 1;
            const leftTop = distanceTable[i - 1][j - 1] + flag;

            console.log(`${i},${j}`, Math.min(left, Math.min(top, leftTop)))
            distanceTable[i][j] = Math.min(left, Math.min(top, leftTop))
        }
    }
    console.log('distanceTable', distanceTable)
    console.log('distanceTable[i][j]', distanceTable[word1.length][word2.length])
    return distanceTable[word1.length][word2.length]
};
minDistanceTest('horse', 'ros')
