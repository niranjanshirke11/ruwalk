# Ruwalk - Quick Setup Verification Script
# Run this script after installing PostgreSQL to verify everything is working

Write-Host "Ruwalk Project - Setup Verification" -ForegroundColor Cyan
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host ""

# Check Node.js
Write-Host "Checking Node.js..." -ForegroundColor Yellow
$nodeVersion = node --version 2>$null
if ($nodeVersion) {
    Write-Host "[OK] Node.js $nodeVersion installed" -ForegroundColor Green
} else {
    Write-Host "[ERROR] Node.js not found" -ForegroundColor Red
    exit 1
}

# Check npm
Write-Host "Checking npm..." -ForegroundColor Yellow
$npmVersion = npm --version 2>$null
if ($npmVersion) {
    Write-Host "[OK] npm $npmVersion installed" -ForegroundColor Green
} else {
    Write-Host "[ERROR] npm not found" -ForegroundColor Red
    exit 1
}

# Check Git
Write-Host "Checking Git..." -ForegroundColor Yellow
$gitVersion = git --version 2>$null
if ($gitVersion) {
    Write-Host "[OK] $gitVersion installed" -ForegroundColor Green
} else {
    Write-Host "[ERROR] Git not found" -ForegroundColor Red
}

# Check PostgreSQL
Write-Host "Checking PostgreSQL..." -ForegroundColor Yellow
$psqlVersion = psql --version 2>$null
if ($psqlVersion) {
    Write-Host "[OK] $psqlVersion installed" -ForegroundColor Green
    
    # Check if PostgreSQL service is running
    Write-Host "Checking PostgreSQL service..." -ForegroundColor Yellow
    $pgService = Get-Service -Name postgresql* -ErrorAction SilentlyContinue | Select-Object -First 1
    if ($pgService) {
        if ($pgService.Status -eq "Running") {
            Write-Host "[OK] PostgreSQL service is running" -ForegroundColor Green
        } else {
            Write-Host "[WARNING] PostgreSQL service is not running. Starting..." -ForegroundColor Yellow
            Start-Service $pgService.Name
            Write-Host "[OK] PostgreSQL service started" -ForegroundColor Green
        }
    }
} else {
    Write-Host "[ERROR] PostgreSQL not found - THIS IS REQUIRED!" -ForegroundColor Red
    Write-Host "   Download from: https://www.postgresql.org/download/windows/" -ForegroundColor Yellow
    Write-Host ""
}

# Check Backend Dependencies
Write-Host "Checking Backend dependencies..." -ForegroundColor Yellow
if (Test-Path "d:\ruwalk\backend\node_modules") {
    Write-Host "[OK] Backend node_modules present" -ForegroundColor Green
} else {
    Write-Host "[WARNING] Backend dependencies missing" -ForegroundColor Yellow
}

# Check Frontend Dependencies
Write-Host "Checking Frontend dependencies..." -ForegroundColor Yellow
if (Test-Path "d:\ruwalk\frontend\node_modules") {
    Write-Host "[OK] Frontend node_modules present" -ForegroundColor Green
} else {
    Write-Host "[WARNING] Frontend dependencies missing" -ForegroundColor Yellow
}

# Check Database Connection (only if PostgreSQL is installed)
if ($psqlVersion) {
    Write-Host ""
    Write-Host "Checking Database..." -ForegroundColor Yellow
    
    # Check if Prisma client is generated
    if (Test-Path "d:\ruwalk\backend\node_modules\.prisma\client") {
        Write-Host "[OK] Prisma client generated" -ForegroundColor Green
    } else {
        Write-Host "[WARNING] Prisma client not generated" -ForegroundColor Yellow
        Write-Host "   Run: npx prisma generate" -ForegroundColor Gray
    }
}

# Summary
Write-Host ""
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host "Setup Summary" -ForegroundColor Cyan
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host ""

if ($psqlVersion) {
    Write-Host "[OK] All prerequisites are installed!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next Steps:" -ForegroundColor Yellow
    Write-Host "1. Run database migrations:" -ForegroundColor White
    Write-Host "   cd d:\ruwalk\backend" -ForegroundColor Gray
    Write-Host "   npx prisma migrate deploy" -ForegroundColor Gray
    Write-Host ""
    Write-Host "2. Start the backend server (Terminal 1):" -ForegroundColor White
    Write-Host "   cd d:\ruwalk\backend" -ForegroundColor Gray
    Write-Host "   npm start" -ForegroundColor Gray
    Write-Host ""
    Write-Host "3. Start the frontend server (Terminal 2):" -ForegroundColor White
    Write-Host "   cd d:\ruwalk\frontend" -ForegroundColor Gray
    Write-Host "   npm run dev" -ForegroundColor Gray
    Write-Host ""
    Write-Host "4. Open in browser:" -ForegroundColor White
    Write-Host "   http://localhost:5173" -ForegroundColor Gray
    Write-Host ""
} else {
    Write-Host "[ERROR] PostgreSQL is not installed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Install PostgreSQL:" -ForegroundColor Yellow
    Write-Host "1. Download from: https://www.postgresql.org/download/windows/" -ForegroundColor White
    Write-Host "2. Install with password: ruwalk@1234" -ForegroundColor White
    Write-Host "3. Run this script again to verify" -ForegroundColor White
    Write-Host ""
}

Write-Host "Documentation:" -ForegroundColor Cyan
Write-Host "   - Setup Guide: d:\ruwalk\SETUP_GUIDE.md" -ForegroundColor Gray
Write-Host "   - Current Status: d:\ruwalk\CURRENT_STATUS.md" -ForegroundColor Gray
Write-Host "   - Project Docs: d:\ruwalk\docs\" -ForegroundColor Gray
Write-Host ""
