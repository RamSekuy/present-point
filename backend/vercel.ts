import { VercelConfig } from "@vercel/config/v1";

export const config: VercelConfig = {
  version: 2,
  builds: [
    {
      src: "dist/src/index.js",
      use: "@vercel/node",
    },
  ],
  routes: [
    {
      src: "/(.*)",
      dest: "dist/src/index.js",
    },
  ],
};
