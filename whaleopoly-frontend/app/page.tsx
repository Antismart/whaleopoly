'use client';

import { useState, useEffect } from 'react';
import GameBoard from './components/GameBoard2';
import PlayerPanel from './components/PlayerPanel';
import GameControls from './components/GameControls';
import TransactionLog from './components/TransactionLog';
import GameHeader from './components/GameHeader';
import CardDisplay from './components/CardDisplay';
import { Player, Property, Transaction, Card, CardDeck, GameState } from './types';

// Initial game state
const initialPlayers: Player[] = [
  { id: 0, name: 'Captain Whale', emoji: '🐋', balance: 1500, position: 0, properties: [], isActive: true, color: 'from-blue-400 to-blue-600' },
  { id: 1, name: 'Crypto Orca', emoji: '🐳', balance: 1500, position: 0, properties: [], isActive: false, color: 'from-purple-400 to-purple-600' },
  { id: 2, name: 'Diamond Whale', emoji: '🐋', balance: 1500, position: 0, properties: [], isActive: false, color: 'from-green-400 to-green-600' },
  { id: 3, name: 'Moon Whale', emoji: '🐳', balance: 1500, position: 0, properties: [], isActive: false, color: 'from-orange-400 to-orange-600' },
];

// Mystery Box Cards
const mysteryCards: Card[] = [
  {
    id: 1,
    title: 'Whale Pump',
    description: 'A massive whale bought in! Your portfolio gains value.',
    emoji: '🐋',
    type: 'mystery',
    action: { type: 'gain', amount: 200, message: 'Whale pump detected! +200 WHALE tokens' }
  },
  {
    id: 2,
    title: 'Market Correction',
    description: 'Token value drops due to market volatility.',
    emoji: '�',
    type: 'mystery',
    action: { type: 'loss', amount: 150, message: 'Market correction: -150 WHALE tokens' }
  },
  {
    id: 3,
    title: 'Diamond Hands Bonus',
    description: 'You held through the dip! Rewards await.',
    emoji: '💎',
    type: 'mystery',
    action: { type: 'gain', amount: 100, message: 'Diamond hands bonus: +100 WHALE tokens' }
  },
  {
    id: 4,
    title: 'Gas Fees Spike',
    description: 'Network congestion causes high transaction fees.',
    emoji: '⛽',
    type: 'mystery',
    action: { type: 'loss', amount: 75, message: 'High gas fees: -75 WHALE tokens' }
  },
  {
    id: 5,
    title: 'Moonshot Discovery',
    description: 'You discovered the next big opportunity!',
    emoji: '🚀',
    type: 'mystery',
    action: { type: 'gain', amount: 300, message: 'Moonshot discovery: +300 WHALE tokens' }
  },
  {
    id: 6,
    title: 'Network Migration',
    description: 'Move to Genesis Block for better opportunities.',
    emoji: '🌊',
    type: 'mystery',
    action: { type: 'move', position: 0, message: 'Network migration: Move to Genesis Block' }
  },
  {
    id: 7,
    title: 'Staking Reward',
    description: 'Your patience pays off! Staking rewards earned.',
    emoji: '🏆',
    type: 'mystery',
    action: { type: 'gain', amount: 125, message: 'Staking reward: +125 WHALE tokens' }
  },
  {
    id: 8,
    title: 'Bear Market',
    description: 'Market downturn affects all positions.',
    emoji: '🐻',
    type: 'mystery',
    action: { type: 'loss', amount: 100, message: 'Bear market: -100 WHALE tokens' }
  }
];

// Airdrop Cards
const airdropCards: Card[] = [
  {
    id: 9,
    title: 'Protocol Airdrop',
    description: 'New protocol launched with token distribution.',
    emoji: '🪂',
    type: 'airdrop',
    action: { type: 'gain', amount: 150, message: 'Protocol airdrop: +150 WHALE tokens' }
  },
  {
    id: 10,
    title: 'NFT Mint Success',
    description: 'You successfully minted a valuable NFT.',
    emoji: '🖼️',
    type: 'airdrop',
    action: { type: 'gain', amount: 200, message: 'NFT mint success: +200 WHALE tokens' }
  },
  {
    id: 11,
    title: 'Community Reward',
    description: 'Received reward for community participation.',
    emoji: '🙏',
    type: 'airdrop',
    action: { type: 'gain', amount: 250, message: 'Community reward: +250 WHALE tokens' }
  },
  {
    id: 12,
    title: 'DeFi Yield',
    description: 'Your yield farming strategy paid off.',
    emoji: '🌾',
    type: 'airdrop',
    action: { type: 'gain', amount: 175, message: 'DeFi yield harvest: +175 WHALE tokens' }
  },
  {
    id: 13,
    title: 'Viral Token Gain',
    description: 'Your token gained popularity and value.',
    emoji: '📈',
    type: 'airdrop',
    action: { type: 'gain', amount: 100, message: 'Viral token gain: +100 WHALE tokens' }
  },
  {
    id: 14,
    title: 'Staking Rewards',
    description: 'Earned compound interest from staked tokens.',
    emoji: '💰',
    type: 'airdrop',
    action: { type: 'gain', amount: 125, message: 'Staking rewards: +125 WHALE tokens' }
  },
  {
    id: 15,
    title: 'Platform Bonus',
    description: 'Special bonus from active platform usage.',
    emoji: '🎯',
    type: 'airdrop',
    action: { type: 'gain', amount: 175, message: 'Platform bonus: +175 WHALE tokens' }
  },
  {
    id: 16,
    title: 'Referral Reward',
    description: 'Earned rewards from successful referrals.',
    emoji: '🤝',
    type: 'airdrop',
    action: { type: 'gain', amount: 150, message: 'Referral reward: +150 WHALE tokens' }
  }
];

const initialCardDeck: CardDeck = {
  mysteryCards: [...mysteryCards],
  airdropCards: [...airdropCards],
  currentCard: null,
  showCard: false,
};

const properties: Property[] = [
  // Bottom row (positions 0-5) - left to right
  { id: 0, name: 'Genesis Block', emoji: '🏁', price: 0, rent: 0, color: 'corner', owner: null, position: 0 },
  { id: 1, name: 'Bitcoin Beach', emoji: '🪙', price: 60, rent: 10, color: 'brown', owner: null, position: 1 },
  { id: 2, name: 'Mystery Box', emoji: '❓', price: 0, rent: 0, color: 'special', owner: null, position: 2 },
  { id: 3, name: 'Lightning Lane', emoji: '⚡', price: 80, rent: 15, color: 'brown', owner: null, position: 3 },
  { id: 4, name: 'Tax Haven', emoji: '�', price: 0, rent: 0, color: 'special', owner: null, position: 4 },
  
  // Right side (positions 5-9) - bottom to top
  { id: 5, name: 'NFT Bank', emoji: '🏛️', price: 0, rent: 0, color: 'corner', owner: null, position: 5 },
  { id: 6, name: 'Rainbow Bridge', emoji: '🌈', price: 100, rent: 20, color: 'lightblue', owner: null, position: 6 },
  { id: 7, name: 'Airdrop', emoji: '🎁', price: 0, rent: 0, color: 'special', owner: null, position: 7 },
  { id: 8, name: 'Moon Mission', emoji: '🚀', price: 120, rent: 25, color: 'lightblue', owner: null, position: 8 },
  { id: 9, name: 'HODL Station', emoji: '�', price: 140, rent: 30, color: 'lightblue', owner: null, position: 9 },
  
  // Top row (positions 10-14) - right to left
  { id: 10, name: 'Whale Casino', emoji: '🎰', price: 0, rent: 0, color: 'corner', owner: null, position: 10 },
  { id: 11, name: 'Diamond Hands', emoji: '💎', price: 140, rent: 30, color: 'pink', owner: null, position: 11 },
  { id: 12, name: 'DeFi Protocol', emoji: '🏦', price: 160, rent: 35, color: 'pink', owner: null, position: 12 },
  { id: 13, name: 'Unicorn Plaza', emoji: '🦄', price: 160, rent: 35, color: 'pink', owner: null, position: 13 },
  { id: 14, name: 'SEC Audit', emoji: '⚖️', price: 0, rent: 0, color: 'special', owner: null, position: 14 },
  
  // Left side (positions 15-19) - top to bottom
  { id: 15, name: 'Rug Pull Jail', emoji: '👮', price: 0, rent: 0, color: 'corner', owner: null, position: 15 },
  { id: 16, name: 'Fire Token', emoji: '🔥', price: 180, rent: 40, color: 'orange', owner: null, position: 16 },
  { id: 17, name: 'Whale Pump', emoji: '📈', price: 200, rent: 45, color: 'orange', owner: null, position: 17 },
  { id: 18, name: 'Tsunami Towers', emoji: '🌊', price: 220, rent: 50, color: 'orange', owner: null, position: 18 },
  { id: 19, name: 'Lambo Lane', emoji: '🏎️', price: 240, rent: 55, color: 'red', owner: null, position: 19 },
];

export default function Home() {
  const [gameState, setGameState] = useState<GameState>({
    currentPlayer: 0,
    players: initialPlayers,
    properties: properties,
    transactions: [
      { id: 1, type: 'special', message: '🎮 Game started! Welcome to Whaleopoly!', timestamp: new Date() }
    ],
    diceValue: null,
    gamePhase: 'waiting',
    cardDeck: initialCardDeck
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-300 via-blue-400 to-purple-500 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Minimal floating elements for ambiance */}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float text-lg opacity-5"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${12 + Math.random() * 6}s`
            }}
          >
            💎
          </div>
        ))}
      </div>

      {/* Main game layout */}
      <div className="relative z-10 p-4 max-w-7xl mx-auto">
        {/* Header */}
        <GameHeader currentPlayer={gameState.players[gameState.currentPlayer]} />

        {/* Game layout - improved responsive design */}
        <div className="flex flex-col items-center gap-6 mt-8">
          {/* Top row - Game board and side panels */}
          <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-4">
            
            {/* Transaction Log - Left panel */}
            <div className="lg:col-span-3 order-3 lg:order-1">
              <TransactionLog transactions={gameState.transactions} />
            </div>

            {/* Game Board - Center */}
            <div className="lg:col-span-6 order-1 lg:order-2 flex justify-center">
              <GameBoard 
                properties={gameState.properties}
                players={gameState.players}
                currentPlayer={gameState.currentPlayer}
                cardDeck={gameState.cardDeck}
              />
            </div>

            {/* Player Panel - Right panel */}
            <div className="lg:col-span-3 order-2 lg:order-3">
              <PlayerPanel 
                players={gameState.players}
                currentPlayer={gameState.currentPlayer}
              />
            </div>
          </div>

          {/* Bottom row - Game Controls - Full width */}
          <div className="w-full max-w-6xl">
            <GameControls 
              gameState={gameState}
              setGameState={setGameState}
            />
          </div>
        </div>
      </div>

      {/* Card Display Modal */}
      {gameState.cardDeck.showCard && gameState.cardDeck.currentCard && (
        <CardDisplay
          card={gameState.cardDeck.currentCard}
          onClose={() => {
            // Apply card effect and move card to bottom of deck
            applyCardEffect(gameState.cardDeck.currentCard!);
          }}
        />
      )}
    </div>
  );

  // Helper function to apply card effects
  function applyCardEffect(card: Card) {
    const currentPlayerIndex = gameState.currentPlayer;
    const updatedPlayers = [...gameState.players];
    let newTransaction: Transaction;

    // Apply the card effect
    switch (card.action.type) {
      case 'gain':
        updatedPlayers[currentPlayerIndex].balance += card.action.amount || 0;
        newTransaction = {
          id: Date.now(),
          type: 'gain',
          message: card.action.message,
          amount: card.action.amount,
          timestamp: new Date()
        };
        break;
      
      case 'loss':
        updatedPlayers[currentPlayerIndex].balance = Math.max(0, updatedPlayers[currentPlayerIndex].balance - (card.action.amount || 0));
        newTransaction = {
          id: Date.now(),
          type: 'loss',
          message: card.action.message,
          amount: card.action.amount,
          timestamp: new Date()
        };
        break;
      
      case 'move':
        updatedPlayers[currentPlayerIndex].position = card.action.position || 0;
        newTransaction = {
          id: Date.now(),
          type: 'special',
          message: card.action.message,
          timestamp: new Date()
        };
        break;
      
      default:
        newTransaction = {
          id: Date.now(),
          type: 'special',
          message: card.action.message,
          timestamp: new Date()
        };
    }

    // Move card to bottom of appropriate deck
    const updatedCardDeck = { ...gameState.cardDeck };
    if (card.type === 'mystery') {
      // Remove from top, add to bottom
      updatedCardDeck.mysteryCards = [...updatedCardDeck.mysteryCards.slice(1), card];
    } else {
      // Remove from top, add to bottom  
      updatedCardDeck.airdropCards = [...updatedCardDeck.airdropCards.slice(1), card];
    }

    // Close card display
    updatedCardDeck.currentCard = null;
    updatedCardDeck.showCard = false;

    // Update game state
    setGameState({
      ...gameState,
      players: updatedPlayers,
      transactions: [newTransaction, ...gameState.transactions],
      cardDeck: updatedCardDeck,
      gamePhase: 'moved'
    });
  }
}
