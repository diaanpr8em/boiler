<template>
    <v-form ref="form" @submit.prevent="register">
        <loader v-if="isLoading">Loading...</loader>
        <v-text-field
            label="Name"
            variant="outlined"
            v-model="formData.name"
            :rules="requiredRules('Name is required.')"
        ></v-text-field>
        <v-text-field
            label="Surname"
            variant="outlined"
            v-model="formData.surname"
            :rules="requiredRules('Surname is required.')"
        ></v-text-field>
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
        <!-- center the buttons -->
        <div class="d-flex flex-row align-center justify-center mb-3">
            <v-btn 
                size="small"
                color="primary"
                variant="plain" 
                @click="handleWindowToggle(1)"
            >Already have an account? Sign in</v-btn>
        </div>
        <div>
            <v-btn 
                class="float-right mt-3 mr-3 mb-3"
                color="primary" 
                variant="flat" 
                type="submit"
            >Register</v-btn>
        </div>
    </v-form>
</template>

<script lang="ts" setup>
    const hidePass = ref(true)
    const hideConfirmPass = ref(true)
    const isLoading = ref(false)
    const form = ref<HTMLFormElement | null>(null)
    const router = useRouter()

    const formData = reactive({
		email: '',
		password: '',
        passwordConfirmation: '',
        name: '',
        surname: ''
	})

    const requiredRules = (message: string) => useValidationRules('required', '', message)

    const emailRules = useValidationRules('email')

	const passwordRules = useValidationRules('password')

    const confirmPasswordRules = useValidationRules('confirmPassword', formData.password)

    const emit = defineEmits(['windowToggle'])
    const handleWindowToggle = (newStep: number): void => {
        emit('windowToggle', newStep)
    }

    const togglePassword = (): void => {
		hidePass.value = !hidePass.value
	}
    const toggleConfirmPassword = (): void => {
		hideConfirmPass.value = !hideConfirmPass.value
	}

    const register = async (): Promise<void> => {
        try {
            const { valid } = await form.value?.validate()
            if (!valid) return
            isLoading.value = true
            const response = await $fetch('/api/auth/register', {
                method: 'POST',
                body: formData
            })

            if (response) {
                isLoading.value = false
                emit('windowToggle', 1)
            }
        } catch (error) {
            console.log(error)
        }
    }
</script>