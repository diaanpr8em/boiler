<template>
    <v-row>
        <v-col sm="7">
            <v-card>
                <v-card-text>
                    <TenantsEdit></TenantsEdit>
                </v-card-text>
            </v-card>
        </v-col>
        <v-col sm="5">
            <!-- tenant settings -->
        </v-col>
    </v-row>
</template>

<script lang="ts" setup>
    definePageMeta({
        layout: 'admin',
        title: 'Tenant details',
    });
</script>