import { useState } from 'react';
import React from 'react'

import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

export default function EditProduct(props) {
    const product = props.product;
    const [formData, setFormData] = useState({
        "id": (product.id),
        "title": (product.title),
        "image": (product.imageData),
        "description": (product.description),
        "status": (product.status),
        "newcategory": "",
        "categories": [...product.categories],
        "userId": 0
    });

    const handleFormData = (event) => {
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.id === "image" ? event.target.files[0] : event.target.value || event.target.innerText
            }
        })
    }


    const handleNewCategory = (event) => {
        setFormData(prevFormData => {
            let newCategory = { "name": prevFormData.newcategory };
            prevFormData.newcategory = "";
            return {
                ...prevFormData,
                categories: [...prevFormData.categories, newCategory]
            }
        })
    }

    const handleDeleteCategory = event => {
        setFormData(prevFormData => {
            let oldCategories = [...prevFormData.categories];
            let updatedCategories = oldCategories.filter(category => category.name !== event.target.dataset.category);
            return {
                ...prevFormData,
                categories: updatedCategories
            }
        })
    }
    const sendFormData = () => {
        uploadImage(formData);
        let url = 'http://localhost:8080/api/products';
        let method;
        if (formData.id !== undefined) {
            // edit
            method = 'PUT'
            // url += '/' + formData.id;
        } else {
            // add
            method = 'POST'
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
            body: {...formData}
        }).then(data => data.json().then((data) => data.id !== undefined && props.setCurrentProductId(data.id)));
        props.setEditOn(false);
    };

    const currentProductToDefault = () => {
        props.setCurrentProductId(0);
        props.setEditOn(false);
    }

    const categoriesToEdit = formData.categories.map(category =>
        <div
        className="m-1 p-2 bg-muted bg-secondary rounded"
         key={category.name}>
            {category.name}
            <button className="btn btn-danger btn-sm mx-2" 
            data-category={category.name} 
            onClick={(event) => handleDeleteCategory(event)}>🗑</button>
        </div>
    )

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
                            required
                        />
                    </h3>

                    {product.id !== undefined && <Image src={product.imageData ? "data:image/png;base64," + product.imageData : "https://placehold.it/"} width='90%' />}

                    <p className="mt-3">
                        Photo:
                        <input
                            type="file"
                            name="image"
                            // value={formData.imageData}
                            onChange={handleFormData} />
                    </p>

                    <textarea
                        name="description"
                        className="mt-3" rows="5" cols="36"
                        onChange={handleFormData}
                        value={formData.description}>
                    </textarea>

                    <p>Categories:</p>
                    <div className="d-flex">
                        {categoriesToEdit}
                    </div>
                    <p>Add a category:</p>

                    <div className="input-group mb-3">
                        <input
                            className="form-control"
                            type="text"
                            list="categories"
                            name="newcategory"
                            value={formData.newcategory}
                            onChange={handleFormData}
                        />
                        <datalist>
                            <option value="food"></option>
                        </datalist>
                        <div className="input-group-append">
                            <button className="btn btn-primary"
                                type="button" onClick={(event) => handleNewCategory(event)}>+</button>
                        </div>
                    </div>



                    <p className="mt-3">Status:
                        <select name="status"
                            value={formData.status}
                            onChange={handleFormData}
                        >
                            <option value="OPEN">OPEN</option>
                            <option value="SOLD">SOLD</option>
                            <option value="RESERVED">RESERVED</option>
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

function uploadImage(formData) {
    let imageFormData = new FormData();
    imageFormData.append('image', formData.image);
    fetch('http://localhost:8080/api/images',
        {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            body: imageFormData
        }).then(data => data.json())
        .then(data => formData.imageData = data);
}
