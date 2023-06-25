<template>
	<v-app>
		<v-layout>

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
						<template v-slot:prepend>
                            <v-avatar color="blue-grey-darken-4">
                                <span class="text-h6">DP</span>
                            </v-avatar>
                        </template>
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
                        title="Dashboard"
                        prepend-icon="mdi-view-dashboard-outline"
                        to="/admin"
                    ></v-list-item>

                    <v-list-group value="Contacts">
                        <template v-slot:activator="{ props }">
                            <v-list-item
                                v-bind="props"
                                prepend-icon="mdi-account-multiple-outline"
                                title="Contacts"
                            ></v-list-item>
                        </template>

                        <v-list-item 
                            v-for="([title, icon, href], i) in contacts"
                            :key="i"
                            :title="title"
                            :prepend-icon="icon"
                            :value="title"
                            :to="href"
                        ></v-list-item>
                    </v-list-group>

					<v-list-group value="Users">
                        <template v-slot:activator="{ props }">
                            <v-list-item
                                v-bind="props"
                                prepend-icon="mdi-account-outline"
                                title="Users"
                            ></v-list-item>
                        </template>

                        <v-list-item 
                            v-for="([title, icon, href], j) in users"
                            :key="j"
                            :title="title"
                            :prepend-icon="icon"
                            :value="title"
                            :to="href"
                        ></v-list-item>
                    </v-list-group>
				</v-list>
			</v-navigation-drawer>

			<v-app-bar
				color="blue-grey-darken-4"
			>
				<template v-slot:prepend>
					<v-app-bar-nav-icon @click="rail = !rail"></v-app-bar-nav-icon>
				</template>

				<v-app-bar-title>{{$route.meta.title}}</v-app-bar-title>

				<v-menu>
					<template v-slot:activator="{ props }">
						<v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
					</template>
					<v-list>
						<v-list-item to="/client">
							<v-list-item-title>Client</v-list-item-title>
						</v-list-item>
						<v-list-item @click="logout">
							<v-list-item-title>Logout</v-list-item-title>
						</v-list-item>
					</v-list>
				</v-menu>
			</v-app-bar>

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

	const router = useRouter()

	const authStore = useAuthStore()
    const contacts = [
        ['Contacts', 'mdi-account-multiple-outline', '/admin/contacts'],
        ['Contact Groups', 'mdi-history', '/admin/contact-groups']
    ]
    const users = [
        ['Users', 'mdi-star', '/admin/users'],
        ['Tenants', 'mdi-check-circle', '/admin/tenants'],
        ['Subscriptions', 'mdi-check-circle', '/admin/subscriptions'],
    ]

	const logout = () => {
        authStore.logout()
        router.push('/')
    }
</script>