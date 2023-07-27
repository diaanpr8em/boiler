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
                            <v-avatar color="primary">
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
			
			<v-app-bar
				color="primary"
			>
				<template v-slot:prepend>
					<v-app-bar-nav-icon @click="rail = !rail"></v-app-bar-nav-icon>
				</template>

				<v-app-bar-title>{{$route.meta.title}}</v-app-bar-title>

				<template v-slot:append>
                    <v-btn variant="outlined" size="small">Add Funds</v-btn>
                    <v-menu>
                        <template v-slot:activator="{ props }">
                            <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
                        </template>
                        <v-list>
							<v-list-item to="/admin">
								<v-list-item-title>Admin</v-list-item-title>
							</v-list-item>
                            <v-list-item @click="logout">
                                <v-list-item-title>Logout</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
				</template>
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

	const authStore = useAuthStore()
    const router = useRouter()

	const accounting = [
		['Billing', 'mdi-video-outline', '/client/billing'],
		['Invoicing', 'mdi-video-outline', '/client/invoicing'],
		['Payments', 'mdi-video-outline', '/client/payments'],
		['Payroll', 'mdi-video-outline', '/client/payroll'],
	]

	const communication = [
		['Email', 'mdi-email-outline', '/client/email'],
		['SMS', 'mdi-message-text-outline', '/client/sms'],
		['Chat', 'mdi-whatsapp', 'client/chat'],
		['Meetings', 'mdi-video-outline', '/client/meetings'],
		['Polls', 'mdi-video-outline', '/client/polls'],
	]
	
	const contacts = [
		['Contacts List', 'mdi-account-multiple-outline', '/client/contacts/contacts'],
        ['Contact Groups', 'mdi-account-group-outline', '/client/contacts/contact-groups']
    ]

	const hr = [

	]

	const listings = [
		['Listings', 'mdi-format-list-text', 'client/listings/listings'],
		['Portals', 'mdi-web', 'clients/listings/portals']
	]

	const support = [
		['Helpdesk', 'mdi-video-outline', '/client/helpdesk'],
		['Tickets', 'mdi-video-outline', '/client/tickets'],
	]
	
	const tasks = [
		['Task Management', 'mdi-video-outline', '/client/task-management'],
		['Time Tracking', 'mdi-video-outline', '/client/time-tracking'],
	]

	
	const items = [
		{ text: 'Communication', icon: 'mdi-send-check' },
		{ text: 'My Files', icon: 'mdi-folder' },
		{ text: 'Shared with me', icon: 'mdi-folder-account-outline' },
		{ text: 'Training', icon: 'mdi-human-male-board' },
	]

    const logout = () => {
        authStore.logout()
        router.push('/')
    }

</script>