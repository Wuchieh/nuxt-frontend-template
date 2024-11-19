<template>
  <div>
    <div>
      <NuxtLinkLocale :to="{ name: 'i18n-test' }">Test</NuxtLinkLocale>
    </div>
    <div>{{ $t('welcome') }}</div>
    <div>
      <button @click="setLocale('en')">en</button>
      <button @click="setLocale('tw')">tw</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const { setLocale } = useI18n()

definePageMeta({
  name: 'i18n-index',
})
</script>

<style scoped lang="scss"></style>
