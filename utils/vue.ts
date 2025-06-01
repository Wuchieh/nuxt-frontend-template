import { cloneDeep } from 'lodash-es';

/**
 * 創建一個長按事件處理器
 * @function useLongTouch
 * @param {(e: MouseEvent) => void} callback - 當長按事件觸發時執行的回調函數
 * @param {number} [touchDuration] - 觸發長按事件所需的持續時間（毫秒），默認為 300ms
 * @returns {object} 返回包含事件處理方法的對象
 * @property {Function} onPointerdown - 指針按下事件處理器，用於開始計時
 * @property {Function} onPointerup - 指針抬起事件處理器，用於取消計時
 * @example
 * const longTouch = useLongTouch((e) => {
 *   console.log('長按事件觸發', e);
 * }, 500);
 *
 * // 在元素上使用
 * <div v-bind="longTouch">
 *   長按我
 * </div>
 */
function useLongTouch(callback: (e: MouseEvent) => void, touchDuration: number = 300) {
    let timeout: NodeJS.Timeout | number;
    return {
        onPointerdown(e: MouseEvent) {
            timeout = setTimeout(() => callback(e), touchDuration);
        },
        onPointerout() {
            clearTimeout(timeout);
        },
        onPointerup() {
            clearTimeout(timeout);
        },
    };
}

/**
 * @example
 * const [num,resetNum] = useResetRef(0)
 * console.log(num.value) // 0
 * num.value += 10
 * console.log(num.value) // 10
 * resetNum()
 * console.log(num.value) // 0
 */
function useResetRef<T = any>(value: T) {
    const valueRef = ref(cloneDeep(value));
    const resetRef = () => {
        valueRef.value = cloneDeep(value);
    };
    return [
        valueRef,
        resetRef,
    ] as const;
}

export {
    useLongTouch,
    useResetRef,
};
