from app import app, db

# Import models to ensure they're registered with the ORM
import models

# Create tables when app starts
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)