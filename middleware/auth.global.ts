import UrlPattern from 'url-pattern'

export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore()
    const adminRoutes = [
        '/admin/*',
        '/admin'
    ]

    const matched = [...adminRoutes].some(endpoint => {
		const pattern = new UrlPattern(endpoint)
		return pattern.match(to.path as string)
	})
    if (!matched) return

    if (authStore.role != 'ADMIN' && from.path != to.path) {
        return navigateTo(from.path)
    } else if (authStore.role != 'ADMIN' && from.path == to.path) {
        return navigateTo('/')
    }
})