import "dotenv/config";
import { ModelProvider } from "./models/modelResolver";
import { generateEmailTemplate } from "./entrypoints/generateEmailTemplate";

async function main() {
  const arg = process.argv[2]?.toLowerCase();
  const modelArg = (process.argv[3]?.toLowerCase() || "openai") as ModelProvider;

  switch (arg) {
    case "email":
      await generateEmailTemplate(modelArg);
      break;
    default:
      console.log("Usage: yarn start email | task");
      process.exit(1);
  }
}

main();
