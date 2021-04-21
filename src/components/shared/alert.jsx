import { Alert, AlertTitle } from '@material-ui/lab';

const AlertMessage = ({ error }) => {
    return (
        <div>
            <Alert severity="error">
                <AlertTitle>Chyba</AlertTitle>
                Něco se pokazilo 
                {!!error.length && <> — <strong>{error}</strong></>}
            </Alert> 
        </div>
    )
}

export default AlertMessage
