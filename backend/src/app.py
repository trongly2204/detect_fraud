import joblib
import pandas as pd
import numpy as np
from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import hashlib


app = Flask(__name__) # allow main to connect app
CORS(app) # allow all port to connect app

model = joblib.load('fraud_model_1.pkl') # declare loading model variable

PASSWORD_FILE = "password.hash"

def hash_password(p: str) -> str:
    return hashlib.sha256(p.encode()).hexdigest()


@app.route("/", methods=["GET"])
def home(): # allow to display message to check if API is running or not
    return jsonify({"message": "Fraud detection API is running"}) #return message

@app.route("/predict", methods=["POST"])
def predict():
    try:
        #convert data to json to detect
        data = request.json
        
        #convert data to encoders to read 
        input_df = pd.DataFrame(data)

        # Get a result by using predict model
        #cause predict return array as [0] so we need take value [0] to get int
        prediction = model.predict(input_df)[0]

        return jsonify({"status": "Success",
                       "prediction": int(prediction)})
    except Exception as e:
        return jsonify({"status": "error",
                        "message": str(e)}), 400
    
# ================= CHECK PASSWORD =================
@app.route("/login", methods=["POST"])
def login():
    # Check if password file exists
    if not os.path.exists(PASSWORD_FILE):
        return jsonify({"error": "Password not set"}), 400

    # Extract password string from JSON
    password = request.json.get("password")
    if not password:
        return jsonify({"error": "Password missing"}), 400

    hashed_input = hash_password(password)

    with open(PASSWORD_FILE, "r") as f:
        saved = f.read().strip()  # remove any extra whitespace/newline

    if hashed_input == saved:
        return jsonify({"status": "success"}), 200
    else:
        return jsonify({"status": "failed"}), 401

            
# ================= SET-UP PASSWORD =================
@app.route("/set_up", methods=["POST"])
def set_up():
    if os.path.exits(PASSWORD_FILE):
        return jsonify({"message": "Password already set"}), 403
    password = request.json["password"]
    hashed = hash_password(password)

    with open(PASSWORD_FILE, "w") as f:
        f.write(hashed)
    return jsonify({"message": "Password created"})


if __name__ == "__main__":
    app.run(port=8000, debug=True)
        
