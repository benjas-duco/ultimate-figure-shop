import Button from 'react-bootstrap/Button';

function BotonAgregar(props) {
    return (
        <Button
            variant = "outline-secondary" 
            onClick = {props.onClick}
        >
            +
        </Button>
    );
}

export default BotonAgregar;