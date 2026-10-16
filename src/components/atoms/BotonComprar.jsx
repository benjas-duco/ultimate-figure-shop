import Button from 'react-bootstrap/Button';

function BotonComprar(props) {
    return (
        <Button
            variant="primary"
            onClick={props.onClick}
        >
            Comprar
        </Button>
    );
}

export default BotonComprar;