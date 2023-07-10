<template>
    <NotificationConfirmation
        :show-alert="showCheckAction"
        :message="notificationMesg"
        @confirm="deleteUser"
        @decline="deleteCancelled"
    ></NotificationConfirmation>
    <loader v-if="isProcessing">Deleting...</loader>
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
                            to="/admin/users/new"
                            >New User</v-btn
                        >
                    </v-toolbar>
                </template>
                <template v-slot:item.actions="{ item }">
                    <v-btn
                        icon
                        size="x-small"
                        color="primary"
                        class="mx-1"
                        :to="`/admin/users/${item.columns.id}`">
                        <v-icon>mdi-eye</v-icon>
                    </v-btn>
                    <v-btn
                        icon
                        size="x-small"
                        color="error"
                        class="mx-1"
                        @click="onDeleteAction(item)">
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                </template>
            </v-data-table-server>
        </v-col>
    </v-row>
</template>

<script lang="ts" setup>
    import { Users } from '@prisma/client';
    // models
    import { UserSearchRequest, UserSearchResponse } from '~/server/models/validation/users';
    import { ReadonlyDataTableHeader } from '~/server/utils/models'

    definePageMeta({
        layout: 'admin',
        title: 'Users'
    })

    const isLoading = ref(false)
    const isProcessing = ref(false)
    const showCheckAction = ref(false)
    const notificationMesg = ref('You are about to delete this item.')
    const idToDelete = ref(0)

    const serverItems = ref<Users[]>([])
    const totalItems = ref(0)
    const itemsPerPage = ref(10)

    const headers: ReadonlyDataTableHeader[] = [
        { key: 'id', title: 'ID', value: 'id', align: 'start', sortable: false },
        { key: 'name', title: 'Name', value: 'name' },
        { key: 'surname', title: 'Surname', value: 'surname'},
        { key: 'email', title: 'Email', value: 'email'},
        { key: 'actions', title: 'Actions', value: 'actions', align: 'end', sortable: false }
    ]

    const searchRequest = reactive<UserSearchRequest>({
        page: 1,
        rows: 10,
        sortBy: [],
        searchTerm: ''
    })
    const search = async () => {
        await useFetchApi<UserSearchResponse>('/api/users/search', {
            method: 'POST',
            body: searchRequest
        }).then(({ total, records }: { total: number, records: Users[] }) => {
            serverItems.value = records
            totalItems.value = total
            isLoading.value = false
        }).catch((error: any) => {
            console.log(error)
        })
    }

    const loadItems = ({ page, itemsPerPage, sortBy}: {page: number, itemsPerPage: number, sortBy: any}) => {
        isLoading.value = true
        searchRequest.page = page
        searchRequest.rows = itemsPerPage
        searchRequest.sortBy = sortBy

        search()
    }

    const onDeleteAction = (item: any) => {
        notificationMesg.value = `You are about to delete ${item.columns.name}.`
        showCheckAction.value = true
        idToDelete.value = item.columns.id
    }

    const deleteCancelled = () => {
        showCheckAction.value = false
    }

    const deleteUser = async () => {
        isProcessing.value = true

        try {
            await useFetchApi(`/api/users/${idToDelete.value}`, {
                method: 'DELETE',
            })
            
            showCheckAction.value = false
            search()
        } catch (error) {
            console.log(error)
        } finally {
            showCheckAction.value = false
            isProcessing.value = false
        }
    }
    
</script>