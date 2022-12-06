const { readFileSync } = require('node:fs');

main(readFileSync('input.txt', 'utf-8'));
function main(input) {
    const elfs = input.split('\n\n');

    // Using new Function() is bad, but I wanted a unique solution
    const calories = elfs.map(row =>
        new Function(`return ${row.trim().replaceAll('\n', '+')}`)());
    
    const sorted = calories.sort((a, b) => b - a);
    const topSum = sorted.slice(0, 3).reduce((a, b) => a + b, 0);
    console.info(`Top three combined calories: ${topSum}`);
}
