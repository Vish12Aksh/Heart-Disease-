
function printData() {
    var resohed;

    function sendDataToBackend(data) {
        fetch('/process', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(result => {pip 

                // console.log('Backend Response:', result);
                // alert('Received from backend: ' + JSON.stringify(result));
                console.log(result.result);
                resohed = result.result;
                document.getElementById('contrainer124').style.fontSize = '20px';
                document.getElementById('contrainer124').style.fontWeight = 'bold';
                document.getElementById('contrainer124').innerHTML = resohed;
                document.getElementById('contrainer124').innerHTML = resohed;

            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error sending data to backend.');
            });


    }

    function sendSelectedData() {
        const age = document.getElementById('age').value;
        const sex = document.getElementById('sex').value;
        const chestPainType = document.getElementById('chest_pain_type').value;
        const bp = document.getElementById('bp').value;
        const cholesterol = document.getElementById('cholesterol').value;
        const fbsOver120 = document.getElementById('fbs_over_120').value;
        const ekgResults = document.getElementById('ekg_results').value;
        const maxHr = document.getElementById('max_hr').value;
        const exerciseAngina = document.getElementById('exercise_angina').value;
        const stDepression = document.getElementById('st_depression').value;
        const slopeOfSt = document.getElementById('slope_of_st').value;
        const numberOfVesselsFluro = document.getElementById('number_of_vessels_fluro').value;
        const thallium = document.getElementById('thallium').value;

        if (!age || !sex || !chestPainType || !bp || !cholesterol || !fbsOver120 || !ekgResults || !maxHr || !exerciseAngina ||
            !stDepression || !slopeOfSt || !numberOfVesselsFluro || !thallium) {
            alert("All fields are required!");
            return;
        }


        console.log(
            age, sex, chestPainType, bp, cholesterol, fbsOver120, ekgResults,
            maxHr, exerciseAngina, stDepression, slopeOfSt, numberOfVesselsFluro, thallium
        );
        sendDataToBackend({ age, sex, chestPainType, bp, cholesterol, fbsOver120, ekgResults, maxHr, exerciseAngina, stDepression, slopeOfSt, numberOfVesselsFluro, thallium });
    }
    sendSelectedData()

    // document.getElementsByTagName('h4').innerHMTL = resohed;


    // function revier1(data) {
    //     var storeq1 = data;
    //     console.log(storeq1);
    // }

}

function clearData() {
    document.getElementById('age').value = '';
    document.getElementById('sex').value = '';
    document.getElementById('chest_pain_type').value = '';
    document.getElementById('bp').value = '';
    document.getElementById('cholesterol').value = '';
    document.getElementById('fbs_over_120').value = '';
    document.getElementById('ekg_results').value = '';
    document.getElementById('max_hr').value = '';
    document.getElementById('exercise_angina').value = '';
    document.getElementById('st_depression').value = '';
    document.getElementById('slope_of_st').value = '';
    document.getElementById('number_of_vessels_fluro').value = '';
    document.getElementById('thallium').value = '';
}