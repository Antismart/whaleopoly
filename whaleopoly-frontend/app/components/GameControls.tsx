'use client';

import { useState } from 'react';
import { GameState, Transaction } from '../types';

interface GameControlsProps {
  gameState: GameState;
  setGameState: (gameState: GameState) => void;
}

export default function GameControls({ gameState, setGameState }: GameControlsProps) {
  const [isRolling, setIsRolling] = useState(false);
  const [countdown, setCountdown] = useState(30);

  const rollDice = async () => {
    if (isRolling || (gameState.gamePhase !== 'waiting' && gameState.gamePhase !== 'moved')) return;

    setIsRolling(true);
    
    // Animate dice rolling
    const rollAnimation = setInterval(() => {
      const tempValue = Math.floor(Math.random() * 6) + 1;
      setGameState({
        ...gameState,
        diceValue: tempValue
      });
    }, 100);

    // Stop animation after 1 second and set final value
    setTimeout(() => {
      clearInterval(rollAnimation);
      const finalValue = Math.floor(Math.random() * 6) + 1;
      
      // Move player
      const currentPlayerIndex = gameState.currentPlayer;
      const currentPlayerData = gameState.players[currentPlayerIndex];
      const newPosition = (currentPlayerData.position + finalValue) % 20;
      
      // Update game state
      const updatedPlayers = gameState.players.map((player, index) => 
        index === currentPlayerIndex 
          ? { ...player, position: newPosition }
          : player
      );

      // Check if player landed on a card space
      const currentProperty = gameState.properties.find(p => p.position === newPosition);
      let newGamePhase: 'moved' | 'card' = 'moved';
      let updatedCardDeck = gameState.cardDeck;

      // Check if landed on card spaces (positions 7, 22, 36 in traditional Monopoly)
      if (currentProperty && (currentProperty.name === 'Mystery Box' || currentProperty.name === 'Airdrop Bonus')) {
        newGamePhase = 'card';
        
        // Draw a card
        if (currentProperty.name === 'Mystery Box' && updatedCardDeck.mysteryCards.length > 0) {
          const drawnCard = updatedCardDeck.mysteryCards[0];
          updatedCardDeck = {
            ...updatedCardDeck,
            currentCard: drawnCard,
            showCard: true
          };
        } else if (currentProperty.name === 'Airdrop Bonus' && updatedCardDeck.airdropCards.length > 0) {
          const drawnCard = updatedCardDeck.airdropCards[0];
          updatedCardDeck = {
            ...updatedCardDeck,
            currentCard: drawnCard,
            showCard: true
          };
        }
      }

      // Add movement transaction
      const newTransaction: Transaction = {
        id: Date.now(),
        type: 'special',
        message: `${currentPlayerData.name} rolled ${finalValue} and moved to ${currentProperty?.name || 'position ' + newPosition}`,
        timestamp: new Date()
      };

      setGameState({
        ...gameState,
        players: updatedPlayers,
        diceValue: finalValue,
        gamePhase: newGamePhase,
        cardDeck: updatedCardDeck,
        transactions: [newTransaction, ...gameState.transactions]
      });
      
      setIsRolling(false);
    }, 1000);
  };

  const endTurn = () => {
    const nextPlayer = (gameState.currentPlayer + 1) % gameState.players.length;
    const updatedPlayers = gameState.players.map((player, index) => ({
      ...player,
      isActive: index === nextPlayer
    }));

    setGameState({
      ...gameState,
      currentPlayer: nextPlayer,
      players: updatedPlayers,
      gamePhase: 'waiting',
      diceValue: null
    });

    // Reset countdown
    setCountdown(30);
  };

  const purchaseProperty = () => {
    const currentPlayerData = gameState.players[gameState.currentPlayer];
    const currentProperty = gameState.properties.find(p => p.position === currentPlayerData.position);
    
    if (!currentProperty || currentProperty.owner !== null || currentProperty.price === 0) return;
    
    if (currentPlayerData.balance >= currentProperty.price) {
      // Update player balance and properties
      const updatedPlayers = gameState.players.map((player, index) => 
        index === gameState.currentPlayer 
          ? { 
              ...player, 
              balance: player.balance - currentProperty.price,
              properties: [...player.properties, currentProperty.id]
            }
          : player
      );

      // Update property owner
      const updatedProperties = gameState.properties.map(property => 
        property.id === currentProperty.id 
          ? { ...property, owner: gameState.currentPlayer }
          : property
      );

      // Add transaction
      const newTransaction: Transaction = {
        id: Date.now(),
        type: 'purchase',
        message: `${currentPlayerData.name} purchased ${currentProperty.name} for $${currentProperty.price.toLocaleString()}`,
        amount: currentProperty.price,
        timestamp: new Date()
      };

      setGameState({
        ...gameState,
        players: updatedPlayers,
        properties: updatedProperties,
        transactions: [newTransaction, ...gameState.transactions]
      });
    }
  };

  const currentPlayer = gameState.players[gameState.currentPlayer];
  const currentProperty = gameState.properties.find(p => p.position === currentPlayer.position);
  const canPurchase = currentProperty && 
                     currentProperty.owner === null && 
                     currentProperty.price > 0 && 
                     currentPlayer.balance >= currentProperty.price;

  return (
    <div className="glass rounded-3xl p-6 border-4 border-white/30 w-full">
      {/* Main controls row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        
        {/* Left side - Turn Timer */}
        <div className="text-center">
          <div className="bg-black/20 rounded-xl p-4">
            <div className="text-2xl mb-2">⏰</div>
            <div className="text-white text-sm font-semibold">Turn Timer</div>
            <div className="text-white/80 text-xs">{countdown}s</div>
          </div>
        </div>

        {/* Center - Dice and main action */}
        <div className="text-center">
          {/* Dice Display */}
          <div className="mb-4">
            <div className={`
              inline-block bg-white rounded-2xl p-4 text-6xl border-4 border-gray-300 shadow-lg
              ${isRolling ? 'animate-roll' : ''}
            `}>
              {gameState.diceValue ? gameState.diceValue : '🎲'}
            </div>
            <div className="text-white text-lg font-semibold mt-2 text-shadow">
              {gameState.diceValue ? `Rolled: ${gameState.diceValue}` : 'Ready to Roll'}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {/* Roll Dice Button */}
            {gameState.gamePhase === 'waiting' && (
              <button
                onClick={rollDice}
                disabled={isRolling}
                className={`
                  w-full btn-3d text-white py-4 px-8 rounded-2xl font-bold text-lg border-3 border-white/30 
                  transition-all duration-300 hover:shadow-lg min-w-[200px]
                  ${isRolling ? 
                    'bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed' : 
                    'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
                  }
                `}
              >
                {isRolling ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">🎲</span>
                    Rolling...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    🎲 Roll Dice
                  </span>
                )}
              </button>
            )}

            {/* Card Phase Indicator */}
            {gameState.gamePhase === 'card' && (
              <div className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-4 px-8 rounded-2xl font-bold text-lg border-3 border-white/30 text-center min-w-[200px]">
                <span className="flex items-center justify-center gap-2">
                  Drawing Card...
                </span>
              </div>
            )}

            {/* Purchase Property Button */}
            {gameState.gamePhase === 'moved' && canPurchase && (
              <button
                onClick={purchaseProperty}
                className="w-full btn-3d bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-8 rounded-2xl font-bold text-lg border-3 border-white/30 hover:from-green-600 hover:to-green-700 hover:shadow-lg transition-all duration-300 min-w-[200px]"
              >
                <span className="flex items-center justify-center gap-2">
                  Buy {currentProperty?.name}
                  <span className="text-sm bg-black/20 px-2 py-1 rounded">
                    ${currentProperty?.price.toLocaleString()}
                  </span>
                </span>
              </button>
            )}

            {/* End Turn Button */}
            {gameState.gamePhase === 'moved' && (
              <button
                onClick={endTurn}
                className="w-full btn-3d bg-gradient-to-r from-purple-500 to-purple-600 text-white py-4 px-8 rounded-2xl font-bold text-lg border-3 border-white/30 hover:from-purple-600 hover:to-purple-700 hover:shadow-lg transition-all duration-300 min-w-[200px]"
              >
                <span className="flex items-center justify-center gap-2">
                  End Turn
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Right side - Round info */}
        <div className="text-center">
          <div className="bg-black/20 rounded-xl p-4">
            <div className="text-2xl mb-2">🎯</div>
            <div className="text-white text-sm font-semibold">Round</div>
            <div className="text-white/80 text-xs">1</div>
          </div>
        </div>
      </div>

      {/* Status message */}
      <div className="text-center text-white/80 text-sm mt-4">
        {gameState.gamePhase === 'waiting' && 'Roll the dice to start your turn'}
        {gameState.gamePhase === 'card' && 'Review your card and apply its effect'}
        {gameState.gamePhase === 'moved' && currentProperty && (
          <div>
            You landed on <span className="font-semibold text-white">{currentProperty.name}</span>
          </div>
        )}
      </div>
    </div>
  );
}
