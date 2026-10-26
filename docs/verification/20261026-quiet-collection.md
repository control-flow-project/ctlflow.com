# Quiet collection documentation — 26 October 2026

Source revision: ctlflow `75234d6f6b625fc1ff2c52f7e370ffbdd97bad96`.
Toolsmith references remain at `621d5cd046896fc7a11663073846131e24ee32b0`.

The configuration, agent tools, Pi, runtime and operations guides describe the
per-instance `listener_options.mirror_output` selection. Generated API and schema
references include `mirrorOutput`. The guides explicitly state that published
0.1.24 packages do not include this setting and require an explicit matching
build/update. This verification does not establish a product release, fleet
activation or website deployment.

`npm run check` passed with the pinned Hugo build, 44 Node tests and 17 real
browser tests. The added browser scenario checks the configuration and runtime
guides at 390px and 1440px, the unpublished-version warning, preserved explicit
messaging/required decisions, and page overflow. All tests passed with no skips.
The complete existing browser suite also checks rendered links/anchors, search,
theme controls, mobile navigation, code examples and JavaScript-free reading.
The build/test group was bounded to 8 GiB memory, zero swap and 1,024 tasks.

An earlier attempt failed a hardcoded expected source revision after references
were synchronized; the expectation was corrected to the exact source above and
the complete check passed. No assertion or gate was weakened.
