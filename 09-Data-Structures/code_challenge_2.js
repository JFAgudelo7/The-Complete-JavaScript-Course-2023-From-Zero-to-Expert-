const game = {
    team1:  'Bayern Munich',
    team2: 'Borussia Dortmund',
    players: [
        [
            'Never','Pavard','Martines','Alaba','Davies',

        ],
        [
            'BNurki','Schulz','Hazard','Sancho',
        ],
    ],
    score: '4:0',
    scored: ['Lewandoski','Gnarby','Lewandoski','Gnarby'],
    date: 'Nov 9th, 2037',
    odds: {
        team1: 1.33,
        x: 3.25,
        team2: 6.5
    },
};

for (const [i, player] of game.scored.entries())
    console.log(`Goal ${i + 1}: ${player}`);


const odds = Object.values(game.odds);
let average = 0;
for (const odd of odds) average += odd;
average /= odds.length;
console.log(average);

for (const [team, odd] of Object.entries(game.odds)){
    const teamStr = team === 'x' ? 'draw' : `victory ${game[team]}` 
    console.log(`Odd of ${teamStr} ${odd}`)
}


// Code Challenge 3
console.log("Code Challenge #3");

const gameEvents = new Map([
    [17, ' GOAL'],
    [36, ' Substitution'],
    [47, ' GOAL'],
    [61, ' Substitution'],
    [64, ' Yellow Card'],
    [69, ' Red Card'],
    [70, ' Substitution'],
    [72, ' Substitution'],
    [76, ' GOAL'],
    [80, ' GOAL'],
    [92, ' Yellow Card'],
]);

//1. Array of events (no duplicates)
const events = [...new Set(gameEvents.values())];
console.log(events);

//2. After game finished, it was found that the yellow card from minute 64 was unfair. Remove from the event log.
gameEvents.delete(64);

//3. Print the "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
console.log(`An event happened, on average, every ${90 / gameEvents.size} minutes`);
const time = [...gameEvents.keys()].pop();
console.log(time);
console.log(`An event happened, on average, every ${time / gameEvents.size} minutes`);

//4. Loop over the events and log them to the console, making whether it's in the first half or second half
for (const [min, event] of gameEvents){
    const half = min <= 45 ? 'FIRST' : 'SECOND';
    console.log(`[${half} HALF] ${min}:${event}` );
}