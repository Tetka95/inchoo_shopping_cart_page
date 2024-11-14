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

/*funkcije koje se odnose na prikaz stranice na zaslonu max-width 480px*/
document.addEventListener("DOMContentLoaded", function () {
    function setImgLink() {
      const img = document.querySelector(".call");
  
      if (window.innerWidth <= 480) {
        img.onclick = function () {
          window.location.href = "tel:((800)333-3567)";
        };
      } else {
        img.onclick = null;
      }
    }

    setImgLink();
    window.addEventListener("resize", setImgLink);
  });

  

  function updateImageSrc() {
    const img = document.getElementById("search");
  
    if (window.matchMedia("(max-width: 480px)").matches) {
      img.src = "./assets/search-icon-white.svg";
    } else {
      img.src = "./assets/search-icon.svg";
    }
  }

  updateImageSrc();
  window.addEventListener("resize", updateImageSrc);



  let originalCartLink = null;
let isImageDisplayed = false;

function toggleCartLink() {
    const link = document.getElementById("cart");

    if (window.innerWidth <= 480) {
        if (link && !isImageDisplayed) {
            originalCartLink = link.cloneNode(true); // Spremi originalni link
            const img = document.createElement("img");
            img.src = "./assets/shopping-cart.svg";
            img.style.width = "16px";
            img.style.height = "16px";
            img.style.alignSelf = "center";
            img.style.cursor = "pointer";
            img.onclick = function () {
                window.location.href = link.href;
            };

            link.parentNode.replaceChild(img, link);
            isImageDisplayed = true;
        }
    } else {
        const img = document.querySelector("img[src='./assets/shopping-cart.svg']");
        if (img && isImageDisplayed) {
            img.parentNode.replaceChild(originalCartLink, img);
            originalCartLink = null; // Resetiraj originalni link
            isImageDisplayed = false;
        }
    }
}

window.addEventListener("load", toggleCartLink);
window.addEventListener("resize", toggleCartLink);
    


  function toggleCartTable() {
    const originalTable = document.getElementById('shopping-cart-table');
    const mobileTable = document.getElementById('mobile-shopping-cart-table');

    if (window.innerWidth <= 480) {
        originalTable.style.display = 'none';
        mobileTable.style.display = 'table';
    } else {
        originalTable.style.display = 'table';
        mobileTable.style.display = 'none';
    }
}

window.onload = toggleCartTable;
window.onresize = toggleCartTable;


function addTextAboveFooterNav() {
    const footerNav = document.querySelector('.footer-nav');
    const mediaQuery = window.matchMedia('(max-width: 480px)');

    function updateLayout() {
        if (mediaQuery.matches) {
            if (!document.querySelector('.footer-nav-text')) {
                const textElement = document.createElement('p');
                textElement.textContent = '© Jeep is a registered trademark of FCA US LLC.';
                textElement.classList.add('footer-nav-text');
                textElement.style.textAlign = 'center';
                textElement.style.fontSize = '12px';
                textElement.style.margin = '16px, 16px';
                footerNav.parentNode.insertBefore(textElement, footerNav);
            }
        } else {
            const textElement = document.querySelector('.footer-nav-text');
            if (textElement) {
                textElement.parentNode.removeChild(textElement);
            }
        }
    }

    updateLayout();
    window.addEventListener('resize', updateLayout);
}

document.addEventListener('DOMContentLoaded', addTextAboveFooterNav);



function removeSlashes() {
    const ulElements = document.querySelectorAll('ul');
    
    ulElements.forEach(ul => {
        const nodes = ul.childNodes;
        
        nodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() === '/') {
                ul.removeChild(node);
            }
        });
    });
}

window.addEventListener('load', function () {
    if (window.innerWidth <= 480) {
        removeSlashes();
    }
});

window.addEventListener('resize', function () {
    if (window.innerWidth <= 480) {
        removeSlashes();
    }
});



function rearrangeCustomerService() {
    const customerService = document.querySelector('.customer-service');
    const pElement = customerService.querySelector('p');
    const imgElement = customerService.querySelector('img');
    const aElement = customerService.querySelector('a');
    const mediaQuery = window.matchMedia('(max-width: 480px)');

    function updateLayout() {
        if (mediaQuery.matches) {
            if (!customerService.querySelector('.responsive-container')) {
                const div = document.createElement('div');
                div.classList.add('responsive-container');
                div.style.display = 'flex';
                div.style.justifyContent = 'center';
                div.style.alignItems = 'center';

                div.appendChild(imgElement);
                div.appendChild(aElement);

                customerService.appendChild(div);
            }
        } else {
            const responsiveContainer = customerService.querySelector('.responsive-container');
            if (responsiveContainer) {
                customerService.insertBefore(imgElement, pElement.nextSibling);
                customerService.insertBefore(aElement, imgElement.nextSibling);
                customerService.removeChild(responsiveContainer);
            }
        }
    }

    updateLayout();
    window.addEventListener('resize', updateLayout);
}

document.addEventListener('DOMContentLoaded', rearrangeCustomerService);
