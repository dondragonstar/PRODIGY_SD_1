document.addEventListener('DOMContentLoaded', () => {
  const tempInput = document.getElementById('temp-value');
  const unitButtons = document.querySelectorAll('.segmented-option');
  const resultCelsius = document.getElementById('result-celsius');
  const resultFahrenheit = document.getElementById('result-fahrenheit');
  const resultKelvin = document.getElementById('result-kelvin');
  const accentCelsius = document.querySelector('.result-card[data-unit="celsius"] .result-accent');
  const accentFahrenheit = document.querySelector('.result-card[data-unit="fahrenheit"] .result-accent');
  const accentKelvin = document.querySelector('.result-card[data-unit="kelvin"] .result-accent');

  let currentUnit = 'celsius';

  function getThermalColor(celsius) {
    if (celsius <= 0) return 'var(--cold)';
    if (celsius <= 15) return 'var(--cool)';
    if (celsius <= 28) return 'var(--neutral)';
    if (celsius <= 40) return 'var(--warm)';
    return 'var(--hot)';
  }

  function calculateConversions() {
    const val = parseFloat(tempInput.value);

    if (isNaN(val)) {
      resultCelsius.textContent = '\u2014';
      resultFahrenheit.textContent = '\u2014';
      resultKelvin.textContent = '\u2014';
      [accentCelsius, accentFahrenheit, accentKelvin].forEach(el => el.style.background = 'var(--neutral)');
      return;
    }

    let c, f, k;

    if (currentUnit === 'celsius') {
      c = val;
      f = (val * 9 / 5) + 32;
      k = val + 273.15;
    } else if (currentUnit === 'fahrenheit') {
      c = (val - 32) * 5 / 9;
      f = val;
      k = c + 273.15;
    } else {
      c = val - 273.15;
      f = (c * 9 / 5) + 32;
      k = val;
    }

    resultCelsius.textContent = `${parseFloat(c.toFixed(2))} \u00B0C`;
    resultFahrenheit.textContent = `${parseFloat(f.toFixed(2))} \u00B0F`;
    resultKelvin.textContent = `${parseFloat(k.toFixed(2))} K`;

    const color = getThermalColor(c);
    accentCelsius.style.background = color;
    accentFahrenheit.style.background = color;
    accentKelvin.style.background = color;
  }

  unitButtons.forEach(button => {
    button.addEventListener('click', () => {
      unitButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      currentUnit = button.getAttribute('data-unit');
      calculateConversions();
    });
  });

  tempInput.addEventListener('input', calculateConversions);
});
