import os
import random
import math
from PIL import Image, ImageDraw, ImageFilter, ImageFont

class ConsciousnessImageGenerator:
    def __init__(self):
        # Load consciousness prompt templates for prompts (even though we won't use real AI generation)
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
        base_template = random.choice(self.prompt_templates['base'])
        
        # Select style based on parameters
        style = random.choice(self.prompt_templates['style'])
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
        elements.append(random.choice(self.prompt_templates['elements']))
        
        # Select mood based on overall complexity
        mood = random.choice(self.prompt_templates['mood'])
        if complexity > 0.8:
            mood += ", transcendent"
        elif complexity > 0.6:
            mood += ", enlightened"
            
        # Select details and quality
        details = random.choice(self.prompt_templates['details'])
        quality = random.choice(self.prompt_templates['quality'])
        
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

    def generate_image(self, D, A, S, output_path="static/images/generated_image.png"):
        """Generate an image based on consciousness parameters using basic PIL drawing"""
        prompt, negative_prompt = self.generate_consciousness_prompt(D, A, S)
        
        # Create the directory if it doesn't exist
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        
        # Create a procedural image based on the parameters
        # Image size
        width, height = 512, 512
        
        # Create base image with gradient background
        image = Image.new('RGB', (width, height), color=(0, 0, 0))
        draw = ImageDraw.Draw(image)
        
        # Use parameters to determine colors
        d_hue = int(D * 3.6) % 360  # 0-360 color wheel
        a_saturation = 50 + int(A / 2)  # 50-100% saturation
        s_brightness = 30 + int(S / 2)  # 30-80% brightness
        
        # Draw complex gradient background
        for y in range(height):
            for x in range(width):
                # Calculate distance from center
                cx, cy = width / 2, height / 2
                distance = math.sqrt((x - cx) ** 2 + (y - cy) ** 2) / (math.sqrt(cx**2 + cy**2))
                angle = math.atan2(y - cy, x - cx) * 180 / math.pi
                
                # Adjust hue based on angle and distance
                hue = (d_hue + int(angle) + int(distance * 30)) % 360
                
                # Convert HSV to RGB
                h = hue / 360
                s = a_saturation / 100
                v = (s_brightness / 100) * (1 - distance * 0.5)
                
                i = int(h * 6)
                f = h * 6 - i
                p = v * (1 - s)
                q = v * (1 - f * s)
                t = v * (1 - (1 - f) * s)
                
                if i % 6 == 0:
                    r, g, b = v, t, p
                elif i % 6 == 1:
                    r, g, b = q, v, p
                elif i % 6 == 2:
                    r, g, b = p, v, t
                elif i % 6 == 3:
                    r, g, b = p, q, v
                elif i % 6 == 4:
                    r, g, b = t, p, v
                else:
                    r, g, b = v, p, q
                
                # Draw pixel
                draw.point((x, y), fill=(int(r * 255), int(g * 255), int(b * 255)))
        
        # Draw elements based on S (Cognitive Complexity)
        num_elements = 5 + int(S / 10)
        for i in range(num_elements):
            # Circular elements
            x = random.randint(0, width - 1)
            y = random.randint(0, height - 1)
            size = 10 + int((A / 100) * 50)  # Size based on A (Knowledge Base)
            color_offset = random.randint(0, 359)
            element_hue = (d_hue + color_offset) % 360
            
            # Convert to RGB
            h = element_hue / 360
            s = random.uniform(0.7, 1.0)
            v = random.uniform(0.7, 1.0)
            
            i = int(h * 6)
            f = h * 6 - i
            p = v * (1 - s)
            q = v * (1 - f * s)
            t = v * (1 - (1 - f) * s)
            
            if i % 6 == 0:
                r, g, b = v, t, p
            elif i % 6 == 1:
                r, g, b = q, v, p
            elif i % 6 == 2:
                r, g, b = p, v, t
            elif i % 6 == 3:
                r, g, b = p, q, v
            elif i % 6 == 4:
                r, g, b = t, p, v
            else:
                r, g, b = v, p, q
            
            fill_color = (int(r * 255), int(g * 255), int(b * 255))
            draw.ellipse((x - size, y - size, x + size, y + size), fill=fill_color)
        
        # Add information density patterns
        for i in range(int(D / 5)):
            # Draw connecting lines
            x1 = random.randint(0, width - 1)
            y1 = random.randint(0, height - 1)
            x2 = random.randint(0, width - 1)
            y2 = random.randint(0, height - 1)
            line_hue = (d_hue + i * 10) % 360
            
            # Convert to RGB
            h = line_hue / 360
            s = 0.8
            v = 0.8
            
            i = int(h * 6)
            f = h * 6 - i
            p = v * (1 - s)
            q = v * (1 - f * s)
            t = v * (1 - (1 - f) * s)
            
            if i % 6 == 0:
                r, g, b = v, t, p
            elif i % 6 == 1:
                r, g, b = q, v, p
            elif i % 6 == 2:
                r, g, b = p, v, t
            elif i % 6 == 3:
                r, g, b = p, q, v
            elif i % 6 == 4:
                r, g, b = t, p, v
            else:
                r, g, b = v, p, q
            
            line_color = (int(r * 255), int(g * 255), int(b * 255), 128)
            draw.line((x1, y1, x2, y2), fill=line_color, width=1 + int(A / 50))
        
        # Apply blur effect for smoother appearance
        image = image.filter(ImageFilter.GaussianBlur(radius=1.5))
        
        # Save the image
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
