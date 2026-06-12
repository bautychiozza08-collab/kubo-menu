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
  items.forEach((item, index) => {
    const originalName = item.dataset.name || `item-${index}`;
    const span = item.querySelector("span");
    const saved = savedMenu[originalName];

    const nombreFinal = saved?.nombre || originalName;
    const precioFinal = saved?.precio || "$ ______";

    item.innerHTML = `${nombreFinal} <span>${precioFinal}</span>`;
  });
}

function openEditor() {
  priceEditor.innerHTML = "";

  items.forEach((item, index) => {
    const originalName = item.dataset.name || `item-${index}`;
    const saved = savedMenu[originalName] || {};

    priceEditor.innerHTML += `
      <div class="edit-group">
        <label>Producto</label>
        <input 
          type="text" 
          value="${saved.nombre || originalName}" 
          data-original="${originalName}" 
          data-type="nombre"
        >

        <label>Precio</label>
        <input 
          type="text" 
          value="${saved.precio || ""}" 
          data-original="${originalName}" 
          data-type="precio"
          placeholder="$ ______"
        >
      </div>
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