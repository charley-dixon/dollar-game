# The Baseball Dollar Game ⚾️💸

To the people who say that baseball is boring, I say you just haven't found a way to make it fun to watch yet. This is a game that my friend taught me in the stands of a Colorado Rockies baseball game. While I believe the ballpark is the only place this game is truly meant to be played, I realized it has logic and rules that make for a great object oriented programming project so let's see where this goes. I intend to take the basic rules described below, and build that into a script that controls an HTML interface for an online game that you can play with friends. So while I may take some creative liberties as this project goes on, the following description will serve as the foundation for this project.

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
This is an immutable wager, players deposit exactly $1 into the cup each time it is their `turn`


### 4) Based on the ending condition of a player's `turn` (see conditions in step 2 above), the player may have the opportunity to remove money from the cup and back into their wallet before passing the cup to `player[i+1]`.
The amount of money a player can add or remove to or from the cup is based on the [Scoring](#scoring) below


### 5) If a player has zero dollars at the end of their `turn` they are still in the game
They have the opportunity to remove dollars from the cup, assuming there is money in the cup when it is their `turn`, but a running tab is also kept on the player's `ante` that must be repaid before the player can begin removing dollars again. See [Accounting](#accounting) for a more in-depth explanation of how this is accounted for.


### 6) The game ends when the baseball game ends
Anyone with money left in their wallet is a winner in my book, but all winners are not necessarily made equal...

Obviously players don't really have any control over whether they win or lose, that all depends on the actual baseball game itself, so the game is really about camaraderie, friendship, and the love of baseball. If you're fiscally conscious, think about this: _the more people you play with the less money you lose_, because you will have fewer `turn`s (and thus less `ante`'ing). So make a lot of friends, finish a beer, save the cup, ask some poor cashier to break a twenty dollar bill into singles, and get down to a ballpark near you.


## Scoring
As the cup moves through the order, the amount of money in the cup will grow and shrink depending on the results of the at-bats in the baseball game (details outlined below). Only the player holding the cup can add or remove money to or from the cup. Money can only be added/removed based on the conditions below (the cup stays filled between innings):

* **Add $1** to the cup at the start of a `turn`
* **Remove $1** from the cup for any of the following conditions:
  * Single
  * Walk
  * HBP
  * RBI (each RBI is worth $1, batters can get up to 4 RBIs in one at-bat)
* **Remove $2** from the cup for a double
* **Remove $3** from the cup for a triple
* **Remove every dollar in the cup** for a home run


### Accounting
When it comes to accounting for these dollars, leave your traditional accounting brain at the gates. In the event that a player runs out of money, they can elect to be debited the dollar owed on their `turn` to stay in the game. However, that dollar is not credited anywhere - so it simply serves as a debt that the individual player must repay before they can begin removing money from the cup again. For example, if a player has no money and the cup holds $1 at the beginning of their `turn` (leftover from the prior player's `turn`), and the result of the at-bat is that they can remove $1 from the cup, then the player's $1 debt is cleared but they would simply leave the physical dollar in the cup. The player holding the cup would need the conditions to add up to at least $2 to take the dollar from the cup. Other players can also choose to loan dollars to people to keep the cash flowing for all, otherwise the player in debt must hope for some extra base hits and RBIs when it is their `turn`.

In the reverse situation, when a player has the opportunity to remove more money from the cup than is actually in it, there is no accounting for dollars "owed" to the player. For example, if there is only $1 in the cup and the at-bat results in a double, the player can only add $1 to their wallet and effectively "miss out" on an additional $1. I think this odd method of accounting embodies the true spirit of the game by making exceptions to traditional accounting methods for the sake of friendship and baseball.


## Resources & Lessons Learned

This is an ongoing list that I will update as the project moves along:


## Programming Decisions

As the project goes along, I am going to keep track of significant decisions made when I either added or altered the foundational rules of play:
* I've included a user input to allow users to play for more or less than $1 per `turn`
  * While I don't think that players should be allowed to add more or less money when it is their `turn`, I do think that people should be able to play with more money if that would make things more interesting.
