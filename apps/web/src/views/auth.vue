<script lang="ts" setup>
import { ref } from 'vue'

import BaseLogo from '@/components/app-logo.vue'
import SignInForm from '@/components/auth/sign-in-form.vue'
import SignUpForm from '@/components/auth/sign-up-form.vue'

const isSignUp = ref(false)

const toggleSignUp = () => {
  isSignUp.value = !isSignUp.value
}
</script>

<template>
  <v-row class="h-100" align="center" justify="center">
    <v-col cols="12" sm="10" md="8" lg="6">
      <v-sheet rounded elevation="5">
        <v-row no-gutters>
          <v-col cols="12" md="6" class="d-flex justify-center pa-3">
            <div class="w-100">
              <div class="d-flex align-center justify-center">
                <BaseLogo color="rgb(var(--v-theme-primary))" />
              </div>

              <p class="text-subtitle-1 text-center mb-3">
                Sign In to get access to some features
              </p>

              <v-scroll-x-transition mode="out-in">
                <SignUpForm v-if="isSignUp" />
                <SignInForm v-else />
              </v-scroll-x-transition>

              <p v-if="isSignUp" class="text-subtitle-1 text-center">
                Already have an account?
                <a href="#" role="button" @click.prevent="toggleSignUp">
                  Sign In
                </a>
              </p>

              <p v-else class="text-subtitle-1 text-center">
                Don't have an account?
                <a href="#" role="button" @click.prevent="toggleSignUp">
                  Sign Up
                </a>
              </p>

              <div class="horizontal-line-with-text my-3">
                <div />
                <span>Or</span>
                <div />
              </div>

              <p class="text-subtitle-1 text-center mb-2">
                Continue with social media
              </p>
              <div class="d-flex justify-center">
                <v-btn
                  class="mr-2"
                  variant="flat"
                  color="primary"
                  icon="mdi-google"
                />
                <v-btn variant="flat" color="primary" icon="mdi-github" />
              </div>
            </div>
          </v-col>
          <v-col cols="6" class="d-none d-md-block">
            <v-img class="h-100" src="https://picsum.photos/1000" cover />
          </v-col>
        </v-row>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<style lang="scss" scoped>
.horizontal-line-with-text {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9e9e9e;
  text-align: center;
  user-select: none;

  div {
    height: 1px;
    flex: 1;
    background-color: currentcolor;
  }

  span {
    margin: 0 0.75rem;
    font-size: 1rem;
  }
}
</style>
