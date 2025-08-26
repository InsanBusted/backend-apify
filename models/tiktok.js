import { ApifyClient } from "apify-client";

class Tiktok {
  static async fetchData() {
    try {
      const client = new ApifyClient({
        token: process.env.APIFY_TOKEN,
      });

      const run = await client.task("C7HcYKBMtaMYwCede").call();
      console.log("Run object:", run);

      const datasetClient = client.dataset(run.defaultDatasetId);
      console.log("Dataset client:", datasetClient);

      const { items } = await datasetClient.listItems();
      console.log("Items fetched:", items.length);

      return items;
    } catch (error) {
      console.error("Error fetchData:", error);
      throw new Error(`Error fetching data: ${error.message}`);
    }
  }

}

export default Tiktok;
