const select = document.getElementById('country');

    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
            data.forEach(country => {
                const option = document.createElement('option');
                option.value = country.cca2;
                option.textContent = country.name.common;
                select.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching country data:', error));

document.getElementById("toggle-shipping").addEventListener("click", function() {
    const sidebar = document.querySelector(".checkout-table");
    const shippingDetails = document.getElementById("shipping-details");
        
        if (shippingDetails.style.display === "block") {
            shippingDetails.style.display = "none";
            sidebar.classList.remove("expanded");
        } else {
            shippingDetails.style.display = "block";
            sidebar.classList.add("expanded");
        }
    });

const toggleButton = document.getElementById('toggle-shipping');
const shippingText = document.querySelector('.estimate-shipping');
const plusIcon = document.querySelector('#toggle-shipping img');

toggleButton.addEventListener('click', () => {
    if (plusIcon.src.includes('plus-icon.svg')) {
        shippingText.style.color = '#008421';
        plusIcon.src = './assets/x-icon.svg';
        plusIcon.alt = 'x';
    } else {
        shippingText.style.color = '';
        plusIcon.src = './assets/plus-icon.svg';
        plusIcon.alt = '+';
    }
});

const shippingCost = 5.99; // Fiksni trošak dostave i poreza u eurima za određeni poštanski broj
const flatRate = 5.00; // Flat rate bez obzira na mjesto dostave

function calculateTotal() {
    const rows = document.querySelectorAll('.shopping-cart-table tbody .products');
    let total = 0;

    rows.forEach(row => {
        const price = parseFloat(row.querySelector('[data-price]').getAttribute('data-price'));
        const quantity = parseInt(row.querySelector('.quantity').value);
        
        const rowTotal = price * quantity;
        total += rowTotal;

        row.querySelector('.product-total').textContent = `${rowTotal.toFixed(2)} €`;
    });

    document.getElementById('total-price').textContent = `${total.toFixed(2)} €`;

    let totalShippingCost = flatRate;
    let grandTotal = total + flatRate;

    const postalCode = document.getElementById('postcode').value;
    if (postalCode) {
        totalShippingCost = flatRate + shippingCost;
        grandTotal = total + totalShippingCost;
    }

    document.getElementById('shipping-cost').textContent = `${totalShippingCost.toFixed(2)} €`;
    document.getElementById('grand-total').textContent = `${grandTotal.toFixed(2)} €`;
}


document.querySelectorAll('.quantity').forEach(input => {
    input.addEventListener('input', calculateTotal);
});


document.getElementById('postcode').addEventListener('input', calculateTotal);
calculateTotal();