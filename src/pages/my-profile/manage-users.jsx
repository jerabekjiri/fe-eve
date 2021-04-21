import { useEffect, useState, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input'
import Grid from '@material-ui/core/Grid'

import EditIcon from "@material-ui/icons/EditOutlined";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import RevertIcon from "@material-ui/icons/NotInterestedOutlined";
import IconButton from "@material-ui/core/IconButton";

import { fetchVignetteTypes, patchVignetteType } from 'api/vignette-types';
import { vignetteTypes } from 'store/vignettes';
import Loader from 'components/shared/loader';
import { keys } from '@material-ui/core/styles/createBreakpoints';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography } from '@material-ui/core';

const ManageUsers = () => {
  
  const classes = useStyles();

  const [user, setUser] = useState(null)

  return (
    <Paper className={classes.root}>
      <Grid 
        container
        justify="flex-start"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <Typography>
            Hledat uživatele
          </Typography>
        </Grid>

        <Grid item>
          <FindUserInput selectOption={option => setUser(option)}/>
        </Grid>
      </Grid>

      {user && (
        <>
          <Typography>
            {user.first_name} {user.last_name}
          </Typography>
      
          <Typography>
            {user.email}
          </Typography>

          <Typography>
            {user.phone}
          </Typography>

          <Typography>
            {user.role.name}
          </Typography>

          <Typography>
            Zakoupené známky:
          </Typography>
        </>
      )}
     
    </Paper>
  )
}

export default ManageUsers


const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4)
  }
}))

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

const FindUserInput = (props) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState(null);
  
  
  let selectedUser = null;

  useEffect(() => {
    setUsers(mockUsers)
    
    //setOptions()
  }, [])

  useEffect(() => {

    if (!loading) {
      return
    }
    console.log('executed')
    
  }, [loading])

  const handleOptionChange = (option, value) => {
    //console.log(option, value)
    const user = users.find(user => {
      const finKey = Object.keys(user).find(key => user[key] === value)

      return finKey ? user[finKey] : null;
    })
    
    selectedUser = user

    //setSelectedOption()
    return option === value
  }

  const handleChange = (e) => {
    console.log('clear clicked')
    const val = e.target.value;
    const isUser = users.find(user => 
      user.email.includes(val) || 
      user.first_name.includes(val) || 
      user.last_name.includes(val) || 
      user.phone.includes(val)
    ) 
    
    
    if (isUser) {
      const keys = Object.keys(isUser).filter(key => key != 'role' && key != 'id');
     
      const key = keys.find(key => { 
        return isUser[key].includes(val)
      });
      // key = first_name
      setOptions(users.map(user => user[key]))
    }
  }

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }

    if (selectedUser) {
      //console.log(selectedUser)
      props.selectOption(selectedUser)
    }

  }, [open]);

  const handleClear = (r) => {
    if (r === 'clear') {
      selectedUser = null
      setOptions([])
    }
  }
  return (
    <Autocomplete
      style={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={handleOptionChange}
      getOptionLabel={(option) => option}
      options={options}
      loading={loading}
      onInputChange={(e, v, r) => handleClear(r)}
      renderInput={(params) => (
        <TextField
          onChange={handleChange}
          {...params}
          label="Uživatel"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </Fragment>
            ),
          }}
        />
      )}
    />
  );
}


const mockUsers = [
  {
    "id": 1,
    "email": "admin@znamky.com",
    "first_name": "FS_Adminss",
    "last_name": "LS_Admin",
    "phone": "666666666",
    "role": {
      "id": 1,
      "name": "admin"
    }
  },
  {
    "id": 2,
    "email": "user@znamky.com",
    "first_name": "Milan",
    "last_name": "Chrápal",
    "phone": "777777777",
    "role": {
      "id": 2,
      "name": "user"
    }
  }
]