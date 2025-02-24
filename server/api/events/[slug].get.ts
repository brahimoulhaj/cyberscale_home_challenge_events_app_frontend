export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const slug = getRouterParam(event, 'slug')

    const response = await fetch(`${config.public.apiUrl}/events/${slug}`, {
        headers: {
            'Authorization': `Bearer ${getCookie(event, 'access_token')}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })

    if (!response.ok) {
        return new Response('Event not found', { status: 404 })
    }

    return await response.json()
})