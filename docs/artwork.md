# Landing artwork

Ten distinct transparent screen-print illustrations are stored in
`assets/artwork/`. They use forest green, jade, coral, violet and gold. No
private fleet assets or source material are included.

The three homepage originals remain 1536 × 1024 RGBA PNGs (3:2). The seven
documentation section illustrations are newly generated 2172 × 724 RGBA PNGs
(3:1). At a displayed width of 1050 pixels, a section illustration is 350 pixels
tall rather than 700. The images are composed for the shallow format, not
squashed or cropped from taller artwork. The intrinsic dimensions reserve the
correct space before decoding; the existing full content width is unchanged.

| Asset | Subject | Source dimensions | PNG bytes |
| --- | --- | --- | ---: |
| `collaboration.png` | Human and geometric agent profiles with speech bubbles | 1536 × 1024 | 1,588,392 |
| `playbill.png` | Theatre print studio with mask, binoculars, tickets and ink roller | 1536 × 1024 | 2,583,554 |
| `multitool.png` | Folding multi-tool and craftsman's hand | 1536 × 1024 | 1,975,023 |
| `ctlflow.png` | Low reel-to-reel consoles linked by a paper strip | 2172 × 724 | 1,105,481 |
| `crossfire.png` | Three desk telephones linked by looping cords | 2172 × 724 | 1,185,686 |
| `fleetd.png` | Conductor's hands and five human or geometric portraits | 2172 × 724 | 807,680 |
| `fleet.png` | Typewriter and a lateral paper ribbon forming speech shapes | 2172 × 724 | 928,016 |
| `examples.png` | West End theatre frontage, London bus and tickets | 2172 × 724 | 1,405,264 |
| `api.png` | Blank envelopes, sorting trays and an exchange between two hands | 2172 × 724 | 920,775 |
| `toolsmith.png` | Unfurled tool roll with scissors, compass, spanner and straightedge | 2172 × 724 | 1,197,170 |

Generation used the built-in image generation tool with
`transparent_background=true`. The exact current prompts and the homepage
collaboration refinement prompt are in
[`artwork-prompts.json`](artwork-prompts.json). The generator delivered native
2172 × 724 output for the requested 3:1 compositions; no post-generation image
editing was needed.

## Placement policy

Every bold sidebar heading links to a top-level documentation section. Each of
those section landing pages has exactly one panoramic illustration. There are
no exceptions for API reference or Toolsmith. No other documentation page may
have ornamental artwork.

| Page | Artwork |
| --- | --- |
| Home | Collaboration hero; separate playbill and multi-tool section ornaments |
| `/docs/ctlflow/` | Reel-to-reel consoles |
| `/docs/crossfire/` | Telephone exchange |
| `/docs/fleetd/` | Conductor and portraits |
| `/docs/fleet/` | Typewriter |
| `/docs/examples/` | West End exterior |
| `/docs/api/` | Envelope exchange |
| `/docs/toolsmith/` | Craftsman's tools |
| `/docs/` | None |
| All child pages, nested sections and operation references | None |
| Search and legal pages | None |

The fleet-street walkthrough is a child page and has no illustration. Its
informative diagrams remain part of its content. The homepage theatre preview
keeps its own distinct artwork.

The home template selects its three images directly. Section pages select
`artwork: <name>` in front matter. `data/artwork.json` is the asset registry;
`layouts/partials/landing-art.html` owns image rendering. Both document layouts
use `page-heading.html`, which rejects a missing illustration on a top-level
sidebar section or ornamental art assigned to any other document. Tests exercise
these build failures and compare every rendered page against its actual bold
sidebar links, not only a manually maintained page list.

## Build and browser behavior

Hugo resizes each source to 480, 800 and 1200 pixels wide using WebP quality 80.
Section variants are 480 × 160, 800 × 267 and 1200 × 400 pixels; the browser
retains the original 3:1 layout despite integer rounding in the 800-pixel file.
Homepage variants retain their original 3:2 geometry. Thirty derivatives are
published under `/assets/artwork/` with SHA-256 fingerprints for immutable
caching. The source PNGs are not published. `srcset` and `sizes` let the browser
select one variant based on display width and pixel density. Existing per-file
budgets remain 80 KiB at 480 pixels, 160 KiB at 800 and 300 KiB at 1200.

Images retain their alpha channel. No background panel, blend mode, color filter,
remote image loader or additional script is used. The page background shows
through in both themes. Empty alt text and `aria-hidden` mark the illustrations
as decorative; all explanations remain in the surrounding text. Print hides
ornamental art.

The homepage hero retains high fetch priority. Its two section ornaments remain
lazy-loaded 288 × 288 pixel rounded squares on desktop, to the left of the text,
with the existing alignment and spacing. Their artwork fits without cropping or
an opaque background.

Every call declares `placement: page` or `placement: section`. Below 1000 pixels,
page-level ornamental illustrations remain visible, while section ornaments
are hidden without empty columns or image downloads during normal browsing.
This keeps all seven documentation section illustrations and the homepage hero
visible on mobile, but hides the homepage's fleet-street and Toolsmith ornaments.
Informative images, screenshots, code and diagrams are content and stay visible.
This behavior requires no JavaScript.

Every illustration appears in exactly one place across all rendered HTML pages.
Home previews never reuse section art. After Hugo renders, `scripts/artwork.mjs`
rejects reused keys, identical source bytes under different keys, unknown keys
and registered-but-unused sources. Responsive sizes are variants of one
placement, not separate illustrations.

## Changing artwork

Keep generated originals in this repository and update the registry and prompt
record together. Do not reference the generator's private save directory. Use
the shared partial rather than page-specific image processing or theme variants.
Keep exactly one distinct 3:1 illustration on every bold sidebar section's
landing page and none on its children. A new sidebar section needs its own art.
Do not introduce policy exceptions or reuse an existing illustration.

Run the affected build, artwork tests and real-browser checks under the process
group limits in the README. Browser checks cover light/dark backgrounds,
mobile/desktop widths, alpha, responsive URLs, byte budgets, unchanged content
width, half-height section art and the absence of art from child pages. Remove
recreated fixtures and caches after retaining concise verification results.
