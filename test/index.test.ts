import { handleRequest } from "../src/index";
import makeServiceWorkerEnv from "service-worker-mock";
import nodeFetch from "node-fetch";
import dotenv from "dotenv";

if (typeof fetch === "undefined") {
  global.fetch = nodeFetch;
}

dotenv.config();
// @ts-ignore
const env: Env = process.env;

declare var global: any;

describe("handle", () => {
  beforeEach(() => {
    Object.assign(global, makeServiceWorkerEnv());
    jest.resetModules();
  });

  test("handle GET", async () => {
    const result = await handleRequest(new Request("/"), env);
    expect(result.status).toEqual(200);
    const text = await result.text();
    expect(text).toEqual("request method: GET");
  });
});