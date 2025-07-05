/// <reference types="./worker-configuration.d.ts" />

declare module 'h3' {
    interface H3EventContext {
        cf: CfProperties;
        cloudflare: {
            context: ExecutionContext;
            env: Env;
            request: Request;
        };
    }
}

export {};
