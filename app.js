const isAdmin = window.location.search.includes("admin=true");

const editButton = document.querySelector(".edit-btn");
const editorPanel = document.getElementById("editorPanel");
const priceEditor = document.getElementById("priceEditor");

if (!isAdmin && editButton) {
  editButton.style.display = "none";
}

let savedMenu = JSON.parse(localStorage.getItem("kuboMenuData")) || {};

function getItems() {
  return document.querySelectorAll(".item");
}

function renderMenu() {
  const items = getItems();

  items.forEach((item, index) => {
    const originalName = item.dataset.name || `item-${index}`;
    const span = item.querySelector("span");

    const precioHTML = span ? span.textContent.trim() : "$ ______";
    const saved = savedMenu[originalName];

    const nombreFinal = saved?.nombre || item.childNodes[0].textContent.trim() || originalName;
    const precioGuardado = saved?.precio;

    const precioFinal =
      precioGuardado && precioGuardado !== "$" && precioGuardado !== "$ ______"
        ? precioGuardado
        : precioHTML;

    item.innerHTML = `${nombreFinal} <span>${precioFinal}</span>`;
  });
}

function openEditor() {
  priceEditor.innerHTML = "";

  const items = getItems();

  items.forEach((item, index) => {
    const originalName = item.dataset.name || `item-${index}`;
    const saved = savedMenu[originalName] || {};
    const span = item.querySelector("span");

    const nombreActual = item.childNodes[0].textContent.trim();
    const precioActual = span ? span.textContent.trim() : "";

    priceEditor.innerHTML += `
      <div class="edit-group">
        <label>Producto</label>
        <input 
          type="text" 
          value="${saved.nombre || nombreActual || originalName}" 
          data-original="${originalName}" 
          data-type="nombre"
        >

        <label>Precio</label>
        <input 
          type="text" 
          value="${saved.precio || precioActual}" 
          data-original="${originalName}" 
          data-type="precio"
          placeholder="$ ______"
        >
      </div>
    `;
  });

  editorPanel.classList.add("show");
  editorPanel.style.display = "block";
}

function closeEditor() {
  editorPanel.classList.remove("show");
  editorPanel.style.display = "none";
}

function savePrices() {
  const inputs = priceEditor.querySelectorAll("input");

  inputs.forEach(input => {
    const originalName = input.dataset.original;
    const type = input.dataset.type;

    if (!savedMenu[originalName]) {
      savedMenu[originalName] = {};
    }

    savedMenu[originalName][type] = input.value.trim();
  });

  localStorage.setItem("kuboMenuData", JSON.stringify(savedMenu));

  renderMenu();
  closeEditor();
}

renderMenu();