
export const $ = sel => document.querySelector(sel);
export const $$ = sel => Array.from(document.querySelectorAll(sel));

export function html(nodeOrSelector, content) {
  const node = typeof nodeOrSelector === 'string' ? $(nodeOrSelector) : nodeOrSelector;
  if (!node) return null;
  node.innerHTML = content;
  return node;
}

export function append(nodeOrSelector, child) {
  const node = typeof nodeOrSelector === 'string' ? $(nodeOrSelector) : nodeOrSelector;
  if (!node) return null;
  node.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
  return node;
}

export function on(nodeOrSelector, event, selectorOrHandler, handlerIfDelegation) {
  const node = typeof nodeOrSelector === 'string' ? $(nodeOrSelector) : nodeOrSelector;
  if (!node) return () => {};
  if (typeof selectorOrHandler === 'string' && typeof handlerIfDelegation === 'function') {
    const selector = selectorOrHandler;
    const handler = handlerIfDelegation;
    const listener = e => {
      const target = e.target.closest(selector);
      if (!target || !node.contains(target)) return;
      handler.call(target, e);
    };
    node.addEventListener(event, listener);
    return () => node.removeEventListener(event, listener);
  } else if (typeof selectorOrHandler === 'function') {
    node.addEventListener(event, selectorOrHandler);
    return () => node.removeEventListener(event, selectorOrHandler);
  }
  return () => {};
}