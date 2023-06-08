const pkg = require("./package");
const bodyParser = require("body-parser");
const axios = require("axios");

// import nuxt firebase modul



module.exports = {
  mode: "universal",
  // color-mode 設定dark mode
  modules: ["@nuxtjs/axios", "@nuxtjs/vuetify"],

  // firebase: {
  //   config: {
  //     apiKey: 'AIzaSyBY_GSIZmBRcvwqbA6ZXJzFlV3UYoO88os',
  //     projectId: 'nuxt-blog-b5610',
  //     authDomain: 'nuxt-blog-b5610.firebaseapp.com',
  //     storageBucket: 'nuxt-blog-b5610.appspot.com',
  //   },
  //   services: {
  //     database: true // enable the Firebase Realtime Database service
  //   }
  // },

  head: {
    title: pkg.name,
    // htmlAttrs: {
    //   class:'dark',
    // },
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
  loading: { color: "#54B4D3" },

  /*
   ** Global CSS
   */
  css: [
    "@/assets/css/main.css",
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
  ],



  colorMode: {
    classSuffix: "",
    preference:'dark',
    fallback:'light',
  },
  vuetify: {
    theme: {
      dark: true,
      themes: {
        dark: {
          primary:"#EC4899",
          background:"#020617",
          backgroundLight:"#141B2A",
        },
        light: {
          primary:"#0EA5E9",
          background:"#F1F5F9",
          backgroundLight:"#FFFFFF",
        }
      },
    }
  },
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
    babel: {
      plugins: [
        ["@babel/plugin-proposal-class-properties", { loose: true }],
        ["@babel/plugin-proposal-private-methods", { loose: true }],
        ["@babel/plugin-proposal-private-property-in-object", { loose: true }],
      ],
    },

    // 設定dark mode
    // postcss: {
    //   plugins: {
    //     'postcss-import': {},
    //     'postcss-nested': {},
    //     'postcss-custom-properties': {},
    //     'tailwindcss': {},
    //     'autoprefixer': {},
    //   },
    // },
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

  serverMiddleware: [bodyParser.json()],
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
