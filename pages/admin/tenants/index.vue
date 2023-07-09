<template>
    <v-row></v-row>
</template>

<script lang="ts" setup>
    import { search } from '~/server/db/modules/contactGroups';
import { ReadonlyDataTableHeader } from '~/server/utils/models'

    definePageMeta({
        layout: 'admin',
        title: 'Tenants'
    })

    const headers: ReadonlyDataTableHeader[] = [
        
    ]

    const search = async (search: string) => {
        await useFetchApi('/api/tenants/')
    }
    search()
</script>