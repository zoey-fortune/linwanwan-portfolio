import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import matter from "gray-matter";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API to fetch lists of content
  app.get("/api/content/:type", (req, res) => {
    const { type } = req.params;
    const contentDir = path.join(process.cwd(), "content", type);
    
    if (!fs.existsSync(contentDir)) {
      return res.status(404).json({ error: "Content not found" });
    }

    try {
      const files = fs.readdirSync(contentDir).filter(file => file.endsWith(".md"));
      const items: any[] = files.map(file => {
        const filePath = path.join(contentDir, file);
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const { data } = matter(fileContent);
        return {
          slug: file.replace(".md", ""),
          ...data
        };
      });

      // Sort by date if available
      items.sort((a, b) => {
        if (a.date && b.date) {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
        return 0;
      });

      res.json(items);
    } catch (err) {
      res.status(500).json({ error: "Failed to read content" });
    }
  });

  // API to fetch a single content item
  app.get("/api/content/:type/:slug", (req, res) => {
    const { type, slug } = req.params;
    const filePath = path.join(process.cwd(), "content", type, `${slug}.md`);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "Content not found" });
    }

    try {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContent);
      res.json({
        ...data,
        content
      });
    } catch (err) {
      res.status(500).json({ error: "Failed to read content" });
    }
  });
  
  // API to send email from contact form
  app.post("/api/contact", async (req, res) => {
      const { name, email, message } = req.body;
      if (!name || !email || !message) {
          return res.status(400).json({ error: "Missing required fields" });
      }
      
      console.log(`Received contact form submission from ${name} (${email}): ${message}`);
      // In a real app, use Resend or Nodemailer to send to the target email.
      // E.g., await resend.emails.send({ ... })
      
      return res.json({ success: true, message: "Thank you for reaching out! We'll get back to you soon." })
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
