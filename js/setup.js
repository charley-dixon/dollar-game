// Game Setup
// This script defines the procedures for setting up the game:
// Player reads rules
// Player starts new game
// Rules shift over and second div has display changed from none to flex

// ====== Container Windows ======
const windows = document.getElementsByClassName('column');

// ====== Buttons ======
const startBtn = document.getElementById('start');
const endBtn = document.getElementById('end');
const addBtn = document.getElementById('add');
const beginBtn = document.getElementById('begin');
const controlBtns = document.getElementsByClassName('control');

// ====== Inputs ======
const ante = document.getElementById('ante');
const names = document.getElementsByClassName('name');
const budgets = document.getElementsByClassName('budget');
const table = document.querySelector('tbody');

// ====== Event Listeners ======
// Start the new game
startBtn.addEventListener('click', function() {
  windows[1].style.display = 'inline';
  startBtn.style.display = 'none';
  // endBtn.style.display = 'block';
});

// Add or subtract from the ante
for(let i = 0 ; i < controlBtns.length ; i++) {
  controlBtns[i].addEventListener('click', function() {
    ante.value = Number(ante.value) + Number(this.name);
  });
}

// Add more players
addBtn.addEventListener('click', function() {
  let newRow = table.insertRow(-1);
});

// Begin the game
beginBtn.addEventListener('click', function() {
  windows[1].style.display = 'none';
  windows[2].style.display = 'inline';
});



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
// Creating Players
// -----------------------------------------------------------------------------
function Player(name, budget) {
  this.name = name;
  this.budget = budget;
  // method to ante up when it is their turn
  this.ante = function() {
    this.budget -= scoring.ante;
  };
}
