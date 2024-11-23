<template>
  <div>
    <div>
      <NuxtLinkLocale :to="{ name: 'i18n-test' }">Test</NuxtLinkLocale>
    </div>
    <div>{{ $t('welcome') }}</div>
    <div>
      <button v-for="v in availableLocales" :key="v.code" @click="setLocale(v.code)">
        {{ v.text }}
      </button>
    </div>
    <div>{{ locale }}</div>
  </div>
</template>

<script setup lang="ts">
const { setLocale, locales, locale } = useI18n()

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
