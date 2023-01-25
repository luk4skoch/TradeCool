import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import { useUserTokenContext } from "../context/UserTokenContext";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { secFetch } from "./utils/FetchUtils";
export default function EditProduct(props) {
  const userToken = useUserTokenContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    status: "OPEN",
    newcategory: "",
    categories: [],
    images: [],
  });
  const { productId } = useParams();
  useEffect(() => {
    if (productId > 0) {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };
      fetch("http://localhost:8080/api/products/" + productId, requestOptions)
        .then((response) => response.json())
        .then((result) => setFormData({ ...result }))
        .catch((error) => console.log("error", error));
    }
  }, []);
  const [imageData, setImageData] = useState([]);

  const handleFormData = (event) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value || event.target.innerText,
      };
    });
  };

  const handleImageData = (event) => {
    setImageData(event.target.files);
  };

  const handleNewCategory = () => {
    let newCategory = { name: formData.newcategory };
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        categories: [...prevFormData.categories, newCategory],
        newcategory: "",
      };
    });
  };

  const handleDeleteCategory = (event) => {
    let oldCategories = [...formData.categories];
    let updatedCategories = oldCategories.filter(
      (category) => category.name !== event.currentTarget.dataset.category
    );
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        categories: updatedCategories,
      };
    });
  };

  const handleDeleteImage = (id) => {
    setFormData((prevFormData) => {
      let newImages = prevFormData.images.filter((image) => image.id !== id);
      return {
        ...prevFormData,
        images: newImages,
      };
    });
  };

  const sendFormData = () => {
    let url = "/api/products";
    let formDataToSend = new FormData();
    const json = JSON.stringify(formData);
    const blob = new Blob([json], {
      type: "application/json",
    });
    formDataToSend.append("product", blob);
    if (imageData.length > 0) {
      for (let image of imageData) {
        formDataToSend.append("images", image);
      }
      url += "/images";
    }
    let method;
    if (formData.id > 0) {
      // edit
      method = "PUT";
    } else {
      // add
      method = "POST";
    }

    secFetch(url, method, formDataToSend)
      .then((data) => {
        if (data instanceof Error) {
          navigate("/login");
        }
        return data.json();
      })
      .then((data) => console.log(data))
      .then(() => navigate("/products"))
      .catch((err) => console.error(err));
  };

  const categoriesToEdit = formData.categories.map((category) => (
    <div
      className="m-1 p-2 bg-muted rounded"
      style={{ backgroundColor: "lightblue" }}
      key={category.name}
    >
      {category.name}
      <button
        className="btn btn-sm mx-2"
        data-category={category.name}
        onClick={(event) => handleDeleteCategory(event)}
      >
        <span role="img">❌</span>
      </button>
    </div>
  ));

  const imagesToEdit = formData.images.map((image) => (
    <>
      <div key={image.id}>
        <img
          src={
            image
              ? "data:" + image.type + ";base64," + image.imageData
              : "https://placehold.it/"
          }
          alt={image.name}
          width="100px"
        />
      </div>
      <button
        className="btn btn-sm mx-2"
        onClick={() => handleDeleteImage(image.id)}
      >
        ❌
      </button>
    </>
  ));
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
            style={{ width: "75%" }}
            name="title"
            value={formData.title}
            onChange={handleFormData}
            required
          />
          <p>
            <br />
          </p>
          <h4>Description:</h4>
          <textarea
            name="description"
            className="mt-3"
            rows="5"
            cols="36"
            onChange={handleFormData}
            value={formData.description}
          ></textarea>

          <p>
            <br />
          </p>
          <h4>Photos:</h4>
          <div className="d-flex align-items-start">{imagesToEdit}</div>
          <p className="mt-3">
            <input
              type="file"
              multiple
              name="imageData"
              // value={formData.imageData}
              // value={imageData}
              onChange={handleImageData}
            />
          </p>

          <h4>Categories:</h4>
          <div className="d-flex flex-wrap">{categoriesToEdit}</div>
          {/*<p>Add a category:</p>*/}
          <br />
          <div className="input-group mb-3">
            <input
              className="form-control"
              type="text"
              list="categories"
              name="newcategory"
              value={formData.newcategory}
              onChange={handleFormData}
              onKeyUp={(event) => {
                if (event.key === "Enter") handleNewCategory(event);
              }}
            />
            <datalist>
              <option value="food"></option>
            </datalist>
            <div className="input-group-append">
              <button
                className="btn btn-primary"
                type="button"
                onClick={(event) => handleNewCategory(event)}
              >
                +
              </button>
            </div>
          </div>

          <h4 className="mt-3">
            Status:
            <select
              name="status"
              value={formData.status}
              onChange={handleFormData}
            >
              <option value="OPEN">OPEN</option>
              <option value="SOLD">SOLD</option>
              <option value="RESERVED">RESERVED</option>
            </select>
          </h4>
        </Col>
        <Col md={4} className="mt-5">
          <Stack gap={3}>
            <Button variant="success" onClick={sendFormData}>
              Save
            </Button>{" "}
            <Button
              variant="warning"
              onClick={() =>
                navigate(productId ? "/products/" + productId : "/products")
              }
            >
              Cancel
            </Button>{" "}
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}
