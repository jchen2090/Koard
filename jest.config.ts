import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  collectCoverage: true,
  collectCoverageFrom: ["app/**/*.{ts,tsx}", "!**/layout.tsx"],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
    },
    "app/**/*.{ts,tsx}": {
      branches: 50,
      functions: 50,
      lines: 50,
    },
  },
};

export default createJestConfig(config);
