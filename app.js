const items = document.querySelectorAll(".item");
const editorPanel = document.getElementById("editorPanel");
const priceEditor = document.getElementById("priceEditor");

const isAdmin = window.location.search.includes("admin=true");

const editButton = document.querySelector(".edit-btn");

if (!isAdmin && editButton) {
  editButton.style.display = "none";
}

let prices = JSON.parse(localStorage.getItem("kuboPrices")) || {};

function renderPrices() {
  items.forEach(item => {
    const name = item.dataset.name;
    const span = item.querySelector("span");

    span.textContent = prices[name] || "$ ______";
  });
}

function openEditor() {
  priceEditor.innerHTML = "";

  items.forEach(item => {
    const name = item.dataset.name;

    priceEditor.innerHTML += `
      <label>
        ${name}
        <input type="text" value="${prices[name] || ""}" data-name="${name}">
      </label>
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
    prices[input.dataset.name] = input.value;
  });

  localStorage.setItem("kuboPrices", JSON.stringify(prices));

  renderPrices();
  closeEditor();
}

renderPrices();