# Formatting rules to encode in tooling

These conventions were pulled out of the CUDA coding standard prose
(`src/content/docs/cpp-standards/cuda.mdx`) and the review checklist because a
formatter/linter should enforce them mechanically, not a human reviewer. Add
them to the VMC repo's `.clang-format` (or a lint rule) so they don't need to
live as prose rules in the docs.

- One blank line separating the `#ifdef` / `namespace {` / `__global__` blocks,
  and no extra blank-line padding around `#endif`.
  - Partly `MaxEmptyLinesToKeep`; preprocessor spacing is not fully controlled by
    clang-format, so a lint rule may be needed.
- Anonymous-namespace bodies un-indented, closed with an annotated
  `} // namespace`.
  - `NamespaceIndentation: None`, `FixNamespaceComments: true`.
- Inactive-thread guards written on one line: `if (i >= n) { return; }`.
  - `AllowShortBlocksOnASingleLine: Always` (verify it does not over-collapse
    other short blocks undesirably).

Removed from the site on request (2026-07-21). Re-add enforcement in tooling,
then this file can go away.
