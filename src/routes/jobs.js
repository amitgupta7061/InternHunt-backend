import express from "express";
import Job from "../models/Job.js";
import { scrapeInternshala } from "../scrapers/internshala.js";

const router = express.Router();

router.get("/scrape", async (req, res) => {
  try {
    const jobs = await scrapeInternshala();
    for (const job of jobs) {
        await Job.updateOne(
          { link: job.link },
          { $setOnInsert: job },
          { upsert: true }       
        );
    }
    res.json({ success: true, count: jobs.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  const jobs = await Job.find().sort({ postedAt: -1 }).limit(20);
  res.json(jobs);
});

export default router;
