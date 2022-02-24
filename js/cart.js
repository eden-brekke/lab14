/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
const table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);
let cart;

function loadCart() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cart = new Cart(cartItems);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

// Done: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
 document.querySelector('tbody').innerHTML ='';
}

// WIP: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {

  // DONE: Find the table body
  let tBodyElement = document.querySelector('tbody');
  // DONE: Iterate over the items in the cart
  for (let i in cart.items) {
    // DONE: Create a TR
    let trElement = document.createElement('tr');
    // Y U NO WORK: Create a TD for the delete link, quantity,  and the item
    let tdElementDelete = document.createElement('td');
    let tdElementQty = document.createElement('td');
    let tdElementItem = document.createElement('td');
    tdElementDelete.textContent = 'x';
    tdElementDelete.setAttribute('class', 'removable-item');
    tdElementDelete.id = i;
    tdElementQty.textContent = cart.items[i].quantity;
    tdElementItem.textContent = cart.items[i].product;
    // DONE: Add the TR to the TBODY and each of the TD's to the TR
    trElement.appendChild(tdElementDelete);
    trElement.appendChild(tdElementQty);
    trElement.appendChild(tdElementItem);
    tBodyElement.appendChild(trElement);
    table.appendChild(tBodyElement);
  }
}

function removeItemFromCart(event) {

  // Ye? YE???: When a delete link is clicked, use cart.removeItem to remove the correct item
  cart.removeItem(event.target.name);
  // TODO: Save the cart back to local storage
  // TODO: Re-draw the cart table

}

// This will initialize the page and draw the cart on screen
renderCart();
