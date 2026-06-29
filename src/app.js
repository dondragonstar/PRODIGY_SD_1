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
    resultCards.forEach(c => c.classList.remove('visible'));
    return;
  }

  const value = parseFloat(raw);

  const celsius = currentUnit === 'celsius' ? value : convert(value, currentUnit, 'celsius');

  const converted = {
    celsius: currentUnit === 'celsius' ? value : convert(value, currentUnit, 'celsius'),
    fahrenheit: currentUnit === 'fahrenheit' ? value : convert(value, currentUnit, 'fahrenheit'),
    kelvin: currentUnit === 'kelvin' ? value : convert(value, currentUnit, 'kelvin'),
  };

  const color = tempColor(celsius);

  resultCards.forEach((card, i) => {
    const unit = card.dataset.unit;
    const accent = card.querySelector('.result-accent');
    accent.style.background = color;

    if (i === 0) {
      card.style.setProperty('--card-delay', '0ms');
    } else if (i === 1) {
      card.style.setProperty('--card-delay', '80ms');
    } else {
      card.style.setProperty('--card-delay', '160ms');
    }

    requestAnimationFrame(() => {
      card.classList.add('visible');
    });
  });

  results.celsius.textContent = `${converted.celsius.toFixed(2)} °C`;
  results.fahrenheit.textContent = `${converted.fahrenheit.toFixed(2)} °F`;
  results.kelvin.textContent = `${converted.kelvin.toFixed(2)} K`;
}

valueInput.addEventListener('input', doConvert);

valueInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    valueInput.blur();
  }
});

resultCards.forEach(c => c.classList.add('visible'));
