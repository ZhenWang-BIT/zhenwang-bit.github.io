# CV website content guide

All frequently updated public content lives in:

```text
assets/js/site-data.js
```

The page layout and rendering logic should not need to change when adding a paper, updating a journal metric, or publishing news.

## Add a publication

1. Add the graphical abstract or figure to `images/`.
2. Append one object to `SITE_DATA.publications`.
3. Give it a unique `id`, the next `order`, and one of these types:

```text
journal
conference
preprint
```

4. Set `featured: true` only for work that should receive priority in the homepage hierarchy.
5. Reuse the same publication `id` in a news item when an update should link to that paper.

The first featured publication by `order` becomes the main homepage feature automatically.

## Update journal impact factors

Edit only `SITE_DATA.journalMetrics`. Each record controls:

- the journal name shown on publication rows;
- the large JIF value;
- JIF year;
- release year;
- publisher;
- official metric source link.

Update `metricChecked` after verifying all values. The site automatically calculates “Total JIF” by adding the current journal metric once for every listed `journal` publication, including repeated journals. Conference papers and preprints are excluded.

Use the formal metric year in `jifYear` and the JCR release year in `releaseYear`. For example, values announced in the 2026 release are labeled `2025 JIF · released 2026`.

## Add news

Add the newest object at the top of `SITE_DATA.news`. Use ISO format for `date` and a reader-facing `label`. If the news is about a listed paper, set `publicationId` to create the link automatically.

Only the latest four updates are expanded initially; the rest remain available through the “Show all updates” control.

## Final check

Run the site locally and confirm:

- the newest publication is in the intended position;
- its journal and JIF are correct;
- filters still show the correct publication types;
- the page has no horizontal scroll at desktop and mobile widths;
- external paper, journal, code, and email links point to the intended destinations.

## Bilingual content (added 2026-09)

The header has a 中文 / English toggle. The choice is remembered in the browser and the first visit follows the browser language.

- Any string field in `site-data.js` may carry a Chinese twin with the `Zh` suffix: `description` / `descriptionZh`, `text` / `textZh`, `label` / `labelZh`, `name` / `nameZh`, and so on. When the twin is missing the English value is shown in both languages.
- Paper titles, author lists, and journal names stay in English by design.
- Static interface text (navigation, headings, buttons, notes) lives in `SITE_DATA.ui.en` and `SITE_DATA.ui.zh`. Keep both dictionaries in sync when adding a key; the key maps to a `data-i18n` attribute in `index.html` or a label built in `main.js`.

## Experience and addresses

- `SITE_DATA.experience` renders under the Bio text, newest first. Each entry has `start` (ISO month), `period`, `role`, `organization`, `location`, plus optional `Zh` twins.
- `SITE_DATA.addresses` renders in the footer as a grid. Each entry is a `lines` array (one line per element) with an optional `linesZh` array.
- `SITE_DATA.profile` holds the Google Scholar, GitHub, and email links used in the hero and footer.

## Optional publication fields

- `volume`: shown under the year in the venue column, e.g. `"181, 124453"`.
- `doi`: adds a DOI button next to the paper link.
