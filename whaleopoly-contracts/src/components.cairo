// Whaleopoly Components - Cairo 2.x/Dojo 1.5.0 compatible

use starknet::ContractAddress;
use core::array::Array;
use core::option::Option;

// Core game components
#[derive(Drop, Serde)]
#[dojo::model]
pub struct Player {
    #[key]
    pub address: ContractAddress,
    pub balance: u64, // ETH/testnet balance
    pub in_game_balance: u64, // Monopoly money
    pub position: u8,
    pub properties_owned: Array<u32>,
    pub achievements: u64, // bitmask or count for NFT achievements
}

#[derive(Drop, Serde)]
#[dojo::model]
pub struct Property {
    #[key]
    pub id: u32,
    pub name: felt252,
    pub price: u64,
    pub rent: u64,
    pub owner: Option<ContractAddress>,
    pub color_group: u8,
}

#[derive(Drop, Serde)]
#[dojo::model]
pub struct Game {
    #[key]
    pub id: u8,
    pub players: Array<ContractAddress>,
    pub turn_index: u8,
    pub state: felt252,
    pub turn_number: u32,
    pub block_number: u32,
}

#[derive(Drop, Serde)]
#[dojo::model]
pub struct DiceRoll {
    #[key]
    pub player: ContractAddress,
    pub roll: u8,
}

#[derive(Drop, Serde)]
#[dojo::model]
pub struct WhaleStatus {
    #[key]
    pub player: ContractAddress,
    pub net_worth: u64,
    pub whale_level: u8,
}

#[derive(Drop, Serde)]
#[dojo::model]
pub struct Bank {
    #[key]
    pub id: u8,
    pub funds: u64,
    pub tax_collected: u64,
    pub mono_pot: u64, // total MONO tokens for payout
}

#[derive(Drop, Serde)]
#[dojo::model]
pub struct Jail {
    #[key]
    pub player: ContractAddress,
    pub in_jail: bool,
    pub turns_left: u8,
}

#[derive(Drop, Serde)]
#[dojo::model]
pub struct ChanceCard {
    #[key]
    pub player: ContractAddress,
    pub card_id: u8,
}

#[derive(Drop, Serde)]
#[dojo::model]
pub struct Mortgage {
    #[key]
    pub property_id: u32,
    pub is_mortgaged: bool,
}

#[derive(Drop, Serde)]
#[dojo::model]
pub struct HouseHotel {
    #[key]
    pub property_id: u32,
    pub houses: u8,
    pub hotels: u8,
}

#[derive(Drop, Serde)]
#[dojo::model]
pub struct Reward {
    #[key]
    pub player: ContractAddress,
    pub mono_tokens: u64,
}

// Movement and positioning components (converted from models)
#[derive(Drop, Serde)]
#[dojo::model]
pub struct Moves {
    #[key]
    pub player: ContractAddress,
    pub remaining: u8,
    pub last_direction: Option<Direction>,
    pub can_move: bool,
}

#[derive(Drop, Serde)]
#[dojo::model]
pub struct DirectionsAvailable {
    #[key]
    pub player: ContractAddress,
    pub directions: Array<Direction>,
}

#[derive(Drop, Serde)]
#[dojo::model]
pub struct Position {
    #[key]
    pub player: ContractAddress,
    pub vec: Vec2,
}

#[derive(Drop, Serde)]
#[dojo::model]
pub struct PositionCount {
    #[key]
    pub identity: ContractAddress,
    pub position: Span<(u8, u128)>,
}

// Enums and structs for movement
#[derive(Serde, Copy, Drop, Introspect, PartialEq, Debug)]
pub enum Direction {
    Left,
    Right,
    Up,
    Down,
}

#[derive(Copy, Drop, Serde, IntrospectPacked, Debug)]
pub struct Vec2 {
    pub x: u32,
    pub y: u32,
}

// Implementations for Direction
impl DirectionIntoFelt252 of Into<Direction, felt252> {
    fn into(self: Direction) -> felt252 {
        match self {
            Direction::Left => 1,
            Direction::Right => 2,
            Direction::Up => 3,
            Direction::Down => 4,
        }
    }
}

impl OptionDirectionIntoFelt252 of Into<Option<Direction>, felt252> {
    fn into(self: Option<Direction>) -> felt252 {
        match self {
            Option::None => 0,
            Option::Some(d) => d.into(),
        }
    }
}

// Implementation for Vec2
#[generate_trait]
impl Vec2Impl of Vec2Trait {
    fn is_zero(self: Vec2) -> bool {
        if self.x - self.y == 0 {
            return true;
        }
        false
    }

    fn is_equal(self: Vec2, b: Vec2) -> bool {
        self.x == b.x && self.y == b.y
    }
}
