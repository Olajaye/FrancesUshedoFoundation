import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb://mongo:zfuEcYfSPQAzvjFKBnAduGYBMsKdWWod@centerbeam.proxy.rlwy.net:28378";

const AdminSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
  },
  { timestamps: true }
);

const Admin =
  mongoose.models.Admin || mongoose.model("Admin", AdminSchema);

async function main() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  const hashedPassword = await bcrypt.hash("Admin@1234", 12);

  await Admin.findOneAndUpdate(
    { email: "admin@francesushedofoundation.org" },
    {
      email: "admin@francesushedofoundation.org",
      password: hashedPassword,
      name: "Admin",
    },
    { upsert: true, new: true }
  );

  console.log("Seeded admin: admin@francesushedofoundation.org");
  await mongoose.disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
