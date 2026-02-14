<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Valentine's Day Special Surprise">
    <title>💕 สำหรับคนที่รักที่สุดในโลก 💕</title>
    <link rel="stylesheet" href="main-style.css">
    <link rel="stylesheet" href="animations.css">
    <link rel="stylesheet" href="effects.css">
    <link rel="stylesheet" href="particles.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@200;300;400;500;600;700;800;900&family=Sarabun:wght@200;300;400;500;600;700;800&family=Prompt:wght@200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
</head>
<body>
    <audio id="bgMusic" loop>
        <source src="" type="audio/mpeg">
    </audio>

    <div class="master-preloader" id="masterPreloader">
        <div class="preloader-bg">
            <div class="preloader-gradient-1"></div>
            <div class="preloader-gradient-2"></div>
            <div class="preloader-gradient-3"></div>
        </div>
        <div class="preloader-particles-container">
            <?php for($i = 0; $i < 150; $i++): ?>
                <div class="preloader-particle" style="
                    left: <?php echo rand(0, 100); ?>%;
                    top: <?php echo rand(0, 100); ?>%;
                    width: <?php echo rand(2, 8); ?>px;
                    height: <?php echo rand(2, 8); ?>px;
                    animation-delay: <?php echo rand(0, 4000) / 1000; ?>s;
                    animation-duration: <?php echo rand(2, 6); ?>s;
                "></div>
            <?php endfor; ?>
        </div>
        <div class="preloader-content">
            <div class="mega-heart-loader">
                <div class="heart-outer">
                    <div class="heart-inner">
                        <div class="heart-core"></div>
                    </div>
                </div>
                <div class="heart-beat-wave"></div>
            </div>
            <h1 class="preloader-title">กำลังเตรียมความพิเศษ</h1>
            <p class="preloader-subtitle">สำหรับคนที่รักที่สุดในโลก...</p>
            <div class="loading-bar-container">
                <div class="loading-bar-bg">
                    <div class="loading-bar-fill" id="loadingBarFill"></div>
                    <div class="loading-bar-shine"></div>
                    <div class="loading-bar-glow"></div>
                </div>
            </div>
            <div class="loading-stats">
                <span class="loading-percent" id="loadingPercent">0%</span>
                <span class="loading-status" id="loadingStatus">กำลังโหลด...</span>
            </div>
            <div class="preloader-hearts-row">
                <?php 
                $heartEmojis = ['❤️', '💕', '💖', '💗', '💓', '💝', '💘', '💞'];
                for($i = 0; $i < 8; $i++): 
                ?>
                    <span class="preloader-heart-icon" style="animation-delay: <?php echo $i * 0.15; ?>s;">
                        <?php echo $heartEmojis[$i]; ?>
                    </span>
                <?php endfor; ?>
            </div>
        </div>
        <div class="preloader-sparkles">
            <?php for($i = 0; $i < 50; $i++): ?>
                <div class="preloader-sparkle" style="
                    top: <?php echo rand(0, 100); ?>%;
                    left: <?php echo rand(0, 100); ?>%;
                    animation-delay: <?php echo rand(0, 3000) / 1000; ?>s;
                    font-size: <?php echo rand(10, 30); ?>px;
                ">✨</div>
            <?php endfor; ?>
        </div>
    </div>

    <div class="welcome-screen" id="welcomeScreen">
        <div class="welcome-background">
            <div class="welcome-gradient-orb orb-1"></div>
            <div class="welcome-gradient-orb orb-2"></div>
            <div class="welcome-gradient-orb orb-3"></div>
            <div class="welcome-gradient-orb orb-4"></div>
        </div>
        <div class="welcome-stars-layer">
            <?php for($i = 0; $i < 200; $i++): ?>
                <div class="welcome-star" style="
                    top: <?php echo rand(0, 100); ?>%;
                    left: <?php echo rand(0, 100); ?>%;
                    width: <?php echo rand(1, 5); ?>px;
                    height: <?php echo rand(1, 5); ?>px;
                    animation-delay: <?php echo rand(0, 6000) / 1000; ?>s;
                    animation-duration: <?php echo rand(2, 8); ?>s;
                "></div>
            <?php endfor; ?>
        </div>
        <div class="shooting-stars-layer">
            <?php for($i = 0; $i < 15; $i++): ?>
                <div class="shooting-star" style="
                    top: <?php echo rand(0, 60); ?>%;
                    left: <?php echo rand(-20, 100); ?>%;
                    animation-delay: <?php echo rand(0, 15000) / 1000; ?>s;
                    animation-duration: <?php echo rand(1, 3); ?>s;
                "></div>
            <?php endfor; ?>
        </div>
        <div class="welcome-content">
            <div class="welcome-logo-container">
                <div class="logo-ring ring-1"></div>
                <div class="logo-ring ring-2"></div>
                <div class="logo-ring ring-3"></div>
                <div class="logo-hearts-cluster">
                    <span class="cluster-heart h-1">💝</span>
                    <span class="cluster-heart h-2">💖</span>
                    <span class="cluster-heart h-3">💕</span>
                    <span class="cluster-heart h-4">💗</span>
                </div>
            </div>
            <h1 class="welcome-main-title">
                <span class="title-line">สวัสดี</span>
                <span class="title-line">คนที่รัก</span>
                <span class="title-line">ที่สุดในโลก</span>
            </h1>
            <div class="welcome-divider">
                <div class="divider-line left-line"></div>
                <span class="divider-heart">💗</span>
                <div class="divider-line right-line"></div>
            </div>
            <p class="welcome-subtitle subtitle-1">วันนี้เป็นวันที่พิเศษมาก...</p>
            <p class="welcome-subtitle subtitle-2">เพราะเค้ามีอะไรจะบอกเธอ</p>
            <p class="welcome-subtitle subtitle-3">บางอย่างที่เก็บมานาน</p>
            <div class="welcome-gif-showcase">
                <div class="gif-frame">
                    <img src="https://s12.gifyu.com/images/bvNvW.gif" alt="Love Animation" class="showcase-gif">
                    <div class="gif-overlay"></div>
                </div>
            </div>
            <button class="mega-start-button" id="megaStartButton">
                <span class="button-bg-layer"></span>
                <span class="button-shine-layer"></span>
                <span class="button-content">
                    <span class="button-text">เริ่มต้นการเดินทาง</span>
                    <span class="button-icon">💕</span>
                </span>
                <div class="button-particles">
                    <?php for($i = 0; $i < 20; $i++): ?>
                        <div class="button-particle" style="
                            left: <?php echo rand(0, 100); ?>%;
                            animation-delay: <?php echo rand(0, 2000) / 1000; ?>s;
                        "></div>
                    <?php endfor; ?>
                </div>
            </button>
            <div class="welcome-hint-container">
                <div class="hint-arrow arrow-1">👇</div>
                <div class="hint-text">กดเลย ไม่ต้องเกรงใจ</div>
                <div class="hint-arrow arrow-2">👇</div>
            </div>
        </div>
        <div class="welcome-floating-hearts">
            <?php for($i = 0; $i < 50; $i++): ?>
                <div class="welcome-float-heart" style="
                    left: <?php echo rand(0, 100); ?>%;
                    font-size: <?php echo rand(20, 60); ?>px;
                    animation-delay: <?php echo rand(0, 5000) / 1000; ?>s;
                    animation-duration: <?php echo rand(10, 20); ?>s;
                    opacity: <?php echo rand(40, 90) / 100; ?>;
                ">❤️</div>
            <?php endfor; ?>
        </div>
        <div class="welcome-sparkles-layer">
            <?php for($i = 0; $i < 40; $i++): ?>
                <div class="welcome-sparkle" style="
                    top: <?php echo rand(0, 100); ?>%;
                    left: <?php echo rand(0, 100); ?>%;
                    animation-delay: <?php echo rand(0, 4000) / 1000; ?>s;
                    font-size: <?php echo rand(15, 35); ?>px;
                ">✨</div>
            <?php endfor; ?>
        </div>
        <div class="welcome-roses-layer">
            <?php for($i = 0; $i < 20; $i++): ?>
                <div class="welcome-rose" style="
                    top: <?php echo rand(-10, 110); ?>%;
                    left: <?php echo rand(0, 100); ?>%;
                    animation-delay: <?php echo rand(0, 8000) / 1000; ?>s;
                    animation-duration: <?php echo rand(15, 25); ?>s;
                    font-size: <?php echo rand(25, 45); ?>px;
                ">🌹</div>
            <?php endfor; ?>
        </div>
    </div>

    <div class="main-experience-container" id="mainExperience">
        <canvas id="mainParticleCanvas"></canvas>
        <canvas id="fireworksCanvas"></canvas>
        <canvas id="confettiCanvas"></canvas>
        
        <div class="experience-background-layers">
            <div class="gradient-mesh-layer">
                <div class="mesh-orb mesh-orb-1"></div>
                <div class="mesh-orb mesh-orb-2"></div>
                <div class="mesh-orb mesh-orb-3"></div>
                <div class="mesh-orb mesh-orb-4"></div>
                <div class="mesh-orb mesh-orb-5"></div>
                <div class="mesh-orb mesh-orb-6"></div>
                <div class="mesh-orb mesh-orb-7"></div>
            </div>
            
            <div class="aurora-borealis-layer">
                <div class="aurora-wave aurora-pink"></div>
                <div class="aurora-wave aurora-purple"></div>
                <div class="aurora-wave aurora-blue"></div>
            </div>

            <div class="geometric-shapes-layer">
                <?php for($i = 0; $i < 30; $i++): ?>
                    <div class="geo-shape shape-<?php echo rand(1, 5); ?>" style="
                        top: <?php echo rand(0, 100); ?>%;
                        left: <?php echo rand(0, 100); ?>%;
                        animation-delay: <?php echo rand(0, 10000) / 1000; ?>s;
                        animation-duration: <?php echo rand(20, 40); ?>s;
                    "></div>
                <?php endfor; ?>
            </div>
        </div>

        <div class="cosmic-particles-layer">
            <?php for($i = 0; $i < 150; $i++): ?>
                <div class="cosmic-particle" style="
                    top: <?php echo rand(0, 100); ?>%;
                    left: <?php echo rand(0, 100); ?>%;
                    width: <?php echo rand(1, 4); ?>px;
                    height: <?php echo rand(1, 4); ?>px;
                    animation-delay: <?php echo rand(0, 8000) / 1000; ?>s;
                    animation-duration: <?php echo rand(3, 10); ?>s;
                "></div>
            <?php endfor; ?>
        </div>

        <div class="massive-stars-layer">
            <?php for($i = 0; $i < 400; $i++): ?>
                <div class="massive-star star-size-<?php echo rand(1, 3); ?>" style="
                    top: <?php echo rand(0, 100); ?>%;
                    left: <?php echo rand(0, 100); ?>%;
                    animation-delay: <?php echo rand(0, 10000) / 1000; ?>s;
                "></div>
            <?php endfor; ?>
        </div>

        <div class="envelope-stage" id="envelopeStage">
            <div class="stage-title-container">
                <h2 class="stage-title">มีอะไรสักอย่างรออยู่...</h2>
                <div class="title-underline"></div>
            </div>
            
            <div class="envelope-presentation">
                <div class="envelope-pedestal">
                    <div class="pedestal-glow"></div>
                    <div class="pedestal-base"></div>
                </div>
                
                <div class="envelope-spotlight"></div>
                
                <div class="magical-envelope-container" id="magicalEnvelope">
                    <div class="envelope-aura aura-ring-1"></div>
                    <div class="envelope-aura aura-ring-2"></div>
                    <div class="envelope-aura aura-ring-3"></div>
                    
                    <div class="envelope-main">
                        <div class="envelope-body-main">
                            <div class="envelope-texture"></div>
                            <div class="envelope-front-pattern">
                                <?php for($i = 0; $i < 20; $i++): ?>
                                    <div class="pattern-line" style="top: <?php echo $i * 5; ?>%;"></div>
                                <?php endfor; ?>
                            </div>
                        </div>
                        
                        <div class="envelope-flap-main" id="envelopeFlap">
                            <div class="flap-pattern"></div>
                            <div class="flap-shadow"></div>
                        </div>
                        
                        <div class="wax-seal-container">
                            <div class="seal-glow"></div>
                            <div class="wax-seal">
                                <div class="seal-texture"></div>
                                <div class="seal-stamp">
                                    <span class="stamp-heart">💕</span>
                                </div>
                                <div class="seal-shine"></div>
                            </div>
                        </div>
                        
                        <div class="envelope-3d-shadow"></div>
                    </div>
                    
                    <div class="envelope-floating-elements">
                        <?php for($i = 0; $i < 30; $i++): ?>
                            <div class="float-element sparkle-el" style="
                                top: <?php echo rand(20, 80); ?>%;
                                left: <?php echo rand(20, 80); ?>%;
                                animation-delay: <?php echo rand(0, 3000) / 1000; ?>s;
                            ">✨</div>
                        <?php endfor; ?>
                    </div>
                </div>
                
                <div class="interaction-hint">
                    <div class="hint-icon hint-bounce">👆</div>
                    <div class="hint-message">คลิกเพื่อเปิดจดหมาย</div>
                    <div class="hint-icon hint-bounce">👆</div>
                </div>
            </div>
            
            <div class="stage-ambient-effects">
                <?php for($i = 0; $i < 60; $i++): ?>
                    <div class="ambient-heart" style="
                        left: <?php echo rand(-10, 110); ?>%;
                        animation-delay: <?php echo rand(0, 10000) / 1000; ?>s;
                        animation-duration: <?php echo rand(12, 25); ?>s;
                        font-size: <?php echo rand(20, 50); ?>px;
                    ">❤️</div>
                <?php endfor; ?>
            </div>
        </div>

        <div class="letter-reveal-stage" id="letterStage">
            <div class="letter-stage-background">
                <div class="stage-vignette"></div>
            </div>
            
            <div class="letter-container-wrapper">
                <div class="letter-spotlight-effect"></div>
                
                <div class="grand-letter-container" id="grandLetter">
                    <div class="letter-outer-frame">
                        <div class="frame-corner corner-tl"></div>
                        <div class="frame-corner corner-tr"></div>
                        <div class="frame-corner corner-bl"></div>
                        <div class="frame-corner corner-br"></div>
                        <div class="frame-border border-top"></div>
                        <div class="frame-border border-right"></div>
                        <div class="frame-border border-bottom"></div>
                        <div class="frame-border border-left"></div>
                    </div>
                    
                    <div class="letter-paper">
                        <div class="paper-texture"></div>
                        <div class="paper-watermark"></div>
                        
                        <div class="letter-header-section">
                            <div class="header-ornament ornament-left">
                                <div class="ornament-swirl"></div>
                            </div>
                            <h1 class="letter-main-title">ถึงคนที่รักที่สุดในโลก</h1>
                            <div class="header-ornament ornament-right">
                                <div class="ornament-swirl"></div>
                            </div>
                            <div class="header-hearts-row">
                                <span class="header-heart">💖</span>
                                <span class="header-heart">💕</span>
                                <span class="header-heart">💖</span>
                            </div>
                        </div>

                        <div class="letter-body-content">
                            <p class="letter-paragraph para-1">
                                วันนี้เป็นวันที่พิเศษมากๆ สำหรับเค้า
                            </p>
                            <p class="letter-paragraph para-2">
                                เพราะเป็นโอกาสที่จะได้บอกเธอว่า...
                            </p>
                            
                            <div class="main-love-declaration">
                                <div class="declaration-decoration deco-top">
                                    <span class="deco-star">⭐</span>
                                    <span class="deco-heart">💖</span>
                                    <span class="deco-star">⭐</span>
                                </div>
                                <h2 class="declaration-text">
                                    รักซัมมึนที่สุดในโลก
                                </h2>
                                <div class="declaration-underline"></div>
                                <div class="declaration-decoration deco-bottom">
                                    <span class="deco-star">⭐</span>
                                    <span class="deco-heart">💖</span>
                                    <span class="deco-star">⭐</span>
                                </div>
                            </div>

                            <p class="letter-paragraph para-3">
                                ทุกวินาทีที่ได้อยู่กับเธอ
                            </p>
                            <p class="letter-paragraph para-4">
                                ทำให้เค้ารู้สึกว่าชีวิตมีความหมาย
                            </p>
                            <p class="letter-paragraph para-5">
                                เธอคือทุกสิ่งทุกอย่างของเค้า
                            </p>
                            <p class="letter-paragraph para-6">
                                เค้ารักเธอมากกกกกกก
                            </p>
                            <p class="letter-paragraph para-7">
                                และอยากอยู่กับเธอไปนานๆ
                            </p>
                            <p class="letter-paragraph para-8">
                                ตลอดไปเลย... 💕
                            </p>

                            <div class="hearts-cascade">
                                <?php 
                                $cascadeHearts = ['💗', '💖', '💕', '💓', '💝', '💘', '💞', '💌'];
                                for($i = 0; $i < 8; $i++): 
                                ?>
                                    <span class="cascade-heart" style="animation-delay: <?php echo $i * 0.1; ?>s;">
                                        <?php echo $cascadeHearts[$i]; ?>
                                    </span>
                                <?php endfor; ?>
                            </div>

                            <div class="letter-quote-section">
                                <div class="quote-mark quote-open">"</div>
                                <p class="quote-text">
                                    เธอคือดวงดาวที่ส่องสว่างในคืนที่มืดมิดของเค้า
                                    <br>
                                    เธอคือความหวังและความสุขของเค้า
                                </p>
                                <div class="quote-mark quote-close">"</div>
                            </div>

                            <div class="letter-footer-section">
                                <div class="signature-area">
                                    <p class="signature-line">ด้วยรักและห่วงใย</p>
                                    <p class="signature-name">จากคนที่รักเธอมากที่สุด ❤️</p>
                                    <p class="signature-date">วันวาเลนไทน์ <?php echo date('Y'); ?></p>
                                </div>
                                
                                <div class="roses-bouquet">
                                    <?php for($i = 0; $i < 7; $i++): ?>
                                        <span class="bouquet-rose" style="
                                            animation-delay: <?php echo $i * 0.15; ?>s;
                                            transform: rotate(<?php echo rand(-15, 15); ?>deg);
                                        ">🌹</span>
                                    <?php endfor; ?>
                                </div>
                            </div>
                        </div>

                        <div class="letter-decorative-corners">
                            <div class="deco-corner corner-tl-inner"></div>
                            <div class="deco-corner corner-tr-inner"></div>
                            <div class="deco-corner corner-bl-inner"></div>
                            <div class="deco-corner corner-br-inner"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="grand-finale-popup" id="grandFinale">
            <div class="finale-backdrop"></div>
            <div class="finale-particle-explosion">
                <?php for($i = 0; $i < 100; $i++): ?>
                    <div class="explosion-particle" style="
                        --angle: <?php echo $i * 3.6; ?>deg;
                        --distance: <?php echo rand(100, 300); ?>px;
                        --duration: <?php echo rand(1000, 2000) / 1000; ?>s;
                        background: hsl(<?php echo rand(0, 360); ?>, 80%, 60%);
                    "></div>
                <?php endfor; ?>
            </div>
            
            <div class="finale-content-container">
                <div class="finale-header-mega">
                    <div class="finale-crown-left">👑</div>
                    <h1 class="finale-main-title">
                        <span class="title-word-1">สุขสันต์</span>
                        <span class="title-word-2">วันวาเลนไทน์</span>
                        <span class="title-word-3">นะค้าบ</span>
                    </h1>
                    <div class="finale-crown-right">👑</div>
                </div>

                <div class="finale-gif-gallery">
                    <div class="gif-item gif-main">
                        <div class="gif-frame-fancy">
                            <img src="https://media.giphy.com/media/3o6Zt6ML6BklcajjsA/giphy.gif" alt="Love" class="gif-image">
                            <div class="gif-shimmer"></div>
                        </div>
                    </div>
                    <div class="gif-row">
                        <div class="gif-item gif-side">
                            <div class="gif-frame-fancy">
                                <img src="https://media.giphy.com/media/26FmQ6EOvLxp6cWyY/giphy.gif" alt="Hearts" class="gif-image">
                                <div class="gif-shimmer"></div>
                            </div>
                        </div>
                        <div class="gif-item gif-side">
                            <div class="gif-frame-fancy">
                                <img src="https://media.giphy.com/media/l0HlSJ5WPs5KiWCT6/giphy.gif" alt="Love2" class="gif-image">
                                <div class="gif-shimmer"></div>
                            </div>
                        </div>
                    </div>
                    <div class="gif-row">
                        <div class="gif-item gif-small">
                            <div class="gif-frame-fancy">
                                <img src="https://media.giphy.com/media/xULW8yDFaLx8WUZmgg/giphy.gif" alt="Cute" class="gif-image">
                                <div class="gif-shimmer"></div>
                            </div>
                        </div>
                        <div class="gif-item gif-small">
                            <div class="gif-frame-fancy">
                                <img src="https://media.giphy.com/media/11HJAPgWZ2SzL2/giphy.gif" alt="Kiss" class="gif-image">
                                <div class="gif-shimmer"></div>
                            </div>
                        </div>
                        <div class="gif-item gif-small">
                            <div class="gif-frame-fancy">
                                <img src="https://media.giphy.com/media/VbEC9WchxkiWTL5PFo/giphy.gif" alt="Heart" class="gif-image">
                                <div class="gif-shimmer"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="finale-message-section">
                    <div class="mega-heart-icon">💝</div>
                    <h2 class="finale-love-message">
                        รักซัมมึนที่สุดในโลก
                    </h2>
                    <div class="message-divider">
                        <span class="divider-dot"></span>
                        <span class="divider-heart">💕</span>
                        <span class="divider-dot"></span>
                    </div>
                    <p class="finale-text-line line-1">เธอคือทุกสิ่งทุกอย่างของเค้า</p>
                    <p class="finale-text-line line-2">เค้าโชคดีมากที่ได้มีเธอ</p>
                    <p class="finale-text-line line-3">ขอให้เราอยู่ด้วยกันไปนานๆ</p>
                    <p class="finale-text-line line-4">รักมากกกกกกก ❤️ ❤️ ❤️</p>
                    <div class="mega-heart-icon">💖</div>
                </div>

                <div class="finale-special-effects">
                    <div class="rotating-hearts-ring">
                        <?php for($i = 0; $i < 12; $i++): ?>
                            <div class="ring-heart" style="
                                --rotation: <?php echo $i * 30; ?>deg;
                                animation-delay: <?php echo $i * 0.1; ?>s;
                            ">❤️</div>
                        <?php endfor; ?>
                    </div>
                </div>

                <button class="finale-close-button" id="finaleCloseBtn">
                    <span class="close-btn-bg"></span>
                    <span class="close-btn-text">
                        <span class="btn-icon">💕</span>
                        <span class="btn-label">ปิด</span>
                        <span class="btn-icon">💕</span>
                    </span>
                    <div class="close-btn-ripple"></div>
                </button>
            </div>

            <div class="finale-floating-hearts">
                <?php for($i = 0; $i < 80; $i++): ?>
                    <div class="finale-heart-float" style="
                        left: <?php echo rand(0, 100); ?>%;
                        animation-delay: <?php echo rand(0, 5000) / 1000; ?>s;
                        animation-duration: <?php echo rand(8, 18); ?>s;
                        font-size: <?php echo rand(20, 70); ?>px;
                        opacity: <?php echo rand(50, 100) / 100; ?>;
                    ">❤️</div>
                <?php endfor; ?>
            </div>

            <div class="finale-confetti-burst">
                <?php for($i = 0; $i < 150; $i++): ?>
                    <div class="confetti-piece" style="
                        left: <?php echo rand(0, 100); ?>%;
                        background: hsl(<?php echo rand(0, 360); ?>, 75%, 65%);
                        animation-delay: <?php echo rand(0, 3000) / 1000; ?>s;
                        animation-duration: <?php echo rand(3, 8); ?>s;
                        width: <?php echo rand(5, 15); ?>px;
                        height: <?php echo rand(10, 25); ?>px;
                    "></div>
                <?php endfor; ?>
            </div>

            <div class="finale-sparkle-storm">
                <?php for($i = 0; $i < 60; $i++): ?>
                    <div class="storm-sparkle" style="
                        top: <?php echo rand(0, 100); ?>%;
                        left: <?php echo rand(0, 100); ?>%;
                        animation-delay: <?php echo rand(0, 4000) / 1000; ?>s;
                        font-size: <?php echo rand(15, 40); ?>px;
                    ">✨</div>
                <?php endfor; ?>
            </div>
        </div>

        <div class="ambient-elements-layer">
            <div class="petals-shower">
                <?php for($i = 0; $i < 80; $i++): ?>
                    <div class="petal-element" style="
                        left: <?php echo rand(0, 100); ?>%;
                        animation-delay: <?php echo rand(0, 8000) / 1000; ?>s;
                        animation-duration: <?php echo rand(8, 16); ?>s;
                        font-size: <?php echo rand(20, 40); ?>px;
                        opacity: <?php echo rand(60, 100) / 100; ?>;
                    ">🌸</div>
                <?php endfor; ?>
            </div>

            <div class="butterflies-dance">
                <?php for($i = 0; $i < 25; $i++): ?>
                    <div class="butterfly-element" style="
                        top: <?php echo rand(10, 90); ?>%;
                        animation-delay: <?php echo rand(0, 10000) / 1000; ?>s;
                        animation-duration: <?php echo rand(20, 35); ?>s;
                        font-size: <?php echo rand(25, 45); ?>px;
                    ">🦋</div>
                <?php endfor; ?>
            </div>

            <div class="bubbles-float">
                <?php for($i = 0; $i < 50; $i++): ?>
                    <div class="bubble-element" style="
                        left: <?php echo rand(0, 100); ?>%;
                        width: <?php echo rand(30, 120); ?>px;
                        height: <?php echo rand(30, 120); ?>px;
                        animation-delay: <?php echo rand(0, 12000) / 1000; ?>s;
                        animation-duration: <?php echo rand(10, 20); ?>s;
                    "></div>
                <?php endfor; ?>
            </div>

            <div class="snowflakes-drift">
                <?php for($i = 0; $i < 60; $i++): ?>
                    <div class="snowflake-element" style="
                        left: <?php echo rand(0, 100); ?>%;
                        animation-delay: <?php echo rand(0, 10000) / 1000; ?>s;
                        animation-duration: <?php echo rand(12, 25); ?>s;
                        font-size: <?php echo rand(18, 40); ?>px;
                    ">❄️</div>
                <?php endfor; ?>
            </div>

            <div class="magic-dust-sparkle">
                <?php for($i = 0; $i < 200; $i++): ?>
                    <div class="dust-sparkle-particle" style="
                        top: <?php echo rand(0, 100); ?>%;
                        left: <?php echo rand(0, 100); ?>%;
                        width: <?php echo rand(1, 3); ?>px;
                        height: <?php echo rand(1, 3); ?>px;
                        animation-delay: <?php echo rand(0, 6000) / 1000; ?>s;
                        animation-duration: <?php echo rand(2, 6); ?>s;
                    "></div>
                <?php endfor; ?>
            </div>
        </div>

        <div class="rainbow-arc-layer">
            <div class="rainbow-arc arc-1"></div>
            <div class="rainbow-arc arc-2"></div>
            <div class="rainbow-arc arc-3"></div>
        </div>

        <div class="lightning-flash-layer">
            <?php for($i = 0; $i < 12; $i++): ?>
                <div class="lightning-bolt" style="
                    left: <?php echo rand(10, 90); ?>%;
                    animation-delay: <?php echo rand(0, 15000) / 1000; ?>s;
                    animation-duration: <?php echo rand(2, 5); ?>s;
                "></div>
            <?php endfor; ?>
        </div>
    </div>

    <div class="cursor-follower" id="cursorFollower">
        <span class="cursor-emoji">💕</span>
    </div>

    <div class="click-ripple-container" id="clickRippleContainer"></div>

    <div class="music-player-control" id="musicPlayer">
        <button class="music-toggle-btn" id="musicToggleBtn">
            <span class="music-icon playing">🎵</span>
            <span class="music-icon paused">🔇</span>
        </button>
        <div class="music-visualizer">
            <?php for($i = 0; $i < 5; $i++): ?>
                <div class="visualizer-bar" style="animation-delay: <?php echo $i * 0.1; ?>s;"></div>
            <?php endfor; ?>
        </div>
    </div>

    <script src="main-script.js"></script>
    <script src="animations-controller.js"></script>
    <script src="particles-engine.js"></script>
    <script src="effects-handler.js"></script>
</body>
</html>