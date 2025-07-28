from flask import Flask
from my_app.api import api_bp
from my_app import create_app
import os

config_name = os.getenv('FLASK_CONFIG') or 'development'


app = create_app(config_name) 


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
