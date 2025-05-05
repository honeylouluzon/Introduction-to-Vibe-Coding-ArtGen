const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

class ConsciousnessImageGenerator {
    constructor() {
        this.promptTemplates = {
            base: [
                "cosmic consciousness, {style}, {elements}, {mood}, {details}, {quality}",
                "quantum mindscape, {style}, {elements}, {mood}, {details}, {quality}",
                "neural dreamscape, {style}, {elements}, {mood}, {details}, {quality}"
            ],
            style: [
                "cyberpunk", "surrealist", "abstract", "fractal", "psychedelic",
                "futuristic", "ethereal", "geometric", "minimalist", "baroque"
            ],
            elements: [
                "flowing energy patterns", "neural networks", "quantum particles",
                "consciousness streams", "digital landscapes", "cosmic structures",
                "mind maps", "energy fields", "thought patterns", "reality warping"
            ],
            mood: [
                "transcendent", "mystical", "enlightened", "awakened",
                "cosmic", "ethereal", "divine", "infinite", "expanded"
            ],
            details: [
                "intricate details", "highly detailed", "complex patterns",
                "detailed textures", "fine details", "microscopic details"
            ],
            quality: [
                "masterpiece", "best quality", "high resolution", "8k",
                "ultra detailed", "professional", "award winning"
            ]
        };
    }

    generateConsciousnessPrompt(D, A, S) {
        const d = D / 100;
        const a = A / 100;
        const s = S / 100;

        const complexity = (d * 0.4 + a * 0.3 + s * 0.3);
        const baseTemplate = this.promptTemplates.base[Math.floor(Math.random() * this.promptTemplates.base.length)];

        let style = this.promptTemplates.style[Math.floor(Math.random() * this.promptTemplates.style.length)];
        if (d > 0.7) style += ", data visualization";
        if (a > 0.7) style += ", academic";
        if (s > 0.7) style += ", complex";

        const elements = [];
        if (d > 0.5) elements.push("information streams");
        if (a > 0.5) elements.push("knowledge structures");
        if (s > 0.5) elements.push("cognitive patterns");
        elements.push(this.promptTemplates.elements[Math.floor(Math.random() * this.promptTemplates.elements.length)]);

        let mood = this.promptTemplates.mood[Math.floor(Math.random() * this.promptTemplates.mood.length)];
        if (complexity > 0.8) mood += ", transcendent";
        else if (complexity > 0.6) mood += ", enlightened";

        const details = this.promptTemplates.details[Math.floor(Math.random() * this.promptTemplates.details.length)];
        const quality = this.promptTemplates.quality[Math.floor(Math.random() * this.promptTemplates.quality.length)];

        const prompt = baseTemplate.replace("{style}", style)
                                   .replace("{elements}", elements.join(", "))
                                   .replace("{mood}", mood)
                                   .replace("{details}", details)
                                   .replace("{quality}", quality);

        const negativePrompt = "blurry, low quality, distorted, ugly, bad anatomy, text, watermark";

        return { prompt, negativePrompt };
    }

    async generateImage(D, A, S, outputPath = "generated_image.png") {
        const { prompt } = this.generateConsciousnessPrompt(D, A, S);

        console.log(`Generating image with parameters: D=${D}, A=${A}, S=${S}`);
        console.log(`Saving image to: ${outputPath}`);

        const canvas = createCanvas(512, 512);
        const ctx = canvas.getContext('2d');

        // Draw background
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Add text prompt as placeholder (replace with actual AI generation logic)
        ctx.fillStyle = 'white';
        ctx.font = '20px Arial';
        ctx.fillText(prompt, 10, 50);

        // Save image to file
        const buffer = canvas.toBuffer('image/png');
        fs.writeFileSync(outputPath, buffer);

        // Log if the image buffer is created successfully
        if (buffer) {
            console.log('Image buffer created successfully.');
        } else {
            console.error('Failed to create image buffer.');
        }

        return { prompt, path: outputPath };
    }
}

// Example usage
(async () => {
    const generator = new ConsciousnessImageGenerator();
    const result = await generator.generateImage(75, 80, 85);
    console.log(`Generated image with prompt: ${result.prompt}`);
    console.log(`Saved to: ${result.path}`);
})();




