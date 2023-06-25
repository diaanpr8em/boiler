<template>
    <v-row>
        <v-col>
            <v-data-table-server
                v-model:items-per-page="itemsPerPage"
                :headers="headers"
                :items-length="totalItems"
                :items="serverItems"
                :loading="isLoading"
                class="elevation-1"
                item-value="id"
                density="compact"
                @update:options="loadItems"
            >
                <template v-slot:top>
                    <v-toolbar flat>
                        <v-form style="min-width: 300px;" @submit.prevent="search()">
                            <v-text-field
                                v-model="searchRequest.searchTerm"
                                label="Search"
                                single-line
                                hide-details
                                variant="underlined"
                                class="ml-4"
                            >
                                <template v-slot:append>
                                    <v-btn
                                        density="comfortable"
                                        icon="mdi-magnify"
                                        size="small"
                                        variant="flat"
                                        type="submit"
                                        color="primary"
                                    >
                                    </v-btn>                                    
                                </template>
                            </v-text-field>
                        </v-form>
                        <v-spacer></v-spacer>
                        <v-btn
                            variant="flat"
                            size="small"
                            color="primary"
                            to="/admin/contacts/new"
                            >New Contact</v-btn
                        >
                    </v-toolbar>
                </template>
                <template v-slot:item.actions="{ item }">
                    <v-btn
                        icon
                        size="x-small"
                        color="primary"
                        class="mx-1"
                        :to="`/admin/contacts/${item.columns.id}`">
                        <v-icon>mdi-eye</v-icon>
                    </v-btn>
                    <v-btn
                        icon
                        size="x-small"
                        color="info"
                        class="mx-1"
                        @click="() => {}">
                        <v-icon>mdi-email</v-icon>
                    </v-btn>
                    <v-btn
                        icon
                        size="x-small"
                        color="error"
                        class="mx-1"
                        @click="() => {}">
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                </template>
            </v-data-table-server>
        </v-col>
    </v-row>
</template>

<script lang="ts" setup>
    import { Contacts } from '@prisma/client';
    import { z } from 'zod';
    import { VDataTable } from 'vuetify/lib/labs/components.mjs'
    // models
    import { ContactsSearchResponse } from '~/server/models/modules/contacts';
    import { contactSearchSchema } from '~/server/models/validation/modules/contacts';

    definePageMeta({
        layout: "admin",
        title: "Contacts",
    });

    const route = useRoute();

    const isLoading = ref(false)
    const serverItems = ref<Contacts[]>([])
    const totalItems = ref(0)
    const itemsPerPage = ref(10)

    // WTF is this?
    type UnwrapReadonlyArrayType<A> = A extends Readonly<Array<infer I>> ? UnwrapReadonlyArrayType<I> : A
    type DT = InstanceType<typeof VDataTable>;
    type ReadonlyDataTableHeader = UnwrapReadonlyArrayType<DT['headers']>;
    const headers: ReadonlyDataTableHeader[] = [
        { key: 'id', title: 'ID', value: 'id', align: 'start', sortable: false },
        { key: 'fullName', title: 'Name', value: 'fullName' },
        { key: 'email', title: 'Email', value: 'email' },
        { key: 'mobile', title: 'Mobile', value: 'mobile' },
        { key: 'handle', title: 'Handle', value: 'handle' },
        { key: 'actions', title: 'Actions', value: 'actions', align: 'end', sortable: false }
    ]

    type SearchRequest = z.infer<typeof contactSearchSchema>;
    const searchRequest: SearchRequest = {
        page: 1,
        rows: 10,
        searchTerm: ''
    }
    const search = async () => {
        await useFetchApi<ContactsSearchResponse>('/api/modules/contacts/search', {
            method: 'POST',
            body: searchRequest,
        }).then(({ total, records } : {total: number, records: Contacts[]}) => {
            serverItems.value = records
            totalItems.value = total
            isLoading.value = false
        }).catch((error: any) => {
            console.log(error)
        });
    }
    search();

    const loadItems = ({ page, itemsPerPage, sortBy}: {page: number, itemsPerPage: number, sortBy: any}) => {
        isLoading.value = true
        searchRequest.page = page
        searchRequest.rows = itemsPerPage
        searchRequest.sortBy = sortBy

        search()
    }
</script>