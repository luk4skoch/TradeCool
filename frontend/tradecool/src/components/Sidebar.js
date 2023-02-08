import Stack from "react-bootstrap/Stack";
import ProductBar from "./ProductBar";
import Button from "react-bootstrap/Button";
import React from "react";
import { useUserTokenContext } from "../context/UserTokenContext";
import { useNavigate } from "react-router-dom";

export default function Sidebar(props) {
  const userToken = useUserTokenContext();
  const navigate = useNavigate();

  const productList = props.products.map((product) => {
    return <ProductBar product={product} key={product.id} />;
  });
  return (
    <Stack gap={1}>
      <input placeholder="Search..."></input>
      {userToken && (
        <Button variant="primary" onClick={() => navigate("/products/add")}>
          Add new product to trade
        </Button>
      )}
      <br />
      {productList}
    </Stack>
  );
}
