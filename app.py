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

age, sex, chest_pain_type, bp, cholesterol, fbs_over_120, ekg_results, max_hr, exercise_angina, st_depression, slope_of_st, number_of_vessels_fluro, thallium = [0] * 13

# print(type(age))

df = pd.read_csv('Heart_Disease_Prediction.csv')
list1 = list(df.columns)
# print(list1) temp

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

# Evaluate
# print("Accuracy:", accuracy_score(y_test, y_pred))

# Classification Report
# print("\nClassification Report:") temp
# print(classification_report(y_test, y_pred, target_names=["No Disease", "Disease"])) temp


# Confusion Matrix
# cm = confusion_matrix(y_test, y_pred)

        # Plotting Confusion Matrix
        # plt.figure(figsize=(6, 4))
        # sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', xticklabels=["No Disease", "Disease"], yticklabels=["No Disease", "Disease"])
        # plt.xlabel("Predicted")
        # plt.ylabel("Actual")
        # plt.title("Logistic Regression - Confusion Matrix")
        # plt.show()
        # -------------------------------------------

        # # Get probability estimates for the positive class
        # y_prob = model.predict_proba(X_test)[:, 1]

        # # Compute ROC with string labels
        # fpr, tpr, thresholds = roc_curve(y_test, y_prob, pos_label="Presence")

        # # Plot
        # plt.plot(fpr, tpr, label=f"AUC = {roc_auc_score(y_test, y_prob):.2f}")
        # plt.plot([0, 1], [0, 1], linestyle="--", color="gray")
        # plt.xlabel("False Positive Rate")
        # plt.ylabel("True Positive Rate")
        # plt.title("ROC Curve - Logistic Regression")
        # plt.legend()
        # plt.grid()
        # plt.show()

def get_user_input(**dftg):
   
    # Convert values to integers and store in xycheck
    xycheck = np.array(list(map(int, dftg.values()))).reshape(1, -1)
    print(xycheck, 908)
    # Scale user input
    user_input_scaled = scaler.transform(xycheck)
    print(3)
    # Make prediction
    prediction = model.predict(user_input_scaled)
    result = "Diabetic" if prediction[0] == 1 else "Non-Diabetic"

    return  result # Returning the prediction result


@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template('main.html')



@app.route('/process', methods=['POST'])
def process():
    data = request.get_json()
    age = data.get('age')
    sex = data.get('sex')
    chest_pain_type = data.get('chestPainType')
    bp = data.get('bp')
    cholesterol = data.get('cholesterol')
    fbs_over_120 = data.get('fbsOver120')
    ekg_results = data.get('ekgResults')
    max_hr = data.get('maxHr')
    exercise_angina = data.get('exerciseAngina')
    st_depression = data.get('stDepression')
    slope_of_st = data.get('slopeOfSt')
    number_of_vessels_fluro = data.get('numberOfVesselsFluro')
    thallium = data.get('thallium')

    storeresult = get_user_input(
        age=age,
        sex=sex,
        chest_pain_type=chest_pain_type,
        bp=bp,
        cholesterol=cholesterol,
        fbs_over_120=fbs_over_120,
        ekg_results=ekg_results,
        max_hr=max_hr,
        exercise_angina=exercise_angina,
        st_depression=st_depression,
        slope_of_st=slope_of_st,
        number_of_vessels_fluro=number_of_vessels_fluro,
        thallium=thallium
    )
    return jsonify({
        'result': storeresult
    })
    

    


if __name__ == '__main__':
    app.run(debug=True )