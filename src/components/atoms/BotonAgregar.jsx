import Button from 'react-bootstrap/Button';

function BotonAgregar(props) {
    return (
        <Button
            variant="success"
            onClick={props.onClick}
        >
            Agregar
        </Button>
    );
}

export default BotonAgregar;