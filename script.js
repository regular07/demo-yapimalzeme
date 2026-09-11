/* ============================================================
   Kırmızı Çekiç Yapı Market — script.js
   Bootstrap'in kendi JS'i (navbar collapse, toast vb.) otomatik
   çalışır. Burada Bootstrap'in karşılamadığı davranışları yazıyoruz:

   01. Ürün kataloğu kategori filtresi (data-category + show/hide)
   02. Toptan / Perakende sekme geçişi
   03. "Teknik Föy İndir" butonları — demo sitede dosya bağlı değil,
       tıklanınca bilgilendirme toast'ı gösterilir
   04. Çalışma saatlerinde "bugün" satırını otomatik vurgulama
   05. Sayfa başına dön butonu
   06. Mobil menüde bir linke tıklayınca menüyü otomatik kapatma
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ============================================================
     01. ÜRÜN KATALOĞU FİLTRESİ
     Filtre butonları data-filter="tumu|kimyasal|boya|hirdavat|nalbur"
     taşır. Ürün kartları data-category="kimyasal" vb. taşır.
     "tümü" seçiliyse ya da eşleşme varsa kart gösterilir.
     ============================================================ */
  var filterBtns = document.querySelectorAll('.filter-btn');
  var productCards = document.querySelectorAll('[data-category]');

  if (filterBtns.length && productCards.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var target = btn.dataset.filter;

        // Aktif buton görünümünü güncelle
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        // Kartları göster/gizle
        productCards.forEach(function (card) {
          var match = target === 'tumu' || card.dataset.category === target;
          card.closest('.product-col').hidden = !match;
        });
      });
    });
  }

  /* ============================================================
     02. TOPTAN / PERAKENDE SEKME GEÇİŞİ
     ============================================================ */
  var tradeTabBtns = document.querySelectorAll('.trade-tab-btn');
  var tradePanels = document.querySelectorAll('.trade-panel');

  if (tradeTabBtns.length && tradePanels.length) {
    tradeTabBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var target = btn.dataset.tab;

        tradeTabBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        tradePanels.forEach(function (panel) {
          panel.hidden = panel.dataset.panel !== target;
        });
      });
    });
  }

  /* ============================================================
     03. TEKNİK FÖY (TDS) İNDİRME — DEMO UYARISI
     Gerçek dosya bağlı değil; buton profesyonel görünsün diye
     tıklanınca kısa bir toast bildirimi gösteriyoruz.
     ============================================================ */
  var tdsButtons = document.querySelectorAll('.btn-tds');
  var demoToastEl = document.getElementById('demoToast');
  var demoToast = null;
  if (demoToastEl && typeof bootstrap !== 'undefined') {
    demoToast = new bootstrap.Toast(demoToastEl, { delay: 3200 });
  }
  tdsButtons.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      if (demoToast) demoToast.show();
    });
  });

  /* ============================================================
     04. BUGÜNÜ VURGULA
     Çalışma saatleri listesindeki her <li> data-day="1"(Pazartesi)..
     "7"(Pazar) taşıyor. JS, tarayıcının yerel gün bilgisine bakıp
     ilgili satıra "today" sınıfını ekliyor.
     ============================================================ */
  var today = new Date().getDay(); // 0 = Pazar ... 6 = Cumartesi
  var isoDay = today === 0 ? 7 : today; // 1=Pzt ... 7=Paz'a çeviriyoruz
  document.querySelectorAll('.hours-list li[data-day]').forEach(function (li) {
    if (parseInt(li.dataset.day, 10) === isoDay) {
      li.classList.add('today');
    }
  });

  /* ============================================================
     05. SAYFA BAŞINA DÖN
     ============================================================ */
  var scrollTopBtn = document.getElementById('scrollTop');
  if (scrollTopBtn) {
    window.addEventListener('scroll', function () {
      scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
    });
    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ============================================================
     06. MOBİL MENÜYÜ LİNKE TIKLAYINCA KAPAT
     ============================================================ */
  var navbarCollapseEl = document.getElementById('navbarContent');
  if (navbarCollapseEl && typeof bootstrap !== 'undefined') {
    var bsCollapse = new bootstrap.Collapse(navbarCollapseEl, { toggle: false });
    navbarCollapseEl.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        if (navbarCollapseEl.classList.contains('show')) bsCollapse.hide();
      });
    });
  }

  /* ============================================================
     05. KATEGORİ DERİN BAĞLANTISI
     Ana sayfadaki kategori kartları urunler.html'e giderken
     ?kategori=... ekliyor; katalog sayfası açılınca ilgili
     filtre kendiliğinden seçili geliyor.
     (Ana sayfada tıklama anında adrese parametre eklenir.)
     ============================================================ */
  // a) Ana sayfa: kategori kartına tıklanınca adrese parametre ekle
  document.querySelectorAll('[data-goto-filter]').forEach(function (link) {
    link.addEventListener('click', function () {
      var kat = link.dataset.gotoFilter;
      if (kat) link.href = 'urunler.html?kategori=' + encodeURIComponent(kat) + '#katalog';
    });
  });

  // b) Katalog sayfası: parametre varsa o filtreyi tetikle
  var istenenKategori = new URLSearchParams(location.search).get('kategori');
  if (istenenKategori) {
    var hedefBtn = document.querySelector('.filter-btn[data-filter="' + istenenKategori + '"]');
    if (hedefBtn) hedefBtn.click();
  }

});
