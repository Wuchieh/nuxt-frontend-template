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
    <div>
      <h3>useResetRef</h3>
      <div>
        <input type="number" v-model="num" />
        <p>{{ num }}</p>
        <button @click="resetNum">reset</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { debounceRef } from '~/utils'
import { useResetRef } from '~/utils/vue'

const _sleep = debouncePromise(sleep)
const debounceRefValue = debounceRef('')
const [num, resetNum] = useResetRef(0)

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

definePageMeta({
  name: 'utils',
})
</script>

<style scoped lang="scss"></style>
