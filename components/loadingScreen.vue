<template>
    <v-overlay 
        v-model="isLoading"
        class="align-center justify-center"
    >
        <v-progress-circular 
            indeterminate 
            color="primary" 
            size="64"
        ></v-progress-circular>
    </v-overlay>
</template>

<script lang="ts" setup>
    const isLoading = ref(true)
</script>