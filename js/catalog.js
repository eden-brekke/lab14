/* global Product, Cart */

'use strict';

// Set up an empty cart for use on this page.
const cart = new Cart([]);

// On screen load, we call this method to put all of the busmall options
// (the things in the Product.allProducts array) into the drop down list.
function populateForm() {

  //TO DONEEEEEE!!!!: Add an <option> tag inside the form's select for each product
  const selectElement = document.getElementById('items');
  for (let i in Product.allProducts) {

    let optionElement = document.createElement('option');
    optionElement.textContent = Product.allProducts[i].name;
    optionElement.value = Product.allProducts[i].name;
    selectElement.appendChild(optionElement);
  }

}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {

  // TODONEEEEEEEEE: Prevent the page from reloading
  event.preventDefault();

  // Do all the things ...
  addSelectedItemToCart();
  cart.saveToLocalStorage();
  updateCounter();
  updateCartPreview();
}

// TODO: Add the selected item and quantity to the cart
function addSelectedItemToCart() {
  // TODO: suss out the item picked from the select list
  const selectElement = document.getElementById('items');
  let selectedItem = selectElement.value;
  // TODO: get the quantity
  const quantityElement = document.getElementById('quantity');
  let selectedQty = +quantityElement.value;

  // TODO: using those, add one item to the Cart
  cart.addItem(selectedItem, selectedQty);
}

// TODO: Update the cart count in the header nav with the number of items in the Cart
function updateCounter() {
  let itemCountElement = document.getElementById('itemCount');
  let totalQty = 0;
  for (let i in cart.items) {
    totalQty += cart.items[i].quantity
    console.log(totalQty);
    itemCountElement.innerText = totalQty;

  }
}

// TODO: As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview() {
  let cartContentsElement = document.getElementById('cartContents');
  // TODO: Get the item and quantity from the form
  const selectElement = document.getElementById('items');
  let selectedItem = selectElement.value;
  const quantityElement = document.getElementById('quantity');
  let selectedQty = +quantityElement.value;
  let ulElement;
  if (ulElement === undefined) {
    ulElement = document.createElement('ul');
    cartContentsElement.appendChild(ulElement);
  }
  // TODO: Add a new element to the cartContents div with that information
  let liElement = document.createElement('li');
  liElement.innerText = `${selectedItem}:${selectedQty}`
  ulElement.appendChild(liElement);
}


// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
const catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();
