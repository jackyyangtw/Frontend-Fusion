const pkg = require("./package");
const bodyParser = require("body-parser");
const axios = require("axios");

module.exports = {
  mode: "universal",

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: pkg.description },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Open+Sans",
      },
    ],
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#3B8070" },

  /*
   ** Global CSS
   */
  css: ["~assets/styles/main.css"],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ["~plugins/core-components.js", "~plugins/date-filter.js"],
  // vuetify: {
  //   theme: {
  //     dark: true,
  //     themes: {
  //       dark: {
  //         primary: "#4caf50",
  //         secondary: "#ff8c00",
  //         accent: "#9c27b0",
  //       },
  //     },
  //   },
  // },
  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxtjs/axios", "@nuxtjs/vuetify"],

  axios: {
    baseURL:
      process.env.BASE_URL ||
      "https://nuxt-blog-b5610-default-rtdb.firebaseio.com",
    credentials: false,
  },
  env: {
    baseUrl:
      process.env.BASE_URL ||
      "https://nuxt-blog-b5610-default-rtdb.firebaseio.com",
    fbAPIKey: "AIzaSyBY_GSIZmBRcvwqbA6ZXJzFlV3UYoO88os",
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  },

  transition: {
    name: "fade",
    mode: "out-in",
  },

  router: {
    middleware: "log",
  },

  serverMiddleware: [bodyParser.json(), "~/api"],
  generate: {
    routes: function () {
      return axios
        .get("https://nuxt-blog-b5610-default-rtdb.firebaseio.com/posts.json")
        .then((res) => {
          const routes = [];
          for (const key in res.data) {
            routes.push({
              route: `/posts/${key}`,
              payload: {
                postData: res.data[key],
              },
            });
          }
          return routes;
        });
    },
  },
};
