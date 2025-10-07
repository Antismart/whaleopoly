// Whaleopoly Actions - Dojo 1.5.0 compatible (Cairo 2.x)

use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};
use starknet::ContractAddress;
use core::array::ArrayTrait;
use crate::components::{Player, Game};

const STARTING_BALANCE: u64 = 1500;

#[starknet::interface]
trait IActions<TContractState> {
    fn join_game(self: @TContractState, game_id: u8);
}

#[starknet::contract]
mod actions {
    use super::*;
    use dojo::world::IWorldDispatcherTrait;

    #[storage]
    struct Storage {
        world: IWorldDispatcher,
    }

    #[abi(embed_v0)]
    impl ActionsImpl of IActions<ContractState> {
        fn join_game(self: @ContractState, game_id: u8) {
            let mut world = self.world;
            let player = starknet::get_caller_address();

            // Create a new game and add player
            let mut game = Game {
                id: game_id,
                players: ArrayTrait::new(),
                turn_index: 0,
                state: 'Active',
                turn_number: 0,
                block_number: 0,
            };
            game.players.append(player);
            Game::set(&mut world, game_id, game);

            // Create player
            let player_data = Player {
                address: player,
                balance: 0,
                in_game_balance: STARTING_BALANCE,
                position: 0,
                properties_owned: ArrayTrait::new(),
                achievements: 0,
            };
            Player::set(&mut world, player, player_data);
        }
    }
} 