import Button from 'react-bootstrap/Button';

function BotonComprar(props) {
    return (
        <Button
            variant="success"
            size="lg"
            onClick={props.onClick}
        >
            Pagar / Finalizar Compra
        </Button>
    );
}

export default BotonComprar;