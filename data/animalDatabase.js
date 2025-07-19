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
