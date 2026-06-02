# Suyang Wang Personal Homepage

This repository hosts the personal academic homepage of Suyang Wang.

The site is a static single-page homepage built with plain HTML, Tailwind CSS via CDN, and local image assets. It is designed to be hosted directly with GitHub Pages.

## Contents

- Academic profile and contact links
- Education and research focus
- GitHub recent 30-day contribution calendar
- Publications with expandable detail cards
- Demo dropdown linking to interactive research subpages
- Photography gallery with image preview
- Awards and honors
- Footer notice for template reuse under the MIT License

## Project Structure

```text
.
+-- assets/
|   +-- avatar.png
|   +-- main.js
|   +-- photo-0401.jpg
|   +-- photo-2087.jpg
|   +-- photo-6324.jpg
|   +-- site-data.js        # generated from data/, do not edit by hand
+-- data/
|   +-- awards/
|   |   +-- awards.csv
|   +-- publications/
|       +-- publications.csv
+-- demos/
|   +-- coordination-frictions/
|       +-- index.html
+-- scripts/
|   +-- build_site_data.py
+-- index.html
+-- LICENSE
+-- README.md
+-- update-site-data.ps1
```

## Local Preview

Open `index.html` directly in a browser:

```text
file:///D:/Code/personal-homepage/index.html
```

No build step is required.

## Editing Content

Edit source tables under `data/`, then regenerate the homepage data file:

```powershell
.\update-site-data.ps1
```

The main files are:

- `data/publications/publications.csv` for publications, working papers, and theses
- `data/awards/awards.csv` for awards and honors
- `assets/site-data.js` is generated from the CSV files and should not be edited by hand

The homepage layout stays in `index.html`, while carousel rendering, modals, scrolling, and gallery interactions live in `assets/main.js`.

The GitHub contribution module is rendered client-side for `wsy1011` from public contribution calendar data and shows the recent 30 days. If the public endpoint is unavailable, the module falls back to a profile link instead of blocking the page.

## GitHub Pages

This repository is intended to be published as a GitHub user site:

```text
https://wsy1011.github.io/
```

In GitHub repository settings, use:

- Source: `Deploy from a branch`
- Branch: `main`
- Folder: `/ (root)`

## Template Reuse

If you use this personal homepage template, please acknowledge the original template and comply with the MIT License.

## License

This project is released under the MIT License. See [LICENSE](LICENSE) for details.
