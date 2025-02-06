const deleteIconUrl = "./images/image_161.jpg";
        // Initial cart data
        const cartData = [
            {
                id: 'gradient-tee',
                name: 'Gradient Graphic T-shirt',
                size: 'Large',
                color: 'White',
                price: 145,
                image: './images/image_162.jpg',
                quantity: 1
            },
            {
                id: 'checkered-shirt',
                name: 'Checkered Shirt',
                size: 'Medium',
                color: 'Red',
                price: 180,
                image: './images/image_165.jpg',
                quantity: 1
            },
            {
                id: 'skinny-jeans',
                name: 'Skinny Fit Jeans',
                size: 'Large',
                color: 'Blue',
                price: 240,
                image: './images/image_163.jpg',
                quantity: 1
            }
        ];

        // Function to update quantity
        function updateQuantity(productId, delta) {
            const product = cartData.find(item => item.id === productId);
            if (product) {
                product.quantity = Math.max(1, product.quantity + delta);
                renderCart();
                updateOrderSummary();
            }
        }

        // Function to remove item
        function removeItem(productId) {
            const index = cartData.findIndex(item => item.id === productId);
            if (index !== -1) {
                cartData.splice(index, 1);
                renderCart();
                updateOrderSummary();
            }
        }

        // Function to render cart items
        function renderCart() {
            const cartContainer = document.getElementById('cartItems');
            cartContainer.innerHTML = cartData.map(product => `
                <div class="cart-item">
                    <img
                        src="${product.image}"
                        alt="${product.name}"
                        class="item-image"
                        onerror="this.src='/api/placeholder/120/150'"  // Fallback if image fails to load
                    />
                    
                    <div class="item-details">
                        <div class="item-header">
                            <h3 class="item-name">${product.name}</h3>
                            <button class="remove-button" onclick="removeItem('${product.id}')"><img src="${deleteIconUrl}" alt="Delete item"></button>
                        </div>
                        <p class="item-meta">Size: ${product.size}</p>
                        <p class="item-meta">Color: ${product.color}</p>
                        <p class="item-price">$${product.price}</p>
                    </div>
                    <div class="quantity-controls">
                        <button
                            onclick="updateQuantity('${product.id}', -1)"
                            class="quantity-button"
                        >-</button>
                        <span>${product.quantity}</span>
                        <button
                            onclick="updateQuantity('${product.id}', 1)"
                            class="quantity-button"
                        >+</button>
                    </div>
                </div>
            `).join('');
        }

        // Function to update order summary
        function updateOrderSummary() {
            const subtotal = cartData.reduce((sum, item) => sum + item.price * item.quantity, 0);
            const discount = subtotal * 0.2;
            const deliveryFee = 15;
            const total = subtotal - discount + deliveryFee;

            document.getElementById('subtotal').textContent = `$${subtotal}`;
            document.getElementById('discount').textContent = `-$${discount.toFixed(0)}`;
            document.getElementById('total').textContent = `$${total.toFixed(0)}`;
        }

        // Initial render
        renderCart();
        updateOrderSummary();