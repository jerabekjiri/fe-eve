import TextField from '@material-ui/core/TextField';
import LPMask from './lp-mask';
import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';

const LicensePlateValidator = (props) => {
    
    const [lp, setLP] = useState('')
    const classes = useStyles();

    const handleLP = (event) => {
        let val = event.target.value.toUpperCase();
        setLP(val)
        isValidFormat(val)

        props.onChange(val)
    };

    const isValidFormat = (val) => {
        const lp = val.replace(/\s/g, "");
        lp.length === 7 ? props.validFormat(lp) : props.validFormat(null)
    }


    return (
        <TextField
            error={props.state !== null && !props.state}
            label="SPZ"
            placeholder={'Např. 4A2 3000'}
            margin="normal"
            variant='outlined'
            className={props.state === true ? classes.success : ''}
            disabled={props.pending ? true : false}
            InputProps={{
                inputComponent: LPMask,
                value: lp,
                onChange: handleLP,
            }}
        />
    )
}
export default LicensePlateValidator;


const useStyles = makeStyles((theme) => ({
    success: {
        '& input:valid + fieldset': {
            borderColor: theme.palette.primary.main
        },
        '& .MuiOutlinedInput-root:hover fieldset': {
            borderColor: theme.palette.primary.main
        }
    }
}));