// Shared types for Whaleopoly

export interface Player {
  id: number;
  name: string;
  emoji: string;
  balance: number;
  position: number;
  properties: number[];
  isActive: boolean;
  color: string;
}

export interface Property {
  id: number;
  name: string;
  emoji: string;
  price: number;
  rent: number;
  color: string;
  owner: number | null;
  position: number;
}

export interface Transaction {
  id: number;
  type: 'gain' | 'loss' | 'purchase' | 'special';
  message: string;
  amount?: number;
  timestamp: Date;
}

export interface Card {
  id: number;
  title: string;
  description: string;
  emoji: string;
  type: 'mystery' | 'airdrop';
  action: {
    type: 'gain' | 'loss' | 'move' | 'special';
    amount?: number;
    position?: number;
    message: string;
  };
}

export interface CardDeck {
  mysteryCards: Card[];
  airdropCards: Card[];
  currentCard: Card | null;
  showCard: boolean;
}

export interface GameState {
  currentPlayer: number;
  players: Player[];
  properties: Property[];
  transactions: Transaction[];
  diceValue: number | null;
  gamePhase: 'waiting' | 'rolled' | 'moved' | 'action' | 'card';
  cardDeck: CardDeck;
}
