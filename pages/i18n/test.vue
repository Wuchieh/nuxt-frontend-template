<template>
  <div>
    <div>
      <NuxtLinkLocale :to="{ name: 'i18n-index' }">i18n</NuxtLinkLocale>
    </div>
    <div>{{ $t('test') }}</div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  name: 'i18n-test',
})
</script>

<style scoped lang="scss"></style>
