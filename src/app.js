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

function tempColor(celsius) {
  if (celsius <= -10) return 'var(--cold)';
  if (celsius <= 5) return 'var(--cool)';
  if (celsius <= 20) return 'var(--neutral)';
  if (celsius <= 30) return 'var(--warm)';
  return 'var(--hot)';
}

const valueInput = document.getElementById('temp-value');
const unitButtons = document.querySelectorAll('.segmented-option');
const resultCards = document.querySelectorAll('.result-card');
const results = {
  celsius: document.getElementById('result-celsius'),
  fahrenheit: document.getElementById('result-fahrenheit'),
  kelvin: document.getElementById('result-kelvin'),
};

let currentUnit = 'celsius';

unitButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    unitButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentUnit = btn.dataset.unit;
    doConvert();
  });
});

function doConvert() {
  const raw = valueInput.value.trim();
  if (raw === '' || isNaN(parseFloat(raw))) {
    results.celsius.textContent = '—';
    results.fahrenheit.textContent = '—';
    results.kelvin.textContent = '—';
    resultCards.forEach(c => c.querySelector('.result-accent').style.background = 'var(--neutral)');
    return;
  }

  const value = parseFloat(raw);

  const celsius = currentUnit === 'celsius' ? value : toCelsius(value, currentUnit);
  const fahrenheit = currentUnit === 'fahrenheit' ? value : fromCelsius(celsius, 'fahrenheit');
  const kelvin = currentUnit === 'kelvin' ? value : fromCelsius(celsius, 'kelvin');

  const color = tempColor(celsius);

  resultCards.forEach(card => {
    card.querySelector('.result-accent').style.background = color;
  });

  results.celsius.textContent = `${celsius.toFixed(2)} °C`;
  results.fahrenheit.textContent = `${fahrenheit.toFixed(2)} °F`;
  results.kelvin.textContent = `${kelvin.toFixed(2)} K`;
}

valueInput.addEventListener('input', doConvert);

resultCards.forEach(c => c.querySelector('.result-accent').style.background = 'var(--neutral)');
