const pkg = require("./package");
const bodyParser = require("body-parser");
const axios = require("axios");

const isDev = process.env.NODE_ENV !== "production";

require('dotenv').config()

module.exports = {
  target: isDev ? "server" : "static",
  // target: "server",
  modules: ["@nuxtjs/axios", "@nuxtjs/vuetify", "@nuxt/image"],
  // image: isDev ? {} : {
  //   provider: 'netlify',
  //   domains: [
  //     'firebasestorage.googleapis.com'
  //   ]
  // },

  head: {
    title: pkg.name,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: pkg.description },
      {
        httpEquiv: 'Cross-Origin-Opener-Policy',
        content: 'same-origin'
      },
      {
        httpEquiv: 'Cross-Origin-Embedder-Policy',
        content: 'require-corp'
      },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/images/site-icon.svg" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Open+Sans",
      },
    ],
    htmlAttrs: {
      lang: 'zh-Hant',
    },
  },


  loading: {
    color: "#54B4D3",
  },

  css: [
    "@/static/css/main.css",
    'quill/dist/quill.bubble.css',
    'quill/dist/quill.snow.css',
    'quill/dist/quill.core.css',
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "~plugins/core-components.js",
    "~plugins/date-filter.js",
    "~plugins/tags.js",
    { src: "~plugins/vue-quill-editor.js", ssr: false },
    "~plugins/firebase.js",
    '~/plugins/highlight.js',
  ],

  colorMode: {
    classSuffix: "",
    preference: 'dark',
    fallback: 'light',
  },

  vuetify: {
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: "#EC4899",
          background: "#020617",
          backgroundLight: "#141B2A",
        },
        light: {
          primary: "#0EA5E9",
          background: "#F1F5F9",
          backgroundLight: "#FFFFFF",
        }
      },
    }
  },
  axios: {
    baseURL:
      // process.env.BASE_URL ||
      "https://nuxt-blog-b5610-default-rtdb.firebaseio.com",
    credentials: false,
  },
  env: {
    baseUrl:
      // process.env.BASE_URL ||
      "https://nuxt-blog-b5610-default-rtdb.firebaseio.com",
    fbAPIKey: process.env.fbAPIKey,
    DEFAULT_PREVIEW_IMG_URL: "/images/post-preview-picture.png",
  },
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) { },
    babel: {
      plugins: [
        ["@babel/plugin-proposal-class-properties", { loose: true }],
        ["@babel/plugin-proposal-private-methods", { loose: true }],
        ["@babel/plugin-proposal-private-property-in-object", { loose: true }],
      ],
    },

    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },

  pageTransition: {
    name: "fade",
    mode: "out-in",
  },

  router: {
    middleware: "log",
  },

  serverMiddleware: [
    bodyParser.json(),
    (req, res, next) => {
      res.setHeader('Cache-Control', 'public, max-age=31536000');
      next();
    }
  ],
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
          console.log(routes)
          return routes;
        });
    },
    fallback: true
  },
};
