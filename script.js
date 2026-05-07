function calculateBMI(){

    let weight =
    document.getElementById("weight").value;

    let height =
    document.getElementById("height").value / 100;

    let bmi =
    (weight / (height * height)).toFixed(2);

    document.getElementById("result").innerHTML =
    "Your BMI is " + bmi;
}