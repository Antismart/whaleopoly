use dojo::world::WorldStorage;
use super::super::components::house_hotel::HouseHotel;

// System to add a house to a property
#[system]
pub fn add_house_system(world: WorldStorage, property_id: u32) {
    let mut hh: HouseHotel = world.read_model(property_id);
    hh.houses += 1;
    world.write_model(@hh);
}

// System to add a hotel to a property
#[system]
pub fn add_hotel_system(world: WorldStorage, property_id: u32) {
    let mut hh: HouseHotel = world.read_model(property_id);
    hh.hotels += 1;
    world.write_model(@hh);
}

// When building houses/hotels, deduct cost from player's in_game_balance in the calling system.
// This system only updates the house/hotel count.
