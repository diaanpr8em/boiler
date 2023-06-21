<template>
    <v-form>
        <div class="d-flex flex-row align-center justify-center mb-3">
            <v-btn 
                size="small"
                color="primary"
                variant="plain" 
                @click="handleWindowToggle(1)"
            >Sign in?</v-btn>
        </div>
        <div class="d-flex flex-row align-center justify-center mb-3">
            <v-btn 
                size="small"
                color="primary"
                variant="plain" 
                @click="handleWindowToggle(3)"
            >Dont have an account? Register</v-btn>
        </div>
    </v-form>
</template>

<script lang="ts" setup>
    const emit = defineEmits(['windowToggle'])
    const handleWindowToggle = (newStep: number): void => {
        emit('windowToggle', newStep)
    }
</script>