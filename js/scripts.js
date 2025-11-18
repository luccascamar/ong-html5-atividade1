

(function () {
  function addAriaLabels(root = document) {
    root.querySelectorAll("input, select, textarea").forEach((el) => {
      if (!el.hasAttribute("aria-label")) {
        const lab = el.closest("label");
        if (lab && lab.textContent) {
          el.setAttribute("aria-label", lab.textContent.trim());
        }
      }
    });
  }

  function handleInputMask(e) {
    const el = e.target;
    if (!(el instanceof HTMLInputElement)) return;

    if (el.id === "cpf") {
      let v = el.value.replace(/\D/g, "");
      if (v.length > 11) v = v.slice(0, 11);
      v = v.replace(/(\d{3})(\d)/, "$1.$2");
      v = v.replace(/(\d{3})(\d)/, "$1.$2");
      v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
      el.value = v;
      return;
    }

    if (el.id === "telefone") {
      let v = el.value.replace(/\D/g, "");
      if (v.length > 11) v = v.slice(0, 11);
      v = v.replace(/^0/, "");
      if (v.length <= 10) {
        v = v.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3").replace(/-$/, "");
      } else {
        v = v.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3").replace(/-$/, "");
      }
      el.value = v;
      return;
    }

    if (el.id === "cep") {
      let v = el.value.replace(/\D/g, "");
      if (v.length > 8) v = v.slice(0, 8);
      v = v.replace(/(\d{5})(\d)/, "$1-$2");
      el.value = v;
      return;
    }
  }

  function toHashRoute(path) {
    if (!path) return "#/";
    if (path.startsWith("#")) return path;
    try {
      const url = new URL(path, location.href);
      const pathname = url.pathname.split("/").pop() || "";
      if (pathname.endsWith(".html")) {
        const name = pathname.replace(/\.html$/i, "");
        return "#/" + (name === "index" ? "" : name);
      }
      return path;
    } catch {
      if (path.endsWith(".html")) {
        const name = path.replace(/\.html$/i, "");
        return "#/" + (name === "index" ? "" : name);
      }
      return path;
    }
  }

  function handleSubmit(e) {
    const form = e.target;
    if (!(form instanceof HTMLFormElement)) return;

    if (form.id === "loginForm" || form.id === "form-login") {
      e.preventDefault();
      const email = form.querySelector("#email")?.value.trim().toLowerCase() || "";
      const senha = form.querySelector("#senha")?.value.trim().toLowerCase() || "";
      const perfil = form.querySelector("#perfil")?.value || "";

      if (email === "emailteste000@ong.com" && senha === "teste") {
        const target = toHashRoute(perfil) || "#/";
        location.hash = target.replace(/^#/, "#");
      } else {
        alert("Credenciais inválidas. Use email: emailteste000@ong.com | senha: teste");
      }
      return;
    }

    if (form.id === "form-cadastro") {
      e.preventDefault();
      const fd = new FormData(form);
      console.log("Cadastro:", Object.fromEntries(fd.entries()));
      alert("Cadastro recebido (exemplo).");
      location.hash = "#/";
      return;
    }

    if (form.id === "form-doacao") {
  try { if (e.defaultPrevented === false) e.preventDefault(); } catch {}
  
  function toCentsFromString(valorStr){
    if (!valorStr) return 0;
    const cleaned = String(valorStr).replace(/[R$\s.]/g,'').replace(',', '.');
    const num = parseFloat(cleaned) || 0;
    return Math.round(num * 100);
  }
  function formatBRL(cents){
    return (cents/100).toLocaleString('pt-BR', { style:'currency', currency:'BRL' });
  }

  const KEY = 'ong.doacoesTotalCents';
  const DEFAULT_META_CENTS = 2000000; 

  function getTotalCents(){ return parseInt(localStorage.getItem(KEY) || '0', 10); }
  function setTotalCents(cents){
    localStorage.setItem(KEY, String(Math.max(0, Math.round(cents))));
    window.dispatchEvent(new CustomEvent('ong:doacoes:updated', { detail: { totalCents: getTotalCents(), metaCents: DEFAULT_META_CENTS } }));
  }

  const valorStr = form.querySelector('#doa-valor')?.value || form.querySelector('input[name="valor"]')?.value || '0';
  const valorCents = toCentsFromString(valorStr);
  if (valorCents <= 0) {
    alert('Informe um valor válido para doação.');
    return;
  }

  const novo = getTotalCents() + valorCents;
  setTotalCents(novo);

  console.log('Doação registrada (exemplo):', formatBRL(valorCents), 'Total agora:', formatBRL(novo));
  alert('Obrigado pela sua doação — valor registrado (exemplo).');

  form.reset();
  location.hash = '#/';
  return;
}

    if (form.id === "form-newsletter" || form.id === "form-newsletter-admin") {
      e.preventDefault();
      const fd = new FormData(form);
      console.log("Newsletter:", Object.fromEntries(fd.entries()));
      alert("Inscrição recebida. Obrigado!");
      location.hash = "#/";
      return;
    }
  }

  function initOnLoad() {
    addAriaLabels(document);
    document.addEventListener("input", handleInputMask, true);
    document.addEventListener("submit", handleSubmit, true);
  }

  function initDynamic(root = document) {
    addAriaLabels(root);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initOnLoad);
  } else {
    initOnLoad();
  }

  window.ONG = window.ONG || {};
  window.ONG.initDynamic = initDynamic;
})();