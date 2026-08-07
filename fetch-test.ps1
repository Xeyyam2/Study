cd "C:\Users\Asus\OneDrive\Desktop\study"
$out = "fetch-results.txt"
Set-Content $out ""
function T($url) {
  try {
    $r = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 180
    $h = $r.Content
    $title = if ($h -match '<title[^>]*>(.*?)</title>') { $matches[1] } else { 'NO_TITLE' }
    $h1 = if ($h -match '<h1[^>]*>([\s\S]*?)</h1>') { ($matches[1] -replace '<[^>]+>','').Trim() } else { 'NO_H1' }
    $nf = if ($h -match "you're looking for") { 'LOCALIZED_NF' } elseif ($h -match 'you are looking for') { 'ROOT_NF' } else { 'NOT_NF' }
    $uni = if ($h -match 'Bahcesehir|bahcesehir|Istanbul|Ankara|Hacettepe|Bogazici') { 'HAS_UNI' } else { 'NO_UNI' }
    "URL=$url STATUS=$($r.StatusCode) TITLE=$title H1=$h1 NF=$nf UNI=$uni"
  } catch { "URL=$url ERR=$($_.Exception.Message)" }
}
T "http://localhost:3000/en/universities" | Add-Content $out
T "http://localhost:3000/en/universities/bahcesehir-university" | Add-Content $out
T "http://localhost:3000/en" | Add-Content $out
"DONE" | Add-Content $out
