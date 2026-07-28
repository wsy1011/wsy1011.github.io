window.DATASET_DETAILS = {
  "cepii-data-portal": {
    title: "Dataset catalogue",
    columns: ["Family", "Public entries", "Time / space", "Access"],
    rows: [
      ["International trade", "BACI; CHELEM; MAcMap-HS6; TRADHIST", "Bilateral country/product data; coverage varies by product", "CEPII catalogue and item pages"],
      ["Gravity", "Distances, contiguity, common language, colonial and other bilateral indicators", "Country pairs; mostly time-invariant or release-specific", "Gravity item page"],
      ["Indicators", "Trade openness, revealed comparative advantage, concentration and related indicators", "Country or country-pair panels; series-specific years", "Selected downloads / tables"],
      ["Macroeconomy", "Macro reference series linked to trade and country comparisons", "Country and year dimensions depend on the dataset", "Catalogue metadata and files"]
    ]
  },
  "eurostat-database": {
    title: "Public database structure",
    columns: ["Branch", "Concrete coverage", "Time / space", "Format"],
    rows: [
      ["Detailed datasets", "National accounts, prices, population, labour, trade, transport, energy, environment and more", "Country, regional and EU aggregates; table-specific periods", "Data Browser, SDMX-CSV, JSON, TSV, XLSX"],
      ["Selected datasets", "Reduced indicator tables for GDP, unemployment, prices, demography, energy and other common questions", "Usually 2–3 dimensions; table-specific periods", "Data Browser and downloads"],
      ["EU policy collections", "Euro indicators, sustainable development, circular economy, social-rights and macroeconomic-imbalance indicators", "EU policy-specific country / time coverage", "Curated database views"],
      ["Cross-cutting themes", "Regions and cities, land cover, international cooperation and other combined topics", "Regional or country coverage depends on source", "Curated views and source tables"]
    ]
  },
  "grades-discharge": {
    title: "Products and fields",
    columns: ["Product / field", "What is supplied", "Time range", "Spatial range"],
    rows: [
      ["GRADES legacy", "Model-derived daily discharge", "1980–2013", "About 2.94 million global vector reaches"],
      ["GRADES-hydroDL", "Daily streamflow / discharge with retrospective and recent views", "1980–near present; monthly NRT update after ERA5", "About 2.94 million reaches, 60°S–90°N"],
      ["Hydrography", "MERIT-Hydro / MERIT-Basins routing network and reach identifiers", "Static network release", "Global vector river network"],
      ["Forcing / attributes", "MSWEP precipitation, ERA5 meteorology, PROBA-V LAI, climate/topography/soil attributes", "Input-specific", "Global model domain"]
    ]
  },
  "worldclim": {
    title: "WorldClim v2.1 data dictionary",
    columns: ["Family", "Concrete items", "Time range", "Spatial range / resolution"],
    rows: [
      ["Monthly temperature", "tmin, tavg, tmax", "1970–2000 climatology; 12 monthly layers", "Global land; 30 arc-sec, 2.5, 5, 10 arc-min"],
      ["Monthly water / energy", "prec, srad, wind, vapor pressure", "1970–2000 climatology; 12 monthly layers", "Same four resolutions; variable-specific units"],
      ["Bioclimatic variables", "BIO1–BIO19: means, ranges, seasonality and wet/dry quarter extremes", "1970–2000 climatology", "About 1 km to 340 km cells"],
      ["Elevation reference", "elev", "Static reference layer", "Same four resolutions; SRTM-derived"]
    ]
  },
  "earthenv-topography": {
    title: "EarthEnv topographic layers",
    columns: ["Layer group", "Concrete items", "Source", "Spatial range"],
    rows: [
      ["Elevation and derivatives", "Elevation, slope, aspect, eastness, northness", "GMTED2010 250 m and near-global SRTM4.1dev 90 m", "Global; 1, 5, 10, 50, 100 km grains"],
      ["Surface complexity", "Roughness, terrain ruggedness index, vector ruggedness measure, topographic position index", "Derived from the standardized DEM stack", "Global; multiple aggregation grains"],
      ["Curvature", "Profile / tangential curvature and first / second order partial derivatives", "Derived terrain surfaces", "Global; multiple aggregation grains"],
      ["Landform classes", "Ten geomorphological landform classes", "Categorical derivation from terrain variables", "Global; product-specific resolutions"]
    ]
  },
  "gridded-gdp": {
    title: "Zenodo record contents",
    columns: ["Item", "Measure", "Time range", "Spatial range"],
    rows: [
      ["GDP per capita", "GDP per person at purchasing power parity", "1990–2022", "Global gridded raster; check release mask"],
      ["Annual spatial layers", "Year-specific gridded economic values", "One layer per year where supplied", "Global land-oriented grid"],
      ["Metadata / provenance", "Record description, citation, files and version information", "Versioned Zenodo release", "Record-level metadata"],
      ["Derived use", "Exposure, accessibility and economic-weighting covariate", "User-defined analysis period", "Any aggregation supported by the raster"]
    ]
  },
  "globpop": {
    title: "GlobPOP data dictionary",
    columns: ["Item", "Measure", "Time range", "Spatial range / access"],
    rows: [
      ["Population estimate", "Annual gridded population", "1990–2022", "Global grid; Google Earth Engine asset"],
      ["Population density", "Cell population normalized by cell area", "Derived for each annual layer", "Global land cells"],
      ["Year bands", "One annual layer / band per year in the collection", "33 annual snapshots", "Collection-specific projection and scale"],
      ["Provenance", "Cluster-analysis and statistical-learning description, citation and Zenodo record", "Versioned project documentation", "Community Catalog project page"]
    ]
  },
  "river-co2-transfer": {
    title: "Paper-supplied inputs",
    columns: ["Input", "Concrete fields", "Time / support", "Access route"],
    rows: [
      ["Gas transfer", "Gas-transfer velocity k and related exchange parameters", "Model- and method-dependent", "Liu et al. 2022 article and supplement"],
      ["River CO₂ evasion", "Riverine CO₂ evasion / flux estimates", "Seasonal or annual summaries as defined by the source", "PNAS article and supplement"],
      ["Hydrologic controls", "Water throughput, river surface area and discharge-related fields", "Monthly / annual model support", "Methods, tables and supplementary files"],
      ["Provenance", "DOI, reference number, table, unit and transformation", "Required for every extracted variable", "Paper-level citation record"]
    ]
  },
  "soil-respiration": {
    title: "Hashimoto et al. model outputs",
    columns: ["Item", "What it contains", "Time range", "Spatial range"],
    rows: [
      ["Total soil respiration", "Climate-driven total soil respiration flux", "1965–2012; monthly", "Global 0.5° grid"],
      ["Heterotrophic respiration", "Decomposition / microbial component", "1965–2012; monthly", "Global 0.5° grid"],
      ["Autotrophic respiration", "Root and plant-associated component", "1965–2012; monthly", "Global 0.5° grid"],
      ["Calibration observations", "More than one thousand field observations used to parameterize the semi-empirical model", "Observation dates vary", "Point observations aggregated into global model"]
    ]
  }
};
