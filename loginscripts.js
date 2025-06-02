document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Example credentials
    const validUsername = 'Admin1';
    const validPassword = 'intellectAI';

    if (username === validUsername && password === validPassword) {
        // Save to session storage
        sessionStorage.setItem('isLoggedIn', 'true');
        window.location.href = 'admin.html'; // Redirect to admin page
    } else {
        document.getElementById('login-error').innerText = 'Invalid username or password';
    }
});
