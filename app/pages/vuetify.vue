<template>
    <v-container>
        <v-row>
            <v-col cols="auto">
                <v-btn
                    color="success"
                    text="success"
                />
            </v-col>

            <v-col cols="auto">
                <div class="text-c">
                    text-c
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
definePageMeta({ name: 'vuetify' });
</script>

<style scoped lang="scss">
.text-c {
  @apply px-35px bg-red;
  --height: 36px;
  height: calc(var(--height) + 0px);
}
</style>
