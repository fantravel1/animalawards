/**
 * MARS ARK EXPLORER - Mini-Games Module
 * Interactive educational games
 */

// ============================================================================
// ANIMAL TRIVIA (Enhanced)
// ============================================================================

const TRIVIA_QUESTIONS = [
    {
        question: 'Which animal is known as the largest land animal?',
        options: ['African Elephant', 'Blue Whale', 'Giraffe', 'Hippopotamus'],
        correct: 0,
        explanation: 'African Elephants are the largest land animals, weighing up to 6,000 kg!'
    },
    {
        question: 'What is the primary role of bees in ecosystems?',
        options: ['Predation', 'Pollination', 'Decomposition', 'Water filtration'],
        correct: 1,
        explanation: 'Bees are crucial pollinators, helping plants reproduce and maintaining biodiversity.'
    },
    {
        question: 'Which animal has the highest intelligence among invertebrates?',
        options: ['Butterfly', 'Octopus', 'Ant', 'Spider'],
        correct: 1,
        explanation: 'Octopuses are incredibly intelligent, capable of problem-solving and using tools!'
    },
    {
        question: 'What adaptation helps Arctic foxes survive extreme cold?',
        options: ['Thick fur and seasonal coat changes', 'Hibernation', 'Migration', 'Cold-blooded metabolism'],
        correct: 0,
        explanation: 'Arctic foxes have incredibly thick fur and change coat colors with seasons for survival and camouflage.'
    },
    {
        question: 'Which habitat has the greatest biodiversity?',
        options: ['Desert', 'Tropical Rainforest', 'Arctic Tundra', 'Grassland'],
        correct: 1,
        explanation: 'Tropical rainforests contain over half of Earth\'s plant and animal species!'
    },
    {
        question: 'What makes dolphins particularly intelligent?',
        options: ['Large brain-to-body ratio', 'Complex communication', 'Problem-solving abilities', 'All of the above'],
        correct: 3,
        explanation: 'Dolphins possess all these traits, making them one of Earth\'s most intelligent species!'
    },
    {
        question: 'Why are wolves important to ecosystems?',
        options: ['They\'re cute', 'They control prey populations', 'They produce oxygen', 'They pollinate flowers'],
        correct: 1,
        explanation: 'Wolves are apex predators that help maintain healthy ecosystems by controlling prey populations.'
    },
    {
        question: 'What is the conservation status of many bee species?',
        options: ['Thriving', 'Declining', 'Extinct', 'Unknown'],
        correct: 1,
        explanation: 'Many bee species are declining due to habitat loss, pesticides, and climate change.'
    },
    {
        question: 'How long can a crocodile hold its breath underwater?',
        options: ['5 minutes', '1 hour', '2 hours', '4 hours'],
        correct: 2,
        explanation: 'Crocodiles can hold their breath for up to 2 hours while waiting for prey!'
    },
    {
        question: 'Which bird can fly backwards?',
        options: ['Eagle', 'Hummingbird', 'Parrot', 'Owl'],
        correct: 1,
        explanation: 'Hummingbirds are the only birds that can fly backwards due to their unique wing structure!'
    },
    {
        question: 'What percentage of Earth\'s oxygen comes from ocean phytoplankton?',
        options: ['10%', '30%', '50%', '70%'],
        correct: 3,
        explanation: 'Ocean phytoplankton produce about 70% of Earth\'s oxygen—more than all forests combined!'
    },
    {
        question: 'Which animal has the longest migration route?',
        options: ['Monarch Butterfly', 'Arctic Tern', 'Grey Whale', 'Caribou'],
        correct: 1,
        explanation: 'Arctic Terns migrate from Arctic to Antarctic and back—over 70,000 km annually!'
    }
];

let currentTrivia = null;

function startTrivia() {
    currentTrivia = TRIVIA_QUESTIONS[Math.floor(Math.random() * TRIVIA_QUESTIONS.length)];

    document.getElementById('gameModalContent').innerHTML = `
        <h2 style="text-align: center; margin-bottom: 30px;">🧠 Animal Trivia</h2>
        <div class="quiz-question">${currentTrivia.question}</div>
        <div class="quiz-options">
            ${currentTrivia.options.map((option, index) => `
                <button class="quiz-option" onclick="answerTrivia(${index})">${option}</button>
            `).join('')}
        </div>
        <div style="text-align: center; margin-top: 20px; opacity: 0.7;">
            Score: ${gameState.stats.triviaCorrect} / ${gameState.stats.triviaTotal}
        </div>
    `;

    document.getElementById('gameModal').style.display = 'block';

    gameState.stats.gamesPlayed++;
    updateMissionProgress('minigame', { game: 'trivia' });
}

function answerTrivia(selectedIndex) {
    const correct = selectedIndex === currentTrivia.correct;

    gameState.stats.triviaTotal++;
    if (correct) {
        gameState.stats.triviaCorrect++;
        addXP(15);
        gameState.resources.credits += 10;
        sounds.play('success');
    } else {
        sounds.play('error');
    }

    document.getElementById('gameModalContent').innerHTML = `
        <h2 style="text-align: center; margin-bottom: 30px;">
            ${correct ? '✅ Correct!' : '❌ Incorrect'}
        </h2>
        <div class="quiz-question">${currentTrivia.question}</div>
        <div style="background: rgba(78, 205, 196, 0.2); padding: 20px; border-radius: 10px; margin: 20px 0;">
            <strong>Correct Answer:</strong> ${currentTrivia.options[currentTrivia.correct]}<br><br>
            ${currentTrivia.explanation}
        </div>
        ${correct ? `
            <div style="text-align: center; color: #4ECDC4; font-size: 1.2rem; margin: 20px 0;">
                +15 XP • +10 Credits
            </div>
        ` : ''}
        <div style="text-align: center; margin-top: 25px;">
            <button class="btn-primary" onclick="startTrivia()">Next Question</button>
            <button class="btn-secondary" onclick="closeModal('gameModal')" style="margin-left: 10px;">Exit</button>
        </div>
    `;

    checkAchievements();
    updateStats();
    saveGame();
}

// ============================================================================
// HABITAT MATCH GAME
// ============================================================================

const HABITAT_PAIRS = [
    { animal: '🐘', habitat: '🌳 Savanna', name: 'Elephant' },
    { animal: '🐧', habitat: '❄️ Antarctic', name: 'Penguin' },
    { animal: '🐪', habitat: '🏜️ Desert', name: 'Camel' },
    { animal: '🐋', habitat: '🌊 Ocean', name: 'Whale' },
    { animal: '🦁', habitat: '🌳 Savanna', name: 'Lion' },
    { animal: '🐻‍❄️', habitat: '❄️ Arctic', name: 'Polar Bear' },
    { animal: '🦜', habitat: '🌴 Rainforest', name: 'Parrot' },
    { animal: '🦒', habitat: '🌳 Savanna', name: 'Giraffe' },
    { animal: '🐬', habitat: '🌊 Ocean', name: 'Dolphin' },
    { animal: '🦎', habitat: '🏜️ Desert', name: 'Lizard' }
];

let habitatGameState = {
    currentRound: 0,
    score: 0,
    pairs: [],
    selected: null
};

function startHabitatMatch() {
    habitatGameState = {
        currentRound: 0,
        score: 0,
        pairs: [...HABITAT_PAIRS].sort(() => Math.random() - 0.5).slice(0, 5),
        selected: null
    };

    renderHabitatMatch();
    document.getElementById('gameModal').style.display = 'block';
    gameState.stats.gamesPlayed++;
}

function renderHabitatMatch() {
    const round = habitatGameState.pairs[habitatGameState.currentRound];

    if (!round) {
        // Game complete!
        const won = habitatGameState.score >= 4;
        if (won) {
            gameState.stats.habitatMatchWins++;
            addXP(100);
            gameState.resources.credits += 40;
            sounds.play('success');
            updateMissionProgress('minigame', { game: 'habitat' });
        }

        document.getElementById('gameModalContent').innerHTML = `
            <h2 style="text-align: center; margin-bottom: 30px;">
                ${won ? '🎉 Victory!' : '😊 Good Try!'}
            </h2>
            <div style="text-align: center; font-size: 1.5rem; margin: 30px 0;">
                Score: ${habitatGameState.score} / ${habitatGameState.pairs.length}
            </div>
            <div style="text-align: center; font-size: 1.1rem; margin-bottom: 30px;">
                ${won ? 'Amazing! You matched habitats perfectly!' : 'Keep learning about animal habitats!'}
            </div>
            ${won ? `
                <div style="text-align: center; color: #4ECDC4; font-size: 1.2rem; margin: 20px 0;">
                    +100 XP • +40 Credits
                </div>
            ` : ''}
            <div style="text-align: center; margin-top: 25px;">
                <button class="btn-primary" onclick="startHabitatMatch()">Play Again</button>
                <button class="btn-secondary" onclick="closeModal('gameModal')" style="margin-left: 10px;">Exit</button>
            </div>
        `;
        checkAchievements();
        saveGame();
        return;
    }

    // Randomize habitat options
    const habitats = ['🌳 Savanna', '❄️ Antarctic', '❄️ Arctic', '🏜️ Desert', '🌊 Ocean', '🌴 Rainforest'];
    const correctHabitat = round.habitat;
    const options = [correctHabitat];

    while (options.length < 4) {
        const random = habitats[Math.floor(Math.random() * habitats.length)];
        if (!options.includes(random)) {
            options.push(random);
        }
    }
    options.sort(() => Math.random() - 0.5);

    document.getElementById('gameModalContent').innerHTML = `
        <h2 style="text-align: center; margin-bottom: 20px;">🌍 Habitat Match</h2>
        <div style="text-align: center; margin-bottom: 20px;">
            Round ${habitatGameState.currentRound + 1} / ${habitatGameState.pairs.length} | Score: ${habitatGameState.score}
        </div>

        <div style="text-align: center; margin: 40px 0;">
            <div style="font-size: 6rem; margin-bottom: 20px;">${round.animal}</div>
            <h3 style="margin-bottom: 30px;">Where does the ${round.name} live?</h3>
        </div>

        <div class="quiz-options">
            ${options.map(habitat => `
                <button class="quiz-option" onclick="selectHabitat('${habitat}', '${correctHabitat}')">${habitat}</button>
            `).join('')}
        </div>
    `;
}

function selectHabitat(selected, correct) {
    const isCorrect = selected === correct;
    if (isCorrect) {
        habitatGameState.score++;
        sounds.play('success');
    } else {
        sounds.play('error');
    }

    habitatGameState.currentRound++;

    setTimeout(() => {
        renderHabitatMatch();
    }, 500);
}

// ============================================================================
// ECOSYSTEM BUILDER GAME
// ============================================================================

const ECOSYSTEM_ROLES = {
    producers: { name: 'Producers', emoji: '🌱', animals: ['Algae', 'Grass', 'Trees', 'Phytoplankton'] },
    herbivores: { name: 'Herbivores', emoji: '🦌', animals: ['Deer', 'Rabbit', 'Elephant', 'Zebra'] },
    carnivores: { name: 'Carnivores', emoji: '🦁', animals: ['Lion', 'Wolf', 'Eagle', 'Shark'] },
    decomposers: { name: 'Decomposers', emoji: '🍄', animals: ['Mushrooms', 'Bacteria', 'Earthworms', 'Beetles'] },
    pollinators: { name: 'Pollinators', emoji: '🐝', animals: ['Bees', 'Butterflies', 'Hummingbirds', 'Bats'] }
};

let ecosystemGameState = {
    selected: {
        producers: 0,
        herbivores: 0,
        carnivores: 0,
        decomposers: 0,
        pollinators: 0
    },
    budget: 100
};

function startEcosystemBuilder() {
    ecosystemGameState = {
        selected: {
            producers: 0,
            herbivores: 0,
            carnivores: 0,
            decomposers: 0,
            pollinators: 0
        },
        budget: 100
    };

    renderEcosystemBuilder();
    document.getElementById('gameModal').style.display = 'block';
    gameState.stats.gamesPlayed++;
}

function renderEcosystemBuilder() {
    const used = Object.values(ecosystemGameState.selected).reduce((a, b) => a + b, 0);
    const remaining = ecosystemGameState.budget - used;

    document.getElementById('gameModalContent').innerHTML = `
        <h2 style="text-align: center; margin-bottom: 20px;">🌳 Ecosystem Builder</h2>
        <p style="text-align: center; margin-bottom: 20px; opacity: 0.9;">
            Build a balanced ecosystem! Each role costs 1 point.
        </p>

        <div style="text-align: center; margin-bottom: 30px;">
            <div style="font-size: 1.5rem; font-weight: bold; color: ${remaining < 0 ? '#FF6B6B' : '#4ECDC4'};">
                Budget Remaining: ${remaining} / ${ecosystemGameState.budget}
            </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 30px;">
            ${Object.entries(ECOSYSTEM_ROLES).map(([key, role]) => `
                <div style="background: rgba(78, 205, 196, 0.2); padding: 20px; border-radius: 10px; text-align: center;">
                    <div style="font-size: 3rem; margin-bottom: 10px;">${role.emoji}</div>
                    <h4 style="margin-bottom: 15px;">${role.name}</h4>
                    <div style="display: flex; align-items: center; justify-content: center; gap: 10px;">
                        <button onclick="adjustEcosystem('${key}', -1)" class="btn-secondary" style="padding: 5px 15px;">-</button>
                        <span style="font-size: 1.5rem; font-weight: bold; min-width: 40px;">${ecosystemGameState.selected[key]}</span>
                        <button onclick="adjustEcosystem('${key}', 1)" class="btn-secondary" style="padding: 5px 15px;">+</button>
                    </div>
                </div>
            `).join('')}
        </div>

        <div style="background: rgba(255, 255, 255, 0.1); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
            <h4 style="margin-bottom: 10px;">📚 Balance Guide:</h4>
            <ul style="list-style: none; padding: 0;">
                <li>✓ Producers: Foundation of ecosystem (30-40%)</li>
                <li>✓ Herbivores: Primary consumers (20-30%)</li>
                <li>✓ Carnivores: Population control (10-20%)</li>
                <li>✓ Decomposers: Nutrient recycling (15-25%)</li>
                <li>✓ Pollinators: Plant reproduction (5-15%)</li>
            </ul>
        </div>

        <div style="text-align: center;">
            <button class="btn-primary" onclick="validateEcosystem()" ${remaining < 0 ? 'disabled' : ''}>
                🌍 Create Ecosystem
            </button>
            <button class="btn-secondary" onclick="closeModal('gameModal')" style="margin-left: 10px;">Cancel</button>
        </div>
    `;
}

function adjustEcosystem(role, amount) {
    ecosystemGameState.selected[role] = Math.max(0, ecosystemGameState.selected[role] + amount);
    renderEcosystemBuilder();
}

function validateEcosystem() {
    const total = Object.values(ecosystemGameState.selected).reduce((a, b) => a + b, 0);
    if (total === 0) {
        showNotification('Add some organisms to your ecosystem!');
        return;
    }

    // Check balance
    const percentages = {};
    Object.keys(ecosystemGameState.selected).forEach(key => {
        percentages[key] = (ecosystemGameState.selected[key] / total) * 100;
    });

    const balanced =
        percentages.producers >= 30 && percentages.producers <= 45 &&
        percentages.herbivores >= 15 && percentages.herbivores <= 35 &&
        percentages.carnivores >= 5 && percentages.carnivores <= 25 &&
        percentages.decomposers >= 10 && percentages.decomposers <= 30 &&
        percentages.pollinators >= 3 && percentages.pollinators <= 20;

    const score = balanced ? 100 : 50;

    if (balanced) {
        gameState.stats.ecosystemsBuilt++;
        addXP(150);
        gameState.resources.credits += 50;
        sounds.play('achievement');
        updateMissionProgress('minigame', { game: 'ecosystem' });
    } else {
        addXP(50);
        gameState.resources.credits += 15;
        sounds.play('success');
    }

    document.getElementById('gameModalContent').innerHTML = `
        <h2 style="text-align: center; margin-bottom: 30px;">
            ${balanced ? '🎉 Perfect Ecosystem!' : '😊 Good Effort!'}
        </h2>

        <div style="text-align: center; font-size: 1.5rem; margin: 30px 0;">
            Balance Score: ${score}/100
        </div>

        <div style="background: rgba(255, 255, 255, 0.1); padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h4 style="margin-bottom: 15px;">Your Ecosystem:</h4>
            ${Object.entries(ecosystemGameState.selected).map(([key, value]) => `
                <div style="display: flex; justify-content: space-between; margin: 10px 0;">
                    <span>${ECOSYSTEM_ROLES[key].emoji} ${ECOSYSTEM_ROLES[key].name}:</span>
                    <span>${value} (${((value/total)*100).toFixed(1)}%)</span>
                </div>
            `).join('')}
        </div>

        ${balanced ? `
            <div style="background: rgba(78, 205, 196, 0.2); padding: 15px; border-radius: 10px; margin: 20px 0;">
                Perfect balance! Your ecosystem will thrive on Mars! 🌍
            </div>
            <div style="text-align: center; color: #4ECDC4; font-size: 1.2rem; margin: 20px 0;">
                +150 XP • +50 Credits
            </div>
        ` : `
            <div style="background: rgba(255, 107, 107, 0.2); padding: 15px; border-radius: 10px; margin: 20px 0;">
                Your ecosystem needs better balance. Try adjusting the ratios!
            </div>
            <div style="text-align: center; color: #4ECDC4; font-size: 1.2rem; margin: 20px 0;">
                +50 XP • +15 Credits
            </div>
        `}

        <div style="text-align: center; margin-top: 25px;">
            <button class="btn-primary" onclick="startEcosystemBuilder()">Build Another</button>
            <button class="btn-secondary" onclick="closeModal('gameModal')" style="margin-left: 10px;">Exit</button>
        </div>
    `;

    checkAchievements();
    saveGame();
}

// ============================================================================
// CONSERVATION CHALLENGE
// ============================================================================

const CONSERVATION_SCENARIOS = [
    {
        title: 'Tiger Population Decline',
        description: 'Tigers are critically endangered. Only 3,900 remain in the wild. What action helps most?',
        options: [
            { text: 'Create protected wildlife corridors', impact: 90, explanation: 'Wildlife corridors allow tigers to roam safely and connect fragmented populations.' },
            { text: 'Ban tiger products globally', impact: 80, explanation: 'Important for reducing poaching, but habitat protection is more critical.' },
            { text: 'Breed tigers in zoos only', impact: 30, explanation: 'Captive breeding helps but doesn\'t address habitat loss.' },
            { text: 'Relocate all tigers to one area', impact: 20, explanation: 'Concentrating tigers makes them vulnerable to disease and disasters.' }
        ]
    },
    {
        title: 'Ocean Plastic Crisis',
        description: 'Marine life is threatened by 8 million tons of plastic entering oceans yearly. Best solution?',
        options: [
            { text: 'Ban single-use plastics globally', impact: 95, explanation: 'Preventing plastic at the source is most effective!' },
            { text: 'Clean up existing ocean plastic', impact: 60, explanation: 'Helpful but doesn\'t stop new pollution.' },
            { text: 'Create plastic-eating bacteria', impact: 40, explanation: 'Promising research but not scalable yet.' },
            { text: 'Teach fish to avoid plastic', impact: 5, explanation: 'Animals can\'t learn to avoid invisible microplastics.' }
        ]
    },
    {
        title: 'Rainforest Deforestation',
        description: 'Rainforests lose an area the size of a football field every second. Most effective action?',
        options: [
            { text: 'Support indigenous land rights', impact: 95, explanation: 'Indigenous-managed forests have lowest deforestation rates!' },
            { text: 'Plant new trees elsewhere', impact: 40, explanation: 'New forests can\'t replace ancient rainforest biodiversity.' },
            { text: 'Boycott all wood products', impact: 50, explanation: 'Sustainable forestry is better than total boycotts.' },
            { text: 'Send money to governments', impact: 30, explanation: 'Direct conservation funding is more effective.' }
        ]
    },
    {
        title: 'Bee Colony Collapse',
        description: 'Bee populations have dropped 40%. They pollinate 75% of crops. What helps most?',
        options: [
            { text: 'Ban neonicotinoid pesticides', impact: 90, explanation: 'These pesticides are a primary cause of bee decline!' },
            { text: 'Build more beehives', impact: 50, explanation: 'Doesn\'t address why bees are dying.' },
            { text: 'Import foreign bee species', impact: 25, explanation: 'Can disrupt native ecosystems and spread disease.' },
            { text: 'Use robotic pollinators', impact: 10, explanation: 'Technology can\'t replace complex ecosystem roles.' }
        ]
    },
    {
        title: 'Coral Reef Bleaching',
        description: 'Rising ocean temperatures have killed 50% of coral reefs. Best conservation strategy?',
        options: [
            { text: 'Reduce global carbon emissions', impact: 95, explanation: 'Addressing climate change is the only long-term solution!' },
            { text: 'Breed heat-resistant coral', impact: 60, explanation: 'Helpful but doesn\'t stop warming oceans.' },
            { text: 'Create artificial reefs', impact: 40, explanation: 'Can\'t replace the biodiversity of natural reefs.' },
            { text: 'Move coral to cooler waters', impact: 20, explanation: 'Coral ecosystems are too complex to relocate.' }
        ]
    }
];

function startConservationChallenge() {
    const scenario = CONSERVATION_SCENARIOS[Math.floor(Math.random() * CONSERVATION_SCENARIOS.length)];

    document.getElementById('gameModalContent').innerHTML = `
        <h2 style="text-align: center; margin-bottom: 20px;">🦁 Conservation Challenge</h2>

        <div style="background: linear-gradient(45deg, rgba(255, 107, 107, 0.3), rgba(255, 142, 136, 0.3)); padding: 25px; border-radius: 15px; margin-bottom: 30px;">
            <h3 style="margin-bottom: 15px; color: #FFD93D;">${scenario.title}</h3>
            <p style="font-size: 1.1rem; line-height: 1.6;">${scenario.description}</p>
        </div>

        <div class="quiz-options">
            ${scenario.options.map((option, index) => `
                <button class="quiz-option" onclick="selectConservationAction(${index}, ${JSON.stringify(scenario).replace(/"/g, '&quot;')})">${option.text}</button>
            `).join('')}
        </div>
    `;

    document.getElementById('gameModal').style.display = 'block';
    gameState.stats.gamesPlayed++;
}

function selectConservationAction(selectedIndex, scenarioStr) {
    const scenario = typeof scenarioStr === 'string' ? JSON.parse(scenarioStr) : scenarioStr;
    const selected = scenario.options[selectedIndex];
    const best = scenario.options.reduce((a, b) => a.impact > b.impact ? a : b);
    const isOptimal = selected.impact >= 80;

    if (isOptimal) {
        gameState.stats.conservationChallengesCompleted++;
        addXP(120);
        gameState.resources.credits += 45;
        sounds.play('achievement');
    } else {
        addXP(50);
        gameState.resources.credits += 20;
        sounds.play('success');
    }

    document.getElementById('gameModalContent').innerHTML = `
        <h2 style="text-align: center; margin-bottom: 30px;">
            ${isOptimal ? '🌟 Excellent Choice!' : '💡 Good Thinking!'}
        </h2>

        <div style="background: rgba(78, 205, 196, 0.2); padding: 20px; border-radius: 10px; margin: 20px 0;">
            <strong>Your Choice:</strong> ${selected.text}<br><br>
            <strong>Impact:</strong> ${selected.impact}/100<br><br>
            ${selected.explanation}
        </div>

        ${!isOptimal ? `
            <div style="background: rgba(255, 215, 61, 0.2); padding: 20px; border-radius: 10px; margin: 20px 0;">
                <strong>Optimal Solution:</strong> ${best.text}<br><br>
                ${best.explanation}
            </div>
        ` : ''}

        <div style="text-align: center; color: #4ECDC4; font-size: 1.2rem; margin: 20px 0;">
            +${isOptimal ? 120 : 50} XP • +${isOptimal ? 45 : 20} Credits
        </div>

        <div style="text-align: center; margin-top: 25px;">
            <button class="btn-primary" onclick="startConservationChallenge()">Next Challenge</button>
            <button class="btn-secondary" onclick="closeModal('gameModal')" style="margin-left: 10px;">Exit</button>
        </div>
    `;

    checkAchievements();
    saveGame();
}
