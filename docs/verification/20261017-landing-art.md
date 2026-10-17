# Landing artwork verification — 2026-10-17

Eleven generated transparent PNGs illustrate nine landing pages, including two
distinct home previews. No illustration is repeated. Technical guides and generated
API references remain unillustrated. Asset subjects, prompts and exact original
and responsive sizes are recorded in [`../artwork.md`](../artwork.md).

Linux amd64; Node 26.8.1; Hugo 0.168.0; Playwright 1.63.0; Chrome 155.0.8059.84.
Builds and tests run within an 8 GiB, zero-swap, 256-task process-group scope.

| Check | Result |
| --- | --- |
| Production build, warnings treated as errors | Pass |
| Affected asset and production build verifier tests | 6 passed |
| Affected real browser tests under Netlify response headers | 8 passed |
| Published illustrations | 33 fingerprinted WebP variants, 480/800/1200 px wide |
| Production uniqueness gate | Eleven sources, eleven placements; repeated keys and duplicate source files rejected |
| Source PNGs served to browsers | None |
| Largest published variant | 300,654 bytes; existing size budgets unchanged |
| Landing/theme/width combinations | 36 checked: nine pages, two themes, two widths |
| Transparent negative space after browser decoding | 19–54% of sampled pixels; all assets retain alpha |
| Original PNG transparency | 19–55% fully transparent pixels |
| Lazy-loading home artwork | Desktop previews load on scroll; hidden mobile previews are not downloaded in the browser checks |
| Hero loading | Eager, high fetch priority, explicit intrinsic dimensions |
| Typography-first home layout | Twelve cases: six widths in two themes; no enclosing content panels |
| Mobile ornamental-image policy | Page-level art visible; both section ornaments hidden below 1000 px and visible at 1000/1440 px |
| Message flow | Four ordered steps and three decorative arrows; horizontal at 1000/1440 px and downward at 320/390/768/999 px |
| Documentation indexes | Twelve cases: three indexes, two widths, both themes; type hierarchy without cards |
| Keyboard focus | Tab navigation and visible focus retained on component links |
| HTML pages | 218 |
| Internal links and anchors | 34,099 checked; no missing targets or duplicate IDs |
| Syntax-rendered code blocks | 1,240 |
| Responsive page widths | 320, 390, 768 and 1440 px; no page-level overflow |
| No JavaScript | Mobile ornament hiding, page-level art, informative architecture diagram, navigation and documents remain usable |
| Print | Decorative illustrations hidden |
| Visual inspection | All five new subjects; home, message arrows, documentation and ctlflow in both themes; mobile home and index links |
| Generated API content, source snapshots, examples and dependencies | Unchanged |
| Git whitespace | Pass |

The shared image partial owns resizing, fingerprints, responsive sources and
decorative semantics. Both document layouts use one heading partial. Images use
no background substitution, blending, runtime processing, remote loader or new
client script. Existing theme palettes, code highlighting, CSP and Netlify
deployment configuration are unchanged. The local preview recognizes PNG/WebP
content types.

The home message-flow panel, number badges, component cards and related-project
panels are replaced by type sizes, weight, whitespace and fine rules. Section
indexes use the same unboxed treatment. Code and diagram frames remain useful
containers. Secondary home actions are text links rather than extra buttons.

The image renderer requires an explicit `page` or `section` placement. One shared
mobile rule hides section ornaments below 1000 px and removes their grid column;
page-level decoration stays visible. Informative images and diagrams are not
decorations and are unaffected. This policy works without client-side scripts.

The detailed West End exterior exceeded the existing byte budget at quality 90
and 85. The single Hugo profile now uses WebP quality 80 for every illustration;
all 33 variants fit the unchanged budgets and retain alpha. No per-image
exceptions or alternate processing paths are introduced. Original PNGs remain
unchanged. The initial focus assertion was corrected to use actual keyboard Tab
navigation rather than assume pointer-initiated programmatic focus is visible.

Verification is scoped to the affected assets, build validation and presentation.
Unchanged parser, snapshot and product test suites are not rerun for these UI
refinements. Their earlier full baseline is not claimed as current verification.

This verifies the local static build, not a Netlify production deployment.
No product repository, live fleet, private artwork, hosting account or license
is modified. Recreated dependencies, browser fixtures and build caches are
removed after review; the running local preview keeps its generated output.
