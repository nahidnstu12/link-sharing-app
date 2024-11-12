import nextJest from "next/jest";
import { pathsToModuleNameMapper } from "ts-jest";
import { compilerOptions } from "./tsconfig.json";

// export default async (): Promise<Config.InitialOptions> => {
//   return {
//     preset: 'ts-jest',

//     globals: {
//       'ts-jest': {
//         tsconfig: 'tsconfig.test.json'
//       }
//     },

//     // Automatically clear mock calls and instances between every test
//     clearMocks: true,

//     // A list of paths to modules that run some code to configure or set up the testing framework before each test
//     setupFilesAfterEnv: ['@testing-library/jest-dom'],

//     testEnvironment: 'jsdom', // Use jsdom to simulate a browser environment

//     moduleNameMapper: {
//       ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
//       '\\.(css|less|scss|sass)$': '<rootDir>/src/libs/styles/styleMock.ts' // Correct path to mock CSS imports
//     }
//   }
// }

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  preset: "ts-jest",
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.test.json",
    },
  },

  // Automatically clear mock calls and instances between every test
  clearMocks: true,
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: "<rootDir>/" }),
    // Mock static assets and styles
    "\\.(css|less|scss|sass)$": "<rootDir>/src/__mocks__/styleMock.ts",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",

    // Mock next/font
    "next/font/(.*)": "<rootDir>/src/__mocks__/nextFontMock.ts",

    // Path aliases
    // '^@/(.*)$': '<rootDir>/src/$1',
    // '^@core/(.*)$': '<rootDir>/src/@core/$1'
  },
  // Ignore specific paths or modules
  transformIgnorePatterns: [
    "/node_modules/",
    "^.+\\.module\\.(css|sass|scss)$",
    "next/font",
  ],
  moduleDirectories: ["node_modules", "<rootDir>"],
};

export default async () => createJestConfig(customJestConfig);
