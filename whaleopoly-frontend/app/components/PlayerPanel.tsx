'use client';

import { Player } from '../types';

interface PlayerPanelProps {
  players: Player[];
  currentPlayer: number;
}

export default function PlayerPanel({ players, currentPlayer }: PlayerPanelProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-xl font-bold text-white text-shadow text-center mb-4">
        Players
      </h3>
      
      {players.map((player, index) => (
        <div
          key={player.id}
          className={`
            glass rounded-xl p-3 border-2 transition-all duration-300 relative
            ${player.id === currentPlayer ? 
              'border-yellow-400 bg-white/25' : 
              'border-white/30 hover:border-white/50'
            }
          `}
        >
          {/* Player avatar and name */}
          <div className="flex items-center gap-3 mb-3">
            <div className={`
              text-2xl p-2 rounded-full bg-gradient-to-br ${player.color}
              ${player.id === currentPlayer ? 'animate-bounce-soft' : ''}
            `}>
              {player.emoji}
            </div>
            <div className="flex-1">
              <h4 className="text-white font-bold text-sm text-shadow">
                {player.name}
              </h4>
              {player.id === currentPlayer && (
                <div className="text-yellow-300 text-xs font-semibold">
                  Active Turn
                </div>
              )}
            </div>
          </div>

          {/* Player stats */}
          <div className="space-y-2">
            {/* Balance */}
            <div className="flex items-center justify-between bg-black/20 rounded-lg p-2">
              <span className="text-white/80 text-xs">Balance:</span>
              <span className="text-white font-bold text-xs">
                ${player.balance.toLocaleString()}
              </span>
            </div>

            {/* Properties owned */}
            <div className="flex items-center justify-between bg-black/20 rounded-lg p-2">
              <span className="text-white/80 text-xs">Properties:</span>
              <span className="text-white font-bold text-xs">
                {player.properties.length}
              </span>
            </div>

            {/* Current position */}
            <div className="flex items-center justify-between bg-black/20 rounded-lg p-2">
              <span className="text-white/80 text-xs">Position:</span>
              <span className="text-white font-bold text-xs">
                #{player.position}
              </span>
            </div>
          </div>

          {/* Player actions (shown only for current player) */}
          {player.id === currentPlayer && (
            <div className="mt-3 pt-3 border-t border-white/20">
              <div className="flex gap-2">
                <button className="btn-3d bg-gradient-to-r from-blue-500 to-blue-600 text-white px-2 py-1 rounded-lg text-xs font-semibold hover:from-blue-600 hover:to-blue-700">
                  Trade
                </button>
                <button className="btn-3d bg-gradient-to-r from-green-500 to-green-600 text-white px-2 py-1 rounded-lg text-xs font-semibold hover:from-green-600 hover:to-green-700">
                  Build
                </button>
              </div>
            </div>
          )}

          {/* Active player indicator */}
          {player.id === currentPlayer && (
            <div className="absolute -top-1 -right-1 bg-yellow-400 text-yellow-900 rounded-full w-5 h-5 flex items-center justify-center font-bold text-xs">
              ★
            </div>
          )}
        </div>
      ))}

      {/* Game stats */}
      <div className="glass rounded-xl p-3 border-2 border-white/30 mt-4">
        <h4 className="text-white font-bold text-sm text-shadow mb-3 text-center">
          Game Stats
        </h4>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between text-white/80">
            <span>Total Properties:</span>
            <span className="text-white font-semibold">20</span>
          </div>
          <div className="flex justify-between text-white/80">
            <span>Properties Owned:</span>
            <span className="text-white font-semibold">
              {players.reduce((total, player) => total + player.properties.length, 0)}
            </span>
          </div>
          <div className="flex justify-between text-white/80">
            <span>Total Money:</span>
            <span className="text-white font-semibold">
              ${players.reduce((total, player) => total + player.balance, 0).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
