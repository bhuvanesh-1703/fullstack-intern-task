const mongoose = require("mongoose");
const Template = require("../models/Template");

require("dotenv").config();

const templates = [
  {
    name: "Portfolio Website",
    description: "Modern portfolio template for developers and designers.",
    thumbnail_url:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    category: "Portfolio",
  },

  {
    name: "Ecommerce Store",
    description: "Responsive ecommerce website template with product pages.",
    thumbnail_url:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d",
    category: "Ecommerce",
  },

  {
    name: "Admin Dashboard",
    description: "Clean admin dashboard UI for SaaS applications.",
    thumbnail_url:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    category: "Dashboard",
  },

  {
    name: "Agency Website",
    description: "Creative agency landing page template.",
    thumbnail_url:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    category: "Business",
  },

  {
    name: "Blog Platform",
    description: "Minimal blog website template with article layouts.",
    thumbnail_url:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    category: "Blog",
  },

  {
    name: "Restaurant Website",
    description: "Modern restaurant template with menu sections.",
    thumbnail_url:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
    category: "Restaurant",
  },

  {
    name: "Fitness App UI",
    description: "Fitness and gym app landing page template.",
    thumbnail_url:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
    category: "Fitness",
  },

  {
    name: "Education Platform",
    description: "Online course and education platform template.",
    thumbnail_url:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    category: "Education",
  },
];

const seedTemplates = async () => {
  try {
   
    await Template.deleteMany();

    const insertedTemplates = await Template.insertMany(templates);

    console.log("✅ Templates Seeded Successfully");
    console.log(insertedTemplates);

    process.exit();
  } catch (error) {
    console.log("❌ Seed Error:", error);

    process.exit(1);
  }
};

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "template_store",
  })
  .then(() => {
    console.log("✅ MongoDB Connected");

    seedTemplates();
  })
  .catch((err) => {
    console.log("❌ MongoDB Connection Error:", err);
  });