import { useAuthStore } from "~/stores/auth"

export const useFetchApi = <T>(url: string, options: any = {}): Promise<T> => {

	const token = useAuthStore().token

	return $fetch<T>(url, {
		...options,
		headers: {
			...options.headers,
			'Authorization': `Bearer ${token}`
		}
	})
}