import { chromium } from "playwright";
import { searchTop3 } from "./scrapping.js";

export async function searchProducts(itemToSearch) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  var url =
    "https://www.alkosto.com/search?text=" +
    encodeURIComponent(itemToSearch) +
    "&sort=relevance";
  await page.goto(url);
  // Wait for search results to load
  await page.waitForLoadState("domcontentloaded");
  await page.waitForSelector(".ais-InfiniteHits-item");
  // Get names and prices of the first 5 products

  const productsData = await page.evaluate(() => {
    const items = Array.from(
      document.querySelectorAll(".ais-InfiniteHits-item")
    ).slice(0, 5);
    const productsData = items.map((item) => {
      const name = item
        .querySelector(".product__item__top__title")
        .textContent.trim();
      const sellingPriceElement = item.querySelector(".price");
      const sellingPrice = sellingPriceElement
        ? sellingPriceElement.textContent.trim()
        : "Not available";
      const url = item
        .querySelector("h3.product__item__top__title")
        ?.getAttribute("data-url")
        ? `https://www.alkosto.com${item
            .querySelector("h3.product__item__top__title")
            .getAttribute("data-url")}`
        : "Not available";
      return { name, sellingPrice, url };
    });
    return productsData;
  });

  // Close the browser
  await browser.close();

  return searchTop3(productsData);
}


// Usage
const itemToSearch = "celulares rojos";
const productsData = await searchProducts(itemToSearch);
console.log(productsData);