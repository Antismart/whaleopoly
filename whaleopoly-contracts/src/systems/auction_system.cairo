use dojo::world::WorldStorage;
use starknet::ContractAddress;
use array::Array;
use super::super::components::{property::Property};

// System to set property owner to the highest bidder in an auction
#[system]
pub fn auction_property_system(world: WorldStorage, property_id: u32, winner: ContractAddress, winning_bid: u64) {
    let mut property: Property = world.read_model(property_id);
    property.owner = Option::Some(winner);
    // Deduct winning_bid from winner's in_game_balance (Monopoly money)
    let mut winner_player = world.read_model(winner);
    if winner_player.in_game_balance < winning_bid {
        return;
    }
    winner_player.in_game_balance -= winning_bid;
    world.write_model(@winner_player);
    // You may want to deduct winning_bid from winner's balance in a real implementation
    world.write_model(@property);
}
