document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.getElementById('masterPreloader');
    const welcomeScreen = document.getElementById('welcomeScreen');
    const mainExperience = document.getElementById('mainExperience');
    const envelopeStage = document.getElementById('envelopeStage');
    const letterStage = document.getElementById('letterStage');
    const grandFinale = document.getElementById('grandFinale');
    
    const startButton = document.getElementById('megaStartButton');
    const envelope = document.getElementById('magicalEnvelope');
    const closeButton = document.getElementById('finaleCloseBtn');
    const musicToggle = document.getElementById('musicToggleBtn');
    const bgMusic = document.getElementById('bgMusic');
    
    let currentStage = 'preloader';
    let musicPlaying = false;

    function updateLoadingBar(percent) {
        const loadingFill = document.getElementById('loadingBarFill');
        const loadingPercent = document.getElementById('loadingPercent');
        const loadingStatus = document.getElementById('loadingStatus');
        
        if (loadingFill) {
            loadingFill.style.width = percent + '%';
        }
        
        if (loadingPercent) {
            loadingPercent.textContent = Math.round(percent) + '%';
        }
        
        if (loadingStatus) {
            if (percent < 30) {
                loadingStatus.textContent = 'กำลังโหลดความรัก...';
            } else if (percent < 60) {
                loadingStatus.textContent = 'กำลังเตรียมความพิเศษ...';
            } else if (percent < 90) {
                loadingStatus.textContent = 'เกือบเสร็จแล้ว...';
            } else {
                loadingStatus.textContent = 'พร้อมแล้ว!';
            }
        }
    }

    function simulateLoading() {
        let progress = 0;
        const loadingInterval = setInterval(() => {
            progress += Math.random() * 15;
            
            if (progress >= 100) {
                progress = 100;
                clearInterval(loadingInterval);
                
                setTimeout(() => {
                    hidePreloader();
                }, 500);
            }
            
            updateLoadingBar(progress);
        }, 200);
    }

    function hidePreloader() {
        preloader.style.opacity = '0';
        preloader.style.transition = 'opacity 1s ease';
        
        setTimeout(() => {
            preloader.style.display = 'none';
            showWelcomeScreen();
        }, 1000);
    }

    function showWelcomeScreen() {
        welcomeScreen.classList.add('active');
        currentStage = 'welcome';
        
        createFloatingGIFs();
        initializeWelcomeAnimations();
    }

    function createFloatingGIFs() {
        const gifUrls = [
            'https://media.giphy.com/media/26FmQ6EOvLxp6cWyY/giphy.gif',
            'https://media.giphy.com/media/l0HlSJ5WPs5KiWCT6/giphy.gif',
            'https://media.giphy.com/media/xULW8yDFaLx8WUZmgg/giphy.gif'
        ];
        
        console.log('Welcome screen activated with', gifUrls.length, 'GIF options');
    }

    function initializeWelcomeAnimations() {
        const logo = document.querySelector('.welcome-logo-container');
        const title = document.querySelector('.welcome-main-title');
        
        if (logo) {
            setTimeout(() => {
                logo.style.transform = 'scale(1)';
                logo.style.opacity = '1';
            }, 300);
        }
        
        if (title) {
            setTimeout(() => {
                title.style.transform = 'translateY(0)';
                title.style.opacity = '1';
            }, 600);
        }
    }

    if (startButton) {
        startButton.addEventListener('click', function() {
            this.style.transform = 'scale(0.9)';
            
            setTimeout(() => {
                welcomeScreen.style.opacity = '0';
                welcomeScreen.style.transition = 'opacity 1s ease';
                
                setTimeout(() => {
                    welcomeScreen.classList.remove('active');
                    showMainExperience();
                }, 1000);
            }, 200);
            
            createStartExplosion();
        });
    }

    function createStartExplosion() {
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'explosion-particle';
            particle.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                width: 10px;
                height: 10px;
                background: hsl(${Math.random() * 360}, 80%, 60%);
                border-radius: 50%;
                z-index: 99999;
                pointer-events: none;
            `;
            
            document.body.appendChild(particle);
            
            const angle = (Math.PI * 2 * i) / 50;
            const distance = 100 + Math.random() * 200;
            const duration = 1000 + Math.random() * 1000;
            
            particle.animate([
                {
                    transform: 'translate(-50%, -50%) scale(1)',
                    opacity: 1
                },
                {
                    transform: `translate(calc(-50% + ${Math.cos(angle) * distance}px), calc(-50% + ${Math.sin(angle) * distance}px)) scale(0)`,
                    opacity: 0
                }
            ], {
                duration: duration,
                easing: 'ease-out'
            });
            
            setTimeout(() => particle.remove(), duration);
        }
    }

    function showMainExperience() {
        mainExperience.classList.add('active');
        currentStage = 'envelope';
        
        setTimeout(() => {
            if (envelopeStage) {
                envelopeStage.classList.add('active');
            }
        }, 500);
        
        initializeParticles();
        initializeCanvases();
    }

    function initializeParticles() {
        console.log('Initializing particle systems');
    }

    function initializeCanvases() {
        const mainCanvas = document.getElementById('mainParticleCanvas');
        const fireworksCanvas = document.getElementById('fireworksCanvas');
        const confettiCanvas = document.getElementById('confettiCanvas');
        
        if (mainCanvas) {
            const ctx = mainCanvas.getContext('2d');
            mainCanvas.width = window.innerWidth;
            mainCanvas.height = window.innerHeight;
            
            animateMainParticles(ctx, mainCanvas);
        }
        
        if (fireworksCanvas) {
            fireworksCanvas.width = window.innerWidth;
            fireworksCanvas.height = window.innerHeight;
        }
        
        if (confettiCanvas) {
            confettiCanvas.width = window.innerWidth;
            confettiCanvas.height = window.innerHeight;
        }
    }

    function animateMainParticles(ctx, canvas) {
        const particles = [];
        const particleCount = 100;
        
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1,
                alpha: Math.random() * 0.5 + 0.3
            });
        }
        
        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
                
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
                ctx.fill();
                
                ctx.shadowBlur = 10;
                ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
            });
            
            requestAnimationFrame(draw);
        }
        
        draw();
    }

    if (envelope) {
        envelope.addEventListener('click', function() {
            if (currentStage !== 'envelope') return;
            
            this.classList.add('opening');
            currentStage = 'letter-opening';
            
            createEnvelopeExplosion();
            
            setTimeout(() => {
                envelopeStage.style.opacity = '0';
                envelopeStage.style.transition = 'opacity 1s ease';
                
                setTimeout(() => {
                    envelopeStage.classList.remove('active');
                    showLetter();
                }, 1000);
            }, 1500);
        });
    }

    function createEnvelopeExplosion() {
        const hearts = ['❤️', '💕', '💖', '💗', '💓', '💝', '💘', '💞'];
        
        for (let i = 0; i < 60; i++) {
            const heart = document.createElement('div');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                font-size: ${20 + Math.random() * 40}px;
                z-index: 99999;
                pointer-events: none;
            `;
            
            document.body.appendChild(heart);
            
            const angle = (Math.PI * 2 * i) / 60;
            const distance = 150 + Math.random() * 250;
            const duration = 2000 + Math.random() * 1000;
            
            heart.animate([
                {
                    transform: 'translate(-50%, -50%) scale(0) rotate(0deg)',
                    opacity: 0
                },
                {
                    transform: `translate(calc(-50% + ${Math.cos(angle) * distance}px), calc(-50% + ${Math.sin(angle) * distance}px)) scale(1) rotate(360deg)`,
                    opacity: 1,
                    offset: 0.5
                },
                {
                    transform: `translate(calc(-50% + ${Math.cos(angle) * distance * 1.2}px), calc(-50% + ${Math.sin(angle) * distance * 1.2}px)) scale(0) rotate(720deg)`,
                    opacity: 0
                }
            ], {
                duration: duration,
                easing: 'ease-out'
            });
            
            setTimeout(() => heart.remove(), duration);
        }
        
        launchFireworks();
    }

    function launchFireworks() {
        const canvas = document.getElementById('fireworksCanvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const fireworks = [];
        
        function createFirework() {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height * 0.5;
            const particles = [];
            const particleCount = 50;
            
            for (let i = 0; i < particleCount; i++) {
                const angle = (Math.PI * 2 * i) / particleCount;
                const speed = 2 + Math.random() * 4;
                
                particles.push({
                    x: x,
                    y: y,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    life: 1,
                    color: `hsl(${Math.random() * 360}, 80%, 60%)`
                });
            }
            
            return particles;
        }
        
        function animateFireworks() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            fireworks.forEach((particles, idx) => {
                let allDead = true;
                
                particles.forEach(p => {
                    if (p.life > 0) {
                        allDead = false;
                        
                        p.x += p.vx;
                        p.y += p.vy;
                        p.vy += 0.1;
                        p.life -= 0.02;
                        
                        ctx.beginPath();
                        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
                        ctx.fillStyle = p.color;
                        ctx.globalAlpha = p.life;
                        ctx.fill();
                        ctx.globalAlpha = 1;
                    }
                });
                
                if (allDead) {
                    fireworks.splice(idx, 1);
                }
            });
            
            if (Math.random() < 0.05 && fireworks.length < 5) {
                fireworks.push(createFirework());
            }
            
            requestAnimationFrame(animateFireworks);
        }
        
        animateFireworks();
    }

    function showLetter() {
        if (letterStage) {
            letterStage.classList.add('active');
            currentStage = 'letter';
        }
        
        setTimeout(() => {
            showGrandFinale();
        }, 8000);
    }

    function showGrandFinale() {
        if (grandFinale) {
            grandFinale.classList.add('active');
            currentStage = 'finale';
        }
        
        createMegaConfetti();
        createFloatingHearts();
    }

    function createMegaConfetti() {
        const canvas = document.getElementById('confettiCanvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const confettiPieces = [];
        
        for (let i = 0; i < 200; i++) {
            confettiPieces.push({
                x: Math.random() * canvas.width,
                y: -20,
                vx: (Math.random() - 0.5) * 4,
                vy: Math.random() * 3 + 2,
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 10,
                color: `hsl(${Math.random() * 360}, 70%, 60%)`,
                width: 8 + Math.random() * 8,
                height: 16 + Math.random() * 16
            });
        }
        
        function animateConfetti() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            confettiPieces.forEach(c => {
                c.x += c.vx;
                c.y += c.vy;
                c.rotation += c.rotationSpeed;
                c.vy += 0.1;
                
                if (c.y > canvas.height + 50) {
                    c.y = -20;
                    c.x = Math.random() * canvas.width;
                }
                
                ctx.save();
                ctx.translate(c.x, c.y);
                ctx.rotate(c.rotation * Math.PI / 180);
                ctx.fillStyle = c.color;
                ctx.fillRect(-c.width / 2, -c.height / 2, c.width, c.height);
                ctx.restore();
            });
            
            requestAnimationFrame(animateConfetti);
        }
        
        animateConfetti();
    }

    function createFloatingHearts() {
        setInterval(() => {
            const heart = document.createElement('div');
            heart.textContent = '❤️';
            heart.style.cssText = `
                position: fixed;
                bottom: -50px;
                left: ${Math.random() * 100}%;
                font-size: ${30 + Math.random() * 40}px;
                z-index: 9999;
                pointer-events: none;
            `;
            
            document.body.appendChild(heart);
            
            heart.animate([
                {
                    transform: 'translateY(0) rotate(0deg)',
                    opacity: 0
                },
                {
                    transform: `translateY(-${window.innerHeight + 100}px) rotate(360deg)`,
                    opacity: 1,
                    offset: 0.1
                },
                {
                    transform: `translateY(-${window.innerHeight + 200}px) rotate(720deg)`,
                    opacity: 0
                }
            ], {
                duration: 8000 + Math.random() * 4000,
                easing: 'linear'
            });
            
            setTimeout(() => heart.remove(), 12000);
        }, 400);
    }

    if (closeButton) {
        closeButton.addEventListener('click', function() {
            grandFinale.style.opacity = '0';
            grandFinale.style.transition = 'opacity 1s ease';
            
            setTimeout(() => {
                grandFinale.classList.remove('active');
                currentStage = 'letter';
            }, 1000);
        });
    }

    if (musicToggle) {
        musicToggle.addEventListener('click', function() {
            if (musicPlaying) {
                bgMusic.pause();
                this.classList.add('paused');
                musicPlaying = false;
            } else {
                bgMusic.play().catch(e => console.log('Music play failed:', e));
                this.classList.remove('paused');
                musicPlaying = true;
            }
        });
    }

    const cursorFollower = document.getElementById('cursorFollower');
    let cursorX = 0;
    let cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        cursorX = e.clientX;
        cursorY = e.clientY;
        
        if (cursorFollower) {
            cursorFollower.style.left = cursorX + 'px';
            cursorFollower.style.top = cursorY + 'px';
        }
    });

    document.addEventListener('click', (e) => {
        createClickEffect(e.clientX, e.clientY);
    });

    function createClickEffect(x, y) {
        const ripple = document.createElement('div');
        ripple.className = 'click-ripple';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        const rippleContainer = document.getElementById('clickRippleContainer');
        if (rippleContainer) {
            rippleContainer.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 800);
        }
        
        for (let i = 0; i < 8; i++) {
            const heart = document.createElement('div');
            heart.textContent = ['❤️', '💕', '💖', '💗'][Math.floor(Math.random() * 4)];
            heart.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                font-size: ${15 + Math.random() * 15}px;
                z-index: 99999;
                pointer-events: none;
            `;
            
            document.body.appendChild(heart);
            
            const angle = (Math.PI * 2 * i) / 8;
            const distance = 50 + Math.random() * 30;
            
            heart.animate([
                {
                    transform: 'translate(-50%, -50%) scale(0)',
                    opacity: 1
                },
                {
                    transform: `translate(calc(-50% + ${Math.cos(angle) * distance}px), calc(-50% + ${Math.sin(angle) * distance}px)) scale(1)`,
                    opacity: 0
                }
            ], {
                duration: 1000,
                easing: 'ease-out'
            });
            
            setTimeout(() => heart.remove(), 1000);
        }
    }

    window.addEventListener('resize', () => {
        const canvases = [
            document.getElementById('mainParticleCanvas'),
            document.getElementById('fireworksCanvas'),
            document.getElementById('confettiCanvas')
        ];
        
        canvases.forEach(canvas => {
            if (canvas) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
        });
    });

    simulateLoading();
    
    console.log('Valentine Experience Initialized 💕');
});