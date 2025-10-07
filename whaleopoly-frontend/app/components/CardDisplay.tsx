'use client';

import { Card } from '../types';

interface CardDisplayProps {
  card: Card;
  onClose: () => void;
}

export default function CardDisplay({ card, onClose }: CardDisplayProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      {/* Card backdrop */}
      <div className="bg-black/20 absolute inset-0" onClick={onClose}></div>
      
      {/* Card */}
      <div className="relative bg-gradient-to-br from-white to-gray-100 rounded-3xl p-8 max-w-md w-full shadow-2xl border-4 border-white/50 animate-scale-bounce">
        
        {/* Card type indicator */}
        <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full text-white font-bold text-sm
          ${card.type === 'mystery' ? 'bg-gradient-to-r from-purple-500 to-purple-700' : 'bg-gradient-to-r from-green-500 to-green-700'}
        `}>
          {card.type === 'mystery' ? '❓ Mystery Box' : '🎁 Airdrop'}
        </div>

        {/* Card emoji */}
        <div className="text-center mb-6 mt-4">
          <div className="text-8xl animate-bounce-soft mb-4">
            {card.emoji}
          </div>
        </div>

        {/* Card content */}
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 text-shadow-white">
            {card.title}
          </h2>
          
          <p className="text-gray-600 text-lg leading-relaxed">
            {card.description}
          </p>

          {/* Action preview */}
          <div className={`p-4 rounded-2xl font-bold text-lg
            ${card.action.type === 'gain' ? 'bg-green-100 text-green-700' : 
              card.action.type === 'loss' ? 'bg-red-100 text-red-700' :
              card.action.type === 'move' ? 'bg-blue-100 text-blue-700' :
              'bg-purple-100 text-purple-700'}
          `}>
            {card.action.message}
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="btn-3d bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-2xl font-bold text-lg border-3 border-white/30 hover:from-blue-600 hover:to-blue-700 hover:shadow-lg transition-all duration-300 mt-6"
          >
            ✅ Apply Effect
          </button>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-4 left-4 text-2xl animate-sparkle opacity-50">
          ✨
        </div>
        <div className="absolute top-4 right-4 text-2xl animate-sparkle opacity-50" style={{ animationDelay: '1s' }}>
          ⭐
        </div>
        <div className="absolute bottom-4 left-4 text-2xl animate-sparkle opacity-50" style={{ animationDelay: '0.5s' }}>
          💫
        </div>
        <div className="absolute bottom-4 right-4 text-2xl animate-sparkle opacity-50" style={{ animationDelay: '1.5s' }}>
          🌟
        </div>
      </div>
    </div>
  );
}
