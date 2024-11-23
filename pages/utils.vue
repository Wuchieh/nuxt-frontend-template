<template>
  <div>
    <div>
      <button @click="onClickDebouncePromise">debouncePromiseTest</button>
    </div>
    <div>
      <h3>debounceRef</h3>
      <p>{{ debounceRefValue }}</p>
      <input type="text" v-model="debounceRefValue" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { debounceRef } from '~/utils'

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

const debounceRefValue = debounceRef('')
</script>

<style scoped lang="scss"></style>
