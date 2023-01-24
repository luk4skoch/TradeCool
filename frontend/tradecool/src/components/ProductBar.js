import Image from 'react-bootstrap/Image';
import React from 'react'
import {NavLink} from "react-router-dom";

const pendingStyling = {textDecoration: "none", backgroundColor: "lightgrey", borderRadius: "5px"}
const activeStyling = {textDecoration: "none", backgroundColor: "lightblue", borderRadius: "5px"}

export default function ProductBar(props) {

    const product = props.product;
    const statusClass = product.status === 'OPEN' ? 'text-success' : product.status === 'SOLD' ? 'text-danger' : 'text-warning';
    return (
        <NavLink  to={"/products/" + product.id}
                 style={
                     ({ isActive, isPending }) =>
                         isActive
                             ? activeStyling
                             : isPending
                                 ? pendingStyling
                                 : pendingStyling
                 }
                 >
            <Image src={product.images.length > 0 ? "data:"+ product.images[0].type +";base64," + product.images[0].imageData : "https://placehold.it/"} roundedCircle={true} height='50px' width='50px'/>
            <span className="m-3 fw-bolder text-black">{product.title}</span>
            <span className={statusClass}>{product.status}</span>
        </NavLink>
    );
}