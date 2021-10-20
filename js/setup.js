// ====== Dialogue Boxes for UX/UI ======
const windows = document.getElementsByClassName('column');
const adjustPlayers = document.getElementById('playerTable'); // this is for the <tbody> tag
const playerTable = document.getElementById('playerTableBody');
const anteBox = document.getElementById('anteContainer');


// ====== How to Play Variables ======
const startBtn = document.getElementById('start');


// ====== Game Setup Variables ======
const addBtn = document.getElementById('add');
const subBtn = document.getElementById('subtract');
const playersTable = document.getElementById('tablePlayers');
const names = document.getElementsByClassName('name');
const budgets = document.getElementsByClassName('budget');
const nextBtn = document.getElementById('next');
const ante = document.getElementById('ante');
const controlBtns = document.getElementsByClassName('control');
const beginBtn = document.getElementById('begin');
// ***************************************************************
// this is populated once the "Next" button is properly submitted
// it is the most important piece of information being collected from the user
// ***************************************************************
let playersObject = {};



// Gameplay windows
const displayTable = document.getElementById('displaytable');
const rbiWindow = document.getElementById('rbi');
const resultWindow = document.getElementById('results');
const results = document.getElementsByClassName('result');
const standingsWindow = document.getElementById('standings');
const scoreboard = document.getElementById('scoreboard');


// ====== Gameplay Variables ======
const out = results[0];
const walk = results[1];
const single = results[2];
const double = results[3];
const triple = results[4];
const homerun = results[5];
const rbis = document.getElementById('rbis');
const passBtn = document.getElementById('pass');
const endBtn = document.getElementById('end');


// ====== Gameplay Objects ======
const cup = {
  passes: 0,
  amount: 0,
  index: 1, // always starts at player 1 which is an object key, NOT an array index (i.e. does not start at '0')

  // pass the cup
  pass: function() {
    // if the cup is at the last person in line reset to index 1, otherwise add 1
    if(this.index === Object.keys(playersObject).length) {
      this.index = 1;
    } else {
      this.index += 1;
    }
    // after new index is set, ante up
    playersObject[this.index].ante();
  },

  // using this value to access the next player to hold the cup
  // could not use the 'pass' method because it actually changes this.index
  get ondeck() {
    if(this.index === Object.keys(playersObject).length) {
      return 1;
    } else {
      return this.index + 1;
    }
  }
}

const scoring = {
  single: function(player) {
    cup.amount -= Number(ante.value);
    player.budget += Number(ante.value);
  },
  double: function(player) {
    if(cup.amount >= 2 * Number(ante.value)) {
      cup.amount -= 2 * Number(ante.value);
      player.budget += 2 * Number(ante.value);
    } else {
      // it'll be zero no matter what since a double was scored
      player.budget += cup.amount;
      cup.amount = 0;
    }
  },
  triple: function(player) {
    if(cup.amount >= 3 * Number(ante.value)) {
      cup.amount -= 3 * Number(ante.value);
      player.budget += 3 * Number(ante.value);
    } else {
      // it'll be zero no matter what since a triple was scored
      player.budget += cup.amount;
      cup.amount = 0;
    }
  },
  homerun: function(player) {
    player.budget += cup.amount;
    cup.amount = 0;
  },
  rbi: function(player) {
    if(cup.amount >= Number(rbis.value)) {
      cup.amount -= Number(rbis.value);
      player.budget += Number(rbis.value);
    } else {
      player.budget += cup.amount;
      cup.amount = 0;
    }
  }
}


// ====== Constructor Functions ======
// this is our only constructor function because it is the only object that is user-created
function Player(name, budget) {
  this.name = name;
  this.budget = budget;
  this.atbats = 0;
  this.ante = function() {
    // add ante to cup
    cup.amount += Number(ante.value);
    // remove ante from budget
    this.budget -= Number(ante.value);
    this.atbats += 1;
  }
}



// ====== Event Listeners ======

// Start New Game
startBtn.addEventListener('click', function() {
  windows[1].style.display = 'inline';
  startBtn.style.display = 'none';
});

// Add Players
addBtn.addEventListener('click', function() {
  // each time a new player is added, the number of players increases by 1
  let newPname = 'Player ' + (playerTable.rows.length + 1);
  // clone row 1 and modify the player name
  let row2clone = document.getElementById('clone');
  let clone = row2clone.cloneNode(true);
  // remove id to prevent conflicts with duplicate IDs
  clone.id = '';
  // change the name of player, but that's it
  clone.cells[0].textContent = newPname;
  playerTable.appendChild(clone);
});

// Subtract Players
subBtn.addEventListener('click', function() {
  if(playerTable.rows.length > 2) {
    playerTable.deleteRow(-1);
  } else {
    alert('You need at least 2 players to play!')
  }
});

// Submit Players
nextBtn.addEventListener('click', function() {
  // grab the current values in the player table
  // I want to grab these "live" meaning that the variables aren't created until someone clicks the button
  let players = document.getElementsByClassName('name');
  let budgets = document.getElementsByClassName('budget');

  // *******VALIDATION*******
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

  // update the displays
  nextBtn.style.display = 'none';
  beginBtn.style.display = 'block';
  adjustPlayers.style.display = 'none';
  anteBox.style.display = 'block';
});

// Setting the Ante with control buttons
for(let i = 0 ; i < controlBtns.length ; i++) {
  controlBtns[i].addEventListener('click', function() {
    ante.value = Number(ante.value) + Number(this.name);
  });
}

// Begin Game
beginBtn.addEventListener('click', function() {

  if(ante.value < 1) {
    return alert('You need to wager at least $1 to play!');
  }

  // ante up
  playersObject[1].ante();

  // update display
  updateDisplay();

  // Hide setup, display gameplay
  windows[1].style.display = 'none';
  windows[2].style.display = 'inline';
});



// ====== GAMEPLAY FUNCTIONS ======
// These are repeated actions that happen any time one of the buttons is clicked on the interface

function updateDisplay() {
  // Fill in the display on the next screen
  // dollars in the cup
  displayTable.rows[0].cells[1].textContent = cup.amount;
  // person holding the cup
  displayTable.rows[1].cells[1].textContent = playersObject[cup.index].name;
  // budget of person holding the cup
  displayTable.rows[2].cells[1].textContent = playersObject[cup.index].budget;
  // person on deck
  displayTable.rows[3].cells[1].textContent = playersObject[cup.ondeck].name;
}

function rbiCheck() {
  // this function literally just flips the windows and shows the pass btn.
  // hide the results, and prompt user for RBIs
  resultWindow.style.display = 'none';
  rbiWindow.style.display = 'block';
}


// ========= Gameplay Event Listeners ==========
// each event listener simply updates and retrieves values from the objects I've created (people, cup, and scoring)

// Out or FC
out.addEventListener('click', function() {
  // check for RBIs
  rbiCheck();
});

// singles & walks
walk.addEventListener('click', function() {
  scoring.single(playersObject[cup.index]);
  rbiCheck();
});

single.addEventListener('click', function() {
  scoring.single(playersObject[cup.index]);
  rbiCheck();
});

// doubles
double.addEventListener('click', function() {
  scoring.double(playersObject[cup.index]);
  rbiCheck();
});

// triples
triple.addEventListener('click', function() {
  scoring.triple(playersObject[cup.index]);
  rbiCheck();
});

// home run
homerun.addEventListener('click', function() {
  scoring.homerun(playersObject[cup.index]);
  cup.pass();
  updateDisplay();
});

// pass the cup
passBtn.addEventListener('click', function() {
  scoring.rbi(playersObject[cup.index]);
  rbis.value = 0;
  // pass the cup and update the display
  cup.pass();
  updateDisplay();

  // reset the results and rbi windows
  rbiWindow.style.display = 'none';
  resultWindow.style.display = 'flex';
});

// Check Scoreboard
scoreboard.addEventListener('click', function() {
  // hide player table AND results
});

// End Game
endBtn.addEventListener('click', function() {
  let sure = prompt('Are you sure? Enter Y to end game, or N to keep playing.');
  if(sure.toLowerCase() === 'y') {
    // hide setup and gameplay boxes
    windows[1].style.display = 'none';
    windows[2].style.display = 'none';

    // Turn start btn on in 'How to Play'
    startBtn.style.display = 'block';

    // reset the game setup container
    adjustPlayers.style.display = 'block';
    anteBox.style.display = 'none';
    beginBtn.style.display = 'none';
    nextBtn.style.display = 'block';
    playersObject = {};

    // reset cup
    cup.amount = 0;
    cup.index = 1;

    // delete any excess rows in player table, starting with 2 players each time
    while(playerTable.rows.length > 2) {
      playerTable.deleteRow(-1);
    }

    // *AFTER the while loop, reset the values of the table to ''
    let players = document.getElementsByClassName('name');
    let budgets = document.getElementsByClassName('budget');
    for(let i = 0 ; i < players.length ; i++) {
      players[i].value = '';
      budgets[i].value = '';
    }
  }
});
