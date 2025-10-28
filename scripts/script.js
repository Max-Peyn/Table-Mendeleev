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
