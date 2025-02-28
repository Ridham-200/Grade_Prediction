import pandas as pd
import numpy as np
import pickle
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score
import os

# Load dataset
df = pd.read_csv('Synthetic_Dataset_Grades.csv')

# Encoding categorical variables
label_encoders = {}
categorical_columns = ['Subject Name', 'Remarks', 'Parental Education', 'Gender']
for col in categorical_columns:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col])
    label_encoders[col] = le

# Feature Engineering
df['Previous Performance'] = df['Grade'].apply(lambda x: max(0, min(10, x + np.random.uniform(-0.5, 0.5))))

# Selecting Features and Target
X = df.drop(columns=['Student ID', 'Name', 'Grade'])
y = df['Grade']

# Splitting dataset
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Hyperparameter tuning
param_grid = {
    'n_estimators': [50, 100, 200],
    'max_depth': [10, 20, None],
    'min_samples_split': [2, 5, 10]
}
rf = RandomForestClassifier(random_state=42)
grid_search = GridSearchCV(rf, param_grid, cv=5, scoring='accuracy', n_jobs=-1)
grid_search.fit(X_train, y_train)

# Best model
best_rf = grid_search.best_estimator_
y_pred = best_rf.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f'Fine-Tuned Random Forest Accuracy: {accuracy * 100:.2f}%')

# Save the fine-tuned model
script_dir = os.path.dirname(os.path.abspath(__file__))  # Get script's directory
model_path = os.path.join(script_dir, 'fine_tuned_grade_predictor.pkl')  # Define full path
with open(model_path, 'wb') as file:
    pickle.dump(best_rf, file)

print(f'Fine-tuned model saved at {model_path}')