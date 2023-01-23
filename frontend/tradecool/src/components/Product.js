import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import React, {useEffect, useState} from 'react'

import ImageCarousel from './ImageCarousel'
import {useUserTokenContext} from "../context/UserTokenContext";
import {useParams} from "react-router";
import {Link} from "react-router-dom";

export default function Product(props) {
    const userToken = useUserTokenContext();
    const [product, setProduct] = useState({
        title: "",
        description: "",
        images: [],
        status: "OPEN",
        categories: [],
    })
    let {productId} = useParams();
    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        fetch("http://localhost:8080/api/products/" + productId, requestOptions)
            .then(response => response.json())
            .then(result => setProduct(result))
            .catch(error => console.log('error', error));
    }, [])
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
    const categories = product.categories.map(category =>
        <div
            className="m-1 p-2 bg-muted bg-secondary rounded"
            key={category.name}>
            {category.name}
        </div>
    )

    return (
        <Container>
            <Row>
                <Col md={8}>
                    <h3>
                        {product.title}
                    </h3>
                    <h6 className={statusClass}>
                        { product.status}
                    </h6>
                    {
                        <ImageCarousel images={product.images}/>
                    }
                    <p className="mt-3">{product.description}</p>
                    {product.categories.length > 0 &&
                        <>
                            <p>Categories: </p>
                            <div className="d-flex">
                                {categories}
                            </div>
                        </>}
                            {/*<p className="mt-3">Added by {product.user.username}</p>*/}
                </Col>
                {userToken &&
                <Col md={4} className="mt-5">
                    <Stack gap={3} id="">
                        <Button variant="success">Trade!</Button>{' '}
                        <Button variant="warning"><Link style={{textDecoration: "none", color: "white"}} to={"/products/"+ productId + "/edit"}>Edit</Link></Button>{' '}
                        <Button variant="danger" onClick={handleDelete}>Delete</Button>{' '}
                    </Stack>
                </Col>}
            </Row>

        </Container>
    );
}