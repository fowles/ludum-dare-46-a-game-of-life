function initKeyListener(keytable) {
  document.addEventListener('keydown', (event) => {
    const mapForKey = keytable[event.keyCode];
    if (mapForKey === undefined) return;
    const f = mapForKey.keydown;
    if (f !== undefined) {
      f();
      event.preventDefault();
    }
  });

  document.addEventListener('keyup', (event) => {
    const mapForKey = keytable[event.keyCode];
    if (mapForKey === undefined) return;
    const f = mapForKey.keyup;
    if (f !== undefined) {
      f();
      event.preventDefault();
    }
  });
}
