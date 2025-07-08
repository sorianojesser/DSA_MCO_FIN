// Grocery data
const groceryData = {
    fruits: [
        { name: "Strawberry", price: 150 },
        { name: "Banana", price: 60 },
        { name: "Apple", price: 100 },
        { name: "Melon", price: 150 },
        { name: "Orange", price: 100 },
    ],
    drinks: [
        { name: "Coke", price: 75 },
        { name: "Yakult", price: 85 },
        { name: "Lemonade", price: 50 },
        { name: "Dutch milk", price: 46 },
        { name: "C-2", price: 185 },
    ],
    hygiene: [
        { name: "Toilet paper", price: 20 },
        { name: "Flushable wipes", price: 30 },
        { name: "Toothbrush", price: 24 },
        { name: "Nail clipper", price: 35 },
        { name: "Sunscreen", price: 75 },
    ],
    sweets: [
        { name: "Cookies", price: 125 },
        { name: "Chocolate", price: 230 },
        { name: "Candy", price: 47 },
        { name: "Gummies", price: 53 },
        { name: "Cupcakes", price: 163 },
    ],
};

// User login
function login() {
    const name = prompt("Enter your name:");
    const username = prompt("Enter your username:");
    const password = prompt("Enter your password:");
    alert(`Welcome, ${name}! Choose your good items!`);
    return { name, username };
}

// Cart management
let cart = [];

function addToCart(item, quantity) {
    if (!isNaN(quantity) && quantity > 0) {
        cart.push({ item, quantity });
        alert(`${quantity}x ${item.name} added to the cart!`);
    } else {
        alert("Invalid quantity! Please enter a valid number.");
    }
}

function removeFromCart(itemName) {
    const initialCartSize = cart.length;
    cart = cart.filter(cartItem => cartItem.item.name.toLowerCase() !== itemName.toLowerCase());
    if (cart.length === initialCartSize) {
        alert("Item not found in cart!");
    } else {
        alert(`${itemName} removed from cart.`);
    }
}

// Main shopping function
function groceryShopping() {
    const user = login();

    let category = prompt("Choose a category: Fruits, Drinks, Hygiene, Sweets").toLowerCase();
    let items = groceryData[category];

    if (!items) {
        alert("Invalid category! Please choose from Fruits, Drinks, Hygiene, or Sweets.");
        return;
    }

    let moreItems = true;
    while (moreItems) {
        const itemName = prompt("Enter item name:").toLowerCase();
        const item = items.find(i => i.name.toLowerCase() === itemName);

        if (item) {
            let quantity;
            while (true) {
                quantity = parseInt(prompt("Enter quantity:"));
                if (!isNaN(quantity) && quantity > 0) break;
                alert("Invalid quantity! Please enter a valid number.");
            }
            addToCart(item, quantity);
        } else {
            alert("Item not found. Try again.");
        }

        moreItems = confirm("Would you like to add more items?");
        if (moreItems) {
            category = prompt("Choose another category: Fruits, Drinks, Hygiene, Sweets").toLowerCase();
            const newItems = groceryData[category];
            if (newItems) {
                items = newItems;
            } else {
                alert("Invalid category. Continuing with previous items.");
            }
        }
    }

    if (cart.length > 0) {
        let cartSummary = "Your current cart:\n";
        cart.forEach(cartItem => {
            cartSummary += `${cartItem.item.name} x ${cartItem.quantity} = $${(cartItem.item.price * cartItem.quantity).toFixed(2)}\n`;
        });
        alert(cartSummary);
    } else {
        alert("Your cart is empty.");
    }

    while (true) {
        const removeItem = prompt("Do you want to remove an item? Enter item name or 'no':").toLowerCase();
        if (removeItem === "no") break;
        removeFromCart(removeItem);
    }

    let total = cart.reduce((sum, cartItem) => sum + cartItem.item.price * cartItem.quantity, 0);
    while (true) {
        let payment = parseFloat(prompt(`Your total is $${total.toFixed(2)}. Enter payment amount:`));
        if (!isNaN(payment) && payment >= total) {
            let change = (payment - total).toFixed(2);
            let receipt = "Receipt:\n";
            cart.forEach(cartItem => {
                receipt += `${cartItem.item.name} x ${cartItem.quantity} = $${(cartItem.item.price * cartItem.quantity).toFixed(2)}\n`;
            });
            receipt += `Total: $${total.toFixed(2)}\nPayment: $${payment.toFixed(2)}\nChange: $${change}`;
            alert(receipt);
            break;
        } else {
            alert("Insufficient payment! Please enter a valid amount.");
        }
    }
}

// Start the grocery shopping experience
groceryShopping();  
