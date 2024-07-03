document.getElementById('signUpBtn').addEventListener('click', function() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const mobile = document.getElementById('mobile').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    const usernamePattern = /^[a-zA-Z0-9]{6,10}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobilePattern = /^\d{10}$/;
    const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    if (!usernamePattern.test(username)) {
        alert('Username must be 6-10 characters long.');
        return;
    }
    if (!emailPattern.test(email)) {
        alert('Invalid email format.');
        return;
    }
    if (!mobilePattern.test(mobile)) {
        alert('Mobile number must be exactly 10 digits.');
        return;
    }
    if (!passwordPattern.test(password)) {
        alert('Password must contain a digit, a special character, and be 6-16 characters long.');
        return;
    }
    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }

    const user = {
        username: username,
        email: email,
        mobile: mobile,
        password: password
    };
    localStorage.setItem('user', JSON.stringify(user));
    window.location.href = 'main.html';
});
