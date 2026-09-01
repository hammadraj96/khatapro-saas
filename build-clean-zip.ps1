Copy-Item -Path 'index.html' -Destination 'index-ur.html' -Force
Copy-Item -Path 'use-cases.html' -Destination 'use-cases-en.html' -Force
Copy-Item -Path 'use-cases.html' -Destination 'use-case-en.html' -Force
Copy-Item -Path 'use-cases-ur.html' -Destination 'use-case-ur.html' -Force
Copy-Item -Path 'pos-counter.html' -Destination 'pos-counter-en.html' -Force

$files = @(
  'index.html',
  'index-ur.html',
  'index-en.html',
  'use-cases.html',
  'use-cases-en.html',
  'use-cases-ur.html',
  'use-case-en.html',
  'use-case-ur.html',
  'pos-counter.html',
  'pos-counter-en.html',
  'pos-counter-ur.html',
  'style.css',
  'app.js'
)

$destScratch = 'c:\Users\Ayaz ul Hammad\.gemini\antigravity-ide\scratch\khatapro-clean.zip'
$destArtifact = 'C:\Users\Ayaz ul Hammad\.gemini\antigravity-ide\brain\818d33a2-71b6-48ae-8d9f-e062775f6faf\khatapro-clean.zip'

if (Test-Path $destScratch) { Remove-Item $destScratch -Force }
if (Test-Path $destArtifact) { Remove-Item $destArtifact -Force }

Compress-Archive -Path $files -DestinationPath $destScratch -Force
Copy-Item -Path $destScratch -Destination $destArtifact -Force
Get-Item $destScratch | Select-Object Name, Length, LastWriteTime
