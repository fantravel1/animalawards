/**
 * MARS ARK EXPLORER - New Mini-Games
 * Memory Match, Animal Sounds Quiz, Size Comparison
 */

// ============================================================================
// MEMORY MATCH GAME
// ============================================================================

let memoryGameState = {
    cards: [],
    flipped: [],
    matched: [],
    moves: 0,
    startTime: null
};

function startMemoryMatch() {
    // Select 8 random animals for 16 cards (8 pairs)
    const animals = [...animalDatabase]
        .sort(() => Math.random() - 0.5)
        .slice(0, 8);

    // Create pairs
    const cardAnimals = [...animals, ...animals]
        .sort(() => Math.random() - 0.5);

    memoryGameState = {
        cards: cardAnimals.map((animal, index) => ({
            id: index,
            animal,
            flipped: false,
            matched: false
        })),
        flipped: [],
        matched: [],
        moves: 0,
        startTime: Date.now()
    };

    renderMemoryGame();
    document.getElementById('gameModal').style.display = 'block';
    gameState.stats.gamesPlayed++;
}

function renderMemoryGame() {
    document.getElementById('gameModalContent').innerHTML = `
        <h2 style="text-align: center; margin-bottom: 20px;">🎴 Memory Match</h2>

        <div style="display: flex; justify-content: space-around; margin-bottom: 30px;">
            <div style="text-align: center;">
                <div style="font-size: 1.5rem; font-weight: bold; color: #4ECDC4;">
                    ${memoryGameState.moves}
                </div>
                <div style="font-size: 0.9rem; opacity: 0.8;">Moves</div>
            </div>
            <div style="text-align: center;">
                <div style="font-size: 1.5rem; font-weight: bold; color: #FFD93D;">
                    ${memoryGameState.matched.length / 2} / 8
                </div>
                <div style="font-size: 0.9rem; opacity: 0.8;">Pairs Found</div>
            </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; max-width: 500px; margin: 0 auto;">
            ${memoryGameState.cards.map((card, index) => `
                <div class="memory-card ${card.flipped || card.matched ? 'flipped' : ''}"
                     onclick="flipMemoryCard(${index})"
                     style="aspect-ratio: 1; background: ${card.matched ? 'linear-gradient(45deg, #4ECDC4, #44A08D)' : 'linear-gradient(45deg, #667eea, #764ba2)'};
                            border-radius: 10px; display: flex; align-items: center; justify-content: center;
                            cursor: ${card.matched ? 'default' : 'pointer'}; transition: all 0.3s ease;
                            transform-style: preserve-3d; transform: ${card.flipped || card.matched ? 'rotateY(180deg)' : 'rotateY(0deg)'};">
                    <div style="transform: rotateY(180deg); font-size: 2.5rem;">
                        ${card.flipped || card.matched ? card.animal.emoji : '❓'}
                    </div>
                </div>
            `).join('')}
        </div>

        <div style="text-align: center; margin-top: 30px;">
            <button class="btn-secondary" onclick="closeModal('gameModal')">Exit</button>
        </div>
    `;
}

function flipMemoryCard(index) {
    const card = memoryGameState.cards[index];

    // Can't flip if already flipped, matched, or two cards already flipped
    if (card.flipped || card.matched || memoryGameState.flipped.length >= 2) {
        return;
    }

    card.flipped = true;
    memoryGameState.flipped.push(index);
    sounds.play('unlock');

    renderMemoryGame();

    if (memoryGameState.flipped.length === 2) {
        memoryGameState.moves++;
        checkMemoryMatch();
    }
}

function checkMemoryMatch() {
    const [index1, index2] = memoryGameState.flipped;
    const card1 = memoryGameState.cards[index1];
    const card2 = memoryGameState.cards[index2];

    setTimeout(() => {
        if (card1.animal.id === card2.animal.id) {
            // Match!
            card1.matched = true;
            card2.matched = true;
            memoryGameState.matched.push(index1, index2);
            sounds.play('success');

            // Check if game complete
            if (memoryGameState.matched.length === memoryGameState.cards.length) {
                completeMemoryGame();
            }
        } else {
            // No match
            card1.flipped = false;
            card2.flipped = false;
            sounds.play('error');
        }

        memoryGameState.flipped = [];
        renderMemoryGame();
    }, 800);
}

function completeMemoryGame() {
    const timeElapsed = Math.floor((Date.now() - memoryGameState.startTime) / 1000);
    const moves = memoryGameState.moves;

    // Calculate score based on moves and time
    const perfectMoves = 8; // Minimum possible
    const movesScore = Math.max(0, 100 - (moves - perfectMoves) * 5);
    const timeScore = Math.max(0, 100 - timeElapsed * 2);
    const finalScore = Math.floor((movesScore + timeScore) / 2);

    const xpReward = Math.floor(50 + finalScore);
    const creditReward = Math.floor(20 + finalScore / 2);

    addXP(xpReward);
    gameState.resources.credits += creditReward;

    setTimeout(() => {
        document.getElementById('gameModalContent').innerHTML = `
            <h2 style="text-align: center; margin-bottom: 30px;">🎉 Memory Master!</h2>

            <div style="text-align: center; margin-bottom: 30px;">
                <div style="font-size: 3rem; margin-bottom: 20px;">🏆</div>
                <div style="font-size: 1.5rem; margin-bottom: 10px;">Score: ${finalScore}/100</div>
            </div>

            <div style="background: rgba(78, 205, 196, 0.2); padding: 20px; border-radius: 10px; margin-bottom: 30px;">
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
                    <div style="text-align: center;">
                        <div style="font-size: 1.3rem; color: #4ECDC4;">⏱️ ${timeElapsed}s</div>
                        <div style="font-size: 0.9rem; opacity: 0.8;">Time</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 1.3rem; color: #4ECDC4;">🎯 ${moves}</div>
                        <div style="font-size: 0.9rem; opacity: 0.8;">Moves</div>
                    </div>
                </div>
            </div>

            <div style="text-align: center; color: #4ECDC4; font-size: 1.2rem; margin-bottom: 30px;">
                +${xpReward} XP • +${creditReward} Credits
            </div>

            <div style="text-align: center;">
                <button class="btn-primary" onclick="startMemoryMatch()">Play Again</button>
                <button class="btn-secondary" onclick="closeModal('gameModal')" style="margin-left: 10px;">Exit</button>
            </div>
        `;

        if (typeof visualEffects !== 'undefined') {
            visualEffects.celebrateMilestone();
        }
    }, 1000);

    checkAchievements();
    saveGame();
}

// ============================================================================
// ANIMAL SOUNDS QUIZ
// ============================================================================

const ANIMAL_SOUNDS = [
    { animal: 'Lion', sound: 'ROAR', emoji: '🦁', description: 'A deep, powerful roar that can be heard from 5 miles away' },
    { animal: 'Elephant', sound: 'TRUMPET', emoji: '🐘', description: 'A loud trumpeting call made through their trunk' },
    { animal: 'Wolf', sound: 'HOWL', emoji: '🐺', description: 'A long, haunting howl used to communicate with the pack' },
    { animal: 'Dolphin', sound: 'CLICK-WHISTLE', emoji: '🐬', description: 'High-pitched clicks and whistles for echolocation' },
    { animal: 'Owl', sound: 'HOOT', emoji: '🦉', description: 'A soft hooting sound, usually heard at night' },
    { animal: 'Whale', sound: 'SONG', emoji: '🐋', description: 'Complex songs that can travel hundreds of miles underwater' },
    { animal: 'Frog', sound: 'RIBBIT', emoji: '🐸', description: 'A croaking sound made by inflating their vocal sac' },
    { animal: 'Snake', sound: 'HISS', emoji: '🐍', description: 'A sharp hissing sound as a warning to predators' },
    { animal: 'Bear', sound: 'GROWL', emoji: '🐻', description: 'A deep, rumbling growl when threatened' },
    { animal: 'Bird', sound: 'CHIRP', emoji: '🐦', description: 'Short, high-pitched chirping sounds' },
    { animal: 'Cat', sound: 'MEOW', emoji: '🐱', description: 'A soft meowing sound to communicate' },
    { animal: 'Dog', sound: 'BARK', emoji: '🐕', description: 'A sharp barking sound for various purposes' }
];

let soundQuizState = {
    currentRound: 0,
    score: 0,
    questions: []
};

function startAnimalSoundsQuiz() {
    soundQuizState = {
        currentRound: 0,
        score: 0,
        questions: [...ANIMAL_SOUNDS].sort(() => Math.random() - 0.5).slice(0, 5)
    };

    renderSoundQuiz();
    document.getElementById('gameModal').style.display = 'block';
    gameState.stats.gamesPlayed++;
}

function renderSoundQuiz() {
    const question = soundQuizState.questions[soundQuizState.currentRound];

    if (!question) {
        completeSoundQuiz();
        return;
    }

    // Create options (correct answer + 3 random wrong answers)
    const wrongOptions = ANIMAL_SOUNDS
        .filter(a => a.animal !== question.animal)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

    const options = [question, ...wrongOptions].sort(() => Math.random() - 0.5);

    document.getElementById('gameModalContent').innerHTML = `
        <h2 style="text-align: center; margin-bottom: 20px;">🔊 Animal Sounds Quiz</h2>

        <div style="text-align: center; margin-bottom: 30px;">
            <div style="font-size: 0.9rem; opacity: 0.8; margin-bottom: 10px;">
                Round ${soundQuizState.currentRound + 1} / ${soundQuizState.questions.length}
            </div>
            <div style="font-size: 1.2rem; color: #FFD93D;">
                Score: ${soundQuizState.score} / ${soundQuizState.currentRound}
            </div>
        </div>

        <div style="background: linear-gradient(45deg, rgba(78, 205, 196, 0.3), rgba(68, 160, 141, 0.3));
                    padding: 30px; border-radius: 15px; margin-bottom: 30px; text-align: center;">
            <div style="font-size: 3rem; margin-bottom: 15px;">🔊</div>
            <div style="font-size: 1.5rem; margin-bottom: 15px; font-weight: bold;">
                "${question.sound}"
            </div>
            <div style="font-size: 1.1rem; opacity: 0.9;">
                ${question.description}
            </div>
        </div>

        <div style="margin-bottom: 20px;">
            <h3 style="text-align: center; margin-bottom: 20px;">Which animal makes this sound?</h3>
            <div class="quiz-options">
                ${options.map(opt => `
                    <button class="quiz-option" onclick="answerSoundQuiz('${opt.animal}', '${question.animal}')">
                        <span style="font-size: 2rem; margin-right: 10px;">${opt.emoji}</span>
                        ${opt.animal}
                    </button>
                `).join('')}
            </div>
        </div>
    `;
}

function answerSoundQuiz(selected, correct) {
    const isCorrect = selected === correct;

    if (isCorrect) {
        soundQuizState.score++;
        sounds.play('success');
    } else {
        sounds.play('error');
    }

    soundQuizState.currentRound++;

    setTimeout(() => {
        renderSoundQuiz();
    }, 500);
}

function completeSoundQuiz() {
    const totalQuestions = soundQuizState.questions.length;
    const percentage = (soundQuizState.score / totalQuestions) * 100;
    const passed = percentage >= 60;

    const xpReward = passed ? 80 : 40;
    const creditReward = passed ? 35 : 15;

    addXP(xpReward);
    gameState.resources.credits += creditReward;

    document.getElementById('gameModalContent').innerHTML = `
        <h2 style="text-align: center; margin-bottom: 30px;">
            ${passed ? '🎉 Great Listening!' : '🎧 Keep Practicing!'}
        </h2>

        <div style="text-align: center; margin-bottom: 30px;">
            <div style="font-size: 4rem; margin-bottom: 15px;">
                ${percentage >= 80 ? '🏆' : percentage >= 60 ? '⭐' : '📚'}
            </div>
            <div style="font-size: 2rem; margin-bottom: 10px;">
                ${soundQuizState.score} / ${totalQuestions}
            </div>
            <div style="font-size: 1.2rem; opacity: 0.9;">
                ${Math.floor(percentage)}% Correct
            </div>
        </div>

        <div style="text-align: center; color: #4ECDC4; font-size: 1.2rem; margin-bottom: 30px;">
            +${xpReward} XP • +${creditReward} Credits
        </div>

        <div style="text-align: center;">
            <button class="btn-primary" onclick="startAnimalSoundsQuiz()">Play Again</button>
            <button class="btn-secondary" onclick="closeModal('gameModal')" style="margin-left: 10px;">Exit</button>
        </div>
    `;

    if (passed && typeof visualEffects !== 'undefined') {
        visualEffects.celebrateAchievement();
    }

    checkAchievements();
    saveGame();
}

// ============================================================================
// SIZE COMPARISON GAME
// ============================================================================

const SIZE_DATA = [
    { name: 'Blue Whale', size: 30, unit: 'meters', emoji: '🐋', weight: '200 tons' },
    { name: 'African Elephant', size: 4, unit: 'meters', emoji: '🐘', weight: '6 tons' },
    { name: 'Giraffe', size: 5.5, unit: 'meters', emoji: '🦒', weight: '1.2 tons' },
    { name: 'Lion', size: 2, unit: 'meters', emoji: '🦁', weight: '190 kg' },
    { name: 'Human', size: 1.7, unit: 'meters', emoji: '🧍', weight: '70 kg' },
    { name: 'Dog', size: 0.6, unit: 'meters', emoji: '🐕', weight: '30 kg' },
    { name: 'Cat', size: 0.25, unit: 'meters', emoji: '🐱', weight: '4 kg' },
    { name: 'Rabbit', size: 0.4, unit: 'meters', emoji: '🐰', weight: '2 kg' },
    { name: 'Bee', size: 0.015, unit: 'meters', emoji: '🐝', weight: '0.1 g' },
    { name: 'Ant', size: 0.005, unit: 'meters', emoji: '🐜', weight: '0.001 g' }
];

let sizeGameState = {
    currentRound: 0,
    score: 0,
    totalRounds: 5
};

function startSizeComparison() {
    sizeGameState = {
        currentRound: 0,
        score: 0,
        totalRounds: 5
    };

    renderSizeComparison();
    document.getElementById('gameModal').style.display = 'block';
    gameState.stats.gamesPlayed++;
}

function renderSizeComparison() {
    if (sizeGameState.currentRound >= sizeGameState.totalRounds) {
        completeSizeGame();
        return;
    }

    // Pick two random animals
    const shuffled = [...SIZE_DATA].sort(() => Math.random() - 0.5);
    const animal1 = shuffled[0];
    const animal2 = shuffled[1];

    document.getElementById('gameModalContent').innerHTML = `
        <h2 style="text-align: center; margin-bottom: 20px;">📏 Size Comparison</h2>

        <div style="text-align: center; margin-bottom: 30px;">
            <div style="font-size: 0.9rem; opacity: 0.8; margin-bottom: 5px;">
                Round ${sizeGameState.currentRound + 1} / ${sizeGameState.totalRounds}
            </div>
            <div style="font-size: 1.2rem; color: #4ECDC4;">
                Score: ${sizeGameState.score}
            </div>
        </div>

        <h3 style="text-align: center; margin-bottom: 30px;">Which animal is LARGER?</h3>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; max-width: 500px; margin: 0 auto 30px;">
            <div class="quiz-option" onclick="answerSizeComparison(${animal1.size}, ${animal2.size})"
                 style="padding: 30px; text-align: center; cursor: pointer;">
                <div style="font-size: 4rem; margin-bottom: 15px;">${animal1.emoji}</div>
                <div style="font-size: 1.3rem; font-weight: bold; margin-bottom: 10px;">${animal1.name}</div>
                <div style="font-size: 0.9rem; opacity: 0.8;">Weight: ${animal1.weight}</div>
            </div>

            <div class="quiz-option" onclick="answerSizeComparison(${animal2.size}, ${animal1.size})"
                 style="padding: 30px; text-align: center; cursor: pointer;">
                <div style="font-size: 4rem; margin-bottom: 15px;">${animal2.emoji}</div>
                <div style="font-size: 1.3rem; font-weight: bold; margin-bottom: 10px;">${animal2.name}</div>
                <div style="font-size: 0.9rem; opacity: 0.8;">Weight: ${animal2.weight}</div>
            </div>
        </div>

        <div style="text-align: center; opacity: 0.7; font-size: 0.9rem;">
            💡 Tip: Consider both length and weight!
        </div>
    `;
}

function answerSizeComparison(selectedSize, otherSize) {
    const isCorrect = selectedSize > otherSize;

    if (isCorrect) {
        sizeGameState.score++;
        sounds.play('success');
    } else {
        sounds.play('error');
    }

    sizeGameState.currentRound++;

    setTimeout(() => {
        renderSizeComparison();
    }, 500);
}

function completeSizeGame() {
    const percentage = (sizeGameState.score / sizeGameState.totalRounds) * 100;
    const xpReward = 50 + sizeGameState.score * 15;
    const creditReward = 20 + sizeGameState.score * 8;

    addXP(xpReward);
    gameState.resources.credits += creditReward;

    document.getElementById('gameModalContent').innerHTML = `
        <h2 style="text-align: center; margin-bottom: 30px;">
            ${percentage >= 80 ? '🎉 Size Expert!' : percentage >= 60 ? '📏 Good Eye!' : '📚 Keep Learning!'}
        </h2>

        <div style="text-align: center; margin-bottom: 30px;">
            <div style="font-size: 3rem; margin-bottom: 15px;">
                ${percentage >= 80 ? '🏆' : percentage >= 60 ? '⭐' : '📖'}
            </div>
            <div style="font-size: 2rem; margin-bottom: 10px;">
                ${sizeGameState.score} / ${sizeGameState.totalRounds}
            </div>
            <div style="font-size: 1.2rem; opacity: 0.9;">
                ${Math.floor(percentage)}% Correct
            </div>
        </div>

        <div style="text-align: center; color: #4ECDC4; font-size: 1.2rem; margin-bottom: 30px;">
            +${xpReward} XP • +${creditReward} Credits
        </div>

        <div style="text-align: center;">
            <button class="btn-primary" onclick="startSizeComparison()">Play Again</button>
            <button class="btn-secondary" onclick="closeModal('gameModal')" style="margin-left: 10px;">Exit</button>
        </div>
    `;

    if (percentage >= 80 && typeof visualEffects !== 'undefined') {
        visualEffects.celebrateAchievement();
    }

    checkAchievements();
    saveGame();
}

console.log('🎮 New mini-games loaded: Memory Match, Sound Quiz, Size Comparison');
