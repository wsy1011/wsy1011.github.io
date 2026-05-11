# Site Data

Maintain homepage content in these CSV files:

- `publications/publications.csv`
- `awards/awards.csv`

After editing a CSV file, run this from the repository root:

```powershell
.\update-site-data.ps1
```

The command regenerates `assets/site-data.js`, which is the file loaded by `index.html`.

Do not edit `assets/site-data.js` directly unless you are deliberately bypassing the table workflow.
