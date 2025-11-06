
const display = document.getElementById('display');
let expr = '';

function updateDisplay() {
  display.textContent = expr === '' ? '0' : expr;
}

document.getElementById('buttons').addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;

  const action = btn.dataset.action;
  const value = btn.dataset.value;

  if (action === 'num' || action === 'op' || action === 'fn') {
    expr += value;
    updateDisplay();
  } else if (action === 'clear') {
    expr = '';
    updateDisplay();
  } else if (action === 'equals') {
    try {
      const safeExpr = expr.replace(/÷/g, '/').replace(/×/g, '*');
      const result = Function('"use strict"; return (' + safeExpr + ')')();
      expr = String(result);
      updateDisplay();
    } catch (err) {
      err = display.textContent = 'Error';
    }
  }
});

const swStatus = document.getElementById('sw-status');

// Registrar Service Worker
document.addEventListener('DOMContentLoaded', () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js')
            .then(() => console.log('Service Worker registrado'))
            .catch(err => console.error('Error registrando SW:', err));
    }
});
