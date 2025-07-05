// Chờ load DOM
window.addEventListener('DOMContentLoaded', () => {
    // Lấy tất cả các element cần thiết
    const tabsContainer = document.getElementById('tabs-container');
    const loginTab = document.getElementById('login-tab');
    const registerTab = document.getElementById('register-tab');

    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const forgotPasswordLink = document.getElementById('forgot-password-link');

    // Các form trong luồng quên mật khẩu
    const requestOtpForm = document.getElementById('request-otp-form');
    const verifyOtpForm = document.getElementById('verify-otp-form');
    const resetPasswordForm = document.getElementById('reset-password-form');
    const backToLoginLinks = document.querySelectorAll('.back-to-login');

    const FAKE_OTP = '123456'; // Mã OTP giả lập

    // Hàm helper để quản lý hiển thị form
    const showForm = (formToShow) => {
      // Ẩn tất cả các form
      [loginForm, registerForm, requestOtpForm, verifyOtpForm, resetPasswordForm].forEach(form => {
        form.classList.remove('active');
      });
      // Hiển thị form được chỉ định
      formToShow.classList.add('active');

      // Ẩn/hiện tabs login/register
      if (formToShow === loginForm || formToShow === registerForm) {
        tabsContainer.style.display = 'flex';
      } else {
        tabsContainer.style.display = 'none';
      }
    };

    // --- XỬ LÝ SỰ KIỆN CHÍNH ---

    // Chuyển tab Login
    loginTab.addEventListener('click', () => {
      loginTab.classList.add('active');
      registerTab.classList.remove('active');
      showForm(loginForm);
    });

    // Chuyển tab Register
    registerTab.addEventListener('click', () => {
      registerTab.classList.add('active');
      loginTab.classList.remove('active');
      showForm(registerForm);
    });

    // --- QUY TRÌNH QUÊN MẬT KHẨU ---

    // 1. Click vào "Quên mật khẩu?"
    forgotPasswordLink.addEventListener('click', (e) => {
      e.preventDefault();
      showForm(requestOtpForm);
    });

    // 2. Gửi yêu cầu OTP
    requestOtpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const phone_number = document.getElementById('forgot-phone-number').value;
      if (phone_number) {
        // Giả lập gửi OTP thành công
        alert(`Mã OTP đã được gửi đến tài khoản ${phone_number}. Mã là: 123456`);
        showForm(verifyOtpForm);
      } else {
        alert('Vui lòng nhập số điện thoại!');
      }
    });

    // 3. Xác thực mã OTP
    verifyOtpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const otpCode = document.getElementById('otp-code').value;

      if (otpCode === FAKE_OTP) {
        alert('Xác thực OTP thành công!');
        showForm(resetPasswordForm);
      } else {
        alert('Mã OTP không chính xác. Vui lòng thử lại.');
      }
    });

    // 4. Đặt lại mật khẩu mới
    resetPasswordForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const newPassword = document.getElementById('new-password').value;
      const confirmPassword = document.getElementById('confirm-password').value;

      if (!newPassword || !confirmPassword) {
        alert('Vui lòng nhập đầy đủ mật khẩu mới.');
        return;
      }

      if (newPassword !== confirmPassword) {
        alert('Mật khẩu xác nhận không khớp!');
        return;
      }

      // GIẢ LẬP lưu mật khẩu thành công
      alert('Đổi mật khẩu thành công! Vui lòng đăng nhập lại với mật khẩu mới.');
      
      // Quay về màn hình đăng nhập
      loginTab.click();
    });

    // Xử lý khi click "Quay lại Đăng nhập"
    backToLoginLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        loginTab.click(); // Giả lập việc click vào tab login để quay về
      });
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