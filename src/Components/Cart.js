import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Table } from "react-bootstrap";

function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch cart from API
  const fetchCart = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:9090/api/carts/1", {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
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

  const handleDecrease = async (item) => {
    if (item.quantity <= 1) return;
    await updateCartItem(item.id, item.quantity - 1);
  };

  const handleIncrease = async (item) => {
    await updateCartItem(item.id, item.quantity + 1);
  };

  const updateCartItem = async (itemId, quantity) => {
    try {
      const response = await fetch(`http://localhost:9090/api/carts/${itemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ quantity }),
      });
      if (!response.ok) throw new Error("Failed to update item");
      fetchCart(); // Refresh cart after update
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemove = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:9090/api/carts/${itemId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) throw new Error("Failed to remove item");
      fetchCart(); // Refresh cart after deletion
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckout = () => {
    if (!cart || cart.items.length === 0) {
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

  if (!cart || cart.items.length === 0) {
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
                    src={process.env.PUBLIC_URL + item.product.image}
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
