document.addEventListener("DOMContentLoaded", () => {
  // Adiciona aria-labels automáticos (quando faltam)
  document.querySelectorAll("input, select, textarea").forEach((el) => {
    if (!el.hasAttribute("aria-label")) {
      const lab = el.closest("label");
      if (lab && lab.textContent) {
        el.setAttribute("aria-label", lab.textContent.trim());
      }
    }
  });

  // Máscara CPF (campo com id="cpf")
  const cpf = document.getElementById("cpf");
  if (cpf) {
    cpf.addEventListener("input", function () {
      let v = this.value.replace(/\D/g, "");
      if (v.length > 11) v = v.slice(0, 11);
      v = v.replace(/(\d{3})(\d)/, "$1.$2");
      v = v.replace(/(\d{3})(\d)/, "$1.$2");
      v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
      this.value = v;
    });
  }

  // Máscara telefone (id="telefone")
  const telefone = document.getElementById("telefone");
  if (telefone) {
    telefone.addEventListener("input", function () {
      let v = this.value.replace(/\D/g, "");
      if (v.length > 11) v = v.slice(0, 11);
      v = v.replace(/^0/, "");
      if (v.length <= 10) {
        v = v.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3").replace(/-$/, "");
      } else {
        v = v.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3").replace(/-$/, "");
      }
      this.value = v;
    });
  }

  // Máscara CEP (id="cep")
  const cep = document.getElementById("cep");
  if (cep) {
    cep.addEventListener("input", function () {
      let v = this.value.replace(/\D/g, "");
      if (v.length > 8) v = v.slice(0, 8);
      v = v.replace(/(\d{5})(\d)/, "$1-$2");
      this.value = v;
    });
  }

  // Redirecionamento de login com validação de credenciais
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("email")?.value.trim().toLowerCase();
      const senha = document.getElementById("senha")?.value.trim().toLowerCase();
      const perfil = document.getElementById("perfil")?.value;

      if (email === "emailteste000@ong.com" && senha === "teste") {
        window.location.href = perfil;
      } else {
        alert("Credenciais inválidas. Use email: emailteste000@ong.com | senha: teste");
      }
    });
  }
});