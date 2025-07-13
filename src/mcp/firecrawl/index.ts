import "dotenv/config";
import axios from "axios";

// MCP server base endpoint
const BASE_URL = "https://server.smithery.ai/@Krieg2065/firecrawl-mcp-server/tools";
const FIRECRAWL_API_KEY = process.env.FIRECRAWL_API_KEY; // Or however you store your key

async function callFirecrawlTool(tool: string, payload: any) {
  const url = `${BASE_URL}/${tool}`;
  if (!FIRECRAWL_API_KEY) {
    throw new Error("FIRECRAWL_API_KEY is not set in environment variables.");
  }
  console.log(`Calling Firecrawl tool: ${tool} with payload:`, payload);
  const response = await axios.post(url, payload, {
    headers: {
      'Authorization': `Bearer ${FIRECRAWL_API_KEY}`,
    }
  });
  return response.data;
}

// Scrape a single webpage
export async function scrapeCompanyWebsite(companyUrl: string, format: string = "markdown") {
  return callFirecrawlTool("firecrawl_scrape", { url: companyUrl, format });
}

// Discover URLs from a starting point
export async function mapCompanyWebsite(companyUrl: string) {
  return callFirecrawlTool("firecrawl_map", { url: companyUrl });
}

// Crawl multiple pages
export async function crawlCompanyWebsite(companyUrl: string, depth: number = 2) {
  return callFirecrawlTool("firecrawl_crawl", { url: companyUrl, depth });
}

// Main node function to orchestrate research
export async function fireCrawlMCP(companyUrl: string) {
  // Example: scrape main page and map links
  const mainContent = await scrapeCompanyWebsite(companyUrl);
  const discoveredLinks = await mapCompanyWebsite(companyUrl);

  // Optionally crawl deeper or batch scrape
  const crawlResults = await crawlCompanyWebsite(companyUrl);

  return {
    mainContent,
    discoveredLinks,
    crawlResults,
  };
}