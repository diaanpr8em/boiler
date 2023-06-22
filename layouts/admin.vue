<template>
	<v-app>
		<v-layout>
			<v-app-bar
				color="primary"
				density="compact"
			>
				<template v-slot:prepend>
					<v-app-bar-nav-icon @click="rail = !rail"></v-app-bar-nav-icon>
				</template>

				<v-app-bar-title>Photos</v-app-bar-title>

				<template v-slot:append>
					<v-btn icon="mdi-dots-vertical"></v-btn>
				</template>
			</v-app-bar>

			<v-navigation-drawer
				v-model="drawer"
				:rail="rail"
				permanent
			>
				<v-list>
					<v-list-item
						:title="authStore.userName"
						:subtitle="authStore.userEmail"
					>
						<template v-slot:append>
							<v-btn
								size="small"
								variant="text"
								icon="mdi-menu-down"
							></v-btn>
						</template>
					</v-list-item>
				</v-list>

				<v-divider></v-divider>

				<v-list
					:lines="false"
					density="compact"
					nav
				>
					<v-list-item
						v-for="(item, i) in items"
						:key="i"
						:value="item"
						color="primary"
					>
						<template v-slot:prepend>
							<v-icon :icon="item.icon"></v-icon>
						</template>
						<v-list-item-title v-text="item.text"></v-list-item-title>
					</v-list-item>
				</v-list>
			</v-navigation-drawer>

			<v-main>
				<v-container fluid>
				<slot />
				</v-container>
			</v-main>
		</v-layout>
	</v-app>
</template>

<script lang="ts" setup>
	const drawer = ref(true)
	const rail = ref(false)

	const authStore = useAuthStore()

	const items = [
        { text: 'My Files', icon: 'mdi-folder' },
        { text: 'Shared with me', icon: 'mdi-account-multiple' },
        { text: 'Starred', icon: 'mdi-star' },
        { text: 'Recent', icon: 'mdi-history' },
        { text: 'Offline', icon: 'mdi-check-circle' },
        { text: 'Uploads', icon: 'mdi-upload' },
        { text: 'Backups', icon: 'mdi-cloud-upload' },
	]
</script>