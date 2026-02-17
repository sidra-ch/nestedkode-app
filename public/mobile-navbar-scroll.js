// Mobile sticky icon bar: hide logo/headings on scroll, show only icons
(function() {
  if (typeof window === 'undefined') return;
  let lastScroll = 0;
  const logoRow = document.querySelector('.md\\:hidden.w-full.bg-white.border-b');
  const stickyIcons = document.getElementById('mobile-sticky-icons');
  function onScroll() {
    const scrolled = window.scrollY > 40;
    if (logoRow) logoRow.style.display = scrolled ? 'none' : '';
    if (stickyIcons) stickyIcons.style.transform = scrolled ? 'translateY(0)' : 'translateY(100%)';
  }
  window.addEventListener('scroll', onScroll);
  // Initial state
  if (stickyIcons) stickyIcons.style.transform = 'translateY(100%)';
})();
