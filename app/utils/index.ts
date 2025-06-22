export * from './debounce';
export * from './nuxt';
export * from './vue';

export interface withResolversPromise<T> {
    promise: Promise<T>;
    reject: (reason?: any) => void;
    resolve: (value: (PromiseLike<T> | T)) => void;
}

export const sleep = (ms: number) => new Promise((resolve) => void setTimeout(resolve, ms));

export function useWithResolvers<T>(): withResolversPromise<T> {
    if (Promise.withResolvers) {
        return Promise.withResolvers<T>();
    } else {
        let reject = null! as (reason?: any) => void;
        let resolve = null! as (value: (PromiseLike<T> | T)) => void;
        const promise = new Promise<T>((res, rej) => {
            reject = rej;
            resolve = res;
        });
        return {
            promise,
            reject,
            resolve,
        };
    }
}
