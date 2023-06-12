<template>
	<v-container>
		<v-row>
			<v-col>
				<h1>Home</h1>
				<v-btn color="primary" variant="flat" @click="navigateTo('/login')">login</v-btn>
				<slot />
			</v-col>
		</v-row>
	</v-container>
</template>