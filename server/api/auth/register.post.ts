export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const body = await readBody(event)

    const response = await fetch(`${config.public.apiUrl}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(body),
    })

    const data = await response.json()

    if (response.ok) {
        if (data.success) {
            setCookie(event, 'access_token', data.data.token, {
                httpOnly: true,
                path: '/',
                maxAge: 60 * 60 * 24 * 7 // 7 days
            })
        } else {
            throw createError({
                status: 422,
                statusMessage: data.errors[0]
            })
        }
        return data
    }

    throw createError({
        status: response.status,
        statusMessage: response.statusText
    })
})