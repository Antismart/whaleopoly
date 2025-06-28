// Whaleopoly Systems - Cairo 2.x/Dojo 1.5.0 compatible

use starknet::ContractAddress;
use array::ArrayTrait;
use array::Array;
use option::OptionTrait;
use option::Option;
use dojo::component::Component;
use crate::components::{Player, Property, Game, DiceRoll, WhaleStatus, Bank, Jail, ChanceCard, Mortgage, HouseHotel, Reward};

// Utility: Get current block number (placeholder, replace with real block fetch if available)
fn get_block_number() -> u32 {
    0u32 // TODO: Replace with actual block number logic
}

// Example: Player join game (update for dispatcher pattern)
fn join_game(game_id: u8, player: ContractAddress) {
    let mut game = Game::read(game_id).unwrap();
    game.players.append(player);
    Game::write(game_id, game);
    let player_data = Player {
        address: player,
        balance: 0u64,
        in_game_balance: 1500u64,
        position: 0u8,
        properties_owned: ArrayTrait::new(),
        achievements: 0u64,
    };
    Player::write(player, player_data);
    let whale_status = WhaleStatus {
        player,
        net_worth: 1500u64,
        whale_level: 0u8,
    };
    WhaleStatus::write(player, whale_status);
}

// Example: Buy property
fn buy_property(player: ContractAddress, property_id: u32) {
    let mut p = Player::read(player).unwrap();
    let mut prop = Property::read(property_id).unwrap();
    if prop.owner.is_none() && p.in_game_balance >= prop.price {
        p.in_game_balance -= prop.price;
        prop.owner = OptionTrait::some(player);
        p.properties_owned.append(property_id);
        Player::write(player, p);
        Property::write(property_id, prop);
    }
}

// Example: Pay rent
fn pay_rent(player: ContractAddress, property_id: u32) {
    let mut prop = Property::read(property_id).unwrap();
    if let Some(owner) = prop.owner {
        let mut payer = Player::read(player).unwrap();
        let mut payee = Player::read(owner).unwrap();
        if payer.in_game_balance >= prop.rent {
            payer.in_game_balance -= prop.rent;
            payee.in_game_balance += prop.rent;
            Player::write(player, payer);
            Player::write(owner, payee);
        }
    }
}

// Example: Roll dice
fn roll_dice(player: ContractAddress, seed: u64) {
    let roll = (seed % 6 + 1) as u8;
    let dice = DiceRoll { player, roll };
    DiceRoll::write(player, dice);
}

// Example: Move player
const BOARD_SIZE: u8 = 20;
fn move_player(player: ContractAddress) {
    let mut p = Player::read(player).unwrap();
    let dice: DiceRoll = DiceRoll::read(player).unwrap();
    let new_pos = (p.position + dice.roll) % BOARD_SIZE;
    p.position = new_pos;
    Player::write(player, p);
}

// Example: End turn
fn end_turn() {
    let mut game = Game::read(1).unwrap();
    let num_players = game.players.len();
    game.turn_index = (game.turn_index + 1) % num_players as u8;
    Game::write(1, game);
}

// Example: Whale tax
fn whale_tax() {
    let game = Game::read(1).unwrap();
    let mut max_net = 0u64;
    let mut whale: Option<ContractAddress> = OptionTrait::none();
    for i in 0..game.players.len() {
        let addr = game.players[i];
        let player: Player = Player::read(addr).unwrap();
        if player.balance > max_net {
            max_net = player.balance;
            whale = OptionTrait::some(addr);
        }
    }
    if let Some(whale_addr) = whale {
        let mut player: Player = Player::read(whale_addr).unwrap();
        let tax = player.balance / 10;
        player.balance -= tax;
        Player::write(whale_addr, player);
        let mut status: WhaleStatus = WhaleStatus::read(whale_addr).unwrap();
        status.net_worth = player.balance;
        status.whale_level += 1;
        WhaleStatus::write(whale_addr, status);
        let mut bank = Bank::read(1).unwrap();
        bank.tax_collected += tax;
        Bank::write(1, bank);
    }
}

// Example: Collect tax
fn collect_tax(amount: u64) {
    let mut bank = Bank::read(1).unwrap();
    bank.tax_collected += amount;
    Bank::write(1, bank);
}

// Example: End game
fn end_game() {
    let mut game = Game::read(1).unwrap();
    game.state = 'Ended';
    Game::write(1, game);
}

// Example: Send to jail
fn send_to_jail(player: ContractAddress) {
    let jail = Jail { player, in_jail: true, turns_left: 3 };
    Jail::write(player, jail);
}

// Example: Release from jail
fn release_from_jail(player: ContractAddress) {
    let mut jail: Jail = Jail::read(player).unwrap();
    jail.in_jail = false;
    jail.turns_left = 0;
    Jail::write(player, jail);
}

// Example: Decrement jail turn
fn decrement_jail_turn(player: ContractAddress) {
    let mut jail: Jail = Jail::read(player).unwrap();
    if jail.in_jail && jail.turns_left > 0 {
        jail.turns_left -= 1;
        if jail.turns_left == 0 {
            jail.in_jail = false;
        }
        Jail::write(player, jail);
    }
}

// Example: Draw chance card
fn draw_chance_card(player: ContractAddress, seed: u64) {
    let card_id = (seed % 16) as u8;
    let card = ChanceCard { player, card_id };
    ChanceCard::write(player, card);
}

// Example: Resolve chance card (logic to be implemented per card ID)
fn resolve_chance_card(player: ContractAddress) {
    let card: ChanceCard = ChanceCard::read(player).unwrap();
    // Add logic for each card_id as needed
}

// Example: Mortgage property
fn mortgage_property(property_id: u32) {
    let mortgage = Mortgage { property_id, is_mortgaged: true };
    Mortgage::write(property_id, mortgage);
}

// Example: Unmortgage property
fn unmortgage_property(property_id: u32) {
    let mut mortgage: Mortgage = Mortgage::read(property_id).unwrap();
    mortgage.is_mortgaged = false;
    Mortgage::write(property_id, mortgage);
}

// Example: Add house
fn add_house(property_id: u32) {
    let mut hh: HouseHotel = HouseHotel::read(property_id).unwrap();
    hh.houses += 1;
    HouseHotel::write(property_id, hh);
}

// Example: Add hotel
fn add_hotel(property_id: u32) {
    let mut hh: HouseHotel = HouseHotel::read(property_id).unwrap();
    hh.hotels += 1;
    HouseHotel::write(property_id, hh);
}

// Example: Trade property
fn trade_property(from: ContractAddress, to: ContractAddress, property_id: u32, price: u64) {
    let mut from_player: Player = Player::read(from).unwrap();
    let mut to_player: Player = Player::read(to).unwrap();
    let mut property: Property = Property::read(property_id).unwrap();
    if property.owner.is_none() || property.owner.unwrap() != from || to_player.balance < price {
        return;
    }
    property.owner = OptionTrait::some(to);
    from_player.properties_owned.retain(|&x| x != property_id);
    to_player.properties_owned.append(property_id);
    to_player.balance -= price;
    from_player.balance += price;
    Player::write(from, from_player);
    Player::write(to, to_player);
    Property::write(property_id, property);
}

// Example: Pass GO
fn pass_go(player: ContractAddress, amount: u64) {
    let mut p = Player::read(player).unwrap();
    p.balance += amount;
    Player::write(player, p);
}

// Example: Bankruptcy
fn bankruptcy(player: ContractAddress) {
    let mut game: Game = Game::read(1).unwrap();
    game.players.retain(|&x| x != player);
    Game::write(1, game);
    let bankrupt_player: Player = Player::read(player).unwrap();
    for &property_id in &bankrupt_player.properties_owned {
        let mut property: Property = Property::read(property_id).unwrap();
        property.owner = OptionTrait::none();
        Property::write(property_id, property);
    }
}

// Example: Auction property
fn auction_property(property_id: u32, winner: ContractAddress, winning_bid: u64) {
    let mut property: Property = Property::read(property_id).unwrap();
    property.owner = OptionTrait::some(winner);
    let mut winner_player = Player::read(winner).unwrap();
    if winner_player.balance < winning_bid {
        return;
    }
    winner_player.balance -= winning_bid;
    Player::write(winner, winner_player);
    Property::write(property_id, property);
}

// Example: Calculate rent
fn calculate_rent(property_id: u32) -> u64 {
    let property: Property = Property::read(property_id).unwrap();
    let hh: HouseHotel = HouseHotel::read(property_id).unwrap();
    let mut rent = property.rent;
    rent += (hh.houses as u64) * (property.rent / 2);
    rent += (hh.hotels as u64) * property.rent;
    rent
}