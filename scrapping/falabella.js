import { chromium } from "playwright";

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
      const url = item.href  || "Not available";
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
