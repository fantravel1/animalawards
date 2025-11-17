/**
 * MARS ARK EXPLORER - Integration & Initialization
 * Ties all modules together and initializes new features
 */

// Render boss challenges panel
function renderBossChallenges() {
    const container = document.getElementById('bossContainer');
    if (!container) return;

    container.innerHTML = BOSS_CHALLENGES.map(boss => {
        const locked = gameState.player.level < boss.level;
        const defeated = gameState.stats.bossesDefeated > BOSS_CHALLENGES.indexOf(boss);

        return `
            <div style="background: ${defeated ? 'linear-gradient(45deg, rgba(78, 205, 196, 0.3), rgba(68, 160, 141, 0.3))' : locked ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 107, 107, 0.3)'}; padding: 15px; border-radius: 10px; margin-bottom: 10px; ${locked ? 'opacity: 0.5;' : 'cursor: pointer;'}"
                 ${!locked ? `onclick="startBossChallenge('${boss.id}')"` : ''}>
                <div style="font-size: 2rem; text-align: center; margin-bottom: 5px;">${boss.icon}</div>
                <div style="font-size: 0.9rem; font-weight: bold; text-align: center; margin-bottom: 5px;">
                    ${boss.name}
                </div>
                ${locked ? `
                    <div style="text-align: center; font-size: 0.85rem; opacity: 0.8;">
                        🔒 Level ${boss.level}
                    </div>
                ` : defeated ? `
                    <div style="text-align: center; font-size: 0.85rem; color: #4ECDC4;">
                        ✅ Defeated!
                    </div>
                ` : `
                    <div style="text-align: center; font-size: 0.85rem; opacity: 0.9;">
                        Click to challenge!
                    </div>
                `}
            </div>
        `;
    }).join('');
}

// Update stats display with new values
function updateStats() {
    document.getElementById('animalsDiscovered').textContent = gameState.discoveredAnimals.size;
    document.getElementById('missionsCompleted').textContent = gameState.stats.missionsCompleted;
    document.getElementById('gamesPlayed').textContent = gameState.stats.gamesPlayed;

    const bossesElement = document.getElementById('bossesDefeated');
    if (bossesElement) {
        bossesElement.textContent = gameState.stats.bossesDefeated || 0;
    }
}

// Enhanced initialization that includes all new systems
function initEnhancedGame() {
    // Wait for animal database and original game to load
    if (typeof animalDatabase === 'undefined' || typeof initGame === 'undefined') {
        setTimeout(initEnhancedGame, 100);
        return;
    }

    // Initialize sound system
    sounds.init();

    // Initialize daily challenge
    initializeDailyChallenge();
    renderDailyChallenge();

    // Check for active events
    checkForEvents();
    renderActiveEvent();

    // Render boss challenges
    renderBossChallenges();

    // Update leaderboard
    updateLeaderboard();

    console.log('🚀 Enhanced features initialized!');
}

// Override the original animal detail function to include event bonuses
const originalShowAnimalDetail = showAnimalDetail;
showAnimalDetail = function(animalId) {
    originalShowAnimalDetail(animalId);

    // If there's an active event, show bonus notification
    if (gameState.activeEvent && gameState.activeEvent.bonuses.category) {
        const animal = animalDatabase.find(a => a.id === animalId);
        if (animal && animal.category === gameState.activeEvent.bonuses.category) {
            setTimeout(() => {
                showNotification(`🎉 Event Bonus: ${gameState.activeEvent.bonuses.category} animals give 2x XP!`);
            }, 500);
        }
    }
};

// Override discovery to include event bonuses
const originalDiscoverAnimal = discoverAnimal;
discoverAnimal = function(animalId) {
    const animal = animalDatabase.find(a => a.id === animalId);
    const isNewDiscovery = !gameState.discoveredAnimals.has(animalId);

    // Apply original discovery
    originalDiscoverAnimal(animalId);

    // Apply event bonuses if applicable
    if (isNewDiscovery && gameState.activeEvent && gameState.activeEvent.bonuses.category && animal) {
        if (animal.category === gameState.activeEvent.bonuses.category) {
            // Already got base XP, give bonus XP
            const bonusXP = 20; // Same as base discovery XP
            addXP(bonusXP);
            showNotification(`⭐ Event Bonus: +${bonusXP} XP!`);
        }
    }
};

// Enhanced update stats to include daily challenge progress
const originalUpdateStats = updateStats;
updateStats = function() {
    originalUpdateStats();

    // Update daily challenge if applicable
    if (gameState.dailyChallenge) {
        const challenge = gameState.dailyChallenge;

        switch(challenge.type) {
            case 'speed_discover':
                // Count discoveries made today
                challenge.progress = gameState.discoveredAnimals.size; // Simplified
                break;
            case 'trivia_master':
                challenge.progress = gameState.stats.triviaCorrect;
                break;
            case 'resource_collector':
                challenge.progress = Object.values(gameState.resources).reduce((a,b) => a+b, 0);
                break;
        }

        // Check if completed
        if (challenge.progress >= challenge.target && !challenge.completed) {
            challenge.completed = true;
            gameState.stats.dailyChallengesCompleted++;
            addXP(challenge.rewards.xp);
            gameState.resources.credits += challenge.rewards.credits;
            sounds.play('achievement');
            showNotification(`🎉 Daily Challenge Complete!`);
            checkAchievements();
        }

        renderDailyChallenge();
    }
};

// Start enhanced initialization when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEnhancedGame);
} else {
    initEnhancedGame();
}

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Press 'L' for leaderboard
    if (e.key === 'l' || e.key === 'L') {
        if (!document.getElementById('gameModal').style.display ||
            document.getElementById('gameModal').style.display === 'none') {
            showLeaderboard();
        }
    }

    // Press 'S' for settings
    if (e.key === 's' || e.key === 'S') {
        if (!document.getElementById('gameModal').style.display ||
            document.getElementById('gameModal').style.display === 'none') {
            showSettings();
        }
    }

    // Press 'Escape' to close modals
    if (e.key === 'Escape') {
        const modals = ['gameModal', 'animalModal', 'storyModal'];
        modals.forEach(id => {
            const modal = document.getElementById(id);
            if (modal && modal.style.display === 'block') {
                modal.style.display = 'none';
            }
        });
    }
});

// Add helpful tutorial hints
function showHelpfulHints() {
    const hints = [
        '💡 Tip: Complete daily challenges for huge rewards!',
        '💡 Tip: Boss challenges unlock at levels 10, 20, and 30!',
        '💡 Tip: Check the leaderboard to see how you rank!',
        '💡 Tip: Build a diverse ark for higher diversity scores!',
        '💡 Tip: Play mini-games to earn XP and learn about animals!',
        '💡 Tip: Read all story chapters to complete the epic narrative!',
        '💡 Tip: Achievements give bonus XP and credits!',
        '💡 Tip: Resources regenerate slowly over time!',
        '💡 Tip: Press \'L\' for leaderboard, \'S\' for settings!',
        '💡 Tip: Events give bonus XP for specific animal categories!'
    ];

    const randomHint = hints[Math.floor(Math.random() * hints.length)];

    // Show hint every 5 minutes
    setInterval(() => {
        showNotification(hints[Math.floor(Math.random() * hints.length)]);
    }, 5 * 60 * 1000);

    // Show first hint after 30 seconds
    setTimeout(() => {
        showNotification(randomHint);
    }, 30000);
}

// Start helpful hints system
setTimeout(showHelpfulHints, 1000);
