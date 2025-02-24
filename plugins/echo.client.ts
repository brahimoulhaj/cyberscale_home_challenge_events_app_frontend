import Echo from 'laravel-echo'

import Pusher from 'pusher-js'
window.Pusher = Pusher;

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig()


  const echo = new Echo({
    broadcaster: 'reverb',
    key: runtimeConfig.public.reverbKey,
    authorizer: (channel: any) => {
      return {
        authorize: async (socketId: string, callback: any) => {
          $fetch('/api/broadcasting/auth', {
            method: 'POST',
            body: JSON.stringify({
              socket_id: socketId,
              channel_name: channel.name
            }),
          }).then((response) => {
            callback(null, response)
            console.info('Echo: Authorization successful')
          }).catch((error) => {
            callback(error, null)
            console.error('Echo: Authorization failed', error)
          })

        }
      };
    },
    wsHost: runtimeConfig.public.reverbHost,
    wsPort: runtimeConfig.public.reverbPort ?? 80,
    wssPort: runtimeConfig.public.reverbPort ?? 443,
    forceTLS: runtimeConfig.public.reverbScheme === 'https',
    enabledTransports: ['ws', 'wss'],
  });


  // Provide Echo globally
  nuxtApp.provide('echo', echo)
})
