import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuth = defineStore('auth', () => {
  const isLoggedIn = ref(false)

  return { isLoggedIn }
})
