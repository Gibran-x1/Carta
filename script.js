// read custom message from query strings
// Tutorial -> https://youtu.be/6ojp1iWUKw8

const urlSearchParams = new URLSearchParams(window.location.search);
const messageCustom = urlSearchParams.get('message');

if (messageCustom) {
  const mainMessageElement = document.querySelector('#mainMessage');
  mainMessageElement.textContent = decodeURI(messageCustom);
}

// the tutorial starts here

const btnOpenElement = document.querySelector('#open');
const btnCloseElement = document.querySelector('#close');
const btnYesElement = document.querySelector('#yes');
const btnNoElement = document.querySelector('#no');
const topMessageElement = document.querySelector('#topMessage');
const sadFacesContainer = document.querySelector('#sadFacesContainer');

btnCloseElement.disabled = true;

let sadFacesCount = 0;
let gifContainers = []; // Array para almacenar los contenedores de GIFs generados

btnOpenElement.addEventListener('click', () => {
  btnOpenElement.disabled = true;
  btnCloseElement.disabled = false;
  const coverElement = document.querySelector('.cover');
  coverElement.classList.add('open-cover');

  setTimeout(() => {
    coverElement.style.zIndex = -1;

    const paperElement = document.querySelector('.paper');
    paperElement.classList.remove('close-paper');
    paperElement.classList.add('open-paper');

    // animacion del corazón
    const heartElement = document.querySelector('.heart');
    heartElement.style.display = 'block';

  }, 500);
});

btnCloseElement.addEventListener('click', () => {
  btnOpenElement.disabled = false;
  btnCloseElement.disabled = true;

  const coverElement = document.querySelector('.cover');
  const paperElement = document.querySelector('.paper');
  paperElement.classList.remove('open-paper');
  paperElement.classList.add('close-paper');

  setTimeout(() => {
    coverElement.style.zIndex = 0;
    coverElement.classList.remove('open-cover');

    // animacion del corazón
    const heartElement = document.querySelector('.heart');
    heartElement.style.display = 'none';
  }, 500);
});

btnYesElement.addEventListener('click', () => {
  // Eliminar el texto y las caritas tristes generadas por el botón "No"
  removeTextAndSadFaces();

  const gifContainer = createGifContainer();
  positionAndDisplayGif(gifContainer);

  // Reproducir música
  playMusic('yupii.mp3');
});

btnNoElement.addEventListener('click', () => {
  // Eliminar todos los GIFs generados por el botón "Sí"
  removeGifs();

  topMessageElement.classList.remove('hidden');
  topMessageElement.style.display = 'block';
  sadFacesContainer.classList.remove('hidden');
  sadFacesContainer.style.display = 'block';
  sadFacesCount++;
  updateSadFacesCount(sadFacesCount);

  // Reproducir sonido
  playMusic('oo.mp3');
});

function removeGifs() {
  gifContainers.forEach(container => container.remove());
  gifContainers = []; // Limpiar el array de contenedores de GIFs
}

function removeTextAndSadFaces() {
  topMessageElement.style.display = 'none';
  sadFacesContainer.style.display = 'none';
  sadFacesContainer.textContent = '';
  sadFacesCount = 0;
}

function createGifContainer() {
  const gifContainer = document.createElement('div');
  gifContainer.className = 'gif-container'; // Utilizamos una clase para aplicar estilos más fácilmente

  const gifImage = document.createElement('img');
  gifImage.src = 'jumping-gatito.gif';
  gifImage.alt = 'Gif';
  gifContainer.appendChild(gifImage);

  return gifContainer;
}

function positionAndDisplayGif(gifContainer) {
  // Calcular posición aleatoria evitando áreas cercanas a los botones "No" y "Sí"
  const rectNo = btnNoElement.getBoundingClientRect();
  const rectYes = btnYesElement.getBoundingClientRect();

  let randomX, randomY;
  do {
    randomX = Math.random() * (window.innerWidth - 200) + 100; // Asegurar que no esté cerca de los bordes
    randomY = Math.random() * (window.innerHeight - 200) + 100; // Asegurar que no esté cerca de los bordes
  } while (
    // Evitar áreas cercanas al botón "No" y "Sí"
    (randomX >= rectNo.left - 50 && randomX <= rectNo.right + 50 && randomY >= rectNo.top - 50 && randomY <= rectNo.bottom + 50) ||
    (randomX >= rectYes.left - 50 && randomX <= rectYes.right + 50 && randomY >= rectYes.top - 50 && randomY <= rectYes.bottom + 50)
  );

  // Aplicar estilos aleatorios
  const randomRotation = Math.random() * 360; // Rotación aleatoria entre 0 y 360 grados
  const randomScale = Math.random() * 1.5 + 0.5; // Escala aleatoria entre 0.5 y 2

  gifContainer.style.position = 'absolute';
  gifContainer.style.left = `${randomX}px`;
  gifContainer.style.top = `${randomY}px`;
  gifContainer.style.transform = `rotate(${randomRotation}deg) scale(${randomScale})`;

  document.body.appendChild(gifContainer);
  gifContainers.push(gifContainer); // Agregar el contenedor al array
}

function updateSadFacesCount(count) {
  let sadFaces = '';
  for (let i = 0; i < count; i++) {
    sadFaces += ' ☹️';
  }
  sadFacesContainer.textContent = sadFaces;
}

function playMusic(file) {
  const audio = new Audio(file);
  audio.play();
}
