import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import React from 'react'

export default function Product(props) {
    const product = props.product;
    const handleEdit = () => props.setEditOn(true);
    const handleDelete = () => {
        let url = 'http://localhost:8080/api/products/' + product.id;
        fetch(url, {
            method: 'DELETE',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            referrerPolicy: 'no-referrer',
        })
    }
    const statusClass = product.status === 'OPEN' ? 'text-success' : product.status === 'SOLD' ? 'text-danger' : 'text-warning';

    return (
        <Container>
            <Row>
                <Col md={8}>
                    <h3>
                        {product.title}
                    </h3>
                    <h6 className={statusClass}>
                        {product.status}
                    </h6>
                    <Image src={product.imagePath || "https://placehold.it/"} width='90%' />
                    <p className="mt-3">{product.description}</p>
                </Col>
                <Col md={4} className="mt-5">
                    <Stack gap={3} id="">
                        <Button variant="success">Trade!</Button>{' '}
                        <Button variant="warning" onClick={handleEdit}>Edit</Button>{' '}
                        <Button variant="danger" onClick={handleDelete}>Delete</Button>{' '}
                    </Stack>
                </Col>
            </Row>

        </Container>
    );
}