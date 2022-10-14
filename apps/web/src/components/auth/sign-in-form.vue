<script lang="ts" setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')

const signIn = () => {
  console.log(email.value, password.value)
}
</script>

<template>
  <v-form class="mb-3" @submit.prevent="signIn">
    <v-text-field v-model="email" label="Email" type="email" required />
    <v-text-field
      v-model="password"
      label="Password"
      type="password"
      required
    />

    <div class="text-center">
      <v-btn class="mb-3" type="submit" color="primary ">Sign In</v-btn>
    </div>

    <p class="text-subtitle-1 text-center">
      Forgot your password?
      <router-link to="/auth/forgot-password">Reset Password</router-link>
    </p>
  </v-form>
</template>
