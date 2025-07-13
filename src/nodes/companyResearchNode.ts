import { generateEmailStateSchema, GenerateEmailState } from "../state/generateEmailStateSchema";
import { supportedModelTypes } from "../types/supportedModelTypes";
import { withValidation } from "../utility/withValidation";
import { fireCrawlMCP } from "../mcp/firecrawl";

async function generateCompanyResearch(
  model: supportedModelTypes,
  state: GenerateEmailState
): Promise<GenerateEmailState> {
  const researchURLs = state.researchURLs ?? [];
  const findings: string[] = [];

  for (const url of researchURLs) {
    try {
      const result = await fireCrawlMCP(url);
      console.log({ result });
      findings.push(`URL: ${url}\n${result}`);
    } catch (error) {
      findings.push(`URL: ${url}\nError: ${(error as Error).message}`);
    }
  }

  return {
    ...state,
    researchSummary: findings.length > 0
      ? findings.join("\n\n---\n\n")
      : "No research URLs provided or no findings.",
  };
}


export function companyResearchNode(model: supportedModelTypes) {
  return {
    id: 'companyResearchNode',
    run: withValidation(generateEmailStateSchema, async (state: GenerateEmailState) => generateCompanyResearch(model, state)),
    ends: []
  };
}