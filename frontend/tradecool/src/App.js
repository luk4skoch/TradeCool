import {useState} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import './App.css';
import NavElement from './components/NavElement';
import Product from './components/Product';
import EditProduct from './components/EditProduct';
import Sidebar from './components/Sidebar';


function App() {
  const [products, setProducts] = useState(productsMock);
  const [editOn, setEditOn] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(1);

  const findCurrentProduct = () => {
    return (products.find(product => {
        return product.id.toString() === currentProductId.toString()}) || {
          "name": "",
          "description": "",
          "img": "",
          "user_id":null,
          "status":"open"
        }
    )}

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
      name: 'Product1',
      description: 'productsad',
      img: '',
      id: 1,
      user_id: null,
      category: 'tablet',
      status: 'open'
  },
  {
      name: 'Product2',
      description: 'productsad',
      img: '',
      id: 2,
      user_id: null,
      category: 'tablet',
      status: 'closed'
  }]