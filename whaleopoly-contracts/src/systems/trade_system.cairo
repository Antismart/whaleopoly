use dojo::world::WorldStorage;
use starknet::ContractAddress;
use array::ArrayTrait;
use super::super::components::{player::Player, property::Property};

// System to trade a property between two players for a price
#[system]
pub fn trade_property_system(world: WorldStorage, from: ContractAddress, to: ContractAddress, property_id: u32, price: u64) {
    let mut from_player: Player = world.read_model(from);
    let mut to_player: Player = world.read_model(to);
    let mut property: Property = world.read_model(property_id);

    // Only allow trade if 'from' owns the property and 'to' has enough balance
    if property.owner.is_none() || property.owner.unwrap() != from || to_player.balance < price {
        return;
    }

    // Transfer property
    property.owner = Option::Some(to);
    from_player.properties_owned.remove(property_id);
    to_player.properties_owned.push(property_id);

    // Transfer funds in Monopoly money
    to_player.in_game_balance -= price;
    from_player.in_game_balance += price;

    world.write_model(@from_player);
    world.write_model(@to_player);
    world.write_model(@property);
}
