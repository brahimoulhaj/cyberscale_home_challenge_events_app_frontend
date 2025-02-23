export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const response = await fetch(`${config.public.apiUrl}/auth/me`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${getCookie(event, 'access_token')}`,
        }
    })

    const data = await response.json()

    if (response.ok) {
        return data.data.user
    }

    throw createError({
        status: response.status,
        statusMessage: response.statusText
    })
})