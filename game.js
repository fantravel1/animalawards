/**
 * MARS ARK EXPLORER - Game Engine
 * Educational Animal Adventure Game
 */

// ============================================================================
// GAME STATE MANAGEMENT
// ============================================================================

let gameState = {
    // Player Progress
    player: {
        level: 1,
        xp: 0,
        rank: 'Cadet Explorer',
        playTimeMinutes: 0,
        totalScore: 0
    },

    // Resources
    resources: {
        water: 100,
        food: 100,
        oxygen: 100,
        credits: 50
    },

    // Discovery System
    discoveredAnimals: new Set(),
    unlockedAnimals: new Set([1, 2, 3, 4, 5]), // Start with 5 unlocked

    // Ark Building
    arkAnimals: [],
    arkMaxCapacity: 20,

    // Mission System
    activeMissions: [],
    completedMissions: new Set(),

    // Achievements
    unlockedAchievements: new Set(),

    // Story Progress
    currentChapter: 1,
    unlockedChapters: new Set([1]),

    // Daily Challenges
    dailyChallenge: null,
    lastDailyDate: null,

    // Events
    activeEvent: null,

    // Leaderboard
    leaderboardEntry: null,

    // Statistics
    stats: {
        gamesPlayed: 0,
        missionsCompleted: 0,
        triviaCorrect: 0,
        triviaTotal: 0,
        habitatMatchWins: 0,
        ecosystemsBuilt: 0,
        conservationChallengesCompleted: 0,
        bossesDefeated: 0,
        dailyChallengesCompleted: 0
    },

    // Settings
    settings: {
        soundEnabled: true,
        musicEnabled: true
    },

    // Prestige System
    prestige: {
        level: 0,
        totalPrestiges: 0,
        permanentBonuses: {
            xpMultiplier: 1.0,
            resourceMultiplier: 1.0,
            creditMultiplier: 1.0,
            startingResources: 0,
            unlockSpeed: 0
        }
    }
};

// Load saved game state
function loadGame() {
    const saved = localStorage.getItem('marsArkSave');
    if (saved) {
        try {
            const loadedState = JSON.parse(saved);
            // Convert arrays back to Sets
            gameState.discoveredAnimals = new Set(loadedState.discoveredAnimals || []);
            gameState.unlockedAnimals = new Set(loadedState.unlockedAnimals || [1, 2, 3, 4, 5]);
            gameState.completedMissions = new Set(loadedState.completedMissions || []);
            gameState.unlockedAchievements = new Set(loadedState.unlockedAchievements || []);
            gameState.unlockedChapters = new Set(loadedState.unlockedChapters || [1]);

            // Copy other properties
            gameState.player = { ...gameState.player, ...loadedState.player };
            gameState.resources = loadedState.resources || gameState.resources;
            gameState.arkAnimals = loadedState.arkAnimals || [];
            gameState.activeMissions = loadedState.activeMissions || [];
            gameState.currentChapter = loadedState.currentChapter || 1;
            gameState.stats = { ...gameState.stats, ...loadedState.stats };

            // Enhanced features
            gameState.dailyChallenge = loadedState.dailyChallenge || null;
            gameState.lastDailyDate = loadedState.lastDailyDate || null;
            gameState.activeEvent = loadedState.activeEvent || null;
            gameState.leaderboardEntry = loadedState.leaderboardEntry || null;
            gameState.settings = { ...gameState.settings, ...loadedState.settings };

            // Prestige system
            if (loadedState.prestige) {
                gameState.prestige = {
                    ...gameState.prestige,
                    ...loadedState.prestige,
                    permanentBonuses: {
                        ...gameState.prestige.permanentBonuses,
                        ...(loadedState.prestige.permanentBonuses || {})
                    }
                };
            }

            showNotification('Welcome back, Explorer! 🚀');
        } catch (e) {
            console.error('Failed to load save:', e);
        }
    }
}

// Save game state
function saveGame() {
    try {
        const saveData = {
            ...gameState,
            discoveredAnimals: Array.from(gameState.discoveredAnimals),
            unlockedAnimals: Array.from(gameState.unlockedAnimals),
            completedMissions: Array.from(gameState.completedMissions),
            unlockedAchievements: Array.from(gameState.unlockedAchievements),
            unlockedChapters: Array.from(gameState.unlockedChapters)
        };
        localStorage.setItem('marsArkSave', JSON.stringify(saveData));
    } catch (e) {
        console.error('Failed to save:', e);
    }
}

// Auto-save every 30 seconds
setInterval(saveGame, 30000);

// ============================================================================
// XP AND LEVELING SYSTEM
// ============================================================================

const RANK_NAMES = [
    'Cadet Explorer',
    'Junior Biologist',
    'Wildlife Specialist',
    'Conservation Expert',
    'Ark Commander',
    'Master Naturalist',
    'Legendary Guardian'
];

function calculateXPForLevel(level) {
    return Math.floor(100 * Math.pow(1.5, level - 1));
}

function addXP(amount) {
    gameState.player.xp += amount;
    gameState.player.totalScore += amount;
    const maxXP = calculateXPForLevel(gameState.player.level);

    // Level up check
    while (gameState.player.xp >= maxXP) {
        levelUp();
    }

    updateHUD();
    saveGame();
}

function levelUp() {
    gameState.player.level++;
    gameState.player.xp = 0;

    // Update rank
    const rankIndex = Math.min(Math.floor(gameState.player.level / 5), RANK_NAMES.length - 1);
    gameState.player.rank = RANK_NAMES[rankIndex];

    // Rewards
    gameState.resources.credits += 50;
    gameState.resources.water += 20;
    gameState.resources.food += 20;
    gameState.resources.oxygen += 20;

    // Unlock new content
    unlockContentForLevel(gameState.player.level);

    showNotification(`🎉 Level Up! Now Level ${gameState.player.level}`);
    checkAchievements();
}

function unlockContentForLevel(level) {
    // Unlock animals every 2 levels
    if (level % 2 === 0) {
        unlockRandomAnimals(3);
    }

    // Unlock chapters every 5 levels
    if (level % 5 === 0) {
        const newChapter = Math.floor(level / 5) + 1;
        if (newChapter <= 10) {
            gameState.unlockedChapters.add(newChapter);
            showNotification(`📖 New Story Chapter Unlocked!`);
        }
    }
}

// ============================================================================
// MISSION SYSTEM
// ============================================================================

const MISSION_TEMPLATES = [
    {
        id: 'discover_mammals',
        title: 'Mammal Explorer',
        description: 'Discover 5 different mammals',
        type: 'discover',
        target: { category: 'Mammals', count: 5 },
        rewards: { xp: 100, credits: 30 },
        icon: '🐘'
    },
    {
        id: 'discover_birds',
        title: 'Bird Watcher',
        description: 'Discover 5 different birds',
        type: 'discover',
        target: { category: 'Birds', count: 5 },
        rewards: { xp: 100, credits: 30 },
        icon: '🦅'
    },
    {
        id: 'discover_marine',
        title: 'Ocean Explorer',
        description: 'Discover 5 marine animals',
        type: 'discover',
        target: { category: 'Marine Life', count: 5 },
        rewards: { xp: 150, credits: 40 },
        icon: '🐋'
    },
    {
        id: 'play_trivia',
        title: 'Knowledge Seeker',
        description: 'Play the Animal Trivia game 3 times',
        type: 'minigame',
        target: { game: 'trivia', count: 3 },
        rewards: { xp: 80, credits: 25 },
        icon: '🧠'
    },
    {
        id: 'build_ark',
        title: 'Ark Architect',
        description: 'Add 10 animals to your Mars ark',
        type: 'ark',
        target: { count: 10 },
        rewards: { xp: 200, credits: 50 },
        icon: '🚀'
    },
    {
        id: 'collect_resources',
        title: 'Resource Manager',
        description: 'Collect 500 total resources',
        type: 'resources',
        target: { total: 500 },
        rewards: { xp: 120, credits: 35 },
        icon: '💎'
    }
];

function initializeMissions() {
    if (gameState.activeMissions.length === 0) {
        // Start with 3 random missions
        const shuffled = [...MISSION_TEMPLATES].sort(() => Math.random() - 0.5);
        gameState.activeMissions = shuffled.slice(0, 3).map(template => ({
            ...template,
            progress: 0
        }));
    }
    renderMissions();
}

function updateMissionProgress(missionType, data) {
    gameState.activeMissions.forEach(mission => {
        if (mission.type === missionType) {
            if (missionType === 'discover' && data.category === mission.target.category) {
                mission.progress = Math.min(mission.progress + 1, mission.target.count);
            } else if (missionType === 'minigame' && data.game === mission.target.game) {
                mission.progress = Math.min(mission.progress + 1, mission.target.count);
            } else if (missionType === 'ark') {
                mission.progress = gameState.arkAnimals.length;
            } else if (missionType === 'resources') {
                const total = Object.values(gameState.resources).reduce((a, b) => a + b, 0);
                mission.progress = Math.min(total, mission.target.total);
            }

            // Check if mission completed
            const targetValue = mission.target.count || mission.target.total;
            if (mission.progress >= targetValue && !gameState.completedMissions.has(mission.id)) {
                completeMission(mission);
            }
        }
    });

    renderMissions();
}

function completeMission(mission) {
    gameState.completedMissions.add(mission.id);
    gameState.stats.missionsCompleted++;

    // Grant rewards
    addXP(mission.rewards.xp);
    gameState.resources.credits += mission.rewards.credits;

    showNotification(`✅ Mission Complete: ${mission.title}`);

    // Remove from active and add new mission
    gameState.activeMissions = gameState.activeMissions.filter(m => m.id !== mission.id);

    // Add a new random mission
    const available = MISSION_TEMPLATES.filter(t =>
        !gameState.completedMissions.has(t.id) &&
        !gameState.activeMissions.find(m => m.id === t.id)
    );

    if (available.length > 0) {
        const newMission = available[Math.floor(Math.random() * available.length)];
        gameState.activeMissions.push({ ...newMission, progress: 0 });
    }

    checkAchievements();
    renderMissions();
    saveGame();
}

function renderMissions() {
    const container = document.getElementById('missionsContainer');
    if (!container) return;

    if (gameState.activeMissions.length === 0) {
        container.innerHTML = '<div style="opacity: 0.6; text-align: center;">No active missions</div>';
        return;
    }

    container.innerHTML = gameState.activeMissions.map(mission => {
        const targetValue = mission.target.count || mission.target.total;
        const progress = Math.min(100, (mission.progress / targetValue) * 100);

        return `
            <div class="mission-item">
                <div class="mission-title">
                    <span>${mission.icon}</span>
                    <span>${mission.title}</span>
                </div>
                <div style="font-size: 0.9rem; opacity: 0.9; margin-top: 5px;">
                    ${mission.description}
                </div>
                <div class="mission-progress">
                    Progress: ${mission.progress} / ${targetValue}
                </div>
                <div style="background: rgba(0,0,0,0.3); height: 6px; border-radius: 3px; margin-top: 8px; overflow: hidden;">
                    <div style="height: 100%; background: linear-gradient(90deg, #4ECDC4, #44A08D); width: ${progress}%;"></div>
                </div>
                <div class="mission-reward">
                    🎁 ${mission.rewards.xp} XP + ${mission.rewards.credits} Credits
                </div>
            </div>
        `;
    }).join('');
}

// ============================================================================
// ACHIEVEMENT SYSTEM
// ============================================================================

const ACHIEVEMENTS = [
    { id: 'first_discover', name: 'First Discovery', icon: '🔍', description: 'Discover your first animal', condition: () => gameState.discoveredAnimals.size >= 1 },
    { id: 'discover_10', name: 'Zoologist', icon: '🦁', description: 'Discover 10 animals', condition: () => gameState.discoveredAnimals.size >= 10 },
    { id: 'discover_25', name: 'Wildlife Expert', icon: '🌍', description: 'Discover 25 animals', condition: () => gameState.discoveredAnimals.size >= 25 },
    { id: 'discover_50', name: 'Master Explorer', icon: '🏆', description: 'Discover 50 animals', condition: () => gameState.discoveredAnimals.size >= 50 },
    { id: 'level_5', name: 'Rising Star', icon: '⭐', description: 'Reach Level 5', condition: () => gameState.player.level >= 5 },
    { id: 'level_10', name: 'Veteran', icon: '🌟', description: 'Reach Level 10', condition: () => gameState.player.level >= 10 },
    { id: 'first_mission', name: 'Mission Started', icon: '📋', description: 'Complete your first mission', condition: () => gameState.stats.missionsCompleted >= 1 },
    { id: 'missions_10', name: 'Mission Master', icon: '✅', description: 'Complete 10 missions', condition: () => gameState.stats.missionsCompleted >= 10 },
    { id: 'ark_full', name: 'Ark Complete', icon: '🚀', description: 'Fill your entire ark', condition: () => gameState.arkAnimals.length >= gameState.arkMaxCapacity },
    { id: 'trivia_master', name: 'Trivia Champion', icon: '🧠', description: 'Get 20 trivia questions correct', condition: () => gameState.stats.triviaCorrect >= 20 },
    { id: 'resource_rich', name: 'Resource Tycoon', icon: '💎', description: 'Have 500+ total resources', condition: () => Object.values(gameState.resources).reduce((a,b) => a+b, 0) >= 500 },
    { id: 'story_reader', name: 'Story Enthusiast', icon: '📖', description: 'Read 5 story chapters', condition: () => gameState.currentChapter >= 5 }
];

function checkAchievements() {
    ACHIEVEMENTS.forEach(achievement => {
        if (!gameState.unlockedAchievements.has(achievement.id) && achievement.condition()) {
            unlockAchievement(achievement);
        }
    });
}

function unlockAchievement(achievement) {
    gameState.unlockedAchievements.add(achievement.id);
    showNotification(`🏆 Achievement Unlocked: ${achievement.name}`);
    addXP(50);
    gameState.resources.credits += 25;
    renderAchievements();
    saveGame();
}

function renderAchievements() {
    const container = document.getElementById('achievementsGrid');
    if (!container) return;

    container.innerHTML = ACHIEVEMENTS.map(achievement => {
        const unlocked = gameState.unlockedAchievements.has(achievement.id);
        return `
            <div class="achievement ${unlocked ? 'unlocked' : 'locked'}"
                 title="${achievement.description}"
                 onclick="showAchievementInfo('${achievement.id}')">
                ${achievement.icon}
            </div>
        `;
    }).join('');
}

function showAchievementInfo(achievementId) {
    const achievement = ACHIEVEMENTS.find(a => a.id === achievementId);
    if (!achievement) return;

    const unlocked = gameState.unlockedAchievements.has(achievementId);

    showNotification(
        `${achievement.icon} ${achievement.name}\n${achievement.description}\n${unlocked ? '✅ Unlocked!' : '🔒 Locked'}`
    );
}

// ============================================================================
// ANIMAL DISCOVERY SYSTEM
// ============================================================================

function unlockRandomAnimals(count) {
    if (!animalDatabase) return;

    const locked = animalDatabase.filter(a => !gameState.unlockedAnimals.has(a.id));
    const toUnlock = locked.sort(() => Math.random() - 0.5).slice(0, count);

    toUnlock.forEach(animal => {
        gameState.unlockedAnimals.add(animal.id);
        showNotification(`🔓 New Animal Unlocked: ${animal.name}`);
    });

    renderAnimalGrid();
}

function discoverAnimal(animalId) {
    if (!gameState.discoveredAnimals.has(animalId)) {
        gameState.discoveredAnimals.add(animalId);
        const animal = animalDatabase.find(a => a.id === animalId);

        if (animal) {
            addXP(20);
            gameState.resources.credits += 5;

            // Update mission progress
            updateMissionProgress('discover', { category: animal.category });

            showNotification(`🎉 Discovered: ${animal.name}!`);
            checkAchievements();
            updateStats();
        }
    }
}

function renderAnimalGrid() {
    const grid = document.getElementById('animalGrid');
    if (!grid || !animalDatabase) return;

    const displayAnimals = animalDatabase.slice(0, 50); // Show first 50

    grid.innerHTML = displayAnimals.map(animal => {
        const isUnlocked = gameState.unlockedAnimals.has(animal.id);
        const isDiscovered = gameState.discoveredAnimals.has(animal.id);

        return `
            <div class="animal-discovery-card ${isUnlocked ? '' : 'locked'}"
                 onclick="${isUnlocked ? `showAnimalDetail(${animal.id})` : ''}">
                <div class="animal-emoji">${animal.emoji}</div>
                <div class="animal-name">${isUnlocked ? animal.name : '???'}</div>
                ${isUnlocked ? `
                    <div style="text-align: center; font-size: 0.85rem; opacity: 0.8;">
                        ${animal.category}
                    </div>
                ` : ''}
                <div class="discovery-status">
                    ${isDiscovered ? '✅ Discovered' : isUnlocked ? '📍 Click to discover!' : '🔒 Locked'}
                </div>
            </div>
        `;
    }).join('');
}

function showAnimalDetail(animalId) {
    const animal = animalDatabase.find(a => a.id === animalId);
    if (!animal) return;

    // Mark as discovered
    if (!gameState.discoveredAnimals.has(animalId)) {
        discoverAnimal(animalId);
    }

    const inArk = gameState.arkAnimals.includes(animalId);

    document.getElementById('animalModalContent').innerHTML = `
        <div style="text-align: center; margin-bottom: 25px;">
            <div style="font-size: 6rem; margin-bottom: 15px;">${animal.emoji}</div>
            <h2 style="font-size: 2.5rem; margin-bottom: 10px;">${animal.name}</h2>
            <div style="font-size: 1.1rem; opacity: 0.8;">${animal.category} • ${animal.habitat}</div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 15px; margin-bottom: 25px;">
            <div style="text-align: center; padding: 15px; background: rgba(78, 205, 196, 0.2); border-radius: 10px;">
                <div style="font-size: 2rem; font-weight: bold; color: #4ECDC4;">${animal.intelligence}</div>
                <div style="font-size: 0.9rem;">Intelligence</div>
            </div>
            <div style="text-align: center; padding: 15px; background: rgba(78, 205, 196, 0.2); border-radius: 10px;">
                <div style="font-size: 2rem; font-weight: bold; color: #4ECDC4;">${animal.adaptability}</div>
                <div style="font-size: 0.9rem;">Adaptability</div>
            </div>
            <div style="text-align: center; padding: 15px; background: rgba(78, 205, 196, 0.2); border-radius: 10px;">
                <div style="font-size: 2rem; font-weight: bold; color: #4ECDC4;">${animal.cuteness}</div>
                <div style="font-size: 0.9rem;">Cuteness</div>
            </div>
            <div style="text-align: center; padding: 15px; background: rgba(78, 205, 196, 0.2); border-radius: 10px;">
                <div style="font-size: 2rem; font-weight: bold; color: #4ECDC4;">${animal.survival}</div>
                <div style="font-size: 0.9rem;">Survival</div>
            </div>
        </div>

        ${animal.facts ? `
            <div class="edu-card">
                <div class="edu-title">🔬 Fascinating Facts</div>
                ${animal.facts.map(fact => `
                    <div class="edu-fact">💡 ${fact}</div>
                `).join('')}
            </div>
        ` : ''}

        ${animal.conservation ? `
            <div style="background: rgba(255, 107, 107, 0.2); padding: 15px; border-radius: 10px; margin: 20px 0;">
                <strong>🌍 Conservation Status:</strong> ${animal.conservation}
            </div>
        ` : ''}

        <div style="display: flex; gap: 15px; justify-content: center; margin-top: 25px;">
            <button class="btn-primary" onclick="addToArk(${animal.id}); closeModal('animalModal');">
                ${inArk ? '✅ In Ark' : '🚀 Add to Ark'}
            </button>
            <button class="btn-secondary" onclick="startAnimalQuiz(${animal.id})">
                🧠 Test Knowledge
            </button>
        </div>
    `;

    document.getElementById('animalModal').style.display = 'block';
}

// ============================================================================
// ARK BUILDER SYSTEM
// ============================================================================

function initializeArkSlots() {
    const container = document.getElementById('arkSlots');
    if (!container) return;

    container.innerHTML = Array.from({ length: gameState.arkMaxCapacity }, (_, i) => {
        const animalId = gameState.arkAnimals[i];
        const animal = animalId ? animalDatabase.find(a => a.id === animalId) : null;

        return `
            <div class="ark-slot ${animal ? 'filled' : 'empty'}"
                 onclick="${animal ? `showAnimalDetail(${animalId})` : 'showArkHelp()'}">
                ${animal ? animal.emoji : '➕'}
            </div>
        `;
    }).join('');

    updateArkStats();
}

function addToArk(animalId) {
    if (gameState.arkAnimals.includes(animalId)) {
        showNotification('Animal already in ark!');
        return;
    }

    if (gameState.arkAnimals.length >= gameState.arkMaxCapacity) {
        showNotification('Ark is full! Remove an animal first.');
        return;
    }

    const animal = animalDatabase.find(a => a.id === animalId);
    if (!animal) return;

    // Check resources
    const cost = { water: 10, food: 10, oxygen: 10 };
    if (gameState.resources.water < cost.water ||
        gameState.resources.food < cost.food ||
        gameState.resources.oxygen < cost.oxygen) {
        showNotification('Not enough resources!');
        return;
    }

    // Deduct resources
    gameState.resources.water -= cost.water;
    gameState.resources.food -= cost.food;
    gameState.resources.oxygen -= cost.oxygen;

    gameState.arkAnimals.push(animalId);
    addXP(30);

    updateMissionProgress('ark', {});
    showNotification(`${animal.emoji} ${animal.name} added to ark!`);

    initializeArkSlots();
    checkAchievements();
    updateHUD();
    saveGame();
}

function updateArkStats() {
    const arkCount = document.getElementById('arkCount');
    const diversityScore = document.getElementById('diversityScore');

    if (arkCount) {
        arkCount.textContent = gameState.arkAnimals.length;
    }

    if (diversityScore) {
        // Calculate diversity based on different categories
        const categories = new Set(
            gameState.arkAnimals
                .map(id => animalDatabase.find(a => a.id === id))
                .filter(a => a)
                .map(a => a.category)
        );
        const diversity = Math.min(100, categories.size * 20);
        diversityScore.textContent = diversity;
    }
}

function showArkHelp() {
    showNotification('Discover animals and add them to your ark! Each animal costs resources.');
}

// ============================================================================
// STORY SYSTEM
// ============================================================================

const STORY_CHAPTERS = [
    {
        number: 1,
        title: 'The Discovery',
        content: `
            <p>Year 2157. Earth's resources are depleting faster than anyone predicted. Humanity has finally perfected Mars colonization technology, and the first permanent settlements are being established on the Red Planet.</p>
            <p>But there's a problem. We can't leave Earth's incredible biodiversity behind. Scientists have developed the "Genesis Protocol" - a system to preserve and transport Earth's species to Mars.</p>
            <p>That's where YOU come in. As a newly appointed Ark Explorer, your mission is to study Earth's animals, understand their needs, and decide which species deserve a place in humanity's greatest adventure.</p>
            <p>The journey begins now. Welcome to the Mars Ark Project! 🚀</p>
        `
    },
    {
        number: 2,
        title: 'Understanding Ecosystems',
        content: `
            <p>Dr. Elena Chen, the lead biologist, pulls you aside during your first week.</p>
            <p>"Listen," she says, "this isn't just about picking the cutest animals. Mars will need balanced ecosystems. We need pollinators, decomposers, predators, and prey. Every species plays a role."</p>
            <p>She shows you holographic models of potential Mars habitats. "Your decisions will shape an entire world's biodiversity. Choose wisely."</p>
            <p>You realize the weight of your responsibility. This is about preserving life itself.</p>
        `
    },
    {
        number: 3,
        title: 'The Resource Crisis',
        content: `
            <p>Three months into the project, reality sets in. The ark ships have limited capacity. Each animal requires water, food, and oxygen during the journey.</p>
            <p>Commander Rodriguez presents the harsh numbers: "We have space for maybe 500 species. That's it. Earth has millions."</p>
            <p>The team is silent. How do you choose? Which animals are essential? Which can we live without?</p>
            <p>You understand now that every decision comes with sacrifice. But giving up isn't an option.</p>
        `
    },
    {
        number: 4,
        title: 'Hope on Mars',
        content: `
            <p>The first dome habitats are thriving. The bees you selected are pollinating crops. The fish are breeding in aquaculture systems. It's working!</p>
            <p>But challenges remain. Some species aren't adapting well to lower gravity. Others are thriving beyond expectations.</p>
            <p>You've learned so much about Earth's creatures. Their resilience, their beauty, their importance.</p>
            <p>The real work is just beginning. Keep exploring, keep learning. Mars is counting on you! 🌍➡️🔴</p>
        `
    },
    {
        number: 5,
        title: 'New Frontiers',
        content: `
            <p>As Mars colonies expand, you've become a legend. The "Ark Commander" who made the impossible decisions.</p>
            <p>Young colonists grow up learning about Earth's animals through your catalog. They ask questions: "What was an elephant like?" "Did dolphins really talk to each other?"</p>
            <p>Your work has preserved not just species, but wonder itself.</p>
            <p>And deep down, you know: wherever humanity goes, we must carry Earth's legacy with us. 🌟</p>
        `
    }
];

function showStory() {
    const availableChapters = STORY_CHAPTERS.filter(ch =>
        gameState.unlockedChapters.has(ch.number)
    );

    if (availableChapters.length === 0) return;

    const currentStory = availableChapters[availableChapters.length - 1];

    document.getElementById('storyModalContent').innerHTML = `
        <div style="text-align: center; margin-bottom: 30px;">
            <div class="chapter-number">CHAPTER ${currentStory.number}</div>
            <h2 class="chapter-title">${currentStory.title}</h2>
        </div>
        <div class="chapter-content">
            ${currentStory.content}
        </div>
        <div style="text-align: center; margin-top: 30px;">
            ${currentStory.number < gameState.currentChapter ? `
                <button class="btn-secondary" onclick="showNextChapter()">Continue Story →</button>
            ` : `
                <button class="btn-primary" onclick="closeModal('storyModal')">Continue Exploring</button>
            `}
        </div>
    `;

    document.getElementById('storyModal').style.display = 'block';
}

function showNextChapter() {
    if (gameState.currentChapter < STORY_CHAPTERS.length &&
        gameState.unlockedChapters.has(gameState.currentChapter + 1)) {
        gameState.currentChapter++;
        showStory();
        updateStoryProgress();
        saveGame();
    } else {
        showNotification('Reach Level ' + ((gameState.currentChapter + 1) * 5) + ' to unlock the next chapter!');
    }
}

function updateStoryProgress() {
    const progress = (gameState.currentChapter / STORY_CHAPTERS.length) * 100;
    document.getElementById('storyProgress').style.width = progress + '%';
    document.getElementById('currentChapter').textContent = gameState.currentChapter;
}

// ============================================================================
// MINI-GAMES
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

function startAnimalQuiz(animalId) {
    const animal = animalDatabase.find(a => a.id === animalId);
    if (!animal || !animal.facts || animal.facts.length < 2) {
        showNotification('Quiz not available for this animal');
        return;
    }

    // Create a simple true/false question from facts
    const fact = animal.facts[Math.floor(Math.random() * animal.facts.length)];

    document.getElementById('gameModalContent').innerHTML = `
        <h2 style="text-align: center; margin-bottom: 30px;">
            ${animal.emoji} ${animal.name} Quiz
        </h2>
        <div class="quiz-question">True or False: ${fact}</div>
        <div class="quiz-options">
            <button class="quiz-option" onclick="answerAnimalQuiz(true, '${animal.name}')">✅ True</button>
            <button class="quiz-option" onclick="answerAnimalQuiz(false, '${animal.name}')">❌ False</button>
        </div>
    `;

    document.getElementById('gameModal').style.display = 'block';
}

function answerAnimalQuiz(answer, animalName) {
    // All facts are true statements
    const correct = answer === true;

    if (correct) {
        addXP(10);
        gameState.resources.credits += 5;
    }

    document.getElementById('gameModalContent').innerHTML = `
        <h2 style="text-align: center; margin-bottom: 30px;">
            ${correct ? '✅ Correct!' : '❌ Incorrect'}
        </h2>
        <div style="font-size: 1.2rem; text-align: center; margin: 30px 0;">
            ${correct ? `Great job! You know your ${animalName} facts!` : `The statement was TRUE! Learn more about ${animalName} to improve.`}
        </div>
        ${correct ? `
            <div style="text-align: center; color: #4ECDC4; font-size: 1.2rem; margin: 20px 0;">
                +10 XP • +5 Credits
            </div>
        ` : ''}
        <div style="text-align: center; margin-top: 25px;">
            <button class="btn-primary" onclick="closeModal('gameModal')">Continue</button>
        </div>
    `;

    saveGame();
}

function startHabitatMatch() {
    showNotification('Habitat Match game coming soon! 🌍');
}

function startEcosystemBuilder() {
    showNotification('Ecosystem Builder coming soon! 🌳');
}

function startConservationChallenge() {
    showNotification('Conservation Quest coming soon! 🦁');
}

// ============================================================================
// EDUCATIONAL CONTENT
// ============================================================================

function loadEducationalContent() {
    const container = document.getElementById('educationalContent');
    if (!container) return;

    container.innerHTML = `
        <div class="edu-card">
            <div class="edu-title">🌍 Why Biodiversity Matters</div>
            <div class="edu-content">
                <p>Biodiversity is the variety of all life on Earth. It's essential for:</p>
                <div class="edu-fact">
                    <strong>Ecosystem Services:</strong> Clean air, water filtration, pollination, and climate regulation
                </div>
                <div class="edu-fact">
                    <strong>Food Security:</strong> Diverse crops and livestock ensure stable food supplies
                </div>
                <div class="edu-fact">
                    <strong>Medicine:</strong> Many medicines come from plants and animals
                </div>
                <div class="edu-fact">
                    <strong>Cultural Value:</strong> Species are integral to human culture and heritage
                </div>
            </div>
        </div>

        <div class="edu-card">
            <div class="edu-title">🔬 Animal Intelligence</div>
            <div class="edu-content">
                <p>Intelligence in animals takes many forms:</p>
                <div class="edu-fact">
                    <strong>Problem Solving:</strong> Crows can use tools and plan for the future
                </div>
                <div class="edu-fact">
                    <strong>Social Intelligence:</strong> Elephants have complex social structures and empathy
                </div>
                <div class="edu-fact">
                    <strong>Communication:</strong> Dolphins use unique whistles as names
                </div>
                <div class="edu-fact">
                    <strong>Memory:</strong> Chimpanzees can remember number sequences better than humans
                </div>
            </div>
        </div>

        <div class="edu-card">
            <div class="edu-title">🌱 Conservation Strategies</div>
            <div class="edu-content">
                <p>How we can protect Earth's species:</p>
                <div class="edu-fact">
                    <strong>Habitat Protection:</strong> Preserve natural environments
                </div>
                <div class="edu-fact">
                    <strong>Anti-Poaching:</strong> Protect endangered species from illegal hunting
                </div>
                <div class="edu-fact">
                    <strong>Breeding Programs:</strong> Help critically endangered species recover
                </div>
                <div class="edu-fact">
                    <strong>Education:</strong> Teach people about the importance of wildlife
                </div>
            </div>
        </div>

        <div class="edu-card">
            <div class="edu-title">🚀 Challenges of Mars Colonization</div>
            <div class="edu-content">
                <p>Bringing life to Mars presents unique challenges:</p>
                <div class="edu-fact">
                    <strong>Low Gravity:</strong> Animals must adapt to 38% of Earth's gravity
                </div>
                <div class="edu-fact">
                    <strong>Enclosed Habitats:</strong> All life exists in artificial environments
                </div>
                <div class="edu-fact">
                    <strong>Resource Efficiency:</strong> Every resource must be carefully managed
                </div>
                <div class="edu-fact">
                    <strong>Ecosystem Balance:</strong> Creating self-sustaining food webs is critical
                </div>
            </div>
        </div>
    `;
}

// ============================================================================
// UI FUNCTIONS
// ============================================================================

function updateHUD() {
    // Update XP bar
    const maxXP = calculateXPForLevel(gameState.player.level);
    const xpPercent = (gameState.player.xp / maxXP) * 100;
    document.getElementById('xpFill').style.width = xpPercent + '%';
    document.getElementById('currentXP').textContent = gameState.player.xp;
    document.getElementById('maxXP').textContent = maxXP;
    document.getElementById('playerLevel').textContent = gameState.player.level;
    document.getElementById('playerRank').textContent = gameState.player.rank;

    // Update resources
    document.getElementById('waterResource').textContent = gameState.resources.water;
    document.getElementById('foodResource').textContent = gameState.resources.food;
    document.getElementById('oxygenResource').textContent = gameState.resources.oxygen;
    document.getElementById('creditsResource').textContent = gameState.resources.credits;
}

function updateStats() {
    document.getElementById('animalsDiscovered').textContent = gameState.discoveredAnimals.size;
    document.getElementById('missionsCompleted').textContent = gameState.stats.missionsCompleted;
    document.getElementById('gamesPlayed').textContent = gameState.stats.gamesPlayed;
}

function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });

    // Remove active from all buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected tab
    const tabMap = {
        'discover': 'discoverTab',
        'ark': 'arkTab',
        'learn': 'learnTab',
        'games': 'gamesTab'
    };

    document.getElementById(tabMap[tabName]).classList.add('active');
    event.target.classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// ============================================================================
// BACKGROUND EFFECTS
// ============================================================================

function createStarfield() {
    const stars = document.getElementById('stars');
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        stars.appendChild(star);
    }
}

// ============================================================================
// TUTORIAL SYSTEM
// ============================================================================

function showTutorial() {
    const hasSeenTutorial = localStorage.getItem('hasSeenTutorial');
    if (hasSeenTutorial) return;

    const overlay = document.createElement('div');
    overlay.className = 'tutorial-overlay';
    overlay.innerHTML = `
        <div class="tutorial-box">
            <h2>🚀 Welcome to Mars Ark Explorer!</h2>
            <p>Your mission: Discover Earth's incredible animals, learn about their habitats and behaviors, then build the ultimate Mars ark!</p>
            <p><strong>How to Play:</strong></p>
            <ul style="text-align: left; display: inline-block; margin: 20px 0;">
                <li>🔍 <strong>Discover</strong> animals by clicking on unlocked cards</li>
                <li>📋 <strong>Complete missions</strong> to earn XP and rewards</li>
                <li>🚀 <strong>Build your ark</strong> with strategic animal choices</li>
                <li>🧠 <strong>Play mini-games</strong> to test your knowledge</li>
                <li>📖 <strong>Read story chapters</strong> to unlock the narrative</li>
            </ul>
            <button class="btn-primary" onclick="closeTutorial()">Start Exploring!</button>
        </div>
    `;

    document.body.appendChild(overlay);

    overlay.querySelector('button').onclick = () => {
        overlay.remove();
        localStorage.setItem('hasSeenTutorial', 'true');
    };
}

// ============================================================================
// RESOURCE REGENERATION
// ============================================================================

function startResourceRegeneration() {
    setInterval(() => {
        // Slowly regenerate resources (1 per minute)
        gameState.resources.water = Math.min(gameState.resources.water + 1, 200);
        gameState.resources.food = Math.min(gameState.resources.food + 1, 200);
        gameState.resources.oxygen = Math.min(gameState.resources.oxygen + 1, 200);

        // Track playtime
        gameState.player.playTimeMinutes++;
        const hours = Math.floor(gameState.player.playTimeMinutes / 60);
        const minutes = gameState.player.playTimeMinutes % 60;
        document.getElementById('playTime').textContent =
            hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;

        updateHUD();
        updateMissionProgress('resources', {});
    }, 60000); // Every minute
}

// ============================================================================
// INITIALIZATION
// ============================================================================

function initGame() {
    // Wait for animal database to load
    if (typeof animalDatabase === 'undefined') {
        setTimeout(initGame, 100);
        return;
    }

    // Load saved game
    loadGame();

    // Initialize UI
    createStarfield();
    updateHUD();
    updateStats();
    updateStoryProgress();
    renderAnimalGrid();
    initializeMissions();
    renderAchievements();
    initializeArkSlots();
    loadEducationalContent();

    // Start systems
    startResourceRegeneration();

    // Show tutorial for new players
    setTimeout(showTutorial, 1000);

    // Check achievements
    checkAchievements();

    console.log('🚀 Mars Ark Explorer initialized!');
}

// Start the game when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGame);
} else {
    initGame();
}
