import React, {useState} from 'react';
import Carousel from 'react-bootstrap/Carousel';

export default function ImageCarousel(props) {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    const imageItems = props.images.map(
        image =>
            <Carousel.Item>
                <img
                    className="d-block"
                    src={image ? "data:" + image.type + ";base64," + image.imageData : "https://placehold.it/"}
                    alt="First slide"
                    width="90%"
                />
            </Carousel.Item>
    )

    return (
        <Carousel activeIndex={index} onSelect={handleSelect}>
            {imageItems}
        </Carousel>
    );
}