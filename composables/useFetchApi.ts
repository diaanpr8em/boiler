import { useAuthStore } from "~/stores/auth"

export default (url: string, options: any = {}) => {

	const token = useAuthStore().token

	return $fetch(url, {
		...options,
		headers: {
			...options.headers,
			'Authorization': `Bearer ${token}`
		}
	})
}