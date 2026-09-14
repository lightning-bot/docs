# Lightning Website

A custom Vue 3 application styled with Tailwind CSS 4, built with Vite. Documentation remains in the existing Markdown files; no GitBook account or service is required.

## Local development

Use Node.js 22.12+ and npm.

```sh
npm ci
npm run dev
```

Vite prints the preview URL. Markdown and navigation.toml changes regenerate the content and reload the preview.

```sh
npm test
npm run build
npm run preview
```

The build writes a standalone static website to `dist/`. Deploy that directory to a static host with directory-index support. Each documentation path has its own `index.html`, with readable article content before JavaScript loads. Configure the host to use `404.html` for unknown pages. No server, database, account, or secret is needed. The site currently expects to be served at the domain root.

## Adding and editing pages

1. Edit an existing Markdown file or add a new one.
2. Add its entry under a group in `navigation.toml`. This determines navigation and previous/next order.
3. Use relative Markdown links, such as `[AutoMod](automod-configuration.md)` inside `guide/`. The compiler converts these to documentation routes and checks that targets exist.
4. Store screenshots and recordings in `assets/` and reference them with relative paths.
5. Run the tests and build before publishing.

Define navigation in `navigation.toml`. Use a top-level named table for each group, with a `pages` array beneath it. Group names become sidebar headings; groups and pages appear in declaration order:

```toml
[Guide]

[[Guide.pages]]
title = "Getting Started"
file = "guide/getting-started.md"
path = "/docs/getting-started"
```

Every page requires a title, a repository-relative Markdown file, and an explicit endpoint. Group names, source files, and endpoints must be unique. Group names must be nonempty and cannot be numeric. For example, `[Policies]` with `[[Policies.pages]]` is accessible as `config.Policies.pages` after parsing. Endpoints must be under `/docs`, with lowercase letters, digits, hyphens, or underscores in each segment. Welcome uses `README.md` at `/docs` and loads its content from `src/welcome.md`. Source file paths do not need to match endpoints.

Navigation, previous/next links, Markdown page links, and homepage links follow the configuration automatically. Markdown links to pages missing from navigation fail the build. Existing Markdown source URLs remain included in the output as source files. Saving the TOML file regenerates content and reloads the development preview; invalid configuration reports an error, and correcting it restores the preview.

The compiler supports GitBook hints (info, warning, danger), format tabs (converted to keyboard-accessible disclosure panels), and embeds (converted to labeled external links). Unknown GitBook directives fail the build so unsupported content cannot silently disappear. Markdown tables and existing HTML tables are supported. HTML is sanitized before rendering.

Heading IDs are generated from the heading text; duplicate headings get numeric suffixes. Keep headings stable when inbound anchor links matter. Missing document or image files fail compilation. External URLs and anchor destinations are not automatically checked.

## Application structure

- `scripts/content.mjs`: TOML navigation, Markdown conversion, sanitization, heading extraction, asset copying, and search text.
- `src/App.vue`: reading layout, routes, local search dialog, mobile navigation, code copying, and page outline.
- `src/style.css`: Tailwind and shared design styles inspired by celveren.dev.
- `scripts/prerender.mjs`: static pages and the 404 document.
- `tests/content.test.mjs`: content compatibility and safety checks.

Generated content, copied assets, dependencies, and build output are ignored by Git. Commit `package-lock.json` for reproducible installs.

Documentation search is temporarily disabled. The application does not render a search dialog, register a search shortcut, or import the search engine. The custom JavaScript engine in `src/search.js` and its tests remain available for future re-enablement.

The typography uses Manrope and Cormorant Garamond from Google Fonts, with local system fallbacks. The palette and type pairing follow Célveren's branding; the documentation layout and interface are purpose-built for Lightning.

## Themes

Dark mode uses muted amber-orange (`#e89a62`) for primary actions and accents, with a lighter `#f0b58a` for accent text. Light mode uses Célveren’s green (`#385c30`), pale background (`#f4f7f5`), and green ink (`#18251f`). Shared CSS tokens in `src/style.css` cover all surfaces. The header theme button follows the operating system by default and saves explicit choices locally under `lightning-theme`. Theme initialization runs before rendering to avoid a flash of the wrong palette.

## Docker Compose

For production on the shared VPS, use the [GitHub Actions deployment guide](docs/DEPLOYMENT.md). It reuses the portfolio's deployment interface for `https://lightningbot.app`: builds on `master`, GitHub deployment statuses, SSH upload, and atomic releases under `/var/www/lightning-docs/current`.

Docker builds the Vue site in a Node 22 stage, runs the content tests, and copies only the finished static files into Nginx. Node and the source files are not needed at runtime.

```sh
docker compose up --build -d
```

Open http://localhost:8080. The default port binds to localhost. To change the port:

```sh
DOCS_PORT=8090 docker compose up --build -d
```

To expose the site on your host’s network interfaces, set `DOCS_BIND_ADDRESS=0.0.0.0`. These variables may also be set in a local `.env` file (do not commit it). For HTTPS, place the service behind your existing TLS reverse proxy.

```sh
docker compose logs -f docs
docker compose ps
docker compose down
```

Without Watch, run `docker compose up --build -d` again after changing documentation or application files. No volumes are required. Nginx serves the prerendered routes and returns a real 404 for unknown pages; `/healthz` provides the container health check. Base image tags track Node 22 and stable Nginx; use `docker compose build --pull` to refresh them.

## Marketing page

The main `/` route is the public marketing page, authored in `src/marketing.html` and shared between Vue and the static build. The documentation Welcome page lives at `/docs`. Existing guide, reference, and policy URLs remain unchanged. Both surfaces share the theme switch and favicon. Docker serves both from the same build.

The Welcome page uses its dedicated introduction and guide cards. `src/welcome.md` provides matching static content, search text, and the page outline; `README.md` is retained as a repository document and is not rendered on Welcome.

Documentation readers can choose Standard (16px body), Large (18px), or Largest (20px) in the header. Sizes use rem units to respect browser font settings. The preference is saved locally as `lightning-docs-text-size`. Scaling is scoped to documentation content, navigation, and search; the marketing page and navbar wordmark are unaffected. Static documentation also uses the comfortable default size.

## Docker Compose Watch

Start the site and watch local changes with Docker Compose 2.22 or newer:

```sh
docker compose up --build --watch
```

Or, if the service is already running in the background:

```sh
docker compose watch
```

Edits to application code, Markdown, assets, dependencies, build scripts, the Dockerfile, or Nginx configuration rebuild the image and recreate the docs container. The existing Docker build runs the content tests before producing the site. Refresh your browser after the rebuild finishes; this production Nginx setup does not provide browser hot reload.

Generated output, installed dependencies, Git metadata, and local environment files are excluded to prevent rebuild loops. Changes to `compose.yaml` or `.env` require restarting Compose manually. `ENGINE.md` is excluded because it is contributor documentation, not site content. Stop foreground Watch with Ctrl+C; use `docker compose down` to remove the service when finished.

Documentation readers can personalize command examples using **Default prefix (.)**, **Slash commands (/)**, or **Custom prefix** above the article. The preference is saved locally as `lightning-docs-prefix` and applies across pages, including copied code. Only command prefixes in code examples change; links, arguments, and source Markdown remain intact. This display preference does not configure Lightning or guarantee slash-command availability.

Write personalizable commands as `{{ selected_prefix }}ban @Member` in inline code, fenced code blocks, or HTML table code cells. `src/command-prefix.js` replaces only this exact marker inside code elements, HTML-escapes the selected prefix, and never compiles documentation as a Vue template. Literal examples (such as the mention command used to configure a prefix) stay unchanged. Static pages render markers with `.` before JavaScript loads.
