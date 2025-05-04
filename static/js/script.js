// Main script for Consciousness Canvas application

// Get DOM elements
const informationDensity = document.getElementById('informationDensity');
const knowledgeBase = document.getElementById('knowledgeBase');
const cognitiveComplexity = document.getElementById('cognitiveComplexity');
const csciValue = document.getElementById('csciValue');
const saveBtn = document.getElementById('saveBtn');
const shareBtn = document.getElementById('shareBtn');
const quantumMode = document.getElementById('quantumMode');
const generateAIBtn = document.getElementById('generateAIBtn');

// Canvas setup
const canvas = document.getElementById('artCanvas');
const ctx = canvas.getContext('2d');

// Interactive elements state
let interactiveElements = [];
let selectedElement = null;
let infoPanel = null;

// Set canvas size
function resizeCanvas() {
    const container = canvas.parentElement;
    canvas.width = container.offsetWidth - 40; // Adjust for padding
    canvas.height = 400; // Fixed height
    
    // Redraw after resize
    drawArt(
        parseInt(informationDensity.value),
        parseInt(knowledgeBase.value),
        parseInt(cognitiveComplexity.value)
    );
}

// Initialize canvas size
window.addEventListener('load', () => {
    resizeCanvas();
    // Initial draw
    drawArt(
        parseInt(informationDensity.value),
        parseInt(knowledgeBase.value),
        parseInt(cognitiveComplexity.value)
    );
    
    // Initialize values display
    updateValueDisplay(informationDensity);
    updateValueDisplay(knowledgeBase);
    updateValueDisplay(cognitiveComplexity);
    
    // Calculate and display initial CSCI value
    updateCSCIValue();
    
    // Check if quantum mode is on by default
    if (quantumMode.checked) {
        initQuantumParticles(50);
        requestAnimationFrame(animateQuantum);
    }
});

window.addEventListener('resize', resizeCanvas);

// Create info panel
function createInfoPanel() {
    infoPanel = document.createElement('div');
    infoPanel.className = 'info-panel';
    infoPanel.innerHTML = `
        <div class="info-header">
            <h3>Element Information</h3>
            <button class="close-btn">&times;</button>
        </div>
        <div class="info-content">
            <p id="elementType">Type: </p>
            <p id="elementValue">Value: </p>
            <p id="elementDescription">Description: </p>
        </div>
    `;
    document.querySelector('.canvas-container').appendChild(infoPanel);
    
    // Add close button functionality
    infoPanel.querySelector('.close-btn').addEventListener('click', () => {
        infoPanel.style.display = 'none';
        selectedElement = null;
    });
}

// Show info panel for selected element
function showInfoPanel(element) {
    if (!infoPanel) {
        createInfoPanel();
    }
    
    const elementType = document.getElementById('elementType');
    const elementValue = document.getElementById('elementValue');
    const elementDescription = document.getElementById('elementDescription');
    
    elementType.textContent = `Type: ${element.type}`;
    elementValue.textContent = `Value: ${element.value}`;
    
    // Set description based on element type
    let description = '';
    switch (element.type) {
        case 'circle':
            description = `This circle represents a layer of cognitive complexity. The size and opacity reflect your knowledge base.`;
            break;
        case 'particle':
            description = `This quantum particle represents a unit of consciousness. Its movement is influenced by uncertainty and wave function collapse.`;
            break;
        case 'connection':
            description = `This connection represents entanglement between consciousness elements, showing how different aspects of your mind are interconnected.`;
            break;
        case 'point':
            description = `This point represents a discrete unit of information in your consciousness profile.`;
            break;
        case 'vortex':
            description = `This vortex represents a concentration of consciousness energy, creating a focal point for information processing.`;
            break;
        case 'wave':
            description = `This wave represents the propagation of consciousness through your mind, carrying information and energy.`;
            break;
        default:
            description = `This element is part of your consciousness visualization.`;
    }
    
    elementDescription.textContent = `Description: ${description}`;
    infoPanel.style.display = 'block';
}

// Check if a point is inside a circle
function isPointInCircle(x, y, centerX, centerY, radius) {
    const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
    return distance <= radius;
}

// Check if a point is near a line
function isPointNearLine(x, y, x1, y1, x2, y2, threshold = 5) {
    const A = x - x1;
    const B = y - y1;
    const C = x2 - x1;
    const D = y2 - y1;
    
    const dot = A * C + B * D;
    const lenSq = C * C + D * D;
    let param = -1;
    
    if (lenSq !== 0) {
        param = dot / lenSq;
    }
    
    let xx, yy;
    
    if (param < 0) {
        xx = x1;
        yy = y1;
    } else if (param > 1) {
        xx = x2;
        yy = y2;
    } else {
        xx = x1 + param * C;
        yy = y1 + param * D;
    }
    
    const dx = x - xx;
    const dy = y - yy;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    return distance <= threshold;
}

// Handle canvas click
canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Check if clicked on an interactive element
    for (let i = interactiveElements.length - 1; i >= 0; i--) {
        const element = interactiveElements[i];
        
        if (element.type === 'circle' && isPointInCircle(x, y, element.centerX, element.centerY, element.radius)) {
            selectedElement = element;
            showInfoPanel(element);
            return;
        } else if (element.type === 'particle' && isPointInCircle(x, y, element.x, element.y, element.size * 2)) {
            selectedElement = element;
            showInfoPanel(element);
            return;
        } else if (element.type === 'connection' && isPointNearLine(x, y, element.x1, element.y1, element.x2, element.y2)) {
            selectedElement = element;
            showInfoPanel(element);
            return;
        } else if (element.type === 'point' && isPointInCircle(x, y, element.x, element.y, 10)) {
            selectedElement = element;
            showInfoPanel(element);
            return;
        } else if (element.type === 'vortex' && isPointInCircle(x, y, element.x, element.y, element.radius)) {
            selectedElement = element;
            showInfoPanel(element);
            return;
        } else if (element.type === 'wave' && isPointNearLine(x, y, element.x1, element.y1, element.x2, element.y2, 15)) {
            selectedElement = element;
            showInfoPanel(element);
            return;
        }
    }
    
    // If no element was clicked, hide the info panel
    if (infoPanel) {
        infoPanel.style.display = 'none';
    }
    selectedElement = null;
});

// Update value displays
function updateValueDisplay(input) {
    const display = input.nextElementSibling;
    display.textContent = input.value;
}

// Calculate CSCI value
function calculateCSCI(D, A, S) {
    // Normalize values to 0-1 range
    const d = D / 100;
    const a = A / 100;
    const s = S / 100;
    
    // Consciousness Equation: CSCI = D * (1 + A) * (1 + S)
    return d * (1 + a) * (1 + s);
}

// Update CSCI value
function updateCSCIValue() {
    const D = parseInt(informationDensity.value);
    const A = parseInt(knowledgeBase.value);
    const S = parseInt(cognitiveComplexity.value);
    
    const csci = calculateCSCI(D, A, S);
    
    // Display with 2 decimal places
    csciValue.textContent = csci.toFixed(2);
}

// Draw non-quantum art
function drawStandardArt(D, A, S) {
    interactiveElements = [];
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set base styles
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    // Draw background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, `hsla(${D * 3.6}, 70%, 60%, 0.1)`);
    gradient.addColorStop(1, `hsla(${(D * 3.6 + 180) % 360}, 70%, 60%, 0.1)`);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw circular patterns
    const maxCircles = 20 + Math.floor(S / 5);
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    for (let i = 0; i < maxCircles; i++) {
        const radius = (i + 1) * (canvas.height / maxCircles / 2);
        const opacity = 0.1 + (A / 200);
        const hue = (D * 3.6 + i * 10) % 360;
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(${hue}, 70%, 60%, ${opacity})`;
        ctx.lineWidth = 1 + (S / 100);
        ctx.stroke();
        
        // Add to interactive elements
        interactiveElements.push({
            type: 'circle',
            centerX: centerX,
            centerY: centerY,
            radius: radius,
            value: `Radius: ${Math.round(radius)}px, Hue: ${Math.round(hue)}°`
        });
    }
    
    // Draw connection points
    const pointCount = 10 + Math.floor(D / 5);
    const points = [];
    
    for (let i = 0; i < pointCount; i++) {
        const angle = (i / pointCount) * Math.PI * 2;
        const distance = 50 + (A / 2);
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;
        
        points.push({ x, y });
        
        // Draw point
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${(D * 3.6 + i * 30) % 360}, 70%, 60%, 0.8)`;
        ctx.fill();
        
        // Add to interactive elements
        interactiveElements.push({
            type: 'point',
            x: x,
            y: y,
            value: `Position: (${Math.round(x)}, ${Math.round(y)})`
        });
    }
    
    // Draw connections between points
    for (let i = 0; i < points.length; i++) {
        const start = points[i];
        const connectionCount = Math.min(3 + Math.floor(S / 20), points.length - 1);
        
        for (let j = 1; j <= connectionCount; j++) {
            const end = points[(i + j) % points.length];
            
            ctx.beginPath();
            ctx.moveTo(start.x, start.y);
            ctx.lineTo(end.x, end.y);
            ctx.strokeStyle = `hsla(${(D * 3.6 + i * 20) % 360}, 70%, 60%, 0.3)`;
            ctx.lineWidth = 1 + (A / 100);
            ctx.stroke();
            
            // Add to interactive elements
            interactiveElements.push({
                type: 'connection',
                x1: start.x,
                y1: start.y,
                x2: end.x,
                y2: end.y,
                value: `Length: ${Math.round(Math.sqrt((end.x - start.x) ** 2 + (end.y - start.y) ** 2))}px`
            });
        }
    }
}

// Main art drawing function (decides between standard and quantum)
function drawArt(D, A, S) {
    if (quantumMode.checked) {
        // Already handled by animate function
        return;
    } else {
        drawStandardArt(D, A, S);
    }
}

// Event listeners for sliders
informationDensity.addEventListener('input', () => {
    updateValueDisplay(informationDensity);
    updateCSCIValue();
    drawArt(
        parseInt(informationDensity.value),
        parseInt(knowledgeBase.value),
        parseInt(cognitiveComplexity.value)
    );
});

knowledgeBase.addEventListener('input', () => {
    updateValueDisplay(knowledgeBase);
    updateCSCIValue();
    drawArt(
        parseInt(informationDensity.value),
        parseInt(knowledgeBase.value),
        parseInt(cognitiveComplexity.value)
    );
});

cognitiveComplexity.addEventListener('input', () => {
    updateValueDisplay(cognitiveComplexity);
    updateCSCIValue();
    drawArt(
        parseInt(informationDensity.value),
        parseInt(knowledgeBase.value),
        parseInt(cognitiveComplexity.value)
    );
});

// Event listener for save button
saveBtn.addEventListener('click', () => {
    const dataURL = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataURL;
    a.download = 'consciousness-art.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});

// Event listener for share button
shareBtn.addEventListener('click', () => {
    if (navigator.share) {
        canvas.toBlob(blob => {
            const file = new File([blob], 'consciousness-art.png', { type: 'image/png' });
            navigator.share({
                title: 'My Consciousness Art',
                text: 'Check out this consciousness visualization I created!',
                files: [file]
            }).catch(console.error);
        });
    } else {
        alert('Web Share API is not supported in your browser. Try saving the image instead.');
    }
});

// Event listener for quantum mode toggle
quantumMode.addEventListener('change', function() {
    console.log("Quantum mode toggled:", this.checked);
    
    if (this.checked) {
        // Initialize quantum particles
        console.log("Initializing quantum particles");
        initQuantumParticles(50);
        // Start animation
        console.log("Starting quantum animation");
        requestAnimationFrame(animateQuantum);
    } else {
        // Switch back to standard mode
        console.log("Switching to standard mode");
        drawArt(
            parseInt(informationDensity.value),
            parseInt(knowledgeBase.value),
            parseInt(cognitiveComplexity.value)
        );
    }
});

// Event listener for generate AI image button
if (generateAIBtn) {
    generateAIBtn.addEventListener('click', () => {
        const D = parseInt(informationDensity.value);
        const A = parseInt(knowledgeBase.value);
        const S = parseInt(cognitiveComplexity.value);
        
        // Show loading indicator
        document.querySelector('.loading-indicator').style.display = 'block';
        
        // Generate AI image
        fetch('/generate-image', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ D, A, S })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Hide loading indicator
            document.querySelector('.loading-indicator').style.display = 'none';
            
            // Show generated image
            const generatedImageContainer = document.getElementById('generatedImageContainer');
            const generatedImage = document.getElementById('generatedAIImage');
            
            // Update image source with timestamp to prevent caching
            generatedImage.src = data.path + '?t=' + new Date().getTime();
            
            // Show image container
            generatedImageContainer.style.display = 'block';
            
            // Update info fields
            document.getElementById('imageDensity').textContent = D;
            document.getElementById('imageKnowledge').textContent = A;
            document.getElementById('imageComplexity').textContent = S;
        })
        .catch(error => {
            console.error('Error generating image:', error);
            // Hide loading indicator
            document.querySelector('.loading-indicator').style.display = 'none';
            alert('Error generating image. Please try again.');
        });
    });
}