/**
 * Draggable dividers for the two side panels.
 *
 * Each panel gets a handle sitting on its inner edge. Drag to resize; drag past
 * the snap threshold (or click the chevron) to collapse it flush to the page
 * edge. Widths persist per side in localStorage.
 */
(() => {
  const SIDES = {
    start: {
      prop: '--uwhpc-nav-w',
      key: 'uwhpc-nav-w',
      minViewport: 800, // Starlight only shows the nav pane at >= 50rem
      label: 'navigation',
    },
    end: {
      prop: '--uwhpc-toc-w',
      key: 'uwhpc-toc-w',
      minViewport: 1152, // ...and the table of contents at >= 72rem
      label: 'table of contents',
    },
  };

  const DEFAULT = 248; // 15.5rem
  const MIN = 176; // below this a panel is too narrow to read
  const MAX = 440;
  const SNAP = 120; // drag narrower than this and it collapses

  const root = document.documentElement;
  const read = (key) => {
    try {
      const stored = localStorage.getItem(key);
      return stored === null ? null : Number(stored);
    } catch {
      return null;
    }
  };
  const write = (key, value) => {
    try {
      localStorage.setItem(key, String(value));
    } catch {}
  };

  const widths = {
    start: read(SIDES.start.key) ?? DEFAULT,
    end: read(SIDES.end.key) ?? DEFAULT,
  };
  // Width to return to when expanding from collapsed.
  const restore = { start: DEFAULT, end: DEFAULT };

  const apply = (side) => {
    root.style.setProperty(SIDES[side].prop, `${widths[side]}px`);
    const handle = handles[side];
    if (!handle) return;
    const collapsed = widths[side] === 0;
    handle.dataset.collapsed = collapsed ? 'true' : 'false';
    // Mirrored on <html> so CSS can drop the panel's own divider border.
    root.dataset[side === 'start' ? 'navCollapsed' : 'tocCollapsed'] = collapsed
      ? 'true'
      : 'false';
    const button = handle.querySelector('.panel-collapse');
    button.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
    button.title = `${collapsed ? 'Show' : 'Hide'} ${SIDES[side].label}`;
  };

  const set = (side, value) => {
    widths[side] = value;
    if (value > 0) restore[side] = value;
    apply(side);
    write(SIDES[side].key, value);
  };

  const handles = {};

  for (const side of Object.keys(SIDES)) {
    const handle = document.createElement('div');
    handle.className = 'panel-resizer';
    handle.dataset.side = side;
    handle.setAttribute('role', 'separator');
    handle.setAttribute('aria-orientation', 'vertical');

    const button = document.createElement('button');
    button.className = 'panel-collapse';
    button.type = 'button';
    // Chevron; CSS rotates it to point the way the click will move the panel.
    button.innerHTML =
      '<svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">' +
      '<path d="M6.5 1.5 3 5l3.5 3.5" fill="none" stroke="currentColor" ' +
      'stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';

    handle.append(button);
    document.body.append(handle);
    handles[side] = handle;

    button.addEventListener('click', (event) => {
      event.stopPropagation();
      set(side, widths[side] === 0 ? restore[side] : 0);
    });

    handle.addEventListener('pointerdown', (event) => {
      if (event.target.closest('.panel-collapse')) return;
      event.preventDefault();
      handle.setPointerCapture(event.pointerId);
      handle.classList.add('dragging');
      root.style.setProperty('cursor', 'col-resize');

      const move = (moveEvent) => {
        const raw =
          side === 'start'
            ? moveEvent.clientX
            : window.innerWidth - moveEvent.clientX;
        set(side, raw < SNAP ? 0 : Math.min(MAX, Math.max(MIN, raw)));
      };

      const up = () => {
        handle.classList.remove('dragging');
        root.style.removeProperty('cursor');
        handle.removeEventListener('pointermove', move);
        handle.removeEventListener('pointerup', up);
        handle.removeEventListener('pointercancel', up);
      };

      handle.addEventListener('pointermove', move);
      handle.addEventListener('pointerup', up);
      handle.addEventListener('pointercancel', up);
    });

    // Double-click the divider to reset that panel.
    handle.addEventListener('dblclick', (event) => {
      if (event.target.closest('.panel-collapse')) return;
      set(side, DEFAULT);
    });

    apply(side);
  }
})();
