import fs from 'node:fs';
import fsp from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

import { defineNuxtModule } from '@nuxt/kit';
import type { Options as ModuleOptions } from '@vuetify/loader-shared';
import {
    isObject,
    resolveVuetifyBase,
} from '@vuetify/loader-shared';
import path from 'upath';
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

// WARNING: Remove the file from modules directory if you install vuetify-nuxt-module
export default defineNuxtModule<ModuleOptions>({
    defaults: () => ({ styles: true }),
    meta: {
        configKey: 'vuetify',
        name: 'vuetify-module',
    },
    setup(options, nuxt) {
        let configFile: string | undefined;
        const vuetifyBase = resolveVuetifyBase();
        const noneFiles = new Set<string>();
        let isNone = false;
        let sassVariables = false;
        const PREFIX = 'vuetify-styles/';
        const SSR_PREFIX = `/@${PREFIX}`;
        const resolveCss = resolveCssFactory();

        nuxt.hook('vite:extendConfig', (viteInlineConfig) => {
            // add vuetify transformAssetUrls
            viteInlineConfig.vue ??= {};
            viteInlineConfig.vue.template ??= {};
            viteInlineConfig.vue.template.transformAssetUrls = transformAssetUrls;

            viteInlineConfig.plugins = viteInlineConfig.plugins ?? [];
            viteInlineConfig.plugins.push(vuetify({
                autoImport: options.autoImport,
                styles: true,
            }));

            viteInlineConfig.css ??= {};
            viteInlineConfig.css.preprocessorOptions ??= {};
            viteInlineConfig.css.preprocessorOptions.sass ??= {};

            viteInlineConfig.plugins.push({
                configResolved(config) {
                    if (isObject(options.styles)) {
                        sassVariables = true;
                        // eslint-disable-next-line style/max-len
                        configFile = path.isAbsolute(options.styles.configFile) ? path.resolve(options.styles.configFile) : path.resolve(path.join(config.root || process.cwd(), options.styles.configFile));
                        configFile = pathToFileURL(configFile).href;
                    } else {
                        isNone = options.styles === 'none';
                    }
                },
                enforce: 'pre',
                load(id) {
                    if (sassVariables) {
                        const target = id.startsWith(PREFIX)
                            ? path.resolve(vuetifyBase, id.slice(PREFIX.length))
                            : id.startsWith(SSR_PREFIX)
                                ? path.resolve(vuetifyBase, id.slice(SSR_PREFIX.length))
                                : undefined;

                        if (target) {
                            const suffix = /\.scss/.test(target) ? ';\n' : '\n';
                            return {
                                code: `@use "${configFile}"${suffix}@use "${pathToFileURL(target).href}"${suffix}`,
                                map: { mappings: '' },
                            };
                        }
                    }

                    return isNone && noneFiles.has(id) ? '' : undefined;
                },
                name: 'vuetify:nuxt:styles',
                async resolveId(source, importer, { custom, ssr }) {
                    if (source.startsWith(PREFIX) || source.startsWith(SSR_PREFIX)) {
                        if (/\.s[ca]ss$/.test(source)) {
                            return source;
                        }

                        const idx = source.indexOf('?');
                        return idx === -1 ? source : source.slice(0, idx);
                    }
                    if (
                        source === 'vuetify/styles' || (
                            importer
                            && source.endsWith('.css')
                            && isSubdir(vuetifyBase, path.isAbsolute(source) ? source : importer)
                        )
                    ) {
                        if (options.styles === 'sass') {
                            return this.resolve(await resolveCss(source), importer, {
                                custom,
                                skipSelf: true,
                            });
                        }

                        const resolution = await this.resolve(source, importer, {
                            custom,
                            skipSelf: true,
                        });

                        if (!resolution) {
                            return undefined;
                        }

                        const target = await resolveCss(resolution.id);
                        if (isNone) {
                            noneFiles.add(target);
                            return target;
                        }

                        return `${ssr ? SSR_PREFIX : PREFIX}${path.relative(vuetifyBase, target)}`;
                    }

                    return undefined;
                },
            });
        });
    },
});

function isSubdir(root: string, test: string) {
    const relative = path.relative(root, test);
    return relative && !relative.startsWith('..') && !path.isAbsolute(relative);
}

function resolveCssFactory() {
    const mappings = new Map<string, string>();
    return async (source: string) => {
        let mapping = mappings.get(source);
        if (!mapping) {
            try {
                mapping = source.replace(/\.css$/, '.sass');
                await fsp.access(mapping, fs.constants.R_OK);
            } catch (error) {
                if (!(error instanceof Error && 'code' in error && error.code === 'ENOENT')) {
                    throw error;
                }
                mapping = source.replace(/\.css$/, '.scss');
            }
            mappings.set(source, mapping);
        }
        return mapping;
    };
}

export { type Options as ModuleOptions } from '@vuetify/loader-shared';
