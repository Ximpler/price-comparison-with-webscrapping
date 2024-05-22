
  
  function handleSectionClick(web) {
    const section = document.getElementById('product-section');
    section.innerHTML = '';
  
    const filteredProducts = products.filter(product => product.web === web);
    filteredProducts.forEach(product => {
      const productCard = document.createElement('div');
      productCard.className = 'product-card';
      productCard.onclick = () => handleProductClick(product);
  
      const productImage = document.createElement('img');
      productImage.className = 'product-image';
      productImage.src = product.img || 'default-image.png'; // Usar imagen por defecto si no hay imagen
      productImage.alt = product.name;
  
      const productTitle = document.createElement('span');
      productTitle.className = 'product-title';
      productTitle.textContent = product.name;
  
      productCard.appendChild(productImage);
      productCard.appendChild(productTitle);
      section.appendChild(productCard);
    });
  
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
  
    popupImage.src = product.img || 'default-image.png';
    popupTitle.textContent = product.name;
    popupDescription.textContent = product.description !== 'NA' ? product.description : 'No description available';
  
    popupOverlay.style.display = 'flex';
  }
  
  function setIsPopupOpen(isOpen) {
    const popupOverlay = document.getElementById('popup-overlay');
    popupOverlay.style.display = isOpen ? 'flex' : 'none';
  }
  
  // Cargar la primera sección por defecto al cargar la página
  document.addEventListener('DOMContentLoaded', () => {
    handleSectionClick('exito');
  });
  
const products= [
    {
      name: 'iPhone 15 de128Gb Rosa',
      sellingPrice: '$ 5.179.900',
      url: 'https://www.olimpica.com/iphone-15-de128gb-rosa-1002326648/p',
      img: 'https://olimpica.vtexassets.com/arquivos/ids/1237643-300-300?v=638361937907130000&width=300&height=300&aspect=true',
      description: 'NA',
      web: 'olimpica'
    },
    {
      name: 'iPhone 15 256GB Azul',
      sellingPrice: '$ 5.599.000',
      url: 'https://www.olimpica.com/iphone-15-256gb--azul-1002320758/p?skuId=1100067165',
      img: 'https://olimpica.vtexassets.com/arquivos/ids/1168230-300-300?v=638331511898400000&width=300&height=300&aspect=true',
      description: 'NA',
      web: 'olimpica'
    },
    {
      name: 'iPhone 15 256GB- Negro',
      sellingPrice: '$ 5.599.000',
      url: 'https://www.olimpica.com/iphone-15-256gb--negro-1002326778/p?skuId=1100080661',
      img: 'https://olimpica.vtexassets.com/arquivos/ids/1238371-300-300?v=638363486354500000&width=300&height=300&aspect=true',
      description: 'NA',
      web: 'olimpica'
    },
    {
      name: 'iPhone 15 de 128GB 5G | 6GB RAM | Pantalla 6.1 pulgadas | Chip A16 Bionic | Carga Tipo C | Dynamic Island | Cámara 48MP',
      sellingPrice: '$  3.999.900',
      url: 'https://www.falabella.com.co/falabella-co/product/prod13430667/iPhone-15-de-128GB-5G-6GB-RAM-Pantalla-6.1-pulgadas-Chip-A16-Bionic-Carga-Tipo-C-Dynamic-Island-Camara-48MP/72752108',
      img: null,
      description: 'NA',
      web: 'falabella'
    },
    {
      name: 'iPhone 15 de 256GB 5G | 6GB RAM | Pantalla 6.1 pulgadas | Chip A16 Bionic | Carga Tipo C | Dynamic Island | Cámara 48MP',
      sellingPrice: '$  4.499.900',
      url: 'https://www.falabella.com.co/falabella-co/product/prod13430668/iPhone-15-de-256GB-5G-6GB-RAM-Pantalla-6.1-pulgadas-Chip-A16-Bionic-Carga-Tipo-C-Dynamic-Island-Camara-48MP/72752113',
      img: null,
      description: 'NA',
      web: 'falabella'
    },
    {
      name: 'iPhone 15 Plus de 256GB 5G | 6GB RAM | Pantalla 6.7 pulgadas | Chip A16 Bionic | Carga Tipo C | Dynamic Island | Cámara 48MP',
      sellingPrice: '$  5.179.900',
      url: 'https://www.falabella.com.co/falabella-co/product/prod13430670/iPhone-15-Plus-de-256GB-5G-6GB-RAM-Pantalla-6.7-pulgadas-Chip-A16-Bionic-Carga-Tipo-C-Dynamic-Island-Camara-48MP/72752123',
      img: null,
      description: 'NA',
      web: 'falabella'
    },
    {
      name: 'iPhone 15 Plus 128 GB 5G Azul',
      sellingPrice: '$4.719.010',
      url: 'https://www.alkosto.com/iphone-15-plus-128gb-5g-azul/p/195949041129',
      img: 'https://www.alkosto.com//medias/195949041129-001-750Wx750H?context=bWFzdGVyfGltYWdlc3wxMTY1OHxpbWFnZS93ZWJwfGFHUXhMMmhtTlM4eE5ETTFOak0yTVRjd056VTFNQzh4T1RVNU5Ea3dOREV4TWpsZk1EQXhYemMxTUZkNE56VXdTQXxjYTNkYzU4NjY1NGNkZjE4MGM1MTVjOTU4MjA2NzFiMDA3MTc2YWYxYzU2NTMzNzQwNTA4ZDM1MjljYThjNjY5',   
      description: [
        'Resolucion Camara Posterior 1: 48 Mpx',
        'Memoria Interna: 128 GB',
        'Memoria RAM: 6 GB',
        'Capacidad de la Bateria: 4912 mAh'
      ],
      web: 'alkosto'
    },
    {
      name: 'iPhone 15 Pro 128 GB Titanio Natural',
      sellingPrice: '$5.399.010',
      url: 'https://www.alkosto.com/iphone15-pro-128gb-titanio-natural/p/195949018787',
      img: 'https://www.alkosto.com//medias/195949018787-001-750Wx750H?context=bWFzdGVyfGltYWdlc3wyNTY5NnxpbWFnZS93ZWJwfGFEZzFMMmhpTUM4eE5ETTFOakl5TmpZek56ZzFOQzh4T1RVNU5Ea3dNVGczT0RkZk1EQXhYemMxTUZkNE56VXdTQXwyMDg4ODlmOWRhNGE1YmM3NzI1ZjRmYjQ2ZjBhOWU1NWVkNjVmZGZhZDBjYjBlNmU4NDNmYWQ0Y2YyYzQyNDQ2',   
      description: [
        'Resolucion Camara Posterior 1: 48 Mpx',
        'Memoria Interna: 128 GB',
        'Memoria RAM: 8 GB',
        'Capacidad de la Bateria: 3650 mAh'
      ],
      web: 'alkosto'
    },
    {
      name: 'iPhone 15 Pro Max 256 GB  5G Titanio Blanco',
      sellingPrice: '$6.579.010',
      url: 'https://www.alkosto.com/iphone15-promax-256gb-5g-titanio-blanco/p/195949048289',
      img: 'https://www.alkosto.com//medias/195949048289-001-750Wx750H?context=bWFzdGVyfGltYWdlc3wzMjIyNnxpbWFnZS93ZWJwfGFEQmhMMmcxTVM4eE5ETTFOakUwTkRVNE5qYzRNaTh4T1RVNU5Ea3dORGd5T0RsZk1EQXhYemMxTUZkNE56VXdTQXwzNjA4OWJjY2Y5YTNiZjk0M2ZkYzU0MTY4M2YyODI4MGMwN2Q3NzhiZmU1NWE0ZDVlNWJkZmI4MDc5YTdmZjE4',   
      description: [
        'Resolucion Camara Posterior 1: 48 Mpx',
        'Memoria Interna: 256 GB',
        'Memoria RAM: 8 GB',
        'Capacidad de la Bateria: 4852 mAh'
      ],
      web: 'alkosto'
    },
    {
      name: 'Apple iPhone 15 (128 GB) - Azul',
      sellingPrice: '3.159.900',
      url: 'https://www.mercadolibre.com.co/apple-iphone-15-128-gb-azul/p/MCO27172667?pdp_filters=category:MCO1055#searchVariation=MCO27172667&position=4&search_layout=stack&type=product&tracking_id=b88a7488-7ec4-431b-85b4-9a7ad79b8fbd',
      img: 'https://http2.mlstatic.com/D_NQ_NP_759471-MLA71782897602_092023-V.webp',
      description: 'Disponible en 5 colores',
      web: 'mercado'
    },
    {
      name: 'Apple iPhone 15 Pro (128 GB) - Titanio Azul',
      sellingPrice: '4.049.900',
      url: 'https://www.mercadolibre.com.co/apple-iphone-15-pro-128-gb-titanio-azul/p/MCO27172709?pdp_filters=category:MCO1055#searchVariation=MCO27172709&position=2&search_layout=stack&type=product&tracking_id=b88a7488-7ec4-431b-85b4-9a7ad79b8fbd',
      img: 'https://http2.mlstatic.com/D_NQ_NP_918178-MLA71783088444_092023-V.webp',
      description: 'Disponible en 4 colores',
      web: 'mercado'
    },
    {
      name: 'Apple iPhone 15 Pro (256 GB) - Titanio Natural',
      sellingPrice: '4.320.000',
      url: 'https://www.mercadolibre.com.co/apple-iphone-15-pro-256-gb-titanio-natural/p/MCO27172703?pdp_filters=category:MCO1055#searchVariation=MCO27172703&position=5&search_layout=stack&type=product&tracking_id=b88a7488-7ec4-431b-85b4-9a7ad79b8fbd',
      img: 'https://http2.mlstatic.com/D_NQ_NP_878826-MLA71783168396_092023-V.webp',
      description: 'Disponible en 4 colores',
      web: 'mercado'
    },
    {
      name: 'iPhone 15 Pro Max 256 GB Titanio Blanco',
      sellingPrice: '$ 4.839.898',
      url: 'https://www.exito.com/apple-iphone-15-pro-max-256-gb-titanio-blanco-cable-de-carga-usbc-1-m-3139832/p',
      img: 'https://d3ez54m90carx6.cloudfront.net/Banderin_Red_5G.png',
      description: 'NA',
      web: 'exito'
    },
    {
      name: 'Iphone 15 Pro Max 256Gb Titanio Natural Esim',
      sellingPrice: '$ 4.849.900',
      url: 'https://www.exito.com/iphone-15-pro-max-256-gb-titanio-natural-nuevo-102853977/p',
      img: 'https://exitocol.vtexassets.com/arquivos/ids/22538051/iphone-15-pro-max-256gb-titanio-natural-esim.jpg?v=638488243867070000',
      description: 'NA',
      web: 'exito'
    },
    {
      name: 'iPhone 15 Pro Max 256 GB Titanio Blanco Nuevo',
      sellingPrice: '$ 4.998.988',
      url: 'https://www.exito.com/iphone-15-pro-max-256-gb-titanio-blanco-nuevo-102853983/p',
      img: 'https://exitocol.vtexassets.com/arquivos/ids/21137391/iphone-15-pro-max-256-gb-titanio-blanco-nuevo-1028539830.jpg?v=638415835085970000',  
      description: 'NA',
      web: 'exito'
    }
  ]

