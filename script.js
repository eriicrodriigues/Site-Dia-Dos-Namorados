// Define uma data especial, como o início do relacionamento
const dataEspecial = new Date("2018-06-13T17:52:00");

function atualizarContador() {
  const agora = new Date();

  let anos = agora.getFullYear() - dataEspecial.getFullYear();
  let meses = agora.getMonth() - dataEspecial.getMonth();
  let dias = agora.getDate() - dataEspecial.getDate();
  let horas = agora.getHours() - dataEspecial.getHours();
  let minutos = agora.getMinutes() - dataEspecial.getMinutes();
  let segundos = agora.getSeconds() - dataEspecial.getSeconds();

  if (segundos < 0) {
    segundos += 60;
    minutos--;
  }
  if (minutos < 0) {
    minutos += 60;
    horas--;
  }
  if (horas < 0) {
    horas += 24;
    dias--;
  }
  if (dias < 0) {
    const ultimoMes = new Date(agora.getFullYear(), agora.getMonth(), 0);
    dias += ultimoMes.getDate();
    meses--;
  }
  if (meses < 0) {
    meses += 12;
    anos--;
  }

  document.getElementById("contador").innerHTML =
    `${anos} ano${anos !== 1 ? 's' : ''}, ` +
    `${meses} mes${meses !== 1 ? 'es' : ''} e ` +
    `${dias} dia${dias !== 1 ? 's' : ''}, <br>` +
    `${horas} horas ${minutos} minutos e ${segundos} segundos, <br> de amor, carinho e aventuras <br> e contando...`;
}

setInterval(atualizarContador, 1000);

// Corações com formato real
const canvas = document.getElementById("coracoes");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let coracoes = [];

for (let i = 0; i < 30; i++) {
  coracoes.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 20 + 10,
    speed: Math.random() * 1.5 + 0.5,
    opacity: Math.random() * 0.5 + 0.5,
  });
}

function desenharCoracao(x, y, size, opacity) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(size / 50, size / 50);
  ctx.beginPath();
  ctx.moveTo(25, 25);
  ctx.bezierCurveTo(25, 20, 20, 0, 0, 0);
  ctx.bezierCurveTo(-30, 0, -30, 35, -30, 35);
  ctx.bezierCurveTo(-30, 55, -10, 77, 25, 95);
  ctx.bezierCurveTo(60, 77, 80, 55, 80, 35);
  ctx.bezierCurveTo(80, 35, 80, 0, 50, 0);
  ctx.bezierCurveTo(35, 0, 25, 20, 25, 25);
  ctx.closePath();
  ctx.fillStyle = `rgba(255, 105, 180, ${opacity})`;
  ctx.fill();
  ctx.restore();
}

function animarCoracoes() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let c of coracoes) {
    desenharCoracao(c.x, c.y, c.size, c.opacity);
    c.y += c.speed;
    if (c.y > canvas.height + 100) c.y = -100;
  }
  requestAnimationFrame(animarCoracoes);
}

animarCoracoes();

// Frases
const frases = [
    "Você é o meu melhor presente.",
    "Cada momento com você é único.",
    "Te amo ontem, hoje e sempre!",
    "Você ilumina minha vida.",
    "Meu lugar favorito é ao seu lado.",
    "Você é o meu melhor momento.",
    "Te amo pra sempre.",
    "Teeee Amoooooo Muitão do Coração ♡"
  ];
  
  function mostrarFrase() {
    const indice = Math.floor(Math.random() * frases.length);
    document.getElementById("frase").textContent = frases[indice];
  }
  
  setInterval(mostrarFrase, 10000); // Troca a cada 5 segundos
  mostrarFrase(); // Primeira frase ao carregar
  
  // Abrir imagem ao clicar
document.querySelectorAll(".encontros img").forEach(img => {
    img.addEventListener("click", function () {
      const lightbox = document.getElementById("lightbox");
      const imagemAmpliada = document.getElementById("imagemAmpliada");
      imagemAmpliada.src = this.src;
      lightbox.style.display = "flex";
    });
  });
  
  function fecharLightbox() {
    document.getElementById("lightbox").style.display = "none";
  }
  
  // Também aplica o efeito de ampliar às imagens da galeria
document.querySelectorAll(".galeria img").forEach(img => {
    img.addEventListener("click", function () {
      const lightbox = document.getElementById("lightbox");
      const imagemAmpliada = document.getElementById("imagemAmpliada");
      imagemAmpliada.src = this.src;
      lightbox.style.display = "flex";
    });
  });

  // Dado
  function rolarDado() {
    const som = document.getElementById("somDado");
    som.currentTime = 0; // Reinicia caso já esteja tocando
    som.play();

    const numero = Math.floor(Math.random() * 16) + 1;
    const dado = document.getElementById("dado");
  
    dado.style.transform = "rotate(360deg)";
    setTimeout(() => {
      dado.src = `./Dado/face${numero}.jpeg`;
      dado.style.transform = "rotate(0deg)";
    }, 300);
  
    // Sorteio de tempo aleatório entre 1 e 6 minutos
    const minutos = Math.floor(Math.random() * 6) + 1;
    const tempoTotalSegundos = minutos * 60;
    let tempoRestante = tempoTotalSegundos;
  
    const tempoRestanteEl = document.getElementById("tempoRestante");
  
    // Cancela timers anteriores
    if (window.timerDado) clearTimeout(window.timerDado);
    if (window.intervaloContagem) clearInterval(window.intervaloContagem);
  
    // Inicia contagem regressiva visível
    window.intervaloContagem = setInterval(() => {
      const min = Math.floor(tempoRestante / 60).toString().padStart(2, "0");
      const seg = (tempoRestante % 60).toString().padStart(2, "0");
      tempoRestanteEl.textContent = `⏳ Tempo restante: ${min}:${seg}`;
  
      if (tempoRestante <= 0) {
        clearInterval(window.intervaloContagem);
      } else {
        tempoRestante--;
      }
    }, 1000);
  
    // Timer final
    window.timerDado = setTimeout(() => {
        tempoRestanteEl.textContent = `⏰ O tempo acabou!`;

        // TOCA O SOM DE ALARME
        const alarme = document.getElementById("somAlarme");
        alarme.currentTime = 0;
        alarme.play();
      
      }, tempoTotalSegundos * 1000);
  }

  function ampliarDado(imagemSrc) {
    const lightbox = document.getElementById("lightbox");
    const imagemAmpliada = document.getElementById("imagemAmpliada");
    imagemAmpliada.src = imagemSrc;
    lightbox.style.display = "flex";
  }
  
  function fecharLightbox() {
    document.getElementById("lightbox").style.display = "none";
  }
  
  // Dado 2 e 3
  function rolarDadosPalavras() { 
    const som = document.getElementById("somDado");
    som.currentTime = 0; // Reinicia caso já esteja tocando
    som.play();

    const palavras1 = [
      "Massagem",
      "Chupada",
      "Beijo",
      "Mordida",
      "Carinho",
      "O que quiser"
    ];
  
    const palavras2 = [
      "orelha",
      "boca",
      "mão",
      "pescoço",
      "pé",
      "onde quiser"
    ];
  
    const dado1 = document.getElementById("dado1-texto");
    const dado2 = document.getElementById("dado2-texto");

    // Aplica a animação
    dado1.classList.add("rolando");
    dado2.classList.add("rolando");

    // Gera os números aleatórios
    const i1 = Math.floor(Math.random() * palavras1.length);
    const i2 = Math.floor(Math.random() * palavras2.length);

    // Após a animação, atualiza o texto
    setTimeout(() => {
        dado1.textContent = palavras1[i1];
        dado2.textContent = palavras2[i2];
        document.getElementById("fraseCombinada").textContent =
        `❤️ ${palavras1[i1]} no(a) ${palavras2[i2]} ❤️`;

        // Remove a animação para poder reaplicar depois
        dado1.classList.remove("rolando");
        dado2.classList.remove("rolando");
    }, 500); // mesmo tempo da animação
  }
