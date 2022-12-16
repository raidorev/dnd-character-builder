import { computed, ref } from 'vue'

export const useError = () => {
  const message = ref('')
  const hasError = computed(() => message.value !== '')
  const clearError = () => {
    message.value = ''
  }

  return { message, hasError, clearError }
}
