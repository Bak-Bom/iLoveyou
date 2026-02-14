class EffectsHandler {
    constructor() {
        this.activeEffects = new Map();
        this.canvas = null;
        this.ctx = null;
        this.isInitialized = false;
    }

    init(canvasId = 'effectsCanvas') {
        this.canvas = document.getElementById(canvasId);
        
        if (!this.canvas) {
            this.canvas = document.createElement('canvas');
            this.canvas.id = canvasId;
            this.canvas.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 9990;
            `;
            document.body.appendChild(this.canvas);
        }
        
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        
        window.addEventListener('resize', () => this.resize());
        
        this.isInitialized = true;
    }

    resize() {
        if (!this.canvas) return;
        
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    register(name, effect) {
        this.activeEffects.set(name, effect);
    }

    unregister(name) {
        const effect = this.activeEffects.get(name);
        if (effect && typeof effect.destroy === 'function') {
            effect.destroy();
        }
        this.activeEffects.delete(name);
    }

    get(name) {
        return this.activeEffects.get(name);
    }

    clear() {
        if (this.ctx) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }

    clearAll() {
        this.activeEffects.forEach((effect, name) => {
            this.unregister(name);
        });
        this.clear();
    }
}

class ScreenShake {
    constructor(duration = 500, intensity = 10) {
        this.duration = duration;
        this.intensity = intensity;
        this.startTime = Date.now();
        this.originalTransform = document.body.style.transform || '';
    }

    update() {
        const elapsed = Date.now() - this.startTime;
        
        if (elapsed >= this.duration) {
            document.body.style.transform = this.originalTransform;
            return false;
        }
        
        const progress = 1 - (elapsed / this.duration);
        const currentIntensity = this.intensity * progress;
        
        const x = (Math.random() - 0.5) * currentIntensity;
        const y = (Math.random() - 0.5) * currentIntensity;
        
        document.body.style.transform = `${this.originalTransform} translate(${x}px, ${y}px)`;
        
        return true;
    }

    destroy() {
        document.body.style.transform = this.originalTransform;
    }
}

class FlashEffect {
    constructor(color = 'rgba(255, 255, 255, 0.8)', duration = 300) {
        this.color = color;
        this.duration = duration;
        this.overlay = document.createElement('div');
        this.overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: ${this.color};
            pointer-events: none;
            z-index: 99999;
        `;
        
        document.body.appendChild(this.overlay);
        
        this.overlay.animate([
            { opacity: 1 },
            { opacity: 0 }
        ], {
            duration: this.duration,
            easing: 'ease-out'
        });
        
        setTimeout(() => this.destroy(), this.duration);
    }

    destroy() {
        if (this.overlay && this.overlay.parentElement) {
            this.overlay.remove();
        }
    }
}

class GlitchEffect {
    constructor(element, duration = 2000) {
        this.element = element;
        this.duration = duration;
        this.startTime = Date.now();
        this.originalStyle = {
            transform: element.style.transform || '',
            filter: element.style.filter || ''
        };
    }

    update() {
        const elapsed = Date.now() - this.startTime;
        
        if (elapsed >= this.duration) {
            this.element.style.transform = this.originalStyle.transform;
            this.element.style.filter = this.originalStyle.filter;
            return false;
        }
        
        if (Math.random() < 0.1) {
            const x = (Math.random() - 0.5) * 10;
            const y = (Math.random() - 0.5) * 10;
            const hue = Math.random() * 360;
            
            this.element.style.transform = `${this.originalStyle.transform} translate(${x}px, ${y}px)`;
            this.element.style.filter = `hue-rotate(${hue}deg)`;
        } else {
            this.element.style.transform = this.originalStyle.transform;
            this.element.style.filter = this.originalStyle.filter;
        }
        
        return true;
    }

    destroy() {
        this.element.style.transform = this.originalStyle.transform;
        this.element.style.filter = this.originalStyle.filter;
    }
}

class RippleEffect {
    constructor(x, y, options = {}) {
        this.x = x;
        this.y = y;
        this.maxRadius = options.maxRadius || 300;
        this.color = options.color || 'rgba(255, 105, 180, 0.6)';
        this.duration = options.duration || 1000;
        
        this.ripple = document.createElement('div');
        this.ripple.style.cssText = `
            position: fixed;
            left: ${this.x}px;
            top: ${this.y}px;
            width: 0;
            height: 0;
            border: 2px solid ${this.color};
            border-radius: 50%;
            pointer-events: none;
            z-index: 99998;
            transform: translate(-50%, -50%);
        `;
        
        document.body.appendChild(this.ripple);
        
        this.ripple.animate([
            {
                width: '0px',
                height: '0px',
                opacity: 1
            },
            {
                width: this.maxRadius + 'px',
                height: this.maxRadius + 'px',
                opacity: 0
            }
        ], {
            duration: this.duration,
            easing: 'ease-out'
        });
        
        setTimeout(() => this.destroy(), this.duration);
    }

    destroy() {
        if (this.ripple && this.ripple.parentElement) {
            this.ripple.remove();
        }
    }
}

class TypewriterEffect {
    constructor(element, text, speed = 50, callback = null) {
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.callback = callback;
        this.currentIndex = 0;
        this.intervalId = null;
        
        this.start();
    }

    start() {
        this.element.textContent = '';
        
        this.intervalId = setInterval(() => {
            if (this.currentIndex < this.text.length) {
                this.element.textContent += this.text[this.currentIndex];
                this.currentIndex++;
            } else {
                this.stop();
                if (this.callback) {
                    this.callback();
                }
            }
        }, this.speed);
    }

    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    destroy() {
        this.stop();
    }
}

class BlurTransition {
    constructor(element, duration = 1000, maxBlur = 20) {
        this.element = element;
        this.duration = duration;
        this.maxBlur = maxBlur;
        this.startTime = Date.now();
        this.phase = 'blur-in';
        this.originalFilter = element.style.filter || '';
    }

    update() {
        const elapsed = Date.now() - this.startTime;
        const halfDuration = this.duration / 2;
        
        if (this.phase === 'blur-in') {
            if (elapsed >= halfDuration) {
                this.phase = 'blur-out';
                this.startTime = Date.now();
                return true;
            }
            
            const progress = elapsed / halfDuration;
            const blur = this.maxBlur * progress;
            this.element.style.filter = `blur(${blur}px)`;
            
        } else if (this.phase === 'blur-out') {
            if (elapsed >= halfDuration) {
                this.element.style.filter = this.originalFilter;
                return false;
            }
            
            const progress = 1 - (elapsed / halfDuration);
            const blur = this.maxBlur * progress;
            this.element.style.filter = `blur(${blur}px)`;
        }
        
        return true;
    }

    destroy() {
        this.element.style.filter = this.originalFilter;
    }
}

class ZoomPulse {
    constructor(element, duration = 1000, minScale = 0.8, maxScale = 1.2) {
        this.element = element;
        this.duration = duration;
        this.minScale = minScale;
        this.maxScale = maxScale;
        this.startTime = Date.now();
        this.originalTransform = element.style.transform || '';
    }

    update() {
        const elapsed = Date.now() - this.startTime;
        
        if (elapsed >= this.duration) {
            this.element.style.transform = this.originalTransform;
            return false;
        }
        
        const progress = elapsed / this.duration;
        const scale = this.minScale + Math.sin(progress * Math.PI * 4) * 
                     (this.maxScale - this.minScale) / 2 + 
                     (this.maxScale - this.minScale) / 2;
        
        this.element.style.transform = `${this.originalTransform} scale(${scale})`;
        
        return true;
    }

    destroy() {
        this.element.style.transform = this.originalTransform;
    }
}

class ColorCycle {
    constructor(element, colors, duration = 3000) {
        this.element = element;
        this.colors = colors;
        this.duration = duration;
        this.startTime = Date.now();
        this.originalColor = element.style.color || '';
    }

    update() {
        const elapsed = Date.now() - this.startTime;
        const progress = (elapsed % this.duration) / this.duration;
        const colorIndex = Math.floor(progress * this.colors.length);
        
        this.element.style.color = this.colors[colorIndex];
        
        return true;
    }

    destroy() {
        this.element.style.color = this.originalColor;
    }
}

class ParallaxScroll {
    constructor(elements, speed = 0.5) {
        this.elements = Array.isArray(elements) ? elements : [elements];
        this.speed = speed;
        this.originalPositions = this.elements.map(el => ({
            top: el.style.top || '0',
            transform: el.style.transform || ''
        }));
        
        this.handleScroll = this.handleScroll.bind(this);
        window.addEventListener('scroll', this.handleScroll);
    }

    handleScroll() {
        const scrollY = window.scrollY;
        
        this.elements.forEach((el, index) => {
            const offset = scrollY * this.speed;
            const original = this.originalPositions[index];
            el.style.transform = `${original.transform} translateY(${offset}px)`;
        });
    }

    destroy() {
        window.removeEventListener('scroll', this.handleScroll);
        
        this.elements.forEach((el, index) => {
            const original = this.originalPositions[index];
            el.style.top = original.top;
            el.style.transform = original.transform;
        });
    }
}

class FloatingAnimation {
    constructor(element, range = 20, speed = 2000) {
        this.element = element;
        this.range = range;
        this.speed = speed;
        this.startTime = Date.now();
        this.originalTransform = element.style.transform || '';
    }

    update() {
        const elapsed = Date.now() - this.startTime;
        const progress = (elapsed % this.speed) / this.speed;
        
        const y = Math.sin(progress * Math.PI * 2) * this.range;
        
        this.element.style.transform = `${this.originalTransform} translateY(${y}px)`;
        
        return true;
    }

    destroy() {
        this.element.style.transform = this.originalTransform;
    }
}

class RotateAnimation {
    constructor(element, speed = 5000) {
        this.element = element;
        this.speed = speed;
        this.startTime = Date.now();
        this.originalTransform = element.style.transform || '';
    }

    update() {
        const elapsed = Date.now() - this.startTime;
        const progress = (elapsed % this.speed) / this.speed;
        const rotation = progress * 360;
        
        this.element.style.transform = `${this.originalTransform} rotate(${rotation}deg)`;
        
        return true;
    }

    destroy() {
        this.element.style.transform = this.originalTransform;
    }
}

class PulseGlow {
    constructor(element, color = 'rgba(255, 105, 180, 0.8)', duration = 2000) {
        this.element = element;
        this.color = color;
        this.duration = duration;
        this.startTime = Date.now();
        this.originalBoxShadow = element.style.boxShadow || '';
    }

    update() {
        const elapsed = Date.now() - this.startTime;
        const progress = (elapsed % this.duration) / this.duration;
        
        const intensity = Math.sin(progress * Math.PI * 2) * 0.5 + 0.5;
        const blur = 10 + intensity * 30;
        const spread = 5 + intensity * 15;
        
        this.element.style.boxShadow = `0 0 ${blur}px ${spread}px ${this.color}`;
        
        return true;
    }

    destroy() {
        this.element.style.boxShadow = this.originalBoxShadow;
    }
}

class MorphShape {
    constructor(element, shapes, duration = 3000) {
        this.element = element;
        this.shapes = shapes;
        this.duration = duration;
        this.startTime = Date.now();
        this.originalBorderRadius = element.style.borderRadius || '';
    }

    update() {
        const elapsed = Date.now() - this.startTime;
        const progress = (elapsed % this.duration) / this.duration;
        const shapeIndex = Math.floor(progress * this.shapes.length);
        
        this.element.style.borderRadius = this.shapes[shapeIndex];
        
        return true;
    }

    destroy() {
        this.element.style.borderRadius = this.originalBorderRadius;
    }
}

class WaveText {
    constructor(element, amplitude = 10, frequency = 0.5) {
        this.element = element;
        this.amplitude = amplitude;
        this.frequency = frequency;
        this.startTime = Date.now();
        this.originalText = element.textContent;
        this.chars = [];
        
        this.init();
    }

    init() {
        this.element.innerHTML = '';
        
        for (let i = 0; i < this.originalText.length; i++) {
            const span = document.createElement('span');
            span.textContent = this.originalText[i];
            span.style.display = 'inline-block';
            this.element.appendChild(span);
            this.chars.push(span);
        }
    }

    update() {
        const elapsed = Date.now() - this.startTime;
        
        this.chars.forEach((char, index) => {
            const offset = Math.sin((elapsed * 0.001 + index * this.frequency)) * this.amplitude;
            char.style.transform = `translateY(${offset}px)`;
        });
        
        return true;
    }

    destroy() {
        this.element.textContent = this.originalText;
    }
}

const effectsHandler = new EffectsHandler();

function applyScreenShake(duration = 500, intensity = 10) {
    const shake = new ScreenShake(duration, intensity);
    effectsHandler.register('screen-shake', shake);
    
    setTimeout(() => {
        effectsHandler.unregister('screen-shake');
    }, duration);
}

function applyFlash(color = 'rgba(255, 255, 255, 0.8)', duration = 300) {
    new FlashEffect(color, duration);
}

function applyRipple(x, y, options = {}) {
    new RippleEffect(x, y, options);
}

function applyTypewriter(element, text, speed = 50, callback = null) {
    const typewriter = new TypewriterEffect(element, text, speed, callback);
    effectsHandler.register('typewriter-' + element.id, typewriter);
}

function applyGlitch(element, duration = 2000) {
    const glitch = new GlitchEffect(element, duration);
    effectsHandler.register('glitch-' + element.id, glitch);
    
    const updateGlitch = () => {
        if (glitch.update()) {
            requestAnimationFrame(updateGlitch);
        } else {
            effectsHandler.unregister('glitch-' + element.id);
        }
    };
    
    updateGlitch();
}

function applyBlurTransition(element, duration = 1000, maxBlur = 20) {
    const blur = new BlurTransition(element, duration, maxBlur);
    effectsHandler.register('blur-' + element.id, blur);
    
    const updateBlur = () => {
        if (blur.update()) {
            requestAnimationFrame(updateBlur);
        } else {
            effectsHandler.unregister('blur-' + element.id);
        }
    };
    
    updateBlur();
}

function applyZoomPulse(element, duration = 1000, minScale = 0.8, maxScale = 1.2) {
    const zoom = new ZoomPulse(element, duration, minScale, maxScale);
    effectsHandler.register('zoom-' + element.id, zoom);
    
    const updateZoom = () => {
        if (zoom.update()) {
            requestAnimationFrame(updateZoom);
        } else {
            effectsHandler.unregister('zoom-' + element.id);
        }
    };
    
    updateZoom();
}

function applyFloating(element, range = 20, speed = 2000) {
    const floating = new FloatingAnimation(element, range, speed);
    effectsHandler.register('floating-' + element.id, floating);
    
    const updateFloating = () => {
        if (floating.update()) {
            requestAnimationFrame(updateFloating);
        }
    };
    
    updateFloating();
}

function applyPulseGlow(element, color = 'rgba(255, 105, 180, 0.8)', duration = 2000) {
    const glow = new PulseGlow(element, color, duration);
    effectsHandler.register('glow-' + element.id, glow);
    
    const updateGlow = () => {
        if (glow.update()) {
            requestAnimationFrame(updateGlow);
        }
    };
    
    updateGlow();
}

function applyWaveText(element, amplitude = 10, frequency = 0.5) {
    const wave = new WaveText(element, amplitude, frequency);
    effectsHandler.register('wave-' + element.id, wave);
    
    const updateWave = () => {
        if (wave.update()) {
            requestAnimationFrame(updateWave);
        }
    };
    
    updateWave();
}

if (typeof window !== 'undefined') {
    window.EffectsHandler = EffectsHandler;
    window.ScreenShake = ScreenShake;
    window.FlashEffect = FlashEffect;
    window.GlitchEffect = GlitchEffect;
    window.RippleEffect = RippleEffect;
    window.TypewriterEffect = TypewriterEffect;
    window.BlurTransition = BlurTransition;
    window.ZoomPulse = ZoomPulse;
    window.ColorCycle = ColorCycle;
    window.ParallaxScroll = ParallaxScroll;
    window.FloatingAnimation = FloatingAnimation;
    window.RotateAnimation = RotateAnimation;
    window.PulseGlow = PulseGlow;
    window.MorphShape = MorphShape;
    window.WaveText = WaveText;
    
    window.effectsHandler = effectsHandler;
    window.applyScreenShake = applyScreenShake;
    window.applyFlash = applyFlash;
    window.applyRipple = applyRipple;
    window.applyTypewriter = applyTypewriter;
    window.applyGlitch = applyGlitch;
    window.applyBlurTransition = applyBlurTransition;
    window.applyZoomPulse = applyZoomPulse;
    window.applyFloating = applyFloating;
    window.applyPulseGlow = applyPulseGlow;
    window.applyWaveText = applyWaveText;
}

console.log('Effects Handler Loaded 🎭');