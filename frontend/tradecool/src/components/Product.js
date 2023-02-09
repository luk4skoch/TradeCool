import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import React, { useEffect, useState } from "react";
import { API } from "../const/AppConstants";
import ImageCarousel from "./ImageCarousel";
import { useUserTokenContext } from "../context/UserTokenContext";
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

export default function Product(props) {
  const userToken = useUserTokenContext();
  const navigate = useNavigate();
  const userName = userToken ? jwtDecode(userToken).sub : null;
  const userId = userToken ? jwtDecode(userToken).userId : null;
  const [product, setProduct] = useState({
    title: "",
    description: "",
    images: [],
    status: "OPEN",
    categories: [],
  });
  let { productId } = useParams();
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch(API + "/api/products/" + productId, requestOptions)
      .then((response) => response.json())
      .then((result) => setProduct(result))
      .catch((error) => console.log("error", error));
  }, [productId]);
  const handleDelete = () => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }
    let url = API + "/api/products/" + product.id;
    fetch(url, {
      method: "DELETE",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      referrerPolicy: "no-referrer",
    });
    navigate("/products");
  };
  const statusClass =
    product.status === "OPEN"
      ? "text-success"
      : product.status === "SOLD"
      ? "text-danger"
      : "text-warning";
  const categories = product.categories.map((category) => (
    <div className="m-1 p-2 bg-muted bg-secondary rounded" key={category.name}>
      {category.name}
    </div>
  ));

  function getChat() {
    return (
      <>
        {product.user && (
          <Button variant="success">
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to={userToken ? "/chat/" + userId + "/" + productId + "/" + product.user.id : "/login"}
            >
              Chat!
            </Link>
          </Button>
        )}
      </>
    );
  }

  return (
    <Container style={{backgroundColor: "rgba(255, 255, 255, 0.7)", borderRadius: 20, padding: 20}}>
      <Row>
        <Col md={8}>
          <h3>{product.title}</h3>
          <h6 className={statusClass}>{product.status}</h6>
          {<ImageCarousel images={product.images} />}
          <p className="mt-3">{product.description}</p>
          {product.categories.length > 0 && (
            <>
              <p>Categories: </p>
              <div className="d-flex">{categories}</div>
            </>
          )}
          {product.user && (
            <p className="mt-3">Added by {product.user.username}</p>
          )}
        </Col>
        <Col md={4} className="mt-5">
          <Stack gap={3} id="">
            {getChat()}

            {product.user && userName === product.user.email && (
              <>
                {/* <Button variant="warning">
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to={"/products/" + productId + "/edit"}
                  >
                    Edit
                  </Link>
                </Button> */}
                <Button
                  variant="warning"
                  onClick={() => navigate("/products/" + productId + "/edit")}
                >
                  Edit
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                  Delete
                </Button>{" "}
              </>
            )}
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}
