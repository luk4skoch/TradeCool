import React, {useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";

export default function EditProduct(props) {
    const product = props.product;
    const [formData, setFormData] = useState({
        "id": (product.id),
        "title": (product.title),
        "description": (product.description),
        "status": (product.status),
        "newcategory": "",
        "categories": [...product.categories],
        "userId": 0,
        "images": [...product.images]
    });
    const [imageData, setImageData] = useState([])

    const handleFormData = (event) => {
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value || event.target.innerText
            }
        })
    }

    const handleImageData = (event) => {
        setImageData(event.target.files);
        console.log(imageData);
    }

    const handleNewCategory = () => {
        setFormData(prevFormData => {
            let newCategory = {"name": prevFormData.newcategory};
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

    const handleDeleteImage = (id) => {
        setFormData(prevFormData => {
            let newImages = prevFormData.images.filter(image => image.id !== id);
            return {
                ...prevFormData,
                images: newImages
            }
        })
        console.log(formData);
    }

    const sendFormData = () => {
        let url = 'http://localhost:8080/api/products';
        let formDataToSend = new FormData();
        const json = JSON.stringify(formData);
        const blob = new Blob([json], {
            type: 'application/json'
        });
        formDataToSend.append("product", blob);
        if (imageData.length > 0) {
            for (let image of imageData) {
                formDataToSend.append("images", image)
            }
            url += "/images"
        }
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
            // headers: {
            //     'Content-Type': 'application/json'
            // },
            referrerPolicy: 'no-referrer',
            body: formDataToSend
        }).then(data => data.json().then((data) => data.id !== undefined && props.setCurrentProductId(data.id)));
        props.setEditOn(false);
    };

    const currentProductToDefault = () => {
        props.setCurrentProductId(0);
        props.setEditOn(false);
    }

    const categoriesToEdit = formData.categories.map(category =>
        <div
            className="m-1 p-2 bg-muted rounded"
            style={{backgroundColor: "lightblue"}}
            key={category.name}>
            {category.name}
            <button className="btn btn-sm mx-2"
                    data-category={category.name}
                    onClick={(event) => handleDeleteCategory(event)}>❌
            </button>
        </div>
    )

    const imagesToEdit = formData.images.map(image =>
        <>
        <div
            key={image.id}>
            <img
                src={image ? "data:" + image.type + ";base64," + image.imageData : "https://placehold.it/"}
                alt={image.name}
                width="100px"
            />
        </div>
        <button className="btn btn-sm mx-2"
                onClick={() => handleDeleteImage(image.id)}>❌
        </button>
        </>
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

                    <h3>Title:</h3>

                        <input
                            style={{width: '75%'}}
                            name="title"
                            value={formData.title}
                            onChange={handleFormData}
                            required
                        />
                    <p><br/></p>
                    <h4>Description:</h4>
                    <textarea
                        name="description"
                        className="mt-3" rows="5" cols="36"
                        onChange={handleFormData}
                        value={formData.description}>
                    </textarea>

                    <p><br/></p>
                    <h4>Photos:</h4>
                    <div className="d-flex align-items-start">
                        {imagesToEdit}
                    </div>
                    <p className="mt-3">
                        <input
                            type="file"
                            multiple
                            name="imageData"
                            // value={formData.imageData}
                            // value={imageData}
                            onChange={handleImageData}/>
                    </p>


                    <h4>Categories:</h4>
                    <div className="d-flex flex-wrap">
                        {categoriesToEdit}
                    </div>
                    {/*<p>Add a category:</p>*/}
                    <br/>
                    <div className="input-group mb-3">
                        <input
                            className="form-control"
                            type="text"
                            list="categories"
                            name="newcategory"
                            value={formData.newcategory}
                            onChange={handleFormData}
                            onKeyUp={(event) => {
                                if (event.key === "Enter") handleNewCategory(event)
                            }}
                        />
                        <datalist>
                            <option value="food"></option>
                        </datalist>
                        <div className="input-group-append">
                            <button className="btn btn-primary"
                                    type="button" onClick={(event) => handleNewCategory(event)}>+
                            </button>
                        </div>
                    </div>

                    <h4 className="mt-3">Status:
                        <select name="status"
                            value={formData.status}
                            onChange={handleFormData}>
                            <option value="OPEN">OPEN</option>
                            <option value="SOLD">SOLD</option>
                            <option value="RESERVED">RESERVED</option>
                        </select>
                    </h4>

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

