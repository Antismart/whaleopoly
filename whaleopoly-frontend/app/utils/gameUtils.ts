// Game utility functions and constants

export const PROPERTY_THEMES = {
  corner: {
    gradient: 'from-yellow-400 to-yellow-600',
    glow: 'shadow-yellow-400/50',
    textColor: 'text-yellow-900'
  },
  brown: {
    gradient: 'from-amber-600 to-amber-800',
    glow: 'shadow-amber-400/50',
    textColor: 'text-white'
  },
  lightblue: {
    gradient: 'from-sky-300 to-sky-500',
    glow: 'shadow-sky-400/50',
    textColor: 'text-sky-900'
  },
  pink: {
    gradient: 'from-pink-400 to-pink-600',
    glow: 'shadow-pink-400/50',
    textColor: 'text-white'
  },
  orange: {
    gradient: 'from-orange-400 to-orange-600',
    glow: 'shadow-orange-400/50',
    textColor: 'text-white'
  },
  special: {
    gradient: 'from-purple-400 to-purple-600',
    glow: 'shadow-purple-400/50',
    textColor: 'text-white'
  }
};

export const PLAYER_COLORS = [
  'from-blue-400 to-blue-600',
  'from-purple-400 to-purple-600',
  'from-green-400 to-green-600',
  'from-orange-400 to-orange-600'
];

export const WHALE_EMOJIS = ['🐋', '🐳'];

export const SOUND_EFFECTS = {
  diceRoll: '🎲',
  purchase: '💰',
  move: '🚶‍♂️',
  victory: '🎉',
  lose: '😢'
};

// Utility functions
export const formatCurrency = (amount: number): string => {
  return `💰${amount.toLocaleString()}`;
};

export const getRandomWhaleEmoji = (): string => {
  return WHALE_EMOJIS[Math.floor(Math.random() * WHALE_EMOJIS.length)];
};

export const calculateRent = (baseRent: number, houses: number = 0): number => {
  return baseRent * (1 + houses * 0.5);
};

export const getPropertyGroupColor = (propertyId: number): string => {
  // Group properties by color for monopoly detection
  const groups = {
    brown: [1, 3],
    lightblue: [5, 7],
    pink: [9, 11],
    orange: [13, 15]
  };
  
  for (const [color, ids] of Object.entries(groups)) {
    if (ids.includes(propertyId)) {
      return color;
    }
  }
  return 'special';
};

export const playSound = (soundType: keyof typeof SOUND_EFFECTS): void => {
  // In a real app, this would play actual sound files
  // For now, we'll use visual feedback
  console.log(`🔊 Playing sound: ${SOUND_EFFECTS[soundType]}`);
};

export const generateParticles = (type: 'coins' | 'sparkles' | 'explosion'): any[] => {
  const count = type === 'explosion' ? 15 : 8;
  const emoji = type === 'coins' ? '💰' : type === 'sparkles' ? '✨' : '🎆';
  
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    emoji,
    style: {
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 2}s`,
      animationDuration: `${2 + Math.random() * 2}s`
    }
  })) as any;
};

export const getTimeOfDayGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return '🌅 Good Morning';
  if (hour < 17) return '☀️ Good Afternoon';
  if (hour < 21) return '🌆 Good Evening';
  return '🌙 Good Night';
};

export const getRandomEncouragement = (): string => {
  const encouragements = [
    '🐋 Whale of a move!',
    '💎 Diamond hands!',
    '🚀 To the moon!',
    '🔥 Fire play!',
    '⚡ Lightning fast!',
    '🌊 Riding the wave!',
    '🎯 Perfect shot!',
    '🏆 Champion move!'
  ];
  
  return encouragements[Math.floor(Math.random() * encouragements.length)];
};

export const calculateNetWorth = (balance: number, properties: any[]): number => {
  const propertyValue = properties.reduce((total, prop) => total + (prop.price || 0), 0);
  return balance + propertyValue;
};

export const getPlayerRanking = (players: any[]): any[] => {
  return [...players].sort((a, b) => {
    const aNetWorth = calculateNetWorth(a.balance, a.properties);
    const bNetWorth = calculateNetWorth(b.balance, b.properties);
    return bNetWorth - aNetWorth;
  });
};

// Animation presets
export const ANIMATIONS = {
  bounce: 'animate-bounce',
  float: 'animate-float',
  pulse: 'animate-pulse',
  spin: 'animate-spin',
  ping: 'animate-ping',
  wiggle: 'animate-wiggle',
  scaleBouce: 'animate-scale-bounce',
  slideUp: 'animate-slide-up',
  shimmer: 'animate-shimmer'
};

// Game constants
export const GAME_CONSTANTS = {
  STARTING_MONEY: 1500,
  GO_MONEY: 200,
  MAX_HOUSES: 4,
  HOTEL_COST_MULTIPLIER: 5,
  MORTGAGE_RATE: 0.5,
  UNMORTGAGE_RATE: 1.1,
  TURN_TIME_LIMIT: 30,
  MAX_PLAYERS: 4
};

// Special space actions
export const SPECIAL_SPACE_ACTIONS = {
  0: { // Genesis Block (GO)
    action: 'collect',
    amount: GAME_CONSTANTS.GO_MONEY,
    message: '🏁 Passed Genesis Block! Collect 200 WHALE tokens!'
  },
  2: { // Mystery Box
    action: 'random',
    possibleOutcomes: [
      { type: 'gain', amount: 100, message: '🎁 Lucky airdrop! +100 WHALE!' },
      { type: 'loss', amount: 50, message: '💸 Gas fees! -50 WHALE!' },
      { type: 'teleport', position: 0, message: '🌀 Teleported to Genesis Block!' }
    ]
  },
  6: { // Airdrop
    action: 'gain',
    amount: 150,
    message: '🎁 Airdrop received! +150 WHALE tokens!'
  },
  10: { // Tax Haven
    action: 'loss',
    amount: 100,
    message: '💸 Tax time! Pay 100 WHALE tokens!'
  },
  14: { // SEC Audit
    action: 'loss',
    amount: 200,
    message: '⚖️ SEC Audit! Pay 200 WHALE tokens!'
  }
};

export default {
  PROPERTY_THEMES,
  PLAYER_COLORS,
  WHALE_EMOJIS,
  SOUND_EFFECTS,
  formatCurrency,
  getRandomWhaleEmoji,
  calculateRent,
  getPropertyGroupColor,
  playSound,
  generateParticles,
  getTimeOfDayGreeting,
  getRandomEncouragement,
  calculateNetWorth,
  getPlayerRanking,
  ANIMATIONS,
  GAME_CONSTANTS,
  SPECIAL_SPACE_ACTIONS
};
