
import pickle
import numpy as np
import pandas as pd
from flask import Flask, request, jsonify
from sklearn.preprocessing import LabelEncoder
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app) # allow CORS for all domains on all routes.
app.config['CORS_HEADERS'] = 'Content-Type'

# Load the trained model
try:
    with open('fine_tuned_grade_predictor.pkl', 'rb') as file:
        model = pickle.load(file)
except Exception as e:
    raise FileNotFoundError("Model file not found. Ensure 'fine_tuned_grade_predictor.pkl' exists.")

# Load dataset to train label encoders
csv_path = 'Synthetic_Dataset_Grades.csv'  # Ensure this file exists
try:
    df = pd.read_csv(csv_path)
except Exception as e:
    raise FileNotFoundError("Dataset file not found. Ensure the CSV is uploaded.")

# Identify categorical columns
categorical_columns = ['Subject Name', 'Remarks', 'Parental Education', 'Gender']
label_encoders = {}

# Load or create label encoders dynamically
try:
    with open('label_encoders.pkl', 'rb') as file:
        label_encoders = pickle.load(file)
except FileNotFoundError:
    for col in categorical_columns:
        le = LabelEncoder()
        df[col] = le.fit_transform(df[col])
        label_encoders[col] = le
    # Save the label encoders for future use
    with open('label_encoders.pkl', 'wb') as file:
        pickle.dump(label_encoders, file)

# Define route for prediction
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Parse JSON input
        data = request.get_json()

        # Required features for prediction
        required_features = [
            'Subject Name', 'Remarks', 'Teacher Exp', 'Attendance (%)',
            'Parental Education', 'Gender', 'CGPA'
        ]

        # Check for missing features
        missing_features = [feature for feature in required_features if feature not in data]
        if missing_features:
            return jsonify({"error": f"Missing features: {missing_features}"}), 400

        # Convert input data to DataFrame
        df_input = pd.DataFrame([data])
        if data['Attendance (%)'] < 0 or data['Attendance (%)'] > 100:
         return jsonify({"error": "Invalid value for Attendance (%). Must be between 0 and 100."}), 400
        # Automatically estimate Previous Performance based on CGPA
        df_input['Previous Performance'] = df_input['CGPA'] + np.random.uniform(-0.5, 0.5)
        df_input['Previous Performance'] = df_input['Previous Performance'].clip(0, 10)

        # Apply label encoding for categorical variables, handling unseen values
        for col in categorical_columns:
            if col in df_input:
                if col in label_encoders:
                    # Handle unseen labels by assigning them a new class (out-of-vocabulary)
                    df_input[col] = df_input[col].apply(
                        lambda x: label_encoders[col].transform([x])[0]
                        if x in label_encoders[col].classes_
                        else len(label_encoders[col].classes_)
                    )
                else:
                    return jsonify({"error": f"Invalid value for {col}"}), 400

        # Ensure feature order matches the model's expected input
        model_features = [
            'Subject Name', 'Remarks', 'Teacher Exp', 'Attendance (%)',
            'Parental Education', 'Gender', 'CGPA', 'Previous Performance'
        ]
        df_input = df_input[model_features]

        # Convert all features to numeric to avoid errors
        df_input = df_input.apply(pd.to_numeric, errors='coerce')

        # Make prediction
        prediction = model.predict(df_input)

        # Return the predicted grade as an integer
        return jsonify({"predicted_grade": int(prediction[0])})

    except Exception as e:
        # Catch any unexpected errors and return a 500 response
        return jsonify({"error": str(e)}), 500

@app.route('/', methods=['GET'])
def home():
    return "Flask API is running! Use the /predict endpoint for predictions."
# Run the Flask app
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)