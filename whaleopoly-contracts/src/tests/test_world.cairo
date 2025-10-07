#[cfg(test)]
mod tests {
    use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};
    use dojo::test_utils::spawn_test_world;
    use dojo_cairo_test::cairo_bindings::Query;
    use starknet::ContractAddress;

    use whaleopoly_contracts::components::{
        Player, Property, Game, DiceRoll, WhaleStatus, Bank, Jail, 
        ChanceCard, Mortgage, HouseHotel, Reward, Moves, DirectionsAvailable, 
        Position, PositionCount, Direction, Vec2
    };

    // Test world setup
    fn setup_world() -> IWorldDispatcher {
        spawn_test_world("whaleopoly_contracts")
    }

    #[test]
    fn test_join_game() {
        let world = setup_world();
        let player = starknet::contract_address_const::<0x123>();
        
        // Test that we can create a player entity
        let player_entity = world.entity('Player', array![player.into()]);
        let mut player_data = player_entity.get_mut::<Player>();
        
        player_data.address = player;
        player_data.balance = 0;
        player_data.in_game_balance = 1500;
        player_data.position = 0;
        player_data.properties_owned = array![];
        player_data.achievements = 0;
        
        // Verify the player was created correctly
        let read_player = player_entity.get::<Player>();
        assert(read_player.address == player, 'Player address mismatch');
        assert(read_player.in_game_balance == 1500, 'Player balance mismatch');
    }

    #[test]
    fn test_property_creation() {
        let world = setup_world();
        let property_id = 1u32;
        
        // Create a property
        let property_entity = world.entity('Property', array![property_id.into()]);
        let mut property_data = property_entity.get_mut::<Property>();
        
        property_data.id = property_id;
        property_data.name = 'Boardwalk';
        property_data.price = 400;
        property_data.rent = 50;
        property_data.owner = option::OptionTrait::none();
        property_data.color_group = 1;
        
        // Verify the property was created correctly
        let read_property = property_entity.get::<Property>();
        assert(read_property.id == property_id, 'Property ID mismatch');
        assert(read_property.price == 400, 'Property price mismatch');
        assert(read_property.name == 'Boardwalk', 'Property name mismatch');
    }

    #[test]
    fn test_dice_roll() {
        let world = setup_world();
        let player = starknet::contract_address_const::<0x123>();
        
        // Create a dice roll
        let dice_entity = world.entity('DiceRoll', array![player.into()]);
        let mut dice_data = dice_entity.get_mut::<DiceRoll>();
        
        dice_data.player = player;
        dice_data.roll = 6;
        
        // Verify the dice roll was created correctly
        let read_dice = dice_entity.get::<DiceRoll>();
        assert(read_dice.player == player, 'Dice player mismatch');
        assert(read_dice.roll == 6, 'Dice roll mismatch');
    }

    #[test]
    fn test_vec2_operations() {
        let vec1 = Vec2 { x: 0, y: 0 };
        let vec2 = Vec2 { x: 5, y: 5 };
        
        // Test is_zero
        assert(vec1.is_zero(), 'Vec2 should be zero');
        assert(!vec2.is_zero(), 'Vec2 should not be zero');
        
        // Test is_equal
        assert(vec1.is_equal(vec1), 'Vec2 should equal itself');
        assert(!vec1.is_equal(vec2), 'Vec2 should not equal different Vec2');
    }

    #[test]
    fn test_direction_enum() {
        let left = Direction::Left;
        let right = Direction::Right;
        let up = Direction::Up;
        let down = Direction::Down;
        
        // Test direction conversion to felt252
        assert(left.into() == 1, 'Left should be 1');
        assert(right.into() == 2, 'Right should be 2');
        assert(up.into() == 3, 'Up should be 3');
        assert(down.into() == 4, 'Down should be 4');
    }
}
