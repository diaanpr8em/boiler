<template>
    <v-form ref="form"  @submit.prevent="onSubmit">
        <loader v-if="isLoading">Loading...</loader>
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
        <v-text-field 
            class="mt-3"
            label="Confirm Password"
            variant="outlined"
            v-model="formData.passwordConfirmation"
            :rules="confirmPasswordRules"
            :type="hideConfirmPass ? 'password' : 'text'"
            :append-inner-icon="hidePass ? 'mdi-eye-outline' : 'mdi-eye-off-outline'" 
            @click:append-inner="toggleConfirmPassword" 
        ></v-text-field>
        <v-btn 
            class="float-right mt-3 mr-3 mb-3"
            color="primary" 
            variant="flat" 
            type="submit">Reset Password</v-btn>
            
    </v-form>
</template>

<script lang="ts" setup>
    const hidePass = ref(true)
    const hideConfirmPass = ref(true)
    const isLoading = ref(false)
    const resetSuccess = ref(true)

    const route = useRoute()
    const linkId = route.params.linkId;

    const form = ref<HTMLFormElement | null>(null)
    const router = useRouter()

    const formData = reactive({
        linkId: linkId,
        password: '',
        passwordConfirmation: ''
    })

    const emit = defineEmits(['showResetSuccess'])
    const showResetSuccess = (): void => {
        emit('showResetSuccess', true)
    }

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

    const confirmPasswordRules = [
        (value: string) => {
            if (value) return true
            return 'Password confirmation is required.'
        },
        (value: string) => {
            if (value === formData.password) return true
            return 'Password confirmation must match.'
        }
    ]

    const togglePassword = (): void => {
		hidePass.value = !hidePass.value
	}
    const toggleConfirmPassword = (): void => {
		hideConfirmPass.value = !hideConfirmPass.value
	}

    const onSubmit = async (): Promise<void> => {
        isLoading.value = true
        try {
			const { valid } = await form.value?.validate()
			if (!valid) return

			const response = await $fetch('/api/auth/reset', {
                method: 'POST',
                body: formData
            })

            showResetSuccess()
		} catch (error) {
			console.log(error)
		} finally {
			isLoading.value = false
		}
    }

</script>