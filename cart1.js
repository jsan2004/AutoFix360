const CartItems = document.querySelector(".cart-items");

let cartTotal = 0;

function displayCartItems() {
  const items = JSON.parse(localStorage.getItem("cart")) || [];
  
  // Clear the cart display before rendering
  CartItems.innerHTML = "";

  items.forEach((item, index) => {
    const cartItem = document.createElement("div");
    cartItem.className = "cart_item";
    cartItem.innerHTML = `
      <p class="cart_id">${item.id}</p>
      <p class="cart_title">${item.title}</p>
      <img src="${item.image}" alt="${item.title}" class="cart_img" />
      <p class="cart_price">${item.price}</p>
      <button class="cart_delete" data-index="${index}">Delete</button>
    `;
    CartItems.appendChild(cartItem);
  });

  // Add event listener for delete buttons
  const deleteButtons = document.querySelectorAll(".cart_delete");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      deleteCartItem(index);
    });
  });
}

function deleteCartItem(index) {
  let items = JSON.parse(localStorage.getItem("cart")) || [];
  items.splice(index, 1); // Remove the item from the array
  localStorage.setItem("cart", JSON.stringify(items)); // Update localStorage
  displayCartItems(); // Re-render the cart
}

displayCartItems();
