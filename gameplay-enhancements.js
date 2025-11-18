/**
 * MARS ARK EXPLORER - Gameplay Balancing & Quality of Life
 * Makes the game more accessible and rewarding
 */

// ============================================================================
// ENHANCED STARTING STATE & BALANCING
// ============================================================================

// Override initial game state with more generous starting values
const ENHANCED_STARTING_STATE = {
    resources: {
        water: 200,      // Was 100
        food: 200,       // Was 100
        oxygen: 200,     // Was 100
        credits: 150     // Was 50
    },
    unlockedAnimals: new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]), // Start with 10 instead of 5
    arkMaxCapacity: 25  // Was 20
};

// Apply enhanced starting state
function enhanceGameState() {
    if (gameState.player.level === 1 && gameState.discoveredAnimals.size === 0) {
        // Only for brand new games
        Object.assign(gameState.resources, ENHANCED_STARTING_STATE.resources);
        gameState.unlockedAnimals = new Set([...ENHANCED_STARTING_STATE.unlockedAnimals]);
        gameState.arkMaxCapacity = ENHANCED_STARTING_STATE.arkMaxCapacity;
    }
}

// ============================================================================
// DAILY LOGIN BONUS
// ============================================================================

function checkDailyLogin() {
    const today = new Date().toDateString();
    const lastLogin = localStorage.getItem('lastLoginDate');

    if (lastLogin !== today) {
        localStorage.setItem('lastLoginDate', today);

        // Calculate login streak
        let streak = parseInt(localStorage.getItem('loginStreak') || '0');
        const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString();

        if (lastLogin === yesterday) {
            streak++;
        } else if (lastLogin) {
            streak = 1;
        } else {
            streak = 1;
        }

        localStorage.setItem('loginStreak', streak.toString());

        // Give daily bonus
        const bonus = {
            water: 50 + (streak * 10),
            food: 50 + (streak * 10),
            oxygen: 50 + (streak * 10),
            credits: 50 + (streak * 20),
            xp: 50 + (streak * 25)
        };

        gameState.resources.water += bonus.water;
        gameState.resources.food += bonus.food;
        gameState.resources.oxygen += bonus.oxygen;
        gameState.resources.credits += bonus.credits;
        addXP(bonus.xp);

        // Unlock bonus animals every 3 days
        if (streak % 3 === 0) {
            unlockRandomAnimals(2);
        }

        setTimeout(() => {
            showDailyLoginModal(streak, bonus);
        }, 1500);

        saveGame();
    }
}

function showDailyLoginModal(streak, bonus) {
    document.getElementById('gameModalContent').innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 6rem; margin-bottom: 20px;">🎁</div>
            <h2 style="font-size: 2rem; margin-bottom: 20px;">Daily Login Bonus!</h2>
            <div style="font-size: 1.3rem; color: #FFD93D; margin-bottom: 30px;">
                🔥 ${streak} Day Streak!
            </div>
        </div>

        <div style="background: linear-gradient(45deg, rgba(78, 205, 196, 0.3), rgba(68, 160, 141, 0.3)); padding: 30px; border-radius: 15px; margin-bottom: 30px;">
            <h3 style="text-align: center; margin-bottom: 20px;">Today's Rewards:</h3>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; font-size: 1.1rem;">
                <div style="text-align: center; padding: 15px; background: rgba(0, 0, 0, 0.2); border-radius: 10px;">
                    💧 +${bonus.water} Water
                </div>
                <div style="text-align: center; padding: 15px; background: rgba(0, 0, 0, 0.2); border-radius: 10px;">
                    🌾 +${bonus.food} Food
                </div>
                <div style="text-align: center; padding: 15px; background: rgba(0, 0, 0, 0.2); border-radius: 10px;">
                    💨 +${bonus.oxygen} Oxygen
                </div>
                <div style="text-align: center; padding: 15px; background: rgba(0, 0, 0, 0.2); border-radius: 10px;">
                    ⭐ +${bonus.credits} Credits
                </div>
            </div>
            <div style="text-align: center; font-size: 1.3rem; margin-top: 20px; color: #4ECDC4;">
                ✨ +${bonus.xp} XP
            </div>
            ${streak % 3 === 0 ? `
                <div style="text-align: center; margin-top: 20px; padding: 15px; background: rgba(255, 215, 61, 0.3); border-radius: 10px;">
                    🎉 Streak Bonus: 2 New Animals Unlocked!
                </div>
            ` : ''}
        </div>

        <div style="text-align: center; opacity: 0.9; margin-bottom: 20px;">
            Come back tomorrow for even better rewards!<br>
            Next streak milestone: ${Math.ceil(streak / 3) * 3} days
        </div>

        <div style="text-align: center;">
            <button class="btn-primary" onclick="closeModal('gameModal')">Awesome!</button>
        </div>
    `;

    document.getElementById('gameModal').style.display = 'block';
    sounds.play('achievement');
}

// ============================================================================
// HELPFUL HINTS PANEL
// ============================================================================

function renderHintsPanel() {
    const hints = getContextualHints();

    const container = document.getElementById('hintsContainer');
    if (!container) return;

    container.innerHTML = `
        <div class="panel-title">💡 Quick Tips</div>
        <div style="font-size: 0.9rem;">
            ${hints.map(hint => `
                <div style="background: rgba(255, 215, 61, 0.2); padding: 12px; border-radius: 8px; margin-bottom: 10px; border-left: 3px solid #FFD93D;">
                    ${hint}
                </div>
            `).join('')}
        </div>
        ${gameState.player.level < 3 ? `
            <button class="btn-secondary" onclick="showFullTutorial()" style="width: 100%; margin-top: 10px;">
                📖 View Full Tutorial
            </button>
        ` : ''}
    `;
}

function getContextualHints() {
    const hints = [];

    // Beginner hints
    if (gameState.player.level < 3) {
        hints.push('🔍 Click on <strong>unlocked animals</strong> to discover them and earn XP!');
        hints.push('🎯 Complete <strong>missions</strong> for big rewards!');
        hints.push('💰 <strong>Resources regenerate</strong> slowly over time');
    }

    // Resources low
    const totalResources = gameState.resources.water + gameState.resources.food + gameState.resources.oxygen;
    if (totalResources < 150) {
        hints.push('⚡ Play <strong>mini-games</strong> to earn credits and XP quickly!');
        hints.push('⏰ Wait a few minutes for resources to regenerate');
    }

    // Credits low
    if (gameState.resources.credits < 50) {
        hints.push('🎮 <strong>Trivia</strong> gives +10 credits per correct answer!');
        hints.push('✅ Complete missions for 30+ credits each!');
    }

    // Not discovering animals
    if (gameState.discoveredAnimals.size < 5 && gameState.player.level < 5) {
        hints.push('👆 Tap animals in the Discover tab to learn about them!');
    }

    // Ark empty
    if (gameState.arkAnimals.length === 0 && gameState.player.level >= 2) {
        hints.push('🚀 Add animals to your <strong>Ark</strong> for big XP bonuses!');
    }

    // Story available
    if (gameState.currentChapter < gameState.player.level / 3 && gameState.player.level >= 3) {
        hints.push('📖 New <strong>Story Chapter</strong> available to read!');
    }

    // Boss available
    if ([10, 20, 30].includes(gameState.player.level)) {
        hints.push('⚔️ <strong>Boss Challenge</strong> unlocked! Big rewards await!');
    }

    // Daily challenge
    if (gameState.dailyChallenge && !gameState.dailyChallenge.completed) {
        hints.push('📅 Complete today\'s <strong>Daily Challenge</strong> for massive rewards!');
    }

    // General tips
    if (hints.length < 3) {
        const generalTips = [
            '🏆 Check achievements to see what to unlock next',
            '📊 View leaderboard to see how you rank (Press L)',
            '🎵 Toggle sound in settings (Press S)',
            '🔓 Level up to unlock more animals!',
            '🌟 Diverse arks get higher scores!'
        ];
        hints.push(generalTips[Math.floor(Math.random() * generalTips.length)]);
    }

    return hints.slice(0, 3); // Max 3 hints
}

// ============================================================================
// ENHANCED DISCOVERY REWARDS
// ============================================================================

function enhancedDiscoverAnimal(animalId) {
    if (!gameState.discoveredAnimals.has(animalId)) {
        gameState.discoveredAnimals.add(animalId);
        const animal = animalDatabase.find(a => a.id === animalId);

        if (animal) {
            // More generous rewards
            const xpReward = 30; // Was 20
            const creditReward = 15; // Was 5

            // Bonus for first discoveries
            const discoveryCount = gameState.discoveredAnimals.size;
            let bonusXP = 0;
            let bonusCredits = 0;

            if (discoveryCount === 1) {
                bonusXP = 50;
                bonusCredits = 25;
                showNotification('🎉 First Discovery Bonus! +50 XP, +25 Credits!');
            } else if (discoveryCount === 5) {
                bonusXP = 75;
                bonusCredits = 35;
                showNotification('🎉 5 Discoveries Bonus! +75 XP, +35 Credits!');
            } else if (discoveryCount === 10) {
                bonusXP = 100;
                bonusCredits = 50;
                showNotification('🎉 10 Discoveries Bonus! +100 XP, +50 Credits!');
            } else if (discoveryCount % 25 === 0) {
                bonusXP = 200;
                bonusCredits = 100;
                showNotification(`🎉 ${discoveryCount} Discoveries! Epic Bonus!`);
            }

            addXP(xpReward + bonusXP);
            gameState.resources.credits += creditReward + bonusCredits;

            // Small resource rewards too
            gameState.resources.water += 5;
            gameState.resources.food += 5;
            gameState.resources.oxygen += 5;

            // Update mission progress
            updateMissionProgress('discover', { category: animal.category });

            showNotification(`🎉 Discovered: ${animal.name}! +${xpReward + bonusXP} XP`);
            sounds.play('success');
            checkAchievements();
            updateStats();
            renderHintsPanel();
        }
    }
}

// ============================================================================
// REDUCED ARK COSTS
// ============================================================================

function enhancedAddToArk(animalId) {
    if (gameState.arkAnimals.includes(animalId)) {
        showNotification('Animal already in ark!');
        sounds.play('error');
        return;
    }

    if (gameState.arkAnimals.length >= gameState.arkMaxCapacity) {
        showNotification('Ark is full! Remove an animal first.');
        sounds.play('error');
        return;
    }

    const animal = animalDatabase.find(a => a.id === animalId);
    if (!animal) return;

    // Reduced costs - was 10 each
    const cost = { water: 5, food: 5, oxygen: 5 };

    if (gameState.resources.water < cost.water ||
        gameState.resources.food < cost.food ||
        gameState.resources.oxygen < cost.oxygen) {
        showNotification(`Need ${cost.water} water, ${cost.food} food, ${cost.oxygen} oxygen!`);
        sounds.play('error');
        return;
    }

    // Deduct resources
    gameState.resources.water -= cost.water;
    gameState.resources.food -= cost.food;
    gameState.resources.oxygen -= cost.oxygen;

    gameState.arkAnimals.push(animalId);

    // More generous XP - was 30
    const xpReward = 50;
    let bonusXP = 0;

    // First time bonus
    if (gameState.arkAnimals.length === 1) {
        bonusXP = 100;
        showNotification('🎉 First Ark Animal! +100 Bonus XP!');
    } else if (gameState.arkAnimals.length === 5) {
        bonusXP = 75;
        showNotification('🎉 5 Animals in Ark! +75 Bonus XP!');
    } else if (gameState.arkAnimals.length === 10) {
        bonusXP = 150;
        showNotification('🎉 10 Animals in Ark! +150 Bonus XP!');
    } else if (gameState.arkAnimals.length === gameState.arkMaxCapacity) {
        bonusXP = 300;
        showNotification('🎉 ARK COMPLETE! +300 BONUS XP!');
    }

    addXP(xpReward + bonusXP);

    updateMissionProgress('ark', {});
    showNotification(`${animal.emoji} ${animal.name} added to ark! +${xpReward + bonusXP} XP`);
    sounds.play('success');

    if (typeof initializeArkSlots === 'function') {
        initializeArkSlots();
    }
    checkAchievements();
    updateHUD();
    renderHintsPanel();
    saveGame();
}

// ============================================================================
// FASTER RESOURCE REGENERATION
// ============================================================================

function enhancedResourceRegeneration() {
    setInterval(() => {
        // Faster regen - every 30 seconds instead of 60
        // More generous amounts - 3 per tick instead of 1
        gameState.resources.water = Math.min(gameState.resources.water + 3, 300); // Higher cap
        gameState.resources.food = Math.min(gameState.resources.food + 3, 300);
        gameState.resources.oxygen = Math.min(gameState.resources.oxygen + 3, 300);

        // Passive credit income
        gameState.resources.credits += 2;

        // Track playtime
        gameState.player.playTimeMinutes++;
        const hours = Math.floor(gameState.player.playTimeMinutes / 60);
        const minutes = gameState.player.playTimeMinutes % 60;
        const playTimeEl = document.getElementById('playTime');
        if (playTimeEl) {
            playTimeEl.textContent = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
        }

        updateHUD();
        updateMissionProgress('resources', {});
    }, 30000); // Every 30 seconds instead of 60
}

// ============================================================================
// FULL INTERACTIVE TUTORIAL
// ============================================================================

function showFullTutorial() {
    document.getElementById('gameModalContent').innerHTML = `
        <h2 style="text-align: center; margin-bottom: 30px;">📖 How to Play Mars Ark Explorer</h2>

        <div style="max-height: 500px; overflow-y: auto; padding-right: 10px;">
            <div class="edu-card">
                <div class="edu-title">🔍 Discovering Animals</div>
                <div class="edu-content">
                    <p><strong>1.</strong> Go to the <strong>Discover</strong> tab</p>
                    <p><strong>2.</strong> Click on any <strong>unlocked</strong> animal (not grayed out)</p>
                    <p><strong>3.</strong> Earn <strong>+30 XP</strong> and <strong>+15 Credits</strong> per discovery!</p>
                    <p><strong>Tip:</strong> Discovering animals is FREE and the fastest way to earn XP!</p>
                </div>
            </div>

            <div class="edu-card">
                <div class="edu-title">🚀 Building Your Ark</div>
                <div class="edu-content">
                    <p><strong>1.</strong> Discover animals first</p>
                    <p><strong>2.</strong> Go to <strong>Build Ark</strong> tab</p>
                    <p><strong>3.</strong> Click empty slots to add discovered animals</p>
                    <p><strong>Cost:</strong> 5 water, 5 food, 5 oxygen per animal</p>
                    <p><strong>Reward:</strong> +50 XP per animal + big bonuses!</p>
                </div>
            </div>

            <div class="edu-card">
                <div class="edu-title">🎮 Earning Resources</div>
                <div class="edu-content">
                    <p><strong>Free Methods:</strong></p>
                    <ul style="list-style: none; padding-left: 0;">
                        <li>✅ Discover animals (+5 of each resource)</li>
                        <li>✅ Wait for regeneration (+3 every 30 seconds)</li>
                        <li>✅ Daily login bonus (50+ of each!)</li>
                        <li>✅ Level up rewards (+20 of each)</li>
                    </ul>
                    <p><strong>Active Methods:</strong></p>
                    <ul style="list-style: none; padding-left: 0;">
                        <li>🎮 Play mini-games for credits</li>
                        <li>📋 Complete missions for big rewards</li>
                        <li>🏆 Unlock achievements</li>
                    </ul>
                </div>
            </div>

            <div class="edu-card">
                <div class="edu-title">💰 Earning Credits & XP</div>
                <div class="edu-content">
                    <p><strong>Best XP Sources:</strong></p>
                    <ul style="list-style: none; padding-left: 0;">
                        <li>🔍 Discover animals: +30 XP (FREE!)</li>
                        <li>🚀 Add to ark: +50 XP</li>
                        <li>📋 Complete missions: +80-200 XP</li>
                        <li>🎮 Win mini-games: +100-150 XP</li>
                    </ul>
                    <p><strong>Best Credit Sources:</strong></p>
                    <ul style="list-style: none; padding-left: 0;">
                        <li>🔍 Discover animals: +15 credits</li>
                        <li>🧠 Trivia: +10 per correct answer</li>
                        <li>📋 Missions: +25-50 credits</li>
                        <li>⏰ Passive income: +2 every 30 seconds</li>
                    </ul>
                </div>
            </div>

            <div class="edu-card">
                <div class="edu-title">🎯 Progression Tips</div>
                <div class="edu-content">
                    <p><strong>Early Game (Levels 1-5):</strong></p>
                    <p>Focus on discovering ALL unlocked animals first - it's free XP!</p>

                    <p><strong>Mid Game (Levels 6-15):</strong></p>
                    <p>Complete missions, play mini-games, build your ark</p>

                    <p><strong>Late Game (Level 15+):</strong></p>
                    <p>Boss challenges, complete story, max out ark</p>
                </div>
            </div>

            <div class="edu-card">
                <div class="edu-title">⚡ Quick Start Guide</div>
                <div class="edu-content">
                    <p><strong>What to do RIGHT NOW:</strong></p>
                    <ol>
                        <li>Discover all 10 starter animals (FREE +300 XP!)</li>
                        <li>Play Animal Trivia 3 times</li>
                        <li>Add 3-5 animals to your ark</li>
                        <li>Check your missions and complete one</li>
                        <li>Come back daily for login bonuses!</li>
                    </ol>
                </div>
            </div>
        </div>

        <div style="text-align: center; margin-top: 30px;">
            <button class="btn-primary" onclick="closeModal('gameModal')">Let's Play!</button>
        </div>
    `;

    document.getElementById('gameModal').style.display = 'block';
}

// ============================================================================
// PROGRESS TRACKING PANEL
// ============================================================================

function renderProgressPanel() {
    const container = document.getElementById('progressContainer');
    if (!container) return;

    const nextLevel = gameState.player.level + 1;
    const xpNeeded = calculateXPForLevel(gameState.player.level);
    const xpProgress = (gameState.player.xp / xpNeeded) * 100;

    const nextUnlockLevel = Math.ceil((gameState.player.level + 1) / 2) * 2;
    const nextChapterLevel = Math.ceil((gameState.player.level + 1) / 3) * 3;

    container.innerHTML = `
        <div class="panel-title">📈 Next Unlocks</div>
        <div style="font-size: 0.9rem;">
            <div style="margin-bottom: 15px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                    <span><strong>Level ${nextLevel}</strong></span>
                    <span style="color: #4ECDC4;">${gameState.player.xp} / ${xpNeeded} XP</span>
                </div>
                <div style="background: rgba(0,0,0,0.3); height: 8px; border-radius: 4px; overflow: hidden;">
                    <div style="height: 100%; background: linear-gradient(90deg, #4ECDC4, #44A08D); width: ${xpProgress}%;"></div>
                </div>
            </div>

            <div style="background: rgba(78, 205, 196, 0.2); padding: 12px; border-radius: 8px; margin-bottom: 8px;">
                <div style="font-weight: bold; margin-bottom: 5px;">🔓 Level ${nextUnlockLevel}</div>
                <div style="font-size: 0.85rem; opacity: 0.9;">3 New Animals Unlocked!</div>
            </div>

            ${nextChapterLevel <= 10 ? `
                <div style="background: rgba(255, 215, 61, 0.2); padding: 12px; border-radius: 8px; margin-bottom: 8px;">
                    <div style="font-weight: bold; margin-bottom: 5px;">📖 Level ${nextChapterLevel}</div>
                    <div style="font-size: 0.85rem; opacity: 0.9;">Story Chapter ${Math.floor(nextChapterLevel / 3) + 1} Unlocked!</div>
                </div>
            ` : ''}

            ${[10, 20, 30].includes(nextLevel) || [10, 20, 30].includes(nextLevel + 1) ? `
                <div style="background: rgba(255, 107, 107, 0.3); padding: 12px; border-radius: 8px;">
                    <div style="font-weight: bold; margin-bottom: 5px;">⚔️ Level ${[10, 20, 30].find(l => l >= nextLevel)}</div>
                    <div style="font-size: 0.85rem; opacity: 0.9;">Boss Challenge Available!</div>
                </div>
            ` : ''}
        </div>
    `;
}

// ============================================================================
// INITIALIZATION
// ============================================================================

function initGameplayEnhancements() {
    // Apply enhanced starting state for new players
    enhanceGameState();

    // Check daily login
    checkDailyLogin();

    // Render helpful panels
    renderHintsPanel();
    renderProgressPanel();

    // Update hints periodically
    setInterval(() => {
        renderHintsPanel();
        renderProgressPanel();
    }, 30000); // Every 30 seconds

    // Start enhanced resource regeneration
    enhancedResourceRegeneration();

    console.log('✨ Gameplay enhancements initialized!');
}

// Override original functions with enhanced versions
if (typeof discoverAnimal !== 'undefined') {
    const _originalDiscover = discoverAnimal;
    discoverAnimal = function(animalId) {
        enhancedDiscoverAnimal(animalId);
    };
}

if (typeof addToArk !== 'undefined') {
    const _originalAddToArk = addToArk;
    addToArk = function(animalId) {
        enhancedAddToArk(animalId);
    };
}

// Start enhancements
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGameplayEnhancements);
} else {
    initGameplayEnhancements();
}
