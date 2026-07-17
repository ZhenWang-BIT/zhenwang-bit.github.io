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
