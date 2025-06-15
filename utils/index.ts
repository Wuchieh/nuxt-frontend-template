export * from './debounce';
export * from './nuxt';
export * from './vue';

export const sleep = (ms: number) => new Promise((resolve) => void setTimeout(resolve, ms));
