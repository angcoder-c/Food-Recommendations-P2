/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type {Config} from 'jest';
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

const config: Config = {
  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",

  testMatch: [
     "**/__tests__/**/*.?([mc])[jt]s?(x)",
     "**/?(*.)+(spec|test).?([mc])[jt]s?(x)" 
  ],
  setupFiles: ["<rootDir>/jest.setup.ts"],
};

export default createJestConfig(config)
