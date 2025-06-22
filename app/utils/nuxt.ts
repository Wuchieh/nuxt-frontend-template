/**
 * @class Token
 * @description
 * Used in `header.Authenticate`.
 *
 * If both `useCookie` and `useLocalStorage` are set to `false`, the data will only be stored on the current page.
 *
 * @example
 * const token = new Token('token')
 * fetch('/info',{
 *   headers: {
 *     Authorization: token.authToken()
 *   },
 * })
 *
 * @example
 * new Token({
 *   key: 'token',
 *   useCookie: true,
 *   useLocalStorage: false,
 * })
 */
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

        if (!this._key || this._key.length) throw new Error('not found key');
        this.value = this.get();
    }

    /**
     * @function authToken
     * @description
     * Get the authorization token string with the Bearer prefix.
     *
     * This method prioritizes `this.value`; if it doesn't exist,
     *
     * it will call `this.get()`, and generate a formatted
     *
     * authorization header string like `Bearer xxxxxx` based on the result.
     *
     * @returns {string} `Bearer <token>` or ''
     */
    authToken() {
        const val = this.value || this.get();
        return val ? `Bearer ${val}` : '';
    }

    /**
     * @function clear
     * @description
     * clear token
     */
    clear() {
        if (this.useCookie) {
            useCookie(this._key).value = void 0;
        }

        if (this.useLocalStorage) {
            localStorage.removeItem(this._key);
        }

        this.value = '';
    }

    /**
     * @function get
     * get token
     */
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

    /**
     * @function set
     * @param {string} val
     * @description
     * set token
     */
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
