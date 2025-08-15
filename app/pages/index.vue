<template>
    <div>
        <template
            v-for="v in name"
            :key="v"
        >
            <NuxtLinkLocale :to="{ name: v }">
                {{ v }}
            </NuxtLinkLocale>
            <br>
        </template>
    </div>
</template>

<script setup lang="ts">
const name = [
    'i18n-index',
    'pinia',
    'post-css',
    'utils',
    'unocss',
];
</script>

<style scoped lang="scss"></style>
