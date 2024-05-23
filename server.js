import express from 'express';
import { searchProducts as spOlimpica } from './scrapping/olimpica.js';
import { searchProducts as spFalabella } from './scrapping/falabella.js';
import { searchProducts as spMercado } from './scrapping/mercadolibre.js';
import { searchProducts as spExito } from './scrapping/exito.js';
import { searchProducts as spAlkosto } from './scrapping/alkosto.js';
import cors from 'cors';


const app = express();
const port = 3000;
app.use(cors());

async function run(itemToSearch) {
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

async function retryOnFailure(func, websiteName, maxRetries = 3, delay = 1000) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      let results = await func();
      results = results.map(product => ({ ...product, web: websiteName }));
      return results;
    } catch (error) {
      console.error(`Error en la función, reintento ${i + 1}/${maxRetries}:`, error);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  throw new Error(`No se pudo completar la función después de ${maxRetries} intentos.`);
}

app.get('/search', async (req, res) => {
  const query = req.query.q;

  
  if (!query) {
    return res.status(400).send('Query parameter "q" is required');
  }
  console.log(query)
  const results = await run(query);
  console.log(results);
  res.json(results);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
