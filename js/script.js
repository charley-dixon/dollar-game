// variables declarations
let unit = 1; // by default the game is played with $1, but this will allow us
let playerBudget = 20; // by default players will start with $20, this can also be changed

// constructor function for creating new players
function Player(name, money, hasCup) = {
  this.name: name;
  this.money: money;
  this.hasCup: hasCup;
}

// method for adding a dollar to the cup (keep in mind this *removes* a dollar from their wallet)
Player.prototype.addDollar = function() {
  this.money -= 1; //
}
