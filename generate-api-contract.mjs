// generate-api-contract.mjs
import "dotenv/config";
import { generateApi } from "swagger-typescript-api";
import * as path from "node:path";
import * as processPath from "node:process";

// Debug: Check if environment variable is loaded
console.log("Environment variable:", process.env.VITE_API_BASE_URL);

// Construct the URL with fallback
const baseUrl = process.env.VITE_API_BASE_URL;
const swaggerUrl = `${baseUrl}/swagger/doc.json`;

console.log("Using Swagger URL:", swaggerUrl);

await generateApi({
  cleanOutput: true,
  version: true,
  url: swaggerUrl,
  output: path.resolve(processPath.cwd(), "./src/api"),
  enumNamesAsValues: true,
  modular: true,
  httpClientType: "axios",
});
