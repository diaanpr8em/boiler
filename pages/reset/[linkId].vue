<template>
    <Notification
        :show-alert="resetSuccess"
        type="info"
        title="Reset Success"
        message="Your password has been reset."
        :nav="true"
        nav-to="/auth/login"
        nav-to-text="Login"
    ></Notification>
    <div class="d-flex justify-center align-center" style="height: 100vh;">
        <v-card class="my-auto" width="500">
            <v-card-title class="d-flex justify-center">
                <h3 class="my-3">Reset Password</h3>
            </v-card-title>
            <v-card-text>
                <AuthReset @show-reset-success="showAlert"></AuthReset>
            </v-card-text>
        </v-card>
    </div>
</template>

<script lang="ts" setup>
    definePageMeta({
        layout: "auth",
        title: "Reset Password",
    });

    const resetSuccess = ref(false)

    const showAlert = (value: boolean): void => {
        resetSuccess.value = value
    }
</script>