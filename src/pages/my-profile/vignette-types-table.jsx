import { useEffect, useState } from 'react'
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

import EditIcon from "@material-ui/icons/EditOutlined";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import RevertIcon from "@material-ui/icons/NotInterestedOutlined";
import IconButton from "@material-ui/core/IconButton";

import { fetchVignetteTypes, patchVignetteType } from 'api/vignette-types';
import { vignetteTypes } from 'store/vignettes';
import Loader from 'components/shared/loader';



const VignetteTypesTable = () => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const vignetteState = useSelector(vignetteTypes)

  const [editingRow, setEditingRow] = useState(null);
  const [localType, setLocalType] = useState(null);

  const tableHeader = [
    {key: 'name', label: 'Název'},
    {key: 'display_name', label: 'Varianta'},
    {key: 'price', label: 'Cena'},
    {key: 'duration', label: 'Délka platnosti'},
  ]

  useEffect(() => {
    dispatch(fetchVignetteTypes())
  }, [dispatch])

  const toggleEditMode = (id) => {
    setEditingRow(id)
    setLocalType(
      vignetteState.types.find(type => type.id === Number(id))
    )
  }

  const revert = () => {
    setEditingRow(null)
  } 

  const handleChange = (e) => {
    setLocalType(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const saveChanges = () => {
    dispatch(patchVignetteType(localType))
    setEditingRow(null)
  }

  const { types, pending } = vignetteState;

  if (!types || pending)
    return <Loader />

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell />
            {tableHeader.map(({ key, label }) => (
              <TableCell key={key}>{label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {types.map((type, i) => ( 
            <TableRow key={type.id}>
              <TableCell className={classes.selectTableCell}>
                {editingRow === type.id ? (
                  <>
                    <IconButton
                      aria-label="done"
                      onClick={() => saveChanges(type.id)}
                    >
                      <DoneIcon />
                    </IconButton>
                    <IconButton
                      aria-label="revert"
                      onClick={() => revert(type.id)}
                    >
                      <RevertIcon />
                    </IconButton>
                  </>
                ) : (
                  <IconButton
                    aria-label="delete"
                    onClick={() => toggleEditMode(type.id)}
                  >
                    <EditIcon />
                  </IconButton>
                )}
              </TableCell>
              {tableHeader.map(({ key, label }) => (
                <TableCell key={key}>
                  {editingRow !== type.id ? type[key] : (
                    <Input 
                      name={key}
                      value={localType[key]} 
                      onChange={handleChange}
                      placeholder={label}
                    />
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default VignetteTypesTable


const useStyles = makeStyles((theme) => ({
    leftPanel: {
      //width: '300px'
    }
}))