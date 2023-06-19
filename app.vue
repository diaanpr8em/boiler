<template>
  <div>
    <NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
  const authStore = useAuthStore()

  onBeforeMount(() => {
    authStore.refreshToken()
  })
</script>
