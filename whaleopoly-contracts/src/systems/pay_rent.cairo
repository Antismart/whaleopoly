use dojo::world::WorldStorage;
use starknet::ContractAddress;
use option::OptionTrait;
use super::super::components::{player::Player, property::Property};

// System to pay rent to property owner if landed on an owned property
#[system]
pub fn pay_rent_system(world: WorldStorage, player: ContractAddress, property_id: u32) {
    let mut property: Property = world.read_model(property_id);
    if property.owner.is_none() || property.owner.unwrap() == player {
        return;
    }
    let mut payer: Player = world.read_model(player);
    let mut payee: Player = world.read_model(property.owner.unwrap());

    if payer.in_game_balance < property.rent {
        return;
    }

    // Transfer rent in Monopoly money
    payer.in_game_balance -= property.rent;
    payee.in_game_balance += property.rent;

    world.write_model(@payer);
    world.write_model(@payee);
}
