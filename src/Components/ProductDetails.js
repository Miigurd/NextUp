import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  // Fetch product by ID
  useEffect(() => {
    fetch(`http://localhost:9090/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  const handleIncrease = () => setQuantity((prev) => prev + 1);

  const handleAddToCart = async () => {
    if (!product) return;

    setAdding(true);

    try {
      const response = await fetch("http://localhost:9090/api/carts", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id: product.id,
          quantity: quantity,
          price: product.price,
        }),
      });

      if (!response.ok) throw new Error("Failed to add to cart");

      const cart = await response.json();
      alert(`${quantity} "${product.title}" added to cart!`);
      console.log("Cart:", cart); // optional: update cart state in context
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setAdding(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <Container className="text-center my-5">
        <h3>Loading product...</h3>
      </Container>
    );
  }

  // Product not found
  if (!product) {
    return (
      <Container className="text-center my-5">
        <h3>Product not found</h3>
        <Link to="/NextUp" className="btn btn-success mt-3">
          Back to Products
        </Link>
      </Container>
    );
  }

  return (
    <div>
      <Container className="my-5">
        <Row className="align-items-center">
          <Col md={6} className="text-center mb-4 mb-md-0">
            <img
              src={process.env.PUBLIC_URL + product.image}
              alt={product.title}
              className="img-fluid rounded-3"
              style={{ maxHeight: "350px", objectFit: "contain" }}
            />
            <p className="mt-3 text-muted small">{product.description}</p>
            <p className="text-success fw-semibold">Free Shipping</p>
          </Col>

          <Col md={6}>
            <h3>{product.title}</h3>
            <h4 className="text-success fw-bold">₱{product.price}</h4>

            <div className="my-3">
              <label className="me-2">Quantity</label>
              <Button
                variant="outline-success"
                size="sm"
                className="me-1"
                onClick={handleDecrease}
              >
                -
              </Button>
              <span className="mx-2">{quantity}</span>
              <Button
                variant="outline-success"
                size="sm"
                className="ms-1"
                onClick={handleIncrease}
              >
                +
              </Button>
            </div>

            <Button
              variant="success"
              className="mt-3 w-100"
              onClick={handleAddToCart}
              disabled={adding}
            >
              {adding ? "Adding..." : "Add to cart"}
            </Button>
          </Col>
        </Row>

        <hr className="my-5" />

        <div className="text-center">
          <Link to="/NextUp" className="btn btn-outline-success">
            Back to Products
          </Link>
        </div>
      </Container>
    </div>
  );
}

export default ProductDetail;
