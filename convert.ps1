Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Bitmap]::FromFile("c:\Users\haris\Downloads\AG Whatsapp\AG\assets\logo.jpeg")
$img.MakeTransparent([System.Drawing.Color]::White)
$img.Save("c:\Users\haris\Downloads\AG Whatsapp\AG\assets\logo.png", [System.Drawing.Imaging.ImageFormat]::Png)
$img.Dispose()
