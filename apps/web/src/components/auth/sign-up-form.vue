<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, sameAs } from '@vuelidate/validators'
import { computed, reactive, unref } from 'vue'

import { useAuth } from '@/stores/auth'

const auth = useAuth()

const state = reactive({
  email: '',
  password: '',
  passwordConfirmation: '',
})

const rules = computed(() => ({
  email: { required, email },
  password: { required, minLength: minLength(8) },
  passwordConfirmation: {
    required,
    sameAsPassword: sameAs(state.password),
  },
}))

const $v = useVuelidate(rules, state)

const createErrors = (filed: keyof typeof rules.value) =>
  computed(() => {
    if (!$v.value[filed].$dirty || !$v.value[filed].$error) return []

    return $v.value[filed].$errors.map(({ $message }) => unref($message))
  })

const emailErrors = createErrors('email')
const passwordErrors = createErrors('password')
const passwordConfirmationErrors = createErrors('passwordConfirmation')

const signUp = async () => {
  const isValid = await $v.value.$validate()
  if (!isValid) {
    $v.value.$touch()
    return
  }
  await auth.signUp(state)
}
</script>

<template>
  <v-form class="mb-3" :disabled="auth.isLoading" @submit.prevent="signUp">
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
    <v-text-field
      v-model="state.passwordConfirmation"
      label="Confirm password"
      type="password"
      required
      :error-messages="passwordConfirmationErrors"
      @focus="$v.passwordConfirmation.$touch()"
      @blur="$v.passwordConfirmation.$touch()"
    />

    <div class="text-center">
      <v-btn
        class="mb-3"
        type="submit"
        color="primary"
        :loading="auth.isLoading"
      >
        Sign Up
      </v-btn>
    </div>
  </v-form>
</template>
