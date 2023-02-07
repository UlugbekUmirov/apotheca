const { i18n } = require("./next-i18next.config");
module.exports = {
  i18n,
  images: {
    loader: "imgix",
    domains: ["http://localhost:3000", "https://mento.uz"],
    path: "/",
  },
  optimizeFonts: true,
  reactStrictMode: true,
  trailingSlash: false,
  devIndicators: {
    autoPrerender: false,
  },
};
