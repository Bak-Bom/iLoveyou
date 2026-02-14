class AnimationController {
    constructor() {
        this.animations = [];
        this.isRunning = false;
        this.rafId = null;
    }

    add(animation) {
        this.animations.push(animation);
        if (!this.isRunning) {
            this.start();
        }
    }

    remove(animation) {
        const index = this.animations.indexOf(animation);
        if (index > -1) {
            this.animations.splice(index, 1);
        }
        
        if (this.animations.length === 0) {
            this.stop();
        }
    }

    start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.animate();
    }

    stop() {
        this.isRunning = false;
        if (this.rafId) {
            cancelAnimationFrame(this.rafId);
            this.rafId = null;
        }
    }

    animate() {
        if (!this.isRunning) return;
        
        this.animations.forEach(anim => {
            if (typeof anim.update === 'function') {
                anim.update();
            }
        });
        
        this.rafId = requestAnimationFrame(() => this.animate());
    }
}

class HeartAnimation {
    constructor(container) {
        this.container = container || document.body;
        this.hearts = [];
        this.maxHearts = 50;
        this.spawnRate = 0.3;
    }

    update() {
        if (Math.random() < this.spawnRate && this.hearts.length < this.maxHearts) {
            this.createHeart();
        }

        this.hearts = this.hearts.filter(heart => {
            if (!heart.element || !heart.element.parentElement) {
                return false;
            }
            
            heart.y -= heart.speed;
            heart.rotation += heart.rotationSpeed;
            heart.scale = 0.5 + Math.sin(heart.pulse) * 0.2;
            heart.pulse += 0.1;
            
            heart.element.style.transform = `
                translateX(${heart.x}px)
                translateY(${heart.y}px)
                scale(${heart.scale})
                rotate(${heart.rotation}deg)
            `;
            
            heart.element.style.opacity = Math.max(0, Math.min(1, heart.opacity));
            
            if (heart.y < -100) {
                heart.element.remove();
                return false;
            }
            
            return true;
        });
    }

    createHeart() {
        const emojis = ['❤️', '💕', '💖', '💗', '💓', '💝', '💘', '💞'];
        const heart = document.createElement('div');
        heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        heart.style.cssText = `
            position: fixed;
            pointer-events: none;
            z-index: 9998;
            font-size: ${20 + Math.random() * 30}px;
        `;
        
        this.container.appendChild(heart);
        
        this.hearts.push({
            element: heart,
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 50,
            speed: 1 + Math.random() * 2,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 4,
            scale: 1,
            pulse: 0,
            opacity: 0.7 + Math.random() * 0.3
        });
    }

    destroy() {
        this.hearts.forEach(heart => {
            if (heart.element) {
                heart.element.remove();
            }
        });
        this.hearts = [];
    }
}

class SparkleAnimation {
    constructor(container) {
        this.container = container || document.body;
        this.sparkles = [];
        this.maxSparkles = 30;
    }

    update() {
        if (Math.random() < 0.2 && this.sparkles.length < this.maxSparkles) {
            this.createSparkle();
        }

        this.sparkles = this.sparkles.filter(sparkle => {
            if (!sparkle.element || !sparkle.element.parentElement) {
                return false;
            }
            
            sparkle.life -= 0.02;
            sparkle.scale = sparkle.life;
            sparkle.rotation += 10;
            
            sparkle.element.style.transform = `
                translateX(${sparkle.x}px)
                translateY(${sparkle.y}px)
                scale(${sparkle.scale})
                rotate(${sparkle.rotation}deg)
            `;
            
            sparkle.element.style.opacity = sparkle.life;
            
            if (sparkle.life <= 0) {
                sparkle.element.remove();
                return false;
            }
            
            return true;
        });
    }

    createSparkle() {
        const sparkle = document.createElement('div');
        sparkle.textContent = '✨';
        sparkle.style.cssText = `
            position: fixed;
            pointer-events: none;
            z-index: 9997;
            font-size: ${15 + Math.random() * 20}px;
        `;
        
        this.container.appendChild(sparkle);
        
        this.sparkles.push({
            element: sparkle,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            life: 1,
            scale: 1,
            rotation: 0
        });
    }

    destroy() {
        this.sparkles.forEach(sparkle => {
            if (sparkle.element) {
                sparkle.element.remove();
            }
        });
        this.sparkles = [];
    }
}

class RoseAnimation {
    constructor(container) {
        this.container = container || document.body;
        this.roses = [];
        this.maxRoses = 20;
        this.spawnRate = 0.1;
    }

    update() {
        if (Math.random() < this.spawnRate && this.roses.length < this.maxRoses) {
            this.createRose();
        }

        this.roses = this.roses.filter(rose => {
            if (!rose.element || !rose.element.parentElement) {
                return false;
            }
            
            rose.y += rose.speed;
            rose.x += Math.sin(rose.swing) * 2;
            rose.swing += 0.05;
            rose.rotation += rose.rotationSpeed;
            
            rose.element.style.transform = `
                translateX(${rose.x}px)
                translateY(${rose.y}px)
                rotate(${rose.rotation}deg)
            `;
            
            if (rose.y > window.innerHeight + 100) {
                rose.element.remove();
                return false;
            }
            
            return true;
        });
    }

    createRose() {
        const rose = document.createElement('div');
        rose.textContent = '🌹';
        rose.style.cssText = `
            position: fixed;
            pointer-events: none;
            z-index: 9996;
            font-size: ${30 + Math.random() * 20}px;
            opacity: 0.8;
        `;
        
        this.container.appendChild(rose);
        
        this.roses.push({
            element: rose,
            x: Math.random() * window.innerWidth,
            y: -100,
            speed: 0.8 + Math.random() * 1,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 3,
            swing: 0
        });
    }

    destroy() {
        this.roses.forEach(rose => {
            if (rose.element) {
                rose.element.remove();
            }
        });
        this.roses = [];
    }
}

class ButterflyAnimation {
    constructor(container) {
        this.container = container || document.body;
        this.butterflies = [];
        this.maxButterflies = 10;
        this.spawnRate = 0.05;
    }

    update() {
        if (Math.random() < this.spawnRate && this.butterflies.length < this.maxButterflies) {
            this.createButterfly();
        }

        this.butterflies = this.butterflies.filter(butterfly => {
            if (!butterfly.element || !butterfly.element.parentElement) {
                return false;
            }
            
            butterfly.x += butterfly.vx;
            butterfly.y += butterfly.vy;
            
            butterfly.vy += Math.sin(butterfly.flutter) * 0.3;
            butterfly.flutter += 0.1;
            
            butterfly.scale = 1 + Math.sin(butterfly.flutter * 2) * 0.2;
            
            butterfly.element.style.transform = `
                translateX(${butterfly.x}px)
                translateY(${butterfly.y}px)
                scale(${butterfly.scale})
            `;
            
            if (butterfly.x > window.innerWidth + 100 || butterfly.x < -100 ||
                butterfly.y > window.innerHeight + 100 || butterfly.y < -100) {
                butterfly.element.remove();
                return false;
            }
            
            return true;
        });
    }

    createButterfly() {
        const butterfly = document.createElement('div');
        butterfly.textContent = '🦋';
        butterfly.style.cssText = `
            position: fixed;
            pointer-events: none;
            z-index: 9995;
            font-size: ${30 + Math.random() * 20}px;
        `;
        
        this.container.appendChild(butterfly);
        
        const startSide = Math.random() < 0.5 ? -100 : window.innerWidth + 100;
        
        this.butterflies.push({
            element: butterfly,
            x: startSide,
            y: Math.random() * window.innerHeight,
            vx: startSide < 0 ? 2 : -2,
            vy: (Math.random() - 0.5) * 2,
            flutter: 0,
            scale: 1
        });
    }

    destroy() {
        this.butterflies.forEach(butterfly => {
            if (butterfly.element) {
                butterfly.element.remove();
            }
        });
        this.butterflies = [];
    }
}

class ParticleExplosion {
    constructor(x, y, color = '#ff69b4', particleCount = 50) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.particleCount = particleCount;
        this.particles = [];
        this.active = true;
        
        this.init();
    }

    init() {
        for (let i = 0; i < this.particleCount; i++) {
            const angle = (Math.PI * 2 * i) / this.particleCount;
            const speed = 3 + Math.random() * 5;
            
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 6px;
                height: 6px;
                background: ${this.color};
                border-radius: 50%;
                left: ${this.x}px;
                top: ${this.y}px;
                z-index: 99999;
                pointer-events: none;
            `;
            
            document.body.appendChild(particle);
            
            this.particles.push({
                element: particle,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1
            });
        }
    }

    update() {
        if (!this.active) return false;
        
        this.particles = this.particles.filter(p => {
            if (!p.element || !p.element.parentElement) return false;
            
            const rect = p.element.getBoundingClientRect();
            const x = rect.left + p.vx;
            const y = rect.top + p.vy;
            
            p.vy += 0.2;
            p.life -= 0.02;
            
            p.element.style.left = x + 'px';
            p.element.style.top = y + 'px';
            p.element.style.opacity = p.life;
            p.element.style.transform = `scale(${p.life})`;
            
            if (p.life <= 0) {
                p.element.remove();
                return false;
            }
            
            return true;
        });
        
        if (this.particles.length === 0) {
            this.active = false;
            return false;
        }
        
        return true;
    }

    destroy() {
        this.particles.forEach(p => {
            if (p.element) {
                p.element.remove();
            }
        });
        this.particles = [];
        this.active = false;
    }
}

class TextFloater {
    constructor(text, x, y, options = {}) {
        this.text = text;
        this.x = x;
        this.y = y;
        this.fontSize = options.fontSize || 40;
        this.color = options.color || '#fff';
        this.duration = options.duration || 2000;
        this.element = null;
        
        this.init();
    }

    init() {
        this.element = document.createElement('div');
        this.element.textContent = this.text;
        this.element.style.cssText = `
            position: fixed;
            left: ${this.x}px;
            top: ${this.y}px;
            font-size: ${this.fontSize}px;
            color: ${this.color};
            font-weight: bold;
            z-index: 99999;
            pointer-events: none;
            text-shadow: 0 0 20px rgba(255, 105, 180, 0.8),
                         0 4px 10px rgba(0, 0, 0, 0.5);
        `;
        
        document.body.appendChild(this.element);
        
        this.element.animate([
            {
                transform: 'translate(-50%, -50%) scale(0)',
                opacity: 0
            },
            {
                transform: 'translate(-50%, -100px) scale(1)',
                opacity: 1,
                offset: 0.3
            },
            {
                transform: 'translate(-50%, -200px) scale(0.8)',
                opacity: 0
            }
        ], {
            duration: this.duration,
            easing: 'ease-out'
        });
        
        setTimeout(() => this.destroy(), this.duration);
    }

    destroy() {
        if (this.element) {
            this.element.remove();
            this.element = null;
        }
    }
}

const animController = new AnimationController();

function initAmbientAnimations() {
    const heartAnim = new HeartAnimation();
    const sparkleAnim = new SparkleAnimation();
    const roseAnim = new RoseAnimation();
    const butterflyAnim = new ButterflyAnimation();
    
    animController.add(heartAnim);
    animController.add(sparkleAnim);
    animController.add(roseAnim);
    animController.add(butterflyAnim);
    
    window.heartAnim = heartAnim;
    window.sparkleAnim = sparkleAnim;
    window.roseAnim = roseAnim;
    window.butterflyAnim = butterflyAnim;
}

function createCustomExplosion(x, y, type = 'hearts') {
    const explosions = {
        hearts: () => {
            const hearts = ['❤️', '💕', '💖', '💗', '💓', '💝', '💘', '💞'];
            for (let i = 0; i < 40; i++) {
                setTimeout(() => {
                    const heart = document.createElement('div');
                    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
                    heart.style.cssText = `
                        position: fixed;
                        left: ${x}px;
                        top: ${y}px;
                        font-size: ${25 + Math.random() * 35}px;
                        z-index: 99999;
                        pointer-events: none;
                    `;
                    
                    document.body.appendChild(heart);
                    
                    const angle = (Math.PI * 2 * i) / 40;
                    const distance = 100 + Math.random() * 200;
                    
                    heart.animate([
                        { transform: 'translate(-50%, -50%) scale(0)', opacity: 0 },
                        { transform: `translate(calc(-50% + ${Math.cos(angle) * distance}px), calc(-50% + ${Math.sin(angle) * distance}px)) scale(1)`, opacity: 1, offset: 0.5 },
                        { transform: `translate(calc(-50% + ${Math.cos(angle) * distance * 1.2}px), calc(-50% + ${Math.sin(angle) * distance * 1.2}px)) scale(0)`, opacity: 0 }
                    ], {
                        duration: 2000,
                        easing: 'ease-out'
                    });
                    
                    setTimeout(() => heart.remove(), 2000);
                }, i * 20);
            }
        },
        
        stars: () => {
            for (let i = 0; i < 30; i++) {
                const star = document.createElement('div');
                star.textContent = '⭐';
                star.style.cssText = `
                    position: fixed;
                    left: ${x}px;
                    top: ${y}px;
                    font-size: ${20 + Math.random() * 30}px;
                    z-index: 99999;
                    pointer-events: none;
                `;
                
                document.body.appendChild(star);
                
                const angle = (Math.PI * 2 * i) / 30;
                const distance = 80 + Math.random() * 150;
                
                star.animate([
                    { transform: 'translate(-50%, -50%) scale(0) rotate(0deg)', opacity: 0 },
                    { transform: `translate(calc(-50% + ${Math.cos(angle) * distance}px), calc(-50% + ${Math.sin(angle) * distance}px)) scale(1) rotate(720deg)`, opacity: 1 }
                ], {
                    duration: 1500,
                    easing: 'ease-out'
                });
                
                setTimeout(() => star.remove(), 1500);
            }
        },
        
        confetti: () => {
            for (let i = 0; i < 60; i++) {
                const confetti = document.createElement('div');
                confetti.style.cssText = `
                    position: fixed;
                    left: ${x}px;
                    top: ${y}px;
                    width: ${8 + Math.random() * 8}px;
                    height: ${16 + Math.random() * 16}px;
                    background: hsl(${Math.random() * 360}, 70%, 60%);
                    z-index: 99999;
                    pointer-events: none;
                `;
                
                document.body.appendChild(confetti);
                
                const angle = (Math.PI * 2 * i) / 60;
                const distance = 120 + Math.random() * 180;
                const rotation = Math.random() * 720;
                
                confetti.animate([
                    { transform: 'translate(-50%, -50%) scale(1) rotate(0deg)', opacity: 1 },
                    { transform: `translate(calc(-50% + ${Math.cos(angle) * distance}px), calc(-50% + ${Math.sin(angle) * distance}px)) scale(1) rotate(${rotation}deg)`, opacity: 1, offset: 0.7 },
                    { transform: `translate(calc(-50% + ${Math.cos(angle) * distance}px), calc(-50% + ${Math.sin(angle) * distance + 200}px)) scale(0.5) rotate(${rotation + 360}deg)`, opacity: 0 }
                ], {
                    duration: 3000,
                    easing: 'ease-out'
                });
                
                setTimeout(() => confetti.remove(), 3000);
            }
        }
    };
    
    if (explosions[type]) {
        explosions[type]();
    }
}

if (typeof window !== 'undefined') {
    window.AnimationController = AnimationController;
    window.HeartAnimation = HeartAnimation;
    window.SparkleAnimation = SparkleAnimation;
    window.RoseAnimation = RoseAnimation;
    window.ButterflyAnimation = ButterflyAnimation;
    window.ParticleExplosion = ParticleExplosion;
    window.TextFloater = TextFloater;
    window.animController = animController;
    window.initAmbientAnimations = initAmbientAnimations;
    window.createCustomExplosion = createCustomExplosion;
}

console.log('Animation Controller Loaded 🎨');