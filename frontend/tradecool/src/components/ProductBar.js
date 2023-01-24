import Image from 'react-bootstrap/Image';
import React from 'react'
import {Link} from "react-router-dom";


export default function ProductBar(props) {
    const product = props.product;
    const statusClass = product.status === 'OPEN' ? 'text-success' : product.status === 'SOLD' ? 'text-danger' : 'text-warning';
    return (
        <Link style={{
           textDecoration: "none"
        }} to={"/products/" + product.id} >
            <Image src={product.images.length > 0 ? "data:"+ product.images[0].type +";base64," + product.images[0].imageData : "https://placehold.it/"} roundedCircle={true} height='50px' width='50px'/>
            <span className="m-3 fw-bolder text-black">{product.title}</span>
            <span className={statusClass}>{product.status}</span>
        </Link>
    );
}