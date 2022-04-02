import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
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

import { toast } from 'react-toastify';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  pageMargins: {
    marginLeft: theme.spacing(10),
  	marginRight: theme.spacing(1),

  },

  textFieldLeft: {
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(0),
    width: '25ch',
  },

	textFieldRight: {
	marginLeft: theme.spacing(5),
	marginRight: theme.spacing(-5),
	width: '25ch',
	},
	
	textFieldDemo: {
	marginLeft: theme.spacing(5),
	width: '15ch',
	},

	textFieldPercent: {
	marginLeft: theme.spacing(2),
	width: '10ch',
	},

	textFieldStream: {
	marginLeft: theme.spacing(2),
	width: '16ch',
	},


	textFieldName: {
	marginLeft: theme.spacing(2),
	width: '20ch',
	},

	textFieldYear: {
	marginLeft: theme.spacing(2),
	width: '10ch',
	},

	formControl: {
    margin: theme.spacing(1),
    marginTop: theme.spacing(0),
    minWidth: 120,
  },

   buttonGrouping: {
    marginLeft: theme.spacing(10),
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


const WatchEventComp = () => {
	
	const classes = useStyles();
  toast.configure();

  const[data, setData] = useState([]);

  async function getData() {
  const result = await axios.get("http://localhost:8090/watchEvent/getall");
  setData(result.data);
};  

  useEffect(() => {
    (async () => {
      await getData();
    })();
  }, []);

  const state = {
    watchDemoGroup: "",
    watchPercentage: "",
    watchStream: "",
    watchEventName: "",
    watchEventYear: ""
    };


  const changeWatchDemoGroupText = (DemoGroup) => {
      state.watchDemoGroup = DemoGroup;
  };

  const changeWatchPercentageText = (watchPercentage) => {
      state.watchPercentage = watchPercentage;
  };

  const changeWatchStreamText = (watchStream) => {
      state.watchStream = watchStream;
  };

  const changeWatchEventNameText = (watchEventName) => {
      state.watchEventName = watchEventName;
  };

  const changeWatchEventYearText = (watchEventYear) => {
      state.watchEventYear = watchEventYear;
  };

  function handleSubmit(event) {
    event.preventDefault();

    if((state.watchDemoGroup && state.watchPercentage && state.watchStream && state.watchEventName && state.watchEventYear) && (state.watchDemoGroup.trim().length > 0 && state.watchPercentage.trim().length > 0 && state.watchStream.trim().length > 0 && state.watchEventName.trim().length > 0&& state.watchEventYear.trim().length > 0 )){
    const data = {

      watchDemoGroup: state.watchDemoGroup,
      watchPercentage: state.watchPercentage,
      watchStream: state.watchStream,  
      watchEventName: state.watchEventName,
      watchEventYear: state.watchEventYear
    }

    axios.post("http://localhost:8090/watchEvent/add", data)
      .then(response => {
        (async () => {
          await getData();
        })();

        const textDemoGroup = document.getElementById('watch-Demo-Group');
        if(textDemoGroup != null)  
            textDemoGroup.value = '';

        const textPercentage = document.getElementById('watch-Percentage');
        if(textPercentage != null) 
            textPercentage.value = '';
              
        const textStream = document.getElementById('watch-Stream');
        if(textStream != null)  
            textStream.value = '';

        const textEventName = document.getElementById('watch-Event-Name');
        if(textEventName != null) 
            textEventName.value = '';

        const textEventYear = document.getElementById('watch-Event-Year');
        if(textEventYear != null)  
            textEventYear.value = '';

        toast("Watch Event added succesfully!!!", { autoClose: 3000, position: toast.POSITION.TOP_LEFT })
      })
      .catch(error => {
        toast.error("There was a problem adding the watch event.")
        console.error('Error adding watch event', error);
      });
    }
    else {
      toast.error("All text fields are required!");
    }
  }


  function handleDelete(event, row) {
    event.preventDefault();
    const data = {
      id: row.id,
      watchDemoGroup: row.watchDemoGroup,
      watchPercentage: row.watchPercentage,
      watchStream: row.watchStream,  
      watchEventName: row.watchEventName,
      watchEventYear: row.watchEventYear
    }

    axios.delete("http://localhost:8090/watchEvent/delete", { data: data })
      .then(response => {
        (async () => {
          await getData();
        })();
        toast("Watch Event Succesfully!!!", { autoClose: 3000, position: toast.POSITION.TOP_LEFT })
      })
      .catch(error => {
        toast.error("There was a problem deleting the Watch Event.")
        console.error('Error deleting Watch Event', error);
      });
  }

	return( 

	<div className={classes.pageMargins}>


		<form noValidate autoComplete="off">
		  
		  <TextField
          label="Demo Group"
          id="watch-Demo-Group"
          className={classes.textFieldDemo}
          helperText="Demograhic Group"
          margin="dense"
          variant="outlined"
          onChange={(e) => changeWatchDemoGroupText(e.target.value)}
        />

		  <TextField
          label="Percent"
          id="watch-Percentage"
          className={classes.textFieldPercent}
          helperText="Percentage"
          margin="dense"
          variant="outlined"
          onChange={(e) => changeWatchPercentageText(e.target.value)}
        />
		  <TextField
          label="Streaming Service"
          id="watch-Stream"
          className={classes.textFieldStream}
          helperText="Short name for streaming service"
          margin="dense"
          variant="outlined"
          onChange={(e) => changeWatchStreamText(e.target.value)}
        />

		  <TextField
          label="Name"
          id="watch-Event-Name"
          className={classes.textFieldName}
          helperText="Event name"
          margin="dense"
          variant="outlined"
          onChange={(e) => changeWatchEventNameText(e.target.value)}
        />

		  <TextField
          label="Year"
          id="watch-Event-Year"
          className={classes.textFieldYear}
          helperText="Year produced"
          margin="dense"
          variant="outlined"
          onChange={(e) => changeWatchEventYearText(e.target.value)}
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
        Watch Event
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
            <TableCell>Demographic Group</TableCell>
            <TableCell>Watch Percentage</TableCell>
            <TableCell align="right">Stream Service</TableCell>
            <TableCell align="right">Event Name</TableCell>
            <TableCell align="right">Event Year</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.watchDemoGroup}</TableCell>
              <TableCell>{row.watchPercentage}</TableCell>
              <TableCell align="right">{row.watchStream}</TableCell>
              <TableCell align="right">{row.watchEventName}</TableCell>
              <TableCell align="right">{row.watchEventYear}</TableCell>
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

export default WatchEventComp;