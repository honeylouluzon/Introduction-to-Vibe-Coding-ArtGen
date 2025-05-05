// New Concept Canvas Setup
const newCanvas = document.createElement('canvas');
newCanvas.id = 'newConceptCanvas';
newCanvas.width = 800;
newCanvas.height = 400;
newCanvas.style.border = '1px solid #ddd';
newCanvas.style.borderRadius = '8px';

const newCanvasContainer = document.createElement('div');
newCanvasContainer.style.marginTop = '20px';
newCanvasContainer.appendChild(newCanvas);

document.querySelector('.ai-image').appendChild(newCanvasContainer);

const newCtx = newCanvas.getContext('2d');

async function pause(duration) {
    return new Promise(resolve => setTimeout(resolve, duration));
}

// Function to draw space-themed concept
async function drawSpaceConcept(D, A, S) {
    newCtx.clearRect(0, 0, newCanvas.width, newCanvas.height);

    // Background gradient
    const gradient = newCtx.createLinearGradient(0, 0, newCanvas.width, newCanvas.height);
    gradient.addColorStop(0, `hsl(${D * 3.6}, 50%, 20%)`);
    gradient.addColorStop(1, `hsl(${(D * 3.6 + 180) % 360}, 50%, 10%)`);
    newCtx.fillStyle = gradient;
    newCtx.fillRect(0, 0, newCanvas.width, newCanvas.height);
    
    runloop = 0;
    // Draw stars
    while (runloop < (D + A + S)) {
        if (runloop < D){
            const x = Math.random() * newCanvas.width;
            const y = Math.random() * newCanvas.height;
            const size = Math.random() * 2 + 1;
            newCtx.beginPath();
            newCtx.arc(x, y, size, 0, Math.PI * 2);
            newCtx.fillStyle = `rgba(255, 255, 255, ${Math.random()})`;
            newCtx.fill();
            //await pause(80); // Pause for 10ms between drawing stars
        }

        // Draw planets with limited colors closer to real planets
        const planetColors = ['#ffcc00', '#ff6600', '#cc3300', '#6699ff', '#33cc33'];
        if ( runloop < (A / 10)) {
            const x = Math.random() * newCanvas.width;
            const y = Math.random() * newCanvas.height;
            const radius = Math.random() * 30 + 10;
            newCtx.beginPath();
            newCtx.arc(x, y, radius, 0, Math.PI * 2);
            newCtx.fillStyle = planetColors[Math.floor(Math.random() * planetColors.length)];
            newCtx.fill();
            await pause(90); // Pause for 20ms between drawing planets
       }

        // Draw nebulae
        if (runloop < (S / 10)) {
            const x = Math.random() * newCanvas.width;
            const y = Math.random() * newCanvas.height;
            const radius = Math.random() * 50 + 20;
            const gradient = newCtx.createRadialGradient(x, y, 0, x, y, radius);
            gradient.addColorStop(0, `hsla(${Math.random() * 360}, 70%, 50%, 0.8)`);
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
            newCtx.fillStyle = gradient;
            newCtx.beginPath();
            newCtx.arc(x, y, radius, 0, Math.PI * 2);
            newCtx.fill();
            await pause(100); // Pause for 30ms between drawing nebulae
       }
        if (runloop>(S/10) && runloop>(A/10) && runloop>D) {
            runloop = S + A + D;
            break;
        }
        else{
            runloop++;
        }
        await pause (50);
    }
}

// Example usage
const D = 50; // Information Density
const A = 50; // Knowledge Base
const S = 50; // Cognitive Complexity
drawSpaceConcept(D, A, S);

// Update the space-themed concept dynamically based on slider values
const informationDensitySlider = document.getElementById('informationDensity');
const knowledgeBaseSlider = document.getElementById('knowledgeBase');
const cognitiveComplexitySlider = document.getElementById('cognitiveComplexity');

async function updateSpaceConcept() {
    const D = parseInt(informationDensitySlider.value);
    const A = parseInt(knowledgeBaseSlider.value);
    const S = parseInt(cognitiveComplexitySlider.value);
    await drawSpaceConcept(D, A, S);
}

// Add event listeners to sliders
[informationDensitySlider, knowledgeBaseSlider, cognitiveComplexitySlider].forEach(slider => {
    slider.addEventListener('input', updateSpaceConcept);
});

// Enhance interactivity and animation for stars
let stars = [];
const maxStars = 200;

// Initialize stars
function initializeStars() {
    for (let i = 0; i < maxStars; i++) {
        stars.push({
            x: Math.random() * newCanvas.width,
            y: Math.random() * newCanvas.height,
            size: Math.random() * 2 + 1,
            alpha: Math.random(),
            glow: Math.random() > 0.9, // Some stars glow forever
            lastInteraction: Date.now(),
        });
    }
}

// Update stars based on interaction and time
function updateStars() {
    const now = Date.now();
    stars.forEach(star => {
        if (!star.glow && now - star.lastInteraction > 5000) {
            star.alpha -= 0.01; // Gradually disappear
            if (star.alpha < 0) star.alpha = 0;
        } else {
            star.alpha = Math.min(star.alpha + 0.01, 1); // Regain brightness
        }
    });
}

// Draw stars with updated properties
function drawStars() {
    stars.forEach(star => {
        newCtx.beginPath();
        newCtx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        newCtx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        newCtx.fill();
    });
}

// Handle movement to add stars and change arrangement
newCanvas.addEventListener('mousemove', event => {
    const rect = newCanvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    stars.push({
        x,
        y,
        size: Math.random() * 2 + 1,
        alpha: 1,
        glow: false,
        lastInteraction: Date.now(),
    });

    if (stars.length > maxStars) stars.shift(); // Limit star count

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

// Set canvas to maintain a proportional aspect ratio
function resizeCanvas() {
    const container = newCanvasContainer;
    const aspectRatio = 9 / 16; // Example: 16:9 aspect ratio
    newCanvas.width = container.offsetWidth;
    newCanvas.height = newCanvas.width * aspectRatio;
    drawSpaceConcept(D, A, S); // Redraw the content after resizing
}

// Add event listener for window resize
window.addEventListener('resize', resizeCanvas);

// Initial resize to fit the container
resizeCanvas();

// Slow down the animation loop by 60%
async function animate() {
    newCtx.clearRect(0, 0, newCanvas.width, newCanvas.height);
    await drawSpaceConcept(D, A, S); // Redraw background
    updateStars();
    drawStars();
    setTimeout(() => requestAnimationFrame(animate), 16.67 * 2); // 100% slower
}

initializeStars();
animate();