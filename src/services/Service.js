import { client } from "./axiosClient";

export function askAI(payLoad) {
  return client.post("/ai/message", payLoad);
}

export function getModels() {
  return client.get("/ai/models");
}
