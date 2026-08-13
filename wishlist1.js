const WishlistItems = document.querySelector(".wishlist-items");

function displayWishlistItems() {
  const items = JSON.parse(localStorage.getItem("wishlist")) || [];

  // Clear the wishlist display before rendering
  WishlistItems.innerHTML = "";

  items.forEach((item, index) => {
    const wishlistItem = document.createElement("div");
    wishlistItem.className = "product-card";
    wishlistItem.innerHTML = `
      <img src="${item.image}" alt="${item.title}" class="product-image" />
      <div class="product-details">
        <h3 class="product-title">${item.title}</h3>
        <p class="product-price">${item.price}</p>
        <button class="remove-btn" data-index="${index}">Remove from Wishlist</button>
      </div>
    `;
    WishlistItems.appendChild(wishlistItem);
  });

  // Add event listener for remove buttons
  const removeButtons = document.querySelectorAll(".remove-btn");
  removeButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      deleteWishlistItem(index);
    });
  });
}

function deleteWishlistItem(index) {
  let items = JSON.parse(localStorage.getItem("wishlist")) || [];
  items.splice(index, 1); // Remove the item from the array
  localStorage.setItem("wishlist", JSON.stringify(items)); // Update localStorage
  displayWishlistItems(); // Re-render the wishlist
}

displayWishlistItems();
