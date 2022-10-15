<script lang="ts" setup>
// https://github.com/import-js/eslint-plugin-import/issues/1739
// eslint-disable-next-line import/no-unresolved
import Logo from '@/assets/logo.svg?component'

withDefaults(defineProps<{ color: string }>(), {
  color: '#fff',
})
</script>

<template>
  <Logo class="logo" viewBox="0 0 278 89" width="100" height="40" />
</template>

<style lang="scss" scoped>
.logo :deep(path) {
  fill: v-bind(color);
}
</style>
