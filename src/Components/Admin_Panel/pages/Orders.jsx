import React, { useEffect, useState } from "react";
import { Table, Button, Container, Alert, Spinner } from "react-bootstrap";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all orders
  const fetchOrders = async () => {
    setLoading(true);
    setError("");

    try {
      const token = sessionStorage.getItem("token"); // if using auth
      const response = await fetch("http://localhost:9090/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data = await response.json();
      setOrders(data); // assuming backend returns array of orders
    } catch (err) {
      console.error(err);
      setError("Failed to fetch orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Update order status
  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:9090/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Failed to update status');
        return;
      }

      alert('Status updated!');
      fetchOrders(); // Refresh list to show updated status
    } catch (err) {
      console.error(err);
      alert('Something went wrong');
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

  if (orders.length === 0) {
    return (
      <Container className="my-5 text-center">
        <h5>No orders found.</h5>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h2 className="mb-4">Orders</h2>
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>Order ID</th>
            <th>Username</th>
            <th>Products</th>
            <th>Total Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.user?.username || "N/A"}</td>
              <td>
                {order.order_items && order.order_items.length > 0
                  ? order.order_items.map((item) => item.product?.title || "Unknown").join(", ")
                  : "No products"}
              </td>
              <td>₱{order.total_price}</td>
              <td>{order.status || "Pending"}</td>
              <td>
                <Button
                  size="sm"
                  variant="success"
                  className="me-2"
                  onClick={() => handleUpdateStatus(order.id, "Completed")}
                >
                  Mark Completed
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Orders;
