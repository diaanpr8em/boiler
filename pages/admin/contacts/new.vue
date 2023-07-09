<template>
    <v-row>
        <v-col>
            <v-card>
                <v-card-text>
                    <ContactsEdit :admin="true"></ContactsEdit>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script lang="ts" setup>

    definePageMeta({
        layout: 'admin',
        title: 'Add New Contact'
    })

</script>