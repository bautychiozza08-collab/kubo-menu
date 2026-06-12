const isAdmin = window.location.search.includes("admin=true");

const editButton = document.querySelector(".edit-btn");
const items = document.querySelectorAll(".item");
const editorPanel = document.getElementById("editorPanel");
const priceEditor = document.getElementById("priceEditor");

if (!isAdmin && editButton) {
  editButton.style.display = "none";
}

let savedMenu = JSON.parse(localStorage.getItem("kuboMenuData")) || {};

function renderMenu() {
  items.forEach(item => {
    const originalName = item.dataset.name;
    const span = item.querySelector("span");

    const saved = savedMenu[originalName];

    if (saved?.nombre) {
      item.childNodes[0].textContent = saved.nombre + " ";
    }

    span.textContent = saved?.precio || "$ ______";
  });
}

function openEditor() {
  priceEditor.innerHTML = "";

  items.forEach(item => {
    const originalName = item.dataset.name;
    const saved = savedMenu[originalName] || {};

    priceEditor.innerHTML += `
      <label>
        Producto
        <input type="text" value="${saved.nombre || originalName}" data-original="${originalName}" data-type="nombre">
      </label>

      <label>
        Precio
        <input type="text" value="${saved.precio || ""}" data-original="${originalName}" data-type="precio">
      </label>

      <hr>
    `;
  });

  editorPanel.classList.add("show");
}

function closeEditor() {
  editorPanel.classList.remove("show");
}

function savePrices() {
  const inputs = priceEditor.querySelectorAll("input");

  inputs.forEach(input => {
    const originalName = input.dataset.original;
    const type = input.dataset.type;

    if (!savedMenu[originalName]) {
      savedMenu[originalName] = {};
    }

    savedMenu[originalName][type] = input.value;
  });

  localStorage.setItem("kuboMenuData", JSON.stringify(savedMenu));

  renderMenu();
  closeEditor();
}

renderMenu();