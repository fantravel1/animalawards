/**
 * MARS ARK EXPLORER - Enhanced Game Engine v2.0
 * Educational Animal Adventure Game with Extended Features
 *
 * This file extends game.js with sound effects, daily challenges,
 * and enhanced functions. It does NOT redeclare gameState or other
 * constants - those are defined in game.js.
 */

// ============================================================================
// SOUND EFFECTS SYSTEM
// ============================================================================

const sounds = {
    enabled: true,
    context: null,

    init() {
        if (!this.context && gameState.settings && gameState.settings.soundEnabled) {
            this.context = new (window.AudioContext || window.webkitAudioContext)();
        }
    },

    play(type) {
        if (!gameState.settings || !gameState.settings.soundEnabled || !this.context) return;

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

// ============================================================================
// DAILY CHALLENGES (Unique to enhanced version)
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

function updateDailyChallenge(type, amount = 1) {
    if (!gameState.dailyChallenge || gameState.dailyChallenge.completed) return;

    const challenge = gameState.dailyChallenge;

    if (
        (type === 'discover' && challenge.type === 'speed_discover') ||
        (type === 'trivia' && challenge.type === 'trivia_master') ||
        (type === 'resources' && challenge.type === 'resource_collector')
    ) {
        challenge.progress += amount;

        if (challenge.progress >= challenge.target && !challenge.completed) {
            challenge.completed = true;
            gameState.stats.dailyChallengesCompleted++;
            addXP(challenge.rewards.xp);
            gameState.resources.credits += challenge.rewards.credits;
            sounds.play('achievement');
            showNotification(`🎉 Daily Challenge Complete: ${challenge.title}!`);
        }

        renderDailyChallenge();
        saveGame();
    }
}

// ============================================================================
// ENHANCED FUNCTIONS (Override base game.js functions with sound support)
// ============================================================================

// Store original levelUp function reference
const _originalLevelUp = typeof levelUp === 'function' ? levelUp : null;

// Enhanced levelUp with sound
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

    // Play sound effect
    sounds.play('levelup');
    showNotification(`🎉 Level Up! Now Level ${gameState.player.level}`);
    checkAchievements();
}

// Store original completeMission function reference
const _originalCompleteMission = typeof completeMission === 'function' ? completeMission : null;

// Enhanced completeMission with sound
function completeMission(mission) {
    gameState.completedMissions.add(mission.id);
    gameState.stats.missionsCompleted++;

    addXP(mission.rewards.xp);
    gameState.resources.credits += mission.rewards.credits;

    // Play sound effect
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

// Store original unlockAchievement function reference
const _originalUnlockAchievement = typeof unlockAchievement === 'function' ? unlockAchievement : null;

// Enhanced unlockAchievement with sound
function unlockAchievement(achievement) {
    gameState.unlockedAchievements.add(achievement.id);
    sounds.play('achievement');
    showNotification(`🏆 Achievement Unlocked: ${achievement.name}`);
    addXP(50);
    gameState.resources.credits += 25;
    renderAchievements();
    saveGame();
}

// ============================================================================
// SETTINGS MANAGEMENT
// ============================================================================

function showSettings() {
    const modal = document.getElementById('gameModal');
    const content = document.getElementById('gameModalContent');

    if (!modal || !content) return;

    content.innerHTML = `
        <h2 style="text-align: center; margin-bottom: 30px;">⚙️ Settings</h2>

        <div style="max-width: 400px; margin: 0 auto;">
            <div style="background: rgba(255, 255, 255, 0.1); padding: 20px; border-radius: 10px; margin-bottom: 15px;">
                <label style="display: flex; align-items: center; justify-content: space-between; cursor: pointer;">
                    <span>🔊 Sound Effects</span>
                    <input type="checkbox" id="soundToggle" ${gameState.settings.soundEnabled ? 'checked' : ''}
                           onchange="toggleSound()" style="width: 20px; height: 20px;">
                </label>
            </div>

            <div style="background: rgba(255, 255, 255, 0.1); padding: 20px; border-radius: 10px; margin-bottom: 15px;">
                <label style="display: flex; align-items: center; justify-content: space-between; cursor: pointer;">
                    <span>🎵 Music</span>
                    <input type="checkbox" id="musicToggle" ${gameState.settings.musicEnabled ? 'checked' : ''}
                           onchange="toggleMusic()" style="width: 20px; height: 20px;">
                </label>
            </div>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.2);">
                <h3 style="margin-bottom: 15px;">Game Data</h3>
                <button onclick="exportSave()" class="btn-secondary" style="width: 100%; margin-bottom: 10px;">
                    📤 Export Save
                </button>
                <button onclick="importSave()" class="btn-secondary" style="width: 100%; margin-bottom: 10px;">
                    📥 Import Save
                </button>
                <button onclick="confirmReset()" class="btn-primary" style="width: 100%; background: linear-gradient(45deg, #f44336, #e91e63);">
                    🗑️ Reset Game
                </button>
            </div>
        </div>
    `;

    modal.style.display = 'block';
}

function toggleSound() {
    gameState.settings.soundEnabled = !gameState.settings.soundEnabled;
    if (gameState.settings.soundEnabled) {
        sounds.init();
        sounds.play('success');
    }
    saveGame();
}

function toggleMusic() {
    gameState.settings.musicEnabled = !gameState.settings.musicEnabled;
    saveGame();
}

function exportSave() {
    const saveData = localStorage.getItem('marsArkSave');
    if (saveData) {
        const blob = new Blob([saveData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'mars-ark-save.json';
        a.click();
        URL.revokeObjectURL(url);
        showNotification('📤 Save exported successfully!');
    }
}

function importSave() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    JSON.parse(event.target.result); // Validate JSON
                    localStorage.setItem('marsArkSave', event.target.result);
                    showNotification('📥 Save imported! Reloading...');
                    setTimeout(() => location.reload(), 1500);
                } catch (err) {
                    showNotification('❌ Invalid save file');
                }
            };
            reader.readAsText(file);
        }
    };
    input.click();
}

function confirmReset() {
    if (confirm('Are you sure you want to reset ALL game progress? This cannot be undone!')) {
        localStorage.removeItem('marsArkSave');
        showNotification('🗑️ Game reset! Reloading...');
        setTimeout(() => location.reload(), 1500);
    }
}

// ============================================================================
// INITIALIZATION HOOK
// ============================================================================

// Initialize enhanced features when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize sounds (will be enabled on user interaction)
    sounds.init();

    // Initialize daily challenge
    initializeDailyChallenge();
    renderDailyChallenge();
});
