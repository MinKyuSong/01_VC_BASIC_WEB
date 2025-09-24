// Smooth reveal using IntersectionObserver
(function setupIntersectionObserver() {
  const elements = document.querySelectorAll('[data-animate]');
  if (!('IntersectionObserver' in window)) {
    elements.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  elements.forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i * 60, 360)}ms`;
    observer.observe(el);
  });
})();

// Anchor smooth scroll enhancement (native CSS smooth scroll is set, this is for offset control)
document.addEventListener('click', (e) => {
  const target = e.target;
  if (target instanceof Element && target.matches('a[href^="#"]')) {
    const id = target.getAttribute('href');
    if (!id || id === '#') return;
    const el = document.querySelector(id);
    if (el) {
      e.preventDefault();
      const y = el.getBoundingClientRect().top + window.scrollY - 72; // header offset
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }
});

// Basic form validation and submit stub
(function setupForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  const status = document.getElementById('formStatus');

  function setError(name, message) {
    const el = form.querySelector(`[data-error-for="${name}"]`);
    if (el) el.textContent = message || '';
  }

  function validate() {
    let valid = true;
    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    const agree = form.querySelector('#agree');

    setError('name', '');
    setError('phone', '');
    setError('email', '');
    setError('message', '');
    setError('agree', '');

    if (!name) { setError('name', '이름을 입력해주세요.'); valid = false; }
    if (!/^0\d{1,2}-?\d{3,4}-?\d{4}$/.test(phone)) { setError('phone', '연락처 형식을 확인해주세요.'); valid = false; }
    if (!/^\S+@\S+\.\S+$/.test(email)) { setError('email', '이메일 형식을 확인해주세요.'); valid = false; }
    if (message.length < 5) { setError('message', '문의 내용을 5자 이상 입력해주세요.'); valid = false; }
    if (!(agree instanceof HTMLInputElement && agree.checked)) { setError('agree', '개인정보 처리방침에 동의해주세요.'); valid = false; }

    return valid;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = '';
    if (!validate()) return;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      // Submission stub (replace with actual endpoint or email service)
      await new Promise((r) => setTimeout(r, 800));
      status.textContent = '정상적으로 접수되었습니다. 곧 연락드리겠습니다.';
      form.reset();
    } catch (err) {
      status.textContent = '전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
    }
  });
})();


