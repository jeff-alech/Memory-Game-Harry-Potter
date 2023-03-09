const cards = document.querySelectorAll('.memory-card');

const life = document.querySelector('span#vidas');
const points = document.querySelector('span#pontos');
const textoH1 = document.querySelector('#texto');
const contadorDePontos = Number(points);
let controladorDePontos = 0;
let quantidadeDeVidas = 5;
let cont = 0;
let pontoPorAcerto = 100;
const vidaPorErro = 1;


let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards()  : unflipCards();
  if(isMatch){
    cont++;
    points.innerHTML = pontoPorAcerto * cont;
    controladorDePontos += 100;
    if(controladorDePontos === 500){
      textoH1.innerHTML = "Parabéns, você ganhou!!";
    }
  }else{
    life.innerHTML -= vidaPorErro; 
    quantidadeDeVidas -= 1;
    if(quantidadeDeVidas <= 0){
      life.innerHTML = "0";
      textoH1.innerHTML = "Você perdeu, tente novamente!!";
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
    } 
    }
  } 


function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);


  resetBoard();
}
function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 10);
    card.style.order = randomPos;
  });
})();


cards.forEach(card => card.addEventListener('click', flipCard));


