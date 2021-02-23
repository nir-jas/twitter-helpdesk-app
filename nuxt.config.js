require('dotenv').config()
import webpack from 'webpack'
export default {
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'RPT HelpDesk',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Twitter HelpDesk' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/css/main.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/dotenv',
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',

    [
      '@nuxtjs/fontawesome',
      {
        component: 'fa',
        icons: {
          solid: [
            'faUserFriends',
            'faLifeRing',
            'faSignOutAlt',
            'faComments',
            'faSearch',
            'faFilter',
            'faTimes',
            'faPhoneAlt',
            'faEnvelope',
            'faPaperPlane',
          ],
          regular: [],
          brands: ['faTwitter'],
        },
      },
    ],
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.API_URL,
  },

  auth: {
    strategies: {
      local: {
        scheme: 'refresh',
        token: {
          property: 'token',
          maxAge: false,
          type: 'Bearer',
        },
        refreshToken: {
          property: 'refreshToken',
          data: 'refresh_token',
          maxAge: false,
        },
        user: {
          property: 'data',
          autoFetch: false,
        },
        endpoints: {
          refresh: { url: '/auth/refresh', method: 'post' },
          logout: { url: '/auth/logout', method: 'post' },
          user: { url: '/auth/user', method: 'get' },
        },
      },
    },
    cookie: {
      options: {
        secure: process.env.NODE_ENV === 'production',
        expires: 30,
      },
    },
  },

  router: {
    middleware: ['auth'],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['@adonisjs/websocket-client'],
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      }),
    ],
  },
}
