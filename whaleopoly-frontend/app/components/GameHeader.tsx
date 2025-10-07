'use client';

import { Player } from '../types';

interface GameHeaderProps {
  currentPlayer: Player;
}

export default function GameHeader({ currentPlayer }: GameHeaderProps) {
  return (
    <header className="text-center py-4 relative">
      {/* Main title with whale mascot */}
      <div className="relative z-10">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="animate-bounce-soft">
            <img 
              src="/whaleopoly-logo.png" 
              alt="Whaleopoly Logo" 
              className="h-24 w-24 object-contain drop-shadow-lg"
            />
          </div>
          {/* <div className="text-center">
            <h1 className="text-4xl font-black text-shadow bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Whaleopoly
            </h1>
          </div> */}
        </div>

        {/* Current player indicator - minimal design */}
        <div className="glass rounded-xl p-4 inline-block border-2 border-white/30 max-w-sm">
          <div className="flex items-center gap-3">
            <div className={`
              text-xl p-2 rounded-full bg-gradient-to-br ${currentPlayer.color}
              shadow-lg
            `}>
              {currentPlayer.emoji}
            </div>
            <div className="text-white text-shadow">
              <div className="text-sm font-semibold">
                {currentPlayer.name}'s Turn
              </div>
              <div className="text-xs opacity-90">
                Balance: {currentPlayer.balance.toLocaleString()} WHALE
              </div>
            </div>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </header>
  );
}
