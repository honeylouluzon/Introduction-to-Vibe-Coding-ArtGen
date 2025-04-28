// Canvas setup
const canvas = document.getElementById('artCanvas');
const ctx = canvas.getContext('2d');

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
});

window.addEventListener('resize', resizeCanvas);

// Get DOM elements
const informationDensity = document.getElementById('informationDensity');
const knowledgeBase = document.getElementById('knowledgeBase');
const cognitiveComplexity = document.getElementById('cognitiveComplexity');
const csciValue = document.getElementById('csciValue');
const saveBtn = document.getElementById('saveBtn');
const shareBtn = document.getElementById('shareBtn');
const quantumMode = document.getElementById('quantumMode');

// Interactive elements state
let interactiveElements = [];
let selectedElement = null;
let infoPanel = null;

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

// Quantum state variables
let quantumState = {
    particles: [],
    lastUpdate: Date.now(),
    uncertainty: 0.5,
    energy: 0,
    fieldStrength: 0,
    turbulence: 0,
    vortices: [],
    waves: [],
    time: 0,
    consciousnessField: {
        strength: 0,
        direction: 0,
        frequency: 0
    }
};

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

// Initialize quantum particles
function initQuantumParticles(count) {
    quantumState.particles = [];
    for (let i = 0; i < count; i++) {
        quantumState.particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 6,
            vy: (Math.random() - 0.5) * 6,
            size: Math.random() * 10 + 3,
            color: `hsl(${Math.random() * 360}, 80%, 60%)`,
            phase: Math.random() * Math.PI * 2,
            energy: Math.random() * 3 + 1,
            spin: Math.random() * Math.PI * 2,
            charge: Math.random() * 2 - 1,
            trail: [],
            maxTrailLength: 30,
            resonance: Math.random() * 2 + 0.5,
            consciousness: Math.random() * 0.5 + 0.5,
            entangled: false,
            entanglementPartner: null
        });
    }
    
    // Initialize vortices
    quantumState.vortices = [];
    const vortexCount = Math.floor(count / 10) + 1;
    for (let i = 0; i < vortexCount; i++) {
        quantumState.vortices.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 50 + 30,
            strength: Math.random() * 2 + 1,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.1,
            color: `hsl(${Math.random() * 360}, 70%, 50%)`,
            pulsePhase: Math.random() * Math.PI * 2,
            pulseSpeed: Math.random() * 0.05 + 0.02
        });
    }
    
    // Initialize waves
    quantumState.waves = [];
    const waveCount = Math.floor(count / 15) + 2;
    for (let i = 0; i < waveCount; i++) {
        const angle = (i / waveCount) * Math.PI * 2;
        const distance = Math.random() * 100 + 50;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const x1 = centerX + Math.cos(angle) * distance;
        const y1 = centerY + Math.sin(angle) * distance;
        const x2 = centerX + Math.cos(angle + Math.PI) * distance;
        const y2 = centerY + Math.sin(angle + Math.PI) * distance;
        
        quantumState.waves.push({
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2,
            amplitude: Math.random() * 20 + 10,
            frequency: Math.random() * 0.1 + 0.05,
            phase: Math.random() * Math.PI * 2,
            speed: Math.random() * 0.05 + 0.02,
            color: `hsl(${Math.random() * 360}, 70%, 50%)`,
            width: Math.random() * 3 + 1
        });
    }
}

// Update quantum particles
function updateQuantumParticles() {
    const now = Date.now();
    const deltaTime = (now - quantumState.lastUpdate) / 1000;
    quantumState.lastUpdate = now;
    quantumState.time += deltaTime;
    
    // Update quantum field properties
    quantumState.uncertainty = cognitiveComplexity.value / 100;
    quantumState.energy = knowledgeBase.value / 100;
    quantumState.fieldStrength = informationDensity.value / 100;
    quantumState.turbulence = (quantumState.uncertainty + quantumState.energy) / 2;
    
    // Update consciousness field
    quantumState.consciousnessField.strength = quantumState.fieldStrength * 3;
    quantumState.consciousnessField.direction = (quantumState.time * 0.2) % (Math.PI * 2);
    quantumState.consciousnessField.frequency = quantumState.uncertainty * 5;
    
    // Update vortices
    quantumState.vortices.forEach(vortex => {
        vortex.rotation += vortex.rotationSpeed * deltaTime;
        vortex.pulsePhase += vortex.pulseSpeed * deltaTime;
        vortex.radius = (Math.sin(vortex.pulsePhase) * 0.2 + 1) * vortex.radius;
    });
    
    // Update waves
    quantumState.waves.forEach(wave => {
        wave.phase += wave.speed * deltaTime;
    });
    
    // Update each particle
    quantumState.particles.forEach(particle => {
        // Store previous position for trail
        particle.trail.unshift({ x: particle.x, y: particle.y });
        if (particle.trail.length > particle.maxTrailLength) {
            particle.trail.pop();
        }
        
        // Apply consciousness field effects
        const fieldAngle = quantumState.consciousnessField.direction;
        const fieldForce = quantumState.consciousnessField.strength * 
                          Math.sin(quantumState.consciousnessField.frequency * quantumState.time + particle.phase);
        particle.vx += Math.cos(fieldAngle) * fieldForce * deltaTime;
        particle.vy += Math.sin(fieldAngle) * fieldForce * deltaTime;
        
        // Apply vortex effects
        quantumState.vortices.forEach(vortex => {
            const dx = particle.x - vortex.x;
            const dy = particle.y - vortex.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < vortex.radius * 2) {
                const angle = Math.atan2(dy, dx);
                const force = (1 - distance / (vortex.radius * 2)) * vortex.strength * 2;
                const tangentAngle = angle + Math.PI / 2;
                
                particle.vx += Math.cos(tangentAngle) * force * deltaTime * 
                              Math.sin(vortex.rotation + particle.phase);
                particle.vy += Math.sin(tangentAngle) * force * deltaTime * 
                              Math.sin(vortex.rotation + particle.phase);
            }
        });
        
        // Apply wave effects
        quantumState.waves.forEach(wave => {
            const waveValue = Math.sin(wave.phase + wave.frequency * 
                                     (particle.x * Math.cos(Math.atan2(wave.y2 - wave.y1, wave.x2 - wave.x1)) + 
                                      particle.y * Math.sin(Math.atan2(wave.y2 - wave.y1, wave.x2 - wave.x1))));
            
            particle.vx += waveValue * wave.amplitude * 0.1 * deltaTime;
            particle.vy += waveValue * wave.amplitude * 0.1 * deltaTime;
        });
        
        // Apply turbulence
        particle.vx += (Math.random() - 0.5) * quantumState.turbulence * 6;
        particle.vy += (Math.random() - 0.5) * quantumState.turbulence * 6;
        
        // Apply energy-based effects
        const energyFactor = particle.energy * quantumState.energy;
        particle.size = (Math.random() * 4 + 2) * energyFactor;
        
        // Update spin and phase
        particle.spin += deltaTime * 3;
        particle.phase += deltaTime * 4 * particle.resonance;
        
        // Apply wave function collapse (more dramatic)
        if (Math.random() < 0.03) {
            particle.phase = Math.random() * Math.PI * 2;
            particle.charge *= -1;
            particle.energy = Math.random() * 3 + 1;
            
            // Entanglement effect
            if (!particle.entangled && Math.random() < 0.3) {
                const potentialPartners = quantumState.particles.filter(p => 
                    p !== particle && !p.entangled && 
                    Math.abs(p.charge - particle.charge) < 0.5);
                
                if (potentialPartners.length > 0) {
                    const partner = potentialPartners[Math.floor(Math.random() * potentialPartners.length)];
                    particle.entangled = true;
                    particle.entanglementPartner = partner;
                    partner.entangled = true;
                    partner.entanglementPartner = particle;
                    
                    // Synchronize properties
                    partner.phase = particle.phase;
                    partner.charge = particle.charge;
                }
            }
        }
        
        // Update entangled particles
        if (particle.entangled && particle.entanglementPartner) {
            const dx = particle.x - particle.entanglementPartner.x;
            const dy = particle.y - particle.entanglementPartner.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Entangled particles influence each other
            if (distance > 50) {
                const angle = Math.atan2(dy, dx);
                const force = 0.1 * (distance - 50);
                particle.vx -= Math.cos(angle) * force * deltaTime;
                particle.vy -= Math.sin(angle) * force * deltaTime;
                particle.entanglementPartner.vx += Math.cos(angle) * force * deltaTime;
                particle.entanglementPartner.vy += Math.sin(angle) * force * deltaTime;
            }
        }
        
        // Update position with velocity damping
        particle.vx *= 0.98;
        particle.vy *= 0.98;
        particle.x += particle.vx * deltaTime * 60;
        particle.y += particle.vy * deltaTime * 60;
        
        // Bounce off walls with energy loss
        if (particle.x < 0 || particle.x > canvas.width) {
            particle.vx *= -0.8;
            particle.x = Math.max(0, Math.min(canvas.width, particle.x));
            particle.energy *= 0.95;
        }
        if (particle.y < 0 || particle.y > canvas.height) {
            particle.vy *= -0.8;
            particle.y = Math.max(0, Math.min(canvas.height, particle.y));
            particle.energy *= 0.95;
        }
    });
}

// Draw quantum particles
function drawQuantumParticles() {
    // Clear interactive elements for quantum mode
    interactiveElements = [];
    
    // Draw background effects
    drawBackgroundEffects();
    
    // Draw waves
    drawWaves();
    
    // Draw vortices
    drawVortices();
    
    // Draw particle trails and connections first
    quantumState.particles.forEach(particle => {
        // Draw trail
        if (particle.trail.length > 1) {
            ctx.beginPath();
            ctx.moveTo(particle.trail[0].x, particle.trail[0].y);
            for (let i = 1; i < particle.trail.length; i++) {
                const point = particle.trail[i];
                const alpha = 1 - (i / particle.trail.length);
                ctx.strokeStyle = particle.color.replace(')', `, ${alpha * 0.4})`).replace('hsl', 'hsla');
                ctx.lineWidth = particle.size * 0.5;
                ctx.lineTo(point.x, point.y);
            }
            ctx.stroke();
        }
        
        // Draw connections with energy-based effects
        quantumState.particles.forEach(otherParticle => {
            if (particle !== otherParticle) {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                // Draw entanglement connections
                if (particle.entangled && particle.entanglementPartner === otherParticle) {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    const alpha = 0.7 * (1 - distance / 200);
                    ctx.strokeStyle = `hsla(${(particle.spin * 180 / Math.PI + 180) % 360}, 100%, 70%, ${alpha})`;
                    ctx.lineWidth = 3;
                    ctx.stroke();
                    
                    // Add to interactive elements
                    interactiveElements.push({
                        type: 'connection',
                        x1: particle.x,
                        y1: particle.y,
                        x2: otherParticle.x,
                        y2: otherParticle.y,
                        value: `Entangled: ${particle.charge > 0 ? '+' : '-'}`
                    });
                }
                // Draw regular connections
                else if (distance < 150) {
                    const energy = (particle.energy + otherParticle.energy) / 2;
                    const chargeEffect = particle.charge * otherParticle.charge;
                    const alpha = (0.2 + energy * 0.3) * (1 - distance / 150);
                    
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.strokeStyle = `hsla(${(particle.spin * 180 / Math.PI + 180) % 360}, 70%, 50%, ${alpha})`;
                    ctx.lineWidth = 2 + energy;
                    ctx.stroke();
                    
                    // Add to interactive elements
                    interactiveElements.push({
                        type: 'connection',
                        x1: particle.x,
                        y1: particle.y,
                        x2: otherParticle.x,
                        y2: otherParticle.y,
                        value: `Energy: ${energy.toFixed(2)}`
                    });
                }
            }
        });
    });
    
    // Draw particles
    quantumState.particles.forEach(particle => {
        // Calculate wave function influence
        const waveInfluence = Math.sin(particle.phase) * 0.5 + 0.5;
        const spinInfluence = Math.sin(particle.spin) * 0.5 + 0.5;
        const energyGlow = particle.energy * 0.5;
        
        // Draw particle glow
        const gradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.size * 4
        );
        gradient.addColorStop(0, particle.color.replace(')', `, ${0.3 + energyGlow})`).replace('hsl', 'hsla'));
        gradient.addColorStop(1, particle.color.replace(')', ', 0)').replace('hsl', 'hsla'));
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 4, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Draw particle core
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * (1 + waveInfluence * 0.5), 0, Math.PI * 2);
        ctx.fillStyle = particle.color.replace(')', `, ${0.5 + waveInfluence * 0.5})`).replace('hsl', 'hsla');
        ctx.fill();
        
        // Draw spin effect
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 1.5, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(${(particle.spin * 180 / Math.PI + 180) % 360}, 70%, 50%, ${0.3 + spinInfluence * 0.3})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw entanglement indicator
        if (particle.entangled) {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size * 2.5, 0, Math.PI * 2);
            ctx.strokeStyle = `hsla(${(particle.spin * 180 / Math.PI + 180) % 360}, 100%, 70%, ${0.5})`;
            ctx.lineWidth = 1;
            ctx.setLineDash([5, 5]);
            ctx.stroke();
            ctx.setLineDash([]);
        }
        
        // Add to interactive elements
        interactiveElements.push({
            type: 'particle',
            x: particle.x,
            y: particle.y,
            size: particle.size,
            value: `Energy: ${particle.energy.toFixed(2)}, Charge: ${particle.charge > 0 ? '+' : '-'}`
        });
    });
}

// Draw background effects
function drawBackgroundEffects() {
    // Draw consciousness field
    const fieldStrength = quantumState.consciousnessField.strength;
    const fieldDirection = quantumState.consciousnessField.direction;
    const fieldFrequency = quantumState.consciousnessField.frequency;
    
    // Create a gradient for the field
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    const hue = (quantumState.time * 10) % 360;
    const saturation = 70 + fieldStrength * 30;
    const lightness = 20 + fieldStrength * 20;
    
    gradient.addColorStop(0, `hsla(${hue}, ${saturation}%, ${lightness}%, 0.2)`);
    gradient.addColorStop(0.5, `hsla(${(hue + 120) % 360}, ${saturation}%, ${lightness}%, 0.15)`);
    gradient.addColorStop(1, `hsla(${(hue + 240) % 360}, ${saturation}%, ${lightness}%, 0.2)`);
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw field lines
    const lineCount = 20;
    const lineLength = Math.min(canvas.width, canvas.height) * 0.4;
    
    for (let i = 0; i < lineCount; i++) {
        const angle = (i / lineCount) * Math.PI * 2 + fieldDirection;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        
        for (let j = 0; j <= 10; j++) {
            const t = j / 10;
            const x = centerX + Math.cos(angle) * lineLength * t;
            const y = centerY + Math.sin(angle) * lineLength * t;
            
            // Add wave effect to field lines
            const waveOffset = Math.sin(quantumState.time * fieldFrequency + t * 10) * 10 * fieldStrength;
            const perpendicularAngle = angle + Math.PI / 2;
            
            const finalX = x + Math.cos(perpendicularAngle) * waveOffset;
            const finalY = y + Math.sin(perpendicularAngle) * waveOffset;
            
            if (j === 0) {
                ctx.moveTo(finalX, finalY);
            } else {
                ctx.lineTo(finalX, finalY);
            }
        }
        
        const alpha = 0.1 + fieldStrength * 0.2;
        ctx.strokeStyle = `hsla(${hue}, 70%, 50%, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
    }
}

// Draw vortices
function drawVortices() {
    quantumState.vortices.forEach(vortex => {
        // Draw vortex glow
        const gradient = ctx.createRadialGradient(
            vortex.x, vortex.y, 0,
            vortex.x, vortex.y, vortex.radius * 2
        );
        gradient.addColorStop(0, vortex.color.replace(')', ', 0.3)').replace('hsl', 'hsla'));
        gradient.addColorStop(1, vortex.color.replace(')', ', 0)').replace('hsl', 'hsla'));
        
        ctx.beginPath();
        ctx.arc(vortex.x, vortex.y, vortex.radius * 2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Draw vortex rings
        const ringCount = 5;
        for (let i = 0; i < ringCount; i++) {
            const ringRadius = vortex.radius * (1 - i / ringCount);
            const ringRotation = vortex.rotation + i * 0.5;
            
            ctx.beginPath();
            ctx.arc(vortex.x, vortex.y, ringRadius, 0, Math.PI * 2);
            ctx.strokeStyle = vortex.color.replace(')', `, ${0.3 - i * 0.05})`).replace('hsl', 'hsla');
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // Draw rotation indicators
            const indicatorCount = 8;
            for (let j = 0; j < indicatorCount; j++) {
                const angle = (j / indicatorCount) * Math.PI * 2 + ringRotation;
                const x1 = vortex.x + Math.cos(angle) * ringRadius;
                const y1 = vortex.y + Math.sin(angle) * ringRadius;
                const x2 = vortex.x + Math.cos(angle) * (ringRadius + 5);
                const y2 = vortex.y + Math.sin(angle) * (ringRadius + 5);
                
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.strokeStyle = vortex.color.replace(')', `, ${0.5 - i * 0.05})`).replace('hsl', 'hsla');
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
        
        // Add to interactive elements
        interactiveElements.push({
            type: 'vortex',
            x: vortex.x,
            y: vortex.y,
            radius: vortex.radius,
            value: `Strength: ${vortex.strength.toFixed(2)}`
        });
    });
}

// Draw waves
function drawWaves() {
    quantumState.waves.forEach(wave => {
        const angle = Math.atan2(wave.y2 - wave.y1, wave.x2 - wave.x1);
        const length = Math.sqrt(
            Math.pow(wave.x2 - wave.x1, 2) + 
            Math.pow(wave.y2 - wave.y1, 2)
        );
        
        // Draw wave path
        ctx.beginPath();
        ctx.moveTo(wave.x1, wave.y1);
        
        const segmentCount = 50;
        for (let i = 0; i <= segmentCount; i++) {
            const t = i / segmentCount;
            const x = wave.x1 + (wave.x2 - wave.x1) * t;
            const y = wave.y1 + (wave.y2 - wave.y1) * t;
            
            // Add wave effect
            const waveOffset = Math.sin(wave.phase + wave.frequency * length * t) * wave.amplitude;
            const perpendicularAngle = angle + Math.PI / 2;
            
            const finalX = x + Math.cos(perpendicularAngle) * waveOffset;
            const finalY = y + Math.sin(perpendicularAngle) * waveOffset;
            
            if (i === 0) {
                ctx.moveTo(finalX, finalY);
            } else {
                ctx.lineTo(finalX, finalY);
            }
        }
        
        ctx.strokeStyle = wave.color.replace(')', ', 0.5)').replace('hsl', 'hsla');
        ctx.lineWidth = wave.width;
        ctx.stroke();
        
        // Add to interactive elements
        interactiveElements.push({
            type: 'wave',
            x1: wave.x1,
            y1: wave.y1,
            x2: wave.x2,
            y2: wave.y2,
            value: `Frequency: ${wave.frequency.toFixed(2)}`
        });
    });
}

// Generate art based on parameters
function drawArt(D, A, S) {
    const csci = calculateCSCI(D, A, S);
    csciValue.textContent = csci.toFixed(3);
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Clear interactive elements
    interactiveElements = [];
    
    if (quantumMode.checked) {
        // Quantum visualization mode
        // Initialize particles if needed
        if (quantumState.particles.length === 0) {
            initQuantumParticles(Math.floor(D / 2) + 20);
        }
        
        // Update and draw quantum particles
        updateQuantumParticles();
        drawQuantumParticles();
    } else {
        // Standard visualization mode
        // Set up gradient background
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, `hsl(${D * 3.6}, ${A}%, ${S}%)`);
        gradient.addColorStop(1, `hsl(${(D * 3.6 + 180) % 360}, ${A}%, ${S}%)`);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw geometric patterns
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const maxRadius = Math.min(canvas.width, canvas.height) * 0.4;
        
        // Draw multiple circles based on cognitive complexity
        for (let i = 0; i < S / 10; i++) {
            const radius = maxRadius * (1 - i / (S / 10));
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 + (A / 100) * 0.5})`;
            ctx.lineWidth = D / 20;
            ctx.stroke();
            
            // Add to interactive elements
            interactiveElements.push({
                type: 'circle',
                centerX: centerX,
                centerY: centerY,
                radius: radius,
                value: `Layer ${i + 1}`
            });
        }
        
        // Add information density patterns
        for (let i = 0; i < D / 5; i++) {
            const angle = (i / (D / 5)) * Math.PI * 2;
            const x = centerX + Math.cos(angle) * maxRadius;
            const y = centerY + Math.sin(angle) * maxRadius;
            
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + (A / 100) * 0.7})`;
            ctx.fill();
            
            // Add to interactive elements
            interactiveElements.push({
                type: 'point',
                x: x,
                y: y,
                value: `Point ${i + 1}`
            });
        }
    }
    
    // Generate image after drawing
    generateImage();
}

// Animation loop for quantum mode
let animationFrameId = null;
function animate() {
    if (quantumMode.checked) {
        drawArt(
            parseInt(informationDensity.value),
            parseInt(knowledgeBase.value),
            parseInt(cognitiveComplexity.value)
        );
        animationFrameId = requestAnimationFrame(animate);
    } else {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
    }
}

// Event listeners for sliders
[informationDensity, knowledgeBase, cognitiveComplexity].forEach(input => {
    input.addEventListener('input', () => {
        updateValueDisplay(input);
        drawArt(
            parseInt(informationDensity.value),
            parseInt(knowledgeBase.value),
            parseInt(cognitiveComplexity.value)
        );
    });
});

// Event listener for quantum mode toggle
quantumMode.addEventListener('change', () => {
    if (quantumMode.checked) {
        // Reset quantum state when enabling
        quantumState.particles = [];
        quantumState.vortices = [];
        quantumState.waves = [];
        quantumState.lastUpdate = Date.now();
        quantumState.time = 0;
        // Initialize particles immediately
        initQuantumParticles(Math.floor(parseInt(informationDensity.value) / 2) + 20);
        // Start animation
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
        animate();
    } else {
        // Stop animation
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
        // Draw once when disabling
        drawArt(
            parseInt(informationDensity.value),
            parseInt(knowledgeBase.value),
            parseInt(cognitiveComplexity.value)
        );
    }
});

// Save artwork
saveBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'consciousness-art.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
});

// Share artwork
shareBtn.addEventListener('click', () => {
    const imageData = canvas.toDataURL('image/png');
    const tweetText = "Check out my consciousness art generated with ConsciousCanvas!";
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(tweetUrl, '_blank');
});

// Add loading indicator
const loadingIndicator = document.createElement('div');
loadingIndicator.id = 'loadingIndicator';
loadingIndicator.className = 'loading-indicator';
loadingIndicator.style.display = 'none';
loadingIndicator.innerHTML = `
    <div class="spinner"></div>
    <p>Generating consciousness image...</p>
`;
document.querySelector('.canvas-container').appendChild(loadingIndicator);

// Add image preview container
const imagePreview = document.createElement('div');
imagePreview.id = 'imagePreview';
imagePreview.className = 'image-preview';
imagePreview.style.display = 'none';
document.querySelector('.canvas-container').appendChild(imagePreview);

// Image generation state
let isGenerating = false;
let currentImage = null;

// UI Elements
const imageDensity = document.getElementById('imageDensity');
const imageKnowledge = document.getElementById('imageKnowledge');
const imageComplexity = document.getElementById('imageComplexity');
const saveImageBtn = document.getElementById('saveImageBtn');

// Hide loading indicator and image preview initially
loadingIndicator.style.display = 'none';
imagePreview.style.display = 'none';

// Function to generate image from canvas
async function generateImage() {
    if (isGenerating) return;
    
    isGenerating = true;
    loadingIndicator.style.display = 'block';
    imagePreview.style.display = 'none';
    
    try {
        // Convert canvas to data URL
        const dataUrl = canvas.toDataURL('image/png');
        
        // Update image preview
        generatedImage.src = dataUrl;
        
        // Update info values
        imageDensity.textContent = informationDensity.toFixed(2);
        imageKnowledge.textContent = knowledgeBase.toFixed(2);
        imageComplexity.textContent = cognitiveComplexity.toFixed(2);
        
        // Show image preview
        loadingIndicator.style.display = 'none';
        imagePreview.style.display = 'block';
        
        currentImage = dataUrl;
    } catch (error) {
        console.error('Error generating image:', error);
        loadingIndicator.style.display = 'none';
    }
    
    isGenerating = false;
}

// Save image function
function saveImage() {
    if (!currentImage) return;
    
    const link = document.createElement('a');
    link.download = 'consciousness-art.png';
    link.href = currentImage;
    link.click();
}

// Event Listeners
saveImageBtn.addEventListener('click', saveImage);

// Update generate button click handler
document.getElementById('generateBtn').addEventListener('click', () => {
    drawArt();
    generateImage();
});

// Update image when parameters change
function updateVisualization() {
    drawArt();
    if (generatedImage.src) {
        generateImage();
    }
}

// Add event listener for the new Generate AI Image button
const generateImageBtn = document.getElementById('generateImageBtn');
const generatedImageContainer = document.getElementById('generatedImageContainer');
const generatedImage = document.getElementById('generatedImage');

generateImageBtn.addEventListener('click', async () => {
    const D = parseInt(informationDensity.value);
    const A = parseInt(knowledgeBase.value);
    const S = parseInt(cognitiveComplexity.value);

    // Show loading indicator
    generateImageBtn.textContent = 'Generating...';
    generateImageBtn.disabled = true;

    try {
        // Simulate image generation (replace with actual API call or logic)
        const response = await fetch('/generate-image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ D, A, S })
        });

        if (!response.ok) {
            throw new Error('Failed to generate image');
        }

        const data = await response.json();
        generatedImage.src = data.imageUrl; // Assuming the API returns an image URL
        generatedImageContainer.style.display = 'block';
    } catch (error) {
        console.error('Error generating image:', error);
        alert('Failed to generate image. Please try again.');
    } finally {
        // Reset button state
        generateImageBtn.textContent = 'Generate AI Image';
        generateImageBtn.disabled = false;
    }
});

// Add event listeners to sliders to update AI image dynamically
[informationDensity, knowledgeBase, cognitiveComplexity].forEach(slider => {
    slider.addEventListener('input', () => {
        const D = parseInt(informationDensity.value);
        const A = parseInt(knowledgeBase.value);
        const S = parseInt(cognitiveComplexity.value);

        // Update AI image preview dynamically
        generatedImage.src = `/generate-image-preview?D=${D}&A=${A}&S=${S}`; // Simulated dynamic update
        generatedImageContainer.style.display = 'block';
    });
});

