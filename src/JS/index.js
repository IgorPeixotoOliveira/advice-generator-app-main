document.addEventListener("DOMContentLoaded", inicializar);

function inicializar() {
  const botao = document.querySelector("#advice-button");
  botao.addEventListener("click", aoClicarNoBotao);

  // Chamada inicial
  carregarConselho();
}

function aoClicarNoBotao() {
  carregarConselho();
}

function carregarConselho() {
  mostrarCarregando();

  buscarConselho()
    .then(exibirConselho)
    .catch(mostrarErro);
}

async function buscarConselho() {
  const url = "https://api.adviceslip.com/advice";
  const resposta = await fetch(url, { cache: "no-cache" });

  if (!resposta.ok) {
    throw new Error("Erro na resposta da API");
  }

  const dados = await resposta.json();
  return {
    id: dados.slip.id,
    texto: dados.slip.advice
  };
}

function exibirConselho(conselho) {
  document.querySelector(".advice-id").textContent = `Advice #${conselho.id}`;
  document.querySelector(".advice-text").textContent = `"${conselho.texto}"`;
}

function mostrarCarregando() {
  document.querySelector(".advice-id").textContent = "";
  document.querySelector(".advice-text").textContent = "Carregando conselho...";
}

function mostrarErro(erro) {
  console.error("Erro ao buscar conselho:", erro);
  document.querySelector(".advice-id").textContent = "";
  document.querySelector(".advice-text").textContent = "Erro ao carregar conselho. Tente novamente.";
}
