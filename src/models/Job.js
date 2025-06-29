import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  link: { type: String, required: true },
  location: { type: String },
  stipend: { type: String },
  duration: { type: String },
  applyBy: { type: String },
  jobType: { type: String },
  platform: { type: String, default: "Internshala" },
  postedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Job", jobSchema);
