<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
import { computed, reactive, unref } from 'vue'

import { useAuth } from '@/stores/auth'

const auth = useAuth()

const state = reactive({
  email: '',
  password: '',
})

const rules = computed(() => ({
  email: { required, email },
  password: { required, minLength: minLength(8) },
}))

const $v = useVuelidate(rules, state)

const createErrors = (filed: keyof typeof rules.value) =>
  computed(() => {
    if (!$v.value[filed].$dirty || !$v.value[filed].$error) return []

    return $v.value[filed].$errors.map(({ $message }) => unref($message))
  })

const emailErrors = createErrors('email')
const passwordErrors = createErrors('password')

const signIn = async () => {
  const isValid = await $v.value.$validate()
  if (!isValid) {
    $v.value.$touch()
    return
  }
  await auth.signIn(state)
}
</script>

<template>
  <v-form class="mb-3" :disabled="auth.isLoading" @submit.prevent="signIn">
    <v-snackbar :model-value="auth.error.hasError" color="error">
      {{ auth.error.message }}

      <template #actions>
        <v-btn variant="text" @click="auth.error.clearError">Close</v-btn>
      </template>
    </v-snackbar>

    <v-text-field
      v-model="state.email"
      label="Email"
      type="email"
      required
      :error-messages="emailErrors"
      @focus="$v.email.$touch()"
      @blur="$v.email.$touch()"
    />
    <v-text-field
      v-model="state.password"
      label="Password"
      type="password"
      required
      :error-messages="passwordErrors"
      @focus="$v.password.$touch()"
      @blur="$v.password.$touch()"
    />

    <div class="text-center">
      <v-btn
        class="mb-3"
        type="submit"
        color="primary"
        :loading="auth.isLoading"
      >
        Sign In
      </v-btn>
    </div>

    <p class="text-subtitle-1 text-center">
      Forgot your password?
      <router-link to="/auth/forgot-password">Reset Password</router-link>
    </p>
  </v-form>
</template>
