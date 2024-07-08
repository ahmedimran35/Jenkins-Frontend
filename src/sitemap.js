const fs = require('fs');
const sitemap = require("sitemap");
const hostname = "http://localhost:5173/";

const urls = [
  { url: "/", changefreq: "daily", priority: 1 },
  { url: "/donate", changefreq: "daily", priority: 0.9 },
  { url: "/category-data", changefreq: "daily", priority: 0.9 },
  // Add additional pages here
];

const sitemapInstance = sitemap.createSitemap({
  hostname,
  urls,
});


// Write sitemap to public directory
fs.writeFileSync('/public/sitemap.xml' , sitemapInstance.toString());
