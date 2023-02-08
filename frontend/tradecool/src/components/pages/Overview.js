import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { API } from "../../const/AppConstants";
import Sidebar from "../Sidebar";
import { Container, Row, Col } from "react-bootstrap";
import { Outlet } from "react-router";

function Overview() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
    const interval = setInterval(() => {
      fetchProducts();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  function fetchProducts() {
    fetch(API + "/api/products")
      .then((data) => data.json())
      .then((data) => setProducts(data));
  }

  return (
    <Container className="mt-3">
      <Row>
        <Col md={4}>
          <Sidebar products={products} />
        </Col>
        <Col>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
}

export default Overview;
