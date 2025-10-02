// Sidebar toggle logic
document.addEventListener('DOMContentLoaded', function() {
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebarToggle');
  const themeToggle = document.getElementById('themeToggle');
  const themeOptions = document.getElementById('themeOptions');
  const themeBtns = document.querySelectorAll('.theme-option');

  // Sidebar show/hide
  sidebarToggle.addEventListener('click', function() {
    sidebar.classList.toggle('collapsed');
    sidebar.classList.toggle('expanded');
  });

  // Theme dropdown show/hide
  let themeDropdownOpen = false;
  themeToggle.addEventListener('click', function(e) {
    e.preventDefault();
    themeOptions.style.display = themeDropdownOpen ? 'none' : 'flex';
    themeDropdownOpen = !themeDropdownOpen;
  });

  // Hide theme dropdown when clicking outside
  document.addEventListener('click', function(e) {
    if (!themeToggle.contains(e.target) && !themeOptions.contains(e.target)) {
      themeOptions.style.display = 'none';
      themeDropdownOpen = false;
    }
  });

  // Theme switching
  function setTheme(theme) {
    document.body.classList.remove('theme-red', 'theme-blue', 'theme-green', 'theme-white', 'theme-black');
    document.body.classList.add('theme-' + theme);
    localStorage.setItem('theme', theme);
    themeBtns.forEach(btn => btn.classList.remove('selected'));
    const selectedBtn = document.querySelector('.theme-option[data-theme="' + theme + '"]');
    if (selectedBtn) selectedBtn.classList.add('selected');
  }
  themeBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      setTheme(this.getAttribute('data-theme'));
    });
  });

  // Load theme from localStorage
  const savedTheme = localStorage.getItem('theme') || 'red';
  setTheme(savedTheme);
  });
