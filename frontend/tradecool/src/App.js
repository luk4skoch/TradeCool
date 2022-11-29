import { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import './App.css';
import NavElement from './components/NavElement';
import Product from './components/Product';
import EditProduct from './components/EditProduct';
import Sidebar from './components/Sidebar';


function App() {
  const [products, setProducts] = useState([]);
  const [editOn, setEditOn] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(0);


  useEffect(() => {
    fetch("http://localhost:8080/api/product/all")
    .then(data => data.json())
    .then(data => setProducts(data))
  }, [products])


  const findCurrentProduct = () => {
    return (products.find(product => {
      return product.id.toString() === currentProductId.toString()
    }) || {
      "title": "",
      "description": "",
      "imagePath": "",
      "userId": null,
      "status": "open"
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


const productsMock = [
  {
    title: 'Product1',
    description: 'productsad',
    imagePath: '',
    id: 1,
    userId: null,
    category: 'tablet',
    status: 'open'
  },
  {
    title: 'Product2',
    description: 'productsad',
    imagePath: '',
    id: 2,
    userId: null,
    category: 'tablet',
    status: 'closed'
  }]