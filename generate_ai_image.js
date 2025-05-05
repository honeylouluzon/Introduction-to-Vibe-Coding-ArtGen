// Add event listener for the new Generate AI Image button
const generatedImageContainer = document.getElementById('generatedImageContainer');
//const generatedImage = document.getElementById('generatedImage');
const generatedImage = document.getElementById('aiImageCanvas');

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

// Import the ConsciousnessImageGenerator class from image_generator.py
const { exec } = require('child_process');

// Function to trigger AI image generation using image_generator.py
function generateAIImage(D, A, S) {
    const command = `python3 image_generator.py ${D} ${A} ${S}`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error generating image: ${error.message}`);
            return;
        }

        if (stderr) {
            console.error(`Error output: ${stderr}`);
            return;
        }

        console.log(`Image generated successfully: ${stdout}`);
        const result = JSON.parse(stdout);

        // Update the UI with the generated image
        const generatedImage = document.getElementById('aiImageCanvas');
        generatedImage.src = result.path;
        generatedImage.alt = result.prompt;
        document.getElementById('ai-image').style.display = 'block';
    });
}

// Update the Generate AI Image button to use the new function
const generateImageBtn = document.getElementById('generateImageBtn');
generateImageBtn.addEventListener('click', () => {
    const D = parseInt(document.getElementById('informationDensity').value);
    const A = parseInt(document.getElementById('knowledgeBase').value);
    const S = parseInt(document.getElementById('cognitiveComplexity').value);

    generateImageBtn.textContent = 'Generating...';
    generateImageBtn.disabled = true;

    generateAIImage(D, A, S);

    generateImageBtn.textContent = 'Generate AI Image';
    generateImageBtn.disabled = false;
});

// Automatically generate AI image when the page is loaded
window.addEventListener('load', () => {
    const D = parseInt(document.getElementById('informationDensity').value);
    const A = parseInt(document.getElementById('knowledgeBase').value);
    const S = parseInt(document.getElementById('cognitiveComplexity').value);

    generateAIImage(D, A, S);
});

// Automatically regenerate AI image when sliders change
[informationDensity, knowledgeBase, cognitiveComplexity].forEach(slider => {
    slider.addEventListener('input', () => {
        const D = parseInt(document.getElementById('informationDensity').value);
        const A = parseInt(document.getElementById('knowledgeBase').value);
        const S = parseInt(document.getElementById('cognitiveComplexity').value);

        generateAIImage(D, A, S);
    });
});

// Initialize the new AI canvas
const aiCanvas = document.getElementById('aiCanvas');
const aiCtx = aiCanvas.getContext('2d');

// Function to generate and render AI image on the new canvas
async function renderAIImage() {
    const D = parseInt(informationDensity.value);
    const A = parseInt(knowledgeBase.value);
    const S = parseInt(cognitiveComplexity.value);

    // Use ConsciousnessImageGenerator to generate an image
    const generator = new ConsciousnessImageGenerator();
    const { prompt, path } = await generator.generateImage(D, A, S);

    console.log('Rendering AI Image with values:', { D, A, S });
    console.log('Generated prompt:', prompt);
    console.log('Image path:', path);

    const img = new Image();
    img.src = path;
    img.onload = () => {
        aiCtx.clearRect(0, 0, aiCanvas.width, aiCanvas.height);
        aiCtx.drawImage(img, 0, 0, aiCanvas.width, aiCanvas.height);

        // Overlay thoughts using llm.js
        const inputText = `Generated prompt: ${prompt}`;
        generateThoughts(inputText, D / 100, A / 100, S / 100).then(thoughts => {
            aiCtx.font = '16px Arial';
            aiCtx.fillStyle = 'white';
            aiCtx.fillText(thoughts, 10, aiCanvas.height - 20);
        });
    };

    img.onerror = () => {
        console.error('Failed to load image from path:', path);
        aiCtx.clearRect(0, 0, aiCanvas.width, aiCanvas.height);
        aiCtx.fillStyle = 'gray';
        aiCtx.fillRect(0, 0, aiCanvas.width, aiCanvas.height);
        aiCtx.fillStyle = 'white';
        aiCtx.font = '20px Arial';
        aiCtx.fillText('Fallback: Image not available', 10, 50);
    };
}

// Add event listener to dynamically update the AI canvas
[informationDensity, knowledgeBase, cognitiveComplexity].forEach(slider => {
    slider.addEventListener('input', renderAIImage);
});

// Initial render on page load
window.addEventListener('load', renderAIImage);

// --- AI Image Section Logic ---
const aiImageCanvas = document.getElementById('aiImageCanvas');
const aiImageCtx = aiImageCanvas.getContext('2d');
const generateAIImageBtn = document.getElementById('generateAIImageBtn');
const aiImageFallback = document.getElementById('aiImageFallback');

function drawAIImagePlaceholder(D, A, S) {
    aiImageCtx.clearRect(0, 0, aiImageCanvas.width, aiImageCanvas.height);
    // Simple gradient background
    const grad = aiImageCtx.createLinearGradient(0, 0, aiImageCanvas.width, aiImageCanvas.height);
    grad.addColorStop(0, `hsl(${D * 3.6}, 60%, 30%)`);
    grad.addColorStop(1, `hsl(${(D * 3.6 + 180) % 360}, 60%, 10%)`);
    aiImageCtx.fillStyle = grad;
    aiImageCtx.fillRect(0, 0, aiImageCanvas.width, aiImageCanvas.height);
    // Draw some abstract shapes based on parameters
    for (let i = 0; i < Math.max(5, Math.floor(S / 10)); i++) {
        aiImageCtx.beginPath();
        const x = Math.random() * aiImageCanvas.width;
        const y = Math.random() * aiImageCanvas.height;
        const r = Math.random() * (A / 2 + 20) + 10;
        aiImageCtx.arc(x, y, r, 0, 2 * Math.PI);
        aiImageCtx.fillStyle = `hsla(${(D * 3.6 + i * 30) % 360}, 80%, 70%, 0.25)`;
        aiImageCtx.fill();
    }
    // Overlay text
    aiImageCtx.font = 'bold 20px Arial';
    aiImageCtx.fillStyle = '#fff';
    aiImageCtx.fillText('AI Image Preview', 20, 40);
    aiImageCtx.font = '14px Arial';
    aiImageCtx.fillText(`D: ${D}  A: ${A}  S: ${S}`, 20, 65);
}

function showAIFallback(show) {
    aiImageFallback.style.display = show ? 'block' : 'none';
}

function updateAIImage() {
    const D = parseInt(informationDensity.value);
    const A = parseInt(knowledgeBase.value);
    const S = parseInt(cognitiveComplexity.value);
    drawAIImagePlaceholder(D, A, S);
    showAIFallback(false);
}

generateAIImageBtn.addEventListener('click', updateAIImage);
[informationDensity, knowledgeBase, cognitiveComplexity].forEach(slider => {
    slider.addEventListener('input', updateAIImage);
});
// Draw initial placeholder
updateAIImage();