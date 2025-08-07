from flask import Flask, jsonify
from flask_cors import CORS
import json

# Initialize the Flask application
app = Flask(__name__)

# Enable CORS to allow requests from the React frontend (running on a different port)
CORS(app)

# Define the API endpoint that will serve our dashboard data
@app.route('/api/data')
def get_data():
    # Open and load the pre-processed JSON file
    with open('../dashboard_data.json', 'r') as f:
        data = json.load(f)
    # Return the data in JSON format
    return jsonify(data)

# Run the app when the script is executed
if __name__ == '__main__':
    # Runs the server on http://127.0.0.1:5000
    app.run(debug=True, port=5000)