// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    'nuxt-lucide-icons',
    'dayjs-nuxt',
    '@vee-validate/nuxt',
  ],
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  imports: {
    autoImport: true
  },
  shadcn: {
    prefix: '',
    componentDir: './components/ui',
  },
  lucide: {
    namePrefix: 'Icon'
  },
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL,
      reverbKey: process.env.NUXT_PUBLIC_REVERB_APP_KEY,
      reverbHost: process.env.NUXT_PUBLIC_REVERB_HOST,
      reverbPort: process.env.NUXT_PUBLIC_REVERB_PORT,
      reverbScheme: process.env.NUXT_PUBLIC_REVERB_SCHEME,
    }
  }
})