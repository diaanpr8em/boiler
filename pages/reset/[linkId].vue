<template>
    <Transition name="slide-down">
        <v-alert
            v-show="resetSuccess"
            type="info"
            title="Reset Success"
            text="Your password has been reset."
            variant="tonal"
            class="absolute-center"
        >
            <template v-slot:text>
                <div class="text-container">
                    <p>Your password has been reset</p>
                    <v-btn
                        class="right-align"
                        color="primary"
                        @click="$router.push('/auth/login')"
                    >Login</v-btn>
                </div>
            </template>
        </v-alert>
    </Transition>
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

    const resetSuccess = ref(true)

    const showAlert = (value: boolean): void => {
        resetSuccess.value = value
    }
</script>

<style>
.absolute-center {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    min-width: 500px;
}

.right-align {
    float: right;
}

.text-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.slide-down-enter-from, .slide-down-leave-to {
    top: -50%;
}

.slide-down-enter-to, .slide-down-leave-from {
    top: 0;
}

.slide-down-enter-active, .slide-down-leave-active {
    transition: top .6s ease;
}
</style>