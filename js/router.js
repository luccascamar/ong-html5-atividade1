
export class Router {
  constructor(outletSelector) {
    this.routes = [];
    this.outlet = document.querySelector(outletSelector);
    this._onHashChange = this._onHashChange.bind(this);
  }

  add(path, handler) {
    const keys = [];
    const pattern = path === '*' ? /^.*$/ : new RegExp('^' + path
      .replace(/\/+/g,'/')
      .split('/')
      .map(part => {
        if (part.startsWith(':')) { keys.push(part.slice(1)); return '([^/]+)'; }
        return part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      })
      .join('/') + '$');
    this.routes.push({ path, pattern, keys, handler });
    return this;
  }

  start() {
    window.addEventListener('hashchange', this._onHashChange);
    if (!location.hash) location.hash = '#/';
    this._onHashChange();
  }

  stop() {
    window.removeEventListener('hashchange', this._onHashChange);
  }

  _match(hashPath) {
    const cleaned = (hashPath.replace(/^#/, '') || '/').replace(/\/+$/, '') || '/';
    for (const route of this.routes) {
      const m = cleaned.match(route.pattern);
      if (!m) continue;
      const params = {};
      route.keys.forEach((k, i) => { params[k] = decodeURIComponent(m[i+1] || ''); });
      return { route, params };
    }
    return null;
  }

  async _onHashChange() {
    const match = this._match(location.hash);
    if (!match) return;
    try {
      const result = await match.route.handler(match.params);
      if (typeof result === 'string') {
        if (this.outlet) this.outlet.innerHTML = result;
      } else if (result instanceof Node) {
        if (this.outlet) { this.outlet.innerHTML = ''; this.outlet.appendChild(result); }
      } else if (result == null) {
        
      }
      if (this.outlet) this.outlet.focus();

      
      if (window.ONG && typeof window.ONG.initDynamic === 'function') {
        try { window.ONG.initDynamic(this.outlet); } catch (err) { console.error('initDynamic error', err); }
      }
    } catch (err) {
      console.error('Router handler error', err);
      if (this.outlet) this.outlet.innerHTML = '<h2>Erro ao carregar a rota</h2>';
    }
  }
}