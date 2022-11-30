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
        "title": (product.title),
        "imagePath": (product.imagePath),
        "description": (product.description),
        "status": (product.status),
        "category": "no",
        "userId": 0
    });

    const handleFormData = (event) => {
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value || event.target.innerText
            }
        })
        console.log(formData)
    }

    const sendFormData = () => {
        let method, url;
        url = 'http://localhost:8080/api/product';
        if (formData.id !== undefined) {
            // edit
            method =  'PUT'
            url += '/' + formData.id;
        } else {
            // add
            method =  'POST'
        }
        fetch(url, {
            method: method,
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(formData)
        })
        props.setEditOn(false);
    };

    const currentProductToDefault = () => {
        props.setCurrentProductId(0);
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

                    <Image src={product.imagePath || "https://placehold.it/"} width='90%' />
                    
                    <p className="mt-3">
                    Photo: 
                        <input
                            name="imagePath"
                            value={formData.imagePath}
                            onChange={handleFormData} />
                    </p>

                    <textarea 
                    name="description"
                    className="mt-3" rows="5" cols="36"
                    onChange={handleFormData}
                    value={formData.description}>
                    </textarea>

                    <p className="mt-3">Status:
                         <select name="status"
                            value={formData.status}
                            onChange={handleFormData}
                        >
                            <option value="OPEN">open</option>
                            <option value="SOLD">sold</option>
                            <option value="RESERVED">reserved</option>
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