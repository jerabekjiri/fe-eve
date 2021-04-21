import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DialogContentText from '@material-ui/core/DialogContentText';
import Typography from '@material-ui/core/Typography'
import { fetchVignetteTypes } from 'api/vignette-types';
import { vignetteTypes } from 'store/vignettes';
import Loader from 'components/shared/loader';

//import { postVignetteExtend } from 'api/vignettes';

const Modal = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const typesState = useSelector(vignetteTypes);

  const [open, setOpen] = useState(false);
  const [selectedType, setSelectedType] = useState({});
    
  const lp = '4A2 3000'

  useEffect(() => {
    dispatch(fetchVignetteTypes())
  }, [])

  const handleClickOpen = () => {
    //setSelectedType({})
    setOpen(true);
  }

  const handleClose = () => setOpen(false);

  const handleSelectedType = ({ target }) => {
    setSelectedType(
        typesState.types.find(type => type.id === Number(target.value))
    )
  }

  const handleExtend = () => {
    console.log(selectedType)
    //dispatch(postVignetteExtend({ vignetteId: selectedType.id, days: type.duration }))
    //handleClose()
  }

  const { types, pending } = typesState;

  if (pending)
    return <Loader />

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open alert dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Prodloužit platnost známky</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Zvolená SPZ: <strong>{lp}</strong>
            </DialogContentText>
            <FormControl variant='outlined' className={classes.formControl}>
                <InputLabel>Varianta</InputLabel>
                <Select
                    value={selectedType.id || ''}
                    onChange={handleSelectedType}
                    label="Varianta"
                    defaultValue={''}
                >
                    {types.map(type => (
                        <MenuItem key={type.id} value={type.id}>
                            {type.display_name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>    

            {!!Object.keys(selectedType).length && (
                <div>
                    <Typography variant='button'>
                        Cena: <span className={classes.price}>{selectedType.price} Kč</span>
                    </Typography>
                </div>
            )} 
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Zrušit
          </Button>
          <Button onClick={handleExtend} color="primary" autoFocus>
            Prodloužit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default Modal 

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: '300px',
    },
    price: {
        color: theme.custom.price
    },
}))
