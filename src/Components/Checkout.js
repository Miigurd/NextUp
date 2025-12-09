import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

function Checkout() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user from sessionStorage
    const storedUser = sessionStorage.getItem("user");
    if (!storedUser) {
      alert("Please log in first!");
      navigate("/login");
      return;
    }
    const user = JSON.parse(storedUser);

    // Fetch cart from API
    const fetchCart = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:9090/api/carts/${user.id}`);
        if (!response.ok) throw new Error("Failed to load cart");
        const data = await response.json();
        setCart(data);
      } catch (error) {
        console.error(error);
        setCart({ items: [], total_price: 0 });
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [navigate]);

  const handleCheckout = async () => {
    const storedUser = sessionStorage.getItem("user");
    if (!storedUser) {
      alert("Please log in first!");
      return;
    }

    const user = JSON.parse(storedUser);

    try {
      const response = await fetch("http://localhost:9090/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.id,
        }),
      });

      const text = await response.text(); // <--- IMPORTANT
      console.log("Raw Response:", text);

      let data;
      try {
        data = JSON.parse(text); // Try decoding JSON
      } catch (e) {
        console.error("JSON parse error:", e);
        alert("Server returned invalid JSON.");
        return;
      }

      alert("Order placed successfully!");
      sessionStorage.removeItem("cart");
      navigate("/NextUp");

    } catch (error) {
      console.error("Checkout Error:", error);
      alert("Checkout failed. Please try again.");
    }
  };

  if (loading) {
    return (
      <Container className="text-center my-5">
        <h3>Loading checkout...</h3>
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
      <Row>
        {/* Left Section: Form */}
        <Col md={7}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Contact</Form.Label>
              <Form.Control type="email" placeholder="Email or mobile phone number" />
            </Form.Group>

            <div className="d-flex justify-content-between align-items-center mb-4">
              <small>
                Do you have an account?{" "}
                <Link to="/login" className="text-success fw-semibold">Login</Link>
              </small>
            </div>

            <h5 className="fw-semibold mt-4 mb-3">Shipping Address</h5>
            <Row>
              <Col md={6}><Form.Control placeholder="Name" className="mb-3" /></Col>
              <Col md={6}><Form.Control placeholder="Second Name" className="mb-3" /></Col>
            </Row>
            <Form.Control placeholder="Address and number" className="mb-3" />
            <Form.Control placeholder="Shipping note (optional)" className="mb-3" />
            <Row>
              <Col md={6}><Form.Control placeholder="City" className="mb-3" /></Col>
              <Col md={6}><Form.Control placeholder="Postal Code" className="mb-3" /></Col>
            </Row>
            <Row>
              <Col md={6}><Form.Control placeholder="Province" className="mb-3" /></Col>
              <Col md={6}><Form.Control placeholder="Country/Region" className="mb-3" /></Col>
            </Row>

            <Form.Check
              type="checkbox"
              label="Save this information for a future fast checkout"
              className="mb-4"
            />

            <h5 className="fw-semibold mb-3">Shipping Method</h5>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <Form.Check type="radio" label="Standard Shipping" checked readOnly />
              </div>
              <span className="fw-semibold text-success">Free</span>
            </div>

            <div className="d-flex justify-content-between">
              <Link to="/NextUp/cart" className="text-success fw-semibold">
                Back to cart
              </Link>
              <Button
                variant="success"
                className="px-5"
                onClick={handleCheckout}
                disabled={cart.items.length === 0}
              >
                Check out
              </Button>
            </div>
          </Form>
        </Col>

        {/* Right Section: Summary */}
        <Col md={5}>
          <Card className="p-4 shadow-sm border-0 bg-light">
            {cart.items.length === 0 ? (
              <p className="text-center text-muted">Your cart is empty.</p>
            ) : (
              <>
                {cart.items.map((item) => (
                  <div key={item.id} className="d-flex align-items-center mb-3 border-bottom pb-2">
                    <div className="position-relative me-3">
                      <img
                        src={`http://localhost:9090/products/${item.product.image}`}
                        alt={item.product.title}
                        width="70"
                        className="rounded"
                      />
                      <span
                        className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-success"
                        style={{ fontSize: "0.8rem" }}
                      >
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-grow-1">
                      <p className="mb-0 fw-semibold">{item.product.title}</p>
                      <p className="text-success mb-0">₱{item.price}</p>
                    </div>
                  </div>
                ))}

                <Form.Control placeholder="Coupon code" className="mb-3" />
                <Button variant="secondary" className="w-100 mb-4">
                  Add code
                </Button>

                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal</span>
                  <span>₱{cart.total_price}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping</span>
                  <span>₱0</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between fw-bold fs-5">
                  <span>Total</span>
                  <span className="text-success">₱{cart.total_price}</span>
                </div>
              </>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Checkout;
