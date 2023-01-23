import Stack from 'react-bootstrap/Stack';
import ProductBar from './ProductBar';
import Button from 'react-bootstrap/Button';
import React from 'react'
import {useUserTokenContext} from "../context/UserTokenContext";
import {Link} from "react-router-dom";

export default function Sidebar(props) {
    const userToken = useUserTokenContext();

    const productList = props.products.map(product => {
        return (
            <ProductBar product={product} key={product.id} />
        )
    })
    return (
        <Stack gap={1}>
            <input placeholder="Search..."></input>
            {userToken && <Button variant="primary"><Link to={"add"} style={{textDecoration:"none", color:"white"}}>Add new product to trade</Link></Button>}
            <br />
            {productList}
        </Stack>
    );
}