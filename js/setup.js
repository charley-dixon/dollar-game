// ====== Dialogue Boxes for UX/UI ======
const windows = document.getElementsByClassName('column');
const playerTable = document.getElementById('playerTable');
const anteBox = document.getElementById('anteContainer');


// ====== How to Play Variables ======
const startBtn = document.getElementById('start');
const endBtn = document.getElementById('end');


// ====== Game Setup Variables ======
const addBtn = document.getElementById('add');
const subBtn = document.getElementById('subtract');
const table = document.querySelector('tbody');
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


// ====== Gameplay Objects ======
const cup = {
  passes: 0,
  amount: 0,
  atbat: function() {
    for(let i = 1; i <= Object.keys(playersObject).length ; i++) {
      if(playersObject[i].cup === true) {
        return playersObject[i].name;
      }
    }
    return 'None';
  }
}

const scoring = {
  single: function() {
    cup.amount -= 1;
  },
  double: function() {
    if(cup.amount >= 2) {
      cup.amount -= 2;
    } else {
      // it'll be zero no matter what since a double was scored
      cup.amount = 0;
    }
  }
}


// ====== Constructor Functions ======
function Player(name, budget) {
  this.name = name;
  this.budget = budget;
  this.cup = false;
  this.ante = function() {
    // add ante to cup
    cup.amount += Number(ante.value);
    // remove ante from budget
    this.budget -= Number(ante.value);
  }
}



// ====== Event Listeners ======

// Start New Game
startBtn.addEventListener('click', function() {
  windows[1].style.display = 'inline';
  startBtn.style.display = 'none';
  // endBtn.style.display = 'block';
});

// Add Players
addBtn.addEventListener('click', function() {
  // each time a new player is added, the number of players increases by 1
  let newPname = 'Player ' + (table.rows.length + 1);
  // clone row 1 and modify the player name
  let row2clone = document.getElementById('clone');
  let clone = row2clone.cloneNode(true);
  // remove id to prevent conflicts with duplicate IDs
  clone.id = '';
  console.log(clone.cells[0]);
  // change the name of player, but that's it
  clone.cells[0].textContent = newPname;
  table.appendChild(clone);
});

// Subtract Players
subBtn.addEventListener('click', function() {
  if(table.rows.length > 2) {
    table.deleteRow(-1);
  } else {
    alert('You need at least 2 players to play!')
  }
});

// Submit Players
nextBtn.addEventListener('click', function() {
  // grab the current values in the player table
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

  // if the loop is successful it means that every player has a name and budget
  nextBtn.style.display = 'none';
  beginBtn.style.display = 'block';
  playerTable.style.display = 'none';
  anteBox.style.display = 'block';
});

// Ante Control
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

  // Hide setup, display gameplay
  windows[1].style.display = 'none';
  windows[2].style.display = 'inline';
  endBtn.style.display = 'block';
});

// End Game
endBtn.addEventListener('click', function() {
  let sure = prompt('Are you sure? Enter Y to end game, or N to keep playing.');
  if(sure.toLowerCase() === 'y') {
    // hide setup and gameplay boxes
    windows[1].style.display = 'none';
    windows[2].style.display = 'none';

    // hide end btn & turn start btn on in 'How to Play'
    endBtn.style.display = 'none';
    startBtn.style.display = 'block';

    // reset the game setup container
    playerTable.style.display = 'block';
    anteBox.style.display = 'none';
    beginBtn.style.display = 'none';
    nextBtn.style.display = 'block';
    playersObject = {};

    // delete any excess rows in player table, starting with 2 players each time
    while(table.rows.length > 2) {
      console.log(table.rows.length);
      table.deleteRow(-1);
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
