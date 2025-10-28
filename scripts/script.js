let selected = document.querySelector(".selected-elem");
let elements = document.querySelectorAll(".element");

elements.forEach(element => {
    element.onclick = () => {
        selected.innerHTML = "";
        let cloneElement = element.cloneNode(true);
        let computedStyle = window.getComputedStyle(element);
        let baseColor = computedStyle.backgroundColor;
        let lightColor = lightenColor(baseColor, 80);
        cloneElement.style.background = `radial-gradient(circle at center, ${lightColor}, ${baseColor})`;
        cloneElement.style.boxShadow = `0 0 60px 20px ${lightColor}`;
        cloneElement.style.border = "none";
        selected.appendChild(cloneElement);
    };
});

function lightenColor(rgb, percent) {
    const match = rgb.match(/\d+/g);
    if (!match) return rgb;
    const [r, g, b] = match.map(Number);
    const lighten = c => Math.min(255, Math.floor(c + (255 - c) * (percent / 100)));
    return `rgb(${lighten(r)}, ${lighten(g)}, ${lighten(b)})`;
}

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function debounce (func, wait) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), wait);
    }
}

const debounceResize = debounce(()=>{
    regenerateStars()
}, 600)


window.addEventListener('resize', ()=>{
    debounceResize()
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
function randomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r},${g},${b},0.6)`;
}

function regenerateStars(){
    stars = [];
    x = 15;
    for (let i = 0; i < x; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random()*10,
            vx: Math.random() * 10 - 5,
            vy: Math.random() * 10 - 5,
            color: randomColor(),
        });
    }
}

let stars = [];
let fps = 165;
let x = canvas.width;
regenerateStars()

for (let i = 0; i < x; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random(),
        vx: Math.random() * 10 - 5,
        vy: Math.random() * 10 - 5,
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation="lighter"
    let blur = 100;
    for (let i = 0; i<stars.length; i++) {
        let star = stars[i];
        ctx.fillStyle = star.color;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius*2, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.filter = `blur(${star.radius}px)`;
        ctx.fillStyle = star.color;
        ctx.arc(star.x, star.y, star.radius*2, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = star.color;
        ctx.filter = `blur(${blur}px)`;
        ctx.arc(star.x, star.y, star.radius*2, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.filter = `blur(${blur/5}px)`;
        ctx.fillStyle = star.color;
        ctx.arc(star.x, star.y, star.radius*2, 0, Math.PI * 2);
        ctx.fill();
    }
}


function update() {
    for (let i = 0; i<stars.length; i++) {
        let s = stars[i];
        s.x += s.vx / fps;
        s.y += s.vy / fps;
        if (s.x >= canvas.width || s.x <= 0) {
            s.vx = -s.vx;
        }
        if (s.y >= canvas.height || s.y <= 0) {
            s.vy = -s.vy;
        }
    }
}


function tick() {
    update();
    draw();
    requestAnimationFrame(tick);
}

tick();
