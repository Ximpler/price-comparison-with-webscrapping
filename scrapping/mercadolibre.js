import { chromium } from "playwright";
import { searchTop3 } from "./scrapping.js";

export async function searchProducts(itemToSearch) {
  const browser = await chromium.launch({});
  const page = await browser.newPage();
  // Go to the website
  await page.goto("https://www.mercadolibre.com.co/");
  await page.waitForLoadState("domcontentloaded");

  // Search on the page
  await page.waitForSelector(".nav-search-input");
  await page.fill(".nav-search-input", itemToSearch);
  await page.keyboard.press("Enter");

  await page.waitForLoadState("domcontentloaded");

  // Wait for the search results to be visible
  await page.waitForSelector(".ui-search-result");

  // Get names and prices of the first 5 products
  const productsData = await page.evaluate(() => {
    const items = Array.from(
      document.querySelectorAll(".ui-search-result")
    ).slice(0, 5);
    const productsData = items.map((item) => {
      const name = item
        .querySelector(".ui-search-item__title")
        .textContent.trim();
      //search a class in another class
      const sellingPriceElement = item.querySelector(
        ".ui-search-price__second-line .andes-money-amount__fraction"
      );
      const sellingPrice = sellingPriceElement
        ? sellingPriceElement.textContent.trim()
        : "Not available";
      const url =
        item.querySelector("a.ui-search-link")?.href || "Not available";
        const img = item.querySelector("img")?.src || "Not available";
    
        const descriptionElement = item.querySelector(
          'span.ui-search-item__variations-text'
        );
        const description = descriptionElement
          ? descriptionElement.textContent.trim()
          : "NA";
      return { name, sellingPrice, url , img, description};
    });
    return productsData;
  });

  // Close the browser
  await browser.close();

  return searchTop3(productsData);
}



