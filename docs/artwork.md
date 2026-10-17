# Landing artwork

Ten distinct screen-print illustrations are stored as 1536 × 1024 RGBA PNGs
in `assets/artwork/`. They use forest green, jade, coral, violet and gold. No
private fleet assets or source material are included.

| Asset | Subject | PNG bytes | 480 px WebP bytes | 800 px WebP bytes | 1200 px WebP bytes |
| --- | --- | ---: | ---: | ---: | ---: |
| `collaboration.png` | Human and geometric agent profiles with speech bubbles | 1,588,392 | 28,322 | 60,578 | 102,614 |
| `ctlflow.png` | Mainframe tape cabinets, operator and linking paper strip | 2,010,129 | 39,156 | 77,316 | 142,150 |
| `examples.png` | West End theatre exterior, London bus, street lamp and ticket | 2,795,140 | 65,474 | 148,372 | 300,654 |
| `playbill.png` | Theatre print studio with mask, binoculars, tickets and ink roller | 2,583,554 | 47,900 | 114,436 | 230,914 |
| `multitool.png` | Folding multi-tool and craftsman's hand | 1,975,023 | 33,646 | 77,268 | 150,668 |
| `crossfire.png` | Telephone receivers, connected portraits and an operator's hand | 1,971,197 | 44,390 | 91,968 | 166,860 |
| `fleetd.png` | Conductor's hands and repeated human and agent busts | 1,800,187 | 43,308 | 89,580 | 156,528 |
| `fleet.png` | Typewriter, blank paper and a hand pressing a key | 1,879,846 | 35,692 | 75,724 | 140,508 |
| `theatre.png` | West End proscenium, curtains, balconies, theatrical portraits and spotlights | 2,104,354 | 48,492 | 104,332 | 186,472 |
| `toolsmith.png` | Open tool case, scissors, compass, spanner and colored sheets | 2,400,122 | 39,716 | 90,672 | 181,672 |

Generation used the built-in image generation tool with
`transparent_background=true`. The exact original prompts and the collaboration
refinement prompt are in [`artwork-prompts.json`](artwork-prompts.json).

## Placement

| Page | Artwork |
| --- | --- |
| Home | Collaboration hero; playbill and multi-tool in the related-project sections |
| Documentation | None |
| ctlflow overview | Mainframe |
| crossfire, fleetd and fleet overviews | The component's named asset |
| Examples | West End exterior |
| fleet-street walkthrough | Theatre interior |
| Toolsmith overview | Toolsmith |

The home template selects its artwork directly. Seven content pages select it
with `artwork: <name>` in front matter. `data/artwork.json` is the asset registry;
`layouts/partials/landing-art.html` owns all rendering. Both document layouts use
`page-heading.html` so single-page and section introductions have the same image
placement. Technical guides, API references, search and legal pages load no art.

## Build and browser behavior

Hugo resizes each source to 480, 800 and 1200 pixels wide using WebP quality 80.
The source PNGs are not published. Thirty derivatives are published under
`/assets/artwork/` with SHA-256 fingerprints for immutable caching. `srcset` and
`sizes` let the browser select one variant based on display size and pixel density.

Images retain their alpha channel. No background panel, blend mode, color filter,
remote image loader or additional script is used. The page background shows
through in both themes. Empty alt text and `aria-hidden` mark the illustrations
as decorative; all explanations remain in the surrounding text. Page-level
images reserve their 3:2 layout before decoding. The home hero has high fetch
priority; the two below-fold home illustrations load lazily and display at
288 × 288 pixel rounded squares on desktop, to the left of the text and
top-aligned with each section's introductory label. The artwork fits inside
without cropping or an opaque background. Responsive `sizes` matches that width.
Print hides the art. The documentation index has no illustration.

Every call declares `placement: page` or `placement: section`. Below the site's
1000 px mobile-layout breakpoint, only page-level ornamental illustrations remain
visible. Section ornaments are hidden through the shared stylesheet; related
text uses the full available width. Browser checks confirm that hidden lazy
ornaments are not downloaded during normal browsing. This
applies to the fleet-street and Toolsmith home previews. Informative images,
screenshots, code and diagrams are content, not decorations, and stay visible.
This behavior requires no JavaScript.

Every illustration appears in exactly one place across all rendered HTML pages.
The home previews do not reuse the art from their linked pages. After Hugo
renders, `scripts/artwork.mjs` checks all registered source files and all rendered
placements. Reused keys, identical source bytes under different keys, unknown
keys and registered-but-unused images fail the production build. Responsive
sizes are variants of one placement, not separate illustrations.

## Changing artwork

Keep generated originals in this repository and update the registry and prompt
record together. Do not reference files in a generator's private save directory.
Use the shared partial rather than adding page-specific image processing or
theme variants. Select illustrations explicitly; do not add them automatically to
all pages in a section. Update the landing allowlist tests when an authorized
placement changes. Never reuse an illustration; generate a distinct one for
each new placement.

Run `npm run check` under the process-group limits in the README. Review real
browser screenshots on light/dark backgrounds and mobile/desktop widths. The
browser tests also decode alpha, check responsive URLs and lazy loading, and
reject illustrations outside the selected landing pages. Remove recreated
browser fixtures and build caches after recording concise verification results.
