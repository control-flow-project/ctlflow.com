# Documentation review — 5 November 2026

The review starts from website `b19d7b5a04ef83f198ec800ac36ac00c942a8580`
and covers all 253 tracked prose/reference records, plus 43 templates,
configuration, example and license resources. Generated references now use
ctlflow `92da9d00da972e69bb4bd7203a448a622ee94dee` and Toolsmith
`c27d8d9c90a66aae16fa99ae836d6c30ee7cd24e`.

Current guides distinguish public source/server images, private npm workspaces
and unpublished native archives. They describe installed native setup, lazy
activation, current retention, actual storage/runtime ownership and container
configuration validation. Historical verification records keep their dated
results. No runtime, API handler or database behavior changes here.

The API generator now follows invoked query-validation helpers, so collection
references include their accepted pagination parameters. Response examples fit
the smallest collection page bound. Two regression tests cover those cases;
the generator does not inspect unrelated helper functions.

Verification on Linux amd64 with Hugo 0.168.0, Node 26.8.1 and the installed
Google Chrome:

| Check | Result |
| --- | --- |
| Generated references against both exact source commits | No differences |
| Hugo production build | 233 pages; passed |
| Unit tests | 47 passed; zero failures, cancellations or skips |
| Real-browser tests | 17 passed; zero failures, cancellations or skips |
| Browser link/anchor traversal | 231 HTML pages; 37,709 links |
| Additional changed-guide rendering | 19 routes × two widths × two themes: 76 checks passed |
| Additional checks | HTTP success, no horizontal overflow or page errors; pagination text/examples |
| Complete reference/build/unit/browser sequence | 20.575 seconds; 816.9 MiB peak memory |
| Additional changed-guide browser sequence | 3.597 seconds; 683.9 MiB peak memory |
| Aggregate process limits | 8 GiB memory, zero swap, 1024 tasks |

Representative desktop/mobile screenshots were visually reviewed. An initial
focused regression run exposed an order-sensitive test expectation; query-name
order is not an API contract, so the assertion now compares the complete sorted
set. The final suite passes without removing any expected parameter.

The public GitHub `v0.1.26` native release is still absent. Existing tested native
archives are unchanged; their publication requires repository-release permission.
Public image manifests remain readable. This documentation change neither
publishes those archives nor deploys services. Netlify publishes the website
after the user merges the website branch; local tests do not certify the live site.
