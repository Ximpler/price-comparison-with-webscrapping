import { chromium } from "playwright";
import { searchTop3 } from "./scrapping.js";

export async function searchProducts(itemToSearch) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const query = itemToSearch.replace(/\s/g, "+");
  const url = "https://www.falabella.com.co/falabella-co/search?Ntt=" + query;
  await page.goto(url);
  // Wait for search results to load
  await page.waitForLoadState("domcontentloaded");
  // Get names and prices of the first 5 products

  const productsData = await page.evaluate(() => {
    const items = Array.from(
      document.querySelectorAll('a[data-pod="catalyst-pod"]')
    ).slice(0, 5);
    console.log(items);
    const productsData = items.map((item) => {
      const name = item.querySelector(".pod-subTitle").textContent.trim();
      const sellingPriceElement = item.querySelector(
        '.copy10'
      );
      const sellingPrice = sellingPriceElement
        ? sellingPriceElement.textContent.trim()
        : "Not available";
      const img = item.querySelector("img.src");
      const description = "NA";
      const url = item.href  || "Not available";
      return { name, sellingPrice, url, img, description };
    });
    return productsData;
  });
  // Close the browser
  await browser.close();

  return searchTop3(productsData);
}


