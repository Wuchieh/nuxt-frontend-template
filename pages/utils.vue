<template>
  <div>
    <button @click="onClickDebouncePromise">debouncePromiseTest</button>
  </div>
</template>

<script setup lang="ts">
const _sleep = debouncePromise(sleep)

const onClickDebouncePromise = async () => {
  _sleep(1000).then(() => {
    console.log('A second has passed.')
  })

  await _sleep(1000)
  console.log('A second has passed.')

  _sleep(1000).then(() => {
    console.log('Another second has passed.')
  })

  await _sleep(1000)
  console.log('Another second has passed.')
}
</script>

<style scoped lang="scss"></style>
