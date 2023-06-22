<template>
	<v-dialog v-model="isLoading" persistent width="300">
		<v-card class="bg-gradient-success" theme="dark" width="300">
			<v-card-text class="text-center">
				<span style="color: white">
				<slot />
				</span>
				<v-progress-linear indeterminate color="white" class="mb-0" dark />
			</v-card-text>
		</v-card>
  	</v-dialog>
</template>

<script lang="ts" setup>
	const isLoading = ref(true)
</script>