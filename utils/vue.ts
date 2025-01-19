import { cloneDeep } from 'lodash-es'
/**
 * @example
 * const [num,resetNum] = useResetRef(0)
 * console.log(num.value) // 0
 * num.value += 10
 * console.log(num.value) // 10
 * resetNum()
 * console.log(num.value) // 0
 * */
const useResetRef = <T = any>(value: T) => {
  const valueRef = ref(cloneDeep(value))
  const resetRef = () => {
    valueRef.value = cloneDeep(value)
  }
  return [valueRef, resetRef] as const
}

export { useResetRef }
