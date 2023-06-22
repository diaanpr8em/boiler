<template>
    <LoadingScreen v-if="authStore.isAuthLoading"></LoadingScreen>
</template>

<script lang="ts" setup>
    definePageMeta({
        layout: "auth",
        title: "Index",
    });

    const authStore = useAuthStore()
    const router = useRouter()

    if  (authStore.loggedIn) {
        router.push('/client')
    }
</script>