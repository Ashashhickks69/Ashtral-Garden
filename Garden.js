const garden = document.getElementById("garden");
const ToggleButton = document.getElementById("Hide")

function HideFlowers(Hidden) {
  garden.hidden = ToggleButton.checked
}

document.addEventListener("click", (e) => {
  if (!ToggleButton.checked) {
  const rect = garden.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const seed = document.createElement("div");
  seed.className = "seed";
  seed.style.left = x + "px";
  seed.style.top = "0px";
  garden.appendChild(seed);

  // Drop animation
  let pos = 0;
  const drop = setInterval(() => {
    if (pos >= rect.height - 12) {
      clearInterval(drop);
      seed.remove();

      // Grow plant
      const plant = document.createElement("div");
      plant.className = "plant";
      plant.style.left = (x - 3) + "px";

      // random height 2–6
      const heightScale = Math.random() * 4 + 2;
      plant.style.setProperty("--height-scale", heightScale);

      // random green shade
      const green = `hsl(${Math.random() * 40 + 100}, 60%, 35%)`;
      plant.style.background = green;

      garden.appendChild(plant);

      // random flower
      if (Math.random() > 0.4) {
        const flower = document.createElement("div");
        flower.className = "flower";

        // random color
        const colors = ["pink", "violet", "yellow", "white", "orange"];
        flower.style.background = colors[Math.floor(Math.random() * colors.length)];

        // random size
        const Size = Math.random() * 8 + 10;  // 10–18px
        flower.style.width = Size*2 + "px";
        flower.style.height = Size/2 + "px";

        plant.appendChild(flower);
      }
    } else {
      pos += 4;
      seed.style.top = pos + "px";
    }
  }, 20);
}
});
