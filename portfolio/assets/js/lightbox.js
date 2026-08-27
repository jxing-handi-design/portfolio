document.addEventListener('DOMContentLoaded', function () {
  const overlay = document.createElement('div');
  overlay.id = 'lb-overlay';
  overlay.innerHTML = '<img id="lb-img" src="" alt=""><button id="lb-close" aria-label="Close">✕</button>';
  document.body.appendChild(overlay);

  const lbImg = document.getElementById('lb-img');

  document.querySelectorAll('figure img').forEach(function (img) {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', function () {
      lbImg.src = img.src;
      lbImg.alt = img.alt;
      overlay.classList.add('lb-open');
      document.body.style.overflow = 'hidden';
    });
  });

  function close() {
    overlay.classList.remove('lb-open');
    document.body.style.overflow = '';
  }

  document.getElementById('lb-close').addEventListener('click', close);
  overlay.addEventListener('click', function (e) {
    if (e.target !== lbImg) close();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
  });
});
