import Stack from 'react-bootstrap/Stack';
import ProductBar from './ProductBar';
import Button from 'react-bootstrap/Button';
import React from 'react'
import {useUserTokenContext} from "../context/UserTokenContext";

export default function Sidebar(props) {
    const userToken = useUserTokenContext();
    const handleAdd = () => {
        props.setCurrentProductId(-1);
        props.setEditOn(true);
    }
    const productList = props.products.map(product => {
        return (
            <ProductBar product={product} key={product.id} current={props.currentProductId.toString() === product.id.toString()} setCurrentProductId={props.setCurrentProductId} />
        )
    })
    return (
        <Stack gap={1}>
            <input placeholder="Search..."></input>
            {userToken && <Button variant="primary" onClick={handleAdd}>Add new product to trade</Button>}
            <br />
            {productList}
        </Stack>
    );
}