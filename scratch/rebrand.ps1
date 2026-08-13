Get-ChildItem -Path "components","app" -Recurse -Include "*.tsx","*.ts" | ForEach-Object {
  $content = Get-Content $_.FullName -Raw
  if ($content -match "violet") {
    $newContent = $content `
      -replace "violet-950", "red-950" `
      -replace "violet-900", "red-900" `
      -replace "violet-800", "red-800" `
      -replace "violet-700", "red-700" `
      -replace "violet-600", "red-600" `
      -replace "violet-500", "red-500" `
      -replace "violet-400", "red-400" `
      -replace "violet-300", "red-300" `
      -replace "violet-200", "red-200" `
      -replace "violet-100", "red-100" `
      -replace "violet-50", "red-50"
    Set-Content $_.FullName -Value $newContent -NoNewline
    Write-Host ("Updated: " + $_.Name)
  }
}
