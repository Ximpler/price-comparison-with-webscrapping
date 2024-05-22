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
  const olimpica = await spOlimpica(itemToSearch);
  const falabella = await spFalabella(itemToSearch);
  const alkosto = await spAlkosto(itemToSearch);
  const mercado = await spMercado(itemToSearch);
  const exito = await spExito(itemToSearch);
  const allProducts = olimpica.concat(falabella, alkosto, mercado, exito);
  return allProducts;
}

//use
//const itemToSearch = "celulares rojos";
//const allProducts = run(itemToSearch)
//console.log(allProducts);
