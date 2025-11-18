/**
 * MARS ARK EXPLORER - Visual Effects & Animations
 * Particles, transitions, celebrations, and eye candy
 */

// ============================================================================
// PARTICLE SYSTEM
// ============================================================================

class ParticleSystem {
    constructor() {
        this.particles = [];
        this.canvas = this.createCanvas();
        this.ctx = this.canvas.getContext('2d');
        this.animate();
    }

    createCanvas() {
        const canvas = document.createElement('canvas');
        canvas.id = 'particle-canvas';
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9999;
        `;
        document.body.appendChild(canvas);
        this.resizeCanvas(canvas);
        window.addEventListener('resize', () => this.resizeCanvas(canvas));
        return canvas;
    }

    resizeCanvas(canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    createParticle(x, y, type = 'sparkle') {
        const configs = {
            sparkle: {
                count: 20,
                colors: ['#FFD93D', '#FF6B6B', '#4ECDC4', '#FFFFFF'],
                size: () => Math.random() * 4 + 2,
                velocity: () => ({
                    x: (Math.random() - 0.5) * 8,
                    y: (Math.random() - 0.5) * 8
                }),
                life: 60,
                shape: 'circle'
            },
            explosion: {
                count: 30,
                colors: ['#FFD93D', '#FF6B6B', '#4ECDC4'],
                size: () => Math.random() * 6 + 3,
                velocity: () => ({
                    x: (Math.random() - 0.5) * 12,
                    y: (Math.random() - 0.5) * 12
                }),
                life: 80,
                shape: 'circle'
            },
            confetti: {
                count: 50,
                colors: ['#FFD93D', '#FF6B6B', '#4ECDC4', '#764ba2', '#667eea'],
                size: () => Math.random() * 8 + 4,
                velocity: () => ({
                    x: (Math.random() - 0.5) * 10,
                    y: Math.random() * -15 - 5
                }),
                life: 120,
                shape: 'rect',
                gravity: 0.3,
                rotation: () => Math.random() * Math.PI * 2
            },
            hearts: {
                count: 15,
                colors: ['#FF6B6B', '#FFB6C1'],
                size: () => Math.random() * 12 + 8,
                velocity: () => ({
                    x: (Math.random() - 0.5) * 3,
                    y: Math.random() * -8 - 4
                }),
                life: 100,
                shape: 'heart',
                gravity: -0.1
            },
            stars: {
                count: 25,
                colors: ['#FFD93D', '#FFFFFF', '#4ECDC4'],
                size: () => Math.random() * 8 + 4,
                velocity: () => ({
                    x: (Math.random() - 0.5) * 6,
                    y: (Math.random() - 0.5) * 6
                }),
                life: 90,
                shape: 'star'
            }
        };

        const config = configs[type] || configs.sparkle;

        for (let i = 0; i < config.count; i++) {
            this.particles.push({
                x,
                y,
                vx: config.velocity().x,
                vy: config.velocity().y,
                color: config.colors[Math.floor(Math.random() * config.colors.length)],
                size: config.size(),
                life: config.life,
                maxLife: config.life,
                shape: config.shape,
                gravity: config.gravity || 0,
                rotation: config.rotation ? config.rotation() : 0,
                rotationSpeed: (Math.random() - 0.5) * 0.3
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles = this.particles.filter(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += p.gravity;
            p.life--;
            p.rotation += p.rotationSpeed;

            const alpha = p.life / p.maxLife;
            this.ctx.globalAlpha = alpha;

            this.ctx.save();
            this.ctx.translate(p.x, p.y);
            this.ctx.rotate(p.rotation);

            switch (p.shape) {
                case 'circle':
                    this.ctx.fillStyle = p.color;
                    this.ctx.beginPath();
                    this.ctx.arc(0, 0, p.size, 0, Math.PI * 2);
                    this.ctx.fill();
                    break;

                case 'rect':
                    this.ctx.fillStyle = p.color;
                    this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
                    break;

                case 'star':
                    this.drawStar(0, 0, 5, p.size, p.size / 2, p.color);
                    break;

                case 'heart':
                    this.drawHeart(0, 0, p.size, p.color);
                    break;
            }

            this.ctx.restore();
            this.ctx.globalAlpha = 1;

            return p.life > 0;
        });

        requestAnimationFrame(() => this.animate());
    }

    drawStar(cx, cy, spikes, outerRadius, innerRadius, color) {
        let rot = Math.PI / 2 * 3;
        let x = cx;
        let y = cy;
        const step = Math.PI / spikes;

        this.ctx.beginPath();
        this.ctx.moveTo(cx, cy - outerRadius);

        for (let i = 0; i < spikes; i++) {
            x = cx + Math.cos(rot) * outerRadius;
            y = cy + Math.sin(rot) * outerRadius;
            this.ctx.lineTo(x, y);
            rot += step;

            x = cx + Math.cos(rot) * innerRadius;
            y = cy + Math.sin(rot) * innerRadius;
            this.ctx.lineTo(x, y);
            rot += step;
        }

        this.ctx.lineTo(cx, cy - outerRadius);
        this.ctx.closePath();
        this.ctx.fillStyle = color;
        this.ctx.fill();
    }

    drawHeart(cx, cy, size, color) {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        const topCurveHeight = size * 0.3;
        this.ctx.moveTo(cx, cy + topCurveHeight);
        this.ctx.bezierCurveTo(
            cx, cy,
            cx - size / 2, cy,
            cx - size / 2, cy + topCurveHeight
        );
        this.ctx.bezierCurveTo(
            cx - size / 2, cy + (size + topCurveHeight) / 2,
            cx, cy + (size + topCurveHeight) / 1.2,
            cx, cy + size
        );
        this.ctx.bezierCurveTo(
            cx, cy + (size + topCurveHeight) / 1.2,
            cx + size / 2, cy + (size + topCurveHeight) / 2,
            cx + size / 2, cy + topCurveHeight
        );
        this.ctx.bezierCurveTo(
            cx + size / 2, cy,
            cx, cy,
            cx, cy + topCurveHeight
        );
        this.ctx.closePath();
        this.ctx.fill();
    }
}

const particleSystem = new ParticleSystem();

// Helper functions
function createParticlesAt(element, type = 'sparkle') {
    const rect = element.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    particleSystem.createParticle(x, y, type);
}

function createParticlesAtPosition(x, y, type = 'sparkle') {
    particleSystem.createParticle(x, y, type);
}

// ============================================================================
// ANIMATED COUNTERS
// ============================================================================

function animateCounter(element, from, to, duration = 500) {
    const start = performance.now();
    const range = to - from;

    function update(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutQuad(progress);
        const current = Math.floor(from + range * eased);

        element.textContent = current.toLocaleString();

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = to.toLocaleString();
        }
    }

    requestAnimationFrame(update);
}

function easeOutQuad(t) {
    return t * (2 - t);
}

// ============================================================================
// CELEBRATION ANIMATIONS
// ============================================================================

function celebrateLevelUp() {
    // Screen flash
    const flash = document.createElement('div');
    flash.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle, rgba(78, 205, 196, 0.5) 0%, transparent 70%);
        pointer-events: none;
        z-index: 9998;
        animation: flashFade 0.8s ease-out;
    `;
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 800);

    // Confetti from multiple points
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const x = window.innerWidth * (0.2 + i * 0.15);
            const y = window.innerHeight * 0.3;
            createParticlesAtPosition(x, y, 'confetti');
        }, i * 100);
    }

    // Play level up sound
    if (typeof sounds !== 'undefined') {
        sounds.play('levelup');
    }
}

function celebrateAchievement() {
    // Stars burst
    const x = window.innerWidth / 2;
    const y = window.innerHeight / 2;
    createParticlesAtPosition(x, y, 'stars');

    setTimeout(() => {
        createParticlesAtPosition(x, y, 'sparkle');
    }, 200);

    if (typeof sounds !== 'undefined') {
        sounds.play('achievement');
    }
}

function celebrateDiscovery(element) {
    createParticlesAt(element, 'sparkle');

    // Add bounce animation to element
    element.style.animation = 'none';
    setTimeout(() => {
        element.style.animation = 'discoveryBounce 0.6s ease-out';
    }, 10);
}

function celebrateMilestone() {
    // Rainbow confetti explosion
    const x = window.innerWidth / 2;
    const y = window.innerHeight / 2;

    createParticlesAtPosition(x, y, 'confetti');
    setTimeout(() => createParticlesAtPosition(x, y, 'stars'), 150);
    setTimeout(() => createParticlesAtPosition(x, y, 'hearts'), 300);
}

// ============================================================================
// SMOOTH TRANSITIONS
// ============================================================================

function fadeIn(element, duration = 300) {
    element.style.opacity = '0';
    element.style.display = 'block';
    element.style.transition = `opacity ${duration}ms ease-in`;

    setTimeout(() => {
        element.style.opacity = '1';
    }, 10);
}

function fadeOut(element, duration = 300) {
    element.style.transition = `opacity ${duration}ms ease-out`;
    element.style.opacity = '0';

    setTimeout(() => {
        element.style.display = 'none';
    }, duration);
}

function slideIn(element, direction = 'up', duration = 400) {
    const transforms = {
        up: 'translateY(20px)',
        down: 'translateY(-20px)',
        left: 'translateX(20px)',
        right: 'translateX(-20px)'
    };

    element.style.opacity = '0';
    element.style.transform = transforms[direction];
    element.style.display = 'block';
    element.style.transition = `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`;

    setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translate(0, 0)';
    }, 10);
}

// ============================================================================
// CARD FLIP ANIMATION
// ============================================================================

function flipCard(cardElement, frontContent, backContent, onComplete) {
    cardElement.style.transition = 'transform 0.6s';
    cardElement.style.transformStyle = 'preserve-3d';

    // Flip to back
    cardElement.style.transform = 'rotateY(90deg)';

    setTimeout(() => {
        cardElement.innerHTML = backContent;
        cardElement.style.transform = 'rotateY(0deg)';

        if (onComplete) {
            setTimeout(onComplete, 600);
        }
    }, 300);
}

// ============================================================================
// PROGRESS BAR ANIMATIONS
// ============================================================================

function animateProgressBar(element, targetPercent, duration = 800) {
    const start = performance.now();
    const startWidth = parseFloat(element.style.width) || 0;
    const range = targetPercent - startWidth;

    function update(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutQuad(progress);
        const current = startWidth + range * eased;

        element.style.width = current + '%';

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// ============================================================================
// SHAKE ANIMATION
// ============================================================================

function shake(element, intensity = 5) {
    const originalTransform = element.style.transform;
    let shakeCount = 0;
    const maxShakes = 6;

    function doShake() {
        if (shakeCount >= maxShakes) {
            element.style.transform = originalTransform;
            return;
        }

        const x = (Math.random() - 0.5) * intensity * 2;
        const y = (Math.random() - 0.5) * intensity * 2;
        element.style.transform = `translate(${x}px, ${y}px)`;

        shakeCount++;
        setTimeout(doShake, 50);
    }

    doShake();
}

// ============================================================================
// FLOATING ANIMATION
// ============================================================================

function addFloatingAnimation(element) {
    element.style.animation = 'float 3s ease-in-out infinite';
}

// ============================================================================
// GLOW PULSE
// ============================================================================

function pulseGlow(element, color = '#4ECDC4', duration = 1000) {
    const originalBoxShadow = element.style.boxShadow;

    element.style.transition = `box-shadow ${duration}ms ease-in-out`;
    element.style.boxShadow = `0 0 20px ${color}, 0 0 40px ${color}`;

    setTimeout(() => {
        element.style.boxShadow = originalBoxShadow;
    }, duration);
}

// ============================================================================
// NUMBER POP ANIMATION
// ============================================================================

function showFloatingNumber(x, y, text, color = '#4ECDC4') {
    const numberEl = document.createElement('div');
    numberEl.textContent = text;
    numberEl.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        color: ${color};
        font-size: 2rem;
        font-weight: bold;
        pointer-events: none;
        z-index: 10000;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        animation: floatUp 1.5s ease-out forwards;
    `;
    document.body.appendChild(numberEl);

    setTimeout(() => numberEl.remove(), 1500);
}

// ============================================================================
// CSS ANIMATIONS (Inject into page)
// ============================================================================

function injectAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes flashFade {
            0% { opacity: 0; }
            20% { opacity: 1; }
            100% { opacity: 0; }
        }

        @keyframes discoveryBounce {
            0%, 100% { transform: scale(1); }
            25% { transform: scale(1.1); }
            50% { transform: scale(0.95); }
            75% { transform: scale(1.05); }
        }

        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }

        @keyframes floatUp {
            0% {
                opacity: 1;
                transform: translateY(0);
            }
            100% {
                opacity: 0;
                transform: translateY(-100px);
            }
        }

        @keyframes cardEnter {
            from {
                opacity: 0;
                transform: translateY(20px) scale(0.95);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }

        @keyframes shimmer {
            0% {
                background-position: -1000px 0;
            }
            100% {
                background-position: 1000px 0;
            }
        }

        @keyframes pulse {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.05);
            }
        }

        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }

        .card-enter {
            animation: cardEnter 0.4s ease-out;
        }

        .shimmer {
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
            background-size: 1000px 100%;
            animation: shimmer 2s infinite;
        }
    `;
    document.head.appendChild(style);
}

// Initialize animations on load
injectAnimationStyles();

// ============================================================================
// EXPORTS & EVENT LISTENERS
// ============================================================================

// Add entrance animations to cards
document.addEventListener('DOMContentLoaded', () => {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.classList && (
                    node.classList.contains('animal-discovery-card') ||
                    node.classList.contains('panel') ||
                    node.classList.contains('minigame-card')
                )) {
                    node.classList.add('card-enter');
                }
            });
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});

// Export for use in other modules
window.visualEffects = {
    particles: particleSystem,
    createParticlesAt,
    createParticlesAtPosition,
    animateCounter,
    celebrateLevelUp,
    celebrateAchievement,
    celebrateDiscovery,
    celebrateMilestone,
    fadeIn,
    fadeOut,
    slideIn,
    flipCard,
    animateProgressBar,
    shake,
    addFloatingAnimation,
    pulseGlow,
    showFloatingNumber
};

console.log('✨ Visual effects system loaded!');
