import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const ProductCard = ({ id, image, title, price }) => (
  <Link
    to={`/NextUp/product/${id}`}
    className="product-card text-decoration-none d-block text-center p-2"
    style={{ cursor: "pointer" }}
  >
    <Card className="text-center shadow-sm border-0 rounded-3 position-relative h-100">
      <Card.Img
        variant="top"
        src={process.env.PUBLIC_URL + image}
        alt={title}
        style={{ height: "120px", objectFit: "contain", marginTop: "10px" }}
      />
      <Card.Body>
        <Card.Title className="fs-6 mt-2">{title}</Card.Title>
        {price && (
          <Card.Text className="fw-bold text-success">₱{price}</Card.Text>
        )}
      </Card.Body>
    </Card>
  </Link>
);

function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9090/api/products") // update if your URL differs
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Failed to load products:", err));
  }, []);

  const homeProducts = products.filter(
    (p) => p.category === "Signature Collection Line"
  );

  const popularProducts = products.filter(
    (p) => p.category === "Bath & Body Aromatic Line"
  );

  const testimonials = [
    { name: "Luisa", text: "“I love it! No more air fresheners.”", stars: 4 },
    { name: "Edoardo", text: "“Recommended for everyone.”", stars: 5 },
    { name: "Mart", text: "“Niceeee.”", stars: 4 },
  ];

  return (
    <div className="homepage">

      {/* Hero Section */}
      <div
        className="home-container"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/homepage.jpg)`,
          backgroundPosition: "center",
          height: "100vh"
        }}
      >
        <div className = "home-text">
          <h1>Your One-stop Shop for Everyday Essentials.</h1>
        </div>
      </div>

      {/* Signature Collection */}
      <Container className="mt-5">
        <Row className="text-center mb-4">
          <Col>
            <h2 className="fw-semibold">Signature Collection</h2>
            <p className="text-muted">Order it for you or for your beloved ones</p>
          </Col>
        </Row>

        <Row className="g-4 justify-content-center">
          {homeProducts.map((item) => (
            <Col key={item.id} xs={6} sm={4} md={3}>
              <ProductCard {...item} />
            </Col>
          ))}
        </Row>
      </Container>

      {/* Lotion Section */}
      <Container className="my-5">
        <Row className="align-items-center">
          <Col md={6}>
            <h2>Smooth and Nourishing Lotion</h2>
            <p>Made to hydrate your skin and enhance your natural glow.</p>
            <ul>
              <li><strong>Natural ingredients:</strong> Infused with plant extracts</li>
              <li><strong>Long-lasting moisture:</strong> Hydrated skin for hours</li>
              <li><strong>Non-greasy formula:</strong> Perfect for any weather</li>
              <li><strong>Everyday care:</strong> Gentle for all skin types</li>
            </ul>
            <Button variant="success">Learn More</Button>
          </Col>

          <Col md={6}>
            <img
              src={`${process.env.PUBLIC_URL}/images/homepagelotion.jpg`}
              alt="Lotion"
              className="img-fluid rounded shadow"
            />
          </Col>
        </Row>
      </Container>

      {/* Testimonials Section */}
      <div className="testimonials-section py-5">
        <Container className="my-5">
          <Row className="text-center mb-4">
            <Col>
              <h2 className="testimonials-title">Testimonials</h2>
              <p className="testimonials-subtitle">Some quotes from our happy customers</p>
            </Col>
          </Row>

          <Row className="testimonials-container text-center">
            {testimonials.map((t, index) => (
              <Col md={3} key={index} className="testimonial-card mb-4">
                <img
                  src={`${process.env.PUBLIC_URL}/images/usericon.jpg`}
                  alt={t.name}
                  className="testimonial-icon rounded-circle mb-2"
                  width="60"
                />
                <div>
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <span key={i} className="stars text-success">★</span>
                  ))}
                </div>
                <p className="testimonial-text">{t.text}</p>
                <strong className="testimonial-name">{t.name}</strong>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

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

export default HomePage;
