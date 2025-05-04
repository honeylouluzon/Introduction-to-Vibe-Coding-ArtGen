// API handling functions for Consciousness Image Generator

// Function to generate AI image
async function generateAIImage(params) {
    try {
        const response = await fetch('/generate-image', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        });
        
        if (!response.ok) {
            throw new Error(`Server returned ${response.status}: ${response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error generating AI image:', error);
        throw error;
    }
}

// Function to save generated image
async function saveGeneratedImage(imagePath, params) {
    try {
        const response = await fetch('/save-image', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                path: imagePath,
                params: params
            })
        });
        
        if (!response.ok) {
            throw new Error(`Server returned ${response.status}: ${response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error saving image:', error);
        throw error;
    }
}

// Function to handle generation button click
function setupGenerateButton() {
    const generateAIBtn = document.getElementById('generateAIBtn');
    
    if (generateAIBtn) {
        generateAIBtn.addEventListener('click', async () => {
            // Get parameter values
            const D = parseInt(document.getElementById('informationDensity').value);
            const A = parseInt(document.getElementById('knowledgeBase').value);
            const S = parseInt(document.getElementById('cognitiveComplexity').value);
            
            // Show loading indicator
            const loadingIndicator = document.querySelector('.loading-indicator');
            if (loadingIndicator) {
                loadingIndicator.style.display = 'block';
            }
            
            try {
                // Generate image
                const result = await generateAIImage({ D, A, S });
                
                // Update image display
                const generatedImageContainer = document.getElementById('generatedImageContainer');
                const generatedImage = document.getElementById('generatedAIImage');
                
                if (generatedImage) {
                    // Update image with timestamp to prevent caching
                    generatedImage.src = result.path + '?t=' + new Date().getTime();
                    
                    // Show image container
                    if (generatedImageContainer) {
                        generatedImageContainer.style.display = 'block';
                    }
                    
                    // Update parameter displays if they exist
                    const imageDensity = document.getElementById('imageDensity');
                    const imageKnowledge = document.getElementById('imageKnowledge');
                    const imageComplexity = document.getElementById('imageComplexity');
                    
                    if (imageDensity) imageDensity.textContent = D;
                    if (imageKnowledge) imageKnowledge.textContent = A;
                    if (imageComplexity) imageComplexity.textContent = S;
                }
            } catch (error) {
                console.error('Failed to generate image:', error);
                alert('Failed to generate image. Please try again later.');
            } finally {
                // Hide loading indicator
                if (loadingIndicator) {
                    loadingIndicator.style.display = 'none';
                }
            }
        });
    }
}

// Set up event listeners when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setupGenerateButton();
    
    // Set up save image button if it exists
    const saveImageBtn = document.getElementById('saveImageBtn');
    if (saveImageBtn) {
        saveImageBtn.addEventListener('click', () => {
            const generatedImage = document.getElementById('generatedAIImage');
            
            if (generatedImage && generatedImage.src) {
                // Create an invisible link and trigger download
                const a = document.createElement('a');
                a.href = generatedImage.src;
                a.download = 'consciousness-image.png';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            } else {
                alert('No image to save. Please generate an image first.');
            }
        });
    }
});