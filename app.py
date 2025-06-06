import pandas as pd
import numpy as np
import pickle
from sklearn.preprocessing import LabelEncoder
from sklearn.linear_model import LogisticRegression
import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd   
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score,  roc_curve, roc_auc_score , classification_report
from flask import Flask, render_template, request, jsonify


app = Flask(__name__)

df = pd.read_csv('Heart_Disease_Prediction.csv')
list1 = list(df.columns)


scaler = StandardScaler()
X = scaler.fit_transform(df.drop(['Heart Disease'], axis=1))
y = df['Heart Disease']

le = LabelEncoder()
le.fit(y)

Y = le.transform(y)


# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, Y, test_size=0.2, random_state=42)

model = LogisticRegression(max_iter=1000)  # max_iter increased to ensure convergence
model.fit(X_train, y_train)

# Predict
y_pred = model.predict(X_test)

def getPrediction(data):
   
    list_sotre = list()
    print("Inside getPrediction")
    for value in data.values():
        if '.' in value:
            list_sotre.append(float(value))
        else:
            list_sotre.append(int(value))
    
    # array reshape 
    xycheck = np.array(list_sotre).reshape(1, -1)
    
    user_input_scaled = scaler.transform(xycheck)
    
    prediction = model.predict(user_input_scaled)
    result = "Presence" if prediction[0] == 1 else "Absence"

    return  result
   


@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template('main.html')


@app.route('/process', methods=['POST'])
def process():
    data = request.get_json()
    
    showresult = getPrediction(data)
        
    return jsonify({
        'result': showresult
    })
    
if __name__ == '__main__':
    app.run()
