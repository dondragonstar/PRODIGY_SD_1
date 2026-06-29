function toCelsius(value, from) {
  switch (from) {
    case 'celsius': return value;
    case 'fahrenheit': return (value - 32) * 5 / 9;
    case 'kelvin': return value - 273.15;
  }
}

function fromCelsius(value, to) {
  switch (to) {
    case 'celsius': return value;
    case 'fahrenheit': return value * 9 / 5 + 32;
    case 'kelvin': return value + 273.15;
  }
}

function convert(value, from, to) {
  const celsius = toCelsius(value, from);
  return fromCelsius(celsius, to);
}

document.getElementById('convert-btn').addEventListener('click', () => {
  const value = parseFloat(document.getElementById('temp-value').value);
  const from = document.querySelector('input[name="unit"]:checked').value;

  if (isNaN(value)) {
    alert('Please enter a valid temperature value.');
    return;
  }

  const celsius = from === 'celsius' ? value : convert(value, from, 'celsius');
  const fahrenheit = from === 'fahrenheit' ? value : convert(value, from, 'fahrenheit');
  const kelvin = from === 'kelvin' ? value : convert(value, from, 'kelvin');

  document.getElementById('result-celsius').textContent = `${celsius.toFixed(2)} °C`;
  document.getElementById('result-fahrenheit').textContent = `${fahrenheit.toFixed(2)} °F`;
  document.getElementById('result-kelvin').textContent = `${kelvin.toFixed(2)} K`;
});

document.getElementById('temp-value').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    document.getElementById('convert-btn').click();
  }
});
