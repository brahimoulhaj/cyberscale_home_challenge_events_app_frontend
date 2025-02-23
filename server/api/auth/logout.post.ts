export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const response = await fetch(`${config.public.apiUrl}/auth/logout`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${getCookie(event, 'access_token')}`,
    }
  })
  return response.ok;
})