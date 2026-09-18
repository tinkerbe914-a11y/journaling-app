/* ==========================================================
   Work Detail overlay
   作品カード(data-detail="work-01")をクリック → #work-01 を開く
   閉じる: ×ボタン / 背景クリック / Esc
   ========================================================== */
(function () {
  var modal = document.getElementById('modal');
  if (!modal) return;

  var details = modal.querySelectorAll('.detail');
  var lastFocus = null;
  var current = null;

  function open(id) {
    var panel = document.getElementById(id);
    if (!panel) return;

    details.forEach(function (d) { d.hidden = true; });
    panel.hidden = false;
    panel.scrollTop = 0;

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('is-modal-open');

    lastFocus = document.activeElement;
    current = panel;
    var closeBtn = panel.querySelector('.detail__close');
    if (closeBtn) closeBtn.focus();
  }

  function close() {
    if (!current) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('is-modal-open');
    current.hidden = true;
    current = null;

    // URL の #work-01 を消す(履歴は増やさない)
    if (location.hash) history.replaceState(null, '', location.pathname + location.search);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  // カードのクリック
  document.querySelectorAll('[data-detail]').forEach(function (card) {
    card.addEventListener('click', function (e) {
      e.preventDefault();
      var id = card.getAttribute('data-detail');
      history.replaceState(null, '', '#' + id);
      open(id);
    });
  });

  // 閉じる(×ボタン・背景)
  modal.addEventListener('click', function (e) {
    if (e.target.closest('[data-close]')) close();
  });

  // Esc で閉じる
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && current) close();
  });

  // #work-03 付きの URL で開かれたら、その作品を最初から表示
  var hash = location.hash.replace('#', '');
  if (/^work-\d\d$/.test(hash)) open(hash);
})();

/* ==========================================================
   スマホ用メニュー(MENU ボタン → 全画面ナビ)
   ========================================================== */
(function () {
  var btn = document.getElementById('menu-button');
  var nav = document.getElementById('site-nav');
  var closeBtn = document.getElementById('menu-close');
  if (!btn || !nav) return;

  function openNav() {
    nav.classList.add('is-open');
    btn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('is-nav-open');
    if (closeBtn) closeBtn.focus();
  }
  function closeNav() {
    nav.classList.remove('is-open');
    btn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('is-nav-open');
  }

  btn.addEventListener('click', function () {
    if (nav.classList.contains('is-open')) { closeNav(); } else { openNav(); }
  });
  if (closeBtn) closeBtn.addEventListener('click', closeNav);

  // リンクを押したら閉じてからスクロール
  nav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', closeNav);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) closeNav();
  });

  // PC 幅に戻ったら開きっぱなしを解除
  window.addEventListener('resize', function () {
    if (window.innerWidth > 900) closeNav();
  });
})();
