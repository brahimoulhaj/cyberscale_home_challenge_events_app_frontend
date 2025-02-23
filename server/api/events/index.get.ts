export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()

    const response = await fetch(`${config.public.apiUrl}/events`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    })

    if (!response.ok) {
        throw createError({
            status: response.status,
            statusMessage: response.statusText
        })
    }

    return await response.json()

})