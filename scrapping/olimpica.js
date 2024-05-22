import { chromium } from "playwright";

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
        const url = item.getAttribute("href")
          ? `https://www.olimpica.com${item.getAttribute("href")}`
          : "Not available";
        return { name, sellingPrice, url };
      });
    
      return productsData;
    });
    
  
    // Close the browser
    await browser.close();
  
    return searchTop3(productsData);
  }

  function searchTop3(products) {
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
  
