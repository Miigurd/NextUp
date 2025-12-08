import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductCard = ({ id, image, title, price, discount, note }) => (
  <Link
    to={`/NextUp/product/${id}`}
    className="product-card text-decoration-none d-block text-center p-2"
    style={{ cursor: "pointer" }}
  >
    <Card className="text-center shadow-sm border-0 rounded-3 position-relative h-100">
      <Card.Img
        variant="top"
        src={process.env.PUBLIC_URL + image} // using React public folder
        alt={title}
        style={{ height: "120px", objectFit: "contain", marginTop: "10px" }}
      />
      <Card.Body>
        {discount && (
          <span className="badge bg-success position-absolute top-0 end-0 m-2">
            {discount}% OFF
          </span>
        )}
        <Card.Title className="fs-6 mt-2">{title}</Card.Title>
        {price && (
          <Card.Text className="fw-bold text-success">₱{price}</Card.Text>
        )}
        {note && <Card.Text className="text-muted small">{note}</Card.Text>}
      </Card.Body>
    </Card>
  </Link>
);

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from API
  useEffect(() => {
    fetch("http://localhost:9090/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Container className="text-center my-5">
        <h3>Loading products...</h3>
      </Container>
    );
  }

  const featuredProducts = products.filter(
    (p) => p.category === "Scented Candle Line"
  );

  const dailyEssentials = products.filter(
    (p) => p.category === "Home Fragrance Line"
  );

  const popularProducts = products.filter(
    (p) => p.category === "Bath & Body Aromatic Line"
  );

  return (
    <div>
      {/* Featured Products */}
      <Container className="my-5">
        <h2 className="fw-semibold text-center mb-4">Featured Products</h2>
        <Row className="g-4 justify-content-center">
          {featuredProducts.map((item) => (
            <Col key={item.id} xs={6} sm={4} md={3} lg={2}>
              <ProductCard {...item} />
            </Col>
          ))}
        </Row>
      </Container>

      {/* Home Fragrance Essentials */}
      <Container fluid className="bg-light py-5">
        <Container>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-semibold">Home Fragrance Essentials</h2>
            <Button variant="link" className="text-success fw-semibold">
              View All
            </Button>
          </div>

          <Row className="g-3 justify-content-center mb-4">
            {dailyEssentials.slice(0, 6).map((item) => (
              <Col key={item.id} xs={6} sm={4} md={3} lg={2}>
                <ProductCard {...item} />
              </Col>
            ))}
          </Row>

          <Row className="g-3 justify-content-center">
            {dailyEssentials.slice(6).map((item) => (
              <Col key={item.id} xs={6} sm={4} md={3} lg={2}>
                <ProductCard {...item} />
              </Col>
            ))}
          </Row>
        </Container>
      </Container>

      {/* Popular Products */}
      <Container className="text-center my-5">
        <h2 className="fw-semibold mb-2">Popular</h2>
        <p className="text-muted mb-4">
          Our top selling product that you may like
        </p>
        <Row className="g-4 justify-content-center">
          {popularProducts.map((item) => (
            <Col key={item.id} xs={6} sm={4} md={3}>
              <ProductCard {...item} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default ProductList;
