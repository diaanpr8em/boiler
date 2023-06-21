<template>
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
        <div class="d-flex flex-row align-center justify-center mb-3">
            <v-btn 
                size="small"
                color="primary"
                variant="plain" 
                @click="handleWindowToggle(2)"
            >Forgot Password?</v-btn>
        </div>
        <div class="d-flex flex-row align-center justify-center mb-3">
            <v-btn 
                size="small"
                color="primary"
                variant="plain" 
                @click="handleWindowToggle(3)"
            >Dont have an account? Register</v-btn>
        </div>
        <v-btn 
            class="float-right mt-3 mr-3 mb-3"
            color="primary" 
            variant="flat" 
            type="submit">Login</v-btn>
    </v-form>
</template>

<script lang="ts" setup>
	const hidePass = ref(true)
	const form = ref<HTMLFormElement | null>(null)

	const authStore = useAuthStore()
	const router = useRouter()

    const emit = defineEmits(['windowToggle'])
    const handleWindowToggle = (newStep: number): void => {
        emit('windowToggle', newStep)
    }

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
			if (!valid) return

			const response = await useAsyncData('login', () => authStore.login(formData)) 
			if (authStore.token) router.push('/')
		} catch (error) {
			console.log(error)
		} finally {
			console.log('finally')
		}
	}
</script>