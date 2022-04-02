import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import SvgIcon from '@material-ui/core/SvgIcon';
import HomeIcon from '@material-ui/icons/Home';
import { ButtonGroup } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css'
import { Checkbox } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';

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

  formControl: {
    margin: theme.spacing(1),
    marginTop: theme.spacing(0),
    minWidth: 120,
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

    checkBoxButton: {
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(2),

    },

    home: {
    fontSize: "large",

    },

}));



const AccountComp = () => {
  
  const classes = useStyles();
  toast.configure();

  const [data, setData] = useState([]);

 const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    changeActiveText(checked);

  };

  async function getData() {
    const result = await axios.get("http://localhost:8090/account/getall");
    setData(result.data);
  };  

  useEffect(() => {
    (async () => {
      await getData();
    })();
  }, []);

  const state = {
      name: "",
      demoShortName: "",
      active: true
    };

  const changeActiveText= (act) => {
      state.active = act;
      console.log("state.active: " + state.active);
  };



    const changeNameText= (shortName) => {
      state.name = shortName;
      console.log("name: " + state.name);
  };

  const changeDemoShortNameText= (demoName) => {
      state.demoShortName = demoName;
      console.log("demoShortName: " + state.demoShortName);
  };




  function handleSubmit(event) {
    event.preventDefault();

    const textShortName = document.getElementById('account-Name');
      if(textShortName && textShortName.value)
          state.name = textShortName.value;

      const textDemoName = document.getElementById('account-DemoShortName');
      if(textDemoName && textDemoName.value) 
          state.demoShortName = textDemoName.value;


    //TODO: Possible remove state.active from this statement and then just do... a check button?
    if((state.name && state.demoShortName )  && (state.name.trim().length > 0 && state.demoShortName.trim().length > 0)){
    

    const data = {
      name: state.name,
      demoShortName: state.demoShortName,
      active: checked
    }

    axios.post("http://localhost:8090/account/add", data)
      .then(response => {
        (async () => {
          await getData();
        })();

        const textShortName = document.getElementById('account-Name');
        if(textShortName != null)  
            textShortName.value = '';

        const textDemoName = document.getElementById('account-DemoShortName');
        if(textDemoName != null) 
            textDemoName.value = '';

        toast("Account added succesfully!!!", { autoClose: 3000, position: toast.POSITION.TOP_LEFT })
      })
      .catch(error => {
        toast.error("There was a problem adding the account. Make sure the account is not already an existing one.")
        console.error('Error adding account', error);
      });
    }
    else {
      toast.error("All text fields are required");
    }
  }

  function handleDelete(event, row) {
    event.preventDefault();
    const data = {
      id: row.id,
      name: row.name,
      demoShortName: row.demoShortName,
      active: row.active
    }

    axios.delete("http://localhost:8090/account/delete", { data: data })
      .then(response => {
        (async () => {
          await getData();
        })();
        toast("Account deleted succesfully!!!", { autoClose: 3000, position: toast.POSITION.TOP_LEFT })
      })
      .catch(error => {
        toast.error("There was a problem deleting the account.")
        console.error('Error deleting account', error);
      });
  }

  function handleArchive(event) {
  event.preventDefault();

    axios.post("http://localhost:8090/account/archive")
    .then(response => {
      (async () => {
        await getData();
      })();
      toast("Account archived succesfully!!!", { autoClose: 3000, position: toast.POSITION.TOP_LEFT })
    })
    .catch(error => {
      toast.error("There was a problem archiving the account.")
      console.error('Error archiving account', error);
    });

  }

  return( 

  <div className={classes.pageMargins}>


    <form noValidate autoComplete="off">
      
      <TextField
          label="Account Name"
          id="account-Name"
          className={classes.textFieldShort}
          helperText="Name for account"
          margin="dense"
          variant="outlined"
          onChange={(e) => changeNameText(e.target.value)}
        />

      <TextField
          label="Demographic Name"
          id="account-DemoShortName"
          className={classes.textFieldLong}
          helperText="Demographic name for account"
          margin="dense"
          variant="outlined"
          onChange={(e) => changeDemoShortNameText(e.target.value)}
        />



      <FormControlLabel
        labelPlacement="top"
        control={
          <Checkbox
            checked={checked}
            onChange={handleChange}
            name="activeAccountCheckBox"
            color="primary"
            className ={classes.checkBoxButton}
          />
        }
        label="Mark Account as active"
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
        create account
      </Button>
      <Button
        variant="contained"
        color="primary"
        size="small"
        className={classes.buttonGrouping}
        startIcon={<HomeIcon />}
        onClick={(e) => handleArchive(e)}
      >
        archive accounts
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
            <TableCell>Name</TableCell>
            <TableCell>Demographic Name</TableCell>
            <TableCell align="right">Active</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.demoShortName}</TableCell>
              <TableCell align="right">{row.active ? 'Y' : 'N'}</TableCell>
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

export default AccountComp;