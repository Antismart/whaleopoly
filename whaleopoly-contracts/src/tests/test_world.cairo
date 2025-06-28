#[cfg(test)]
mod tests {
    use dojo_cairo_test::WorldStorageTestTrait;
    use dojo::world::WorldStorageTrait;
    use dojo_cairo_test::spawn_test_world;
    use array::ArrayTrait;
    use starknet::ContractAddress;
    use whaleopoly_contracts::components::{player::Player, property::Property, bank::Bank, game::Game};
    use whaleopoly_contracts::systems::{start_game::start_game_system, buy_property::buy_property_system, pay_rent::pay_rent_system};
    use array::Array;
    use option::Option;

    #[test]
    fn test_game_init_and_player_balances() {
        let mut world = spawn_test_world([]);
        let player1 = ContractAddress::from(0x1111);
        let player2 = ContractAddress::from(0x2222);
        let mut players = ArrayTrait::new();
        players.push(player1);
        players.push(player2);
        let initial_balance = 1500;
        start_game_system(world.storage(), players.clone(), initial_balance);

        let p1: Player = world.read_model(player1);
        let p2: Player = world.read_model(player2);
        assert(p1.in_game_balance == initial_balance, 'Player 1 initial balance wrong');
        assert(p2.in_game_balance == initial_balance, 'Player 2 initial balance wrong');
        let bank: Bank = world.read_model(1);
        assert(bank.funds == 1_000_000_000, 'Bank initial funds wrong');
    }

    #[test]
    fn test_buy_property() {
        let mut world = spawn_test_world([]);
        let player = ContractAddress::from(0x1111);
        let mut players = ArrayTrait::new();
        players.push(player);
        let initial_balance = 1500;
        start_game_system(world.storage(), players.clone(), initial_balance);

        // Create a property at position 0, price 200
        let property_id = 0;
        let property = Property {
            id: property_id,
            name: 'Boardwalk',
            price: 200,
            rent: 50,
            owner: Option::None,
            color_group: 1,
        };
        world.write_model(@property);

        // Move player to position 0
        let mut p: Player = world.read_model(player);
        p.position = 0;
        world.write_model(@p);

        buy_property_system(world.storage(), player, property_id);
        let p: Player = world.read_model(player);
        let prop: Property = world.read_model(property_id);
        assert(p.in_game_balance == initial_balance - 200, 'Player balance not deducted');
        assert(prop.owner.is_some(), 'Property not owned after buy');
    }

    #[test]
    fn test_pay_rent() {
        let mut world = spawn_test_world([]);
        let player1 = ContractAddress::from(0x1111);
        let player2 = ContractAddress::from(0x2222);
        let mut players = ArrayTrait::new();
        players.push(player1);
        players.push(player2);
        let initial_balance = 1500;
        start_game_system(world.storage(), players.clone(), initial_balance);

        // Create a property owned by player1
        let property_id = 1;
        let property = Property {
            id: property_id,
            name: 'Park Place',
            price: 350,
            rent: 35,
            owner: Option::Some(player1),
            color_group: 2,
        };
        world.write_model(@property);

        // Move player2 to property
        let mut p2: Player = world.read_model(player2);
        p2.position = 1;
        world.write_model(@p2);

        pay_rent_system(world.storage(), player2, property_id);
        let p1: Player = world.read_model(player1);
        let p2: Player = world.read_model(player2);
        assert(p2.in_game_balance == initial_balance - 35, 'Payer balance not deducted');
        assert(p1.in_game_balance == initial_balance + 35, 'Payee balance not increased');
    }
}
