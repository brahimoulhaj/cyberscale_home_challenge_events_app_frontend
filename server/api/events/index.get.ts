export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const query = getQuery(event)

    const response = await fetch(`${config.public.apiUrl}/events?page=${query.page || 1}`, {
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