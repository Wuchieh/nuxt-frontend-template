export const useAppStore = defineStore('app', () => {
    const count = ref(0);
    const add = () => {
        count.value++;
    };

    return {
        add,
        count,
    };
});
