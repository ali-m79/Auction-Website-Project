import { defineConfig } from 'cypress'
// import {defineConfig} from ('./../vite.config')

module.exports = defineConfig({
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
      // optionally pass in vite config
      // or a function - the result is merged with
      // any `vite.config` file that is detected
    },
  },
})