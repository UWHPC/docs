import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default defineConfig({
  site: 'https://docs.uwhpc.com',
  redirects: {
    '/': '/onboarding/',
  },
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
      favicon: '/favicon.svg',
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
        // Restore saved panel widths before first paint so they never flash.
        {
          tag: 'script',
          content:
            "try{var d=document.documentElement.style,n=localStorage.getItem('uwhpc-nav-w'),t=localStorage.getItem('uwhpc-toc-w');if(n!==null)d.setProperty('--uwhpc-nav-w',n+'px');if(t!==null)d.setProperty('--uwhpc-toc-w',t+'px')}catch(e){}",
        },
        { tag: 'script', attrs: { src: '/panel-resize.js', defer: true } },
        // Legacy fallback for browsers that ignore the SVG icon.
        {
          tag: 'link',
          attrs: { rel: 'icon', href: '/favicon.ico', sizes: '32x32' },
        },
        {
          tag: 'link',
          attrs: {
            rel: 'apple-touch-icon',
            sizes: '180x180',
            href: '/apple-touch-icon.png',
          },
        },
      ],
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
        // Hidden for now — re-enable when the Standards and VMC docs are ready.
        // {
        //   label: 'Standards',
        //   items: [
        //     { label: 'Overview', slug: 'cpp-standards' },
        //     { label: 'C++ coding standard', slug: 'cpp-standards/cpp' },
        //     { label: 'CUDA coding standard', slug: 'cpp-standards/cuda' },
        //     { label: 'Review checklist', slug: 'cpp-standards/review-checklist' },
        //   ],
        // },
        // {
        //   label: 'VMC',
        //   items: [
        //     { label: 'Overview', slug: 'software/vmc' },
        //     { label: 'Build from source', slug: 'software/vmc/build-from-source' },
        //     { label: 'Testing', slug: 'software/vmc/testing' },
        //     { label: 'Profiling', slug: 'software/vmc/profiling' },
        //     { label: 'CLI reference', slug: 'software/vmc/cli-reference' },
        //     { label: 'Program architecture', slug: 'software/vmc/program-architecture' },
        //     { label: 'Expert review checklist', slug: 'software/vmc/expert-review-checklist' },
        //   ],
        // },
      ],
    }),
  ],
});
