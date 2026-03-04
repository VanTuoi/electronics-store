/* eslint-disable no-undef */
import dotenv from "dotenv";
import fs from "fs/promises";
import path from "path";
import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "stream";
import { fileURLToPath } from "url";
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const staticRoutes = [
  {
    url: "/",
    lastmod: new Date().toISOString(),
    changefreq: "daily",
    priority: 1.0,
    images: [
      {
        url: "/logo.png",
        caption: "Electronics Store Logo"
      }
    ]
  },
  {
    url: "/about",
    lastmod: "2025-01-01",
    changefreq: "monthly",
    priority: 0.8,
    images: [
      {
        url: "/logo.png",
        caption: "About Our Store"
      }
    ]
  },
  {
    url: "/cart",
    lastmod: new Date().toISOString(),
    changefreq: "weekly",
    priority: 0.7
  },
  {
    url: "/products",
    lastmod: new Date().toISOString(),
    changefreq: "weekly",
    priority: 0.9,
    images: [
      {
        url: "/logo.png",
        caption: "Our Products Collection"
      }
    ]
  },
  {
    url: "/check-out",
    lastmod: "2025-01-01",
    changefreq: "weekly",
    priority: 0.6
  },
  {
    url: "/check",
    lastmod: "2025-01-01",
    changefreq: "weekly",
    priority: 0.6
  },
  {
    url: "/auth/login",
    lastmod: "2025-01-01",
    changefreq: "monthly",
    priority: 0.3
  },
  {
    url: "/privacy",
    lastmod: "2025-01-01",
    changefreq: "yearly",
    priority: 0.2
  },
  {
    url: "/terms",
    lastmod: "2025-01-01",
    changefreq: "yearly",
    priority: 0.2
  },
  {
    url: "/faq",
    lastmod: "2025-01-01",
    changefreq: "monthly",
    priority: 0.4
  },
  {
    url: "/payment",
    lastmod: "2025-01-01",
    changefreq: "monthly",
    priority: 0.5
  },
  {
    url: "/hello",
    lastmod: "2025-01-01",
    changefreq: "monthly",
    priority: 0.1
  }
];

async function getDynamicRoutes() {
  try {
    const products = await fetch(`${process.env.VITE_BACKEND_URL}/products`)
      .then(res => res.json())
      .catch(err => {
        console.error("Error fetching products:", err);
        return [];
      });

    return products?.data?.map(product => ({
      url: `/product/${product.id}-${product.name}`,
      lastmod: product.updatedAt || new Date().toISOString(),
      changefreq: "weekly",
      priority: 0.7
    }));
  } catch (error) {
    console.error("Error fetching dynamic routes:", error);
    return [];
  }
}

export async function generateSitemap() {
  try {
    const outputPath = path.join(__dirname, "../dist/sitemap.xml");
    try {
      await fs.access(outputPath);
      await fs.unlink(outputPath);
      console.log("❌ Old sitemap deleted.");
    } catch (err) {
      if (err.code !== "ENOENT") {
        console.error("❌ Error deleting old sitemap:", err);
      } else {
        console.log("✅ No old sitemap found to delete.");
      }
    }

    const dynamicRoutes = await getDynamicRoutes();
    const allRoutes = [...staticRoutes, ...dynamicRoutes];

    const smStream = new SitemapStream({
      hostname: process.env.VITE_APP_URL || "https://www.electronics-store.ct.ws",
      xmlns: {
        news: false,
        xhtml: true,
        image: true,
        video: false
      }
    });

    allRoutes.forEach(route => smStream.write(route));
    smStream.end();

    const sitemap = await streamToPromise(Readable.from(smStream));

    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, sitemap.toString());

    console.log(`✅ Sitemap generated successfully at: ${outputPath}`);
    console.log(`🔗 Total URLs: ${allRoutes.length}`);
    console.log(`🌐 Sitemap URL: ${process.env.VITE_APP_URL}/sitemap.xml`);

    return outputPath;
  } catch (error) {
    console.error("❌ Error generating sitemap:", error);
    throw error;
  }
}

generateSitemap().catch(err => {
  console.error(err);
  process.exit(1);
});

if (import.meta.url === `file://${process.argv[1]}`) {
  generateSitemap().catch(err => {
    console.error(err);
    process.exit(1);
  });
}
