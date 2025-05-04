// Quantum visualization features

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

// Initialize quantum particles
function initQuantumParticles(count) {
    console.log("Initializing quantum particles with count:", count);
    
    // Get the canvas element
    const canvas = document.getElementById('artCanvas');
    if (!canvas) {
        console.error("Canvas element not found");
        return;
    }
    
    console.log("Canvas dimensions:", canvas.width, canvas.height);
    
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
    // Get canvas element
    const canvas = document.getElementById('artCanvas');
    if (!canvas) {
        console.error("Canvas element not found in updateQuantumParticles");
        return;
    }
    
    // Get slider values
    const cognitiveComplexityElem = document.getElementById('cognitiveComplexity');
    const knowledgeBaseElem = document.getElementById('knowledgeBase');
    const informationDensityElem = document.getElementById('informationDensity');
    
    if (!cognitiveComplexityElem || !knowledgeBaseElem || !informationDensityElem) {
        console.error("Missing slider elements");
        return;
    }
    
    const now = Date.now();
    const deltaTime = (now - quantumState.lastUpdate) / 1000;
    quantumState.lastUpdate = now;
    quantumState.time += deltaTime;
    
    // Update quantum field properties
    const cognitiveComplexityValue = parseInt(cognitiveComplexityElem.value);
    const knowledgeBaseValue = parseInt(knowledgeBaseElem.value);
    const informationDensityValue = parseInt(informationDensityElem.value);
    
    quantumState.uncertainty = cognitiveComplexityValue / 100;
    quantumState.energy = knowledgeBaseValue / 100;
    quantumState.fieldStrength = informationDensityValue / 100;
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
            const dx1 = particle.x - wave.x1;
            const dy1 = particle.y - wave.y1;
            const dx2 = particle.x - wave.x2;
            const dy2 = particle.y - wave.y2;
            
            const distance1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
            const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
            
            const waveFactor = Math.sin(wave.phase + quantumState.time * wave.frequency);
            
            if (distance1 < 150 || distance2 < 150) {
                const force = waveFactor * wave.amplitude * 0.01;
                particle.vx += dx1 * force * deltaTime;
                particle.vy += dy1 * force * deltaTime;
            }
        });
        
        // Apply quantum uncertainty
        const uncertainty = quantumState.uncertainty * 10;
        particle.vx += (Math.random() - 0.5) * uncertainty * deltaTime;
        particle.vy += (Math.random() - 0.5) * uncertainty * deltaTime;
        
        // Update position
        particle.x += particle.vx * deltaTime;
        particle.y += particle.vy * deltaTime;
        
        // Apply velocity damping (based on energy level)
        const damping = 0.99 - (quantumState.energy * 0.01);
        particle.vx *= damping;
        particle.vy *= damping;
        
        // Handle boundaries with quantum tunneling possibility
        if (particle.x < -20 || particle.x > canvas.width + 20 || 
            particle.y < -20 || particle.y > canvas.height + 20) {
            // Small chance of tunneling to the other side
            if (Math.random() < 0.1) {
                particle.x = Math.random() * canvas.width;
                particle.y = Math.random() * canvas.height;
                particle.vx = (Math.random() - 0.5) * 2;
                particle.vy = (Math.random() - 0.5) * 2;
            } else {
                // Bounce at the boundaries
                if (particle.x < 0 || particle.x > canvas.width) {
                    particle.vx *= -1;
                    particle.x = Math.max(0, Math.min(canvas.width, particle.x));
                }
                if (particle.y < 0 || particle.y > canvas.height) {
                    particle.vy *= -1;
                    particle.y = Math.max(0, Math.min(canvas.height, particle.y));
                }
            }
        }
        
        // Add to interactive elements
        interactiveElements.push({
            type: 'particle',
            x: particle.x,
            y: particle.y,
            size: particle.size,
            value: `Energy: ${particle.energy.toFixed(2)}, Speed: ${(Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy)).toFixed(2)}`
        });
    });
    
    // Add vortices to interactive elements
    quantumState.vortices.forEach(vortex => {
        interactiveElements.push({
            type: 'vortex',
            x: vortex.x,
            y: vortex.y,
            radius: vortex.radius,
            value: `Strength: ${vortex.strength.toFixed(2)}, Rotation: ${(vortex.rotation * 180 / Math.PI).toFixed(0)}°`
        });
    });
    
    // Add waves to interactive elements
    quantumState.waves.forEach(wave => {
        interactiveElements.push({
            type: 'wave',
            x1: wave.x1,
            y1: wave.y1,
            x2: wave.x2,
            y2: wave.y2,
            value: `Amplitude: ${wave.amplitude.toFixed(2)}, Frequency: ${wave.frequency.toFixed(3)}`
        });
    });
}

// Draw quantum particles
function drawQuantumParticles() {
    // Get canvas and context
    const canvas = document.getElementById('artCanvas');
    if (!canvas) {
        console.error("Canvas element not found in drawQuantumParticles");
        return;
    }
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error("Could not get canvas context");
        return;
    }
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Get parameters
    const informationDensityElem = document.getElementById('informationDensity');
    if (!informationDensityElem) {
        console.error("informationDensity element not found");
        return;
    }
    
    // Draw background with gradient based on information density
    const D = parseInt(informationDensityElem.value);
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, `hsla(${D * 3.6}, 50%, 20%, 0.2)`);
    gradient.addColorStop(1, `hsla(${(D * 3.6 + 180) % 360}, 50%, 10%, 0.2)`);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw waves
    quantumState.waves.forEach(wave => {
        ctx.beginPath();
        
        // Calculate wave points
        const dx = wave.x2 - wave.x1;
        const dy = wave.y2 - wave.y1;
        const length = Math.sqrt(dx * dx + dy * dy);
        const nx = -dy / length; // Normal direction
        const ny = dx / length;
        
        const steps = 50;
        
        ctx.moveTo(wave.x1, wave.y1);
        
        for (let i = 0; i <= steps; i++) {
            const t = i / steps;
            const x = wave.x1 + dx * t;
            const y = wave.y1 + dy * t;
            
            const ampl = wave.amplitude * Math.sin(wave.phase + t * 10);
            const wx = x + nx * ampl;
            const wy = y + ny * ampl;
            
            if (i === 0) {
                ctx.moveTo(wx, wy);
            } else {
                ctx.lineTo(wx, wy);
            }
        }
        
        ctx.strokeStyle = wave.color;
        ctx.lineWidth = wave.width;
        ctx.stroke();
    });
    
    // Draw vortices
    quantumState.vortices.forEach(vortex => {
        const gradient = ctx.createRadialGradient(vortex.x, vortex.y, 0, vortex.x, vortex.y, vortex.radius);
        gradient.addColorStop(0, vortex.color);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.beginPath();
        ctx.arc(vortex.x, vortex.y, vortex.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.globalAlpha = 0.5;
        ctx.fill();
        ctx.globalAlpha = 1;
    });
    
    // Draw particle trails
    quantumState.particles.forEach(particle => {
        // Draw trail
        if (particle.trail.length > 1) {
            ctx.beginPath();
            ctx.moveTo(particle.trail[0].x, particle.trail[0].y);
            
            for (let i = 1; i < particle.trail.length; i++) {
                ctx.lineTo(particle.trail[i].x, particle.trail[i].y);
            }
            
            // Set gradient based on particle color
            const gradient = ctx.createLinearGradient(
                particle.trail[0].x, particle.trail[0].y,
                particle.trail[particle.trail.length - 1].x, particle.trail[particle.trail.length - 1].y
            );
            gradient.addColorStop(0, particle.color);
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = particle.size / 2;
            ctx.lineCap = 'round';
            ctx.stroke();
        }
    });
    
    // Draw particles
    quantumState.particles.forEach(particle => {
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        
        // Glow effect
        const gradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.size * 1.5
        );
        gradient.addColorStop(0, particle.color);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Draw inner particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fill();
    });
}

// Quantum animation loop
function animateQuantum() {
    // Get the checkbox element
    const quantumModeCheckbox = document.getElementById('quantumMode');
    
    // Check if quantum mode is still active
    if (quantumModeCheckbox && !quantumModeCheckbox.checked) {
        console.log("Quantum mode turned off, stopping animation");
        return; // Stop animation if quantum mode is turned off
    }
    
    console.log("Animating quantum mode");
    interactiveElements = []; // Reset interactive elements
    
    updateQuantumParticles();
    drawQuantumParticles();
    
    // Continue animation loop
    requestAnimationFrame(animateQuantum);
}