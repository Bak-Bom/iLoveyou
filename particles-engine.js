class Particle {
    constructor(x, y, options = {}) {
        this.x = x;
        this.y = y;
        this.vx = options.vx || (Math.random() - 0.5) * 2;
        this.vy = options.vy || (Math.random() - 0.5) * 2;
        this.radius = options.radius || 2;
        this.color = options.color || `hsl(${Math.random() * 360}, 70%, 60%)`;
        this.life = options.life || 1;
        this.maxLife = this.life;
        this.gravity = options.gravity !== undefined ? options.gravity : 0.05;
        this.friction = options.friction !== undefined ? options.friction : 0.99;
        this.alpha = options.alpha !== undefined ? options.alpha : 1;
    }

    update() {
        this.vx *= this.friction;
        this.vy *= this.friction;
        this.vy += this.gravity;
        
        this.x += this.vx;
        this.y += this.vy;
        
        this.life -= 0.01;
        this.alpha = this.life / this.maxLife;
        
        return this.life > 0;
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fill();
        
        ctx.restore();
    }
}

class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.isRunning = false;
    }

    emit(x, y, count = 20, options = {}) {
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
            const speed = options.speed || 2 + Math.random() * 3;
            
            this.particles.push(new Particle(x, y, {
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                radius: options.radius || 2 + Math.random() * 2,
                color: options.color || `hsl(${Math.random() * 360}, 70%, 60%)`,
                life: options.life || 1,
                gravity: options.gravity,
                friction: options.friction
            }));
        }
    }

    update() {
        this.particles = this.particles.filter(particle => particle.update());
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.particles.forEach(particle => particle.draw(this.ctx));
    }

    start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.animate();
    }

    stop() {
        this.isRunning = false;
    }

    animate() {
        if (!this.isRunning) return;
        
        this.update();
        this.draw();
        
        requestAnimationFrame(() => this.animate());
    }

    clear() {
        this.particles = [];
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

class TrailEffect {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.points = [];
        this.maxPoints = 50;
    }

    addPoint(x, y) {
        this.points.push({ x, y, life: 1 });
        
        if (this.points.length > this.maxPoints) {
            this.points.shift();
        }
    }

    update() {
        this.points = this.points.map(point => {
            point.life -= 0.02;
            return point;
        }).filter(point => point.life > 0);
    }

    draw() {
        if (this.points.length < 2) return;
        
        this.ctx.save();
        this.ctx.strokeStyle = 'rgba(255, 105, 180, 0.6)';
        this.ctx.lineWidth = 3;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        
        this.ctx.beginPath();
        this.ctx.moveTo(this.points[0].x, this.points[0].y);
        
        for (let i = 1; i < this.points.length; i++) {
            const point = this.points[i];
            this.ctx.globalAlpha = point.life;
            this.ctx.lineTo(point.x, point.y);
        }
        
        this.ctx.stroke();
        this.ctx.restore();
    }
}

class FireworkParticle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 8;
        this.vy = (Math.random() - 0.5) * 8;
        this.gravity = 0.15;
        this.friction = 0.98;
        this.color = color;
        this.life = 1;
        this.size = 2 + Math.random() * 2;
    }

    update() {
        this.vx *= this.friction;
        this.vy *= this.friction;
        this.vy += this.gravity;
        
        this.x += this.vx;
        this.y += this.vy;
        
        this.life -= 0.015;
        
        return this.life > 0;
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.life;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fill();
        
        ctx.restore();
    }
}

class Firework {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.fireworks = [];
    }

    launch(x, y, color) {
        const colors = color || [
            `hsl(${Math.random() * 360}, 80%, 60%)`,
            `hsl(${Math.random() * 360}, 80%, 60%)`,
            `hsl(${Math.random() * 360}, 80%, 60%)`
        ];
        
        const particles = [];
        const particleCount = 80 + Math.random() * 40;
        
        for (let i = 0; i < particleCount; i++) {
            const particleColor = colors[Math.floor(Math.random() * colors.length)];
            particles.push(new FireworkParticle(x, y, particleColor));
        }
        
        this.fireworks.push(particles);
    }

    update() {
        this.fireworks = this.fireworks.map(particles => {
            return particles.filter(particle => particle.update());
        }).filter(particles => particles.length > 0);
    }

    draw() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.fireworks.forEach(particles => {
            particles.forEach(particle => particle.draw(this.ctx));
        });
    }

    animate() {
        this.update();
        this.draw();
        
        requestAnimationFrame(() => this.animate());
    }

    clear() {
        this.fireworks = [];
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

class ConfettiPiece {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 8;
        this.vy = Math.random() * -15 - 5;
        this.gravity = 0.3;
        this.friction = 0.98;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 15;
        this.width = 8 + Math.random() * 8;
        this.height = 16 + Math.random() * 16;
        this.color = `hsl(${Math.random() * 360}, 70%, 60%)`;
        this.life = 1;
    }

    update() {
        this.vx *= this.friction;
        this.vy *= this.friction;
        this.vy += this.gravity;
        
        this.x += this.vx;
        this.y += this.vy;
        
        this.rotation += this.rotationSpeed;
        
        return this.y < window.innerHeight + 100;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore();
    }
}

class ConfettiCannon {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.confetti = [];
    }

    fire(x, y, count = 50) {
        for (let i = 0; i < count; i++) {
            this.confetti.push(new ConfettiPiece(x, y));
        }
    }

    update() {
        this.confetti = this.confetti.filter(piece => piece.update());
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.confetti.forEach(piece => piece.draw(this.ctx));
    }

    animate() {
        this.update();
        this.draw();
        
        requestAnimationFrame(() => this.animate());
    }

    clear() {
        this.confetti = [];
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

class MagicDust {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.spawnRate = 3;
    }

    emit(x, y) {
        for (let i = 0; i < this.spawnRate; i++) {
            this.particles.push({
                x: x + (Math.random() - 0.5) * 20,
                y: y + (Math.random() - 0.5) * 20,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                life: 1,
                size: 2 + Math.random() * 3,
                color: `hsl(${45 + Math.random() * 30}, 100%, 70%)`
            });
        }
    }

    update() {
        this.particles = this.particles.filter(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.life -= 0.02;
            return p.life > 0;
        });
    }

    draw() {
        this.particles.forEach(p => {
            this.ctx.save();
            this.ctx.globalAlpha = p.life;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = p.color;
            this.ctx.fill();
            
            this.ctx.shadowBlur = 15;
            this.ctx.shadowColor = p.color;
            this.ctx.fill();
            
            this.ctx.restore();
        });
    }

    clear() {
        this.particles = [];
    }
}

class WaveEffect {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.waves = [];
    }

    create(x, y, color = 'rgba(255, 105, 180, 0.5)') {
        this.waves.push({
            x: x,
            y: y,
            radius: 0,
            maxRadius: 200,
            life: 1,
            color: color
        });
    }

    update() {
        this.waves = this.waves.filter(wave => {
            wave.radius += 5;
            wave.life -= 0.02;
            return wave.life > 0 && wave.radius < wave.maxRadius;
        });
    }

    draw() {
        this.waves.forEach(wave => {
            this.ctx.save();
            this.ctx.globalAlpha = wave.life;
            this.ctx.beginPath();
            this.ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
            this.ctx.strokeStyle = wave.color;
            this.ctx.lineWidth = 3;
            this.ctx.stroke();
            this.ctx.restore();
        });
    }

    clear() {
        this.waves = [];
    }
}

class LightningEffect {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.bolts = [];
    }

    strike(x1, y1, x2, y2) {
        const segments = [];
        const numSegments = 20;
        
        for (let i = 0; i <= numSegments; i++) {
            const t = i / numSegments;
            const x = x1 + (x2 - x1) * t + (Math.random() - 0.5) * 30;
            const y = y1 + (y2 - y1) * t + (Math.random() - 0.5) * 30;
            segments.push({ x, y });
        }
        
        this.bolts.push({
            segments: segments,
            life: 1,
            width: 2 + Math.random() * 3
        });
    }

    update() {
        this.bolts = this.bolts.filter(bolt => {
            bolt.life -= 0.1;
            return bolt.life > 0;
        });
    }

    draw() {
        this.bolts.forEach(bolt => {
            this.ctx.save();
            this.ctx.globalAlpha = bolt.life;
            this.ctx.strokeStyle = '#fff';
            this.ctx.lineWidth = bolt.width;
            this.ctx.lineCap = 'round';
            this.ctx.shadowBlur = 20;
            this.ctx.shadowColor = '#fff';
            
            this.ctx.beginPath();
            this.ctx.moveTo(bolt.segments[0].x, bolt.segments[0].y);
            
            for (let i = 1; i < bolt.segments.length; i++) {
                this.ctx.lineTo(bolt.segments[i].x, bolt.segments[i].y);
            }
            
            this.ctx.stroke();
            this.ctx.restore();
        });
    }

    clear() {
        this.bolts = [];
    }
}

class StarField {
    constructor(canvas, numStars = 200) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.stars = [];
        
        for (let i = 0; i < numStars; i++) {
            this.stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2,
                alpha: Math.random(),
                twinkleSpeed: 0.01 + Math.random() * 0.02
            });
        }
    }

    update() {
        this.stars.forEach(star => {
            star.alpha += star.twinkleSpeed;
            
            if (star.alpha >= 1 || star.alpha <= 0) {
                star.twinkleSpeed *= -1;
            }
            
            star.alpha = Math.max(0, Math.min(1, star.alpha));
        });
    }

    draw() {
        this.stars.forEach(star => {
            this.ctx.save();
            this.ctx.globalAlpha = star.alpha;
            this.ctx.beginPath();
            this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = '#fff';
            this.ctx.fill();
            
            if (star.radius > 1) {
                this.ctx.shadowBlur = 5;
                this.ctx.shadowColor = '#fff';
                this.ctx.fill();
            }
            
            this.ctx.restore();
        });
    }
}

class AuroraEffect {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.waves = [];
        this.colors = [
            'rgba(138, 43, 226, 0.3)',
            'rgba(255, 105, 180, 0.3)',
            'rgba(30, 144, 255, 0.3)'
        ];
        
        this.init();
    }

    init() {
        for (let i = 0; i < 3; i++) {
            this.waves.push({
                y: 100 + i * 150,
                amplitude: 50 + Math.random() * 50,
                frequency: 0.002 + Math.random() * 0.001,
                phase: Math.random() * Math.PI * 2,
                speed: 0.02 + Math.random() * 0.01,
                color: this.colors[i]
            });
        }
    }

    update() {
        this.waves.forEach(wave => {
            wave.phase += wave.speed;
        });
    }

    draw() {
        this.waves.forEach(wave => {
            this.ctx.save();
            this.ctx.beginPath();
            
            for (let x = 0; x < this.canvas.width; x += 5) {
                const y = wave.y + Math.sin(x * wave.frequency + wave.phase) * wave.amplitude;
                
                if (x === 0) {
                    this.ctx.moveTo(x, y);
                } else {
                    this.ctx.lineTo(x, y);
                }
            }
            
            this.ctx.lineTo(this.canvas.width, this.canvas.height);
            this.ctx.lineTo(0, this.canvas.height);
            this.ctx.closePath();
            
            this.ctx.fillStyle = wave.color;
            this.ctx.fill();
            this.ctx.restore();
        });
    }
}

if (typeof window !== 'undefined') {
    window.Particle = Particle;
    window.ParticleSystem = ParticleSystem;
    window.TrailEffect = TrailEffect;
    window.Firework = Firework;
    window.ConfettiCannon = ConfettiCannon;
    window.MagicDust = MagicDust;
    window.WaveEffect = WaveEffect;
    window.LightningEffect = LightningEffect;
    window.StarField = StarField;
    window.AuroraEffect = AuroraEffect;
}

console.log('Particle Engine Loaded ✨');