<template>
  <div>
    <div>count: {{ app.count }}</div>
    <button @click="app.add">++</button>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '~/store/app'

const app = useAppStore()

definePageMeta({
  name: 'pinia',
})
</script>

<style scoped lang="scss"></style>
