import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://uwhpc.github.io',
  base: '/docs',
  integrations: [
    starlight({
      title: 'UWHPC Documentation',
      description: 'User documentation for UWHPC software and workflows.',
      favicon: '/favicon.ico',
      customCss: [
        '@fontsource-variable/archivo',
        '@fontsource/fragment-mono',
        './src/styles/custom.css',
      ],
      components: {
        SiteTitle: './src/components/UWHPCSiteTitle.astro',
      },
      head: [
        { tag: 'meta', attrs: { name: 'theme-color', content: '#111111' } },
        {
          tag: 'link',
          attrs: {
            rel: 'apple-touch-icon',
            sizes: '180x180',
            href: '/docs/apple-touch-icon.png',
          },
        },
      ],
      editLink: {
        baseUrl: 'https://github.com/UWHPC/docs/edit/main/',
      },
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/UWHPC/docs' },
      ],
      sidebar: [
        {
          label: 'VMC',
          items: [
            { label: 'Overview', slug: 'software/vmc' },
            { label: 'Build from source', slug: 'software/vmc/build-from-source' },
            { label: 'Testing', slug: 'software/vmc/testing' },
            { label: 'Profiling', slug: 'software/vmc/profiling' },
            { label: 'CLI reference', slug: 'software/vmc/cli-reference' },
            { label: 'Program architecture', slug: 'software/vmc/program-architecture' },
            { label: 'Expert review checklist', slug: 'software/vmc/expert-review-checklist' },
          ],
        },
      ],
    }),
  ],
});
