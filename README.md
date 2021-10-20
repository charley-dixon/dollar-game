# 💸⚾️ The Baseball Dollar Game ⚾️💸

To the people who say that baseball is boring, I say you just haven't found a way to make it fun to watch yet. This is a game that my friend taught me in the stands of a Colorado Rockies baseball game. While I believe the ballpark is the only place this game is truly meant to be played, I realized it has logic and rules that make for a great object oriented programming project so let's see where this goes. I intend to take the basic rules described below, and build that into a script that controls an HTML interface for an online game that you can play with friends. So while I may take some creative liberties as this project goes on, the following description will serve as the foundation for this project.

_This game does require that its participants understand the basic rules and definitions of baseball (Baseball 101 if you will). For anyone who may be unfamiliar with the sport of baseball, I encourage you to [watch this 3 minute video](https://youtu.be/skOsApsF0jQ) before reading further._

### Contents
* [Setup](#setup)
* [Objective](#objective)
* [Rules](#rules)
* [Scoring](#scoring)
* [Resources & Lessons Learned](#resources--lessons-learned)
* [Programming Decisions](#programming-decisions)


## Setup

To play the game you need the following:
* 1 baseball game
* At least 2 spectators who are willing to lose a few bucks having a grand 'ole time with friends
* 1 cup
* A lot of $1 bills (each player should bring their own)


## Objective

The objective of the game is to win as much of everyone else's money as possible and, conversely, not lose any of your own. If you run out of money, you are out of the game.


## Rules

### 1) While watching a baseball game, participants will pass the cup in sequential order from `player[0]` to `player[-1]`
  - The order is typically determined by how players are sitting in the stands at the baseball game, going in whatever order makes the most sense when passing a cup full of money around
  - Whenever a player is holding a cup it is their `turn`
  - The cup goes back to `player[0]` after `player[-1]`'s `turn`


### 2) The cup is passed to the next player each time there is a new at-bat in the baseball game (`new at-bat === new turn`)
When watching a baseball game in person you might think that because there is a new batter at the plate that it is a new at-bat and thus it is a new `turn`, however that is not always the case. In baseball, 2 or more batters can combine to complete 1 at-bat if `batter[0]` is injured during an at-bat or a manager decides to substitute `batter[i+1]` in the middle of an at-bat (though this is not common). In _this_  baseball game, an at-bat is over when one of the following conditions are met in the actual baseball game (note that these conditions are more inclusive than the way an at-bat is [scored](https://www.mlb.com/official-information/basics/score) in the actual game of baseball, see rules for more):
  * Batter gets a base hit (single, double, triple, or home run)
  * Batter reaches base on error
  * Batter reaches base on a fielder's choice
  * Batter is ruled out
  * Batter walks or is hit by a pitch (HBP)
  * Batter hits a sacrifice fly or sacrifice bunt


### 3) Upon receiving the cup, players must "`ante`" a dollar into the cup
Once this amount is determined (before the game begins) it is an immutable wager, players deposit the same `ante` into the cup each time it is their `turn`


### 4) Based on the ending condition of a player's `turn` (see conditions in step 2 above), the player may have the opportunity to remove money from the cup and back into their wallet before passing the cup to `player[i+1]`.
The amount of money a player can add or remove to or from the cup is based on the [Scoring](#scoring) below


### 5) The game ends when the baseball game ends
Anyone with money left in their wallet is a winner in my book, but all winners are not necessarily made equal...

Obviously players don't really have any control over whether they win or lose, that all depends on the actual baseball game itself, so the game is really about camaraderie, friendship, and the love of baseball. If you're fiscally conscious, think about this: _the more people you play with the less money you lose_, because you will have fewer `turn`s (and thus less `ante`'ing). So make a lot of friends, finish a beer, save the cup, ask some poor cashier to break a twenty dollar bill into singles, and get down to a ballpark near you.


## Scoring
As the cup moves through the order, the amount of money in the cup will grow and shrink depending on the results of the at-bats in the baseball game. Only the player holding the cup can add or remove money to or from the cup. Money can only be added/removed based on the conditions below (note that the money stays in the cup between innings):

* **Add $1** to the cup at the start of a `turn`
* **Remove $1** from the cup for any of the following conditions:
  * Single
  * Walk
  * HBP
  * RBI (each RBI is worth $1, batters can get up to 4 RBIs in one at-bat)
* **Remove $2** from the cup for a double
* **Remove $3** from the cup for a triple
* **Remove every dollar in the cup** for a home run


## Resources & Lessons Learned

This is an ongoing list that I will update as the project moves along:
* Getters and setters allow us to dynamically change the values of object properties
  * I was unable to get the various scoring results to update on their own. For example, if I changed the `ante` to be $5 instead of $1 I want that value to automatically update in my scoring object.
* Understanding how to take various pieces of the program and use them to `get` or `set` object properties made this remarkably easier to program.
  * Instead of writing 100 different functions to update parts of my display (i.e. retrieving the budget of the person holding the cup), I can `get` the value of `cup.index` (which is `set` by pressing the "Begin Game" button) to access the correct key in `playersObject` to then access the property `this.budget` for the player who is holding the cup. Much easier than having to write an `updateBudget` function. This project has been crucial in my understanding of OOP & OOJS.
* Put some major thought into the names of your variables...


## Questions

* In large applications, does _when_ you declare your variables affect the performance of the application? For example, if I have a form with a lot of inputs, I think it would make sense not to retrieve the value of those inputs (by adding event listeners) until a submission event occurs. If we have an event listener that is hanging out constantly updating the input values then I feel it could slow down the program.


## Programming Decisions

As the project goes along, I am going to keep track of significant decisions made when I either added or altered the foundational rules of play:
* I've included a user input to allow users to play for more or less than $1 per `turn`
  * While I don't think that players should be allowed to add more or less money when it is their `turn`, I do think that people should be able to play with more money if that would make things more interesting.
* Home runs are defined as a Getter
  * This allows me to get the value of a home run by calling `scoring.homeRun` instead of `scoring.homeRun()`
* I am going to create different scripts for the setup & rules/gameplay to keep my code organized
* Order will be randomized since players are not actually sitting at a baseball game
  * This keeps the game fair since the order is probably the most important element of luck
* Instead of the original flow I envisioned (# of players, player names, player budgets, units per turn), it would make more sense to create each player one by one with a specific budget assigned to them. This way I can call the player constructor function each time this information is entered.
* I want to use a `setter` function to change the index for the cup

<!-- ====== IDEAS ====== -->
<!-- In a more complete version, make the game like an online vending machine that makes you insert one dollar to play the game. It would have to mean that the game is more well-known at that point however, so people know what they're paying for -->
<!-- Create a video that walks through your process. Granted, the video will not contain footage of you doing 90% of the coding, but it will allow you a chance to explain your process at each step along the way. Film videos of people using your prototype to get feedback from them and then iterate. Show the next part of the process and so on and so forth. So, once you get prototype v0.1 up and running you should film a progress update. You should regularly film progress updates along the way.  -->
<!-- Ultimately, this game could evolve into some sort of tool that an online sportsbook could use as a live in-game prop betting interface. The app would pull up the batter and display the various odds of that player getting on base, out, etc. and allow users to bet in real time on exactly who was batting. This would obviously require instantaneously updating status about odds and such, but it could be really cool if executed properly. Essentially I could start my own sportsbook, which would put me under many regulations for gambling purposes... I would want to implement a feature that makes players deposit money for a one-time experience that ends after the game ends. They would not be allowed to start another game for X amount of minutes, and they have to redeposit each time. Adding friction is intentional, because we do not want to get people addicted to gambling. We want them to have a 2-3 hour experience that keeps them engaged in the baseball game, this is for the MLB more than it is the sportsbooks. Advertise this strictly inside baseball games in states where betting on sports is legal. -->
<!-- This next version of this project would be to tie in the baseball game via API -->
