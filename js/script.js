// Chờ load DOM
window.addEventListener('DOMContentLoaded', () => {
    // Tab elements
    const loginTab = document.getElementById('login-tab');
    const registerTab = document.getElementById('register-tab');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
  
    // Khởi tạo users trong localStorage (admin/admin)
    if (!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify([{ username: 'admin', password: 'admin' }]));
    }
  
    // Chuyển tab
    loginTab.addEventListener('click', () => {
      loginTab.classList.add('active');
      registerTab.classList.remove('active');
      loginForm.classList.add('active');
      registerForm.classList.remove('active');
    });
    registerTab.addEventListener('click', () => {
      registerTab.classList.add('active');
      loginTab.classList.remove('active');
      registerForm.classList.add('active');
      loginForm.classList.remove('active');
    });
  
    // Xử lý đăng nhập
    loginForm.addEventListener('submit', e => {
      e.preventDefault();
      const uname = document.getElementById('login-username').value;
      const pwd = document.getElementById('login-password').value;
      const users = JSON.parse(localStorage.getItem('users'));
      const user = users.find(u => u.username === uname && u.password === pwd);
      if (user) {
        alert(`Đăng nhập thành công! Chào ${user.username}`);
        // TODO: Chuyển hướng sau login
        window.location.href = 'dashboard.html'; // Chuyển hướng đến dashboard.html
      } else {
        alert('Sai username hoặc mật khẩu.');
      }
      loginForm.reset();
    });
  
    // Xử lý đăng ký
    registerForm.addEventListener('submit', e => {
      e.preventDefault();
      const uname = document.getElementById('reg-username').value;
      const pwd = document.getElementById('reg-password').value;
      const users = JSON.parse(localStorage.getItem('users'));
      if (users.find(u => u.username === uname)) {
        alert('Username đã tồn tại!');
      } else {
        users.push({ username: uname, password: pwd });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Đăng ký thành công!');
        registerTab.click(); // Chuyển về login tab
        registerForm.reset();
      }
    });
  });