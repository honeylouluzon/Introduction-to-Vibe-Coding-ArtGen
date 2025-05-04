from datetime import datetime
from app import db

class ConsciousnessArt(db.Model):
    """Model for storing consciousness art parameters and paths"""
    id = db.Column(db.Integer, primary_key=True)
    
    # Consciousness parameters
    information_density = db.Column(db.Integer, nullable=False)
    knowledge_base = db.Column(db.Integer, nullable=False)
    cognitive_complexity = db.Column(db.Integer, nullable=False)
    csci_value = db.Column(db.Float, nullable=False)  # Calculated CSCI value
    
    # Image information
    image_path = db.Column(db.String(255), nullable=False)
    quantum_mode = db.Column(db.Boolean, default=False)
    prompt = db.Column(db.Text, nullable=True)  # AI generation prompt if applicable
    
    # Metadata
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    title = db.Column(db.String(100), nullable=True)
    description = db.Column(db.Text, nullable=True)
    
    def __repr__(self):
        return f'<ConsciousnessArt {self.id}: D={self.information_density}, A={self.knowledge_base}, S={self.cognitive_complexity}>'
    
    def to_dict(self):
        """Convert model to dictionary for JSON response"""
        return {
            'id': self.id,
            'information_density': self.information_density,
            'knowledge_base': self.knowledge_base,
            'cognitive_complexity': self.cognitive_complexity,
            'csci_value': self.csci_value,
            'image_path': self.image_path,
            'quantum_mode': self.quantum_mode,
            'prompt': self.prompt,
            'created_at': self.created_at.isoformat(),
            'title': self.title,
            'description': self.description
        }