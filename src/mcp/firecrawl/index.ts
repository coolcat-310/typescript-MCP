import "dotenv/config";
import FirecrawlApp, { ScrapeResponse } from "firecrawl";

const FIRECRAWL_API_KEY = process.env.FIRECRAWL_API_KEY;

const app = new FirecrawlApp({ apiKey: FIRECRAWL_API_KEY });

export async function scrapeCompanyWebsite(companyUrl: string) {
  const { success, warning, error, ...rest } = await app.scrapeUrl(companyUrl, { formats: ['markdown', 'html', 'json'] }) as ScrapeResponse;
  console.log("Scrape Result:", scrapeResult);

  if (error) {
    throw new Error(`Firecrawl scrape error: (code: ${error})`);
  }
  if (warning) {
    console.warn(`Firecrawl scrape warning: (code: ${warning})`);
  }
  
  return {...rest};
}

export async function fireCrawlMCP(companyUrl: string) {
  const mainContent = await scrapeCompanyWebsite(companyUrl);
  // const discoveredLinks = await mapCompanyWebsite(companyUrl);

  // // Optionally crawl deeper or batch scrape
  // const crawlResults = await crawlCompanyWebsite(companyUrl);

  return {
    mainContent,
  };
}