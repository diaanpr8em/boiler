<template>
    <v-select
        :items="tenantsList"
        label="Tenant"
        item-title="name"
        item-value="id"
        :loading="loading"
        :rules="required ? requiredRules('Tenant is required') : []"
        v-model="props.modelValue"
        @update:modelValue="updateValue"
    ></v-select>
</template>

<script lang="ts" setup>
    import { Tenants } from '@prisma/client';
    
    interface IProps {
        required: boolean
        modelValue: number
    }

    const props = withDefaults(defineProps<IProps>(), {
        required: false,
    })

    let emit = defineEmits(['update:modelValue'])
    const updateValue = (value: number) => {
        emit('update:modelValue', value)
    }
    
    const requiredRules = (message: string) => useValidationRules('required', '', message)

    const tenantsList = ref<{name: string, id: number}[]>([])
    const loading = ref(false)

    const loadData = async () => {
        loading.value = true
        await useFetchApi<{tenants: Tenants[]}>('/api/tenants', {
            method: 'GET',
        }).then(({ tenants }: {tenants: Tenants[]}) => {
            tenantsList.value = tenants
        }).catch((error: any) => {
            console.log(error)
        }).finally(() => loading.value = false)
    }
    loadData()
</script>