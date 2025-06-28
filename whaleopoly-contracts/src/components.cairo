// Whaleopoly Components - Cairo 2.x/Dojo 1.5.0 compatible

use dojo::component::Component;
use starknet::ContractAddress;
use core::array::Array;
use core::option::Option;

#[derive(Component, Drop, Serde)]
#[component(storage = true)]
pub struct Player {
    #[key]
    pub address: ContractAddress,
    pub balance: u64, // ETH/testnet balance
    pub in_game_balance: u64, // Monopoly money
    pub position: u8,
    pub properties_owned: Array<u32>,
    pub achievements: u64, // bitmask or count for NFT achievements
}

#[derive(Component, Drop, Serde)]
#[component(storage = true)]
pub struct Property {
    #[key]
    pub id: u32,
    pub name: felt252,
    pub price: u64,
    pub rent: u64,
    pub owner: Option<ContractAddress>,
    pub color_group: u8,
}

#[derive(Component, Drop, Serde)]
#[component(storage = true)]
pub struct Game {
    #[key]
    pub id: u8,
    pub players: Array<ContractAddress>,
    pub turn_index: u8,
    pub state: felt252,
    pub turn_number: u32,
    pub block_number: u32,
}

#[derive(Component, Drop, Serde)]
#[component(storage = true)]
pub struct DiceRoll {
    #[key]
    pub player: ContractAddress,
    pub roll: u8,
}

#[derive(Component, Drop, Serde)]
#[component(storage = true)]
pub struct WhaleStatus {
    #[key]
    pub player: ContractAddress,
    pub net_worth: u64,
    pub whale_level: u8,
}

#[derive(Component, Drop, Serde)]
#[component(storage = true)]
pub struct Bank {
    #[key]
    pub id: u8,
    pub funds: u64,
    pub tax_collected: u64,
    pub mono_pot: u64, // total MONO tokens for payout
}

#[derive(Component, Drop, Serde)]
#[component(storage = true)]
pub struct Jail {
    #[key]
    pub player: ContractAddress,
    pub in_jail: bool,
    pub turns_left: u8,
}

#[derive(Component, Drop, Serde)]
#[component(storage = true)]
pub struct ChanceCard {
    #[key]
    pub player: ContractAddress,
    pub card_id: u8,
}

#[derive(Component, Drop, Serde)]
#[component(storage = true)]
pub struct Mortgage {
    #[key]
    pub property_id: u32,
    pub is_mortgaged: bool,
}

#[derive(Component, Drop, Serde)]
#[component(storage = true)]
pub struct HouseHotel {
    #[key]
    pub property_id: u32,
    pub houses: u8,
    pub hotels: u8,
}

#[derive(Component, Drop, Serde)]
#[component(storage = true)]
pub struct Reward {
    #[key]
    pub player: ContractAddress,
    pub mono_tokens: u64,
}
