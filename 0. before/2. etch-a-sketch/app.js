const paint = document.getElementById("paint");

const size = document.getElementById("size");
const range = document.getElementById("range");
const colorEl = document.getElementById("color");
const eraser = document.getElementById("eraser");
const clear = document.getElementById("clear");

let color = "#fff";
// let isPainting = false;

// paint.addEventListener("mousedown", () => {
//   isPainting = true;
// });

// paint.addEventListener("mouseup", () => {
//   isPainting = false;
// });

range.addEventListener("change", () => {
  size.innerHTML = `${range.value}x${range.value}`;
  paint.style.gridTemplateRows = `repeat(${range.value}, 1fr)`;
  paint.style.gridTemplateColumns = `repeat(${range.value}, 1fr)`;

  generateBlocks();
});

function generateBlocks() {
  for (let i = 0; i < range.value * range.value; i++) {
    const blocks = document.createElement("div");
    blocks.classList.add("blocks");

    // if (isPainting) {
    blocks.addEventListener("mouseover", paintColor);
    blocks.addEventListener("mousedown", paintColor);
    // }

    paint.appendChild(blocks);
  }
}

function paintColor(e) {
  e.target.style.backgroundColor = color;
}

colorEl.oninput = (e) => {
  color = e.target.value;
};

eraser.addEventListener("click", () => {
  color = "#464d57";
});

clear.addEventListener("click", () => {
  const blocks = document.querySelectorAll(".blocks");
  blocks.forEach((block) => {
    block.style.backgroundColor = "#464d57";
  });
});

window.onload = () => {
  generateBlocks();
};
