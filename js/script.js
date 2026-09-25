/* =====================================================
   MOBILE NAVIGATION
===================================================== */

const menuButton = document.getElementById("menuButton");
const navigation = document.getElementById("navigation");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    navigation.classList.toggle("active");

    const isOpen = navigation.classList.contains("active");

    menuButton.setAttribute("aria-expanded", isOpen);

    menuButton.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu",
    );
  });

  // Close menu when a navigation link is clicked

  const navLinks = navigation.querySelectorAll("a");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("active");

      menuButton.setAttribute("aria-expanded", "false");

      menuButton.setAttribute("aria-label", "Open navigation menu");
    });
  });
}
/* =====================================================
   PRODUCT FILTERING
===================================================== */

const filterButtons = document.querySelectorAll(".filter-button");
const products = document.querySelectorAll(".products-page-grid .product-card");
const productsCount = document.getElementById("productsCount");
const noProducts = document.getElementById("noProducts");

if (filterButtons.length > 0) {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active state from every button

      filterButtons.forEach((btn) => {
        btn.classList.remove("active");
      });

      // Activate clicked button

      button.classList.add("active");

      const selectedCategory = button.dataset.category;

      let visibleProducts = 0;

      // Check every product

      products.forEach((product) => {
        const productCategory = product.dataset.category;

        if (
          selectedCategory === "all" ||
          productCategory === selectedCategory
        ) {
          product.style.display = "block";

          visibleProducts++;
        } else {
          product.style.display = "none";
        }
      });

      // Update product count

      if (productsCount) {
        productsCount.textContent = `${visibleProducts} product${visibleProducts !== 1 ? "s" : ""}`;
      }

      // Show message if no products

      if (noProducts) {
        if (visibleProducts === 0) {
          noProducts.style.display = "block";
        } else {
          noProducts.style.display = "none";
        }
      }
    });
  });
}
/* =====================================================
   CONTACT FORM VALIDATION
===================================================== */

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const subjectInput = document.getElementById("subject");
  const messageInput = document.getElementById("message");

  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const subjectError = document.getElementById("subjectError");
  const messageError = document.getElementById("messageError");

  const formSuccess = document.getElementById("formSuccess");

  /*
   * Show an error for a field
   */

  function showError(input, errorElement, message) {
    input.classList.remove("input-valid");
    input.classList.add("input-error");

    input.setAttribute("aria-invalid", "true");

    errorElement.textContent = message;
  }

  /*
   * Show valid state
   */

  function showValid(input, errorElement) {
    input.classList.remove("input-error");
    input.classList.add("input-valid");

    input.setAttribute("aria-invalid", "false");

    errorElement.textContent = "";
  }

  /*
   * Validate name
   */

  function validateName() {
    const value = nameInput.value.trim();

    if (value === "") {
      showError(nameInput, nameError, "Please enter your name.");

      return false;
    }

    if (value.length < 2) {
      showError(nameInput, nameError, "Name must be at least 2 characters.");

      return false;
    }

    showValid(nameInput, nameError);

    return true;
  }

  /*
   * Validate email
   */

  function validateEmail() {
    const value = emailInput.value.trim();

    if (value === "") {
      showError(emailInput, emailError, "Please enter your email address.");

      return false;
    }

    if (!emailInput.validity.valid) {
      showError(emailInput, emailError, "Please enter a valid email address.");

      return false;
    }

    showValid(emailInput, emailError);

    return true;
  }

  /*
   * Validate subject
   */

  function validateSubject() {
    const value = subjectInput.value.trim();

    if (value === "") {
      showError(subjectInput, subjectError, "Please enter a subject.");

      return false;
    }

    if (value.length < 3) {
      showError(
        subjectInput,
        subjectError,
        "Subject must be at least 3 characters.",
      );

      return false;
    }

    showValid(subjectInput, subjectError);

    return true;
  }

  /*
   * Validate message
   */

  function validateMessage() {
    const value = messageInput.value.trim();

    if (value === "") {
      showError(messageInput, messageError, "Please enter your message.");

      return false;
    }

    if (value.length < 10) {
      showError(
        messageInput,
        messageError,
        "Message must be at least 10 characters.",
      );

      return false;
    }

    showValid(messageInput, messageError);

    return true;
  }

  /*
   * Validate fields while user is typing
   */

  nameInput.addEventListener("blur", validateName);

  emailInput.addEventListener("blur", validateEmail);

  subjectInput.addEventListener("blur", validateSubject);

  messageInput.addEventListener("blur", validateMessage);

  /*
   * Submit form
   */

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const isNameValid = validateName();

    const isEmailValid = validateEmail();

    const isSubjectValid = validateSubject();

    const isMessageValid = validateMessage();

    const formIsValid =
      isNameValid && isEmailValid && isSubjectValid && isMessageValid;

    if (!formIsValid) {
      formSuccess.classList.remove("show");

      return;
    }

    /*
     * Form is valid
     */

    formSuccess.textContent =
      "Thank you! Your message has been received. We will get back to you soon.";

    formSuccess.classList.add("show");

    /*
     * Clear the form
     */

    contactForm.reset();

    /*
     * Remove valid states after reset
     */

    nameInput.classList.remove("input-valid");

    emailInput.classList.remove("input-valid");

    subjectInput.classList.remove("input-valid");

    messageInput.classList.remove("input-valid");

    nameInput.setAttribute("aria-invalid", "false");

    emailInput.setAttribute("aria-invalid", "false");

    subjectInput.setAttribute("aria-invalid", "false");

    messageInput.setAttribute("aria-invalid", "false");

    /*
     * Scroll success message into view
     */

    formSuccess.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  });
}
/* =====================================================
   SHOPPING CART
===================================================== */

function getCart() {
  return JSON.parse(localStorage.getItem("brewlineCart")) || [];
}

/* =====================================================
   UPDATE CART COUNT
===================================================== */

function updateCartCount() {
  const cartCount = document.getElementById("cartCount");

  if (!cartCount) return;

  const cart = getCart();

  const totalItems = cart.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  cartCount.textContent = totalItems;
}

/* =====================================================
   ADD TO CART
===================================================== */

const addToCartButtons = document.querySelectorAll(".add-to-cart");

addToCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const product = {
      id: button.dataset.id,
      name: button.dataset.name,
      price: Number(button.dataset.price),
      quantity: 1,
    };

    let cart = getCart();

    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push(product);
    }

    localStorage.setItem("brewlineCart", JSON.stringify(cart));

    updateCartCount();

    button.textContent = "Added ✓";

    setTimeout(() => {
      button.textContent = "Add to Cart";
    }, 1000);
  });
});

/* =====================================================
   DISPLAY CART
===================================================== */

function displayCart() {
  const cartItems = document.getElementById("cartItems");

  if (!cartItems) return;

  const emptyCart = document.getElementById("emptyCart");
  const cartSubtotal = document.getElementById("cartSubtotal");
  const cartShipping = document.getElementById("cartShipping");
  const cartTotal = document.getElementById("cartTotal");
  const cartItemCount = document.getElementById("cartItemCount");

  const cart = getCart();

  cartItems.innerHTML = "";

  if (cart.length === 0) {
    emptyCart.classList.add("show");

    cartSubtotal.textContent = "$0.00";
    cartShipping.textContent = "$0.00";
    cartTotal.textContent = "$0.00";
    cartItemCount.textContent = "0 items";

    return;
  }

  emptyCart.classList.remove("show");

  let subtotal = 0;
  let totalQuantity = 0;

  cart.forEach((item) => {
    subtotal += item.price * item.quantity;
    totalQuantity += item.quantity;

    const cartItem = document.createElement("div");

    cartItem.className = "cart-item";

    cartItem.innerHTML = `
            <div class="cart-item-info">

                <h3>${item.name}</h3>

                <p class="cart-item-price">
                    $${item.price.toFixed(2)} each
                </p>

            </div>

            <div class="cart-item-actions">

                <div class="quantity-controls">

                    <button
                        class="quantity-button decrease"
                        data-id="${item.id}"
                        aria-label="Decrease quantity"
                    >
                        −
                    </button>

                    <span class="quantity-value">
                        ${item.quantity}
                    </span>

                    <button
                        class="quantity-button increase"
                        data-id="${item.id}"
                        aria-label="Increase quantity"
                    >
                        +
                    </button>

                </div>

                <strong class="cart-item-total">
                    $${(item.price * item.quantity).toFixed(2)}
                </strong>

                <button
                    class="remove-item"
                    data-id="${item.id}"
                >
                    Remove
                </button>

            </div>
        `;

    cartItems.appendChild(cartItem);
  });

  cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;

  /*
       Free shipping for this demo.
    */
  const shipping = 0;

  cartShipping.textContent = "$0.00";

  const total = subtotal + shipping;

  cartTotal.textContent = `$${total.toFixed(2)}`;

  cartItemCount.textContent = `${totalQuantity} ${totalQuantity === 1 ? "item" : "items"}`;

  /* =================================================
       INCREASE QUANTITY
    ================================================= */

  document.querySelectorAll(".increase").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.id;

      const cart = getCart();

      const product = cart.find((item) => item.id === id);

      if (product) {
        product.quantity += 1;
      }

      localStorage.setItem("brewlineCart", JSON.stringify(cart));

      displayCart();
      updateCartCount();
    });
  });

  /* =================================================
       DECREASE QUANTITY
    ================================================= */

  document.querySelectorAll(".decrease").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.id;

      let cart = getCart();

      const product = cart.find((item) => item.id === id);

      if (product) {
        product.quantity -= 1;

        if (product.quantity <= 0) {
          cart = cart.filter((item) => item.id !== id);
        }
      }

      localStorage.setItem("brewlineCart", JSON.stringify(cart));

      displayCart();
      updateCartCount();
    });
  });

  /* =================================================
       REMOVE ITEM
    ================================================= */

  document.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.id;

      let cart = getCart();

      cart = cart.filter((item) => item.id !== id);

      localStorage.setItem("brewlineCart", JSON.stringify(cart));

      displayCart();
      updateCartCount();
    });
  });
}

/* =====================================================
   CHECKOUT BUTTON
===================================================== */

const checkoutButton = document.getElementById("checkoutButton");

if (checkoutButton) {
  checkoutButton.addEventListener("click", () => {
    const cart = getCart();

    if (cart.length === 0) {
      alert("Your cart is empty.");

      return;
    }

    alert(
      "Thank you for your order! Checkout functionality can be connected later.",
    );
  });
}

/* =====================================================
   INITIALIZE CART
===================================================== */

updateCartCount();
displayCart();
