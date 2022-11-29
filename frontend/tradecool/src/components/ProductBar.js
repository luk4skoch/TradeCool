import Image from 'react-bootstrap/Image';


export default function ProductBar(props) {
    const handleClick = (event) => {
        props.setCurrentProductId(event.target.id);
    }
    const product = props.product;
    const statusClass = product.status === 'open' ? 'text-success' : product.status === 'closed' ? 'text-danger' : 'text-warning';
    return (
        <div className={props.current ? "bg-info" : "bg-light"} id={product.id} onClick={(event) => handleClick(event)}>
        <Image src={product.img || "https://placehold.it/"} roundedCircle={true} height='50px'/>
        <span className="m-3 fw-bolder">{product.name}</span>
        <span className={statusClass}>{product.status}</span>
    </div>
    );
}