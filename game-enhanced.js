/**
 * MARS ARK EXPLORER - Enhanced Game Engine v2.0
 * Educational Animal Adventure Game with Extended Features
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
    }
};

// Sound effects (simple beep tones using Web Audio API)
const sounds = {
    enabled: true,
    context: null,

    init() {
        if (!this.context && gameState.settings.soundEnabled) {
            this.context = new (window.AudioContext || window.webkitAudioContext)();
        }
    },

    play(type) {
        if (!gameState.settings.soundEnabled || !this.context) return;

        const oscillator = this.context.createOscillator();
        const gainNode = this.context.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.context.destination);

        switch(type) {
            case 'success':
                oscillator.frequency.value = 523.25; // C5
                gainNode.gain.setValueAtTime(0.3, this.context.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + 0.3);
                oscillator.start();
                oscillator.stop(this.context.currentTime + 0.3);
                break;
            case 'levelup':
                oscillator.frequency.value = 659.25; // E5
                gainNode.gain.setValueAtTime(0.3, this.context.currentTime);
                oscillator.start();
                setTimeout(() => {
                    oscillator.frequency.value = 783.99; // G5
                }, 100);
                oscillator.stop(this.context.currentTime + 0.5);
                break;
            case 'unlock':
                oscillator.frequency.value = 440; // A4
                gainNode.gain.setValueAtTime(0.2, this.context.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + 0.2);
                oscillator.start();
                oscillator.stop(this.context.currentTime + 0.2);
                break;
            case 'error':
                oscillator.frequency.value = 200;
                oscillator.type = 'square';
                gainNode.gain.setValueAtTime(0.2, this.context.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + 0.2);
                oscillator.start();
                oscillator.stop(this.context.currentTime + 0.2);
                break;
            case 'achievement':
                // Play a happy chord
                for (let i = 0; i < 3; i++) {
                    setTimeout(() => {
                        const osc = this.context.createOscillator();
                        const gain = this.context.createGain();
                        osc.connect(gain);
                        gain.connect(this.context.destination);
                        osc.frequency.value = [523.25, 659.25, 783.99][i];
                        gain.gain.setValueAtTime(0.2, this.context.currentTime);
                        gain.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + 0.4);
                        osc.start();
                        osc.stop(this.context.currentTime + 0.4);
                    }, i * 100);
                }
                break;
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
            gameState.player = loadedState.player || gameState.player;
            gameState.resources = loadedState.resources || gameState.resources;
            gameState.arkAnimals = loadedState.arkAnimals || [];
            gameState.activeMissions = loadedState.activeMissions || [];
            gameState.currentChapter = loadedState.currentChapter || 1;
            gameState.stats = loadedState.stats || gameState.stats;
            gameState.dailyChallenge = loadedState.dailyChallenge || null;
            gameState.lastDailyDate = loadedState.lastDailyDate || null;
            gameState.activeEvent = loadedState.activeEvent || null;
            gameState.settings = loadedState.settings || gameState.settings;

            showNotification('Welcome back, Explorer! 🚀');
            sounds.play('unlock');
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

    sounds.play('levelup');
    showNotification(`🎉 Level Up! Now Level ${gameState.player.level}`);
    checkAchievements();
}

function unlockContentForLevel(level) {
    // Unlock animals every 2 levels
    if (level % 2 === 0) {
        unlockRandomAnimals(3);
    }

    // Unlock chapters every 3 levels
    if (level % 3 === 0) {
        const newChapter = Math.floor(level / 3) + 1;
        if (newChapter <= 10) {
            gameState.unlockedChapters.add(newChapter);
            showNotification(`📖 New Story Chapter Unlocked!`);
            sounds.play('achievement');
        }
    }

    // Unlock boss challenges at specific levels
    if ([10, 20, 30].includes(level)) {
        showNotification(`⚔️ Boss Challenge Available!`);
    }
}

// ============================================================================
// EXTENDED STORY CHAPTERS
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
    },
    {
        number: 6,
        title: 'The Biodiversity Crisis',
        content: `
            <p>News from Earth arrives: extinction rates are accelerating. Climate change, habitat destruction, and pollution are pushing thousands of species to the brink.</p>
            <p>The Mars colonies may become Earth's last hope for preserving biodiversity. Your ark isn't just about Mars anymore—it's about saving life itself.</p>
            <p>Dr. Chen's hands shake as she shows you the latest data. "We're running out of time," she whispers. "Every species we don't save could be lost forever."</p>
            <p>The weight of extinction bears down on you. But you steel your resolve. Every animal you discover, every ecosystem you understand, is a victory against oblivion.</p>
        `
    },
    {
        number: 7,
        title: 'Unexpected Allies',
        content: `
            <p>The animals are adapting in ways no one predicted. Octopuses are solving engineering problems. Crows are teaching each other to maintain equipment. Bees are pollinating Martian-adapted crops with incredible efficiency.</p>
            <p>"They're not just passengers," Commander Rodriguez says in awe. "They're partners in colonization."</p>
            <p>You watch a dolphin communicate through the habitat's water system, its clicks and whistles carrying messages between dome sections. Intelligence takes many forms.</p>
            <p>Earth's animals aren't just survivors—they're pioneers, just like humanity. Together, you're building a new world.</p>
        `
    },
    {
        number: 8,
        title: 'The Terraforming Begins',
        content: `
            <p>Decade 5 of the Mars Project. The atmosphere generators are working. Temperatures are slowly rising. Ice is melting into water.</p>
            <p>Your ark animals are ready for the next phase: outdoor habitats. Real Martian ecosystems, carefully designed and balanced.</p>
            <p>The first trees are planted. Fish swim in the newly formed lakes. Birds fly through thin but breathable air, their wings adapted to lower gravity.</p>
            <p>You stand at the edge of the first outdoor habitat, watching a butterfly land on a flower that grows in Martian soil. It's impossible. It's miraculous. It's life.</p>
        `
    },
    {
        number: 9,
        title: 'Earth Remembers',
        content: `
            <p>Messages flood in from Earth. Your work has inspired a global conservation movement. Protected areas are expanding. Endangered species are rebounding.</p>
            <p>"You showed us what we stood to lose," one message reads. "Mars taught Earth to value its own nature."</p>
            <p>Children on both planets learn about biodiversity now. The Mars Ark Project became more than a backup plan—it became a reminder of what matters.</p>
            <p>Dr. Chen retires, passing leadership to a new generation. "You did it," she tells you. "You saved more than animals. You saved hope."</p>
        `
    },
    {
        number: 10,
        title: 'A Living Legacy',
        content: `
            <p>Year 2207. Fifty years since the Genesis Protocol began. Mars is alive with Earth's biodiversity.</p>
            <p>Forests whisper in the Martian wind. Oceans teem with fish. Mountains echo with the calls of animals that would have gone extinct.</p>
            <p>Your grandchildren ask to hear the stories again. The elephants, the bees, the octopuses. The day the first bird flew in Martian sky.</p>
            <p>You look up at the blue-green planet you helped create, and then at the small blue dot in the sky—Earth.</p>
            <p>Two worlds, one family of life. This is your legacy. This is why every species matters. This is the future you built, one animal at a time.</p>
            <p style="text-align: center; font-size: 1.5rem; margin-top: 30px; color: #4ECDC4;">🌍 ❤️ 🔴</p>
            <p style="text-align: center; font-style: italic; opacity: 0.9;">Thank you for playing Mars Ark Explorer.</p>
        `
    }
];

// ============================================================================
// MISSION SYSTEM (Enhanced)
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
        id: 'discover_reptiles',
        title: 'Reptile Researcher',
        description: 'Discover 5 reptiles',
        type: 'discover',
        target: { category: 'Reptiles', count: 5 },
        rewards: { xp: 100, credits: 30 },
        icon: '🦎'
    },
    {
        id: 'discover_insects',
        title: 'Entomologist',
        description: 'Discover 5 insects',
        type: 'discover',
        target: { category: 'Insects', count: 5 },
        rewards: { xp: 100, credits: 30 },
        icon: '🐝'
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
        id: 'win_habitat_match',
        title: 'Habitat Master',
        description: 'Win Habitat Match game 2 times',
        type: 'minigame',
        target: { game: 'habitat', count: 2 },
        rewards: { xp: 120, credits: 35 },
        icon: '🌍'
    },
    {
        id: 'build_ecosystem',
        title: 'Ecosystem Architect',
        description: 'Successfully build 2 ecosystems',
        type: 'minigame',
        target: { game: 'ecosystem', count: 2 },
        rewards: { xp: 150, credits: 45 },
        icon: '🌳'
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

    addXP(mission.rewards.xp);
    gameState.resources.credits += mission.rewards.credits;

    sounds.play('success');
    showNotification(`✅ Mission Complete: ${mission.title}`);

    gameState.activeMissions = gameState.activeMissions.filter(m => m.id !== mission.id);

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
// DAILY CHALLENGES
// ============================================================================

const DAILY_CHALLENGE_TYPES = [
    {
        type: 'speed_discover',
        title: 'Speed Explorer',
        description: 'Discover 10 animals today',
        target: 10,
        rewards: { xp: 200, credits: 75 },
        icon: '⚡'
    },
    {
        type: 'trivia_master',
        title: 'Trivia Expert',
        description: 'Answer 15 trivia questions correctly',
        target: 15,
        rewards: { xp: 250, credits: 100 },
        icon: '🎓'
    },
    {
        type: 'resource_collector',
        title: 'Resource Hunter',
        description: 'Collect 200 resources today',
        target: 200,
        rewards: { xp: 150, credits: 60 },
        icon: '💰'
    }
];

function initializeDailyChallenge() {
    const today = new Date().toDateString();

    if (gameState.lastDailyDate !== today) {
        // New day, new challenge
        const challenge = DAILY_CHALLENGE_TYPES[Math.floor(Math.random() * DAILY_CHALLENGE_TYPES.length)];
        gameState.dailyChallenge = {
            ...challenge,
            progress: 0,
            completed: false,
            date: today
        };
        gameState.lastDailyDate = today;
        saveGame();
    }
}

function renderDailyChallenge() {
    const container = document.getElementById('dailyChallengeContainer');
    if (!container || !gameState.dailyChallenge) return;

    const challenge = gameState.dailyChallenge;
    const progress = Math.min(100, (challenge.progress / challenge.target) * 100);

    container.innerHTML = `
        <div class="panel-title">${challenge.icon} Daily Challenge</div>
        <div style="background: linear-gradient(45deg, rgba(255, 215, 61, 0.3), rgba(255, 107, 107, 0.3)); padding: 15px; border-radius: 10px; border: 2px solid ${challenge.completed ? '#4ECDC4' : '#FFD93D'};">
            <h3 style="margin-bottom: 10px;">${challenge.title}</h3>
            <p style="font-size: 0.9rem; opacity: 0.9; margin-bottom: 10px;">${challenge.description}</p>
            <div style="font-size: 0.9rem; color: #4ECDC4; margin-bottom: 5px;">
                Progress: ${challenge.progress} / ${challenge.target}
            </div>
            <div style="background: rgba(0,0,0,0.3); height: 8px; border-radius: 4px; overflow: hidden;">
                <div style="height: 100%; background: linear-gradient(90deg, #FFD93D, #FF6B6B); width: ${progress}%;"></div>
            </div>
            ${challenge.completed ? `
                <div style="text-align: center; margin-top: 10px; color: #4ECDC4; font-weight: bold;">
                    ✅ Completed!
                </div>
            ` : `
                <div style="font-size: 0.85rem; opacity: 0.8; margin-top: 10px;">
                    Reward: ${challenge.rewards.xp} XP + ${challenge.rewards.credits} Credits
                </div>
            `}
        </div>
    `;
}

// ============================================================================
// ENHANCED ACHIEVEMENT SYSTEM
// ============================================================================

const ACHIEVEMENTS = [
    // Discovery Achievements
    { id: 'first_discover', name: 'First Discovery', icon: '🔍', description: 'Discover your first animal', condition: () => gameState.discoveredAnimals.size >= 1 },
    { id: 'discover_10', name: 'Zoologist', icon: '🦁', description: 'Discover 10 animals', condition: () => gameState.discoveredAnimals.size >= 10 },
    { id: 'discover_25', name: 'Wildlife Expert', icon: '🌍', description: 'Discover 25 animals', condition: () => gameState.discoveredAnimals.size >= 25 },
    { id: 'discover_50', name: 'Master Explorer', icon: '🏆', description: 'Discover 50 animals', condition: () => gameState.discoveredAnimals.size >= 50 },
    { id: 'discover_100', name: 'Ultimate Naturalist', icon: '👑', description: 'Discover 100 animals', condition: () => gameState.discoveredAnimals.size >= 100 },

    // Level Achievements
    { id: 'level_5', name: 'Rising Star', icon: '⭐', description: 'Reach Level 5', condition: () => gameState.player.level >= 5 },
    { id: 'level_10', name: 'Veteran', icon: '🌟', description: 'Reach Level 10', condition: () => gameState.player.level >= 10 },
    { id: 'level_20', name: 'Elite Commander', icon: '💫', description: 'Reach Level 20', condition: () => gameState.player.level >= 20 },
    { id: 'level_30', name: 'Legendary Guardian', icon: '✨', description: 'Reach Level 30', condition: () => gameState.player.level >= 30 },

    // Mission Achievements
    { id: 'first_mission', name: 'Mission Started', icon: '📋', description: 'Complete your first mission', condition: () => gameState.stats.missionsCompleted >= 1 },
    { id: 'missions_10', name: 'Mission Master', icon: '✅', description: 'Complete 10 missions', condition: () => gameState.stats.missionsCompleted >= 10 },
    { id: 'missions_25', name: 'Quest Champion', icon: '🎖️', description: 'Complete 25 missions', condition: () => gameState.stats.missionsCompleted >= 25 },

    // Ark Achievements
    { id: 'ark_half', name: 'Ark Builder', icon: '🛠️', description: 'Fill half your ark', condition: () => gameState.arkAnimals.length >= gameState.arkMaxCapacity / 2 },
    { id: 'ark_full', name: 'Ark Complete', icon: '🚀', description: 'Fill your entire ark', condition: () => gameState.arkAnimals.length >= gameState.arkMaxCapacity },
    { id: 'ark_diverse', name: 'Biodiversity Expert', icon: '🌈', description: 'Have 5 different categories in ark', condition: () => {
        const categories = new Set(gameState.arkAnimals.map(id => animalDatabase.find(a => a.id === id)).filter(a => a).map(a => a.category));
        return categories.size >= 5;
    }},

    // Trivia Achievements
    { id: 'trivia_master', name: 'Trivia Champion', icon: '🧠', description: 'Get 20 trivia questions correct', condition: () => gameState.stats.triviaCorrect >= 20 },
    { id: 'trivia_expert', name: 'Know-It-All', icon: '🎓', description: 'Get 50 trivia questions correct', condition: () => gameState.stats.triviaCorrect >= 50 },

    // Resource Achievements
    { id: 'resource_rich', name: 'Resource Tycoon', icon: '💎', description: 'Have 500+ total resources', condition: () => Object.values(gameState.resources).reduce((a,b) => a+b, 0) >= 500 },
    { id: 'resource_master', name: 'Resource Master', icon: '💰', description: 'Have 1000+ credits', condition: () => gameState.resources.credits >= 1000 },

    // Story Achievements
    { id: 'story_reader', name: 'Story Enthusiast', icon: '📖', description: 'Read 5 story chapters', condition: () => gameState.currentChapter >= 5 },
    { id: 'story_complete', name: 'Epic Journey', icon: '📚', description: 'Complete all story chapters', condition: () => gameState.currentChapter >= 10 },

    // Game Achievements
    { id: 'minigame_player', name: 'Game Master', icon: '🎮', description: 'Play 25 mini-games', condition: () => gameState.stats.gamesPlayed >= 25 },
    { id: 'daily_challenger', name: 'Daily Devotion', icon: '📅', description: 'Complete 7 daily challenges', condition: () => gameState.stats.dailyChallengesCompleted >= 7 }
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
    sounds.play('achievement');
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

// Continue in next part...
