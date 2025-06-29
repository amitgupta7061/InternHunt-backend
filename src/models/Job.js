import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: String,
    company: String,
    link: { type: String, unique: true },
    location: String,
    stipend: String,
    duration: String,
    platform: { type: String, default: "Internshala" },
    postedAt: { type: Date, default: Date.now, index: true },
  },
  { timestamps: true }
);

// Auto-delete after 2 days (TTL index on createdAt)
jobSchema.index({ createdAt: 1 }, { expireAfterSeconds: 172800 });

export default mongoose.model("Job", jobSchema);
