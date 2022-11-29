import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

export default function Product(props) {
    const product = props.product;
    const handleEdit = () => props.setEditOn(true);
    return (
        <Container>
            <Row>
                <Col md={8}>
                    <h3>
                        {product.name}
                    </h3>
                    <Image src={product.img || "https://placehold.it/"} width='90%' />
                    <p className="mt-3">{product.description}</p>
                </Col>
                <Col md={4} className="mt-5">
                    <Stack gap={3} id="">
                        <Button variant="success">Trade!</Button>{' '}
                        <Button variant="warning" onClick={handleEdit}>Edit</Button>{' '}
                        <Button variant="danger">Delete</Button>{' '}
                    </Stack>
                </Col>
            </Row>

        </Container>
    );
}