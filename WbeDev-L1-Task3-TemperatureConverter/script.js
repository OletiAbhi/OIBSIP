const temperatureInput = document.getElementById("temperature");
const unitSelect = document.getElementById("unit");
const convertButton = document.getElementById("convertBtn");

const errorMessage = document.getElementById("errorMessage");

const celsiusResult = document.getElementById("celsiusResult");
const fahrenheitResult = document.getElementById("fahrenheitResult");
const kelvinResult = document.getElementById("kelvinResult");


function showError(message) {
    errorMessage.textContent = message;

    celsiusResult.textContent = "--";
    fahrenheitResult.textContent = "--";
    kelvinResult.textContent = "--";
}


function clearError() {
    errorMessage.textContent = "";
}


function formatTemperature(value) {
    return value.toFixed(2);
}


function convertTemperature() {

    clearError();

    const inputValue = temperatureInput.value.trim();
    const unit = unitSelect.value;

    // Check for empty input
    if (inputValue === "") {
        showError("Please enter a temperature value.");
        return;
    }

    // Check for non-numeric input
    const temperature = Number(inputValue);

    if (!Number.isFinite(temperature)) {
        showError("Please enter a valid numeric temperature.");
        return;
    }


    let celsius;
    let fahrenheit;
    let kelvin;


    // Convert input to Celsius first
    if (unit === "celsius") {

        celsius = temperature;

    } else if (unit === "fahrenheit") {

        celsius = (temperature - 32) * 5 / 9;

    } else if (unit === "kelvin") {

        celsius = temperature - 273.15;
    }


    // Absolute zero validation
    if (celsius < -273.15) {
        showError(
            "Temperature cannot be below absolute zero (-273.15 °C)."
        );
        return;
    }


    // Convert Celsius to the other units
    fahrenheit = (celsius * 9 / 5) + 32;
    kelvin = celsius + 273.15;


    // Display results
    celsiusResult.textContent = formatTemperature(celsius);
    fahrenheitResult.textContent = formatTemperature(fahrenheit);
    kelvinResult.textContent = formatTemperature(kelvin);
}


convertButton.addEventListener("click", convertTemperature);