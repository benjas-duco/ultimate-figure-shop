import Button from 'react-bootstrap/Button';

function BotonQuitar(props) {
    return(
        <Button
            variant="warning"
            onClick={props.onClick}
        >
            Quitar
        </Button>
    )
}

export default BotonQuitar;