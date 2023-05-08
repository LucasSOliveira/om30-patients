import fs from "fs";
import { filePath } from "../../utils.js"
const userJsonPath = filePath("./src/database/users.json");
// export const userJson = userJsonPath
export const userJson = fs.readFileSync(userJsonPath, "utf-8")