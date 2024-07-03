document.addEventListener('DOMContentLoaded', function() {
    const username = localStorage.getItem('loggedInUser');
    if (!username) {
        window.location.href = 'login.html';
        return;
    }

    document.getElementById('welcomeMessage').textContent = `Dear, ${username}! Welcome to Mega Cart ...`;

    const date = new Date();
    document.getElementById('date').textContent = date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    document.getElementById('logout').addEventListener('click', function() {
        localStorage.clear();
        window.location.href = 'login.html';
    });

    document.querySelectorAll('.item').forEach(function(item) {
        item.addEventListener('click', function() {
            const name = this.dataset.name;
            const cost = parseFloat(this.dataset.cost);
            const days = parseInt(this.dataset.days);

            let items = JSON.parse(localStorage.getItem('items')) || [];
            items.push({ name, cost, days });
            localStorage.setItem('items', JSON.stringify(items));

            alert(`${name} has been added to your cart.`);
        });
    });

    document.getElementById('viewCart').addEventListener('click', function() {
        window.location.href = 'buy-item.html';
    });
});
