import { StorybookConfig } from '@storybook/react-vite';
import { dirname, join } from 'path';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "msw-storybook-addon",
  ],
  "framework": "@storybook/react-vite",
  viteFinal: async (config) => {
    // console.log(join(dirname(import.meta.url), 'mocks/navigate.ts'));
    // config.resolve = config.resolve || {};
    // config.resolve.alias = {
    //   ...config.resolve.alias,
    //   'react-router-dom': join(dirname(import.meta.url), 'mocks/react-router-dom.ts')
    // };
    return config;
  }
};

export default config;