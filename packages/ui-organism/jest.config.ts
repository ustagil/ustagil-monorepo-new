import type { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverageFrom: ["./src/**"],
  coverageThreshold: {
    global: {
      lines: 0,
    },
  },
  transform: {
    "^.+\\.ts(x)?$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.test.json",
      },
    ],
  },
};

export default config;
