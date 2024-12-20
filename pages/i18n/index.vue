<template>
  <div>
    <div>
      <NuxtLinkLocale :to="{ name: 'i18n-test' }">Test</NuxtLinkLocale>
    </div>
    <div>{{ $t('welcome') }}</div>
    <div>
      <button v-for="v in availableLocales" :key="v.code" @click="setLocale(v.code)">
        {{ v.name }}
      </button>
    </div>
    <div>{{ locale }}</div>
  </div>
</template>

<script setup lang="ts">
const i18n = useI18n()
const { setLocale, locales, locale } = i18n

const availableLocales = computed(() => {
  return locales.value //.filter((i) => i.code !== locale.value)
})

definePageMeta({
  name: 'i18n-index',
})

onMounted(() => {
  console.log(useBrowserLocale())
})
</script>

<style scoped lang="scss"></style>
