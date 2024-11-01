export default {
  head: {
    title: 'my-nuxt-project',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  
  content: [
    './components/**/*.{vue,js}',  // Все компоненты
    './layouts/**/*.vue',          // Макеты
    './pages/**/*.vue',            // Страницы
    './plugins/**/*.{js,ts}',      // Плагины
    './nuxt.config.{js,ts}',       // Файл конфигурации
  ],
  
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/styles.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
   ],

    // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['axios'],
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },

  axios: {
    baseURL: 'http://localhost:8000/',
  },
  server: {
    host: '0.0.0.0',
    post: 3000,
  }
}