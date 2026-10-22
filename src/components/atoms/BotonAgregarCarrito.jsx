import { Button } from "react-bootstrap";

function BotonAgregarCarrito(props){
    return(
        <Button
            variant="primary"
            onClick={props.onClick}
            className="mt-3"
        >
            Agregar al Carrito
        </Button>
    );
}

export default BotonAgregarCarrito;