// Game Setup
// This script defines the procedures for setting up the game:
// Player reads rules
// Player starts new game
// Rules shift over and second div has display changed from none to flex

// ====== Container Windows ======
const windows = document.getElementsByClassName('column');
const anteBox = document.getElementById('anteContainer');
const playerTable = document.getElementById('playerTable');


// ====== Buttons ======
const startBtn = document.getElementById('start');
const endBtn = document.getElementById('end');
const addBtn = document.getElementById('add');
const subBtn = document.getElementById('subtract');
const nextBtn = document.getElementById('next');
const beginBtn = document.getElementById('begin');
beginBtn.style.display = 'none';
const controlBtns = document.getElementsByClassName('control');


// ====== Setup Inputs ======
const ante = document.getElementById('ante');
const names = document.getElementsByClassName('name');
const budgets = document.getElementsByClassName('budget');


// ====== Table ======
const table = document.querySelector('tbody');

// ====== Players ======
// ***************************************************************
// this is populated once the "Next" button is properly submitted
// it is the most important piece of information being collected from the user
// ***************************************************************
const playersObject = {};



// ====== Constructor Functions ======

function Player(name, budget) {
  this.name = name;
  this.budget = budget;
  this.cup = false;
}



// ====== Event Listeners ======

// Start the new game
startBtn.addEventListener('click', function() {
  windows[1].style.display = 'inline';
  startBtn.style.display = 'none';
  // endBtn.style.display = 'block';
});

// Add more players
addBtn.addEventListener('click', function() {
  let newPname = 'Player ' + (table.rows.length + 1);
  // clone row 1 and modify the player name
  let row2clone = document.getElementById('clone');
  let clone = row2clone.cloneNode(true);
  clone.id = '';

  clone.cells[0].textContent = newPname;
  clone.cells[0].value = 20;

  table.appendChild(clone);
});

// Subtract players
subBtn.addEventListener('click', function() {
  if(table.rows.length > 2) {
    table.deleteRow(-1);
  } else {
    alert('You need at least 2 players to play!')
  }
});

// Submit players and move onto the ante
nextBtn.addEventListener('click', function() {
  let players = document.getElementsByClassName('name');
  let budgets = document.getElementsByClassName('budget');

  // check if any players names are not filled out and alert
  for(let i = 0 ; i < players.length ; i++) {
    if(players[i].value === '' || budgets[i].value === '') {
      return alert('Please provide names and budgets for all players.');
    }
  }

  // if loop is successful, create all players with constuctor function
  for(let i = 0 ; i < players.length ; i++) {
    playersObject[i + 1] = new Player(players[i].value, budgets[i].value);
  }

  // if the loop is successful it means that every player has a name and budget
  nextBtn.style.display = 'none';
  beginBtn.style.display = 'block';
  playerTable.style.display = 'none';
  anteBox.style.display = 'block';
});

// Add or subtract from the ante
for(let i = 0 ; i < controlBtns.length ; i++) {
  controlBtns[i].addEventListener('click', function() {
    ante.value = Number(ante.value) + Number(this.name);
  });
}

// Begin the game
beginBtn.addEventListener('click', function() {

  if(ante.value < 1) {
    return alert('You need to wager at least $1 to play!');
  }

  windows[1].style.display = 'none';
  windows[2].style.display = 'inline';
  endBtn.style.display = 'block';
});
