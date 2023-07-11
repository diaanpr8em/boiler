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
                    v-model="formData.name"
                    label="Tenant Name"
                    :rules="requiredRules('Name is required.')"
                    required></v-text-field>
            </v-col>
            <v-col>
                <v-text-field
                    v-model="formData.domain"
                    label="Domain"
                    :rules="requiredRules('Domain is required.')"
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
    import { Tenants } from '@prisma/client';

    const route = useRoute()
    const router = useRouter()
    const update = route.params.id && parseInt(route.params.id as string) > 0 ? true : false

    const requiredRules = (message: string) => useValidationRules('required', '', message)

    const form = ref<HTMLFormElement | null>(null)
    const formData = reactive({
        id: 0,
        name: '',
        domain: '',
    }) 

    const isLoading = ref(false)
    const editable = ref(false)

    const loadFormData = async () => {
        isLoading.value = true
        try {
            const { tenant } = await useFetchApi<{tenant: Tenants}>(`/api/tenants/${route.params.id}`, {
                method: 'GET'
            })
            formData.id = tenant.id
            formData.name = tenant.name
            formData.domain = tenant.domain
            isLoading.value = false
        } catch (error) {
            console.log(error)
        }
    }
    if (update) loadFormData()

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
                const response = await useFetchApi(`/api/tenants`, {
                    method: 'PUT', 
                    body: formData
                })
                editable.value = false
            } else {
                const {tenant} = await useFetchApi<{tenant: Tenants}>('/api/tenants', {
                    method: 'POST', 
                    body: formData
                })

                router.push(`/admin/tenants/${tenant.id}`)
            }
        } catch (error) {
            console.log(error)
        } finally {
            isLoading.value = false
        }
    }
</script>