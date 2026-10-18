# arthur gao — personal site

Plain static HTML, one stylesheet, one script. No framework, no build step.

```
index.html          homepage (experience, projects, film strip, about)
projects/*.html     project write-ups
film/index.html     film collections (see the comment at the top for adding one)
film/*.html         one page per collection
styles.css          design tokens, type scale, layout, motion
index.js            progressive enhancement: row hover/toggles, motion
images/             project images; images/film/ holds web-sized, metadata-stripped scans
```

## Run locally

```bash
python3 -m http.server 8000
```

## Deploy (Cloudflare Pages)

Framework preset: None. Build command: (empty). Build output directory: `/`.

The previous Next.js site is preserved at tag `v2-nextjs` and branch `legacy-nextjs`.
