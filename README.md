# Whaleopoly

Whaleopoly is a fully on-chain parody of Monopoly, built for Starknet using the Dojo engine. It brings the classic Monopoly board game experience to the blockchain, allowing players to compete, trade, and strategize with provable fairness and true digital ownership.

## Game Overview

- **Players:** 2–6 per game
- **Currency:** In-game Monopoly money (virtual), with real ETH (on Starknet) as entry fee and prize
- **Objective:** Be the last player standing by acquiring properties, collecting rent, and bankrupting your opponents

## How to Play

### 1. Join a Game
- Players join a lobby by sending the required ETH entry fee to the game contract.
- Once the lobby is full, the game starts and each player receives a fixed amount of in-game Monopoly money (not real ETH) for gameplay.

### 2. Game Flow
- Players take turns rolling dice, moving around the board, and performing actions based on where they land.
- Actions include buying properties, paying rent, drawing Chance/Community Chest cards, building houses/hotels, trading, and more.
- All in-game transactions (buying, rent, upgrades, trades) use virtual Monopoly money tracked by the contract.
- Real ETH is only used for entry and is awarded to the winner(s) at the end of the game.

### 3. Board & Properties
- The board consists of classic Monopoly squares: properties, railroads, utilities, tax squares, jail, Chance/Community Chest, and more.
- Properties can be bought, traded, mortgaged, and developed with houses/hotels.
- Owning all properties in a color group allows you to build houses/hotels and charge higher rent.

### 4. Special Squares
- **Chance/Community Chest:** Draw a random card with effects (move, pay/collect money, go to jail, etc.)
- **Jail:** Players can be sent to jail and must pay, roll doubles, or use a card to get out.
- **Tax:** Pay in-game money to the bank when landing on tax squares.
- **Auction:** If a property is not bought, it is auctioned to all players.

### 5. Trading & Auctions
- Players can trade properties and in-game money with each other.
- Unpurchased properties are auctioned, with the highest bidder paying in-game money.

### 6. Bankruptcy & Elimination
- If a player cannot pay what they owe, their assets are liquidated and they are eliminated from the game.
- The last player remaining wins the game and receives the ETH prize pool.

## Key Features
- **Provable Fairness:** All moves, dice rolls, and card draws are on-chain and verifiable.
- **True Digital Ownership:** Properties and achievements can be represented as NFTs in future versions.
- **Persistent State:** Games can pause and resume, with all state stored on-chain.
- **No Off-Chain Trust:** All game logic and state transitions are enforced by smart contracts.

## How to Win
- Acquire full property sets, build houses/hotels, and collect rent to bankrupt your opponents.
- Use strategy, negotiation, and a bit of luck to be the last player standing!
- The winner receives the pooled ETH entry fees as the prize.

## Future Extensions
- NFT property certificates and achievements
- Tournament modes and leaderboards
- Cross-game property ownership
- Governance and community-driven rules

## Disclaimer
Whaleopoly is a parody and is not affiliated with Hasbro or the official Monopoly game. Play responsibly and only with testnet ETH unless otherwise stated.
