export default defineNuxtPlugin((nuxtApp) => {
    globalThis.$fetch = $fetch.create({
        onRequest({ options }) {
            const token = useCookie('access_token').value
            if (token) {
                options.headers.append('Authorization', `Bearer ${token}`)
            }
        },
        onResponseError({ response }) {
            if (response.status === 401) {
                // Remove the token cookie
                const token = useCookie('access_token')
                token.value = null

                // Redirect to login page
                navigateTo('/auth/login')
            }
        }
    })
})