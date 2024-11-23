import { md5 } from 'js-md5'

interface RunningPromise<T> {
  promise: Promise<T>
  resolver: (value: T) => void
  rejecter: (reason: any) => void
}

export const debouncePromise = <T extends (...args: any[]) => Promise<any>>(apiCall: T) => {
  const running = new Map<string, RunningPromise<ReturnType<T>>>()

  return (...args: Parameters<T>): ReturnType<T> => {
    return new Promise((resolve, reject) => {
      const key = md5(JSON.stringify(args))

      if (running.has(key)) {
        running.get(key)!.promise.then(resolve).catch(reject)
      } else {
        const promiseWrapper: RunningPromise<ReturnType<T>> = {
          promise: null!,
          resolver: null!,
          rejecter: null!,
        }

        promiseWrapper.promise = new Promise((res, rej) => {
          promiseWrapper.resolver = res
          promiseWrapper.rejecter = rej
        })

        running.set(key, promiseWrapper)

        apiCall(...args)
          .then((result) => {
            running.delete(key)
            promiseWrapper.resolver(result as ReturnType<T>)
            resolve(result)
          })
          .catch((error) => {
            running.delete(key)
            promiseWrapper.rejecter(error)
            reject(error)
          })
      }
    }) as ReturnType<T>
  }
}