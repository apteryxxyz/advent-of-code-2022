const { readFileSync } = require('node:fs');

main(readFileSync('input.txt', 'utf-8'));
function main(input) {
    const elfs = input.split('\n\n');

    // Using new Function() is bad, but I wanted a unique solution
    const calories = elfs.map(row =>
        new Function(`return ${row.trim().replaceAll('\n', '+')}`)());
    
    const most = Math.max(...calories);
    console.info(`Most calories: ${most}`);
}
