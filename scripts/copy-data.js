// cross-platform copy script
const fs = require("fs");
const path = require("path");

const srcDir = path.join(__dirname, "..", "src", "data");
const destDir = path.join(__dirname, "..", "dist", "data");

async function copyDir(src, dest) {
  await fs.promises.mkdir(dest, { recursive: true });
  const entries = await fs.promises.readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else if (entry.isFile()) {
      await fs.promises.copyFile(srcPath, destPath);
    }
  }
}

copyDir(srcDir, destDir)
  .then(() => {
    console.log("Data copied to dist/data");
  })
  .catch((err) => {
    console.error("Failed to copy data folder:", err);
    process.exit(1);
  });
