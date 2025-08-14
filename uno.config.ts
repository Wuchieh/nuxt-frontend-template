import path from 'node:path';

import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders';
import {
    defineConfig,
    presetAttributify,
    presetIcons,
    presetWind3,
} from 'unocss';
import type { PresetMiniTheme } from 'unocss';

export default defineConfig({
    content: { filesystem: ['**/*.{html,js,ts,jsx,tsx,vue,svelte,astro}'] },
    preflights: [
        {
            getCSS: ({ theme }: { theme: PresetMiniTheme }) => {
                const colorVars = Object.entries(
                    theme.colors as Record<string, Record<string, string> | string>,
                )
                    .map(([name, color]) => {
                        if (typeof color === 'string') {
                            return `--color-${name}: ${color};`;
                        }
                        return '';
                    })
                    .filter(Boolean)
                    .join('\n');

                return `
          :root {
            ${colorVars}
          }
        `;
            },
        },
    ],
    presets: [
        presetWind3(),
        presetAttributify(),
        presetIcons({
            cdn: 'https://esm.sh/',
            collections: {
                custom: FileSystemIconLoader(
                    path.resolve(import.meta.dirname, './app/assets/icon-unocss'),
                ),
            },
        }),
    ],
    rules: [
        [
            /^fs-((?:\d+(?:\.\d+)?|\.\d+)(px|rem|em))$/,
            ([_, value]) => ({ 'font-size': value }),
        ],
        [
            /^square-((?:\d+(?:\.\d+)?|\.\d+)(px|rem|em))$/,
            ([_, value]) => ({
                height: value,
                width: value,
            }),
        ],
        [
            /^size-((?:\d+(?:\.\d+)?|\.\d+)(px|rem|em))$/,
            ([_, value]) => ({
                'height': value,
                'min-height': value,
                'min-width': value,
                'width': value,
            }),
        ],
        [
            /^rounded-(left|right|top|bottom)-((?:\d+(?:\.\d+)?|\.\d+)(rem|px))$/,
            ([
                , direction,
                size,
            ]) => {
                const directions = {
                    bottom: [
                        'border-bottom-left-radius',
                        'border-bottom-right-radius',
                    ],
                    left: [
                        'border-top-left-radius',
                        'border-bottom-left-radius',
                    ],
                    right: [
                        'border-top-right-radius',
                        'border-bottom-right-radius',
                    ],
                    top: [
                        'border-top-left-radius',
                        'border-top-right-radius',
                    ],
                };
                return directions[direction as 'bottom' | 'left' | 'right' | 'top'].reduce(
                    (
                        acc: {
                            [k: string]: string;
                        },
                        borderRadius,
                    ) => {
                        if (!borderRadius) return {};
                        acc[borderRadius] = size!;
                        return acc;
                    },
                    {},
                );
            },
        ],
        [
            /^clamped-text-(\d)$/,
            ([_, value]) => ({
                '-webkit-box-orient': 'vertical',
                '-webkit-line-clamp': value,
                'display': '-webkit-box',
                'overflow': 'hidden',
                'text-overflow': 'ellipsis',
            }),
        ],
        [
            /^(size|w|h)-fixed-(.+)$/,
            ([
                _,
                w,
                v,
            ]) => {
                const sizeMapping: Record<string, string[]> = {
                    h: ['height'],
                    size: [
                        'width',
                        'height',
                    ],
                    w: ['width'],
                };

                const properties = sizeMapping[w!] || [];
                const value = Number.isNaN(Number(v)) ? v! : `${Number(v) / 4}rem`;

                return properties.reduce(
                    (res, prop) => {
                        res[`max-${prop}`] = value;
                        res[`min-${prop}`] = value;
                        res[prop] = value;
                        return res;
                    },
                    {} as Record<string, string>,
                );
            },
        ],
    ],
    shortcuts: { 'text-nowrap': 'whitespace-nowrap overflow-hidden text-ellipsis' },
});
