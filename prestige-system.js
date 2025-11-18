/**
 * MARS ARK EXPLORER - Prestige & Ark Upgrade System
 * Long-term progression and permanent bonuses
 */

// ============================================================================
// PRESTIGE SYSTEM
// ============================================================================

// Add prestige data to game state
if (!gameState.prestige) {
    gameState.prestige = {
        level: 0,
        totalPrestiges: 0,
        permanentBonuses: {
            xpMultiplier: 1.0,
            resourceMultiplier: 1.0,
            creditMultiplier: 1.0,
            startingResources: 0,
            unlockSpeed: 0
        }
    };
}

function canPrestige() {
    return gameState.player.level >= 30 && gameState.arkAnimals.length >= 20;
}

function showPrestigeModal() {
    if (!canPrestige()) {
        showNotification('Reach Level 30 and fill your ark to prestige!');
        sounds.play('error');
        return;
    }

    const nextBonuses = calculatePrestigeBonuses(gameState.prestige.level + 1);

    document.getElementById('gameModalContent').innerHTML = `
        <div style="text-align: center; margin-bottom: 30px;">
            <div style="font-size: 6rem; margin-bottom: 20px;">👑</div>
            <h2 style="font-size: 2rem; margin-bottom: 15px;">Prestige System</h2>
            <div style="font-size: 1.2rem; opacity: 0.9;">
                Current Prestige Level: ${gameState.prestige.level}
            </div>
        </div>

        <div style="background: linear-gradient(45deg, rgba(255, 215, 61, 0.3), rgba(255, 107, 107, 0.3));
                    padding: 25px; border-radius: 15px; margin-bottom: 30px;">
            <h3 style="text-align: center; margin-bottom: 20px;">⚠️ Warning: Prestige Reset</h3>
            <p style="text-align: center; margin-bottom: 15px;">
                Prestiging will reset your:
            </p>
            <ul style="list-style: none; padding: 0; text-align: center;">
                <li>❌ Level → 1</li>
                <li>❌ Discovered Animals</li>
                <li>❌ Ark Animals</li>
                <li>❌ Resources (keep 50%)</li>
                <li>❌ Missions Progress</li>
            </ul>
        </div>

        <div style="background: linear-gradient(45deg, rgba(78, 205, 196, 0.3), rgba(68, 160, 141, 0.3));
                    padding: 25px; border-radius: 15px; margin-bottom: 30px;">
            <h3 style="text-align: center; margin-bottom: 20px;">✨ Permanent Bonuses (Next Level)</h3>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
                <div style="text-align: center; padding: 15px; background: rgba(0, 0, 0, 0.2); border-radius: 10px;">
                    <div style="font-size: 1.5rem; color: #4ECDC4; margin-bottom: 5px;">
                        +${((nextBonuses.xpMultiplier - 1) * 100).toFixed(0)}%
                    </div>
                    <div style="font-size: 0.9rem;">XP Gain</div>
                </div>
                <div style="text-align: center; padding: 15px; background: rgba(0, 0, 0, 0.2); border-radius: 10px;">
                    <div style="font-size: 1.5rem; color: #4ECDC4; margin-bottom: 5px;">
                        +${((nextBonuses.resourceMultiplier - 1) * 100).toFixed(0)}%
                    </div>
                    <div style="font-size: 0.9rem;">Resources</div>
                </div>
                <div style="text-align: center; padding: 15px; background: rgba(0, 0, 0, 0.2); border-radius: 10px;">
                    <div style="font-size: 1.5rem; color: #4ECDC4; margin-bottom: 5px;">
                        +${((nextBonuses.creditMultiplier - 1) * 100).toFixed(0)}%
                    </div>
                    <div style="font-size: 0.9rem;">Credits</div>
                </div>
                <div style="text-align: center; padding: 15px; background: rgba(0, 0, 0, 0.2); border-radius: 10px;">
                    <div style="font-size: 1.5rem; color: #4ECDC4; margin-bottom: 5px;">
                        +${nextBonuses.startingResources}
                    </div>
                    <div style="font-size: 0.9rem;">Start Resources</div>
                </div>
            </div>
        </div>

        <div style="text-align: center;">
            <button class="btn-primary" onclick="performPrestige()" style="font-size: 1.2rem; padding: 15px 40px;">
                👑 PRESTIGE NOW
            </button>
            <button class="btn-secondary" onclick="closeModal('gameModal')" style="margin-left: 10px;">
                Cancel
            </button>
        </div>
    `;

    document.getElementById('gameModal').style.display = 'block';
}

function calculatePrestigeBonuses(prestigeLevel) {
    return {
        xpMultiplier: 1 + (prestigeLevel * 0.1), // +10% per prestige
        resourceMultiplier: 1 + (prestigeLevel * 0.05), // +5% per prestige
        creditMultiplier: 1 + (prestigeLevel * 0.15), // +15% per prestige
        startingResources: prestigeLevel * 100, // +100 each per prestige
        unlockSpeed: prestigeLevel // Unlock animals faster
    };
}

function performPrestige() {
    if (!confirm('Are you SURE? This will reset most of your progress!')) {
        return;
    }

    // Calculate new prestige bonuses
    gameState.prestige.level++;
    gameState.prestige.totalPrestiges++;
    gameState.prestige.permanentBonuses = calculatePrestigeBonuses(gameState.prestige.level);

    // Keep 50% of resources
    const halfResources = {
        water: Math.floor(gameState.resources.water * 0.5),
        food: Math.floor(gameState.resources.food * 0.5),
        oxygen: Math.floor(gameState.resources.oxygen * 0.5),
        credits: Math.floor(gameState.resources.credits * 0.5)
    };

    // Add prestige starting bonus
    const startBonus = gameState.prestige.permanentBonuses.startingResources;

    // Reset progress
    gameState.player.level = 1;
    gameState.player.xp = 0;
    gameState.player.rank = 'Cadet Explorer';
    gameState.discoveredAnimals = new Set();
    gameState.unlockedAnimals = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    gameState.arkAnimals = [];
    gameState.activeMissions = [];
    gameState.completedMissions = new Set();
    gameState.resources = {
        water: halfResources.water + startBonus,
        food: halfResources.food + startBonus,
        oxygen: halfResources.oxygen + startBonus,
        credits: halfResources.credits
    };

    // Keep achievements, story progress, and stats
    // These are permanent

    saveGame();
    sounds.play('achievement');

    if (typeof visualEffects !== 'undefined') {
        visualEffects.celebrateMilestone();
    }

    document.getElementById('gameModalContent').innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 8rem; margin-bottom: 30px;">👑</div>
            <h2 style="font-size: 2.5rem; margin-bottom: 20px;">PRESTIGE ${gameState.prestige.level}!</h2>
            <div style="font-size: 1.3rem; margin-bottom: 40px; opacity: 0.9;">
                You are now permanently stronger!
            </div>

            <div style="background: linear-gradient(45deg, rgba(78, 205, 196, 0.3), rgba(68, 160, 141, 0.3));
                        padding: 30px; border-radius: 15px; margin-bottom: 30px;">
                <h3 style="margin-bottom: 20px;">🌟 Your Permanent Bonuses</h3>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; font-size: 1.1rem;">
                    <div>✨ +${((gameState.prestige.permanentBonuses.xpMultiplier - 1) * 100).toFixed(0)}% XP</div>
                    <div>💎 +${((gameState.prestige.permanentBonuses.creditMultiplier - 1) * 100).toFixed(0)}% Credits</div>
                    <div>🌊 +${((gameState.prestige.permanentBonuses.resourceMultiplier - 1) * 100).toFixed(0)}% Resources</div>
                    <div>🚀 +${gameState.prestige.permanentBonuses.startingResources} Start</div>
                </div>
            </div>

            <button class="btn-primary" onclick="closeModal('gameModal'); location.reload();">
                Start New Journey
            </button>
        </div>
    `;

    // Reinitialize game systems
    setTimeout(() => {
        initializeMissions();
        renderAnimalGrid();
        renderAchievements();
        updateHUD();
    }, 1000);
}

// ============================================================================
// ARK UPGRADE SYSTEM
// ============================================================================

const ARK_UPGRADES = {
    capacity: {
        name: 'Ark Capacity',
        icon: '📦',
        levels: [
            { cost: 500, bonus: 5, description: '+5 ark slots' },
            { cost: 1000, bonus: 5, description: '+5 more slots' },
            { cost: 2000, bonus: 10, description: '+10 more slots' },
            { cost: 5000, bonus: 10, description: '+10 more slots' }
        ]
    },
    lifeSupport: {
        name: 'Life Support',
        icon: '💨',
        levels: [
            { cost: 400, bonus: 0.1, description: '-10% ark costs' },
            { cost: 800, bonus: 0.1, description: '-10% more costs' },
            { cost: 1600, bonus: 0.15, description: '-15% more costs' }
        ]
    },
    research: {
        name: 'Research Lab',
        icon: '🔬',
        levels: [
            { cost: 600, bonus: 0.2, description: '+20% discovery XP' },
            { cost: 1200, bonus: 0.2, description: '+20% more XP' },
            { cost: 2400, bonus: 0.3, description: '+30% more XP' }
        ]
    },
    habitat: {
        name: 'Habitat Quality',
        icon: '🌳',
        levels: [
            { cost: 800, bonus: 2, description: '+2 resource regen' },
            { cost: 1600, bonus: 3, description: '+3 more regen' },
            { cost: 3200, bonus: 5, description: '+5 more regen' }
        ]
    }
};

if (!gameState.arkUpgrades) {
    gameState.arkUpgrades = {
        capacity: 0,
        lifeSupport: 0,
        research: 0,
        habitat: 0
    };
}

function showArkUpgrades() {
    document.getElementById('gameModalContent').innerHTML = `
        <h2 style="text-align: center; margin-bottom: 30px;">🚀 Ark Upgrades</h2>

        <div style="text-align: center; margin-bottom: 30px;">
            <div style="font-size: 1.5rem; color: #FFD93D;">
                💰 Credits: ${gameState.resources.credits.toLocaleString()}
            </div>
        </div>

        <div style="max-height: 500px; overflow-y: auto; padding-right: 10px;">
            ${Object.entries(ARK_UPGRADES).map(([key, upgrade]) => {
                const currentLevel = gameState.arkUpgrades[key] || 0;
                const nextLevel = upgrade.levels[currentLevel];
                const maxLevel = currentLevel >= upgrade.levels.length;

                return `
                    <div style="background: rgba(255, 255, 255, 0.1); padding: 20px; border-radius: 15px; margin-bottom: 20px;
                                border: 2px solid ${maxLevel ? '#4ECDC4' : 'rgba(78, 205, 196, 0.3)'};">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                            <div>
                                <div style="font-size: 1.5rem; margin-bottom: 5px;">
                                    ${upgrade.icon} ${upgrade.name}
                                </div>
                                <div style="font-size: 0.9rem; opacity: 0.8;">
                                    Level ${currentLevel} / ${upgrade.levels.length}
                                </div>
                            </div>
                            ${maxLevel ? `
                                <div style="background: #4ECDC4; padding: 10px 20px; border-radius: 20px; font-weight: bold;">
                                    MAX LEVEL
                                </div>
                            ` : ''}
                        </div>

                        ${!maxLevel ? `
                            <div style="background: rgba(0, 0, 0, 0.3); padding: 15px; border-radius: 10px; margin-bottom: 15px;">
                                <div style="margin-bottom: 10px;">${nextLevel.description}</div>
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <div style="color: #FFD93D; font-size: 1.1rem;">
                                        💰 ${nextLevel.cost} Credits
                                    </div>
                                    <button class="btn-primary"
                                            onclick="purchaseArkUpgrade('${key}')"
                                            ${gameState.resources.credits < nextLevel.cost ? 'disabled' : ''}
                                            style="${gameState.resources.credits < nextLevel.cost ? 'opacity: 0.5; cursor: not-allowed;' : ''}">
                                        Upgrade
                                    </button>
                                </div>
                            </div>
                        ` : `
                            <div style="background: rgba(78, 205, 196, 0.2); padding: 15px; border-radius: 10px; text-align: center;">
                                ✅ Fully Upgraded!
                            </div>
                        `}
                    </div>
                `;
            }).join('')}
        </div>

        <div style="text-align: center; margin-top: 30px;">
            <button class="btn-secondary" onclick="closeModal('gameModal')">Close</button>
        </div>
    `;

    document.getElementById('gameModal').style.display = 'block';
}

function purchaseArkUpgrade(upgradeKey) {
    const upgrade = ARK_UPGRADES[upgradeKey];
    const currentLevel = gameState.arkUpgrades[upgradeKey] || 0;
    const nextLevel = upgrade.levels[currentLevel];

    if (!nextLevel) {
        showNotification('Already at max level!');
        return;
    }

    if (gameState.resources.credits < nextLevel.cost) {
        showNotification('Not enough credits!');
        sounds.play('error');
        return;
    }

    // Purchase upgrade
    gameState.resources.credits -= nextLevel.cost;
    gameState.arkUpgrades[upgradeKey]++;

    // Apply upgrade effects
    applyArkUpgrade(upgradeKey, nextLevel.bonus);

    sounds.play('achievement');
    if (typeof visualEffects !== 'undefined') {
        visualEffects.celebrateAchievement();
    }

    showNotification(`🚀 ${upgrade.name} upgraded!`);
    saveGame();
    updateHUD();

    // Refresh the upgrade screen
    showArkUpgrades();
}

function applyArkUpgrade(upgradeKey, bonus) {
    switch(upgradeKey) {
        case 'capacity':
            gameState.arkMaxCapacity += bonus;
            if (typeof initializeArkSlots === 'function') {
                initializeArkSlots();
            }
            break;

        case 'lifeSupport':
            // Reduce ark costs (applied in addToArk function)
            break;

        case 'research':
            // Increase discovery XP (applied in discoverAnimal function)
            break;

        case 'habitat':
            // Increase resource regeneration (applied in resource regen function)
            break;
    }
}

function getArkUpgradeBonus(upgradeKey) {
    const level = gameState.arkUpgrades[upgradeKey] || 0;
    const upgrade = ARK_UPGRADES[upgradeKey];

    let total = 0;
    for (let i = 0; i < level && i < upgrade.levels.length; i++) {
        total += upgrade.levels[i].bonus;
    }

    return total;
}

// Add prestige indicator to HUD
function addPrestigeIndicator() {
    const hud = document.querySelector('.hud');
    if (hud && gameState.prestige && gameState.prestige.level > 0) {
        const indicator = document.createElement('div');
        indicator.style.cssText = `
            background: linear-gradient(45deg, #FFD93D, #FF6B6B);
            padding: 8px 15px;
            border-radius: 20px;
            font-weight: bold;
            display: flex;
            align-items: center;
            gap: 8px;
        `;
        indicator.innerHTML = `<span>👑</span><span>Prestige ${gameState.prestige.level}</span>`;

        if (!document.getElementById('prestigeIndicator')) {
            indicator.id = 'prestigeIndicator';
            hud.appendChild(indicator);
        }
    }
}

// Initialize on load
setTimeout(addPrestigeIndicator, 1000);

console.log('👑 Prestige & Ark Upgrade systems loaded!');
