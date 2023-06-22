<template>
  <div>
    <div v-if="authStore.loggedIn">
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

  onBeforeMount(() => {
    authStore.refreshToken()
  })
</script>
