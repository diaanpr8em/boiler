<template>
    <Transition name="slide-down">
        <v-alert
            v-show="props.showAlert"
            :type="props.type"
            :title="props.title"
            :text="props.message"
            variant="flat"
            class="absolute-center"
        >
            <template v-slot:text>
                <div class="d-flex">
                    <p>{{props.message}}</p>
                </div>
                <div class="d-flex justify-end mt-2">
                    <v-btn
                        class="mr-3"
                        color="tertiary"
                        @click="handleDecline"
                    >{{ declineText }}</v-btn>
                    <v-btn
                        color="error"
                        @click="handleConfirm"
                    >{{ confirmText }}</v-btn>
                </div>
            </template>
        </v-alert>
    </Transition>
</template>

<script lang="ts" setup>

    interface IProps {
        showAlert: boolean
        type?: 'info' | 'success' | 'warning' | 'error'
        title?: string
        message?: string
        confirmText?: string
        declineText?: string
    }

    const props = withDefaults(defineProps<IProps>(), {
        showAlert: false,
        type: 'warning',
        title: 'Are you sure?',
        message: 'You are about to delete this item.',
        confirmText: 'Yes',
        declineText: 'Cancel',
    })

    const emits = defineEmits(['confirm', 'decline'])
    const handleConfirm = (): void => {
        emits('confirm')
    }
    const handleDecline = (): void => {
        emits('decline')
    }

</script>

<style>
.absolute-center {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    min-width: 500px;
    z-index: 1000;
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