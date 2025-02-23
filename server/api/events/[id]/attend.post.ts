export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const id = getRouterParam(event, 'id')

  const response = await fetch(`${config.public.apiUrl}/events/${id}/join`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${getCookie(event, 'access_token')}`,
    }
  })

  return response.ok
})
