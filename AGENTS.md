# AGENTS.md

This file gives coding agents the working rules for the UWHPC documentation
repository. It applies to the entire repository unless a more specific
`AGENTS.md` exists in a child directory.

## Repository purpose

This repository builds the UWHPC documentation site with Astro and Starlight.
The current documentation covers:

- Variational Monte Carlo (VMC) build, testing, profiling, CLI, and architecture.
- C++ and CUDA coding standards derived from concrete VMC examples.
- An expert-review checklist for statements that cannot be established from
  source code alone.

## Sources and ownership boundaries

- Treat `Variational-Monte-Carlo/` as a read-only reference checkout. Use it to
  verify VMC behavior and extract exact examples; do not modify it as part of a
  documentation change.
- Treat `UWHPC-Site/` as a read-only visual-design reference. Reuse its palette,
  typography, logo, and favicon through the documentation site's own source
  files; do not modify the reference checkout.
- Both reference checkouts are excluded from the documentation TypeScript scope
  and Git payload. Do not remove those exclusions.
- Documentation source lives under `src/content/docs/`.
- Shared components and styling live under `src/components/`, `src/assets/`, and
  `src/styles/`.
- Site configuration and navigation live in `astro.config.mjs`.
- Do not hand-edit generated or installed content in `dist/`, `.astro/`, or
  `node_modules/`.

## Evidence rules

- Do not guess project behavior that can be verified from source code, scripts,
  tests, build configuration, or command output.
- Cite the exact VMC file for project-specific facts. For published code
  examples, prefer line-linked URLs to
  `https://github.com/UWHPC/Variational-Monte-Carlo/blob/main/`.
- Keep quoted VMC code faithful to the source. Do not silently modernize,
  reformat, or repair an example presented as verbatim.
- When documentation asks what a command does, run the command when practical
  and record real output. State the environment and distinguish one observed
  run from a portable guarantee.
- Never invent UWHPC partitions, modules, GPU models, MPI setup, scheduler
  policy, storage paths, supported compiler versions, scientific background,
  paper citations, or production numerical results.
- Represent missing operational or domain information with a clearly labeled
  TODO block that says exactly what must be supplied.

## Interpretation and expert review

- Tag a sentence with **`[general-VMC-knowledge]`** when it relies on general
  VMC or physics knowledge rather than this repository's implementation.
- Tag a sentence with **`[assumption]`** when it is a plausible interpretation
  of the implementation that the code cannot prove.
- Whenever either tag is added, removed, or changed, update
  `src/content/docs/software/vmc/expert-review-checklist.mdx` in the same change.
  The checklist must link back to every tagged sentence.
- Do not use these tags merely for missing operational facts; use an explicit
  TODO block for those.

## Section boundaries

- Keep VMC user documentation under `src/content/docs/software/vmc/`.
- Keep organization-level C++ and CUDA guidance under
  `src/content/docs/cpp-standards/`; do not nest it inside VMC.
- The coding standards are an initial normative standard derived from VMC, not
  evidence that every existing UWHPC project already complies. Preserve that
  distinction.
- In standards pages, distinguish a normative rule from a “VMC example.” Link
  each example to its exact source lines.
- Update the Starlight sidebar when adding, moving, or removing a documentation
  page.

## Writing style

- Lead with the outcome or rule.
- Prefer plain language, short paragraphs, descriptive headings, and small
  examples.
- Use terminology consistently across pages.
- Avoid unsupported claims and vague phrases such as “typically,” “usually,” or
  “on the cluster” unless they are sourced or explicitly qualified.
- Use Starlight asides for cautions, missing-information TODOs, and status notes.
- Make links useful outside the local checkout: documentation pages should not
  expose local filesystem paths.

## Visual identity

- Preserve the UWHPC dark visual system implemented in
  `src/styles/custom.css`.
- Use the exact UWHPC logo and favicon assets already copied into `src/assets/`
  and `public/`.
- Preserve Archivo for interface/body typography and Fragment Mono for technical
  labels and code-oriented UI.
- Keep the established UWHPC colors, square corners, hairline borders, and
  restrained engineering/datasheet style.
- Maintain accessible focus states, readable contrast, responsive behavior, and
  reduced-motion handling when changing styles.

## Site paths and deployment

- The production site is configured for `https://uwhpc.github.io/docs`.
- Preserve Astro's `base: '/docs'` behavior in navigation, assets, and internal
  links.
- GitHub Pages deployment is defined in `.github/workflows/deploy-pages.yml`.
- Do not deploy, commit, push, create branches, or open pull requests unless the
  user explicitly requests that Git operation. The repository owner normally
  handles Git operations.

## Validation

From the repository root, run:

```bash
npm run build
```

The command runs `astro check` before the static build. A documentation change
is complete only when the build reports no errors and all expected routes are
generated.

For navigation or asset changes, also inspect the generated HTML under `dist/`
to confirm `/docs/`-prefixed links, branded assets, and the expected route. Do
not fix generated files directly; fix their source and rebuild.

## Change discipline

- Preserve unrelated user changes in a dirty worktree.
- Prefer small, reviewable edits.
- Do not delete or overwrite files outside the requested scope.
- Report which pages changed, what evidence was used, what validation ran, and
  which TODOs remain.
