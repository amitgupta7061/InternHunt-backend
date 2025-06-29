import axios from "axios";
import * as cheerio from "cheerio";

export async function scrapeInternshala() {
  const baseUrl = "https://internshala.com/internships/android-app-development,angular-js-development,artificial-intelligence-ai,backend-development,blockchain-development,cloud-computing,cyber-security,front-end-development,full-stack-development,java-internship/";
  const { data } = await axios.get(baseUrl);
  const $ = cheerio.load(data);
  const jobs = [];

  $(".individual_internship").each((i, el) => {
    const title = $(el).find("a#job_title").text().trim();
    const company = $(el).find("p.company-name").text().trim();
    const link = $(el).find("a#job_title").attr("href");
    const location = $(el).find(".locations a").text().trim();
    const stipend = $(el).find("span.stipend").text().trim();
    const duration = $(el).find(".row-1-item i.ic-16-calendar").next().text().trim();
    const timeText = $(el).find(".status-success span").text().trim().toLowerCase();

    const isRecent =
      timeText.includes("few hours") ||
      timeText.includes("hour") ||
      timeText.includes("today") ||
      timeText.includes("just now") ||
      timeText.includes("1 day ago");

    if (isRecent && link) {
      jobs.push({
        title,
        company,
        link,
        location,
        stipend,
        duration,
        platform: "Internshala",
        postedAt: new Date(),
      });
    }
  });
  return jobs;
}
