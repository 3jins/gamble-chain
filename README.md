# gamble-chain
Gamble Chain is a blockchain designed to play a game named 섯다(Seotda), which is one of famous Korean traditional gambling. It is possible to play 섯다 without worrying about fraud gambling on this platform.



## Documentation (Brief)

### Structure

* Blocks

  Each block conducts role of a game room. A block can include maximum 10 gamblers. 

* Nodes

  There are two kinds of nodes.

  - mining node

    Mine blocks and execute transactions to manage the game room. They have two main functionalities.

    * makeGameRoom
    * dispenseCards

  - gambling node

    Join game blocks and play the gambling. There are three main transactions that a gambling node can execute.

    * joinGame
    * suggestGameStart
    * betStakes

* Transactions

  Every block has transaction records about it's own game .

  * participants
  * gameStartPolls
  * deckHistory
  * cardDispenseHistory
  * bettingHistory

## Installation

Preparing...

## Contributing

Preparing...