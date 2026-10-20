/* =========================================================
   ARIANE | Landing page
   ========================================================= */

/* ---------- Configuração ---------- */
// Número do WhatsApp da Ariane: só dígitos, com 55 + DDD + número.
// Exemplo: 5542999999999
const WHATSAPP_NUMERO = "55XXXXXXXXXXX";

// Preencha estes textos quando os detalhes reais de cada projeto estiverem definidos.
const DETALHES_PROJETOS = [
  { desafio: "[PREENCHER]", intencao: "[PREENCHER]", solucoes: "[PREENCHER]", resultado: "[PREENCHER]" },
  { desafio: "[PREENCHER]", intencao: "[PREENCHER]", solucoes: "[PREENCHER]", resultado: "[PREENCHER]" },
  { desafio: "[PREENCHER]", intencao: "[PREENCHER]", solucoes: "[PREENCHER]", resultado: "[PREENCHER]" },
  { desafio: "[PREENCHER]", intencao: "[PREENCHER]", solucoes: "[PREENCHER]", resultado: "[PREENCHER]" },
  { desafio: "[PREENCHER]", intencao: "[PREENCHER]", solucoes: "[PREENCHER]", resultado: "[PREENCHER]" },
  { desafio: "[PREENCHER]", intencao: "[PREENCHER]", solucoes: "[PREENCHER]", resultado: "[PREENCHER]" }
];

/* ---------- WhatsApp ----------
   Todo link/botão com o atributo data-whatsapp="mensagem"
   abre a conversa já com essa mensagem preenchida. */
document.querySelectorAll("[data-whatsapp]").forEach((link) => {
  const mensagem = link.dataset.whatsapp;
  link.href = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensagem)}`;
  link.target = "_blank";
  link.rel = "noopener";
});

/* ---------- Detalhes dos projetos ---------- */
const dialogoProjeto = document.querySelector(".project-dialog");
const imagemDialogo = document.querySelector(".dialog-image");
const tituloDialogo = document.querySelector("#dialog-title");
const fecharDialogo = document.querySelector(".dialog-close");
let ultimoCardAtivo;

document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("click", () => {
    const indice = Number(card.dataset.project);
    const imagem = card.querySelector("img");
    const detalhes = DETALHES_PROJETOS[indice];
    ultimoCardAtivo = card;
    tituloDialogo.textContent = card.querySelector(".project-title").textContent;
    imagemDialogo.src = imagem.src;
    imagemDialogo.alt = imagem.alt;
    [detalhes.desafio, detalhes.intencao, detalhes.solucoes, detalhes.resultado].forEach((texto, posicao) => {
      dialogoProjeto.querySelectorAll(".project-details dd")[posicao].textContent = texto;
    });
    dialogoProjeto.showModal();
    fecharDialogo.focus();
  });
});

fecharDialogo.addEventListener("click", () => dialogoProjeto.close());
dialogoProjeto.addEventListener("click", (evento) => {
  if (evento.target === dialogoProjeto) dialogoProjeto.close();
});
dialogoProjeto.addEventListener("close", () => ultimoCardAtivo?.focus());

/* ---------- Formulário que prepara a conversa ---------- */
const formulario = document.querySelector("#contact-form");
const avisoErro = document.querySelector("#form-error");
const avisoSucesso = document.querySelector("#form-success");

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  avisoErro.textContent = "";
  avisoSucesso.textContent = "";

  if (!formulario.reportValidity()) {
    avisoErro.textContent = "Confira os campos destacados e preencha as informações solicitadas.";
    formulario.querySelector(":invalid").focus();
    return;
  }

  const dados = new FormData(formulario);
  const texto = [
    "Olá! Gostaria de conversar sobre meu espaço.",
    `Nome: ${dados.get("nome")}`,
    `Serviço: ${dados.get("servico")}`,
    `Espaço: ${dados.get("espaco")}`,
    `Cidade do imóvel: ${dados.get("cidade")}`,
    `O que gostaria de mudar ou conquistar: ${dados.get("mensagem")}`
  ].join("\n");

  avisoSucesso.textContent = "Mensagem preparada. O WhatsApp será aberto para você revisar e enviar.";
  window.open(`https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(texto)}`, "_blank", "noopener");
});

/* ---------- Ano e animações discretas ---------- */
document.querySelector("#current-year").textContent = new Date().getFullYear();

if ("IntersectionObserver" in window) {
  document.documentElement.classList.add("com-animacao");
  const observadorEntrada = new IntersectionObserver((entradas, observador) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("is-visible");
        observador.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((elemento) => observadorEntrada.observe(elemento));
}

/* O botão flutuante não disputa espaço com o formulário no celular. */
const botaoFlutuante = document.querySelector(".floating-whatsapp");
if ("IntersectionObserver" in window) {
  const observadorContato = new IntersectionObserver(([entrada]) => {
    botaoFlutuante.classList.toggle("is-hidden", entrada.isIntersecting);
  }, { threshold: 0.15 });
  observadorContato.observe(document.querySelector("#contato"));
}

/* ---------- Menu no celular ---------- */
const botaoMenu = document.querySelector(".menu-toggle");
const menu = document.querySelector("#menu");

function alternarMenu(abrir) {
  menu.classList.toggle("is-open", abrir);
  botaoMenu.setAttribute("aria-expanded", String(abrir));
  botaoMenu.setAttribute("aria-label", abrir ? "Fechar menu" : "Abrir menu");
}

botaoMenu.addEventListener("click", () => {
  alternarMenu(botaoMenu.getAttribute("aria-expanded") !== "true");
});

// Fecha o menu ao clicar em um link ou ao apertar Esc
menu.addEventListener("click", (e) => {
  if (e.target.closest("a")) alternarMenu(false);
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") alternarMenu(false);
});

/* ---------- Sombra sutil no menu ao rolar ---------- */
const cabecalho = document.querySelector(".site-header");
function atualizarCabecalho() {
  cabecalho.classList.toggle("is-scrolled", window.scrollY > 10);
}
window.addEventListener("scroll", atualizarCabecalho, { passive: true });
atualizarCabecalho();
