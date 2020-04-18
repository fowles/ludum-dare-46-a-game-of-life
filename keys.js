function initKeyListener(keytable) {
  document.addEventListener('keydown', (event) => {
    const f = keytable[event.keyCode];
    if (f !== undefined) f();
  });
}
