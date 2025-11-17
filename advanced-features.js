/**
 * MARS ARK EXPLORER - Advanced Features Module
 * Leaderboards, Boss Challenges, and Events
 */

// ============================================================================
// LEADERBOARD SYSTEM
// ============================================================================

function updateLeaderboard() {
    const leaderboard = JSON.parse(localStorage.getItem('marsArkLeaderboard') || '[]');

    // Update current player entry
    const playerEntry = {
        name: `Explorer ${gameState.player.level}`,
        level: gameState.player.level,
        score: gameState.player.totalScore,
        animalsDiscovered: gameState.discoveredAnimals.size,
        arkComplete: gameState.arkAnimals.length >= gameState.arkMaxCapacity,
        timestamp: Date.now()
    };

    // Remove old entry for this player and add new one
    const filtered = leaderboard.filter(entry => {
        // Simple deduplication - remove entries from same browser session that are older
        return entry.timestamp !== playerEntry.timestamp;
    });

    filtered.push(playerEntry);

    // Sort by score and keep top 100
    filtered.sort((a, b) => b.score - a.score);
    const top100 = filtered.slice(0, 100);

    localStorage.setItem('marsArkLeaderboard', JSON.stringify(top100));

    return top100;
}

function showLeaderboard() {
    const leaderboard = updateLeaderboard();
    const playerRank = leaderboard.findIndex(entry =>
        entry.level === gameState.player.level &&
        entry.score === gameState.player.totalScore
    ) + 1;

    document.getElementById('gameModalContent').innerHTML = `
        <h2 style="text-align: center; margin-bottom: 30px;">🏆 Global Leaderboard</h2>

        ${playerRank > 0 ? `
            <div style="background: linear-gradient(45deg, #FFD93D, #FF6B6B); padding: 20px; border-radius: 15px; margin-bottom: 30px; text-align: center;">
                <h3 style="margin-bottom: 10px;">Your Rank: #${playerRank}</h3>
                <div style="font-size: 1.1rem;">
                    Score: ${gameState.player.totalScore.toLocaleString()} | Level ${gameState.player.level}
                </div>
            </div>
        ` : ''}

        <div style="max-height: 400px; overflow-y: auto;">
            ${leaderboard.slice(0, 50).map((entry, index) => {
                const isPlayer = entry.level === gameState.player.level &&
                                entry.score === gameState.player.totalScore;

                return `
                    <div style="display: flex; align-items: center; padding: 15px; background: ${isPlayer ? 'rgba(78, 205, 196, 0.3)' : 'rgba(255, 255, 255, 0.1)'}; border-radius: 10px; margin-bottom: 10px;">
                        <div style="font-size: 1.5rem; font-weight: bold; min-width: 50px; color: ${index < 3 ? '#FFD93D' : '#fff'};">
                            ${index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                        </div>
                        <div style="flex: 1;">
                            <div style="font-weight: bold;">${entry.name}</div>
                            <div style="font-size: 0.9rem; opacity: 0.8;">
                                Level ${entry.level} • ${entry.animalsDiscovered} animals discovered
                                ${entry.arkComplete ? ' • 🚀 Ark Complete!' : ''}
                            </div>
                        </div>
                        <div style="font-size: 1.2rem; font-weight: bold; color: #4ECDC4;">
                            ${entry.score.toLocaleString()}
                        </div>
                    </div>
                `;
            }).join('')}
        </div>

        <div style="text-align: center; margin-top: 30px;">
            <button class="btn-primary" onclick="closeModal('gameModal')">Close</button>
        </div>
    `;

    document.getElementById('gameModal').style.display = 'block';
}

// ============================================================================
// BOSS CHALLENGE SYSTEM
// ============================================================================

const BOSS_CHALLENGES = [
    {
        id: 'knowledge_titan',
        level: 10,
        name: 'The Knowledge Titan',
        description: 'Answer 10 trivia questions in a row correctly!',
        icon: '🧠',
        rewards: { xp: 500, credits: 200 }
    },
    {
        id: 'ark_master',
        level: 20,
        name: 'The Ark Master',
        description: 'Build a perfectly balanced ark with all ecosystem roles represented!',
        icon: '🚀',
        rewards: { xp: 750, credits: 300 }
    },
    {
        id: 'conservation_hero',
        level: 30,
        name: 'The Conservation Hero',
        description: 'Make optimal decisions in 5 conservation challenges in a row!',
        icon: '🌍',
        rewards: { xp: 1000, credits: 500 }
    }
];

let bossState = {
    active: null,
    progress: 0,
    streak: 0
};

function startBossChallenge(bossId) {
    const boss = BOSS_CHALLENGES.find(b => b.id === bossId);
    if (!boss) return;

    if (gameState.player.level < boss.level) {
        showNotification(`Reach Level ${boss.level} to attempt this challenge!`);
        return;
    }

    bossState = {
        active: boss,
        progress: 0,
        streak: 0
    };

    document.getElementById('gameModalContent').innerHTML = `
        <div style="text-align: center; margin-bottom: 30px;">
            <div style="font-size: 6rem; margin-bottom: 20px;">${boss.icon}</div>
            <h2 style="font-size: 2rem; margin-bottom: 15px; color: #FFD93D;">${boss.name}</h2>
            <p style="font-size: 1.1rem; margin-bottom: 20px;">${boss.description}</p>
        </div>

        <div style="background: linear-gradient(45deg, rgba(255, 107, 107, 0.3), rgba(118, 75, 162, 0.3)); padding: 30px; border-radius: 15px; margin-bottom: 30px;">
            <h3 style="margin-bottom: 15px; text-align: center;">Boss Challenge Rules:</h3>
            <ul style="list-style: none; padding: 0;">
                <li style="margin: 10px 0;">⚔️ No mistakes allowed!</li>
                <li style="margin: 10px 0;">🎯 Complete the challenge perfectly</li>
                <li style="margin: 10px 0;">🏆 Earn legendary rewards</li>
            </ul>
        </div>

        <div style="background: rgba(255, 215, 61, 0.2); padding: 20px; border-radius: 10px; margin-bottom: 30px; text-align: center;">
            <h4>Rewards:</h4>
            <div style="font-size: 1.3rem; margin-top: 10px;">
                ${boss.rewards.xp} XP • ${boss.rewards.credits} Credits
            </div>
        </div>

        <div style="text-align: center;">
            <button class="btn-primary" onclick="beginBossChallenge('${boss.id}')">
                ⚔️ Begin Challenge
            </button>
            <button class="btn-secondary" onclick="closeModal('gameModal')" style="margin-left: 10px;">
                Prepare More
            </button>
        </div>
    `;

    document.getElementById('gameModal').style.display = 'block';
}

function beginBossChallenge(bossId) {
    const boss = BOSS_CHALLENGES.find(b => b.id === bossId);

    switch(bossId) {
        case 'knowledge_titan':
            startBossTrivia();
            break;
        case 'ark_master':
            startBossArkBuilder();
            break;
        case 'conservation_hero':
            startBossConservation();
            break;
    }
}

function startBossTrivia() {
    bossState.progress = 0;
    bossState.streak = 0;
    startBossTriviaQuestion();
}

function startBossTriviaQuestion() {
    if (bossState.progress >= 10) {
        completeBossChallenge();
        return;
    }

    currentTrivia = TRIVIA_QUESTIONS[Math.floor(Math.random() * TRIVIA_QUESTIONS.length)];

    document.getElementById('gameModalContent').innerHTML = `
        <div style="text-align: center; margin-bottom: 20px;">
            <h2>⚔️ Boss Challenge: Knowledge Titan</h2>
            <div style="font-size: 1.2rem; color: #FFD93D; margin-top: 10px;">
                Question ${bossState.progress + 1} / 10 | Streak: ${bossState.streak}
            </div>
        </div>

        <div class="quiz-question">${currentTrivia.question}</div>
        <div class="quiz-options">
            ${currentTrivia.options.map((option, index) => `
                <button class="quiz-option" onclick="answerBossTrivia(${index})">${option}</button>
            `).join('')}
        </div>

        <div style="text-align: center; margin-top: 20px; padding: 15px; background: rgba(255, 107, 107, 0.3); border-radius: 10px;">
            ⚠️ One wrong answer and the challenge ends!
        </div>
    `;
}

function answerBossTrivia(selectedIndex) {
    const correct = selectedIndex === currentTrivia.correct;

    if (correct) {
        bossState.progress++;
        bossState.streak++;
        sounds.play('success');

        if (bossState.progress >= 10) {
            completeBossChallenge();
        } else {
            setTimeout(startBossTriviaQuestion, 500);
        }
    } else {
        sounds.play('error');
        failBossChallenge();
    }
}

function startBossArkBuilder() {
    document.getElementById('gameModalContent').innerHTML = `
        <h2 style="text-align: center; margin-bottom: 20px;">⚔️ Boss Challenge: Ark Master</h2>
        <p style="text-align: center; margin-bottom: 30px;">
            Create the perfect ark with all ecosystem roles balanced!
        </p>

        <div style="background: rgba(255, 215, 61, 0.2); padding: 20px; border-radius: 10px; margin-bottom: 30px;">
            <h4>Requirements:</h4>
            <ul>
                <li>✓ At least 15 animals total</li>
                <li>✓ All 5 ecosystem roles represented</li>
                <li>✓ No role less than 10% or more than 40%</li>
            </ul>
        </div>

        <div style="text-align: center;">
            <p>Go to your Ark Builder tab and create the perfect ecosystem!</p>
            <p style="margin-top: 15px;">When ready, return here to validate.</p>
            <button class="btn-primary" onclick="validateBossArk()" style="margin-top: 20px;">
                Validate My Ark
            </button>
        </div>
    `;
}

function validateBossArk() {
    // Check current ark composition
    const arkCategories = {};
    gameState.arkAnimals.forEach(id => {
        const animal = animalDatabase.find(a => a.id === id);
        if (animal) {
            arkCategories[animal.category] = (arkCategories[animal.category] || 0) + 1;
        }
    });

    const total = gameState.arkAnimals.length;
    const uniqueCategories = Object.keys(arkCategories).length;

    const perfect =
        total >= 15 &&
        uniqueCategories >= 5 &&
        Object.values(arkCategories).every(count => {
            const percent = (count / total) * 100;
            return percent >= 10 && percent <= 40;
        });

    if (perfect) {
        completeBossChallenge();
    } else {
        failBossChallenge('Your ark doesn\'t meet the perfect balance requirements. Keep adjusting!');
    }
}

function startBossConservation() {
    bossState.progress = 0;
    bossState.streak = 0;
    startBossConservationQuestion();
}

function startBossConservationQuestion() {
    if (bossState.progress >= 5) {
        completeBossChallenge();
        return;
    }

    const scenario = CONSERVATION_SCENARIOS[Math.floor(Math.random() * CONSERVATION_SCENARIOS.length)];

    document.getElementById('gameModalContent').innerHTML = `
        <div style="text-align: center; margin-bottom: 20px;">
            <h2>⚔️ Boss Challenge: Conservation Hero</h2>
            <div style="font-size: 1.2rem; color: #FFD93D; margin-top: 10px;">
                Challenge ${bossState.progress + 1} / 5 | Optimal Decisions: ${bossState.streak}
            </div>
        </div>

        <div style="background: linear-gradient(45deg, rgba(255, 107, 107, 0.3), rgba(255, 142, 136, 0.3)); padding: 25px; border-radius: 15px; margin-bottom: 30px;">
            <h3 style="margin-bottom: 15px; color: #FFD93D;">${scenario.title}</h3>
            <p style="font-size: 1.1rem; line-height: 1.6;">${scenario.description}</p>
        </div>

        <div class="quiz-options">
            ${scenario.options.map((option, index) => `
                <button class="quiz-option" onclick="answerBossConservation(${index}, ${JSON.stringify(scenario).replace(/"/g, '&quot;')})">${option.text}</button>
            `).join('')}
        </div>

        <div style="text-align: center; margin-top: 20px; padding: 15px; background: rgba(255, 107, 107, 0.3); border-radius: 10px;">
            ⚠️ Only optimal solutions (80+ impact) count!
        </div>
    `;
}

function answerBossConservation(selectedIndex, scenarioStr) {
    const scenario = typeof scenarioStr === 'string' ? JSON.parse(scenarioStr) : scenarioStr;
    const selected = scenario.options[selectedIndex];

    if (selected.impact >= 80) {
        bossState.progress++;
        bossState.streak++;
        sounds.play('success');

        if (bossState.progress >= 5) {
            setTimeout(completeBossChallenge, 500);
        } else {
            setTimeout(startBossConservationQuestion, 500);
        }
    } else {
        sounds.play('error');
        failBossChallenge('Only optimal conservation decisions count in this boss challenge!');
    }
}

function completeBossChallenge() {
    const boss = bossState.active;
    gameState.stats.bossesDefeated++;

    addXP(boss.rewards.xp);
    gameState.resources.credits += boss.rewards.credits;

    // Unlock special animal as reward
    unlockRandomAnimals(5);

    sounds.play('achievement');

    document.getElementById('gameModalContent').innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 8rem; margin-bottom: 20px; animation: pulse 2s infinite;">🏆</div>
            <h2 style="font-size: 2.5rem; margin-bottom: 20px; color: #FFD93D;">BOSS DEFEATED!</h2>
            <h3 style="font-size: 1.8rem; margin-bottom: 30px;">${boss.name}</h3>
        </div>

        <div style="background: linear-gradient(45deg, #4ECDC4, #44A08D); padding: 30px; border-radius: 15px; margin-bottom: 30px; text-align: center;">
            <div style="font-size: 1.5rem; margin-bottom: 15px;">🎁 Legendary Rewards</div>
            <div style="font-size: 1.3rem;">
                +${boss.rewards.xp} XP<br>
                +${boss.rewards.credits} Credits<br>
                +5 New Animals Unlocked!
            </div>
        </div>

        <div style="text-align: center; font-size: 1.2rem; margin: 30px 0;">
            You've proven yourself a true ${boss.name}!<br>
            Mars is lucky to have you! 🚀
        </div>

        <div style="text-align: center;">
            <button class="btn-primary" onclick="closeModal('gameModal')">Celebrate Victory!</button>
        </div>
    `;

    checkAchievements();
    saveGame();
}

function failBossChallenge(message = 'Boss challenge failed! Try again when you\'re ready.') {
    sounds.play('error');

    document.getElementById('gameModalContent').innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 6rem; margin-bottom: 20px;">😔</div>
            <h2 style="font-size: 2rem; margin-bottom: 20px;">Challenge Failed</h2>
            <p style="font-size: 1.2rem; margin-bottom: 30px;">${message}</p>
        </div>

        <div style="background: rgba(255, 107, 107, 0.2); padding: 20px; border-radius: 10px; margin-bottom: 30px; text-align: center;">
            <div>Progress: ${bossState.progress} / ${bossState.active.id === 'knowledge_titan' ? 10 : bossState.active.id === 'conservation_hero' ? 5 : 1}</div>
            <div style="margin-top: 10px;">Don't give up! Practice and try again!</div>
        </div>

        <div style="text-align: center;">
            <button class="btn-primary" onclick="startBossChallenge('${bossState.active.id}')">Try Again</button>
            <button class="btn-secondary" onclick="closeModal('gameModal')" style="margin-left: 10px;">Train More</button>
        </div>
    `;

    bossState = { active: null, progress: 0, streak: 0 };
}

// ============================================================================
// THEMED EVENTS SYSTEM
// ============================================================================

const THEMED_EVENTS = [
    {
        id: 'ocean_week',
        name: 'Ocean Conservation Week',
        description: 'Discover marine animals and learn about ocean conservation!',
        duration: 7, // days
        bonuses: {
            marineXP: 2.0, // Double XP for marine animals
            category: 'Marine Life'
        },
        icon: '🌊'
    },
    {
        id: 'endangered_species_day',
        name: 'Endangered Species Awareness',
        description: 'Learn about critically endangered animals!',
        duration: 1,
        bonuses: {
            endangeredXP: 2.5,
            conservationBonus: true
        },
        icon: '🦏'
    },
    {
        id: 'bird_migration',
        name: 'Great Bird Migration',
        description: 'Celebrate Earth\'s flying wonders!',
        duration: 3,
        bonuses: {
            birdXP: 2.0,
            category: 'Birds'
        },
        icon: '🦅'
    }
];

function checkForEvents() {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);

    // Simple event rotation based on day of year
    if (dayOfYear % 30 === 0) {
        // Every 30 days, activate a random event
        const event = THEMED_EVENTS[Math.floor(Math.random() * THEMED_EVENTS.length)];
        activateEvent(event);
    }
}

function activateEvent(event) {
    gameState.activeEvent = {
        ...event,
        startDate: new Date().toDateString(),
        endDate: new Date(Date.now() + event.duration * 24 * 60 * 60 * 1000).toDateString()
    };

    showNotification(`🎉 Event Started: ${event.name}`);
    saveGame();
}

function renderActiveEvent() {
    const container = document.getElementById('eventContainer');
    if (!container) return;

    if (!gameState.activeEvent) {
        container.style.display = 'none';
        return;
    }

    const event = gameState.activeEvent;
    container.style.display = 'block';

    container.innerHTML = `
        <div class="panel" style="background: linear-gradient(45deg, rgba(255, 107, 107, 0.3), rgba(118, 75, 162, 0.3));">
            <div class="panel-title">${event.icon} Live Event</div>
            <h3 style="margin-bottom: 10px;">${event.name}</h3>
            <p style="font-size: 0.9rem; opacity: 0.9; margin-bottom: 15px;">${event.description}</p>
            <div style="background: rgba(0, 0, 0, 0.3); padding: 10px; border-radius: 8px;">
                <strong>Bonus:</strong> ${event.bonuses.category ? `${event.bonuses.category} animals give double XP!` : 'Special rewards active!'}
            </div>
        </div>
    `;
}

// ============================================================================
// SETTINGS PANEL
// ============================================================================

function showSettings() {
    document.getElementById('gameModalContent').innerHTML = `
        <h2 style="text-align: center; margin-bottom: 30px;">⚙️ Settings</h2>

        <div style="background: rgba(255, 255, 255, 0.1); padding: 25px; border-radius: 15px; margin-bottom: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <div>
                    <strong>🔊 Sound Effects</strong>
                    <div style="font-size: 0.9rem; opacity: 0.8;">Play sounds for actions and events</div>
                </div>
                <button class="btn-secondary" onclick="toggleSound()" style="min-width: 80px;">
                    ${gameState.settings.soundEnabled ? 'ON' : 'OFF'}
                </button>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <strong>💾 Save Data</strong>
                    <div style="font-size: 0.9rem; opacity: 0.8;">Manage your game progress</div>
                </div>
                <button class="btn-secondary" onclick="exportSave()">
                    Export
                </button>
            </div>
        </div>

        <div style="background: rgba(255, 107, 107, 0.2); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
            <h4 style="margin-bottom: 15px;">⚠️ Danger Zone</h4>
            <button class="btn-primary" onclick="confirmReset()" style="background: #FF6B6B;">
                Reset All Progress
            </button>
        </div>

        <div style="text-align: center;">
            <button class="btn-primary" onclick="closeModal('gameModal')">Close</button>
        </div>
    `;

    document.getElementById('gameModal').style.display = 'block';
}

function toggleSound() {
    gameState.settings.soundEnabled = !gameState.settings.soundEnabled;
    sounds.init();
    saveGame();
    showSettings();
}

function exportSave() {
    const saveData = localStorage.getItem('marsArkSave');
    const blob = new Blob([saveData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mars-ark-save.json';
    a.click();
    showNotification('Save exported!');
}

function confirmReset() {
    if (confirm('Are you sure you want to reset ALL progress? This cannot be undone!')) {
        if (confirm('Really reset? You will lose everything!')) {
            localStorage.removeItem('marsArkSave');
            location.reload();
        }
    }
}
