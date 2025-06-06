function printData() {

    function sendDataToBackend(data) {
        fetch('/process', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(result => {
                
                // alert('Received from backend: ' + JSON.stringify(result));
                if (result == 'Absence'){
                 document.getElementById('resultshow1').innerHTML = 'you have not  heart disease.';   
                }
                else{
                    document.getElementById('resultshow1').innerHTML = 'you have heart disease.';
                }
                
            })
            .catch(error => {
               
                alert('Error sending data to backend.');
            });
    }

    function sendSelectedData() {
        var age = document.getElementById('age').value;
        var sex = document.getElementById('sex').value;
        var chest_pain_type = document.getElementById('chest_pain_type').value;
        var bp = document.getElementById('bp').value;
        var cholesterol = document.getElementById('cholesterol').value;
        var fbs_over_120 = document.getElementById('fbs_over_120').value;
        var ekg_results = document.getElementById('ekg_results').value;
        var max_hr = document.getElementById('max_hr').value;
        var exercise_angina = document.getElementById('exercise_angina').value;
        var st_depression = document.getElementById('st_depression').value;
        var slope_of_st = document.getElementById('slope_of_st').value;
        var number_of_vessels_fluro = document.getElementById('number_of_vessels_fluro').value;
        var thallium = document.getElementById('thallium').value;

        if (!age || !sex || !chest_pain_type || !bp || !cholesterol || !fbs_over_120 || !ekg_results || !max_hr || !exercise_angina ||
            !st_depression || !slope_of_st || !number_of_vessels_fluro || !thallium) {
            alert("All fields are required!");
            return;
        }
        else if (age < 25 || age > 120) {
            setTimeout(() => {
                alert("Age must be between 25 and 120!");
                document.getElementById('age').value = '';
            }, 2000);
            return;
        }
        else if (bp < 93 || bp > 201) {
            setTimeout(() => {
                alert("Blood Pressure must be between 93 and 201!");
                document.getElementById('bp').value = '';
            }, 2000);
            return;
        }
        else if (cholesterol < 120 || cholesterol > 600) {
            setTimeout(() => {
                alert("Cholesterol must be between 120 and 600!");
                document.getElementById('cholesterol').value = '';
            }, 2000);
            return;
        }
        else if (max_hr < 70 || max_hr > 202) {
            setTimeout(() => {
                alert("Maximum Heart Rate must be between 70 and 202!");
                document.getElementById('max_hr').value = '';
            }, 2000);
            return;
        }
        else if (st_depression < 0.0 || st_depression > 6.2) {
            setTimeout(() => {
                alert("ST Depression must be between 0.0 and 6.2!");
                document.getElementById('st_depression').value = '';
            }, 2000);
            return;
        }
        
        sendDataToBackend({ age, sex, chest_pain_type, bp, cholesterol, fbs_over_120, ekg_results, max_hr, exercise_angina, st_depression, slope_of_st, number_of_vessels_fluro, thallium });
    }
    sendSelectedData()

}

function clearData() {
    document.getElementById('age').value = '';
    document.getElementById('bp').value = '';
    document.getElementById('cholesterol').value = '';
    document.getElementById('max_hr').value = '';
    document.getElementById('st_depression').value = '';
}