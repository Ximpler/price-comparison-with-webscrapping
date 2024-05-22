import {searchProducts as spOlimpica} from  './olimpica.js'
import {searchProducts as spFalabella} from  './falabella.js'
import {searchProducts as spMercado} from  './mercadolibre.js'
import {searchProducts as spExito} from  './exito.js'
import {searchProducts as spAlkosto} from  './alkosto.js'



//use
const itemToSearch = 'celulares rojos'

const olimpica = await spOlimpica(itemToSearch);
const falabella = await spFalabella(itemToSearch);
const alkosto = await spAlkosto(itemToSearch);
const mercado = await spMercado(itemToSearch);
const exito = await spExito(itemToSearch);

const allProducts = olimpica.concat(falabella, alkosto, mercado, exito);

console.log(allProducts);