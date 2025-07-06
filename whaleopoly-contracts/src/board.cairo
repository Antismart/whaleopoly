use crate::models::{Property, PropertyGroup, Card, CardType, CardEffect};

// =====================================================
// BOARD CONFIGURATION
// =====================================================

pub fn initialize_board_properties() -> Array<Property> {
    let mut properties = ArrayTrait::new();
    
    // ===== DEFI PROTOCOLS (Brown) =====
    properties.append(Property {
        property_id: 1,
        name: 'Uniswap',
        property_group: PropertyGroup::DeFiProtocols,
        price: 60,
        rent: 2,
        rent_with_monopoly: 4,
        rent_with_1_node: 10,
        rent_with_2_nodes: 30,
        rent_with_3_nodes: 90,
        rent_with_4_nodes: 160,
        rent_with_5_nodes: 250,
        node_cost: 50,
        mortgage_value: 30,
        owner: Option::None,
        is_mortgaged: false,
        nodes_built: 0,
        game_id: 0,
    });
    
    properties.append(Property {
        property_id: 2,
        name: 'Aave',
        property_group: PropertyGroup::DeFiProtocols,
        price: 80,
        rent: 4,
        rent_with_monopoly: 8,
        rent_with_1_node: 20,
        rent_with_2_nodes: 60,
        rent_with_3_nodes: 180,
        rent_with_4_nodes: 320,
        rent_with_5_nodes: 450,
        node_cost: 50,
        mortgage_value: 40,
        owner: Option::None,
        is_mortgaged: false,
        nodes_built: 0,
        game_id: 0,
    });
    
    // ===== LAYER 1 BLOCKCHAINS (Light Blue) =====
    properties.append(Property {
        property_id: 3,
        name: 'Ethereum',
        property_group: PropertyGroup::Layer1Blockchains,
        price: 100,
        rent: 6,
        rent_with_monopoly: 12,
        rent_with_1_node: 30,
        rent_with_2_nodes: 90,
        rent_with_3_nodes: 270,
        rent_with_4_nodes: 400,
        rent_with_5_nodes: 550,
        node_cost: 50,
        mortgage_value: 50,
        owner: Option::None,
        is_mortgaged: false,
        nodes_built: 0,
        game_id: 0,
    });
    
    properties.append(Property {
        property_id: 4,
        name: 'Bitcoin',
        property_group: PropertyGroup::Layer1Blockchains,
        price: 100,
        rent: 6,
        rent_with_monopoly: 12,
        rent_with_1_node: 30,
        rent_with_2_nodes: 90,
        rent_with_3_nodes: 270,
        rent_with_4_nodes: 400,
        rent_with_5_nodes: 550,
        node_cost: 50,
        mortgage_value: 50,
        owner: Option::None,
        is_mortgaged: false,
        nodes_built: 0,
        game_id: 0,
    });
    
    properties.append(Property {
        property_id: 5,
        name: 'Solana',
        property_group: PropertyGroup::Layer1Blockchains,
        price: 120,
        rent: 8,
        rent_with_monopoly: 16,
        rent_with_1_node: 40,
        rent_with_2_nodes: 100,
        rent_with_3_nodes: 300,
        rent_with_4_nodes: 450,
        rent_with_5_nodes: 600,
        node_cost: 50,
        mortgage_value: 60,
        owner: Option::None,
        is_mortgaged: false,
        nodes_built: 0,
        game_id: 0,
    });
    
    // ===== LAYER 2 SOLUTIONS (Pink) =====
    properties.append(Property {
        property_id: 6,
        name: 'Polygon',
        property_group: PropertyGroup::Layer2Solutions,
        price: 140,
        rent: 10,
        rent_with_monopoly: 20,
        rent_with_1_node: 50,
        rent_with_2_nodes: 150,
        rent_with_3_nodes: 450,
        rent_with_4_nodes: 625,
        rent_with_5_nodes: 750,
        node_cost: 100,
        mortgage_value: 70,
        owner: Option::None,
        is_mortgaged: false,
        nodes_built: 0,
        game_id: 0,
    });
    
    properties.append(Property {
        property_id: 7,
        name: 'Arbitrum',
        property_group: PropertyGroup::Layer2Solutions,
        price: 140,
        rent: 10,
        rent_with_monopoly: 20,
        rent_with_1_node: 50,
        rent_with_2_nodes: 150,
        rent_with_3_nodes: 450,
        rent_with_4_nodes: 625,
        rent_with_5_nodes: 750,
        node_cost: 100,
        mortgage_value: 70,
        owner: Option::None,
        is_mortgaged: false,
        nodes_built: 0,
        game_id: 0,
    });
    
    properties.append(Property {
        property_id: 8,
        name: 'Optimism',
        property_group: PropertyGroup::Layer2Solutions,
        price: 160,
        rent: 12,
        rent_with_monopoly: 24,
        rent_with_1_node: 60,
        rent_with_2_nodes: 180,
        rent_with_3_nodes: 500,
        rent_with_4_nodes: 700,
        rent_with_5_nodes: 900,
        node_cost: 100,
        mortgage_value: 80,
        owner: Option::None,
        is_mortgaged: false,
        nodes_built: 0,
        game_id: 0,
    });
    
    // ===== NFT MARKETPLACES (Orange) =====
    properties.append(Property {
        property_id: 9,
        name: 'OpenSea',
        property_group: PropertyGroup::NFTMarketplaces,
        price: 180,
        rent: 14,
        rent_with_monopoly: 28,
        rent_with_1_node: 70,
        rent_with_2_nodes: 200,
        rent_with_3_nodes: 550,
        rent_with_4_nodes: 750,
        rent_with_5_nodes: 950,
        node_cost: 100,
        mortgage_value: 90,
        owner: Option::None,
        is_mortgaged: false,
        nodes_built: 0,
        game_id: 0,
    });
    
    properties.append(Property {
        property_id: 10,
        name: 'Blur',
        property_group: PropertyGroup::NFTMarketplaces,
        price: 180,
        rent: 14,
        rent_with_monopoly: 28,
        rent_with_1_node: 70,
        rent_with_2_nodes: 200,
        rent_with_3_nodes: 550,
        rent_with_4_nodes: 750,
        rent_with_5_nodes: 950,
        node_cost: 100,
        mortgage_value: 90,
        owner: Option::None,
        is_mortgaged: false,
        nodes_built: 0,
        game_id: 0,
    });
    
    properties.append(Property {
        property_id: 11,
        name: 'Magic Eden',
        property_group: PropertyGroup::NFTMarketplaces,
        price: 200,
        rent: 16,
        rent_with_monopoly: 32,
        rent_with_1_node: 80,
        rent_with_2_nodes: 220,
        rent_with_3_nodes: 600,
        rent_with_4_nodes: 800,
        rent_with_5_nodes: 1000,
        node_cost: 100,
        mortgage_value: 100,
        owner: Option::None,
        is_mortgaged: false,
        nodes_built: 0,
        game_id: 0,
    });
    
    // ===== INFRASTRUCTURE (Red) =====
    properties.append(Property {
        property_id: 12,
        name: 'Chainlink',
        property_group: PropertyGroup::Infrastructure,
        price: 220,
        rent: 18,
        rent_with_monopoly: 36,
        rent_with_1_node: 90,
        rent_with_2_nodes: 250,
        rent_with_3_nodes: 700,
        rent_with_4_nodes: 875,
        rent_with_5_nodes: 1050,
        node_cost: 150,
        mortgage_value: 110,
        owner: Option::None,
        is_mortgaged: false,
        nodes_built: 0,
        game_id: 0,
    });
    
    properties.append(Property {
        property_id: 13,
        name: 'Infura',
        property_group: PropertyGroup::Infrastructure,
        price: 220,
        rent: 18,
        rent_with_monopoly: 36,
        rent_with_1_node: 90,
        rent_with_2_nodes: 250,
        rent_with_3_nodes: 700,
        rent_with_4_nodes: 875,
        rent_with_5_nodes: 1050,
        node_cost: 150,
        mortgage_value: 110,
        owner: Option::None,
        is_mortgaged: false,
        nodes_built: 0,
        game_id: 0,
    });
    
    properties.append(Property {
        property_id: 14,
        name: 'Alchemy',
        property_group: PropertyGroup::Infrastructure,
        price: 240,
        rent: 20,
        rent_with_monopoly: 40,
        rent_with_1_node: 100,
        rent_with_2_nodes: 300,
        rent_with_3_nodes: 750,
        rent_with_4_nodes: 925,
        rent_with_5_nodes: 1100,
        node_cost: 150,
        mortgage_value: 120,
        owner: Option::None,
        is_mortgaged: false,
        nodes_built: 0,
        game_id: 0,
    });
    
    // ===== DAOS/GOVERNANCE (Yellow) =====
    properties.append(Property {
        property_id: 15,
        name: 'Snapshot',
        property_group: PropertyGroup::DAOsGovernance,
        price: 260,
        rent: 22,
        rent_with_monopoly: 44,
        rent_with_1_node: 110,
        rent_with_2_nodes: 330,
        rent_with_3_nodes: 800,
        rent_with_4_nodes: 975,
        rent_with_5_nodes: 1150,
        node_cost: 150,
        mortgage_value: 130,
        owner: Option::None,
        is_mortgaged: false,
        nodes_built: 0,
        game_id: 0,
    });
    
    properties.append(Property {
        property_id: 16,
        name: 'Aragon',
        property_group: PropertyGroup::DAOsGovernance,
        price: 260,
        rent: 22,
        rent_with_monopoly: 44,
        rent_with_1_node: 110,
        rent_with_2_nodes: 330,
        rent_with_3_nodes: 800,
        rent_with_4_nodes: 975,
        rent_with_5_nodes: 1150,
        node_cost: 150,
        mortgage_value: 130,
        owner: Option::None,
        is_mortgaged: false,
        nodes_built: 0,
        game_id: 0,
    });
    
    properties.append(Property {
        property_id: 17,
        name: 'Gitcoin',
        property_group: PropertyGroup::DAOsGovernance,
        price: 280,
        rent: 24,
        rent_with_monopoly: 48,
        rent_with_1_node: 120,
        rent_with_2_nodes: 360,
        rent_with_3_nodes: 850,
        rent_with_4_nodes: 1025,
        rent_with_5_nodes: 1200,
        node_cost: 150,
        mortgage_value: 140,
        owner: Option::None,
        is_mortgaged: false,
        nodes_built: 0,
        game_id: 0,
    });
    
    // ===== BRIDGES/CROSS-CHAIN (Green) =====
    properties.append(Property {
        property_id: 18,
        name: 'Wormhole',
        property_group: PropertyGroup::BridgesCrossChain,
        price: 300,
        rent: 26,
        rent_with_monopoly: 52,
        rent_with_1_node: 130,
        rent_with_2_nodes: 390,
        rent_with_3_nodes: 900,
        rent_with_4_nodes: 1100,
        rent_with_5_nodes: 1275,
        node_cost: 200,
        mortgage_value: 150,
        owner: Option::None,
        is_mortgaged: false,
        nodes_built: 0,
        game_id: 0,
    });
    
    properties.append(Property {
        property_id: 19,
        name: 'LayerZero',
        property_group: PropertyGroup::BridgesCrossChain,
        price: 300,
        rent: 26,
        rent_with_monopoly: 52,
        rent_with_1_node: 130,
        rent_with_2_nodes: 390,
        rent_with_3_nodes: 900,
        rent_with_4_nodes: 1100,
        rent_with_5_nodes: 1275,
        node_cost: 200,
        mortgage_value: 150,
        owner: Option::None,
        is_mortgaged: false,
        nodes_built: 0,
        game_id: 0,
    });
    
    // ===== PREMIUM PROPERTIES (Dark Blue) =====
    properties.append(Property {
        property_id: 20,
        name: 'Axelar',
        property_group: PropertyGroup::BridgesCrossChain,
        price: 350,
        rent: 35,
        rent_with_monopoly: 70,
        rent_with_1_node: 175,
        rent_with_2_nodes: 500,
        rent_with_3_nodes: 1100,
        rent_with_4_nodes: 1300,
        rent_with_5_nodes: 1500,
        node_cost: 200,
        mortgage_value: 175,
        owner: Option::None,
        is_mortgaged: false,
        nodes_built: 0,
        game_id: 0,
    });
    
    properties.append(Property {
        property_id: 21,
        name: 'The Graph',
        property_group: PropertyGroup::Infrastructure,
        price: 400,
        rent: 50,
        rent_with_monopoly: 100,
        rent_with_1_node: 200,
        rent_with_2_nodes: 600,
        rent_with_3_nodes: 1400,
        rent_with_4_nodes: 1700,
        rent_with_5_nodes: 2000,
        node_cost: 200,
        mortgage_value: 200,
        owner: Option::None,
        is_mortgaged: false,
        nodes_built: 0,
        game_id: 0,
    });
    
    properties
}

// =====================================================
// PROTOCOL UPGRADE CARDS
// =====================================================

pub fn initialize_protocol_upgrade_cards() -> Array<Card> {
    let mut cards = ArrayTrait::new();
    
    cards.append(Card {
        card_id: 1,
        card_type: CardType::ProtocolUpgrade,
        description: "Advance to Block Reward",
        effect: CardEffect::Move,
        value: 0,
    });
    
    cards.append(Card {
        card_id: 2,
        card_type: CardType::ProtocolUpgrade,
        description: "Advance to Ethereum",
        effect: CardEffect::Move,
        value: 6,
    });
    
    cards.append(Card {
        card_id: 3,
        card_type: CardType::ProtocolUpgrade,
        description: "Advance to OpenSea - if you pass Block Reward, collect 200",
        effect: CardEffect::Move,
        value: 16,
    });
    
    cards.append(Card {
        card_id: 4,
        card_type: CardType::ProtocolUpgrade,
        description: "Advance to nearest RPC Provider and pay owner twice the rent",
        effect: CardEffect::Move,
        value: 999, // Special value for nearest utility
    });
    
    cards.append(Card {
        card_id: 5,
        card_type: CardType::ProtocolUpgrade,
        description: "Advance to nearest Bridge and pay owner twice the rent",
        effect: CardEffect::Move,
        value: 998, // Special value for nearest bridge
    });
    
    cards.append(Card {
        card_id: 6,
        card_type: CardType::ProtocolUpgrade,
        description: "Protocol dividend - collect 50 tokens",
        effect: CardEffect::Collect,
        value: 50,
    });
    
    cards.append(Card {
        card_id: 7,
        card_type: CardType::ProtocolUpgrade,
        description: "Get out of Smart Contract Audit free",
        effect: CardEffect::GetOutOfAudit,
        value: 0,
    });
    
    cards.append(Card {
        card_id: 8,
        card_type: CardType::ProtocolUpgrade,
        description: "Go back 3 spaces",
        effect: CardEffect::Move,
        value: 253, // -3 in u8
    });
    
    cards.append(Card {
        card_id: 9,
        card_type: CardType::ProtocolUpgrade,
        description: "Go to Smart Contract Audit - Go directly to audit",
        effect: CardEffect::GoToAudit,
        value: 0,
    });
    
    cards.append(Card {
        card_id: 10,
        card_type: CardType::ProtocolUpgrade,
        description: "Make general repairs on all your properties - For each node pay 25 tokens",
        effect: CardEffect::PayPerProperty,
        value: 25,
    });
    
    cards.append(Card {
        card_id: 11,
        card_type: CardType::ProtocolUpgrade,
        description: "Speeding fine - pay 15 tokens",
        effect: CardEffect::Pay,
        value: 15,
    });
    
    cards.append(Card {
        card_id: 12,
        card_type: CardType::ProtocolUpgrade,
        description: "Take a trip to Chainlink - if you pass Block Reward, collect 200",
        effect: CardEffect::Move,
        value: 21,
    });
    
    cards.append(Card {
        card_id: 13,
        card_type: CardType::ProtocolUpgrade,
        description: "You have been elected chairman of the board - pay each player 50 tokens",
        effect: CardEffect::PayEachPlayer,
        value: 50,
    });
    
    cards.append(Card {
        card_id: 14,
        card_type: CardType::ProtocolUpgrade,
        description: "Your building loan matures - collect 150 tokens",
        effect: CardEffect::Collect,
        value: 150,
    });
    
    cards.append(Card {
        card_id: 15,
        card_type: CardType::ProtocolUpgrade,
        description: "You have won a crossword competition - collect 100 tokens",
        effect: CardEffect::Collect,
        value: 100,
    });
    
    cards.append(Card {
        card_id: 16,
        card_type: CardType::ProtocolUpgrade,
        description: "Bank pays you dividend of 50 tokens",
        effect: CardEffect::Collect,
        value: 50,
    });
    
    cards
}

// =====================================================
// COMMUNITY GOVERNANCE CARDS
// =====================================================

pub fn initialize_community_governance_cards() -> Array<Card> {
    let mut cards = ArrayTrait::new();
    
    cards.append(Card {
        card_id: 17,
        card_type: CardType::CommunityGovernance,
        description: "Advance to Block Reward",
        effect: CardEffect::Move,
        value: 0,
    });
    
    cards.append(Card {
        card_id: 18,
        card_type: CardType::CommunityGovernance,
        description: "DAO error in your favor - collect 200 tokens",
        effect: CardEffect::Collect,
        value: 200,
    });
    
    cards.append(Card {
        card_id: 19,
        card_type: CardType::CommunityGovernance,
        description: "Doctor fee - pay 50 tokens",
        effect: CardEffect::Pay,
        value: 50,
    });
    
    cards.append(Card {
        card_id: 20,
        card_type: CardType::CommunityGovernance,
        description: "From sale of stock you get 50 tokens",
        effect: CardEffect::Collect,
        value: 50,
    });
    
    cards.append(Card {
        card_id: 21,
        card_type: CardType::CommunityGovernance,
        description: "Get out of Smart Contract Audit free",
        effect: CardEffect::GetOutOfAudit,
        value: 0,
    });
    
    cards.append(Card {
        card_id: 22,
        card_type: CardType::CommunityGovernance,
        description: "Go to Smart Contract Audit - Go directly to audit",
        effect: CardEffect::GoToAudit,
        value: 0,
    });
    
    cards.append(Card {
        card_id: 23,
        card_type: CardType::CommunityGovernance,
        description: "Holiday fund matures - receive 100 tokens",
        effect: CardEffect::Collect,
        value: 100,
    });
    
    cards.append(Card {
        card_id: 24,
        card_type: CardType::CommunityGovernance,
        description: "Income tax refund - collect 20 tokens",
        effect: CardEffect::Collect,
        value: 20,
    });
    
    cards.append(Card {
        card_id: 25,
        card_type: CardType::CommunityGovernance,
        description: "It is your birthday - collect 10 tokens from every player",
        effect: CardEffect::CollectFromEachPlayer,
        value: 10,
    });
    
    cards.append(Card {
        card_id: 26,
        card_type: CardType::CommunityGovernance,
        description: "Life insurance matures - collect 100 tokens",
        effect: CardEffect::Collect,
        value: 100,
    });
    
    cards.append(Card {
        card_id: 27,
        card_type: CardType::CommunityGovernance,
        description: "Hospital fee - pay 100 tokens",
        effect: CardEffect::Pay,
        value: 100,
    });
    
    cards.append(Card {
        card_id: 28,
        card_type: CardType::CommunityGovernance,
        description: "School fee - pay 150 tokens",
        effect: CardEffect::Pay,
        value: 150,
    });
    
    cards.append(Card {
        card_id: 29,
        card_type: CardType::CommunityGovernance,
        description: "Receive 25 tokens services rendered",
        effect: CardEffect::Collect,
        value: 25,
    });
    
    cards.append(Card {
        card_id: 30,
        card_type: CardType::CommunityGovernance,
        description: "You are assessed for street repairs - 40 tokens per node",
        effect: CardEffect::PayPerProperty,
        value: 40,
    });
    
    cards.append(Card {
        card_id: 31,
        card_type: CardType::CommunityGovernance,
        description: "You have won second prize in a beauty contest - collect 10 tokens",
        effect: CardEffect::Collect,
        value: 10,
    });
    
    cards.append(Card {
        card_id: 32,
        card_type: CardType::CommunityGovernance,
        description: "You inherit 100 tokens",
        effect: CardEffect::Collect,
        value: 100,
    });
    
    cards
}

// =====================================================
// BOARD SQUARE DEFINITIONS
// =====================================================

pub struct BoardSquare {
    pub position: u8,
    pub name: felt252,
    pub square_type: SquareType,
    pub property_id: Option<u8>,
}

#[derive(Copy, Drop, Serde, Debug, PartialEq)]
pub enum SquareType {
    Go,
    Property,
    ProtocolUpgrade,
    CommunityGovernance,
    GasFee,
    Bridge,
    FreeParking,
    SmartContractAudit,
    RPCProvider,
    MEVTax,
    GoToAudit,
}

pub fn get_board_layout() -> Array<BoardSquare> {
    let mut board = ArrayTrait::new();
    
    // Position 0 - Block Reward (GO)
    board.append(BoardSquare {
        position: 0,
        name: 'Block Reward',
        square_type: SquareType::Go,
        property_id: Option::None,
    });
    
    // Position 1 - Uniswap
    board.append(BoardSquare {
        position: 1,
        name: 'Uniswap',
        square_type: SquareType::Property,
        property_id: Option::Some(1),
    });
    
    // Position 2 - Community Governance
    board.append(BoardSquare {
        position: 2,
        name: 'Community Governance',
        square_type: SquareType::CommunityGovernance,
        property_id: Option::None,
    });
    
    // Position 3 - Aave
    board.append(BoardSquare {
        position: 3,
        name: 'Aave',
        square_type: SquareType::Property,
        property_id: Option::Some(2),
    });
    
    // Position 4 - Gas Fee
    board.append(BoardSquare {
        position: 4,
        name: 'Gas Fee',
        square_type: SquareType::GasFee,
        property_id: Option::None,
    });
    
    // Position 5 - Cross-Chain Bridge
    board.append(BoardSquare {
        position: 5,
        name: 'Cross-Chain Bridge',
        square_type: SquareType::Bridge,
        property_id: Option::None,
    });
    
    // Continue with all 40 squares...
    // This is a sample - full implementation would include all 40 squares
    
    board
}
