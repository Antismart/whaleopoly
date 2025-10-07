'use client';

import { Property, Player, CardDeck } from '../types';

interface GameBoardProps {
  properties: Property[];
  players: Player[];
  currentPlayer: number;
  cardDeck: CardDeck;
}

const getPropertyColor = (color: string) => {
  const colors = {
    corner: 'from-yellow-400 to-yellow-600',
    brown: 'from-amber-600 to-amber-800',
    lightblue: 'from-sky-300 to-sky-500',
    pink: 'from-pink-400 to-pink-600',
    orange: 'from-orange-400 to-orange-600',
    red: 'from-red-400 to-red-600',
    special: 'from-purple-400 to-purple-600'
  };
  return colors[color as keyof typeof colors] || 'from-gray-400 to-gray-600';
};

const getOwnerGlow = (ownerId: number | null, players: Player[]) => {
  if (ownerId === null) return '';
  const player = players[ownerId];
  if (!player) return '';
  
  const glowColors = {
    'from-blue-400 to-blue-600': 'neon-blue',
    'from-purple-400 to-purple-600': 'neon-purple',
    'from-green-400 to-green-600': 'neon-green',
    'from-orange-400 to-orange-600': 'neon-orange'
  };
  
  return glowColors[player.color as keyof typeof glowColors] || '';
};

export default function GameBoard({ properties, players, currentPlayer, cardDeck }: GameBoardProps) {
  // Get players at each position
  const getPlayersAtPosition = (position: number) => {
    return players.filter(player => player.position === position);
  };

  // Get property by position
  const getPropertyByPosition = (position: number) => {
    return properties.find(p => p.position === position);
  };

  // Create board layout arrays for each side
  const bottomRow = [0, 1, 2, 3, 4]; // Genesis Block to Tax Haven
  const rightSide = [5, 6, 7, 8, 9]; // NFT Bank to HODL Station
  const topRow = [10, 11, 12, 13, 14]; // Whale Casino to SEC Audit
  const leftSide = [15, 16, 17, 18, 19]; // Rug Pull Jail to Lambo Lane

  const renderProperty = (position: number, isCorner = false) => {
    const property = getPropertyByPosition(position);
    const playersHere = getPlayersAtPosition(position);
    const isCurrentPlayerPosition = players[currentPlayer].position === position;
    
    if (!property) return null;

    return (
      <div
        key={position}
        className={`
          relative glass rounded-xl p-2 border-3 border-white/30 transition-all duration-300 hover:scale-105
          bg-gradient-to-br ${getPropertyColor(property.color)}
          ${isCurrentPlayerPosition ? 'animate-pulse-glow' : ''}
          ${getOwnerGlow(property.owner, players)}
          ${isCorner ? 'w-20 h-20' : 'w-16 h-16'}
        `}
      >
        {/* Property content */}
        <div className="h-full flex flex-col justify-between text-center">
          {/* Property emoji and name */}
          <div>
            <div className={`${isCorner ? 'text-xl' : 'text-base'} mb-1`}>
              {property.emoji}
            </div>
            <div className={`text-white ${isCorner ? 'text-xs' : 'text-[10px]'} font-bold text-shadow leading-tight`}>
              {property.name}
            </div>
          </div>

          {/* Price for purchasable properties */}
          {property.price > 0 && (
            <div className={`text-white ${isCorner ? 'text-xs' : 'text-[9px]'} font-semibold bg-black/20 rounded px-1 py-0.5`}>
              ${property.price}
            </div>
          )}

          {/* Owner indicator */}
          {property.owner !== null && (
            <div className="absolute -top-1 -right-1 bg-white rounded-full p-0.5 border border-gray-300">
              <div className="text-[10px]">
                {players[property.owner]?.emoji}
              </div>
            </div>
          )}
        </div>

        {/* Players at this position */}
        {playersHere.length > 0 && (
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
            {playersHere.map((player, idx) => (
              <div
                key={player.id}
                className={`
                  text-sm bg-white rounded-full p-1 border-2 shadow-lg
                  ${isCurrentPlayerPosition && player.id === currentPlayer ? 
                    'animate-bounce border-yellow-400 shadow-yellow-400/50' : 
                    'border-gray-300'
                  }
                `}
                style={{
                  zIndex: playersHere.length - idx,
                  marginLeft: idx > 0 ? '-6px' : '0'
                }}
              >
                {player.emoji}
              </div>
            ))}
          </div>
        )}

        {/* Special position indicators */}
        {position === 0 && (
          <div className="absolute top-0 left-0 bg-green-500 text-white text-xs px-1 rounded-br font-bold">
            START
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="relative">
      {/* Floating island effect */}
      <div className="absolute -inset-4 bg-gradient-to-br from-green-300 to-green-500 rounded-3xl shadow-2xl animate-float opacity-20"></div>
      
      {/* Main board container */}
      <div className="relative bg-gradient-to-br from-green-400 to-green-600 p-6 rounded-3xl shadow-2xl border-4 border-white/30">
        
        {/* Board Layout */}
        <div className="relative w-[480px] h-[480px]">
          
          {/* Center area with logo and card decks */}
          <div className="absolute inset-12 flex items-center justify-center pointer-events-none">
            <div className="flex flex-col items-center gap-6">
              
              {/* Game logo */}
              <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 text-center border border-white/30">
                <div className="mb-2">
                  <img 
                    src="/whaleopoly-logo.png" 
                    alt="Whaleopoly Logo" 
                    className="h-16 w-16 object-contain mx-auto drop-shadow-md"
                  />
                </div>
                <div className="text-white font-bold text-lg text-shadow">WHALEOPOLY</div>
              </div>

              {/* Card decks */}
              <div className="flex gap-4 pointer-events-auto">
                
                {/* Mystery Box deck */}
                <div className="relative group">
                  <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg p-3 border-2 border-white/30 shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer w-16 h-20">
                    <div className="text-center">
                      <div className="text-lg mb-1">❓</div>
                      <div className="text-white text-[10px] font-bold">Mystery</div>
                    </div>
                    
                    {/* Deck count indicator */}
                    <div className="absolute -top-1 -right-1 bg-white text-purple-700 rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold">
                      {cardDeck?.mysteryCards?.length || 0}
                    </div>
                  </div>
                  
                  {/* Stacked card effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg border-2 border-white/20 shadow-lg -z-10 transform translate-x-0.5 translate-y-0.5"></div>
                </div>

                {/* Airdrop deck */}
                <div className="relative group">
                  <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-lg p-3 border-2 border-white/30 shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer w-16 h-20">
                    <div className="text-center">
                      <div className="text-lg mb-1">🎁</div>
                      <div className="text-white text-[10px] font-bold">Bonus</div>
                    </div>
                    
                    {/* Deck count indicator */}
                    <div className="absolute -top-1 -right-1 bg-white text-green-700 rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold">
                      {cardDeck?.airdropCards?.length || 0}
                    </div>
                  </div>
                  
                  {/* Stacked card effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 rounded-lg border-2 border-white/20 shadow-lg -z-10 transform translate-x-0.5 translate-y-0.5"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom row */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4">
            {bottomRow.map((position, index) => renderProperty(position, index === 0 || index === bottomRow.length - 1))}
          </div>

          {/* Right side */}
          <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-between py-4">
            {rightSide.map((position, index) => renderProperty(position, index === 0 || index === rightSide.length - 1))}
          </div>

          {/* Top row */}
          <div className="absolute top-0 left-0 right-0 flex justify-between px-4">
            {topRow.reverse().map((position, index) => renderProperty(position, index === 0 || index === topRow.length - 1))}
          </div>

          {/* Left side */}
          <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between py-4">
            {leftSide.reverse().map((position, index) => renderProperty(position, index === 0 || index === leftSide.length - 1))}
          </div>
        </div>
      </div>
    </div>
  );
}
