import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Table } from "react-bootstrap";

function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Get current user from sessionStorage
  const storedUser = sessionStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const fetchCart = async () => {
    if (!user) {
      setCart({ items: [], total_price: 0 });
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:9090/api/carts/${user.id}`);
      if (!response.ok) throw new Error("Failed to fetch cart");
      const data = await response.json();
      setCart(data);
    } catch (error) {
      console.error(error);
      setCart({ items: [], total_price: 0 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateCartItem = async (itemId, quantity) => {
    try {
      const response = await fetch(`http://localhost:9090/api/carts/${itemId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity }),
      });
      if (!response.ok) throw new Error("Failed to update item");
      fetchCart();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDecrease = (item) => {
    if (item.quantity > 1) updateCartItem(item.id, item.quantity - 1);
  };

  const handleIncrease = (item) => {
    updateCartItem(item.id, item.quantity + 1);
  };

  const handleRemove = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:9090/api/carts/${itemId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to remove item");
      fetchCart();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckout = () => {
    if (!cart || !cart.items || cart.items.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    navigate("/NextUp/checkout");
  };

  if (loading) {
    return (
      <Container className="text-center my-5">
        <h3>Loading cart...</h3>
      </Container>
    );
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <Container className="text-center my-5">
        <h3>Your cart is empty</h3>
        <Link to="/NextUp" className="btn btn-success mt-3">
          Back to shopping
        </Link>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h3 className="text-center fw-semibold mb-3">Your cart items</h3>
      <div className="text-center mb-4">
        <Link to="/NextUp" className="text-success fw-semibold">
          Back to shopping
        </Link>
      </div>

      <Table responsive bordered={false} className="align-middle">
        <thead>
          <tr className="text-muted small text-uppercase">
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cart.items.map((item) => (
            <tr key={item.id}>
              <td>
                <div className="d-flex align-items-center">
                  <img
                    src={`http://localhost:9090/products/${item.product.image}`}
                    alt={item.product.title}
                    width="80"
                    className="me-3 rounded"
                  />
                  <div>
                    <p className="fw-semibold mb-1">{item.product.title}</p>
                    <button
                      className="btn btn-link p-0 text-success small"
                      onClick={() => handleRemove(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </td>
              <td>₱{item.price}</td>
              <td>
                <Button
                  variant="outline-success"
                  size="sm"
                  className="me-1"
                  onClick={() => handleDecrease(item)}
                >
                  -
                </Button>
                <span className="mx-2">{item.quantity}</span>
                <Button
                  variant="outline-success"
                  size="sm"
                  className="ms-1"
                  onClick={() => handleIncrease(item)}
                >
                  +
                </Button>
              </td>
              <td>₱{item.total_price}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <hr className="my-4" />

      <div className="d-flex justify-content-between align-items-center">
        <strong>Sub-total</strong>
        <strong className="text-success fs-5">₱{cart.total_price}</strong>
      </div>

      <div className="text-end mt-3">
        <Button
          variant="success"
          className="px-4"
          onClick={handleCheckout}
          disabled={cart.items.length === 0}
        >
          Check-out
        </Button>
      </div>
    </Container>
  );
}

export default Cart;
