import { searchProducts as spOlimpica } from "./olimpica.js";
import { searchProducts as spFalabella } from "./falabella.js";
import { searchProducts as spMercado } from "./mercadolibre.js";
import { searchProducts as spExito } from "./exito.js";
import { searchProducts as spAlkosto } from "./alkosto.js";

export function searchTop3(products) {
  // Convert sellingPrice to a number with correct precision and create a new list of products with numeric prices
  // Convert the price string to a number
  const parsePrice = (price) => {
    return parseFloat(
      price.replace("$", "").replace(/\./g, "").replace(",", ".")
    );
  };

  // Sort products by price
  const sortedProducts = products.sort(
    (a, b) => parsePrice(a.sellingPrice) - parsePrice(b.sellingPrice)
  );

  // Return the top three cheapest products
  return sortedProducts.slice(0, 3);
}

export async function run(itemToSearch) {
  try {
    const olimpica = await retryOnFailure(() => spOlimpica(itemToSearch), 'olimpica');
    const falabella = await retryOnFailure(() => spFalabella(itemToSearch), 'falabella');
    const alkosto = await retryOnFailure(() => spAlkosto(itemToSearch), 'alkosto');
    const mercado = await retryOnFailure(() => spMercado(itemToSearch), 'mercado');
    const exito = await retryOnFailure(() => spExito(itemToSearch), 'exito');
    
    const allProducts = olimpica.concat(falabella, alkosto, mercado, exito);
    return allProducts;
  } catch (error) {
    console.error('Error en la función run:', error);
    return [];
  }
}

async function retryOnFailure(func, websiteName, maxRetries = 3, delay = 10) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      let results = await func();
      // Agregar el campo "web" a cada objeto JSON en el resultado
      results = results.map(product => ({ ...product, web: websiteName }));
      return results;
    } catch (error) {
      console.error(`Error en la función, reintento ${i + 1}/${maxRetries}:`, error);
      await new Promise(resolve => setTimeout(resolve, delay)); // Espera antes de volver a intentarlo
    }
  }
  throw new Error(`No se pudo completar la función después de ${maxRetries} intentos.`);
}


//use
/*  const itemToSearch = "iphone 15";
const allProducts = await run(itemToSearch);
console.log(allProducts);  */
