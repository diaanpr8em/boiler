<template>
    <Transition name="slide-down">
        <v-alert
            v-show="props.showAlert"
            :type="props.type"
            :title="props.title"
            :text="props.message"
            variant="tonal"
            class="absolute-center"
        >
            <template v-slot:text>
                <div class="text-container">
                    <p>{{props.message}}</p>
                    <v-btn
                        v-if="props.nav"
                        class="right-align"
                        color="primary"
                        @click="$router.push(props.navTo ?? '/auth/login')"
                    >Login</v-btn>
                </div>
            </template>
        </v-alert>
    </Transition>
</template>

<script lang="ts" setup>

    interface IProps {
        showAlert: boolean
        type: 'info' | 'success' | 'warning' | 'error'
        title: string
        message: string
        nav: boolean
        navTo: string
        navToText: string
    }

    const props = withDefaults(defineProps<IProps>(), {
        showAlert: false,
        type: 'info',
        title: 'Alert',
        message: 'Alert message',
        nav: false,
        navTo: '',
        navToText: 'Login'
    })
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