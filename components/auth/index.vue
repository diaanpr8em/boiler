<template>
	<v-app>
		<v-main style="background-color: #e2e2e2;">
			<div class="d-flex justify-center align-center" style="height: 100vh;">
				<v-card class="my-auto" width="500">
					<v-card-title class="d-flex justify-center">
						<h3 class="my-3">{{ currentTitle }}</h3>
					</v-card-title>
					
					<v-window v-model="step">
                        <v-window-item :value="1">
							<v-card-text>
								<AuthLogin @window-toggle="toggleWindow"></AuthLogin>
							</v-card-text>
						</v-window-item>
						
                        <v-window-item :value="2">
							<v-card-text>
								<AuthForgot @window-toggle="toggleWindow"></AuthForgot>
							</v-card-text>
						</v-window-item>
						
						<v-window-item :value="3">
							<v-card-text>
								<AuthRegister @window-toggle="toggleWindow"></AuthRegister>
							</v-card-text>
						</v-window-item>

					</v-window>

				</v-card>
			</div>
		</v-main>
	</v-app>
</template>

<script lang="ts" setup>
	const step = ref(1)

    const toggleWindow = (newStep: number): void => {
        step.value = newStep
    }

	const currentTitle = computed(() => {
		switch (step.value) {
			case 1:
                return 'Login'
            case 2:
				return 'Forgot Password'
			case 3:
				return 'Register'
		}
	})
</script>