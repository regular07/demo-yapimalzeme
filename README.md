# Kırmızı Çekiç Yapı Market — Demosantia portfolyo demosu

Yapı malzemeleri / hırdavat sektörü için **Standart paket** örneği.
Tüm işletme bilgileri (ad, adres, telefon, e-posta) **kurgusaldır**.

## Sayfalar
- `index.html` — hero, kategoriler, hakkımızda, toptan/perakende, çalışma saatleri, iletişim
- `urunler.html` — filtrelenebilir ürün kataloğu; her üründe kullanım talimatı + çapraz satış önerisi

## Yerelde çalıştırma
```bash
python3 -m http.server 8110
# http://localhost:8110
```

## Görsel yuvası
Hero arka planı `assets/img/hero.jpg` dosyasını bekler. Dosya yoksa CSS gradyan
fallback devreye girer ve site bozulmaz. Görsel eklemek için:
`assets/img/hero.jpg` yoluna 1600×900 civarı bir JPEG koymak yeterli.

## Telefon numaraları
Demoda görünen numaralar **son 6 hanesi sıfır** olan, aboneye atanmayan
numaralardır (0242 000 00 00 / 0535 000 00 00). Müşteri işine uyarlanırken
`index.html`, `urunler.html` içindeki `tel:` ve `wa.me` bağlantıları değiştirilmelidir.

## Teknoloji
Bootstrap 5.3 (CDN) + vanilla JS. Derleme adımı yok.
