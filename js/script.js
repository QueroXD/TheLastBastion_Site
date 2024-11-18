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
