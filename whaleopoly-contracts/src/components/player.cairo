use starknet::ContractAddress;
use array::Array;

// Player component: stores player address, balance, position, and owned properties
#[derive(Component, Serde, Drop, Copy)]
pub struct Player {
    #[key]
    pub address: ContractAddress,
    pub balance: u256, // ETH balance in wei
    pub in_game_balance: u64, // Monopoly money, not real ETH
    pub position: u8,
    pub properties_owned: Array<u32>,
}
