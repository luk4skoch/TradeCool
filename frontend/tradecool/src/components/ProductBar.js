import Image from 'react-bootstrap/Image';
import React from 'react'


export default function ProductBar(props) {
    const handleClick = (event) => {
        props.setCurrentProductId(event.target.id);
    }
    const product = props.product;
    const statusClass = product.status === 'OPEN' ? 'text-success' : product.status === 'SOLD' ? 'text-danger' : 'text-warning';
    return (
        <div className={props.current ? "bg-info" : "bg-light"} id={product.id} onClick={(event) => handleClick(event)}>
            <Image src={product.images ? "data:"+ product.images[0].type +";base64," + product.images[0].imageData : "https://placehold.it/"} roundedCircle={true} height='50px' width='50px'/>
            <span className="m-3 fw-bolder">{product.title}</span>
            <span className={statusClass}>{product.status}</span>
        </div>
    );
}