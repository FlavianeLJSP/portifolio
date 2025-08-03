const tecnologias = ["Python", "JavaScript", "Django", "Node.js", "MySQL", "TypeScript"];
const span = document.getElementById("tecnologia");

let i = 0;
setInterval(() => {
  span.textContent = tecnologias[i];
  i = (i + 1) % tecnologias.length;
}, 1500);
const botoesProx = document.querySelectorAll(".proximo");
const botoesAnt = document.querySelectorAll(".anterior");
const todosCarrosseis = document.querySelectorAll(".carrossel-imagens");

botoesProx.forEach((btn, i) => {
  let deslocamento = 0;
  btn.addEventListener("click", () => {
    const carrossel = todosCarrosseis[i];
    const imgs = carrossel.querySelectorAll("img");
    const larguraImagem = imgs[0].clientWidth + 10; // 10px margin
    deslocamento = Math.min(deslocamento + larguraImagem, (imgs.length - 1) * larguraImagem);
    carrossel.style.transform = `translateX(-${deslocamento}px)`;
  });
});

botoesAnt.forEach((btn, i) => {
  let deslocamento = 0;
  btn.addEventListener("click", () => {
    const carrossel = todosCarrosseis[i];
    const imgs = carrossel.querySelectorAll("img");
    const larguraImagem = imgs[0].clientWidth + 10;
    deslocamento = Math.max(deslocamento - larguraImagem, 0);
    carrossel.style.transform = `translateX(-${deslocamento}px)`;
  });
});
