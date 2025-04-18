import { defineConfig } from "vite";

export default defineConfig({
  // This has to be equal to the name of your repository
  // For example, since this repository is https://github.com/kristiania-kws2100-2025/kws2100-kartbaserte-websystemer,
  //  `base` has to be `/kws2100-kartbaserte-websystemer`
  base: "/01_heroku",
  server: {
    proxy: {
      "/01_heroku/api": "http://localhost:3000",
    },
  },
});
