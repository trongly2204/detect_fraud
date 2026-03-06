import joblib
import pandas as pd # Adding pandas helps with data alignment
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 
# Load everything
model = joblib.load('fraud_model_1.pkl')
# scaler = joblib.load('scaler.joblib') # Un-comment if these are separate
# encoder = joblib.load('encoder.joblib')

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Fraud Detection API is running!"})

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json
        
        # 1. Convert to DataFrame (this makes it easier for encoders to read)
        input_df = pd.DataFrame([data])
        
        # 2. TRANSFORM (Crucial step!)
        # If your model is a Pipeline, it does this automatically.
        # If not, you'd do: input_transformed = encoder.transform(input_df)
        
        # 3. Predict
        prediction = model.predict(input_df)[0] 
        
        return jsonify({
            "status": "success",
            "fraud": int(prediction)
        })

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 400

if __name__ == "__main__":
    app.run(port=8000, debug=True)
