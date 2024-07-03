document.addEventListener('DOMContentLoaded', function() {
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

    const items = JSON.parse(localStorage.getItem('items')) || [];
    const cartItems = document.getElementById('cartItems');
    let totalCost = 0;

    items.forEach(function(item) {
        const li = document.createElement('li');
        li.textContent = `Item: ${item.name}, Cost: $${item.cost.toFixed(2)}, Days to Deliver: ${item.days}`;
        cartItems.appendChild(li);
        totalCost += item.cost;
    });

    document.getElementById('totalCost').textContent = totalCost.toFixed(2);
});
