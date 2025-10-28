let selected = document.querySelector(".selected-elem");
let elements = document.querySelectorAll(".element");

elements.forEach(element => {
    element.onclick = () => {
        selected.innerHTML = "";

        let cloneElement = element.cloneNode(true);
        cloneElement.className = element.className;

        // Копіюємо стилі
        let computedStyle = window.getComputedStyle(element);
        let baseColor = computedStyle.backgroundColor;

        // Створюємо світліший колір
        let lightColor = lightenColor(baseColor, 40); // змінює яскравість на +40

        // Задаємо радіальний градієнт
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
