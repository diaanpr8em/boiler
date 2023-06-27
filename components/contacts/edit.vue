<template>
    <v-form :disabled="checkEditable" ref="form" @submit.prevent="onSubmit">
        <Loader v-if="isLoading">Loading...</Loader>
        <div class="d-flex justify-end">
            <v-btn 
                color="primary"
                icon="mdi-pencil-circle-outline" 
                class="mb-5" 
                density="comfortable"
                variant="flat"
                v-if="update" @click="editable = !editable"
            ></v-btn>
        </div>
        <v-row>
            <v-col>
                <v-text-field
                    v-model="formData.fullName"
                    label="Full Name"
                    :rules="requiredRules('Full Name is required.')"
                    required></v-text-field>
            </v-col>
            <v-col>
                <v-text-field
                    v-model="formData.email"
                    label="Email"
                    type="email"
                    :rules="emailRules"
                    required></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-text-field
                    v-model="formData.mobile"
                    label="Mobile"
                    required></v-text-field>
            </v-col>
            <v-col>
                <v-text-field
                    v-model="formData.handle"
                    label="Handle"
                    required></v-text-field>
            </v-col>
        </v-row>
        <v-btn 
            :disabled="checkEditable"
            class="float-right mt-3 mr-3 mb-3"
            color="primary" 
            variant="flat" 
            type="submit">Submit</v-btn>
    </v-form>
</template>

<script lang="ts" setup>
import { Contacts } from '@prisma/client';

    const route = useRoute()
    const router = useRouter()
    const update = route.params.id && parseInt(route.params.id as string) > 0 ? true : false

    const form = ref<HTMLFormElement | null>(null)
    const formData = reactive({
        id: 0,
        fullName: '',
        email: '',
        mobile: '',
        handle: '',
    })   
    
    const isLoading = ref(false)

    const requiredRules = (message: string) => useValidationRules('required', '', message)
    const emailRules = useValidationRules('email')

    const loadFormData = async () => {
        isLoading.value = true
        try {
            const { contact } = await useFetchApi<{contact: Contacts}>(`/api/modules/contacts/${route.params.id}`, {
                method: 'GET'
            })
            console.log(contact)
            formData.id = contact.id
            formData.fullName = contact.fullName
            formData.email = contact.email
            formData.mobile = contact.mobile
            formData.handle = contact.handle
            isLoading.value = false
        } catch (error) {
            console.log(error)
        }
    }
    if (update) loadFormData()

    const editable = ref(false)
    const checkEditable = computed(() => {
        if (update && editable.value) {
            return false
        } else if (update && !editable.value) {
            return true
        } else {
            return false
        }
    })

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
                editable.value = false
            } else {
                const {contact} = await useFetchApi<{contact: Contacts}>('/api/modules/contacts', {
                    method: 'POST', 
                    body: formData
                })

                router.push(`/admin/contacts/${contact.id}`)
            }
        } catch (error) {
            console.log(error)
        } finally {
            isLoading.value = false
        }
    }

</script>