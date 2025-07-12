import "dotenv/config";

async function main() {
  const arg = process.argv[2]?.toLowerCase();
  //const modelArg = (process.argv[3]?.toLowerCase() || "openai") as ModelProvider;

  switch (arg) {
    case "email":
      // await runEmailGraph();
      console.log("Email graph is currently disabled.");
      break;
    case "task":
      // if (!modelArg) {
      //   console.error("Please provide a model argument for task graph.");
      // }
      // await runTaskGraph(modelArg);
      console.log(`Task graph would run with model: ${modelArg}`);
      break;
    default:
      console.log("Usage: yarn start email | task");
      process.exit(1);
  }
}

main();