# Register PostgreSQL as Windows Service
# Run this script as Administrator

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "PostgreSQL Service Registration Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if running as administrator
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-Host "[ERROR] This script must be run as Administrator!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please:" -ForegroundColor Yellow
    Write-Host "1. Right-click PowerShell" -ForegroundColor White
    Write-Host "2. Select 'Run as Administrator'" -ForegroundColor White
    Write-Host "3. Navigate to: cd d:\ruwalk" -ForegroundColor White
    Write-Host "4. Run: .\register-postgresql-service.ps1" -ForegroundColor White
    Write-Host ""
    pause
    exit 1
}

Write-Host "[OK] Running as Administrator" -ForegroundColor Green
Write-Host ""

# PostgreSQL paths
$pgBin = "C:\Program Files\PostgreSQL\18\bin\pg_ctl.exe"
$pgData = "C:\Program Files\PostgreSQL\18\data"
$serviceName = "postgresql-18"

# Check if PostgreSQL exists
if (-not (Test-Path $pgBin)) {
    Write-Host "[ERROR] PostgreSQL not found at: $pgBin" -ForegroundColor Red
    exit 1
}

Write-Host "[OK] PostgreSQL found" -ForegroundColor Green
Write-Host ""

# Check if service already exists
$existingService = Get-Service -Name $serviceName -ErrorAction SilentlyContinue

if ($existingService) {
    Write-Host "[INFO] Service '$serviceName' already exists" -ForegroundColor Yellow
    Write-Host "       Status: $($existingService.Status)" -ForegroundColor Yellow
    
    if ($existingService.Status -ne "Running") {
        Write-Host ""
        Write-Host "Starting service..." -ForegroundColor Yellow
        Start-Service $serviceName
        Write-Host "[OK] Service started" -ForegroundColor Green
    } else {
        Write-Host "[OK] Service is already running" -ForegroundColor Green
    }
} else {
    Write-Host "Registering PostgreSQL as Windows service..." -ForegroundColor Yellow
    
    # Register the service
    $result = & $pgBin register -N $serviceName -D $pgData 2>&1
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "[OK] Service registered successfully" -ForegroundColor Green
        
        # Start the service
        Write-Host ""
        Write-Host "Starting service..." -ForegroundColor Yellow
        Start-Service $serviceName
        
        # Set to automatic startup
        Write-Host "Setting service to start automatically..." -ForegroundColor Yellow
        Set-Service $serviceName -StartupType Automatic
        
        Write-Host "[OK] Service started and set to automatic" -ForegroundColor Green
    } else {
        Write-Host "[ERROR] Failed to register service" -ForegroundColor Red
        Write-Host "Error: $result" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Service Status" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

$service = Get-Service -Name $serviceName
Write-Host "Name:        $($service.Name)" -ForegroundColor White
Write-Host "Status:      $($service.Status)" -ForegroundColor $(if ($service.Status -eq "Running") { "Green" } else { "Red" })
Write-Host "Start Type:  $($service.StartType)" -ForegroundColor White

Write-Host ""
Write-Host "[SUCCESS] PostgreSQL is now running as a Windows service!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Create database: psql -U postgres -c `"CREATE DATABASE ruwalk_db;`"" -ForegroundColor White
Write-Host "2. Run migrations: cd d:\ruwalk\backend && npx prisma migrate deploy" -ForegroundColor White
Write-Host "3. Start backend:  cd d:\ruwalk\backend && npm start" -ForegroundColor White
Write-Host "4. Start frontend: cd d:\ruwalk\frontend && npm run dev" -ForegroundColor White
Write-Host ""
