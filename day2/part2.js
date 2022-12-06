const { readFileSync } = require('node:fs');

const rock = 1, paper = 2, scissors = 3;
const lose = 0, draw = 3, win = 6;

main(readFileSync('input.txt', 'utf-8'));
function main(input) {
    let theirScore = 0, myScore = 0;

    const rounds = input.split('\n')
        .map(row => row.split(' '));

    for (const [theirMove, myRequirement] of rounds) {
        if (!theirMove || !myRequirement) continue;
        const myMove = determineMyMove(theirMove, myRequirement);

        const theirAddition = moveLetterToScore(theirMove);
        const myAddition = moveLetterToScore(myMove);

        theirScore += theirAddition;
        myScore += myAddition;

        const result = theirAddition - myAddition;

        // The round is a draw
        if (result === 0) {
            theirScore += draw;
            myScore += draw;
        }

        // The opponent wins
        else if (result === 1 || result === -2) {
            theirScore += win;
            myScore += lose;
        }

        // I win
        else if (result === -1 || result === 2) {
            theirScore += lose;
            myScore += win;
        }
    }

    console.info(`Their score: ${theirScore}`);
    console.info(`My score: ${myScore}`);
}

/** Convert a move letter into a move score. */
function moveLetterToScore(letter) {
    switch (letter) {
        case 'A': case 'X':
            return rock;
        case 'B': case 'Y':
            return paper;
        case 'C': case 'Z':
            return scissors;
        default:
            throw new Error(`Invalid move: ${letter}`);
    }
}

/** Determine what my move should be based on a requirement. */
function determineMyMove(theirMove, myRequirement) {
    // Must draw
    if (myRequirement === 'Y') return theirMove;

    // Must lose
    else if (myRequirement === 'X') {
        if (theirMove === 'A') return 'C';
        if (theirMove === 'B') return 'A';
        if (theirMove === 'C') return 'B';
    }
    
    // Must win
    else if (myRequirement === 'Z') {
        if (theirMove === 'A') return 'B';
        if (theirMove === 'B') return 'C';
        if (theirMove === 'C') return 'A';
    }
}