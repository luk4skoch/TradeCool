import Stack from "react-bootstrap/Stack";
import ProductBar from "./ProductBar";
import Button from "react-bootstrap/Button";
import React, {useEffect, useState} from "react";
import {useUserTokenContext} from "../context/UserTokenContext";
import {useNavigate} from "react-router-dom";

export default function Sidebar(props) {
    const [productsToShow, setProductsToShow] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        if (search === "") {
            setProductsToShow(props.products);
        }
    }, [props.products])

    const startSearch = (event) => {
        setSearch(event.target.value);
        let filteredProducts = props.products.filter(product => {
            console.log(product.title + "title" + product.title.includes(search));
            console.log(product.description + "desc" + product.title.includes(search));
            console.log(product.categories + "cat" + product.categories.filter(category => category.name.includes(search)));
            return product.title.includes(search) ||
                product.description.includes(search) ||
                product.categories.filter(category => category.name.includes(search)).length > 0;
        });
        setProductsToShow(filteredProducts);
    }

    const userToken = useUserTokenContext();
    const navigate = useNavigate();
    const productList = productsToShow.map((product) => {
        return <ProductBar product={product} key={product.id}/>;
    });
    console.log(search)
    return (
        <Stack gap={1}>
            <input placeholder="Search..." value={search} onChange={(event) => startSearch(event)}></input>
            {userToken && (
                <Button variant="primary" onClick={() => navigate("/products/add")}>
                    Add new product to trade
                </Button>
            )}
            <br/>
            {productList}
        </Stack>
    );
}
