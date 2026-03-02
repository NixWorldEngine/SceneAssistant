$ErrorActionPreference = "Stop"
$root = $PSScriptRoot

if (!(Test-Path (Join-Path $root "node_modules"))) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    Push-Location $root
    npm install 2>&1 | Out-Null
    Pop-Location
}

Write-Host "`n--- Vite Build ---" -ForegroundColor Yellow
Push-Location $root
npx vite build
Pop-Location
if ($LASTEXITCODE -ne 0) {
    Write-Error "Vite build failed"
    exit 1
}

$distDir = Join-Path $root "dist"
$jsFile = Get-ChildItem -Path $distDir -Filter "*.js" | Select-Object -First 1
$cssFile = Get-ChildItem -Path $distDir -Filter "*.css" | Select-Object -First 1

if (!$jsFile) {
    Write-Error "No JS file found in dist/"
    exit 1
}

Write-Host "  $($jsFile.Name) = $([math]::Round($jsFile.Length / 1024, 1)) KB"
if ($cssFile) {
    Write-Host "  $($cssFile.Name) = $([math]::Round($cssFile.Length / 1024, 1)) KB"
}

Write-Host "`n--- Pack PNG ---" -ForegroundColor Yellow

$packScript = Join-Path (Join-Path $root "scripts") "pack-png.js"
$result = node $packScript 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Error "PNG pack failed: $result"
    exit 1
}

$info = $result | Select-Object -Last 1 | ConvertFrom-Json
$pngSize = $info.size

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  VIEW BUILD" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "  view.png".PadRight(30) -NoNewline
Write-Host "$([math]::Round($pngSize / 1024, 1)) KB" -ForegroundColor Gray
Write-Host ""
Write-Host "  Output: $(Join-Path $root 'build')" -ForegroundColor Gray
Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
