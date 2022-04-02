import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';

import { ButtonGroup } from '@material-ui/core';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Backdrop from '@material-ui/core/Backdrop';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';

import { toast } from 'react-toastify';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },

  pageMargins: {
  	marginLeft: theme.spacing(10),
  	marginRight: theme.spacing(1),
  	marginTop: theme.spacing(2),

  },

  buttonGrouping: {
  	marginLeft: theme.spacing(10),
  	marginRight: theme.spacing(1),
  	marginTop: theme.spacing(2),

  },

  textFieldShort: {
    marginLeft: theme.spacing(10),
    width: '15ch',
  },

  cursorPointer: {
    cursor: "pointer",
    color: "#f50057"
  },

  updateCursorPointer: {
    cursor: "pointer",
    color: "#1CA0D7"
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
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },

}));


const DemographicGroupComp = () => {
  
  const classes = useStyles();
  toast.configure();

  const [data, setData] = useState([]);

  const [open, setOpen] = useState(false);

  const [update, setUpdate] = useState([]);

  async function getData() {
    const result = await axios.get("http://localhost:8090/demos/getall");
    setData(result.data);
  };  

  useEffect(() => {
    (async () => {
      await getData();
    })();
  }, []);

  const state = {
      demoShortName : "",
      demoLongName : ""
    };

  const updateState = {
    demoShortName: "",
    demoLongName: "",
    id: 0
  }

  const changeShortNameText= (shortName) => {
      state.demoShortName = shortName;
  };

  const changeLongNameText= (longName) => {
      state.demoLongName = longName;
  };

  function handleSubmit(event) {
    event.preventDefault();

    if((state.demoShortName && state.demoLongName) && (state.demoShortName.trim().length > 0 && state.demoLongName.trim().length > 0)){
    const data = {
      demoShortName: state.demoShortName,
      demoLongName: state.demoLongName
    }

    axios.post("http://localhost:8090/demos/add", data)
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

        toast("Demographic Groups added succesfully!!!", { autoClose: 3000, position: toast.POSITION.TOP_LEFT })
      })
      .catch(error => {
        toast.error("There was a problem adding the demographic group. Make sure the demo is not already an existing one.")
        console.error('Error adding demographic group', error);
      });
    }
    else {
      toast.error("Short Name and Long Name are required");
    }
  }


  
  function handleUpdate(event) {
    event.preventDefault();

    if((update.demoLongName && update.demoLongName) && (update.demoShortName.trim().length > 0 && update.demoLongName.trim().length > 0)){

      const textShortName = document.getElementById('short-name-update');
      if(textShortName)  
          update.demoShortName = textShortName.value;
  
      const textLongName = document.getElementById('long-name-update');
      if(textLongName) 
          update.demoLongName = textLongName.value;

    const data = {
      id: update.id,
      demoShortName: update.demoShortName,
      demoLongName: update.demoLongName,
    }

    axios.put("http://localhost:8090/demos/update", data)
      .then(response => {
        (async () => {
          await getData();
        })();

        const textShortName = document.getElementById('short-name-update');
        if(textShortName != null)  
            textShortName.value = '';

        const textLongName = document.getElementById('long-name-update');
        if(textLongName != null) 
            textLongName.value = '';

        toast("Demographic Groups updated succesfully!!!", { autoClose: 3000, position: toast.POSITION.TOP_LEFT })
        handleClose();
      })
      .catch(error => {
        toast.error("There was a problem updating the demographic group.")
        console.error('Error updating demographic group', error);
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
      demoShortName: row.demoShortName,
      demoLongName: row.demoLongName
    }

    axios.delete("http://localhost:8090/demos/delete", { data: data })
      .then(response => {
        (async () => {
          await getData();
        })();
        toast("Demographic Groups deleted succesfully!!!", { autoClose: 3000, position: toast.POSITION.TOP_LEFT })
      })
      .catch(error => {
        toast.error("There was a problem deleting the demographic group.")
        console.error('Error deleting demographic group', error);
      });
  }

  const handleOpen = (event, row) => {
    update.id = row.id;
    update.demoShortName =  row.demoShortName;
    update.demoLongName = row.demoLongName;
    setUpdate(update);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

	return( 

	<div className={classes.pageMargins}>
	<p><b>Note: </b>
	The number of accounts is determined by the number of accounts created for this demo. To add accounts 
	to this demographic group navigate to the 'Accounts' section.
	<br/><br/>

	</p>


		<form noValidate autoComplete="off">
		  
		  <TextField
          label="Short Name"
          id="short-name"
          className={classes.textFieldShort}
          helperText="Short Name for Demographic Group"
          margin="dense"
          variant="outlined"
          onChange={(e) => changeShortNameText(e.target.value)}
        />

		  <TextField
          label="Long Name"
          id="long-name"
          className={classes.textFieldLong}
          helperText="Long Name for Demographic Group"
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
        create group
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
            <TableCell align="right">Current Spending</TableCell>
            <TableCell align="right">Previous Spending</TableCell>
            <TableCell align="right">Total Spending</TableCell>
            <TableCell align="right">Number of Accounts</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.demoShortName}</TableCell>
              <TableCell>{row.demoLongName}</TableCell>
              <TableCell align="right">{row.demoCurrentSpending}</TableCell>
              <TableCell align="right">{row.demoPreviousSpending}</TableCell>
              <TableCell align="right">{row.demoTotalSpending}</TableCell>
              <TableCell align="right">{row.demoAccounts}</TableCell>
              <TableCell><DeleteIcon onClick={(event) => handleDelete(event, row)} className={classes.cursorPointer}/></TableCell>
              <TableCell><UpdateIcon onClick={(event) => handleOpen(event,row)} className={classes.updateCursorPointer}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

  </div>

		</form>


    <div>
      <Modal
        aria-labelledby="update-demographic"
        aria-describedby="update-demographic-group"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>

          <p><b>Note: </b>
            Update a demographic group's long name. To exit out the modal click any where outside.
          <br/>
          </p>


                <TextField
                  label="Short Name"
                  id="short-name-update"
                  className={classes.textFieldShort}
                  helperText="Short Name for Demographic Group"
                  margin="dense"
                  variant="outlined"
                  value={update.demoShortName}
                  disabled={true}
                />

                <TextField
                label="Long Name"
                id="long-name-update"
                className={classes.textFieldLong}
                helperText="Long Name for Demographic Group"
                margin="dense"
                variant="outlined"
              />

                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    className={classes.buttonGrouping}
                    startIcon={<SaveIcon />}
                    onClick={(e) => handleUpdate(e)}
                  >
                    update group
                </Button>

          </div>
        </Fade>
      </Modal>
    </div>
	</div>
  );
};


export default DemographicGroupComp;