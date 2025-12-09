import React, { useEffect, useState } from "react";
import { Table, Button, Container, Spinner, Alert } from "react-bootstrap";
import EditProduct from "./EditProduct";
import AddProduct from "./AddProduct";
import "../Admin.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editingProduct, setEditingProduct] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);

  // Fetch all products
  const fetchProducts = async () => {
    setLoading(true);
    setError("");

    try {
      const token = sessionStorage.getItem("token"); // if using auth
      const response = await fetch("http://localhost:9090/api/products", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      setProducts(data); // assuming backend returns array of products
    } catch (err) {
      console.error(err);
      setError("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Open edit modal
  const handleEditClick = (product) => {
    setEditingProduct(product);
    setShowEditModal(true);
  };

  // Update product in state after editing
  const handleUpdateProduct = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  // Add new product to state
  const handleAddProduct = (newProduct) => {
    setProducts((prev) => [newProduct, ...prev]); // add at the top
  };

  // Delete product
  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(`http://localhost:9090/api/products/${productId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Failed to delete product");

      setProducts((prev) => prev.filter((p) => p.id !== productId));
      alert("Product deleted successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    }
  };

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="products-page my-5">
      <h1>Product Listing</h1>
      <Button
        className="btn-primary add-product-btn mb-3"
        onClick={() => setShowAddModal(true)}
      >
        Add Product
      </Button>

      <Table striped bordered hover responsive className="products-card">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.title}</td>
              <td>{product.category}</td>
              <td>₱{product.price}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEditClick(product)}
                >
                  ✏️
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  className="me-2"
                  onClick={() => handleDelete(product.id)}
                >
                  🗑
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Edit Product Modal */}
      <EditProduct
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        product={editingProduct}
        onUpdate={handleUpdateProduct}
      />

      {/* Add Product Modal */}
      <AddProduct
        show={showAddModal}
        handleClose={() => setShowAddModal(false)}
        onAdd={handleAddProduct}
      />
    </Container>
  );
};

export default Products;
