
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

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js', { scope: '/' })
      .then(reg => {
        swStatus.textContent = 'registrado (vía ' + (reg.active ? 'activo' : 'instalado') + ')';
        console.log('[App] Service Worker registrado', reg);
      })
      .catch(err => {
        swStatus.textContent = 'error al registrar';
        console.error('[App] Registro SW falló:', err);
      });
  });
} else {
  swStatus.textContent = 'no soportado en este navegador';
}
