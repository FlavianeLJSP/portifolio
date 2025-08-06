const botoesProx = document.querySelectorAll(".proximo");
const botoesAnt = document.querySelectorAll(".anterior");
const todosCarrosseis = document.querySelectorAll(".carrossel-imagens");

// Um array para armazenar o deslocamento de cada carrossel
const deslocamentos = new Array(todosCarrosseis.length).fill(0);

botoesProx.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    const carrossel = todosCarrosseis[i];
    const imgs = carrossel.querySelectorAll("img");
    const larguraImagem = imgs[0].clientWidth + 10;

    // limita o deslocamento ao final
    const maxDeslocamento = (imgs.length - 1) * larguraImagem;

    deslocamentos[i] = Math.min(deslocamentos[i] + larguraImagem, maxDeslocamento);
    carrossel.style.transform = `translateX(-${deslocamentos[i]}px)`;
  });
});

botoesAnt.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    const carrossel = todosCarrosseis[i];
    const imgs = carrossel.querySelectorAll("img");
    const larguraImagem = imgs[0].clientWidth + 10;

    deslocamentos[i] = Math.max(deslocamentos[i] - larguraImagem, 0);
    carrossel.style.transform = `translateX(-${deslocamentos[i]}px)`;
  });
});
