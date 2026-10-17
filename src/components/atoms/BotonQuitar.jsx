import Button from 'react-bootstrap/Button';

function BotonQuitar(props) {
    return(
        <Button
            variant = "outline-secondary"
            onClick = {props.onClick}
        >
            -
        </Button>
    )
}

export default BotonQuitar;