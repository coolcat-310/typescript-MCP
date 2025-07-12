import "dotenv/config";
import { ModelProvider } from "./utility/modelResolver";

async function main() {
  const arg = process.argv[2]?.toLowerCase();
  const modelArg = (process.argv[3]?.toLowerCase() || "openai") as ModelProvider;

  switch (arg) {
    case "email":
      // await runEmailGraph();
      console.log("Email graph is currently disabled:" + modelArg);
      break;
    default:
      console.log("Usage: yarn start email | task");
      process.exit(1);
  }
}

main();