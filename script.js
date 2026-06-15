// ===================================================================
// 니하오두 — 인터랙션 스크립트
// ===================================================================

(function () {
  'use strict';

  var overlay = document.getElementById('overlay');
  var mForm = document.getElementById('m-form');
  var mDone = document.getElementById('m-done');

  // 모달 열기 / 닫기
  function openModal() {
    overlay.classList.add('on');
    mForm.style.display = 'block';
    mDone.style.display = 'none';
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    overlay.classList.remove('on');
    document.body.style.overflow = '';
  }

  // "무료 체험 신청" 류 버튼 전부 연결
  document.querySelectorAll('.js-open').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      openModal();
    });
  });

  // 닫기: X 버튼 · 바깥 클릭 · ESC
  document.getElementById('modal-close').addEventListener('click', closeModal);
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });

  // 폼 제출 (교육용 — 실제 전송 없음)
  document.getElementById('modal-submit').addEventListener('click', function () {
    var name = document.getElementById('f-name').value.trim();
    var email = document.getElementById('f-email').value.trim();
    if (!name) { alert('이름을 입력해주세요.'); return; }
    if (!email || email.indexOf('@') < 0) { alert('이메일을 올바르게 입력해주세요.'); return; }
    mForm.style.display = 'none';
    mDone.style.display = 'block';
  });

  // 발음 듣기 — 구글 번역 TTS (배포된 실제 페이지에서 동작)
  document.querySelectorAll('.js-speak').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var text = btn.getAttribute('data-word');
      var url = 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=zh-CN&q=' + encodeURIComponent(text);
      var audio = new Audio(url);
      audio.play().catch(function () {
        alert('발음을 들으려면 배포된 실제 페이지에서 열어주세요.');
      });
    });
  });
})();
