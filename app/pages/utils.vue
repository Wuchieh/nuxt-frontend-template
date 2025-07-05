<template>
    <div>
        <div>
            <button @click="onClickDebouncePromise">
                debouncePromiseTest
            </button>
        </div>
        <div>
            <h3>debounceRef</h3>
            <p>{{ debounceRefValue }}</p>
            <input
                v-model="debounceRefValue"
                type="text"
            >
        </div>
        <div>
            <h3>useResetRef</h3>
            <div>
                <input
                    v-model="num"
                    type="number"
                >
                <p>{{ num }}</p>
                <button @click="resetNum">
                    reset
                </button>
            </div>
        </div>
        <div>
            <h3>createObjectURL</h3>
            <div>
                <input
                    type="file"
                    @change="fileInputChange"
                >
                <img
                    v-if="image"
                    alt="createObjectURL"
                    :src="createObjectURL(image)"
                >
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const _sleep = debouncePromise(sleep);
const debounceRefValue = debounceRef('');
const [num, resetNum] = useResetRef(0);
const image = ref<File | undefined>(void 0);

function fileInputChange(e: Event) {
    const el = e.target as HTMLInputElement | null;
    if (!el) return;
    if (el.files) {
        image.value = el.files[0];
    }
}

async function onClickDebouncePromise() {
    _sleep(1000).then(() => {
    // eslint-disable-next-line no-console
        console.log('A second has passed.');
    });

    await _sleep(1000);
    // eslint-disable-next-line no-console
    console.log('A second has passed.');

    _sleep(1000).then(() => {
    // eslint-disable-next-line no-console
        console.log('Another second has passed.');
    });

    await _sleep(1000);
    // eslint-disable-next-line no-console
    console.log('Another second has passed.');
}

definePageMeta({ name: 'utils' });
</script>

<style scoped lang="scss"></style>
