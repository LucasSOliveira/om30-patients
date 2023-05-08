import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const filePath = (relativePath) => path.join(__dirname, relativePath);
