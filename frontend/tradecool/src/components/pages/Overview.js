import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";

import Sidebar from "../Sidebar";
import { Container, Row, Col } from "react-bootstrap";
import {Outlet} from "react-router";

function Overview() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then((data) => data.json())
      .then((data) => setProducts(data));
  }, [products]);

  return (
    <Container className="mt-3">
      <Row>
        <Col md={4}>
          <Sidebar products={products} />
        </ Col>
        < Col>
          <Outlet />
        </ Col>
      </Row>
    </ Container>
  )
}

export default Overview;
