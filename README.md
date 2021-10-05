# The Baseball Dollar Game ⚾️💸

To the people who say that baseball is boring, I say you just haven't found a way to make it fun to watch yet. This is a game that my friend taught me in the stands of a Colorado Rockies baseball game. While I believe the ballpark is the only place this game is truly meant to be played, I realized it has logic that makes for a great web development project so let's see where this goes. I intend to take the basic rules described below, and build that into a script that controls an HTML interface for an online game that you can play with friends. So while I may take some creative liberties as this project goes on, the following description will serve as the foundation for this project.

_This game does require that its participants understand the basic rules and definitions of baseball (Baseball 101 if you will). For anyone who may be unfamiliar with the sport of baseball, I encourage you to [watch this 3 minute video](https://youtu.be/skOsApsF0jQ) before reading further._


## Setup

To play the game you need the following:
* 1 baseball game
* At least 2 spectators who are willing to lose a few bucks having a grand 'ole time with friends
* 1 cup
* A lot of $1 bills (each player should bring their own)


## Objective

The objective of the game is to win as much of everyone else's money as possible and, conversely, not lose any of your own. Be aware that it is possible to lose more money than you bring to the ballpark.


## Rules

### 1) While watching a baseball game, participants will pass the cup in sequential order from `player[0]` to `player[-1]`
  - Players numbers are typically determined by how they are sitting in the stands at the baseball game, going in whatever order makes the most sense when passing a cup full of money around
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
This is an immutable wager, players deposit exactly $1 into the cup each time it is their `turn`

### 4) Based on the ending condition of a player's `turn` (see conditions in step 2 above), the player may have the opportunity to remove money from the cup and back into their wallet before passing the cup to `player[i+1]`.
The amount of money a player can add or remove to or from the cup is based on the [Scoring](#scoring) below

### 5) If a player has zero dollars at the end of their `turn` they are still in the game
They have the opportunity to remove dollars from the cup, assuming there is money in the cup when it is their `turn`, but a running tab is also kept on the player's `ante` that must be repaid before the player can begin removing dollars again.

### 6) The game ends when the baseball game ends
Anyone with money left in their wallet is a winner in my book, but all winners are not necessarily made equal...

Obviously players don't really have any control over whether they win or lose, that all depends on the actual baseball game itself, so the game is really about camaraderie, friendship, and the love of baseball. If you're fiscally conscious, think about this: _the more people you play with the less money you lose_, because you will have fewer `turn`s (and thus less `ante`'ing). So make a lot of friends, finish a beer, save the cup, ask some poor cashier to break a twenty dollar bill into singles, and get down to a ballpark near you.


## Scoring
Only the player holding the cup can add or remove money to or from the cup. Players can only remove money that is in the cup, but they can add money that they don't have. For example, if there is only $1 in the cup and the at-bat results in a double, the player can only add that $1 to their wallet. When _adding_ money to the cup, players are debited $1 if they are out of dollars to put in the cup when it is their `turn`. I think this embodies the true spirit of the game, because ultimately you want everyone to be a part of it, but they don't call it "The Baseball Dollar Game" for no reason.

The amount that is added or removed is as follows:
* **Add $1** to the cup at the start of a `turn`
* **Remove $1** from the cup for any of the following conditions:
  * Single
  * Walk
  * HBP
  * RBI (each RBI is worth $1, batters can get up to 4 RBIs in one at-bat)
* **Remove $2** from the cup for a double
* **Remove $3** from the cup for a triple
* **Remove every dollar in the cup** for a home run
