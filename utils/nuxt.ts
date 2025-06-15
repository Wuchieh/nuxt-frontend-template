class Token {
    _key: string;
    value: string;
    useCookie: boolean;
    useLocalStorage: boolean;

    constructor(option: string | {
        key: string;
        useCookie?: boolean;
        useLocalStorage?: boolean;
    }) {
        if (typeof option === 'object') {
            const {
                key,
                useCookie,
                useLocalStorage,
            } = option;
            if (!key || key.length) throw new Error('not found key');

            this._key = key;
            this.value = '';
            this.useCookie = useCookie || false;
            this.useLocalStorage = useLocalStorage || false;
        } else {
            this._key = option;
            this.value = '';
            this.useCookie = true;
            this.useLocalStorage = true;
        }

        if (!this.useCookie && !this.useLocalStorage) throw new Error('not set save data method');
    }

    authToken() {
        const val = this.value || this.get();
        return val ? `Bearer ${val}` : '';
    }

    clear() {
        if (this.useCookie) {
            useCookie(this._key).value = void 0;
        }

        if (this.useLocalStorage) {
            localStorage.removeItem(this._key);
        }
    }

    get() {
        if (this.useCookie) {
            const val = useCookie(this._key).value;
            if (val) return val;
        }

        if (this.useLocalStorage) {
            const val = localStorage.getItem(this._key);
            if (val) return val;
        }

        return this.value;
    }

    set(val: string) {
        this.value = val;

        if (this.useCookie) {
            useCookie(this._key).value = val;
        }

        if (this.useLocalStorage) {
            localStorage.setItem(this._key, val);
        }
    }
}

function useToken(option: string | {
    key: string;
    useCookie?: boolean;
    useLocalStorage?: boolean;
}) {
    return new Token(option);
}

export {
    Token,
    useToken,
};
