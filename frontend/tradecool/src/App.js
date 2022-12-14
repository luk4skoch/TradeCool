import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState} from "react";

import NavElement from './components/NavElement';
import Sidebar from './components/Sidebar';
import Product from './components/Product';
import EditProduct from './components/EditProduct';

import {Container, Row, Col} from "react-bootstrap";

function App() {
  const [products, setProducts] = useState([]);
  const [editOn, setEditOn] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(0);


  useEffect(() => {
    fetch("http://localhost:8080/api/products")
        .then(data => data.json())
        .then(data => setProducts(data))
  }, [products])


  const findCurrentProduct = () => {
    return (products.find(product => {
          return product.id.toString() === currentProductId.toString()
        }) || {
          "title": "",
          "description": "",
          "imageData": "",
          "userId": null,
          "status": "OPEN",
          "categories": []
        }
    )
  }


  return (
    <div className="App">
      <NavElement />
      <Container className="mt-3">
        <Row>
          <Col md={4} >
            <Sidebar products={products} currentProductId={currentProductId} setCurrentProductId={setCurrentProductId} setEditOn={setEditOn} />
          </Col>
            <Col md={8}>
                {editOn ? <EditProduct product={findCurrentProduct()} setCurrentProductId={setCurrentProductId} setEditOn={setEditOn} /> : <Product product={findCurrentProduct()} setEditOn={setEditOn} />}
            </Col>
        </Row>
      </Container>
    </div>

  );
}

export default App;
