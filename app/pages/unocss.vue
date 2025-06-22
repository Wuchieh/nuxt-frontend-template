<template>
    <div
        class="p-2"
        :style="{ background, color: textColor }"
    >
        <div>
            <h1 class="m-0">
                預設顏色
            </h1>
            <div class="flex items-center gap-2">
                <div>
                    背景<input
                        v-model="background"
                        type="color"
                    >
                </div>
                <div>
                    文字<input
                        v-model="textColor"
                        type="color"
                    >
                </div>
            </div>
        </div>
        <div
            ref="mainRef"
            class="flex flex-wrap gap-2 overflow-y-auto"
            :style="{
                height: mainRefHeight,
            }"
        >
            <div
                v-for="(v, k) in colors"
                :key="k"
            >
                <template
                    v-if="typeof v === 'object'"
                >
                    <div>
                        <div
                            v-for="(v2, k2) in v"
                            :key="k2"
                            class="flex gap-2"
                            :style="{
                                background: `${v2}`,
                            }"
                        >
                            {{ k }}-{{ k2 }}:{{ v2 }}
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { presetWind3 as presetUno } from '@unocss/preset-wind3';

const { theme } = presetUno();
const colors = ref(theme?.colors);
const background = ref('#ffffff');
const textColor = ref('#000000');
const mainRef = ref<HTMLDivElement | null>(null);
const mainRefHeight = ref('100px');

onMounted(() => {
    if (mainRef.value) {
        const { top } = mainRef.value.getBoundingClientRect();
        mainRef.value.style.height = `calc(100vh - ${top}px)`;
    }
});
</script>

<style lang="scss" scoped>
html,
body {
    @apply p-0 m-0;
}
</style>
