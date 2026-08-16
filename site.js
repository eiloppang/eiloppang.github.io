/* eiloppang.com — shared behaviour: language + theme */
(function () {
  var root = document.documentElement;

  function applyLang(lang) {
    root.setAttribute('data-lang', lang);
    root.setAttribute('lang', lang === 'en' ? 'en' : 'ko');
    var t = root.getAttribute(lang === 'en' ? 'data-title-en' : 'data-title-ko');
    if (t) document.title = t;
    document.querySelectorAll('[data-lang-btn]').forEach(function (b) {
      b.setAttribute('aria-label', lang === 'en' ? 'Switch to Korean' : 'Switch to English');
    });
  }

  function applyTheme(theme) {
    if (theme) root.setAttribute('data-theme', theme);
    else root.removeAttribute('data-theme');
  }

  // restore: ?lang=… in the URL wins, then the saved choice, then English (default)
  var savedLang, savedTheme;
  try { savedLang = localStorage.getItem('site-lang'); } catch (e) {}
  try { savedTheme = localStorage.getItem('site-theme'); } catch (e) {}

  var urlLang = (location.search.match(/[?&]lang=(ko|en)\b/) || [])[1];
  if (urlLang) {
    savedLang = urlLang;
    try { localStorage.setItem('site-lang', urlLang); } catch (e) {}
  }

  applyLang(savedLang === 'ko' ? 'ko' : 'en');
  if (savedTheme) applyTheme(savedTheme);

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-lang-btn]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var next = root.getAttribute('data-lang') === 'en' ? 'ko' : 'en';
        applyLang(next);
        try { localStorage.setItem('site-lang', next); } catch (e) {}
      });
    });

    document.querySelectorAll('[data-theme-btn]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var cur = root.getAttribute('data-theme');
        if (!cur) cur = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        var next = cur === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        try { localStorage.setItem('site-theme', next); } catch (e) {}
      });
    });
  });
})();
