import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import { ButtonGroup } from '@material-ui/core';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textFieldShort: {
    marginLeft: theme.spacing(10),
    width: '15ch',
  },

textFieldLong: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(0),
    width: '25ch',
  },
  
  pageMargins: {

  	marginLeft: theme.spacing(10),
  	marginRight: theme.spacing(1),
  	marginTop: theme.spacing(2),

  },

buttonGrouping: {

  	marginLeft: theme.spacing(2),
  	marginRight: theme.spacing(1),
  	marginTop: theme.spacing(2),

  },

  cursorPointer: {
  cursor: "pointer",
  color: "#f50057"
  },

  textFieldLong: {
  marginLeft: theme.spacing(2),
    width: '25ch',
  },

    textFieldAccount: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(-5),
    width: '20ch',
  },
 
  table: {
    minWidth: 650, 
    },

}));



const StudioComp = () => {
	
	const classes = useStyles();
  toast.configure();

  const [data, setData] = useState([]);

  async function getData() {
    const result = await axios.get("http://localhost:8090/studios/getAll");
    setData(result.data);
  };  

  useEffect(() => {
    (async () => {
      await getData();
    })();
  }, []);

  const state = {
      studioShortName : "",
      studioLongName : ""
    };

  const changeShortNameText= (shortName) => {
      state.studioShortName = shortName;
  };

  const changeLongNameText= (longName) => {
      state.studioLongName = longName;
  };

  function handleSubmit(event) {
    event.preventDefault();

    if((state.studioShortName && state.studioLongName) && (state.studioShortName.trim().length > 0 && state.studioLongName.trim().length > 0)){
    const data = {
      studioShortName: state.studioShortName,
      studioLongName: state.studioLongName,
      studioCurrentRevenue: 0,
      studioPreviousRevenue: 0,
      studioTotalRevenue: 0
    }

    axios.post("http://localhost:8090/studios/add", data)
      .then(response => {
        (async () => {
          await getData();
        })();

        const textShortName = document.getElementById('short-name');
        if(textShortName != null)  
            textShortName.value = '';

        const textLongName = document.getElementById('long-name');
        if(textLongName != null) 
            textLongName.value = '';

        toast("Studio added succesfully!!!", { autoClose: 3000, position: toast.POSITION.TOP_LEFT })
      })
      .catch(error => {
        toast.error("There was a problem adding the Studio. Make sure the Studio is not already an existing one.")
        console.error('Error adding Studio', error);
      });
    }
    else {
      toast.error("Short Name and Long Name are required");
    }
  }

  function handleDelete(event, row) {
    event.preventDefault();
    const data = {
      id: row.id,
      studioShortName: row.studioShortName,
      studioLongName: row.studioLongName
    }

    axios.delete("http://localhost:8090/studios/delete", { data: data })
      .then(response => {
        (async () => {
          await getData();
        })();
        toast("Studio deleted succesfully!!!", { autoClose: 3000, position: toast.POSITION.TOP_LEFT })
      })
      .catch(error => {
        toast.error("There was a problem deleting the Studio.")
        console.error('Error deleting Studio', error);
      });
  }


	return( 

	<div className={classes.pageMargins}>


		<form noValidate autoComplete="off">
		  
		  <TextField
          label="Short Name"
          id="short-name"
          className={classes.textFieldShort}
          helperText="Short name for Studio"
          margin="dense"
          variant="outlined"
          onChange={(e) => changeShortNameText(e.target.value)}
        />

		  <TextField
          label="Long Name"
          id="long-name"
          className={classes.textFieldLong}
          helperText="Long name for Studio"
          margin="dense"
          variant="outlined"
          onChange={(e) => changeLongNameText(e.target.value)}
        />


       <ButtonGroup>
       <Button
        variant="contained"
        color="primary"
        size="small"
        className={classes.buttonGrouping}
        startIcon={<SaveIcon />}
        onClick={(e) => handleSubmit(e)}
      >
        create studio
      </Button>
	</ButtonGroup>

 <br/>
  <br/>
  <br/>
  <div style={{ maxWidth: "80%" }}>
  <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Short Name</TableCell>
            <TableCell>Long Name</TableCell>
            <TableCell align="right">Current Revenue</TableCell>
            <TableCell align="right">Previous Revenue</TableCell>
            <TableCell align="right">Total Revenue</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.studioShortName}</TableCell>
              <TableCell>{row.studioLongName}</TableCell>
              <TableCell align="right">{row.studioCurrentRevenue}</TableCell>
              <TableCell align="right">{row.studioPreviousRevenue}</TableCell>
              <TableCell align="right">{row.studioTotalRevenue}</TableCell>
              <TableCell><DeleteIcon onClick={(event) => handleDelete(event, row)} className={classes.cursorPointer}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  
  </div>

		</form>

	</div>

);
};

export default StudioComp;