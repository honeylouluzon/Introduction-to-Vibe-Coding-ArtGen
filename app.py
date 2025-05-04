import os
import logging
from flask import Flask, render_template, request, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
from image_generator import ConsciousnessImageGenerator

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Database setup
class Base(DeclarativeBase):
    pass

db = SQLAlchemy(model_class=Base)

# Create Flask app
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "default_secret_key")

# Configure the database
app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DATABASE_URL")
app.config["SQLALCHEMY_ENGINE_OPTIONS"] = {
    "pool_recycle": 300,
    "pool_pre_ping": True,
}

# Initialize the app with the extension
db.init_app(app)

# Create image generator
image_generator = ConsciousnessImageGenerator()

@app.route('/')
def index():
    """Render the main application page"""
    return render_template('index.html')

@app.route('/generate-image', methods=['POST'])
def generate_image():
    """Generate an image based on consciousness parameters"""
    try:
        # Get parameters from request
        data = request.json
        D = data.get('D', 50)  # Information Density
        A = data.get('A', 50)  # Knowledge Base
        S = data.get('S', 50)  # Cognitive Complexity
        
        logging.debug(f"Generating image with parameters: D={D}, A={A}, S={S}")
        
        # Generate the image
        result = image_generator.generate_image(D, A, S)
        
        # Return the result
        return jsonify({
            "success": True,
            "path": "/" + result['path'],
            "prompt": result['prompt']
        })
    except Exception as e:
        logging.error(f"Error generating image: {str(e)}")
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@app.route('/static/images/<path:filename>')
def serve_image(filename):
    """Serve generated images"""
    return send_from_directory('static/images', filename)

@app.route('/save-image', methods=['POST'])
def save_image():
    """Save information about a generated image"""
    try:
        data = request.json
        path = data.get('path')
        params = data.get('params', {})
        
        # Import ConsciousnessArt model here to avoid circular imports
        from models import ConsciousnessArt
        
        # Extract parameters
        D = params.get('D', 50)
        A = params.get('A', 50)
        S = params.get('S', 50)
        title = params.get('title', f'Art D{D}-A{A}-S{S}')
        description = params.get('description', f'Generated with parameters: D={D}, A={A}, S={S}')
        quantum_mode = params.get('quantum_mode', False)
        prompt = params.get('prompt', '')
        
        # Calculate CSCI value
        csci_value = D / 100 * (1 + A / 100) * (1 + S / 100)
        
        # Create new database entry
        art_entry = ConsciousnessArt(
            information_density=D,
            knowledge_base=A,
            cognitive_complexity=S,
            csci_value=csci_value,
            image_path=path,
            quantum_mode=quantum_mode,
            prompt=prompt,
            title=title,
            description=description
        )
        
        # Save to database
        db.session.add(art_entry)
        db.session.commit()
        
        logging.info(f"Saved image to database: {art_entry}")
        
        return jsonify({
            "success": True,
            "message": "Image saved successfully",
            "id": art_entry.id
        })
    except Exception as e:
        logging.error(f"Error saving image: {str(e)}")
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

if __name__ == '__main__':
    # Create images directory if it doesn't exist
    os.makedirs('static/images', exist_ok=True)
    
    # Run the Flask app
    app.run(host='0.0.0.0', port=5000, debug=True)
