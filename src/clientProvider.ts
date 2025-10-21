// clientProvider.ts

import { Api } from "./api/Api";

const securityWorker = async () => {
  try {
    const token = localStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${token}` } };
  } catch (error) {
    console.warn("[TOKEN] authSecurityWorker ERROR:", error);
    throw new Error("NO_TOKENS");
  }
};

export const axiosClient = new Api({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
  secure: true,
  securityWorker: securityWorker,
});
