'use client';

import { Transaction } from '../types';

interface TransactionLogProps {
  transactions: Transaction[];
}

const getTransactionIcon = (type: Transaction['type']) => {
  switch (type) {
    case 'gain': return '🟢';
    case 'loss': return '🔴';
    case 'purchase': return '🏠';
    case 'special': return '⚡';
    default: return '📝';
  }
};

const getTransactionColor = (type: Transaction['type']) => {
  switch (type) {
    case 'gain': return 'from-green-400 to-green-600';
    case 'loss': return 'from-red-400 to-red-600';
    case 'purchase': return 'from-blue-400 to-blue-600';
    case 'special': return 'from-purple-400 to-purple-600';
    default: return 'from-gray-400 to-gray-600';
  }
};

export default function TransactionLog({ transactions }: TransactionLogProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-white text-shadow text-center mb-6">
        📜 Activity Log
      </h3>
      
      <div className="glass rounded-2xl border-3 border-white/30 p-4 max-h-96 overflow-y-auto">
        <div className="space-y-3">
          {transactions.map((transaction, index) => (
            <div
              key={transaction.id}
              className={`
                bg-gradient-to-r ${getTransactionColor(transaction.type)} 
                rounded-xl p-3 border-2 border-white/20 animate-slide-up
                ${index === 0 ? 'animate-scale-bounce' : ''}
              `}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-3">
                {/* Transaction icon */}
                <div className="text-2xl bg-white/20 rounded-full p-2 flex-shrink-0">
                  {getTransactionIcon(transaction.type)}
                </div>
                
                {/* Transaction content */}
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm font-semibold text-shadow">
                    {transaction.message}
                  </div>
                  
                  {/* Amount display */}
                  {transaction.amount && (
                    <div className={`
                      text-xs mt-1 font-bold
                      ${transaction.type === 'gain' ? 'text-green-200' : 
                        transaction.type === 'loss' ? 'text-red-200' : 'text-white/80'}
                    `}>
                      {transaction.type === 'gain' ? '+' : 
                       transaction.type === 'loss' ? '-' : ''}
                      💰{transaction.amount.toLocaleString()}
                    </div>
                  )}
                  
                  {/* Timestamp */}
                  <div className="text-white/60 text-xs mt-1">
                    {transaction.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Empty state */}
          {transactions.length === 0 && (
            <div className="text-center text-white/60 py-8">
              <div className="text-4xl mb-2">🐋</div>
              <div className="text-lg">No transactions yet</div>
              <div className="text-sm">Start playing to see activity!</div>
            </div>
          )}
        </div>
      </div>

      {/* Quick filters */}
      <div className="glass rounded-xl p-3 border-2 border-white/30">
        <div className="text-white text-sm font-semibold mb-2 text-center">
          📊 Quick Stats
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-black/20 rounded-lg p-2 text-center">
            <div className="text-green-400 font-bold">
              {transactions.filter(t => t.type === 'gain').length}
            </div>
            <div className="text-white/80">Gains</div>
          </div>
          <div className="bg-black/20 rounded-lg p-2 text-center">
            <div className="text-red-400 font-bold">
              {transactions.filter(t => t.type === 'loss').length}
            </div>
            <div className="text-white/80">Losses</div>
          </div>
          <div className="bg-black/20 rounded-lg p-2 text-center">
            <div className="text-blue-400 font-bold">
              {transactions.filter(t => t.type === 'purchase').length}
            </div>
            <div className="text-white/80">Purchases</div>
          </div>
          <div className="bg-black/20 rounded-lg p-2 text-center">
            <div className="text-purple-400 font-bold">
              {transactions.filter(t => t.type === 'special').length}
            </div>
            <div className="text-white/80">Events</div>
          </div>
        </div>
      </div>

      {/* Live activity indicator */}
      <div className="flex items-center justify-center gap-2 text-white/60 text-sm">
        <div className="animate-pulse w-2 h-2 bg-green-400 rounded-full"></div>
        <span>Live Activity</span>
      </div>
    </div>
  );
}
