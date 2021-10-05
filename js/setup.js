// Game Setup
// This script defines the procedures for setting up the game:
// 1) How many people would like to play? (need to construct players upon user entry and add them to a list)
// 2) What are your player's names? (randomize the order of the players in the list)
// 3) How much money would you like to put in the cup each turn? (set scoring based on unit)
// 4) startgame()
const setupForms = document.getElementById('setup'); // this will give us an array that allows us to turn on and off each form to present the to the user one at a time
const numPlayers = document.getElementById('numPlayers');
const playerNames = document.getElementById('playerNames');
const unit = document.getElementById('unit');
const startGame = document.getElementById('startGame');

// need a method for setting player order randomly
function setOrder(players) {
  Math.floor(Math.random() * players.length);
}



// the cup starts out with zero dollars at the beginning of the game
let cup = {
  dollars: 0,
  get position() {
    // function that returns the position of the cup within the player array
  }
}

// Once unit, players, and cup are created, the scoring can be set
const scoring = {
  ante: null,
  set ante(unit) {
    this.ante = -1 * unit;
  },
  walk: 1 * unit,
  hbp: 1 * unit,
  rbi: 1 * unit,
  single: 1 * unit,
  double: 2 * unit,
  triple: 3 * unit,
  get homerun() {
    return cup.dollars;
  }
};

// -----------------------------------------------------------------------------
// ENTERING PLAYER NAMES
// -----------------------------------------------------------------------------
// based on the number of players selected, a list of names will be generated
function setPlayerNames() {

}

// constructor function for creating new players
// actions that players take: adding and removing money from cup
function Player(name, money, hasCup) {
  this.name = name;
  this.money = money;
};

Player.prototype.myTurn = function() {
  // if they have the cup, return true
  if(cup.position === this.position)
  // if they don't return false
};

// ANTE method for adding a dollar to the cup (keep in mind this *removes* a dollar from their wallet)
Player.prototype.ante = function() {
  this.money -= scoring.ante;
  cup.dollars += scoring.ante;
};

// method for taking a dollar from the cup and adding to a player's wallet
Player.prototype.removeDollar = function(turnCondition) {
  // add money to player's wallet based on result of the at-bat
  this.money += turnCondition;
};
