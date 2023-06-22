<template>
    <v-form ref="form" @submit.prevent="onSubmit">
        <v-text-field
            v-model="formData.email"
            label="Email"
            type="email"
            required></v-text-field>
        <div class="d-flex flex-row align-center justify-center mb-3">
            <v-btn 
                size="small"
                color="primary"
                variant="plain" 
                @click="handleWindowToggle(1)"
            >Sign in?</v-btn>
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
            type="submit">Submit</v-btn>
    </v-form>
</template>

<script lang="ts" setup>

    const form = ref<HTMLFormElement | null>(null)
    const formData = reactive({
        email: ''
    })   


    const emit = defineEmits(['windowToggle'])
    const handleWindowToggle = (newStep: number): void => {
        emit('windowToggle', newStep)
    }

    const onSubmit = async () => {
        try {
			const { valid } = await form.value?.validate()
			if (!valid) return

			const response = await $fetch('/api/auth/forgot', {
                method: 'POST',
                body: formData,
            })

            // TODO: handle response
		} catch (error) {
			console.log(error)
		} finally {
			console.log('finally')
		}
    }
</script>