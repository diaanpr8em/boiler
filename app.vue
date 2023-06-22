<template>
  <div>
    <LoadingScreen v-if="authStore.isAuthLoading"></LoadingScreen>
    <div v-else-if="authStore.loggedIn || route.meta.title == 'Reset Password'">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
    <div v-else>
      <auth></auth>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const authStore = useAuthStore()
  const route = useRoute()

  onBeforeMount(() => {
    authStore.refreshToken()
  })
</script>
