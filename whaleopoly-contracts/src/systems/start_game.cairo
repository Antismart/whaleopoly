use dojo::world::WorldStorage;
use starknet::ContractAddress;
use array::Array;
use array::ArrayTrait;
use super::super::components::{game::Game, player::Player, bank::Bank};

// System to initialize the game with players and initial balances
#[system]
pub fn start_game_system(
    world: WorldStorage,
    players: Array<ContractAddress>,
    initial_balance: u64
) {
    // Set up the game state
    let game = Game {
        id: 1,
        players: players.clone(),
        turn_index: 0,
        state: 'Playing',
    };
    world.write_model(@game);

    // Give each player initial balance and zero position
    let mut i = 0;
    while i < players.len() {
        let player_addr = players.at(i);
        let player = Player {
            address: player_addr,
            balance: 0, // Real ETH, not used for gameplay
            in_game_balance: initial_balance, // Monopoly money for gameplay
            position: 0,
            properties_owned: ArrayTrait::new(),
        };
        world.write_model(@player);
        i += 1;
    }

    // Initialize the bank with a large fund and zero tax collected
    let bank = Bank { id: 1, funds: 1_000_000_000, tax_collected: 0 };
    world.write_model(@bank);
}
