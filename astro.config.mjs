import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default defineConfig({
  site: 'https://docs.uwhpc.com',
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
  },
  integrations: [
    starlight({
      title: 'UWHPC Documentation',
      description: 'User documentation for UWHPC software and workflows.',
      favicon: '/favicon.ico',
      customCss: [
        '@fontsource-variable/ibm-plex-sans',
        '@fontsource/ibm-plex-mono',
        'katex/dist/katex.min.css',
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
            href: '/apple-touch-icon.png',
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
          label: 'Onboarding',
          items: [
            { label: 'Overview', slug: 'onboarding' },
            { label: 'Problem statement', slug: 'onboarding/problem-statement' },
            { label: 'Complete the exercise', slug: 'onboarding/complete-the-exercise' },
            { label: 'Submit and discuss', slug: 'onboarding/submit-and-discuss' },
          ],
        },
        {
          label: 'Standards',
          items: [
            { label: 'Overview', slug: 'cpp-standards' },
            { label: 'C++ coding standard', slug: 'cpp-standards/cpp' },
            { label: 'CUDA coding standard', slug: 'cpp-standards/cuda' },
            { label: 'Review checklist', slug: 'cpp-standards/review-checklist' },
          ],
        },
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
