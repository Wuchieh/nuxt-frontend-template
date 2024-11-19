import { defineConfig, presetUno, presetIcons, type PresetMiniTheme } from 'unocss'

export default defineConfig({
  rules: [
    [/^fs-(\d*\.?\d+(px|rem|em))$/, ([_, value]) => ({ 'font-size': value })],
    [/^square-(\d*\.?\d+(px|rem|em))$/, ([_, value]) => ({ height: value, width: value })],
    [
      /^size-(\d*\.?\d+(px|rem|em))$/,
      ([_, value]) => ({
        height: value,
        width: value,
        'min-height': value,
        'min-width': value,
      }),
    ],
    [
      /^rounded-(left|right|top|bottom)-(\d*\.?\d+(rem|px))$/,
      ([, direction, size]) => {
        const directions = {
          left: ['border-top-left-radius', 'border-bottom-left-radius'],
          right: ['border-top-right-radius', 'border-bottom-right-radius'],
          top: ['border-top-left-radius', 'border-top-right-radius'],
          bottom: ['border-bottom-left-radius', 'border-bottom-right-radius'],
        }
        return directions[direction as 'left' | 'right' | 'top' | 'bottom'].reduce(
          (
            acc: {
              [k: string]: string
            },
            borderRadius
          ) => {
            acc[borderRadius] = size
            return acc
          },
          {}
        )
      },
    ],
  ],
  content: {
    filesystem: ['**/*.{html,js,ts,jsx,tsx,vue,svelte,astro}'],
  },
  presets: [
    presetUno(),
    presetIcons({
      cdn: 'https://esm.sh/',
    }),
  ],
  preflights: [
    {
      getCSS: ({ theme }: { theme: PresetMiniTheme }) => {
        const colorVars = Object.entries(
          theme.colors as Record<string, string | Record<string, string>>
        )
          .map(([name, color]) => {
            if (typeof color === 'string') {
              return `--color-${name}: ${color};`
            }
            return ''
          })
          .filter(Boolean)
          .join('\n')

        return `
          :root {
            ${colorVars}
          }
        `
      },
    },
  ],
})
