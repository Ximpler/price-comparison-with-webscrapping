import { chromium } from "playwright";

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
  await page.waitForSelector(".ui-search-result__wrapper");

  // Get names and prices of the first 5 products
  const productsData = await page.evaluate(() => {
    const items = Array.from(
      document.querySelectorAll(".ui-search-result__wrapper")
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

