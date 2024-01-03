import { PlaywrightCrawler } from "crawlee";

const crawler = new PlaywrightCrawler({
  async requestHandler({ $, request, page, enqueueLinks, log, pushData }) {
    const title = await page.title();
    log.info(`Title of ${request.loadedUrl} is '${title}'`);

    // Save results as JSON to ./storage/datasets/default
    await pushData({ title, url: request.loadedUrl });

    // Extract links from the current page
    // and add them to the crawling queue.
    // await enqueueLinks();
  },

  //   maxRequestsPerCrawl: 20,

  headless: false,
});

await crawler.run([
  "https://www.google.com/search?q=italent&sca_esv=595051483&sxsrf=AM9HkKkcjJZmPYoIplezmmkoslgOFqfX9g%3A1704191493694&source=hp&ei=BeaTZZLMKMKPseMPoqGD2A4&iflsig=AO6bgOgAAAAAZZP0FQrSepZkAmKIoRQ2EQ_Tq6sZYaJJ&oq=itale&gs_lp=Egdnd3Mtd2l6IgVpdGFsZSoCCAAyChAjGIAEGIoFGCcyBBAjGCcyBBAjGCcyCxAuGK8BGMcBGIAEMgUQABiABDIFEAAYgAQyBxAuGIAEGAoyBRAuGIAEMgUQABiABDILEC4YgAQYxwEYrwFIpSRQvgZY7BBwAXgAkAEAmAGRAaAB-gSqAQMwLjW4AQHIAQD4AQGoAgrCAgcQIxjqAhgnwgINEC4YxwEYrwEY6gIYJ8ICCxAAGIAEGLEDGIMBwgIREC4YgAQYsQMYgwEYxwEY0QPCAg4QABiABBiKBRixAxiDAcICFBAuGIAEGMcBGK8BGJgFGJ4FGJkFwgIIEAAYgAQYsQPCAggQLhixAxiABMICCxAuGIAEGLEDGIMB&sclient=gws-wiz#cobssid=s",
]);
