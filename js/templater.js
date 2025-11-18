
export function render(template = '', data = {}) {
  return String(template).replace(/{{\s*([^}]+)\s*}}/g, (_, expr) => {
    try {
      return String(expr.split('.').reduce((obj, key) => (obj == null ? '' : obj[key]), data) ?? '');
    } catch {
      return '';
    }
  });
}