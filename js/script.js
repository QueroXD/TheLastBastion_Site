// Reloj
function updateClock() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = now.toLocaleDateString('en-GB', options);
    const time = now.toLocaleTimeString('en-GB');
    document.getElementById('clock').innerText = `${formattedDate} | ${time}`;
}
setInterval(updateClock, 1000);
updateClock();

// Partículas de nieve
const canvas = document.getElementById('snow');
const ctx = canvas.getContext('2d');

let snowflakes = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function createSnowflakes() {
    for (let i = 0; i < 100; i++) {
        snowflakes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            opacity: Math.random(),
            speedX: Math.random() * 2 - 1,
            speedY: Math.random() * 3 + 1,
            radius: Math.random() * 3 + 1
        });
    }
}

function drawSnowflakes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snowflakes.forEach(snowflake => {
        ctx.beginPath();
        ctx.arc(snowflake.x, snowflake.y, snowflake.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${snowflake.opacity})`;
        ctx.fill();
    });
}

function updateSnowflakes() {
    snowflakes.forEach(snowflake => {
        snowflake.x += snowflake.speedX;
        snowflake.y += snowflake.speedY;

        if (snowflake.y > canvas.height) {
            snowflake.y = 0;
            snowflake.x = Math.random() * canvas.width;
        }
    });
}

function animateSnow() {
    drawSnowflakes();
    updateSnowflakes();
    requestAnimationFrame(animateSnow);
}

resizeCanvas();
createSnowflakes();
animateSnow();

window.addEventListener('resize', () => {
    resizeCanvas();
    snowflakes = [];
    createSnowflakes();
});

// Paginado
// Variables de estado
let loreCurrentPage = 1;

// Selección de elementos específicos
const loreContentDiv = document.getElementById('lore-content');
const lorePrevButton = document.getElementById('lore-prev');
const loreNextButton = document.getElementById('lore-next');
const lorePageNumberSpan = document.getElementById('lore-page-number');

// Función para cargar contenido de una página
function loadLorePage(page) {
  fetch(`./Notes/${page}.txt`) // Ruta ajustada a ./Notes
    .then(response => {
      if (!response.ok) {
        throw new Error(`Página ${page} no encontrada`);
      }
      return response.text();
    })
    .then(data => {
      loreContentDiv.textContent = data;
      loreCurrentPage = page;
      lorePageNumberSpan.textContent = `Página ${loreCurrentPage}`;
      updateLoreButtons();
    })
    .catch(error => {
      loreContentDiv.textContent = 'No se puede cargar el contenido.';
      console.error(error);
    });
}

// Función para actualizar el estado de los botones
function updateLoreButtons() {
  lorePrevButton.disabled = loreCurrentPage === 1;
  loreNextButton.disabled = false; // Por defecto habilitamos el botón "Siguiente"

  // Verificar si la próxima página existe
  fetch(`./Notes/${loreCurrentPage + 1}.txt`) // Ruta ajustada a ./Notes
    .then(response => {
      loreNextButton.disabled = !response.ok;
    })
    .catch(() => {
      loreNextButton.disabled = true;
    });
}

// Eventos de los botones
lorePrevButton.addEventListener('click', () => {
  if (loreCurrentPage > 1) {
    loadLorePage(loreCurrentPage - 1);
  }
});

loreNextButton.addEventListener('click', () => {
  loadLorePage(loreCurrentPage + 1);
});

// Cargar la primera página al iniciar
loadLorePage(1);
