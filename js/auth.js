document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();
  localStorage.setItem('isLoggedIn', 'true');
  window.location.href = 'dashboard.html';
});