<template>
    <v-container>
        <v-row>
            <v-col>
                <h1>Home</h1>
                <v-btn color="primary" variant="flat" @click="logout">Logout</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts" setup>
    const authStore = useAuthStore()

    const logout = () => {
        authStore.logout()
    }

</script>