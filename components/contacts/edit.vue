<template>
    <v-form ref="form" @submit.prevent="onSubmit">
        <Loader v-if="isLoading">Loading...</Loader>
        <v-text-field
            v-model="formData.fullName"
            label="Full Name"
            :rules="requiredRules('Full Name is required.')"
            required></v-text-field>
        <v-text-field
            v-model="formData.email"
            label="Email"
            type="email"
            :rules="emailRules"
            required></v-text-field>
        <v-text-field
            v-model="formData.mobile"
            label="Mobile"
            required></v-text-field>
        <v-text-field
            v-model="formData.handle"
            label="Handle"
            :rules="requiredRules('Handle is required.')"
            required></v-text-field>
        <v-btn 
            class="float-right mt-3 mr-3 mb-3"
            color="primary" 
            variant="flat" 
            type="submit">Submit</v-btn>
    </v-form>
</template>

<script lang="ts" setup>
import { Contacts } from '@prisma/client';

    const route = useRoute()
    const update = route.params.id && parseInt(route.params.id as string) > 0 ? true : false

    const form = ref<HTMLFormElement | null>(null)
    const formData = reactive({
        id: 0,
        fullName: '',
        email: '',
        mobile: '',
        handle: ''
    })   
    
    const isLoading = ref(false)

    const requiredRules = (message: string) => useValidationRules('required', '', message)
    const emailRules = useValidationRules('email')

    const loadFormData = async () => {
        isLoading.value = true
        try {
            const response = await useFetchApi<Contacts>(`/api/modules/contacts/${route.params.id}`, {
                method: 'GET'
            })
            formData.id = response.id
            formData.fullName = response.fullName
            formData.email = response.email
            formData.mobile = response.mobile
            formData.handle = response.handle
            isLoading.value = false
        } catch (error) {
            console.log(error)
        }
    }
    if (update) loadFormData()

    const onSubmit = async () => {
        try {
            const { valid } = await form.value?.validate()
			if (!valid) return
            isLoading.value = true
            if (update) {
                formData.id = parseInt(route.params.id as string)
                const response = await useFetchApi(`/api/modules/contacts`, {
                    method: 'PUT', 
                    body: formData
                })
            } else {
                const response = await useFetchApi<Contacts>('/api/modules/contacts', {
                    method: 'POST', 
                    body: formData
                })

            }
        } catch (error) {
            console.log(error)
        } finally {
            isLoading.value = false
        }
    }

</script>