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
                    label="Name"
                    :rules="requiredRules('Name is required.')"
                    required></v-text-field>
            </v-col>
            <v-col>
                <v-text-field
                    v-model="formData.surname"
                    label="Surname"
                    :rules="requiredRules('Surname is required.')"
                    required></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-text-field
                    v-model="formData.email"
                    label="Email"
                    :rules="emailRules"
                    required></v-text-field>
            </v-col>
            <v-col>
                <v-select
                    :items="[
                        {id: 'ADMIN', title: 'Admin' },
                        {id: 'CLIENTADMIN', title: 'Client Admin' },
                        {id: 'USER', title: 'User'},
                    ]"
                    item-title="title"
                    item-value="id"
                    v-model="formData.userRole"
                    label="Role"
                    :rules="requiredRules('Role is required.')"
                ></v-select>
            </v-col>
        </v-row>
        <v-row v-if="!update">
            <v-col>
                <v-text-field 
                    label="Password"
                    variant="outlined"
                    v-model="formData.password"
                    :rules="passwordRules"
                    :type="hidePass ? 'password' : 'text'"
                    :append-inner-icon="hidePass ? 'mdi-eye-outline' : 'mdi-eye-off-outline'" 
                    @click:append-inner="togglePassword" 
                ></v-text-field>
            </v-col>
            <v-col>
                <v-text-field 
                    label="Confirm Password"
                    variant="outlined"
                    v-model="formData.passwordConfirmation"
                    :rules="confirmPasswordRules"
                    :type="hideConfirmPass ? 'password' : 'text'"
                    :append-inner-icon="hideConfirmPass ? 'mdi-eye-outline' : 'mdi-eye-off-outline'" 
                    @click:append-inner="toggleConfirmPassword" 
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row v-if="!update && formData.tenantId != undefined">
            <v-col>
                <SelectTenant 
                    :required="true"
                    v-model="formData.tenantId"
                ></SelectTenant>
            </v-col>
            <v-col></v-col>
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
    import { Users } from '@prisma/client'

    const route = useRoute()
    const router = useRouter()
    const update = route.params.id && parseInt(route.params.id as string) > 0 ? true : false
    
    const form = ref<HTMLFormElement | null>(null)

    interface IFormModel {
        id: number
        name: string
        surname: string
        email: string
        userRole: string
        tenantId?: number
        password?: string
        passwordConfirmation?: string
    }

    const formData = reactive<IFormModel>({
        id: 0,
        name: '',
        surname: '',
        email: '',
        userRole: '',
        tenantId: 0,
        password: '',
        passwordConfirmation: '',
    })

    const requiredRules = (message: string) => useValidationRules('required', '', message)
    const emailRules = useValidationRules('email')
    const passwordRules = useValidationRules('password')
    let confirmPasswordRules = useValidationRules('confirmPassword', formData.password)
    watch(() => formData.passwordConfirmation, () => confirmPasswordRules = useValidationRules('confirmPassword', formData.password))
    
    const isLoading = ref(false)
    const editable = ref(false)
    const hidePass = ref(true)
    const hideConfirmPass = ref(true)

    const togglePassword = (): void => {
		hidePass.value = !hidePass.value
	}
    const toggleConfirmPassword = (): void => {
		hideConfirmPass.value = !hideConfirmPass.value
	}

    const loadFormData = async () => {
        isLoading.value = true
        try {
            const { user } = await useFetchApi<{user: Users}>(`/api/users/${route.params.id}`, { 
                method: 'GET' 
            })
            formData.id = user.id
            formData.name = user.name
            formData.surname = user.surname
            formData.email = user.email
            formData.userRole = user.UserRole
            // formData.tenantId = user.
        } catch (error) {
            console.log(error)
        } finally {
            isLoading.value = false
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
                
                // password reset should be handled separately
                const formDataCopy = {...formData}
                delete formDataCopy.passwordConfirmation
                delete formDataCopy.password
                delete formDataCopy.tenantId
                const response = await useFetchApi(`/api/users`, {
                    method: 'PUT', 
                    body: formDataCopy
                })
                editable.value = false
            } else {
                const {user} = await useFetchApi<{user: Users}>('/api/users', {
                    method: 'POST', 
                    body: formData
                })

                router.push(`/admin/users/${user.id}`)
            }
        } catch (error) {
            console.log(error)
        } finally {
            isLoading.value = false
        }
    }
</script>