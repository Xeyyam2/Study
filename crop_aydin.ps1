Add-Type -AssemblyName System.Drawing
$path = "C:\Users\Asus\OneDrive\Desktop\study\tuition-fees-programs.png"
$img = [System.Drawing.Image]::FromFile($path)
$W = [int]$img.Width
$H = [int]$img.Height
Write-Output "Size: $W x $H"
$bandCount = 4
$bandH = [int]($H / $bandCount)
for ($band = 0; $band -lt $bandCount; $band++) {
  $y = $band * $bandH
  $cropH = $bandH
  if ($band -eq ($bandCount - 1)) { $cropH = $H - $y }
  $bmp = New-Object System.Drawing.Bitmap([int]$W, [int]$cropH)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $srcRect = New-Object System.Drawing.Rectangle(0, $y, $W, $cropH)
  $dstRect = New-Object System.Drawing.Rectangle(0, 0, $W, $cropH)
  $g.DrawImage($img, $dstRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
  $g.Dispose()
  $scale = 3
  $bigW = [int]($W * $scale)
  $bigH = [int]($cropH * $scale)
  $big = New-Object System.Drawing.Bitmap($bigW, $bigH)
  $g2 = [System.Drawing.Graphics]::FromImage($big)
  $g2.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g2.DrawImage($bmp, 0, 0, $bigW, $bigH)
  $g2.Dispose()
  $out = "C:\Users\Asus\OneDrive\Desktop\study\aydin_band$band.png"
  $big.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)
  $bmp.Dispose(); $big.Dispose()
  Write-Output "Saved $out"
}
$img.Dispose()
Write-Output "Done"
