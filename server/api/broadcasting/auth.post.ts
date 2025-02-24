export default defineEventHandler(async (event: any) => {
  const runtimeConfig = useRuntimeConfig()
  const body = await readBody(event)

  const response = await fetch(`${runtimeConfig.public.apiUrl}/broadcasting/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${getCookie(event, 'access_token')}`,
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    throw createError({
      status: response.status,
      statusMessage: response.statusText
    })
  }

  return await response.json()
})
