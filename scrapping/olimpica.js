import { chromium } from "playwright";
import { searchTop3 } from "./scrapping.js";

export async function searchProducts(itemToSearch) {
    const browser = await chromium.launch();
    const page = await browser.newPage();
  
    // Go to the website
    await page.goto("https://www.olimpica.com/");
    await page.waitForLoadState("domcontentloaded");
  
    // Search on the page
    await page.waitForSelector('input[placeholder="Busca por nombre, categoría…"]');
    await page.fill(
      'input[placeholder="Busca por nombre, categoría…"]',
      itemToSearch
    );
    await page.keyboard.press("Enter");
  
    // Wait for search results to load
    await page.waitForLoadState("domcontentloaded");
    await page.waitForSelector(".vtex-search-result-3-x-galleryItem")
    // Get names and prices of the first 5 products
    const productsData = await page.evaluate(() => {
      const items = Array.from(
        document.querySelectorAll(".vtex-product-summary-2-x-clearLink")
      ).slice(0, 5);
      
      const productsData = items.map((item) => {
        const name = item
          .querySelector(".vtex-product-summary-2-x-productNameContainer")
          .textContent.trim();
        const sellingPriceElement = item.querySelector(
          ".vtex-product-price-1-x-sellingPriceValue--summary"
        );
        const sellingPrice = sellingPriceElement
          ? sellingPriceElement.textContent.trim()
          : "Not available";
        const img = item.querySelector("img").getAttribute("src");
        const url = item.getAttribute("href")
          ? `https://www.olimpica.com${item.getAttribute("href")}`
          : "Not available";
        const description = "NA";
        return { name, sellingPrice, url, img, description };
      });
    
      return productsData;
    });
    
  
    // Close the browser
    await browser.close();
  
    return searchTop3(productsData);
  }


