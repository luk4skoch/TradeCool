import React, {useState} from 'react';
import Carousel from 'react-bootstrap/Carousel';

export default function ImageCarousel(props) {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    const imageItems = props.images.map(
        image =>
            <Carousel.Item key={image.id}>
                <img
                    className="d-block"
                    src={image ? "data:" + image.type + ";base64," + image.imageData : "https://placehold.it/"}
                    width="400px"
                    height="400px"
                    alt="product"
                />
            </Carousel.Item>
    )

    return (
        <Carousel activeIndex={index} onSelect={handleSelect}>
            {imageItems}
        </Carousel>
    );
}