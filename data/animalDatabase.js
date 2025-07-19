/**
 * Mars Ark Animal Database
 * Comprehensive catalog of Earth's animals for Mars colonization selection
 * Each animal includes detailed metrics and characteristics for evaluation
 */

const animalDatabase = [
    {
        id: 1,
        name: "African Elephant",
        emoji: "🐘",
        category: "Mammals",
        habitat: "Savanna",
        votes: 2847,
        intelligence: 95,
        adaptability: 70,
        cuteness: 80,
        survival: 85,
        social: 90,
        size: 30,
        usefulness: 75,
        facts: [
            "Largest land animal",
            "Exceptional memory",
            "Complex social structures",
            "Environmental engineers"
        ],
        conservation: "Vulnerable"
    },
    {
        id: 2,
        name: "Honey Bee",
        emoji: "🐝",
        category: "Insects",
        habitat: "Various",
        votes: 3421,
        intelligence: 70,
        adaptability: 95,
        cuteness: 65,
        survival: 80,
        social: 100,
        size: 95,
        usefulness: 100,
        facts: [
            "Essential pollinators",
            "Complex communication",
            "Hive mind intelligence",
            "Critical for food production"
        ],
        conservation: "Declining"
    },
    {
        id: 3,
        name: "Arctic Fox",
        emoji: "🦊",
        category: "Mammals",
        habitat: "Arctic",
        votes: 1932,
        intelligence: 80,
        adaptability: 95,
        cuteness: 95,
        survival: 95,
        social: 70,
        size: 85,
        usefulness: 60,
        facts: [
            "Extreme cold adaptation",
            "Seasonal coat changes",
            "Excellent hearing",
            "Opportunistic hunter"
        ],
        conservation: "Least Concern"
    },
    {
        id: 4,
        name: "Octopus",
        emoji: "🐙",
        category: "Marine Life",
        habitat: "Ocean",
        votes: 2156,
        intelligence: 100,
        adaptability: 90,
        cuteness: 70,
        survival: 85,
        social: 40,
        size: 70,
        usefulness: 65,
        facts: [
            "Most intelligent invertebrate",
            "Master of camouflage",
            "Problem-solving abilities",
            "Flexible body structure"
        ],
        conservation: "Varied by species"
    },
    {
        id: 5,
        name: "Emperor Penguin",
        emoji: "🐧",
        category: "Birds",
        habitat: "Arctic",
        votes: 2890,
        intelligence: 75,
        adaptability: 80,
        cuteness: 100,
        survival: 90,
        social: 95,
        size: 75,
        usefulness: 50,
        facts: [
            "Extreme weather survival",
            "Dedicated parents",
            "Excellent swimmers",
            "Social cooperation"
        ],
        conservation: "Near Threatened"
    },
    {
        id: 6,
        name: "Red Panda",
        emoji: "🐼",
        category: "Mammals",
        habitat: "Forest",
        votes: 4123,
        intelligence: 70,
        adaptability: 75,
        cuteness: 100,
        survival: 70,
        social: 60,
        size: 90,
        usefulness: 40,
        facts: [
            "Bamboo specialist",
            "Excellent climber",
            "Solitary nature",
            "Unique genetic lineage"
        ],
        conservation: "Endangered"
    },
    {
        id: 7,
        name: "Dolphin",
        emoji: "🐬",
        category: "Marine Life",
        habitat: "Ocean",
        votes: 3654,
        intelligence: 95,
        adaptability: 85,
        cuteness: 90,
        survival: 80,
        social: 100,
        size: 60,
        usefulness: 80,
        facts: [
            "Self-aware",
            "Complex language",
            "Tool use",
            "Emotional intelligence"
        ],
        conservation: "Varied by species"
    },
    {
        id: 8,
        name: "Snow Leopard",
        emoji: "🐆",
        category: "Mammals",
        habitat: "Mountain",
        votes: 1876,
        intelligence: 85,
        adaptability: 85,
        cuteness: 95,
        survival: 95,
        social: 50,
        size: 70,
        usefulness: 45,
        facts: [
            "Mountain specialist",
            "Incredible jumper",
            "Thick fur for cold",
            "Solitary hunter"
        ],
        conservation: "Vulnerable"
    },
    {
        id: 9,
        name: "Parrot",
        emoji: "🦜",
        category: "Birds",
        habitat: "Forest",
        votes: 2543,
        intelligence: 90,
        adaptability: 80,
        cuteness: 85,
        survival: 75,
        social: 85,
        size: 80,
        usefulness: 70,
        facts: [
            "Vocal mimicry",
            "Problem solving",
            "Long lifespan",
            "Social bonds"
        ],
        conservation: "Varied by species"
    },
    {
        id: 10,
        name: "Sea Turtle",
        emoji: "🐢",
        category: "Marine Life",
        habitat: "Ocean",
        votes: 2198,
        intelligence: 60,
        adaptability: 70,
        cuteness: 85,
        survival: 90,
        social: 60,
        size: 50,
        usefulness: 55,
        facts: [
            "Ancient lineage",
            "Navigation skills",
            "Long lifespan",
            "Ocean cleanup"
        ],
        conservation: "Various threats"
    },
    {
        id: 11,
        name: "Wolf",
        emoji: "🐺",
        category: "Mammals",
        habitat: "Forest",
        votes: 2987,
        intelligence: 90,
        adaptability: 85,
        cuteness: 75,
        survival: 95,
        social: 100,
        size: 65,
        usefulness: 85,
        facts: [
            "Pack hunters",
            "Complex social hierarchy",
            "Excellent communication",
            "Ecosystem engineers"
        ],
        conservation: "Recovering"
    },
    {
        id: 12,
        name: "Hummingbird",
        emoji: "🐦",
        category: "Birds",
        habitat: "Various",
        votes: 1654,
        intelligence: 65,
        adaptability: 80,
        cuteness: 90,
        survival: 70,
        social: 40,
        size: 100,
        usefulness: 60,
        facts: [
            "Fastest wingbeat",
            "Hover flight",
            "High metabolism",
            "Pollination services"
        ],
        conservation: "Varied by species"
    },
    {
        id: 13,
        name: "Chimpanzee",
        emoji: "🐵",
        category: "Mammals",
        habitat: "Forest",
        votes: 3156,
        intelligence: 100,
        adaptability: 80,
        cuteness: 85,
        survival: 75,
        social: 95,
        size: 70,
        usefulness: 90,
        facts: [
            "Closest human relative",
            "Tool use",
            "Complex emotions",
            "Learning ability"
        ],
        conservation: "Endangered"
    },
    {
        id: 14,
        name: "Polar Bear",
        emoji: "🐻‍❄️",
        category: "Mammals",
        habitat: "Arctic",
        votes: 2234,
        intelligence: 75,
        adaptability: 60,
        cuteness: 90,
        survival: 95,
        social: 60,
        size: 20,
        usefulness: 50,
        facts: [
            "Arctic apex predator",
            "Excellent swimmer",
            "Thick insulation",
            "Climate change indicator"
        ],
        conservation: "Vulnerable"
    },
    {
        id: 15,
        name: "Chameleon",
        emoji: "🦎",
        category: "Reptiles",
        habitat: "Forest",
        votes: 1789,
        intelligence: 70,
        adaptability: 100,
        cuteness: 80,
        survival: 85,
        social: 30,
        size: 85,
        usefulness: 60,
        facts: [
            "Color changing",
            "Independent eye movement",
            "Projectile tongue",
            "Arboreal specialist"
        ],
        conservation: "Varied by species"
    },
    {
        id: 16,
        name: "Owl",
        emoji: "🦉",
        category: "Birds",
        habitat: "Various",
        votes: 2456,
        intelligence: 85,
        adaptability: 85,
        cuteness: 85,
        survival: 90,
        social: 50,
        size: 75,
        usefulness: 75,
        facts: [
            "Silent flight",
            "Excellent night vision",
            "Asymmetrical ears",
            "Pest control"
        ],
        conservation: "Varied by species"
    },
    {
        id: 17,
        name: "Koala",
        emoji: "🐨",
        category: "Mammals",
        habitat: "Forest",
        votes: 3876,
        intelligence: 50,
        adaptability: 40,
        cuteness: 100,
        survival: 60,
        social: 40,
        size: 80,
        usefulness: 30,
        facts: [
            "Eucalyptus specialist",
            "Sleeps 22 hours daily",
            "Unique fingerprints",
            "Marsupial"
        ],
        conservation: "Vulnerable"
    },
    {
        id: 18,
        name: "Shark",
        emoji: "🦈",
        category: "Marine Life",
        habitat: "Ocean",
        votes: 1923,
        intelligence: 70,
        adaptability: 80,
        cuteness: 40,
        survival: 100,
        social: 50,
        size: 40,
        usefulness: 70,
        facts: [
            "Ancient predator",
            "Electroreception",
            "Cartilaginous skeleton",
            "Ecosystem balance"
        ],
        conservation: "Many threatened"
    },
    {
        id: 19,
        name: "Butterfly",
        emoji: "🦋",
        category: "Insects",
        habitat: "Various",
        votes: 2678,
        intelligence: 40,
        adaptability: 70,
        cuteness: 95,
        survival: 60,
        social: 70,
        size: 95,
        usefulness: 80,
        facts: [
            "Complete metamorphosis",
            "Pollination services",
            "Migration patterns",
            "Visual beauty"
        ],
        conservation: "Declining globally"
    },
    {
        id: 20,
        name: "Giraffe",
        emoji: "🦒",
        category: "Mammals",
        habitat: "Savanna",
        votes: 2345,
        intelligence: 65,
        adaptability: 60,
        cuteness: 90,
        survival: 70,
        social: 75,
        size: 10,
        usefulness: 40,
        facts: [
            "Tallest mammal",
            "Unique blood circulation",
            "Long tongue",
            "Gentle giants"
        ],
        conservation: "Vulnerable"
    },
    {
        id: 21,
        name: "Golden Retriever",
        emoji: "🐕",
        category: "Mammals",
        habitat: "Domestic",
        votes: 4567,
        intelligence: 85,
        adaptability: 90,
        cuteness: 100,
        survival: 75,
        social: 100,
        size: 70,
        usefulness: 95,
        facts: [
            "Loyal companions",
            "Highly trainable",
            "Excellent with children",
            "Search and rescue capabilities"
        ],
        conservation: "Domesticated"
    },
    {
        id: 22,
        name: "Mantis Shrimp",
        emoji: "🦐",
        category: "Marine Life",
        habitat: "Ocean",
        votes: 1567,
        intelligence: 75,
        adaptability: 85,
        cuteness: 60,
        survival: 95,
        social: 40,
        size: 85,
        usefulness: 50,
        facts: [
            "Most complex eyes in nature",
            "Powerful punch",
            "16 types of color receptors",
            "Lightning-fast reflexes"
        ],
        conservation: "Stable"
    },
    {
        id: 23,
        name: "Ring-tailed Lemur",
        emoji: "🐒",
        category: "Mammals",
        habitat: "Forest",
        votes: 2134,
        intelligence: 75,
        adaptability: 70,
        cuteness: 95,
        survival: 70,
        social: 85,
        size: 80,
        usefulness: 55,
        facts: [
            "Matriarchal society",
            "Scent communication",
            "Excellent jumpers",
            "Madagascar endemic"
        ],
        conservation: "Endangered"
    },
    {
        id: 24,
        name: "Axolotl",
        emoji: "🦎",
        category: "Amphibians",
        habitat: "Freshwater",
        votes: 3245,
        intelligence: 60,
        adaptability: 80,
        cuteness: 100,
        survival: 65,
        social: 50,
        size: 90,
        usefulness: 85,
        facts: [
            "Complete regeneration ability",
            "Permanently aquatic",
            "Scientific research value",
            "Critically endangered in wild"
        ],
        conservation: "Critically Endangered"
    },
    {
        id: 25,
        name: "Barn Owl",
        emoji: "🦉",
        category: "Birds",
        habitat: "Various",
        votes: 1890,
        intelligence: 80,
        adaptability: 90,
        cuteness: 85,
        survival: 85,
        social: 60,
        size: 75,
        usefulness: 90,
        facts: [
            "Silent flight",
            "Exceptional hearing",
            "Global distribution",
            "Natural pest control"
        ],
        conservation: "Least Concern"
    },
    {
        id: 26,
        name: "Capybara",
        emoji: "🦫",
        category: "Mammals",
        habitat: "Wetlands",
        votes: 3789,
        intelligence: 70,
        adaptability: 80,
        cuteness: 100,
        survival: 75,
        social: 95,
        size: 60,
        usefulness: 60,
        facts: [
            "World's largest rodent",
            "Extremely social",
            "Semi-aquatic lifestyle",
            "Peaceful nature"
        ],
        conservation: "Least Concern"
    },
    {
        id: 27,
        name: "Praying Mantis",
        emoji: "🦗",
        category: "Insects",
        habitat: "Various",
        votes: 1456,
        intelligence: 65,
        adaptability: 85,
        cuteness: 70,
        survival: 80,
        social: 20,
        size: 90,
        usefulness: 75,
        facts: [
            "Ambush predator",
            "360-degree head rotation",
            "Natural pest control",
            "Excellent camouflage"
        ],
        conservation: "Stable"
    },
    {
        id: 28,
        name: "Fennec Fox",
        emoji: "🦊",
        category: "Mammals",
        habitat: "Desert",
        votes: 2987,
        intelligence: 80,
        adaptability: 95,
        cuteness: 100,
        survival: 90,
        social: 75,
        size: 95,
        usefulness: 65,
        facts: [
            "Largest ears relative to body",
            "Desert adaptation expert",
            "Nocturnal lifestyle",
            "Social family groups"
        ],
        conservation: "Least Concern"
    },
    {
        id: 29,
        name: "Beluga Whale",
        emoji: "🐋",
        category: "Marine Life",
        habitat: "Arctic Ocean",
        votes: 2456,
        intelligence: 90,
        adaptability: 75,
        cuteness: 95,
        survival: 80,
        social: 90,
        size: 40,
        usefulness: 70,
        facts: [
            "Highly vocal communication",
            "Flexible neck movement",
            "Arctic specialist",
            "Complex social structures"
        ],
        conservation: "Near Threatened"
    },
    {
        id: 30,
        name: "Pangolin",
        emoji: "🦔",
        category: "Mammals",
        habitat: "Various",
        votes: 1789,
        intelligence: 65,
        adaptability: 75,
        cuteness: 85,
        survival: 85,
        social: 40,
        size: 75,
        usefulness: 80,
        facts: [
            "Only mammal with scales",
            "Ant and termite specialist",
            "Rolls into defensive ball",
            "Most trafficked mammal"
        ],
        conservation: "Critically Endangered"
    },
    {
        id: 31,
        name: "Quetzal",
        emoji: "🦜",
        category: "Birds",
        habitat: "Forest",
        votes: 1567,
        intelligence: 75,
        adaptability: 65,
        cuteness: 90,
        survival: 70,
        social: 70,
        size: 80,
        usefulness: 50,
        facts: [
            "Sacred to ancient civilizations",
            "Stunning iridescent plumage",
            "Cloud forest specialist",
            "Long tail feathers"
        ],
        conservation: "Near Threatened"
    },
    {
        id: 32,
        name: "Tardigrade",
        emoji: "🦠",
        category: "Microscopic",
        habitat: "Various",
        votes: 2890,
        intelligence: 30,
        adaptability: 100,
        cuteness: 70,
        survival: 100,
        social: 20,
        size: 100,
        usefulness: 85,
        facts: [
            "Survives space vacuum",
            "Cryptobiosis ability",
            "Extreme temperature resistance",
            "Radiation tolerance"
        ],
        conservation: "Abundant"
    },
    {
        id: 33,
        name: "Sloth",
        emoji: "🦥",
        category: "Mammals",
        habitat: "Forest",
        votes: 4123,
        intelligence: 55,
        adaptability: 60,
        cuteness: 100,
        survival: 75,
        social: 40,
        size: 70,
        usefulness: 40,
        facts: [
            "Slowest mammal",
            "Three-toed species",
            "Algae symbiosis",
            "Energy-efficient lifestyle"
        ],
        conservation: "Vulnerable"
    },
    {
        id: 34,
        name: "Orca",
        emoji: "🐋",
        category: "Marine Life",
        habitat: "Ocean",
        votes: 3456,
        intelligence: 100,
        adaptability: 85,
        cuteness: 85,
        survival: 90,
        social: 100,
        size: 20,
        usefulness: 75,
        facts: [
            "Apex marine predator",
            "Complex family pods",
            "Cultural transmission",
            "Sophisticated hunting strategies"
        ],
        conservation: "Data Deficient"
    },
    {
        id: 35,
        name: "Meerkat",
        emoji: "🦫",
        category: "Mammals",
        habitat: "Desert",
        votes: 2678,
        intelligence: 80,
        adaptability: 85,
        cuteness: 95,
        survival: 85,
        social: 100,
        size: 85,
        usefulness: 70,
        facts: [
            "Sentinel system",
            "Complex social hierarchy",
            "Underground burrows",
            "Cooperative parenting"
        ],
        conservation: "Least Concern"
    },
    {
        id: 36,
        name: "Platypus",
        emoji: "🦫",
        category: "Mammals",
        habitat: "Freshwater",
        votes: 2234,
        intelligence: 75,
        adaptability: 80,
        cuteness: 90,
        survival: 75,
        social: 40,
        size: 80,
        usefulness: 60,
        facts: [
            "Egg-laying mammal",
            "Electroreception ability",
            "Venomous male spurs",
            "Unique evolutionary lineage"
        ],
        conservation: "Near Threatened"
    },
    {
        id: 37,
        name: "Secretary Bird",
        emoji: "🦅",
        category: "Birds",
        habitat: "Savanna",
        votes: 1345,
        intelligence: 85,
        adaptability: 80,
        cuteness: 80,
        survival: 85,
        social: 60,
        size: 70,
        usefulness: 85,
        facts: [
            "Snake-hunting specialist",
            "Powerful leg strikes",
            "Ground-based raptor",
            "Distinctive crest feathers"
        ],
        conservation: "Endangered"
    },
    {
        id: 38,
        name: "Glass Frog",
        emoji: "🐸",
        category: "Amphibians",
        habitat: "Forest",
        votes: 1678,
        intelligence: 50,
        adaptability: 75,
        cuteness: 85,
        survival: 70,
        social: 50,
        size: 95,
        usefulness: 65,
        facts: [
            "Transparent belly skin",
            "Arboreal lifestyle",
            "Parental care behavior",
            "Rainforest indicator species"
        ],
        conservation: "Vulnerable"
    },
    {
        id: 39,
        name: "Binturong",
        emoji: "🐻",
        category: "Mammals",
        habitat: "Forest",
        votes: 1234,
        intelligence: 75,
        adaptability: 70,
        cuteness: 90,
        survival: 75,
        social: 60,
        size: 75,
        usefulness: 55,
        facts: [
            "Smells like popcorn",
            "Prehensile tail",
            "Arboreal carnivore",
            "Southeast Asian endemic"
        ],
        conservation: "Vulnerable"
    },
    {
        id: 40,
        name: "Arctic Tern",
        emoji: "🐦",
        category: "Birds",
        habitat: "Arctic",
        votes: 1890,
        intelligence: 85,
        adaptability: 95,
        cuteness: 80,
        survival: 90,
        social: 80,
        size: 85,
        usefulness: 70,
        facts: [
            "Longest migration of any animal",
            "Arctic to Antarctic journey",
            "Exceptional navigation skills",
            "Aggressive nest defense"
        ],
        conservation: "Least Concern"
    },
    {
        id: 41,
        name: "Snow Monkey",
        emoji: "🐒",
        category: "Mammals",
        habitat: "Mountain",
        votes: 2567,
        intelligence: 90,
        adaptability: 85,
        cuteness: 95,
        survival: 90,
        social: 95,
        size: 70,
        usefulness: 70,
        facts: [
            "Hot spring bathing behavior",
            "Cold weather adaptation",
            "Complex social hierarchies",
            "Tool use abilities"
        ],
        conservation: "Least Concern"
    },
    {
        id: 42,
        name: "Peacock Mantis Shrimp",
        emoji: "🦐",
        category: "Marine Life",
        habitat: "Ocean",
        votes: 1789,
        intelligence: 80,
        adaptability: 85,
        cuteness: 75,
        survival: 95,
        social: 40,
        size: 80,
        usefulness: 60,
        facts: [
            "Fastest punch in animal kingdom",
            "12-16 color receptors",
            "Complex burrow systems",
            "Sophisticated visual system"
        ],
        conservation: "Stable"
    },
    {
        id: 43,
        name: "Quokka",
        emoji: "😊",
        category: "Mammals",
        habitat: "Island",
        votes: 4890,
        intelligence: 65,
        adaptability: 70,
        cuteness: 100,
        survival: 65,
        social: 80,
        size: 85,
        usefulness: 45,
        facts: [
            "Always appears to be smiling",
            "Herbivorous marsupial",
            "Island endemic species",
            "Social media famous"
        ],
        conservation: "Vulnerable"
    },
    {
        id: 44,
        name: "Leafy Sea Dragon",
        emoji: "🐉",
        category: "Marine Life",
        habitat: "Ocean",
        votes: 2345,
        intelligence: 50,
        adaptability: 75,
        cuteness: 95,
        survival: 70,
        social: 40,
        size: 85,
        usefulness: 50,
        facts: [
            "Perfect camouflage",
            "Males carry eggs",
            "Related to seahorses",
            "Endemic to southern Australia"
        ],
        conservation: "Near Threatened"
    },
    {
        id: 45,
        name: "Bald Eagle",
        emoji: "🦅",
        category: "Birds",
        habitat: "Various",
        votes: 3456,
        intelligence: 85,
        adaptability: 80,
        cuteness: 75,
        survival: 85,
        social: 70,
        size: 60,
        usefulness: 80,
        facts: [
            "National bird of USA",
            "Excellent eyesight",
            "Powerful talons",
            "Conservation success story"
        ],
        conservation: "Least Concern"
    },
    {
        id: 46,
        name: "Sugar Glider",
        emoji: "🐿️",
        category: "Mammals",
        habitat: "Forest",
        votes: 3789,
        intelligence: 70,
        adaptability: 85,
        cuteness: 100,
        survival: 75,
        social: 90,
        size: 95,
        usefulness: 60,
        facts: [
            "Gliding membrane",
            "Nocturnal marsupial",
            "Strong social bonds",
            "Sweet tooth preference"
        ],
        conservation: "Least Concern"
    },
    {
        id: 47,
        name: "Giant Pacific Octopus",
        emoji: "🐙",
        category: "Marine Life",
        habitat: "Ocean",
        votes: 2123,
        intelligence: 100,
        adaptability: 90,
        cuteness: 70,
        survival: 85,
        social: 30,
        size: 40,
        usefulness: 70,
        facts: [
            "Largest octopus species",
            "Problem-solving genius",
            "Color-changing abilities",
            "Short but intense lifespan"
        ],
        conservation: "Stable"
    },
    {
        id: 48,
        name: "Mandrill",
        emoji: "🐒",
        category: "Mammals",
        habitat: "Forest",
        votes: 1567,
        intelligence: 90,
        adaptability: 75,
        cuteness: 80,
        survival: 80,
        social: 95,
        size: 60,
        usefulness: 70,
        facts: [
            "Colorful facial markings",
            "Largest primate",
            "Complex social groups",
            "Rainforest canopy dweller"
        ],
        conservation: "Vulnerable"
    },
    {
        id: 49,
        name: "Puffin",
        emoji: "🐧",
        category: "Birds",
        habitat: "Ocean",
        votes: 4234,
        intelligence: 75,
        adaptability: 80,
        cuteness: 100,
        survival: 80,
        social: 85,
        size: 85,
        usefulness: 60,
        facts: [
            "Colorful beak during breeding",
            "Excellent underwater swimmer",
            "Cliff-nesting colonies",
            "Can carry multiple fish"
        ],
        conservation: "Vulnerable"
    },
    {
        id: 50,
        name: "Thorny Devil",
        emoji: "🦎",
        category: "Reptiles",
        habitat: "Desert",
        votes: 1456,
        intelligence: 60,
        adaptability: 95,
        cuteness: 75,
        survival: 95,
        social: 30,
        size: 90,
        usefulness: 65,
        facts: [
            "Collects water through skin",
            "False head defense",
            "Ant specialist diet",
            "Desert camouflage expert"
        ],
        conservation: "Least Concern"
    },
    {
        id: 51,
        name: "Kiwi Bird",
        emoji: "🥝",
        category: "Birds",
        habitat: "Forest",
        votes: 2890,
        intelligence: 70,
        adaptability: 65,
        cuteness: 95,
        survival: 70,
        social: 60,
        size: 80,
        usefulness: 55,
        facts: [
            "Flightless bird",
            "Excellent sense of smell",
            "Nocturnal lifestyle",
            "New Zealand national symbol"
        ],
        conservation: "Vulnerable"
    },
    {
        id: 52,
        name: "Monarch Butterfly",
        emoji: "🦋",
        category: "Insects",
        habitat: "Various",
        votes: 3567,
        intelligence: 45,
        adaptability: 85,
        cuteness: 90,
        survival: 70,
        social: 80,
        size: 95,
        usefulness: 85,
        facts: [
            "Multi-generational migration",
            "Toxic to predators",
            "Navigation by sun compass",
            "Milkweed plant dependency"
        ],
        conservation: "Endangered"
    },
    {
        id: 53,
        name: "Gharial",
        emoji: "🐊",
        category: "Reptiles",
        habitat: "Freshwater",
        votes: 1234,
        intelligence: 65,
        adaptability: 60,
        cuteness: 60,
        survival: 85,
        social: 50,
        size: 40,
        usefulness: 70,
        facts: [
            "Fish-eating specialist",
            "Distinctive bulbous snout",
            "Critically endangered",
            "Ancient crocodilian lineage"
        ],
        conservation: "Critically Endangered"
    },
    {
        id: 54,
        name: "Numbat",
        emoji: "🐿️",
        category: "Mammals",
        habitat: "Forest",
        votes: 1789,
        intelligence: 65,
        adaptability: 70,
        cuteness: 90,
        survival: 65,
        social: 40,
        size: 85,
        usefulness: 75,
        facts: [
            "Termite specialist",
            "Diurnal marsupial",
            "Striped coat pattern",
            "Western Australia endemic"
        ],
        conservation: "Endangered"
    },
    {
        id: 55,
        name: "Leafcutter Ant",
        emoji: "🐜",
        category: "Insects",
        habitat: "Forest",
        votes: 2456,
        intelligence: 80,
        adaptability: 90,
        cuteness: 60,
        survival: 85,
        social: 100,
        size: 100,
        usefulness: 90,
        facts: [
            "Fungus farming agriculture",
            "Complex division of labor",
            "Superorganism behavior",
            "Ecosystem engineers"
        ],
        conservation: "Stable"
    },
    {
        id: 56,
        name: "Flamingo",
        emoji: "🦩",
        category: "Birds",
        habitat: "Wetlands",
        votes: 3890,
        intelligence: 70,
        adaptability: 75,
        cuteness: 95,
        survival: 80,
        social: 95,
        size: 70,
        usefulness: 60,
        facts: [
            "Pink coloration from diet",
            "Filter feeding specialists",
            "Large flocking behavior",
            "One-legged standing"
        ],
        conservation: "Least Concern"
    },
    {
        id: 57,
        name: "Pangolin",
        emoji: "🦔",
        category: "Mammals",
        habitat: "Various",
        votes: 2234,
        intelligence: 65,
        adaptability: 75,
        cuteness: 85,
        survival: 85,
        social: 40,
        size: 75,
        usefulness: 80,
        facts: [
            "Walking pinecone appearance",
            "Ant and termite diet",
            "Defensive ball rolling",
            "Most trafficked mammal"
        ],
        conservation: "Critically Endangered"
    },
    {
        id: 58,
        name: "Shoebill Stork",
        emoji: "🦅",
        category: "Birds",
        habitat: "Wetlands",
        votes: 1678,
        intelligence: 85,
        adaptability: 70,
        cuteness: 75,
        survival: 80,
        social: 50,
        size: 50,
        usefulness: 65,
        facts: [
            "Machine-gun like bill clattering",
            "Statue-like hunting patience",
            "Prehistoric appearance",
            "Swamp specialist"
        ],
        conservation: "Vulnerable"
    },
    {
        id: 59,
        name: "Mountain Goat",
        emoji: "🐐",
        category: "Mammals",
        habitat: "Mountain",
        votes: 2345,
        intelligence: 75,
        adaptability: 85,
        cuteness: 85,
        survival: 95,
        social: 70,
        size: 70,
        usefulness: 70,
        facts: [
            "Extreme cliff climbing",
            "Thick woolly coat",
            "Sure-footed on ice",
            "High altitude specialist"
        ],
        conservation: "Least Concern"
    },
    {
        id: 60,
        name: "Blobfish",
        emoji: "🐟",
        category: "Marine Life",
        habitat: "Ocean",
        votes: 2890,
        intelligence: 40,
        adaptability: 60,
        cuteness: 85,
        survival: 70,
        social: 40,
        size: 80,
        usefulness: 40,
        facts: [
            "Gelatinous body structure",
            "Deep sea pressure adaptation",
            "World's ugliest animal award",
            "Minimal energy lifestyle"
        ],
        conservation: "Vulnerable"
    },
    {
        id: 61,
        name: "Okapi",
        emoji: "🦓",
        category: "Mammals",
        habitat: "Forest",
        votes: 1567,
        intelligence: 70,
        adaptability: 65,
        cuteness: 90,
        survival: 70,
        social: 60,
        size: 65,
        usefulness: 55,
        facts: [
            "Forest giraffe relative",
            "Striped legs only",
            "Long prehensile tongue",
            "Congo rainforest endemic"
        ],
        conservation: "Endangered"
    },
    {
        id: 62,
        name: "Vampire Bat",
        emoji: "🦇",
        category: "Mammals",
        habitat: "Various",
        votes: 1234,
        intelligence: 80,
        adaptability: 85,
        cuteness: 60,
        survival: 85,
        social: 85,
        size: 90,
        usefulness: 75,
        facts: [
            "Blood-feeding specialist",
            "Heat-sensing abilities",
            "Social food sharing",
            "Anticoagulant saliva"
        ],
        conservation: "Least Concern"
    },
    {
        id: 63,
        name: "Kakapo",
        emoji: "🦜",
        category: "Birds",
        habitat: "Forest",
        votes: 2456,
        intelligence: 85,
        adaptability: 50,
        cuteness: 95,
        survival: 60,
        social: 70,
        size: 70,
        usefulness: 60,
        facts: [
            "World's only flightless parrot",
            "Nocturnal lifestyle",
            "Musty-sweet scent",
            "Critically endangered"
        ],
        conservation: "Critically Endangered"
    },
    {
        id: 64,
        name: "Pistol Shrimp",
        emoji: "🦐",
        category: "Marine Life",
        habitat: "Ocean",
        votes: 1789,
        intelligence: 70,
        adaptability: 80,
        cuteness: 70,
        survival: 85,
        social: 60,
        size: 95,
        usefulness: 70,
        facts: [
            "Sonic boom claw snap",
            "Hottest temperature on Earth",
            "Symbiotic relationships",
            "Bubble cavitation weapon"
        ],
        conservation: "Stable"
    },
    {
        id: 66,
        name: "Ibex",
        emoji: "🐐",
        category: "Mammals",
        habitat: "Mountain",
        votes: 1890,
        intelligence: 75,
        adaptability: 85,
        cuteness: 80,
        survival: 95,
        social: 75,
        size: 70,
        usefulness: 70,
        facts: [
            "Curved horn specialists",
            "Vertical cliff climbing",
            "Alpine adaptation",
            "Sure-footed navigation"
        ],
        conservation: "Least Concern"
    },
    {
        id: 67,
        name: "Fossa",
        emoji: "🐱",
        category: "Mammals",
        habitat: "Forest",
        votes: 1345,
        intelligence: 85,
        adaptability: 80,
        cuteness: 75,
        survival: 85,
        social: 50,
        size: 75,
        usefulness: 70,
        facts: [
            "Madagascar's top predator",
            "Cat-like carnivore",
            "Excellent tree climber",
            "Lemur specialist hunter"
        ],
        conservation: "Vulnerable"
    },
    {
        id: 68,
        name: "Kingfisher",
        emoji: "🐦",
        category: "Birds",
        habitat: "Freshwater",
        votes: 2567,
        intelligence: 80,
        adaptability: 80,
        cuteness: 90,
        survival: 85,
        social: 60,
        size: 85,
        usefulness: 75,
        facts: [
            "Precision diving hunter",
            "Vibrant blue plumage",
            "Tunnel-nesting behavior",
            "Fish-catching specialist"
        ],
        conservation: "Least Concern"
    },
    {
        id: 69,
        name: "Wombat",
        emoji: "🐻",
        category: "Mammals",
        habitat: "Various",
        votes: 3456,
        intelligence: 70,
        adaptability: 75,
        cuteness: 95,
        survival: 80,
        social: 50,
        size: 75,
        usefulness: 60,
        facts: [
            "Cube-shaped droppings",
            "Backward-facing pouch",
            "Powerful diggers",
            "Herbivorous marsupial"
        ],
        conservation: "Least Concern"
    },
    {
        id: 70,
        name: "Glass Frog",
        emoji: "🐸",
        category: "Amphibians",
        habitat: "Forest",
        votes: 1678,
        intelligence: 50,
        adaptability: 75,
        cuteness: 85,
        survival: 70,
        social: 50,
        size: 95,
        usefulness: 65,
        facts: [
            "Transparent underside",
            "Visible internal organs",
            "Tropical rainforest dweller",
            "Unique transparency adaptation"
        ],
        conservation: "Vulnerable"
    },
    {
        id: 71,
        name: "Caracal",
        emoji: "🐱",
        category: "Mammals",
        habitat: "Desert",
        votes: 2234,
        intelligence: 85,
        adaptability: 85,
        cuteness: 90,
        survival: 90,
        social: 50,
        size: 75,
        usefulness: 75,
        facts: [
            "Tufted ear specialist",
            "Incredible jumping ability",
            "Desert cat adaptation",
            "Bird-hunting expert"
        ],
        conservation: "Least Concern"
    },
    {
        id: 72,
        name: "Hornbill",
        emoji: "🦜",
        category: "Birds",
        habitat: "Forest",
        votes: 1789,
        intelligence: 80,
        adaptability: 75,
        cuteness: 80,
        survival: 75,
        social: 80,
        size: 65,
        usefulness: 70,
        facts: [
            "Distinctive casque helmet",
            "Fruit dispersal services",
            "Cooperative breeding",
            "Tropical forest keystone"
        ],
        conservation: "Varied by species"
    },
    {
        id: 73,
        name: "Dugong",
        emoji: "🐋",
        category: "Marine Life",
        habitat: "Ocean",
        votes: 2123,
        intelligence: 70,
        adaptability: 65,
        cuteness: 85,
        survival: 70,
        social: 70,
        size: 50,
        usefulness: 60,
        facts: [
            "Sea cow relative",
            "Seagrass meadow grazer",
            "Gentle marine mammal",
            "Mermaid legend inspiration"
        ],
        conservation: "Vulnerable"
    },
    {
        id: 75,
        name: "Cassowary",
        emoji: "🦜",
        category: "Birds",
        habitat: "Forest",
        votes: 1456,
        intelligence: 75,
        adaptability: 70,
        cuteness: 70,
        survival: 85,
        social: 50,
        size: 40,
        usefulness: 65,
        facts: [
            "World's most dangerous bird",
            "Rainforest seed disperser",
            "Powerful kicking ability",
            "Flightless giant"
        ],
        conservation: "Least Concern"
    },
    {
        id: 76,
        name: "Aardvark",
        emoji: "🐷",
        category: "Mammals",
        habitat: "Savanna",
        votes: 1567,
        intelligence: 70,
        adaptability: 80,
        cuteness: 75,
        survival: 85,
        social: 40,
        size: 70,
        usefulness: 75,
        facts: [
            "Termite and ant specialist",
            "Powerful digging claws",
            "Nocturnal lifestyle",
            "African endemic"
        ],
        conservation: "Least Concern"
    },
    {
        id: 77,
        name: "Proboscis Monkey",
        emoji: "🐒",
        category: "Mammals",
        habitat: "Forest",
        votes: 1789,
        intelligence: 80,
        adaptability: 65,
        cuteness: 80,
        survival: 70,
        social: 85,
        size: 70,
        usefulness: 60,
        facts: [
            "Distinctive large nose",
            "Excellent swimmer",
            "Mangrove specialist",
            "Borneo endemic"
        ],
        conservation: "Endangered"
    },
    {
        id: 78,
        name: "Nautilus",
        emoji: "🐚",
        category: "Marine Life",
        habitat: "Ocean",
        votes: 1234,
        intelligence: 60,
        adaptability: 70,
        cuteness: 80,
        survival: 85,
        social: 40,
        size: 80,
        usefulness: 60,
        facts: [
            "Living fossil species",
            "Chambered shell buoyancy",
            "Primitive cephalopod",
            "Ancient lineage survivor"
        ],
        conservation: "Vulnerable"
    },
    {
        id: 79,
        name: "Tapir",
        emoji: "🐷",
        category: "Mammals",
        habitat: "Forest",
        votes: 2345,
        intelligence: 70,
        adaptability: 75,
        cuteness: 85,
        survival: 75,
        social: 60,
        size: 60,
        usefulness: 65,
        facts: [
            "Trunk-like snout",
            "Excellent swimmer",
            "Forest path creator",
            "Ancient mammal lineage"
        ],
        conservation: "Vulnerable"
    },
    {
        id: 80,
        name: "Lyrebird",
        emoji: "🐦",
        category: "Birds",
        habitat: "Forest",
        votes: 2678,
        intelligence: 90,
        adaptability: 80,
        cuteness: 85,
        survival: 75,
        social: 60,
        size: 75,
        usefulness: 70,
        facts: [
            "Perfect sound mimicry",
            "Elaborate tail display",
            "Complex mating dances",
            "Australian endemic"
        ],
        conservation: "Least Concern"
    },
    {
        id: 81,
        name: "Aye-aye",
        emoji: "🐒",
        category: "Mammals",
        habitat: "Forest",
        votes: 1567,
        intelligence: 85,
        adaptability: 80,
        cuteness: 70,
        survival: 75,
        social: 40,
        size: 80,
        usefulness: 70,
        facts: [
            "Elongated middle finger for foraging",
            "Nocturnal lemur species",
            "Tap-searches for insect larvae",
            "Madagascar's woodpecker equivalent"
        ],
        conservation: "Endangered"
    },
    {
        id: 82,
        name: "Saiga Antelope",
        emoji: "🦌",
        category: "Mammals",
        habitat: "Grassland",
        votes: 1234,
        intelligence: 70,
        adaptability: 85,
        cuteness: 75,
        survival: 80,
        social: 85,
        size: 70,
        usefulness: 60,
        facts: [
            "Inflatable trunk-like nose",
            "Ice age survivor",
            "Extreme temperature adaptation",
            "Critically endangered"
        ],
        conservation: "Critically Endangered"
    },
    {
        id: 83,
        name: "Bombardier Beetle",
        emoji: "🐞",
        category: "Insects",
        habitat: "Various",
        votes: 1890,
        intelligence: 60,
        adaptability: 90,
        cuteness: 65,
        survival: 95,
        social: 30,
        size: 95,
        usefulness: 80,
        facts: [
            "Chemical defense spray",
            "Explosive reaction at 100°C",
            "Two-chambered defense system",
            "Natural chemical warfare"
        ],
        conservation: "Stable"
    },
    {
        id: 84,
        name: "Aye-aye",
        emoji: "🐒",
        category: "Mammals",
        habitat: "Forest",
        votes: 2345,
        intelligence: 90,
        adaptability: 85,
        cuteness: 80,
        survival: 85,
        social: 70,
        size: 75,
        usefulness: 75,
        facts: [
            "Tool-using intelligence",
            "Problem-solving abilities",
            "Forest acrobat",
            "Endangered primate"
        ],
        conservation: "Endangered"
    },
    {
        id: 85,
        name: "Anglerfish",
        emoji: "🐟",
        category: "Marine Life",
        habitat: "Ocean",
        votes: 1678,
        intelligence: 65,
        adaptability: 85,
        cuteness: 50,
        survival: 90,
        social: 30,
        size: 80,
        usefulness: 60,
        facts: [
            "Bioluminescent lure",
            "Deep sea predator",
            "Extreme sexual dimorphism",
            "Pressure adaptation expert"
        ],
        conservation: "Stable"
    },
    {
        id: 86,
        name: "Star-nosed Mole",
        emoji: "🐭",
        category: "Mammals",
        habitat: "Wetlands",
        votes: 2123,
        intelligence: 80,
        adaptability: 90,
        cuteness: 75,
        survival: 85,
        social: 50,
        size: 90,
        usefulness: 80,
        facts: [
            "22-tentacled star nose",
            "Fastest eating mammal",
            "Underwater swimming ability",
            "Touch sensitivity expert"
        ],
        conservation: "Least Concern"
    },
    {
        id: 87,
        name: "Jerboa",
        emoji: "🐭",
        category: "Mammals",
        habitat: "Desert",
        votes: 2567,
        intelligence: 70,
        adaptability: 95,
        cuteness: 95,
        survival: 90,
        social: 60,
        size: 90,
        usefulness: 65,
        facts: [
            "Kangaroo-like hopping",
            "No water drinking needed",
            "Oversized ears for cooling",
            "Desert jumping specialist"
        ],
        conservation: "Varied by species"
    },
    {
        id: 88,
        name: "Blobfish",
        emoji: "🐟",
        category: "Marine Life",
        habitat: "Ocean",
        votes: 3456,
        intelligence: 40,
        adaptability: 70,
        cuteness: 90,
        survival: 75,
        social: 40,
        size: 80,
        usefulness: 45,
        facts: [
            "Pressure-dependent appearance",
            "Gelatinous composition",
            "Deep sea dweller",
            "Viral internet fame"
        ],
        conservation: "Vulnerable"
    },
    {
        id: 89,
        name: "Pangolin",
        emoji: "🦔",
        category: "Mammals",
        habitat: "Forest",
        votes: 1789,
        intelligence: 65,
        adaptability: 80,
        cuteness: 85,
        survival: 85,
        social: 40,
        size: 75,
        usefulness: 80,
        facts: [
            "Tree-climbing pangolin",
            "Prehensile tail use",
            "Arboreal lifestyle",
            "Southeast Asian species"
        ],
        conservation: "Critically Endangered"
    },
    {
        id: 90,
        name: "Leafy Sea Dragon",
        emoji: "🐉",
        category: "Marine Life",
        habitat: "Ocean",
        votes: 4234,
        intelligence: 55,
        adaptability: 80,
        cuteness: 100,
        survival: 75,
        social: 40,
        size: 85,
        usefulness: 55,
        facts: [
            "Master of disguise",
            "Elaborate leaf-like appendages",
            "Male pregnancy",
            "Endemic to Australia"
        ],
        conservation: "Near Threatened"
    },
    {
        id: 91,
        name: "Gharial",
        emoji: "🐊",
        category: "Reptiles",
        habitat: "Freshwater",
        votes: 1345,
        intelligence: 70,
        adaptability: 65,
        cuteness: 65,
        survival: 85,
        social: 60,
        size: 40,
        usefulness: 70,
        facts: [
            "Fish-specialist crocodilian",
            "Narrow elongated snout",
            "Ancient lineage survivor",
            "Gharial bulbous nose"
        ],
        conservation: "Critically Endangered"
    },
    {
        id: 92,
        name: "Bongo Antelope",
        emoji: "🦌",
        category: "Mammals",
        habitat: "Forest",
        votes: 1567,
        intelligence: 75,
        adaptability: 75,
        cuteness: 90,
        survival: 80,
        social: 70,
        size: 60,
        usefulness: 65,
        facts: [
            "Spiral-horned forest antelope",
            "Reddish coat with white stripes",
            "Excellent jumper",
            "African rainforest dweller"
        ],
        conservation: "Near Threatened"
    },
    {
        id: 93,
        name: "Naked Mole Rat",
        emoji: "🐭",
        category: "Mammals",
        habitat: "Underground",
        votes: 2890,
        intelligence: 75,
        adaptability: 95,
        cuteness: 60,
        survival: 100,
        social: 100,
        size: 90,
        usefulness: 85,
        facts: [
            "Cancer immunity",
            "Eusocial mammal",
            "Queen-worker hierarchy",
            "Extreme longevity"
        ],
        conservation: "Least Concern"
    },
    {
        id: 94,
        name: "Sunfish",
        emoji: "🐟",
        category: "Marine Life",
        habitat: "Ocean",
        votes: 1678,
        intelligence: 50,
        adaptability: 70,
        cuteness: 80,
        survival: 75,
        social: 60,
        size: 20,
        usefulness: 50,
        facts: [
            "Heaviest bony fish",
            "Flattened disc shape",
            "Sunbathing behavior",
            "Massive egg production"
        ],
        conservation: "Vulnerable"
    },
    {
        id: 95,
        name: "Tarsier",
        emoji: "🐒",
        category: "Mammals",
        habitat: "Forest",
        votes: 3123,
        intelligence: 80,
        adaptability: 75,
        cuteness: 100,
        survival: 70,
        social: 75,
        size: 90,
        usefulness: 60,
        facts: [
            "Enormous eyes relative to body",
            "360-degree head rotation",
            "Ultrasonic communication",
            "Nocturnal primate"
        ],
        conservation: "Vulnerable"
    },
    {
        id: 96,
        name: "Gliding Squirrel",
        emoji: "🐿️",
        category: "Mammals",
        habitat: "Forest",
        votes: 2456,
        intelligence: 75,
        adaptability: 85,
        cuteness: 95,
        survival: 80,
        social: 70,
        size: 85,
        usefulness: 65,
        facts: [
            "Gliding membrane flight",
            "Nocturnal forest dweller",
            "Excellent spatial navigation",
            "Fluffy parachute-like tail"
        ],
        conservation: "Least Concern"
    },
    {
        id: 97,
        name: "Geoduck Clam",
        emoji: "🐚",
        category: "Marine Life",
        habitat: "Ocean",
        votes: 1234,
        intelligence: 30,
        adaptability: 70,
        cuteness: 50,
        survival: 90,
        social: 40,
        size: 70,
        usefulness: 60,
        facts: [
            "Longest-living animal",
            "Giant burrowing clam",
            "Extendable siphon",
            "Over 160-year lifespan"
        ],
        conservation: "Stable"
    },
    {
        id: 98,
        name: "Slow Loris",
        emoji: "🐒",
        category: "Mammals",
        habitat: "Forest",
        votes: 2789,
        intelligence: 70,
        adaptability: 75,
        cuteness: 100,
        survival: 70,
        social: 60,
        size: 85,
        usefulness: 55,
        facts: [
            "Venomous primate",
            "Slow deliberate movements",
            "Toxic bite defense",
            "Large round eyes"
        ],
        conservation: "Vulnerable"
    },
    {
        id: 99,
        name: "Goblin Shark",
        emoji: "🦈",
        category: "Marine Life",
        habitat: "Ocean",
        votes: 1567,
        intelligence: 70,
        adaptability: 80,
        cuteness: 40,
        survival: 90,
        social: 30,
        size: 50,
        usefulness: 65,
        facts: [
            "Living fossil species",
            "Extendable jaw mechanism",
            "Deep sea predator",
            "125 million years unchanged"
        ],
        conservation: "Least Concern"
    },
    {
        id: 100,
        name: "Hoatzin",
        emoji: "🐦",
        category: "Birds",
        habitat: "Wetlands",
        votes: 1890,
        intelligence: 70,
        adaptability: 70,
        cuteness: 75,
        survival: 75,
        social: 80,
        size: 75,
        usefulness: 60,
        facts: [
            "Baby birds have wing claws",
            "Leaf-fermenting stomach",
            "Prehistoric characteristics",
            "Unique digestive system"
        ],
        conservation: "Least Concern"
    },
    {
        id: 101,
        name: "Japanese Spider Crab",
        emoji: "🦀",
        category: "Marine Life",
        habitat: "Ocean",
        votes: 1345,
        intelligence: 60,
        adaptability: 75,
        cuteness: 60,
        survival: 85,
        social: 40,
        size: 30,
        usefulness: 65,
        facts: [
            "Largest arthropod",
            "12-foot leg span",
            "Deep water dweller",
            "Long-lived species"
        ],
        conservation: "Stable"
    },
    {
        id: 102,
        name: "Proboscis Monkey",
        emoji: "🐒",
        category: "Mammals",
        habitat: "Mangrove",
        votes: 2123,
        intelligence: 80,
        adaptability: 70,
        cuteness: 85,
        survival: 75,
        social: 85,
        size: 70,
        usefulness: 60,
        facts: [
            "Enormous pendulous nose",
            "Excellent swimmer",
            "Pot-bellied appearance",
            "Mangrove forest specialist"
        ],
        conservation: "Endangered"
    },
    {
        id: 103,
        name: "Aye-aye",
        emoji: "🐒",
        category: "Mammals",
        habitat: "Forest",
        votes: 2567,
        intelligence: 85,
        adaptability: 80,
        cuteness: 75,
        survival: 75,
        social: 40,
        size: 80,
        usefulness: 70,
        facts: [
            "Skeletal middle finger",
            "Woodpecker-like foraging",
            "Nocturnal Madagascar lemur",
            "Superstition-surrounded species"
        ],
        conservation: "Endangered"
    },
    {
        id: 104,
        name: "Mata Mata Turtle",
        emoji: "🐢",
        category: "Reptiles",
        habitat: "Freshwater",
        votes: 1678,
        intelligence: 65,
        adaptability: 80,
        cuteness: 70,
        survival: 85,
        social: 40,
        size: 75,
        usefulness: 65,
        facts: [
            "Leaf-like camouflage",
            "Suction feeding method",
            "Triangular head design",
            "South American rivers"
        ],
        conservation: "Least Concern"
    },
    {
        id: 105,
        name: "Pink Fairy Armadillo",
        emoji: "🦔",
        category: "Mammals",
        habitat: "Desert",
        votes: 3456,
        intelligence: 60,
        adaptability: 85,
        cuteness: 100,
        survival: 80,
        social: 40,
        size: 95,
        usefulness: 60,
        facts: [
            "Smallest armadillo species",
            "Pink shell coloration",
            "Sand-swimming ability",
            "Argentina desert endemic"
        ],
        conservation: "Data Deficient"
    },
    {
        id: 106,
        name: "Blobfish",
        emoji: "🐟",
        category: "Marine Life",
        habitat: "Ocean",
        votes: 2890,
        intelligence: 40,
        adaptability: 65,
        cuteness: 85,
        survival: 70,
        social: 40,
        size: 80,
        usefulness: 45,
        facts: [
            "Pressure-dependent form",
            "Gelatinous tissue structure",
            "World's ugliest animal",
            "Deep sea inhabitant"
        ],
        conservation: "Vulnerable"
    },
    {
        id: 107,
        name: "Shoebill Stork",
        emoji: "🦅",
        category: "Birds",
        habitat: "Wetlands",
        votes: 1789,
        intelligence: 85,
        adaptability: 75,
        cuteness: 80,
        survival: 80,
        social: 50,
        size: 50,
        usefulness: 70,
        facts: [
            "Machine-gun bill clattering",
            "Statue-like hunting patience",
            "Prehistoric appearance",
            "African swamp specialist"
        ],
        conservation: "Vulnerable"
    },
    {
        id: 108,
        name: "Axolotl",
        emoji: "🦎",
        category: "Amphibians",
        habitat: "Freshwater",
        votes: 4123,
        intelligence: 60,
        adaptability: 80,
        cuteness: 100,
        survival: 65,
        social: 50,
        size: 90,
        usefulness: 90,
        facts: [
            "Complete limb regeneration",
            "Neoteny preservation",
            "Scientific research value",
            "Mexico Lake endemic"
        ],
        conservation: "Critically Endangered"
    },
    {
        id: 109,
        name: "Fossa",
        emoji: "🐱",
        category: "Mammals",
        habitat: "Forest",
        votes: 1456,
        intelligence: 85,
        adaptability: 80,
        cuteness: 80,
        survival: 85,
        social: 50,
        size: 75,
        usefulness: 75,
        facts: [
            "Madagascar apex predator",
            "Cat-mongoose hybrid appearance",
            "Excellent tree climber",
            "Lemur specialist hunter"
        ],
        conservation: "Vulnerable"
    },
    {
        id: 110,
        name: "Leafy Sea Dragon",
        emoji: "🐉",
        category: "Marine Life",
        habitat: "Ocean",
        votes: 3789,
        intelligence: 55,
        adaptability: 80,
        cuteness: 100,
        survival: 75,
        social: 40,
        size: 85,
        usefulness: 55,
        facts: [
            "Perfect seaweed mimicry",
            "Elaborate camouflage appendages",
            "Male brooding behavior",
            "Australian waters endemic"
        ],
        conservation: "Near Threatened"
    },
    {
        id: 111,
        name: "Vaquita",
        emoji: "🐬",
        category: "Marine Life",
        habitat: "Ocean",
        votes: 2456,
        intelligence: 85,
        adaptability: 60,
        cuteness: 95,
        survival: 50,
        social: 80,
        size: 85,
        usefulness: 70,
        facts: [
            "World's rarest marine mammal",
            "Only 10-30 individuals left",
            "Gulf of California endemic",
            "Smallest porpoise species"
        ],
        conservation: "Critically Endangered"
    },
    {
        id: 112,
        name: "Thorny Dragon",
        emoji: "🦎",
        category: "Reptiles",
        habitat: "Desert",
        votes: 1789,
        intelligence: 65,
        adaptability: 95,
        cuteness: 80,
        survival: 95,
        social: 30,
        size: 90,
        usefulness: 70,
        facts: [
            "Water collection through skin",
            "Thorny armor protection",
            "False head decoy",
            "Australian desert specialist"
        ],
        conservation: "Least Concern"
    },
    {
        id: 113,
        name: "Bactrian Camel",
        emoji: "🐪",
        category: "Mammals",
        habitat: "Desert",
        votes: 2123,
        intelligence: 80,
        adaptability: 95,
        cuteness: 85,
        survival: 95,
        social: 80,
        size: 50,
        usefulness: 90,
        facts: [
            "Two-humped desert survival",
            "Extreme temperature tolerance",
            "Water conservation expert",
            "Gobi Desert adaptation"
        ],
        conservation: "Critically Endangered"
    },
    {
        id: 114,
        name: "Wolverine",
        emoji: "🦡",
        category: "Mammals",
        habitat: "Arctic",
        votes: 2890,
        intelligence: 85,
        adaptability: 90,
        cuteness: 75,
        survival: 100,
        social: 40,
        size: 75,
        usefulness: 80,
        facts: [
            "Incredibly strong for size",
            "Takes down prey 10x its weight",
            "Scavenger and hunter",
            "Extreme cold adaptation"
        ],
        conservation: "Least Concern"
    },
    {
        id: 115,
        name: "Leafcutter Ant Queen",
        emoji: "👑",
        category: "Insects",
        habitat: "Forest",
        votes: 1567,
        intelligence: 85,
        adaptability: 90,
        cuteness: 60,
        survival: 85,
        social: 100,
        size: 80,
        usefulness: 95,
        facts: [
            "15-20 year lifespan",
            "Fungus agriculture founder",
            "Million-member colonies",
            "Ecosystem engineering queen"
        ],
        conservation: "Stable"
    },
    {
        id: 116,
        name: "Pangolin (Indian)",
        emoji: "🦔",
        category: "Mammals",
        habitat: "Various",
        votes: 1890,
        intelligence: 65,
        adaptability: 80,
        cuteness: 85,
        survival: 85,
        social: 40,
        size: 75,
        usefulness: 80,
        facts: [
            "Overlapping scale armor",
            "Termite specialist diet",
            "Powerful digging claws",
            "Indian subcontinent native"
        ],
        conservation: "Endangered"
    },
    {
        id: 117,
        name: "Frilled Lizard",
        emoji: "🦎",
        category: "Reptiles",
        habitat: "Forest",
        votes: 2345,
        intelligence: 70,
        adaptability: 85,
        cuteness: 85,
        survival: 85,
        social: 40,
        size: 80,
        usefulness: 65,
        facts: [
            "Intimidating neck frill display",
            "Bipedal running ability",
            "Arboreal lifestyle",
            "Australian native"
        ],
        conservation: "Least Concern"
    },
    {
        id: 118,
        name: "Goblin Shark",
        emoji: "🦈",
        category: "Marine Life",
        habitat: "Ocean",
        votes: 1456,
        intelligence: 70,
        adaptability: 80,
        cuteness: 45,
        survival: 90,
        social: 30,
        size: 50,
        usefulness: 65,
        facts: [
            "Extendable jaw mechanism",
            "Living fossil species",
            "Deep sea hunter",
            "Prehistoric appearance"
        ],
        conservation: "Least Concern"
    },
    {
        id: 119,
        name: "Kakapo (Night Parrot)",
        emoji: "🦜",
        category: "Birds",
        habitat: "Forest",
        votes: 3456,
        intelligence: 90,
        adaptability: 50,
        cuteness: 100,
        survival: 60,
        social: 70,
        size: 70,
        usefulness: 65,
        facts: [
            "World's only flightless parrot",
            "Nocturnal ground dweller",
            "Heaviest parrot species",
            "New Zealand endemic"
        ],
        conservation: "Critically Endangered"
    },
    {
        id: 120,
        name: "Vampire Squid",
        emoji: "🦑",
        category: "Marine Life",
        habitat: "Ocean",
        votes: 1678,
        intelligence: 80,
        adaptability: 85,
        cuteness: 65,
        survival: 90,
        social: 40,
        size: 85,
        usefulness: 70,
        facts: [
            "Inside-out defense mechanism",
            "Oxygen minimum zone dweller",
            "Bioluminescent displays",
            "Neither squid nor octopus"
        ],
        conservation: "Stable"
    },
    {
        id: 121,
        name: "Sand Cat",
        emoji: "🐱",
        category: "Mammals",
        habitat: "Desert",
        votes: 3789,
        intelligence: 80,
        adaptability: 95,
        cuteness: 100,
        survival: 90,
        social: 50,
        size: 90,
        usefulness: 70,
        facts: [
            "Desert survival specialist",
            "Fur-padded paws",
            "No water drinking needed",
            "Extreme temperature tolerance"
        ],
        conservation: "Least Concern"
    },
    {
        id: 122,
        name: "Japanese Macaque",
        emoji: "🐒",
        category: "Mammals",
        habitat: "Mountain",
        votes: 2567,
        intelligence: 90,
        adaptability: 85,
        cuteness: 90,
        survival: 85,
        social: 95,
        size: 70,
        usefulness: 75,
        facts: [
            "Hot spring bathing culture",
            "Snow monkey nickname",
            "Tool use and learning",
            "Northernmost primate"
        ],
        conservation: "Least Concern"
    },
    {
        id: 123,
        name: "Electric Eel",
        emoji: "⚡",
        category: "Marine Life",
        habitat: "Freshwater",
        votes: 2234,
        intelligence: 70,
        adaptability: 85,
        cuteness: 60,
        survival: 90,
        social: 40,
        size: 60,
        usefulness: 85,
        facts: [
            "600-volt electric discharge",
            "Natural bioelectricity",
            "Electronavigation ability",
            "Amazon river predator"
        ],
        conservation: "Least Concern"
    },
    {
        id: 124,
        name: "Binturong (Bearcat)",
        emoji: "🐻",
        category: "Mammals",
        habitat: "Forest",
        votes: 1789,
        intelligence: 75,
        adaptability: 75,
        cuteness: 90,
        survival: 75,
        social: 60,
        size: 75,
        usefulness: 60,
        facts: [
            "Popcorn-scented musk",
            "Prehensile tail use",
            "Arboreal omnivore",
            "Southeast Asian endemic"
        ],
        conservation: "Vulnerable"
    },
    {
        id: 125,
        name: "Mantis Shrimp (Peacock)",
        emoji: "🦐",
        category: "Marine Life",
        habitat: "Ocean",
        votes: 2123,
        intelligence: 80,
        adaptability: 85,
        cuteness: 80,
        survival: 95,
        social: 40,
        size: 85,
        usefulness: 70,
        facts: [
            "Most complex eyes on Earth",
            "Fastest punch in nature",
            "16 color receptors",
            "Cavitation bubble creation"
        ],
        conservation: "Stable"
    },
    {
        id: 126,
        name: "Quoll",
        emoji: "🐱",
        category: "Mammals",
        habitat: "Forest",
        votes: 1456,
        intelligence: 80,
        adaptability: 75,
        cuteness: 90,
        survival: 75,
        social: 60,
        size: 80,
        usefulness: 70,
        facts: [
            "Spotted carnivorous marsupial",
            "Excellent climber",
            "Nocturnal hunter",
            "Australian native"
        ],
        conservation: "Endangered"
    },
    {
        id: 127,
        name: "Cassowary",
        emoji: "🦆",
        category: "Birds",
        habitat: "Forest",
        votes: 1567,
        intelligence: 75,
        adaptability: 70,
        cuteness: 70,
        survival: 90,
        social: 50,
        size: 40,
        usefulness: 70,
        facts: [
            "World's most dangerous bird",
            "Helmet-like casque",
            "Powerful kicking ability",
            "Rainforest seed disperser"
        ],
        conservation: "Least Concern"
    },
    {
        id: 128,
        name: "Horseshoe Crab",
        emoji: "🦀",
        category: "Marine Life",
        habitat: "Ocean",
        votes: 2890,
        intelligence: 50,
        adaptability: 85,
        cuteness: 65,
        survival: 100,
        social: 70,
        size: 75,
        usefulness: 95,
        facts: [
            "450 million year lineage",
            "Blue copper-based blood",
            "Medical research importance",
            "Living fossil species"
        ],
        conservation: "Vulnerable"
    },
    {
        id: 129,
        name: "Pangolin (Giant)",
        emoji: "🦔",
        category: "Mammals",
        habitat: "Forest",
        votes: 1890,
        intelligence: 65,
        adaptability: 75,
        cuteness: 85,
        survival: 85,
        social: 40,
        size: 60,
        usefulness: 80,
        facts: [
            "Largest pangolin species",
            "Ground-dwelling specialist",
            "Powerful digging ability",
            "African rainforest native"
        ],
        conservation: "Endangered"
    },
    {
        id: 130,
        name: "Spiny Anteater (Echidna)",
        emoji: "🦔",
        category: "Mammals",
        habitat: "Various",
        votes: 2345,
        intelligence: 75,
        adaptability: 85,
        cuteness: 90,
        survival: 85,
        social: 40,
        size: 80,
        usefulness: 75,
        facts: [
            "Egg-laying mammal",
            "Electroreception ability",
            "Spiny protection",
            "Ancient monotreme"
        ],
        conservation: "Least Concern"
    },
    {
        id: 131,
        name: "Gharial Crocodile",
        emoji: "🐊",
        category: "Reptiles",
        habitat: "Freshwater",
        votes: 1234,
        intelligence: 70,
        adaptability: 65,
        cuteness: 65,
        survival: 85,
        social: 60,
        size: 40,
        usefulness: 75,
        facts: [
            "Fish-specialist snout",
            "Male nose bulb (ghara)",
            "Ancient crocodilian",
            "River system dweller"
        ],
        conservation: "Critically Endangered"
    },
    {
        id: 132,
        name: "Tree Kangaroo",
        emoji: "🦘",
        category: "Mammals",
        habitat: "Forest",
        votes: 2678,
        intelligence: 70,
        adaptability: 75,
        cuteness: 95,
        survival: 75,
        social: 70,
        size: 70,
        usefulness: 60,
        facts: [
            "Arboreal kangaroo species",
            "Excellent tree climber",
            "Rainforest canopy dweller",
            "Papua New Guinea native"
        ],
        conservation: "Endangered"
    },
    {
        id: 133,
        name: "Leafy Sea Dragon",
        emoji: "🐉",
        category: "Marine Life",
        habitat: "Ocean",
        votes: 3456,
        intelligence: 55,
        adaptability: 80,
        cuteness: 100,
        survival: 75,
        social: 40,
        size: 85,
        usefulness: 60,
        facts: [
            "Perfect kelp camouflage",
            "Male egg incubation",
            "Seahorse relative",
            "South Australian waters"
        ],
        conservation: "Near Threatened"
    },
    {
        id: 134,
        name: "Pangolin (Chinese)",
        emoji: "🦔",
        category: "Mammals",
        habitat: "Forest",
        votes: 1678,
        intelligence: 65,
        adaptability: 75,
        cuteness: 85,
        survival: 80,
        social: 40,
        size: 80,
        usefulness: 80,
        facts: [
            "Traditional medicine target",
            "Ant and termite diet",
            "Scale armor protection",
            "Asian forest dweller"
        ],
        conservation: "Critically Endangered"
    },
    {
        id: 135,
        name: "Blobfish (Deep Sea)",
        emoji: "🐟",
        category: "Marine Life",
        habitat: "Ocean",
        votes: 2567,
        intelligence: 40,
        adaptability: 70,
        cuteness: 85,
        survival: 80,
        social: 40,
        size: 80,
        usefulness: 50,
        facts: [
            "Pressure adaptation specialist",
            "Gelatinous body composition",
            "Deep ocean dweller",
            "Tasmania/Australia waters"
        ],
        conservation: "Vulnerable"
    },
    {
        id: 136,
        name: "Slow Loris",
        emoji: "🐒",
        category: "Mammals",
        habitat: "Forest",
        votes: 3123,
        intelligence: 70,
        adaptability: 75,
        cuteness: 100,
        survival: 70,
        social: 60,
        size: 85,
        usefulness: 55,
        facts: [
            "Only venomous primate",
            "Toxic elbow secretions",
            "Slow deliberate movement",
            "Large nocturnal eyes"
        ],
        conservation: "Endangered"
    },
    {
        id: 137,
        name: "Secretary Bird",
        emoji: "🦅",
        category: "Birds",
        habitat: "Savanna",
        votes: 1789,
        intelligence: 85,
        adaptability: 80,
        cuteness: 80,
        survival: 85,
        social: 60,
        size: 65,
        usefulness: 90,
        facts: [
            "Snake-stomping specialist",
            "Terrestrial raptor",
            "Distinctive head crest",
            "African grassland hunter"
        ],
        conservation: "Endangered"
    },
    {
        id: 138,
        name: "Pangolin (Tree)",
        emoji: "🦔",
        category: "Mammals",
        habitat: "Forest",
        votes: 1456,
        intelligence: 65,
        adaptability: 80,
        cuteness: 85,
        survival: 85,
        social: 40,
        size: 85,
        usefulness: 80,
        facts: [
            "Arboreal pangolin species",
            "Prehensile tail adaptation",
            "Canopy dwelling lifestyle",
            "West African forests"
        ],
        conservation: "Endangered"
    },
    {
        id: 139,
        name: "Frilled Shark",
        emoji: "🦈",
        category: "Marine Life",
        habitat: "Ocean",
        votes: 1567,
        intelligence: 70,
        adaptability: 80,
        cuteness: 50,
        survival: 90,
        social: 30,
        size: 75,
        usefulness: 65,
        facts: [
            "Primitive shark species",
            "Eel-like body shape",
            "Ancient gill slits",
            "Deep sea dweller"
        ],
        conservation: "Near Threatened"
    },
    {
        id: 140,
        name: "Pink River Dolphin",
        emoji: "🐬",
        category: "Marine Life",
        habitat: "Freshwater",
        votes: 3890,
        intelligence: 95,
        adaptability: 80,
        cuteness: 100,
        survival: 75,
        social: 85,
        size: 65,
        usefulness: 80,
        facts: [
            "Amazon river endemic",
            "Pink coloration",
            "Echolocation abilities",
            "Freshwater dolphin"
        ],
        conservation: "Endangered"
    }
];

/**
 * Database utility functions
 */
const AnimalDatabase = {
    // Get all animals
    getAll: () => animalDatabase,
    
    // Get animal by ID
    getById: (id) => animalDatabase.find(animal => animal.id === id),
    
    // Get animals by category
    getByCategory: (category) => animalDatabase.filter(animal => animal.category === category),
    
    // Get animals by habitat
    getByHabitat: (habitat) => animalDatabase.filter(animal => animal.habitat === habitat),
    
    // Get animals by conservation status
    getByConservation: (status) => animalDatabase.filter(animal => animal.conservation === status),
    
    // Search animals by name or facts
    search: (query) => {
        const searchTerm = query.toLowerCase();
        return animalDatabase.filter(animal => 
            animal.name.toLowerCase().includes(searchTerm) ||
            animal.category.toLowerCase().includes(searchTerm) ||
            animal.habitat.toLowerCase().includes(searchTerm) ||
            animal.facts.some(fact => fact.toLowerCase().includes(searchTerm))
        );
    },
    
    // Sort animals by specific criteria
    sortBy: (criteria, ascending = false) => {
        const sorted = [...animalDatabase].sort((a, b) => {
            if (criteria === 'name') {
                return ascending ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
            }
            return ascending ? a[criteria] - b[criteria] : b[criteria] - a[criteria];
        });
        return sorted;
    },
    
    // Get top N animals by specific criteria
    getTopBy: (criteria, count = 10) => {
        return AnimalDatabase.sortBy(criteria).slice(0, count);
    },
    
    // Get animals with minimum score in specific criteria
    getMinimumScore: (criteria, minScore) => {
        return animalDatabase.filter(animal => animal[criteria] >= minScore);
    },
    
    // Calculate overall Mars readiness score
    getMarsReadinessScore: (animal) => {
        return Math.round((animal.intelligence + animal.adaptability + animal.survival + animal.usefulness) / 4);
    },
    
    // Get animals ranked by Mars readiness
    getMarsCandidates: () => {
        return animalDatabase
            .map(animal => ({
                ...animal,
                marsScore: AnimalDatabase.getMarsReadinessScore(animal)
            }))
            .sort((a, b) => b.marsScore - a.marsScore);
    },
    
    // Get statistics about the database
    getStats: () => {
        const total = animalDatabase.length;
        const totalVotes = animalDatabase.reduce((sum, animal) => sum + animal.votes, 0);
        const categories = [...new Set(animalDatabase.map(animal => animal.category))];
        const habitats = [...new Set(animalDatabase.map(animal => animal.habitat))];
        const avgIntelligence = Math.round(animalDatabase.reduce((sum, animal) => sum + animal.intelligence, 0) / total);
        const avgAdaptability = Math.round(animalDatabase.reduce((sum, animal) => sum + animal.adaptability, 0) / total);
        
        return {
            totalAnimals: total,
            totalVotes,
            categories: categories.length,
            habitats: habitats.length,
            avgIntelligence,
            avgAdaptability,
            categoryList: categories,
            habitatList: habitats
        };
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { animalDatabase, AnimalDatabase };
}

// For browser environments
if (typeof window !== 'undefined') {
    window.animalDatabase = animalDatabase;
    window.AnimalDatabase = AnimalDatabase;
}
