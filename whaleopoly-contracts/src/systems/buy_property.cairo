use dojo::world::WorldStorage;
use starknet::ContractAddress;
use array::ArrayTrait;
use option::OptionTrait;
use super::super::components::{player::Player, property::Property};

// System to buy a property if unowned and player is on it
#[system]
pub fn buy_property_system(world: WorldStorage, player: ContractAddress, property_id: u32) {
    let mut player_model: Player = world.read_model(player);
    let mut property: Property = world.read_model(property_id);

    // Only allow buying if unowned and player is on the property
    if property.owner.is_some() || player_model.position != property_id as u8 {
        return;
    }
    if player_model.in_game_balance < property.price {
        return;
    }

    // Deduct price in Monopoly money, assign ownership
    player_model.in_game_balance -= property.price;
    property.owner = Option::Some(player);

    // Add property to player's owned list
    player_model.properties_owned.push(property_id);

    // Emit event: PropertyBought (pseudo, for off-chain indexing)
    // emit PropertyBought { player, property_id };

    world.write_model(@player_model);
    world.write_model(@property);
}
