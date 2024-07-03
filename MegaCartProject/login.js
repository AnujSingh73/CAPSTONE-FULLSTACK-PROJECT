document.getElementById('loginBtn').addEventListener('click', function() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser) {
        if (storedUser.username === username && storedUser.password === password) {
            localStorage.setItem('loggedInUser', username);
            window.location.href = 'main.html';
        } else {
            alert('Invalid username or password');
        }
    } else {
        alert('No user found. Please sign up first.');
    }
});
