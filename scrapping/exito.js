import { chromium } from "playwright";
import { searchTop3 } from "./scrapping.js";

export async function searchProducts(itemToSearch) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const query = itemToSearch.replace(/\s/g, "+");

  const url = `https://www.exito.com/s?q=${query}&page=0`;
  
  await page.goto(url);
  // Wait for search results to load
  await page.waitForLoadState("domcontentloaded");
  await page.waitForSelector('article[data-fs-product-card="true"]')
  // Get names and prices of the first 5 products

  const productsData = await page.evaluate(() => {
    const items = Array.from(
      document.querySelectorAll('article[data-fs-product-card="true"]')
    ).slice(0, 5);
    console.log(items)
    const productsData = items.map((item) => {
      const name = item
        .querySelector("h3 a")
        .textContent.trim();
      const sellingPriceElement = item.querySelector(
        'p[data-fs-container-price-otros="true"]'
      );
      const sellingPrice = sellingPriceElement
        ? sellingPriceElement.textContent.trim()
        : "Not available";
        const url =
        item.querySelector('a[data-testid="product-link"]')?.href || "Not available";
        const img = item.querySelector("img")?.getAttribute("src") || "Not available";
        const description = "NA";
      return { name, sellingPrice, url, img, description };
    });
    return productsData;
  });
  // Close the browser
  await browser.close();

  return searchTop3(productsData);
}

