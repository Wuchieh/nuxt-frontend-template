type ObjectValueStringKey<T extends Record<string, any>> = {
    [K in keyof T]: T[K] extends string ? K : never
}[keyof T];

type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type {
    ObjectValueStringKey,
    Optional,
};
