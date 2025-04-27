import torch
from diffusers import StableDiffusionPipeline
from transformers import CLIPTokenizer
import numpy as np
import json
import os

class ConsciousnessImageGenerator:
    def __init__(self):
        # Initialize with a lightweight model for local running
        self.model_id = "CompVis/stable-diffusion-v1-4"
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        self.pipe = StableDiffusionPipeline.from_pretrained(
            self.model_id,
            torch_dtype=torch.float16 if self.device == "cuda" else torch.float32
        ).to(self.device)
        
        # Load consciousness prompt templates
        self.prompt_templates = {
            'base': [
                "cosmic consciousness, {style}, {elements}, {mood}, {details}, {quality}",
                "quantum mindscape, {style}, {elements}, {mood}, {details}, {quality}",
                "neural dreamscape, {style}, {elements}, {mood}, {details}, {quality}"
            ],
            'style': [
                "cyberpunk", "surrealist", "abstract", "fractal", "psychedelic",
                "futuristic", "ethereal", "geometric", "minimalist", "baroque"
            ],
            'elements': [
                "flowing energy patterns", "neural networks", "quantum particles",
                "consciousness streams", "digital landscapes", "cosmic structures",
                "mind maps", "energy fields", "thought patterns", "reality warping"
            ],
            'mood': [
                "transcendent", "mystical", "enlightened", "awakened",
                "cosmic", "ethereal", "divine", "infinite", "expanded"
            ],
            'details': [
                "intricate details", "highly detailed", "complex patterns",
                "detailed textures", "fine details", "microscopic details"
            ],
            'quality': [
                "masterpiece", "best quality", "high resolution", "8k",
                "ultra detailed", "professional", "award winning"
            ]
        }

    def generate_consciousness_prompt(self, D, A, S):
        """Generate a consciousness-based prompt using the parameters"""
        # Normalize parameters to 0-1 range
        d = D / 100
        a = A / 100
        s = S / 100
        
        # Calculate consciousness complexity
        complexity = (d * 0.4 + a * 0.3 + s * 0.3)
        
        # Select template based on complexity
        base_template = np.random.choice(self.prompt_templates['base'])
        
        # Select style based on parameters
        style = np.random.choice(self.prompt_templates['style'])
        if d > 0.7:  # High information density
            style += ", data visualization"
        if a > 0.7:  # High knowledge base
            style += ", academic"
        if s > 0.7:  # High cognitive complexity
            style += ", complex"
            
        # Select elements based on parameters
        elements = []
        if d > 0.5:
            elements.append("information streams")
        if a > 0.5:
            elements.append("knowledge structures")
        if s > 0.5:
            elements.append("cognitive patterns")
        elements.append(np.random.choice(self.prompt_templates['elements']))
        
        # Select mood based on overall complexity
        mood = np.random.choice(self.prompt_templates['mood'])
        if complexity > 0.8:
            mood += ", transcendent"
        elif complexity > 0.6:
            mood += ", enlightened"
            
        # Select details and quality
        details = np.random.choice(self.prompt_templates['details'])
        quality = np.random.choice(self.prompt_templates['quality'])
        
        # Construct final prompt
        prompt = base_template.format(
            style=style,
            elements=", ".join(elements),
            mood=mood,
            details=details,
            quality=quality
        )
        
        # Add negative prompt to avoid unwanted elements
        negative_prompt = "blurry, low quality, distorted, ugly, bad anatomy, text, watermark"
        
        return prompt, negative_prompt

    def generate_image(self, D, A, S, output_path="generated_image.png"):
        """Generate an image based on consciousness parameters"""
        prompt, negative_prompt = self.generate_consciousness_prompt(D, A, S)
        
        # Generate image
        image = self.pipe(
            prompt=prompt,
            negative_prompt=negative_prompt,
            num_inference_steps=50,
            guidance_scale=7.5
        ).images[0]
        
        # Save image
        image.save(output_path)
        
        return {
            "prompt": prompt,
            "negative_prompt": negative_prompt,
            "path": output_path
        }

if __name__ == "__main__":
    # Example usage
    generator = ConsciousnessImageGenerator()
    result = generator.generate_image(75, 80, 85)
    print(f"Generated image with prompt: {result['prompt']}")
    print(f"Saved to: {result['path']}") 