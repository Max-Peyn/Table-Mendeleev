let selected = document.querySelector(".selected-elem");
let elements = document.querySelectorAll(".element");

elements.forEach(element => {
    element.onclick = () => {
        selected.innerHTML = "";
        let cloneElement = element.cloneNode(true);
        cloneElement.className = element.className;
        let computedStyle = window.getComputedStyle(element);
        let baseColor = computedStyle.backgroundColor;
        let lightColor = lightenColor(baseColor, 40);
        cloneElement.style.background = `radial-gradient(circle at center, ${lightColor}, ${baseColor})`;
        cloneElement.style.color = computedStyle.color;
        cloneElement.style.border = 'none';
        cloneElement.style.boxShadow = computedStyle.boxShadow;
        selected.appendChild(cloneElement);
    }
});
function lightenColor(rgb, percent) {
    const match = rgb.match(/\d+/g);
    if (!match) return rgb;
    const [r, g, b] = match.map(Number);
    const lighten = (channel) => Math.min(255, Math.floor(channel + (255 - channel) * (percent / 100)));
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
function rundom(){
    
}


function randomColor() {
    let colors = [
        '#ef6191', 
        '#ea5044',
        '#f48325',
        '#fcde4c',
        '#5fc778',
        '#20a786',
        '#4896d4',
        '#8f65a4',
        '#98bfe6',
        '#50edb8'
    ]
    let hex = Math.floor(Math.random()*colors.length);
    let result = colors[hex];
    return result
}
function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function regenerateStars(){
    stars = [];
    x = 15;
    for (let i = 0; i < x; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: randomInteger(3, 7),
            vx: Math.random() * 10 - 5,
            vy: Math.random() * 10 - 5,
            color: randomColor(),
        });
    }
}

let stars = [];
let fps = 5;
// let x = canvas.width;
regenerateStars()

// for (let i = 0; i < x; i++) {
//     stars.push({
//         x: Math.random() * canvas.width,
//         y: Math.random() * canvas.height,
//         radius: Math.random(),
//         vx: Math.random() * 10 - 5,
//         vy: Math.random() * 10 - 5,
//     });
// }

function createFireFly(posX, posY, radius, color) {
    ctx.beginPath();
    ctx.fillStyle = `${color}`;
    ctx.filter = `blur(${radius}px)`;
    ctx.arc(posX, posY, radius*2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.filter = `blur(${radius/5}px)`;
    ctx.fillStyle = 'white';
    ctx.arc(posX, posY, radius, 0, Math.PI * 2);
    ctx.fill();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation="lighter"
    let blur = 100;
    for (let i = 0; i<stars.length; i++) {
        let star = stars[i];
        // ctx.fillStyle = star.color;
        // ctx.beginPath();
        // ctx.filter = `blur(${star.radius}px)`;
        // ctx.arc(star.x, star.y, star.radius*2, 0, Math.PI * 2);
        // ctx.fill();
        // ctx.beginPath();
        // ctx.filter = `blur(${star.radius/5}px)`;
        // ctx.fillStyle = 'white';
        // ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        // ctx.fill();
        createFireFly(star.x, star.y, star.radius, star.color)
        
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
/*
let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let centerPointX = canvas.width / 2;
let centerPointY = canvas.height / 2;

function createFireFly(posX, posY, radius, color, blur) {
    ctx.beginPath();
    ctx.fillStyle = `${color}`;
    ctx.filter = `blur(${blur}px)`;
    ctx.arc(posX, posY, radius*2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.filter = `blur(${blur/5}px)`;
    ctx.fillStyle = 'white';
    ctx.arc(posX, posY, radius, 0, Math.PI * 2);
    ctx.fill();
}
// createFireFly(centerPointX, centerPointY, 10, 'yellow', 10)
createFireFly(100, 70, 15, 'yellow', 15)
createFireFly(210, 120, 7, 'yellow', 7)
createFireFly(150, 170, 10, 'yellow', 10)
*/
