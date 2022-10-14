import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuth = defineStore('auth', () => {
  const isSignedIn = ref(false)

  return { isSignedIn }
})
