<template>
    <loader v-if="isProcessing">Deleting...</loader>
    <v-row>
        <v-col>
            
        </v-col>
    </v-row>
</template>

<script lang="ts" setup>
definePageMeta({
    layout: "admin",
    title: "Contact Groups",
});

const isProcessing = ref(false)
</script>