export const addItem = (item, next) => {
  let cart = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    // If user clicks on the same item, purchase quantity increases by 1
    let existingItem = cart.find((cartItem) => cartItem._id === item._id);
    if (existingItem) {
      existingItem.purchase_quantity += 1;
    } else {
      //if item doesn't exist, simply add it
      cart.push({ ...item, purchase_quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
};

export const getCartItems = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart"));
    }
  }

  return [];
};

export const updateQuantity = (productId, quantity) => {
  let cart = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    //find if item exists, just in case
    let existentItem = cart.find((item) => item._id === productId);

    //if it doesnt exist simply return
    if (!existentItem) return;

    //continue and update quantity
    existentItem.purchase_quantity = quantity;

    //validate result
    if (existentItem.purchase_quantity <= 0) {
      //remove item  by filtering it from cart array
      cart = cart.filter((item) => item._id !== productId);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

export const removeItem = (productId) => {
  let cart = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    //find if item exists, just in case
    let existentItem = cart.find((item) => item._id === productId);

    //if it doesnt exist simply return
    if (!existentItem) return;

    //remove item  by filtering it from cart array
    cart = cart.filter((item) => item._id !== productId);

    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

export const emptyCart = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("cart");
    next();
  }
};
