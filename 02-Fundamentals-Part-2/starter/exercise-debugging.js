const measureKelvin = function(){
    const measurement = {
        type: 'temp',
        unit: 'celsius',
        value: Number(prompt('Degrees celsius: ')),
    }
    console.table(measurement);

    const kelvin = measurement.value + 273;
    return kelvin;
}

console.log(measureKelvin());