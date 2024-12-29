export default {
  head: {
    title: 'my-nuxt-project',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/images/categories/yangi-uskunalar-24px.png' }
    ],
  },

  content: [
   
  ],

  css: [
    '@/assets/css/tailwind.css',
    '@/assets/fonts/Roboto/stylesheet.css',
  ],

  components: true,

  buildModules: [],

  modules: [],

  build: {
    transpile: ['axios'],
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },

  axios: {
    baseURL: 'http://localhost:8000/',
  },

  // Server Configuration
  // server: {
  //   host: '0.0.0.0',
  //   port: 3000,
  // },

  API_HOST: 'http://localhost:8000',


};
