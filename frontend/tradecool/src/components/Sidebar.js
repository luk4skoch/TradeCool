
import Stack from 'react-bootstrap/Stack';
import ProductBar from './ProductBar';
import Button from 'react-bootstrap/Button';


export default function Sidebar(props) {
    const handleAdd = () => {
        props.setCurrentProductId(0);
        props.setEditOn(true);
    }
    const productList = props.products.map(product => {
        return (
            <ProductBar product={product} key={product.id} current={props.currentProductId.toString() === product.id.toString()} setCurrentProductId={props.setCurrentProductId} />
        )
    })
    return (
        <Stack gap={1}>
            <input placeholder="Search..."></input>
            <Button variant="primary" onClick={handleAdd}>Add new product to trade</Button>
            <br />
            {productList}
        </Stack>
    );
}