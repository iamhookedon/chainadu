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

  // 발음 듣기 — 브라우저 내장 음성합성(Web Speech API). 외부 의존 없음.
  function speak(text) {
    if (!('speechSynthesis' in window)) {
      alert('이 브라우저는 음성 재생을 지원하지 않아요. (Chrome/Edge 권장)');
      return;
    }
    window.speechSynthesis.cancel(); // 이전 음성 중단
    var u = new SpeechSynthesisUtterance(text);
    u.lang = 'zh-CN';
    u.rate = 0.85; // 학습용으로 조금 천천히
    // 중국어 음성이 설치돼 있으면 우선 선택
    var voices = window.speechSynthesis.getVoices();
    var zh = voices.filter(function (v) { return /zh|chinese|中文|普通话/i.test(v.lang + ' ' + v.name); })[0];
    if (zh) u.voice = zh;
    window.speechSynthesis.speak(u);
  }
  // 일부 브라우저는 voices를 비동기로 로드 → 미리 한 번 깨워둠
  if ('speechSynthesis' in window) { window.speechSynthesis.getVoices(); }

  document.querySelectorAll('.js-speak').forEach(function (btn) {
    btn.addEventListener('click', function () {
      speak(btn.getAttribute('data-word'));
    });
  });
})();
