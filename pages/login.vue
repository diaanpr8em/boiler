<template>
	<v-card class="my-auto" width="500">
		<v-card-title class="d-flex justify-center">
			<h3 class="my-3">Login</h3>
		</v-card-title>
		<v-card-text>
			<v-form ref="form"  @submit.prevent="onSubmit">
				<v-text-field
					label="E-mail"
					variant="outlined"
					v-model="formData.email"
					:rules="emailRules"
				></v-text-field>
				<v-text-field 
					class="mt-3"
					label="Password"
					variant="outlined"
					v-model="formData.password"
					:rules="passwordRules"
					:type="hidePass ? 'password' : 'text'"
					:append-inner-icon="hidePass ? 'mdi-eye-outline' : 'mdi-eye-off-outline'" 
					@click:append-inner="togglePassword" 
				></v-text-field>
				<v-btn 
					class="float-right mt-3 mr-3 mb-3"
					color="primary" 
					variant="flat" 
					type="submit">Login</v-btn>
			</v-form>
		</v-card-text>
	</v-card>
</template>

<script lang="ts" setup>
	import { userLogin } from "~/server/models/user"
	import { z } from 'zod'

	type userLoginInput = z.infer<typeof userLogin>

	definePageMeta({
		layout: 'auth',
	})

	const { login } = useAuth()

	const hidePass = ref(true)
	const form = ref<HTMLFormElement | null>(null)

	const formData = reactive({
		email: '',
		password: ''
	})

	const emailRules = [
		(value: string) => {
			if (value) return true

			return 'E-mail is requred.'
		},
		(value: string) => {
			if (/.+@.+\..+/.test(value)) return true

			return 'E-mail must be valid.'
		},
	]

	const passwordRules = [
		(value: string) => {
			if (value) return true

			return 'Password is requred.'
		},
		(value: string) => {
			if (value.length >= 8) return true

			return 'Password must be at least 8 characters.'
		}
	]

	const togglePassword = (): void => {
		hidePass.value = !hidePass.value
	}

	const onSubmit = async (): Promise<void> => {
		try {
			const { valid } = await form.value?.validate()
			console.log('submit called')
			console.log('valid', valid)
			if (!valid) return
			await login(formData)
			console.log('submit')
		} catch (error) {
			console.log(error)
		} finally {
			console.log('finally')
		}
	}
</script>