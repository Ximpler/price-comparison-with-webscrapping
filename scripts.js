
const itemsPerPage = 5;
let currentPage = 1;
let products = [];
function paginateProducts(products, page = 1) {
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return products.slice(start, end);
}

function renderPagination(totalItems, itemsPerPage, currentPage) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement('button');
    button.textContent = i;
    button.className = i === currentPage ? 'active' : '';
    button.onclick = () => {
      handleSectionClick('todo', i);
    };
    pagination.appendChild(button);
  }
}
function toggleSearchBar() {
  const searchBarContainer = document.getElementById('search-bar-container');
  if (searchBarContainer.style.display === 'none' || searchBarContainer.style.display === '') {
    searchBarContainer.style.display = 'block';
  } else {
    searchBarContainer.style.display = 'none';
  }
}
function handleSectionClick(web, page = 1) {
  const section = document.getElementById('product-section');
  section.innerHTML = '';

  let filteredProducts;
  if (web === 'todo') {
    filteredProducts = products;
  } else {
    filteredProducts = products.filter(product => product.web === web);
  }

  const paginatedProducts = web === 'todo' ? paginateProducts(filteredProducts, page) : filteredProducts;
  paginatedProducts.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.onclick = () => handleProductClick(product);

    const productImage = document.createElement('img');
    productImage.className = 'product-image';
    productImage.src = product.img || 'default-image.png';
    productImage.alt = product.name;

    const productTitle = document.createElement('span');
    productTitle.className = 'product-title';
    productTitle.textContent = product.name;

    const productPrice = document.createElement('span');
    productPrice.className = 'product-price';
    productPrice.textContent = product.sellingPrice;

    const productLink = document.createElement('a');
    productLink.className = 'product-link';
    productLink.href = product.url;
    productLink.textContent = 'Buy Now';

    productCard.appendChild(productImage);
    productCard.appendChild(productTitle);
    productCard.appendChild(document.createElement('br'));
    productCard.appendChild(productPrice);
    productCard.appendChild(document.createElement('br'));
    productCard.appendChild(productLink);
    section.appendChild(productCard);
  });

  if (web === 'todo') {
    renderPagination(filteredProducts.length, itemsPerPage, page);
  } else {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = ''; // Clear pagination if not in 'todo' section
  }

  document.querySelectorAll('.section-button').forEach(button => {
    button.classList.remove('selected');
  });
  document.querySelector(`.section-button[onclick="handleSectionClick('${web}')"]`).classList.add('selected');
}

function handleProductClick(product) {
  const popupOverlay = document.getElementById('popup-overlay');
  const popupImage = document.getElementById('popup-image');
  const popupTitle = document.getElementById('popup-title');
  const popupDescription = document.getElementById('popup-description');
  const popupPrice = document.getElementById('popup-price');
  const popupLink = document.getElementById('popup-link');

  popupImage.src = product.img || 'default-image.png';
  popupTitle.textContent = product.name;
  popupDescription.textContent = product.description !== 'NA' ? product.description : 'No description available';
  popupPrice.textContent = product.sellingPrice;
  popupLink.href = product.url;

  popupOverlay.style.display = 'flex';
}

function setIsPopupOpen(isOpen) {
  const popupOverlay = document.getElementById('popup-overlay');
  popupOverlay.style.display = isOpen ? 'flex' : 'none';
}

async function searchProducts() {
  const query = document.getElementById('search-input').value;
  if (!query) return;

  const response = await fetch(`http://localhost:3000/search?q=${query}`);
  const products = await response.json();
  console.log("recibido")
  handleSectionClick('todo', 1);  // Load the 'todo' section with new products
}
document.addEventListener('DOMContentLoaded', () => {
  handleSectionClick('exito');
});


