<template>
    <div></div>
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