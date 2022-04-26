async function predict(input) {
    const s = tf.tensor([input]);
    const model = await tf.loadLayersModel("model/model.json");
    const predictedValue = model.predict(s).arraySync();
    return Math.round(predictedValue);
}

document.querySelector("#predict").addEventListener("click", function(e) {
    const values = document.querySelectorAll(".value");
    const UIoutput = document.querySelector("#diabetes");
    let input = [];
    values.forEach((value) => input.push(parseFloat(value.value) || 0));
    predict(input).then((value) => {
        if (value === 1)
            UIoutput.innerHTML = "Had an onset of diabetes within five years: Yes";
        else if (value === 0)
            UIoutput.innerHTML = "Had an onset of diabetes within five years: No";
        else UIoutput.innerHTML = "Error: Incorrect values entered";
    });
    e.preventDefault();
});