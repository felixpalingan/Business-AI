Get-ChildItem -Path "components","app" -Recurse -Include "*.tsx","*.ts" | ForEach-Object {
  $content = Get-Content $_.FullName -Raw
  if ($content -match "orange") {
    $newContent = $content `
      -replace "orange-950", "red-950" `
      -replace "orange-900", "red-900" `
      -replace "orange-800", "red-800" `
      -replace "orange-700", "red-700" `
      -replace "orange-600", "red-600" `
      -replace "orange-500", "red-500" `
      -replace "orange-400", "red-400" `
      -replace "orange-300", "red-300" `
      -replace "orange-200", "red-200" `
      -replace "orange-100", "red-100" `
      -replace "orange-50", "red-50"
    Set-Content $_.FullName -Value $newContent -NoNewline
    Write-Host ("Updated: " + $_.Name)
  }
}
