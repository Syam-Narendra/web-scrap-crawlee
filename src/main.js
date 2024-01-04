import { CheerioCrawler, Dataset } from "crawlee";
import OpenAI from "openai";
// import { config } from "dotenv";
// config();

// const resource = process.env.resource;
// const deployment = process.env.deployment;
// const apiVersion = process.env.apiVersion;
// const apiKey = process.env.apiKey;

// const openai = new OpenAI({
//   apiKey: apiKey,
//   baseURL: `https://${resource}.openai.azure.com/openai/deployments/${deployment}`,
//   defaultQuery: { "api-version": apiVersion },
//   defaultHeaders: { "api-key": apiKey },
// });

const crawler = new CheerioCrawler({
  maxRequestsPerCrawl: 100,

  async requestHandler({ request, $, pushData, enqueueLinks, requestQueue }) {
    const title = $("title").text();
    const data = { title, url: request.loadedUrl };
    pushData(data);

    // const links = $("a[href]")
    //   .map((_, el) => $(el).attr("href"))
    //   .get();

    // const absoluteUrls = links.map(
    //   (link) => new URL(link, request.loadedUrl).href
    // );

    // const userPrompt = `from this ${absoluteUrls} array give me only useful links which are related to italent`;
    // const response = await openai.chat.completions.create({
    //   messages: [{ role: "system", content: userPrompt }],
    //   model: "gpt-3.5-turbo",
    // });
    // console.log(response);
    // await crawler.addRequests(absoluteUrls);

    await enqueueLinks({
      regexps: [/^(?!http(s)?:\/\/www\.google\.com\/).*/i],
    });
  },
});

await crawler.run(["https://www.google.com/search?q=realme"]);
await Dataset.exportToJSON("items");
