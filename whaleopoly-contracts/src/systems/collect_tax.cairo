use dojo::world::WorldStorage;

// System for the bank to collect a specified tax amount (can be used for luxury tax, etc.)
#[system]
pub fn collect_tax_system(world: WorldStorage, amount: u64) {
    let mut bank = world.read_model(1);
    // In a real game, deduct tax from player's in_game_balance and add to bank.tax_collected
    // This system only updates the bank, so call this after deducting from player elsewhere.
    bank.tax_collected += amount;
    world.write_model(@bank);
}
