$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $root

python .\scripts\build_site_data.py

Write-Host ""
Write-Host "Done. Edit CSV files under .\data\, then run .\update-site-data.ps1 again."
