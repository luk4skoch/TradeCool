import { useState } from 'react';

import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

export default function EditProduct(props) {
    const product = props.product;
    const [formData, setFormData] = useState({
        "id" : (product.id),
        "title": (product.name),
        "img": (product.img),
        "description": (product.description),
        "status": (product.status)
    });
    console.log("form data");
    console.log(formData)
    const handleFormData = (event) => {
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value || event.target.innerText
            }
        })
    }

    const sendFormData = () => {
        props.setEditOn(false);
    };

    const currentProductToDefault = () => {
        props.setCurrentProductId(1);
        props.setEditOn(false);
    }

    return (
        <Container>
            <Row>
                <Col md={8}>
                    <input 
                        hidden
                        name="id"
                        value={formData.id}
                        onChange={handleFormData}
                        />

                    <h3>Title:
                     <input 
                        style={{ width: '75%' }}
                        name="title" 
                        value={formData.title}
                        onChange={handleFormData}
                        />
                    </h3>

                    <Image src={product.img || "https://placehold.it/"} width='90%' />
                    
                    <p className="mt-3">
                    Photo: 
                        <input type="file"
                            name="img"
                            value={formData.img}
                            onChange={handleFormData} />
                    </p>

                    <textarea 
                    name="description"
                    className="mt-3" rows="5" cols="36"
                    onChange={handleFormData}>
                    {formData.description}</textarea>

                    <p className="mt-3">Status:
                         <select name="status"
                            value={formData.status}
                            onChange={handleFormData}
                        >
                            <option value="open">open</option>
                            <option value="closed">closed</option>
                            <option value="reserved">reserved</option>
                        </select>
                    </p>

                </Col>
                <Col md={4} className="mt-5">
                    <Stack gap={3}>
                        <Button variant="success" onClick={sendFormData}>Save</Button>{' '}
                        <Button variant="warning" onClick={currentProductToDefault}>Cancel</Button>{' '}
                    </Stack>
                </Col>
            </Row>

        </Container>
    );
}