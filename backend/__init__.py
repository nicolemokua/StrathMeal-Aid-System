from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager  

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object('backend.config.Config')
    db.init_app(app)
    CORS(app)  # Enable CORS for all routes

    JWTManager(app) 

    from backend import routes
    app.register_blueprint(routes.bp)
    return app

