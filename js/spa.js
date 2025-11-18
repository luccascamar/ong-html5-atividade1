
import { html } from './dom.js';
import { render } from './templater.js';
import { Router } from './router.js';

const appData = {
  user: { name: 'Luccas' },
  indicadores: {
    voluntarios: 85,
    doacoes2025: 'R$ 42.300',
    projetos: 6,
    beneficiados: 3200
  }
};

const homeTpl = `
  <section>
    <h2 tabindex="0">Missão, Visão e Valores</h2>
    <p><strong>Missão:</strong> Promover inclusão social e desenvolvimento humano por meio de projetos comunitários sustentáveis.</p>
    <p><strong>Visão:</strong> Ser referência nacional em transformação social, atuando com ética, inovação e impacto real.</p>
    <p><strong>Valores:</strong> Solidariedade, transparência, respeito à diversidade, compromisso com resultados e trabalho em rede.</p>
  </section>

  <section>
    <h2 tabindex="0">Conquistas da Organização</h2>
    <ul>
      <li>Mais de 5.000 pessoas atendidas em projetos educacionais e de saúde.</li>
      <li>Reconhecimento municipal como entidade de utilidade pública.</li>
      <li>Parcerias com 30 empresas e instituições locais.</li>
      <li>Prêmio de Inovação Social em 2024.</li>
    </ul>
  </section>

  <section>
    <h2 tabindex="0">Relatórios de Transparência</h2>
    <p>Todos os dados sobre arrecadação, aplicação de recursos e resultados dos projetos estão disponíveis para consulta pública.</p>
    <a href="#/doacoes" class="botao" role="button">Acessar relatórios e doar</a>
  </section>

  <section>
    <h2 tabindex="0">Indicadores de Impacto</h2>
    <ul>
      <li>Voluntários ativos: <strong>{{indicadores.voluntarios}}</strong></li>
      <li>Doações recebidas em 2025: <strong>{{indicadores.doacoes2025}}</strong></li>
      <li>Projetos em andamento: <strong>{{indicadores.projetos}}</strong></li>
      <li>Pessoas beneficiadas: <strong>+{{indicadores.beneficiados}}</strong></li>
    </ul>
  </section>
`;

const projetosTpl = `
 <main>
    <section>
      <h2>Educação para Todos</h2>
      <img src="img/criancas-projeto-educacao.webp" alt="Crianças estudando" class="img-medium" loading="lazy" />
      <p>Aulas gratuitas para crianças em situação de vulnerabilidade.</p>
    </section>

    <section>
      <h2>Comunidade em Movimento</h2>
      <img src="img/acao-comunitaria.webp" alt="Voluntários em ação" class="img-medium" loading="lazy" />
      <p>Mobilizações em comunidades para garantir dignidade e inclusão.</p>
    </section>

    <p><a href="#/">Voltar ao Início</a></p>
  </main>
`;

const doacoesTpl = `
  <main>
    <section>
      <h2>Campanhas Ativas</h2>

      <article>
        <h3>Educação para Todos</h3>
        <p>Objetivo: R$ 20.000 para compra de materiais escolares.</p>
        <div class="barra-progresso">
          <div class="progresso" style="width: 65%;">65%</div>
        </div>
      </article>

      <article>
        <h3>Mutirão da Saúde</h3>
        <p>Objetivo: R$ 15.000 para exames e medicamentos.</p>
        <div class="barra-progresso">
          <div class="progresso" style="width: 80%;">80%</div>
        </div>
      </article>
    </section>

    <section>
      <h2>Faça sua Doação</h2>

      <!-- Barra de progresso geral (ids obrigatórios para o JS funcionar) -->
      <div id="doacoes-progress" aria-label="Progresso de doações">
        <div class="progress-meta">
          <span id="doacoes-total">R$ 0,00</span>
          <span class="small"> / </span>
          <span id="doacoes-meta">Meta: R$ 20.000,00</span>
        </div>
        <div class="progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
          <div class="progress-fill" style="width:0%"></div>
        </div>
        <div class="progress-percent small" id="doacoes-percent">0%</div>
      </div>

      <!-- Formulário (ids obrigatórios: form-doacao, doa-valor) -->
      <form id="form-doacao">
        <label>Valor:
          <input id="doa-valor" name="valor" type="number" placeholder="R$" required />
        </label>

        <label>Forma de pagamento:
          <select id="doa-pgto" name="pgto" required>
            <option value="pix">Pix</option>
            <option value="cartao">Cartão de crédito</option>
            <option value="boleto">Boleto</option>
          </select>
        </label>

        <label>Escolha a campanha:
          <select id="doa-campanha" name="campanha" required>
            <option value="educacao">Educação para Todos</option>
            <option value="saude">Mutirão da Saúde</option>
          </select>
        </label>

        <button type="submit">Doar</button>
      </form>
    </section>

    <section>
      <h2>Prestação de Contas</h2>
      <p>Transparência é um dos nossos pilares. Veja como os recursos estão sendo aplicados:</p>
      <ul>
        <li><a href="#">Relatório Trimestral - 1º trimestre 2025 (PDF)</a></li>
        <li><a href="#">Relatório Trimestral - 2º trimestre 2025 (PDF)</a></li>
        <li><a href="#">Resumo de Impacto por Projeto</a></li>
      </ul>
    </section>
  </main>
`;
const cadastroTpl = `
  <main>
    <h1>Cadastro</h1>
    <form id="form-cadastro">
      <label>
        Nome:
        <input id="cad-nome" name="nome" type="text" required />
      </label>

      <label>
        E-mail:
        <input id="cad-email" name="email" type="email" required />
      </label>

      <label>
        Telefone:
        <input id="telefone" name="telefone" type="text" />
      </label>

      <label>
        CPF:
        <input id="cpf" name="cpf" type="text" />
      </label>

      <button type="submit">Enviar</button>
    </form>
  </main>

`;

const loginTpl = `
  <main>
    <form id="form-login">
      <label>
        Email:
        <input id="email" name="email" type="email" required />
      </label>

      <label>
        Senha:
        <input id="senha" name="senha" type="password" required />
      </label>

      <label>
        Perfil:
        <select id="perfil" name="perfil" required>
          <option value="admin.html">Administrador</option>
          <option value="voluntario.html">Voluntário</option>
        </select>
      </label>

      <button type="submit">Entrar</button>
    </form>
  </main>

  
`;

const voluntarioTpl = `
  <header><h1>Bem-vindo, Voluntário!</h1></header>

  <section>
    <h2>Oportunidades de Voluntariado</h2>
    <ul>
      <li>Projeto Educação para Todos <button data-action="candidatar" data-projeto="educacao">Candidatar-se</button></li>
      <li>Mutirão da Saúde <button data-action="candidatar" data-projeto="saude">Candidatar-se</button></li>
    </ul>
  </section>

  <section>
    <h2>Histórico de Participação</h2>
    <p>2 projetos concluídos</p>
  </section>

  <section>
    <h2>Compartilhar Experiências</h2>
    <textarea id="exp-text" placeholder="Conte sua experiência..."></textarea>
    <button id="exp-publicar">Publicar</button>
  </section>

  <section>
    <h2>Certificados Digitais</h2>
    <button id="baixar-cert">Baixar Certificado</button>
  </section>

  <a href="#/">Voltar ao Início</a>
`;

const blogTpl = `
  <main>
    <section>
      <h2>Notícias e Atualizações</h2>

      <article>
        <h3>Nova campanha de arrecadação lançada</h3>
        <p>Em outubro, iniciamos a campanha "Educação para Todos", com o objetivo de arrecadar R$ 20.000 para materiais escolares.</p>
      </article>

      <article>
        <h3>Voluntários revitalizam praça comunitária</h3>
        <p>Mais de 30 voluntários participaram da ação que transformou um espaço público em área de lazer segura e acessível.</p>
      </article>
    </section>

    <section>
      <h2>Newsletter</h2>
      <p>Receba atualizações mensais sobre nossos projetos, campanhas e histórias inspiradoras.</p>
      <form id="form-newsletter">
        <label>
          Nome:
          <input id="news-nome" name="nome" type="text" required />
        </label>

        <label>
          Email:
          <input id="news-email" name="email" type="email" required />
        </label>

        <button type="submit">Assinar Newsletter</button>
      </form>
    </section>

    <section>
      <h2>Área de Imprensa</h2>
      <ul>
        <li><a href="#">Release: Resultados da campanha de saúde (PDF)</a></li>
        <li><a href="#">Release: Parceria com empresas locais (PDF)</a></li>
        <li><a href="#">Release: Premiação de inovação social (PDF)</a></li>
      </ul>
    </section>

    <section>
      <h2>Documentos Públicos</h2>
      <ul>
        <li><a href="#">Estatuto da ONG (PDF)</a></li>
        <li><a href="#">Relatório Anual 2024 (PDF)</a></li>
        <li><a href="#">Plano de Ação 2025 (PDF)</a></li>
      </ul>
    </section>
  </main>

`;

const adminTpl = `
  <main>
    <section>
      <h2>Notícias e Atualizações</h2>

      <article>
        <h3>Nova campanha de arrecadação lançada</h3>
        <p>Em outubro, iniciamos a campanha "Educação para Todos", com o objetivo de arrecadar R$ 20.000 para materiais escolares.</p>
      </article>

      <article>
        <h3>Voluntários revitalizam praça comunitária</h3>
        <p>Mais de 30 voluntários participaram da ação que transformou um espaço público em área de lazer segura e acessível.</p>
      </article>
    </section>

    <section>
      <h2>Newsletter</h2>
      <form id="form-newsletter-admin">
        <label>
          Nome:
          <input id="admin-news-nome" name="nome" type="text" required />
        </label>

        <label>
          Email:
          <input id="admin-news-email" name="email" type="email" required />
        </label>

        <button type="submit">Assinar Newsletter</button>
      </form>
    </section>

    <section>
      <h2>Área de Imprensa</h2>
      <ul>
        <li><a href="#" target="_blank" rel="noopener">Release: Resultados da campanha de saúde (PDF)</a></li>
        <li><a href="#" target="_blank" rel="noopener">Release: Parceria com empresas locais (PDF)</a></li>
        <li><a href="#" target="_blank" rel="noopener">Release: Premiação de inovação social (PDF)</a></li>
      </ul>
    </section>

    <section>
      <h2>Documentos Públicos</h2>
      <ul>
        <li><a href="#" target="_blank" rel="noopener">Estatuto da ONG (PDF)</a></li>
        <li><a href="#" target="_blank" rel="noopener">Relatório Anual 2024 (PDF)</a></li>
        <li><a href="#" target="_blank" rel="noopener">Plano de Ação 2025 (PDF)</a></li>
      </ul>
    </section>
  </main>

`;

const router = new Router('#app');

router
  .add('/', () => render(homeTpl, appData))
  .add('/projetos', () => render(projetosTpl))
  .add('/doacoes', () => render(doacoesTpl))
  .add('/cadastro', () => render(cadastroTpl))
  .add('/login', () => render(loginTpl))
  .add('/voluntario', () => render(voluntarioTpl))
  .add('/blog', () => render(blogTpl))
  .add('/admin', () => render(adminTpl))
  .add('*', () => '<h1>404 - Não encontrado</h1><a href="#/">Ir para Home</a>');

router.start();

document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-action="candidatar"]');
  if (btn) {
    const projeto = btn.dataset.projeto;
    alert(`Candidatura enviada para: ${projeto} (exemplo).`);
    return;
  }

  if (e.target.matches('#exp-publicar')) {
    const txt = document.getElementById('exp-text')?.value?.trim() || '';
    if (!txt) { alert('Escreva algo antes de publicar.'); return; }
    alert('Experiência publicada (exemplo).');
    document.getElementById('exp-text').value = '';
    return;
  }

  if (e.target.matches('#baixar-cert')) {
    alert('Download de certificado iniciado (exemplo).');
    return;
  }
});

document.addEventListener('submit', (e) => {
  const form = e.target;
  if (form.id === 'form-login' || form.id === 'loginForm') {
    
    return;
  }

  if (form.id === 'form-newsletter' || form.id === 'form-newsletter-admin') {
    e.preventDefault();
    const fd = new FormData(form);
    console.log('Newsletter:', Object.fromEntries(fd.entries()));
    alert('Inscrição recebida. Obrigado!');
    location.hash = '#/';
    return;
  }
});


if (window.ONG && typeof window.ONG.initDynamic === 'function') {
  window.ONG.initDynamic(document.getElementById('app'));
}

(function(){
  function updateDoacoesUI(detail){
    const totalCents = detail?.totalCents ?? 0;
    const metaCents = detail?.metaCents ?? 2000000;
    const totalEl = document.getElementById('doacoes-total');
    const metaEl = document.getElementById('doacoes-meta');
    const fill = document.querySelector('#doacoes-progress .progress-fill');
    const percentEl = document.getElementById('doacoes-percent');
    if (!totalEl || !metaEl || !fill || !percentEl) return;

    const fmt = (c) => (c/100).toLocaleString('pt-BR', { style:'currency', currency:'BRL' });
    totalEl.textContent = fmt(totalCents);
    metaEl.textContent = 'Meta: ' + fmt(metaCents);

    const pct = Math.min(100, Math.round((totalCents / metaCents) * 100));
    fill.style.width = pct + '%';
    percentEl.textContent = pct + '%';
    const track = document.querySelector('.progress-track');
    if (track) track.setAttribute('aria-valuenow', String(pct));
  }

  window.addEventListener('ong:doacoes:updated', (ev) => updateDoacoesUI(ev.detail));

  window.addEventListener('hashchange', () => {
    if (location.hash.startsWith('#/doacoes')) {
      const total = parseInt(localStorage.getItem('ong.doacoesTotalCents') || '0', 10);
      const meta = (window.ONG && window.ONG.doacoes && window.ONG.doacoes.metaCents) || 2000000;
      updateDoacoesUI({ totalCents: total, metaCents: meta });
    }
  });

  if (location.hash.startsWith('#/doacoes')) {
    const total = parseInt(localStorage.getItem('ong.doacoesTotalCents') || '0', 10);
    const meta = (window.ONG && window.ONG.doacoes && window.ONG.doacoes.metaCents) || 2000000;
    updateDoacoesUI({ totalCents: total, metaCents: meta });
  }
})();