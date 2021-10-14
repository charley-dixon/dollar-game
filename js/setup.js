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


// ====== Setup Inputs ======
const ante = document.getElementById('ante');
const names = document.getElementsByClassName('name');
const budgets = document.getElementsByClassName('budget');


// ====== Table ======
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
  let newPname = 'Player ' + (table.rows.length + 1);
  // clone row 1 and modify the player name
  let row2clone = document.getElementById('clone');
  let clone = row2clone.cloneNode(true);
  clone.id = '';

  clone.cells[0].textContent = newPname;
  clone.cells[0].value = 20;

  table.appendChild(clone);
});

// Begin the game
beginBtn.addEventListener('click', function() {
  windows[1].style.display = 'none';
  windows[2].style.display = 'inline';
  endBtn.style.display = 'block';
});
