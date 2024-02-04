/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for (let i = 0; i < games.length; i++) {
        console.log(games.length);
    
      const gameCard = document.createElement('div');

      // add the class game-card to the list
      gameCard.classList.add('game-card');

      // set the inner HTML using a template literal to display some info
      // about each game
      gameCard.innerHTML = `
          <h3>${games[i].name}</h3>
          <p>Description: ${games[i].description}</p>
          <p>Pledged: $${games[i].pledged}</p>
          <p>Goal: $${games[i].goal}</p>
          <p>Backers: ${games[i].backers}</p>
          <img src="${games[i].img}" alt="${games[i].name}" class="game-img" />
      `;

      // append the game card to the games-container
      gamesContainer.appendChild(gameCard);
  }
}


// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((accumulator, game) => {
    return accumulator + game.backers;
}, 0);

// set the inner HTML of contributionsCard using a template literal
contributionsCard.innerHTML = `<p>${totalContributions.toLocaleString()}</p>`;
console.log(totalContributions.toLocaleString());


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

// set inner HTML using template literal
const totalRaised = GAMES_JSON.reduce((accumulator, game) => {
    return accumulator + game.pledged;
}, 0);

raisedCard.innerHTML = `<p>${ "$"+ totalRaised.toLocaleString()}</p>`;
console.log(totalRaised.toLocaleString());

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = `<p>${GAMES_JSON.length}</p>`;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
// use filter() to get a list of games that have met or exceeded their goal
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);
    console.log(unfundedGames.length)
}

filterUnfundedOnly(GAMES_JSON);

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);

    // use the function we previously created to add the funded games to the DOM
    addGamesToPage(fundedGames);

    // Logging the number of games in the array for the Secret Key component
    console.log(fundedGames.length);
    
}
filterFundedOnly(GAMES_JSON);

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// Add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games

const summaryStatement = `We have raised $${totalRaised.toLocaleString()} for ${GAMES_JSON.length} games, ${
    GAMES_JSON.filter(game => game.pledged >= game.goal).length > 0 ? `with ${GAMES_JSON.filter(game => game.pledged >= game.goal).length} games remaining unfunded.` : 'and all games are funded!'
}`;

console.log(summaryStatement);

// create a string that explains the number of unfunded games using the ternary operator


// create a new DOM element containing the template string and append it to the description container

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */



const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});
console.log(sortedGames)

// use destructuring and the spread operator to grab the first and second games
const summaryParagraph = document.createElement("p");
summaryParagraph.innerHTML = summaryStatement;
// create a new element to hold the name of the top pledge game, then append it to the correct element
descriptionContainer.appendChild(summaryParagraph);
// do the same for the runner up item


const [topGame, secondTopGame, ...rest] = sortedGames;

// Create elements for displaying the top games
const topGameElement = document.createElement("p");
topGameElement.textContent = `Top Game: ${topGame.name}`;
console.log(topGameElement)

const secondTopGameElement = document.createElement("p");
secondTopGameElement.textContent = `Second Top Game: ${secondTopGame.name}`;
console.log(secondTopGameElement)
// Append the elements to their respective containers
firstGameContainer.appendChild(topGameElement);
secondGameContainer.appendChild(secondTopGameElement);