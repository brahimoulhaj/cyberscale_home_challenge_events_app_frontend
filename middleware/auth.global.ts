export default defineNuxtRouteMiddleware(async (to, from) => {
    const currentUser = useState('currentUser')

    if (!currentUser.value && !to.path.startsWith('/auth')) {
        return navigateTo({
            path: "/auth/login",
            query: {
                redirect: to.fullPath
            }
        })
    }
})
