
import React, { useState, useEffect } from "react";
import "./App.css";

function Header() {
  return (
    <header className="header">
      <div className="brand">amazon<span>.store</span></div>
      <h1>Amazon Product Store</h1>
      <p>Your everyday shopping experience</p>
    </header>
  );
}

function ProductCard({
  name,
  price,
  quantity,
  color,
  city,
  onAdd,
  onRemove,
  onReset,
  onColorChange,
  onCityChange
}) {
  const total = quantity * price;

  return (
    <section className="product-card">
      <div className="product-image">
        <div className="mouse-icon">🖱️</div>
        <span className="product-tag">BEST SELLER</span>
      </div>

      <div className="product-details">
        <p className="category">COMPUTER ACCESSORIES</p>
        <h2>{name}</h2>
        <p className="description">
          Comfortable, reliable wireless mouse for
          everyday work and study.
        </p>

        <div className="price-row">
          <span className="price">₹{price}</span>
          <span className="stock">In Stock</span>
        </div>

        <div className="form-group">
          <label htmlFor="color">Choose Colour</label>
          <select
            id="color"
            value={color}
            onChange={(e) => onColorChange(e.target.value)}
          >
            <option value="Black">Black</option>
            <option value="Blue">Blue</option>
            <option value="White">White</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="city">Delivery City</label>
          <input
            id="city"
            type="text"
            value={city}
            onChange={(e) => onCityChange(e.target.value)}
            placeholder="Enter your city"
          />
        </div>

        <div className="cart-actions">
          <button className="add-btn" onClick={onAdd}>
            + Add to Cart
          </button>

          <div className="quantity-actions">
            <button
              className="secondary-btn"
              onClick={onRemove}
              disabled={quantity === 0}
            >
              Remove One
            </button>

            <button className="reset-btn" onClick={onReset}>
              Reset Cart
            </button>
          </div>
        </div>
      </div>

      <aside className="cart-summary">
        <h3>Cart Summary</h3>

        <div className="summary-row">
          <span>Product Price</span>
          <strong>₹{price}</strong>
        </div>

        <div className="summary-row">
          <span>Quantity</span>
          <strong>{quantity}</strong>
        </div>

        <div className="summary-row">
          <span>Colour</span>
          <strong>{color}</strong>
        </div>

        <div className="summary-row">
          <span>Delivery City</span>
          <strong className="city-value">{city || "Not entered"}</strong>
        </div>

        <div className="total-row">
          <span>Total Amount</span>
          <strong>₹{total}</strong>
        </div>

        <div className={quantity === 0 ? "cart-status empty" : "cart-status success"}>
          {quantity === 0
            ? "Cart is empty"
            : "✓ Product added to cart"}
        </div>

        <p className="calculation">
          {quantity} × ₹{price} = ₹{total}
        </p>
      </aside>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>© 2026 Amazon Product Store</p>
      <p>Simple shopping. Easy cart management.</p>
    </footer>
  );
}

function App() {
  const [quantity, setQuantity] = useState(0);
  const [selectedColor, setSelectedColor] = useState("Black");
  const [deliveryCity, setDeliveryCity] = useState("Coimbatore");
  const [showProduct, setShowProduct] = useState(true);

  useEffect(() => {
    console.log("Cart quantity changed:", quantity);
  }, [quantity]);

  const addToCart = () => {
    setQuantity((previous) => previous + 1);
  };

  const removeOne = () => {
    setQuantity((previous) => Math.max(0, previous - 1));
  };

  const resetCart = () => {
    setQuantity(0);
  };

  return (
    <div className="app">
      <Header />

      <main className="main-content">
        <div className="page-heading">
          <div>
            <h2>Featured Product</h2>
            <p>Explore our product and manage your cart.</p>
          </div>

          <button
            className="toggle-btn"
            onClick={() => setShowProduct((previous) => !previous)}
          >
            {showProduct ? "Hide Product" : "Show Product"}
          </button>
        </div>

        {showProduct && (
          <ProductCard
            name="Wireless Mouse"
            price={499}
            quantity={quantity}
            color={selectedColor}
            city={deliveryCity}
            onAdd={addToCart}
            onRemove={removeOne}
            onReset={resetCart}
            onColorChange={setSelectedColor}
            onCityChange={setDeliveryCity}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;