document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // For demo purposes, using a simple check
    if (username === 'admin' && password === 'admin123') {
        window.location.href = 'pages/dashboard.html';
    } else {
        alert('Invalid credentials! Try username: admin, password: admin123');
    }
});