// Space-themed concept visualization

// Function to resize the space canvas
function resizeSpaceCanvas() {
    const spaceCanvas = document.getElementById('spaceCanvas');
    if (!spaceCanvas) return;
    
    const container = spaceCanvas.parentElement;
    spaceCanvas.width = container.offsetWidth - 40; // Adjust for padding
    spaceCanvas.height = 300; // Fixed height
    
    // Redraw after resize
    drawSpaceConcept(
        parseInt(informationDensity.value),
        parseInt(knowledgeBase.value),
        parseInt(cognitiveComplexity.value)
    );
}

// Initialize space canvas size
window.addEventListener('load', () => {
    const spaceCanvas = document.getElementById('spaceCanvas');
    if (!spaceCanvas) return;
    
    resizeSpaceCanvas();
    initializeStars();
    animate();
});

window.addEventListener('resize', resizeSpaceCanvas);

// Star management
let stars = [];
const maxStars = 200;

// Function to draw space-themed concept
function drawSpaceConcept(D, A, S) {
    const spaceCanvas = document.getElementById('spaceCanvas');
    if (!spaceCanvas) return;
    
    const spaceCtx = spaceCanvas.getContext('2d');
    
    spaceCtx.clearRect(0, 0, spaceCanvas.width, spaceCanvas.height);

    // Background gradient
    const gradient = spaceCtx.createLinearGradient(0, 0, spaceCanvas.width, spaceCanvas.height);
    gradient.addColorStop(0, `hsl(${D * 3.6}, 50%, 20%)`);
    gradient.addColorStop(1, `hsl(${(D * 3.6 + 180) % 360}, 50%, 10%)`);
    spaceCtx.fillStyle = gradient;
    spaceCtx.fillRect(0, 0, spaceCanvas.width, spaceCanvas.height);

    // Draw stars
    for (let i = 0; i < D; i++) {
        const x = Math.random() * spaceCanvas.width;
        const y = Math.random() * spaceCanvas.height;
        const size = Math.random() * 2 + 1;
        spaceCtx.beginPath();
        spaceCtx.arc(x, y, size, 0, Math.PI * 2);
        spaceCtx.fillStyle = `rgba(255, 255, 255, ${Math.random()})`;
        spaceCtx.fill();
    }

    // Draw planets
    for (let i = 0; i < A / 10; i++) {
        const x = Math.random() * spaceCanvas.width;
        const y = Math.random() * spaceCanvas.height;
        const radius = Math.random() * 30 + 10;
        spaceCtx.beginPath();
        spaceCtx.arc(x, y, radius, 0, Math.PI * 2);
        spaceCtx.fillStyle = `hsl(${Math.random() * 360}, 70%, 50%)`;
        spaceCtx.fill();
    }

    // Draw nebulae
    for (let i = 0; i < S / 10; i++) {
        const x = Math.random() * spaceCanvas.width;
        const y = Math.random() * spaceCanvas.height;
        const radius = Math.random() * 50 + 20;
        const gradient = spaceCtx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, `hsla(${Math.random() * 360}, 70%, 50%, 0.8)`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        spaceCtx.fillStyle = gradient;
        spaceCtx.beginPath();
        spaceCtx.arc(x, y, radius, 0, Math.PI * 2);
        spaceCtx.fill();
    }
}

// Initialize stars
function initializeStars() {
    const spaceCanvas = document.getElementById('spaceCanvas');
    if (!spaceCanvas) return;
    
    stars = []; // Clear any existing stars
    for (let i = 0; i < maxStars; i++) {
        stars.push({
            x: Math.random() * spaceCanvas.width,
            y: Math.random() * spaceCanvas.height,
            size: Math.random() * 2 + 1,
            alpha: Math.random(),
            glow: Math.random() > 0.9, // Some stars glow forever
            lastInteraction: Date.now(),
        });
    }
}

// Update stars based on interaction and time
function updateStars() {
    const spaceCanvas = document.getElementById('spaceCanvas');
    if (!spaceCanvas) return;
    
    const now = Date.now();
    const D = parseInt(informationDensity.value);
    const A = parseInt(knowledgeBase.value);
    const S = parseInt(cognitiveComplexity.value);
    
    // Speed factor based on information density
    const speedFactor = D / 50; // normalize to have 1.0 at D=50
    
    stars.forEach(star => {
        if (!star.glow && now - star.lastInteraction > 5000) {
            star.alpha -= 0.01 * speedFactor; // Gradually disappear, faster with high info density
            if (star.alpha < 0) star.alpha = 0;
        } else {
            star.alpha = Math.min(star.alpha + 0.01 * speedFactor, 1); // Regain brightness
        }
        
        // Knowledge base affects star behavior
        if (A > 70 && Math.random() < 0.01) {
            star.size = Math.min(star.size + 0.05, 3); // Larger stars with high knowledge
        }
        
        // Cognitive complexity affects star movement
        if (S > 70 && Math.random() < 0.01) {
            star.x += (Math.random() - 0.5) * 2;
            star.y += (Math.random() - 0.5) * 2;
        }
    });
}

// Draw stars with updated properties
function drawStars() {
    const spaceCanvas = document.getElementById('spaceCanvas');
    if (!spaceCanvas) return;
    
    const spaceCtx = spaceCanvas.getContext('2d');
    
    // Background elements
    const D = parseInt(informationDensity.value);
    const A = parseInt(knowledgeBase.value);
    const S = parseInt(cognitiveComplexity.value);
    
    drawSpaceConcept(D, A, S);
    
    // Draw stars
    stars.forEach(star => {
        spaceCtx.beginPath();
        spaceCtx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        spaceCtx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        spaceCtx.fill();
    });
}

// Handle movement to add stars and change arrangement
function setupSpaceInteraction() {
    const spaceCanvas = document.getElementById('spaceCanvas');
    if (!spaceCanvas) return;
    
    spaceCanvas.addEventListener('mousemove', event => {
        const rect = spaceCanvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        // Add new star at mouse position
        stars.push({
            x,
            y,
            size: Math.random() * 2 + 1,
            alpha: 1,
            glow: false,
            lastInteraction: Date.now(),
        });
    
        // Limit star count
        if (stars.length > maxStars) stars.shift();
    
        // Update nearby stars
        stars.forEach(star => {
            const dx = x - star.x;
            const dy = y - star.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
    
            if (distance < 50) {
                star.x += dx * 0.1;
                star.y += dy * 0.1;
                star.lastInteraction = Date.now();
            }
        });
    });
}

// Animation loop with slowdown
function animate() {
    const spaceCanvas = document.getElementById('spaceCanvas');
    if (!spaceCanvas) return;
    
    updateStars();
    drawStars();
    setTimeout(() => requestAnimationFrame(animate), 16.67 * 1.6); // 60% slower
}

// Connect sliders to space visualization
window.addEventListener('load', () => {
    setupSpaceInteraction();
    
    // Attach slider event listeners
    [informationDensity, knowledgeBase, cognitiveComplexity].forEach(slider => {
        if (slider) {
            slider.addEventListener('input', () => {
                drawSpaceConcept(
                    parseInt(informationDensity.value),
                    parseInt(knowledgeBase.value),
                    parseInt(cognitiveComplexity.value)
                );
            });
        }
    });
});