'use client';

import { Property, Player, CardDeck } from '../types';

interface GameBoardProps {
  properties: Property[];
  players: Player[];
  currentPlayer: number;
  cardDeck: CardDeck;
}

export default function GameBoard({ properties, players, currentPlayer, cardDeck }: GameBoardProps) {
  return (
    <div className="relative">
      {/* Main board container */}
      <div className="relative bg-gradient-to-br from-green-400 to-green-600 p-6 rounded-3xl shadow-2xl border-4 border-white/30">
        
        {/* Board Layout */}
        <div className="relative w-[480px] h-[480px]">
          
          {/* Center area with logo */}
          <div className="absolute inset-12 flex items-center justify-center">
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
          </div>

          {/* Simple board squares */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4">
            {[0, 1, 2, 3, 4].map((pos) => (
              <div key={pos} className="w-16 h-16 bg-yellow-400 rounded border-2 border-white flex items-center justify-center text-xs font-bold">
                {pos}
              </div>
            ))}
          </div>

          <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-between py-4">
            {[5, 6, 7, 8, 9].map((pos) => (
              <div key={pos} className="w-16 h-16 bg-blue-400 rounded border-2 border-white flex items-center justify-center text-xs font-bold">
                {pos}
              </div>
            ))}
          </div>

          <div className="absolute top-0 left-0 right-0 flex justify-between px-4">
            {[14, 13, 12, 11, 10].map((pos) => (
              <div key={pos} className="w-16 h-16 bg-pink-400 rounded border-2 border-white flex items-center justify-center text-xs font-bold">
                {pos}
              </div>
            ))}
          </div>

          <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between py-4">
            {[15, 16, 17, 18, 19].map((pos) => (
              <div key={pos} className="w-16 h-16 bg-orange-400 rounded border-2 border-white flex items-center justify-center text-xs font-bold">
                {pos}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
