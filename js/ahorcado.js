const bands = ['riverside', 'divididos', 'metallica', 'opeth', 'plini', 'coldplay', 'acdc', 'u2', 'paramore', 'eminem'];
let artistToFind = '';
let aciertos = 0;
let errors = 1;

const $inputLetter = document.querySelector('.letter-input');
const $searchedWords = document.querySelector('.searched-words');
const $imgsAhorcado = document.querySelectorAll('.ahorcado-img');
const $gameover = document.querySelector('.gameover');
const $gamesuccess = document.querySelector('.gamesuccess');
const $tryAgain = document.querySelector('.try-again');

window.addEventListener('load', () => {
  createAhorcado();
});

$tryAgain.addEventListener('click', () => {
  resetAhorcado();
});

function createAhorcado() {
  const posRan = Math.floor(Math.random() * 10);
  artistToFind = bands[posRan];
  createEmptySpaces(artistToFind);
}

function createEmptySpaces(artist) {
  for (let i = 0; i < artist.length; i++) {
    const li = document.createElement('li');
    $searchedWords.appendChild(li);
  }
}

$inputLetter.addEventListener('input', e => {
  if (e.target.value.length === 1 && errors < 7 && aciertos !== artistToFind.length) {
    playAhorcado(e.target.value.toLowerCase());
  }
  if (e.target.value.length > 1) {
    e.target.value = e.target.value[0];
  }
});

function findIndexesInArtist(letter) {
  let indexes = [];
  let pos = artistToFind.indexOf(letter);
  while ( pos != -1 ) {
    indexes.push(pos);
    pos = artistToFind.indexOf(letter, pos + 1);
  }
  return indexes;
}

function playAhorcado(letter) {
  const indexes = findIndexesInArtist(letter);
  if (indexes.length > 0) {
    fillAhorcadoWithSuccess(indexes, letter);
  } else {
    fillAhorcadoWithError();
  }
}

function fillAhorcadoWithSuccess(indexes, letter) {
  const $lis = $searchedWords.querySelectorAll('li');
  indexes.forEach(index => {
    if ($lis[index].innerHTML === '') {
      aciertos++;
    }
    $lis[index].innerHTML = letter;
  });
  if (aciertos === artistToFind.length) {
    ahorcadoEndedWithSuccess();
  }
}

function fillAhorcadoWithError() {
  errors++;
  $imgsAhorcado.forEach((img, index) => {
    img.classList.remove('show');
    if (index === errors-1) {
      img.classList.add('show');
    }
  });
  if (errors === 7) {
    ahorcadoEndedWithError();
  }
}

function ahorcadoEndedWithError() {
  $inputLetter.disabled = true;
  $gameover.classList.add('show');
  $tryAgain.classList.add('show');
  revealArtist();
}

function revealArtist() {
  const $lis = $searchedWords.querySelectorAll('li');
  $lis.forEach((li, index) => {
    li.innerHTML = artistToFind[index];
  });
}

function ahorcadoEndedWithSuccess() {
  $inputLetter.disabled = true;
  $gamesuccess.classList.add('show');
  $tryAgain.classList.add('show');
}

function resetAhorcado() {
  $inputLetter.disabled = false;
  $inputLetter.value = '';
  $gameover.classList.remove('show');
  $gamesuccess.classList.remove('show');
  $tryAgain.classList.remove('show');
  aciertos = 0;
  errors = 1;
  $imgsAhorcado.forEach((img, index) => {
    img.classList.remove('show');
    if (index === 0) {
      img.classList.add('show');
    }
  });
  $searchedWords.innerHTML = '';
  createAhorcado();
}


