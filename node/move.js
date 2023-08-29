import fse from "fs-extra";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function copyFiles() {
  const from = path.resolve(__dirname, "dist/html");
  const where = path.resolve(__dirname, "dist");

  try {
    const check = await fse.pathExists(path.resolve(from, "index.html"));

    if (!check) {
      console.warn("[Warning]: no path found to copy 'dist'");
      return;
    }

    await fse.copy(from, where, { overwrite: true });
    await fse.remove(from);
  } catch (err) {
    console.error(err);
  }
}

copyFiles().then();
