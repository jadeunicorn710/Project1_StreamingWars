import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import { ButtonGroup } from '@material-ui/core';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import UpdateIcon from '@material-ui/icons/Update';

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
  textField: {
    marginLeft: theme.spacing(2),
    width: '25ch',
  },
  textFieldShort: {
    marginLeft: theme.spacing(10),
    width: '15ch',
  },

  textFieldPrice: {
    marginLeft: theme.spacing(2),
    width: '15ch',
  },

    textFieldCR: {
    marginLeft: theme.spacing(2),
    width: '15ch',
  },

  textFieldPR: {
    marginLeft: theme.spacing(2),
    width: '15ch',
  },

  textFieldTR: {
    marginLeft: theme.spacing(2),
    width: '15ch',
  },

  textFieldLicense: {
    marginLeft: theme.spacing(2),
    width: '15ch',
  },

    textFieldIndex: {
    marginLeft: theme.spacing(2),
    width: '15ch',
  },


   buttonGrouping: {
  	marginLeft: theme.spacing(10),
  	marginRight: theme.spacing(1),
  	marginTop: theme.spacing(2),

  },
  pageMargins: {
    marginLeft: theme.spacing(5),
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

  textField: {
  marginLeft: theme.spacing(2),
    width: '25ch',
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



const StreamingServiceComp = () => {
	
	const classes = useStyles();
  toast.configure();

  const [data, setData] = useState([]);
  const [update, setUpdate] = useState([]);
  const [open, setOpen] = useState(false);

  async function getData() {
    const result = await axios.get("http://localhost:8090/streamingservice/getall");
    setData(result.data);
  };  

  useEffect(() => {
    (async () => {
      await getData();
    })();
  }, []);

  const state = {
      streamShortName : "",
      streamLongName : "",
      streamSubscription: "",
      streamCurrentRevenue: "",
      streamPreviousRevenue: "",
      streamTotalRevenue: "",
      streamLicensing: "",
      streamIndex: "",
    };

  const updateState = {
    id: 0,
    streamShortName: "",
    streamLongName: "",
    streamSubscription: "",
    streamCurrentRevenue: "",
    streamPreviousRevenue: "",
    streamTotalRevenue: "",
    streamLicensing: "",
    streamIndex: "",
  }

  const changeShortNameText= (shortName) => {
      state.streamShortName = shortName;
      console.log("streamShortName: " + state.streamShortName);
  };

  const changeLongNameText= (longName) => {
      state.streamLongName = longName;
      console.log("streamLongName: " + state.streamLongName);
  };

  const changeSubscriptionText= (subscription) => {
      state.streamSubscription = subscription;
      console.log("streamSubscription: " + state.streamSubscription);
  };

  const changeSubscriptionFee= (fee) => {
      state.streamSubscription = fee;
      console.log("streamSubscription: " + state.streamSubscription);
  };

  function handleSubmit(event) {
    event.preventDefault();

    if((state.streamShortName && state.streamLongName && state.streamSubscription) && (state.streamShortName.trim().length > 0 && state.streamLongName.trim().length > 0 && state.streamSubscription.trim().length > 0 )){
    const data = {
      streamShortName: state.streamShortName,
      streamLongName: state.streamLongName,
      streamSubscription: state.streamSubscription,
      streamCurrentRevenue: 0,
      streamPreviousRevenue: 0,
      streamTotalRevenue: 0,
      streamLicensing: 0,
      streamIndex: 0
    }

    axios.post("http://localhost:8090/streamingservice/add", data)
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

        const textSubscription = document.getElementById('subscription-name');
        if(textSubscription != null) 
            textSubscription.value = '';

        toast("Streaming Service added succesfully!!!", { autoClose: 3000, position: toast.POSITION.TOP_LEFT })
      })
      .catch(error => {
        toast.error("There was a problem adding the streaming service. Make sure the streaming service is not already an existing one.")
        console.error('Error adding streaming service', error);
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
      streamShortName: row.streamShortName,
      streamLongName: row.streamLongName,
      streamSubscription: row.streamSubscription
    }

    axios.delete("http://localhost:8090/streamingservice/delete", { data: data })
      .then(response => {
        (async () => {
          await getData();
        })();
        toast("Streaming service deleted succesfully!!!", { autoClose: 3000, position: toast.POSITION.TOP_LEFT })
      })
      .catch(error => {
        toast.error("There was a problem deleting the streaming service.")
        console.error('Error deleting streaming service', error);
      });
  }

  function handleUpdate(event) {
    event.preventDefault();

    if((update.streamLongName && update.streamLongName) && (update.streamShortName.trim().length > 0 && update.streamLongName.trim().length > 0)){

      const textShortName = document.getElementById('short-name-update');
      if(textShortName)  
          update.streamShortName = textShortName.value;
  
      const textLongName = document.getElementById('long-name-update');
      if(textLongName) 
          update.streamLongName = textLongName.value;
      
      const streamSubscription = document.getElementById('streaming-fee-update');
      if(streamSubscription)
          update.streamSubscription = streamSubscription.value;

    const data = {
      id: update.id,
      streamShortName: update.streamShortName,
      streamLongName: update.streamLongName,
      streamSubscription: update.streamSubscription,
      streamCurrentRevenue: update.streamCurrentRevenue,
      streamPreviousRevenue:update.streamPreviousRevenue,
      streamTotalRevenue: update.streamTotalRevenue,
      streamLicensing: update.streamLicensing,
      streamIndex:update.streamIndex,
    }

    axios.put("http://localhost:8090/streamingservice/update", data)
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

        const streamSubscription = document.getElementById('streaming-fee-update');
        if(streamSubscription != null) 
            streamSubscription.value = '';

        toast("Streaming Groups updated succesfully!!!", { autoClose: 3000, position: toast.POSITION.TOP_LEFT })
        handleClose();
      })
      .catch(error => {
        toast.error("There was a problem updating the Streaming group.")
        console.error('Error updating demographic group', error);
      });
    }
    else {
      toast.error("Short Name and Long Name are required");
    }
  }
  
  const handleOpen = (event, row) => {
    update.id = row.id;
    update.streamShortName = row.streamShortName;
    update.streamLongName = row.streamLongName;
    update.streamSubscription = row.streamSubscription;
    update.streamCurrentRevenue = row.streamCurrentRevenue;
    update.streamPreviousRevenue= row.streamPreviousRevenue;
    update.streamTotalRevenue= row.streamTotalRevenue;
    update.streamLicensing= row.streamLicensing;
    update.streamIndex= row.streamIndex;
    setUpdate(update);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

	return( 

	<div className={classes.pageMargins}>


		<form noValidate autoComplete="off">
		  
		  <TextField
          label="Short Name"
          id="short-name"
          className={classes.textFieldShort}
          helperText="Short name for the streaming service"
          margin="dense"
          variant="outlined"
          onChange={(e) => changeShortNameText(e.target.value)}

        />

		  <TextField
          label="Long Name"
          id="long-name"
          className={classes.textField}
          helperText="Long name for the streaming service"
          margin="dense"
          variant="outlined"
          onChange={(e) => changeLongNameText(e.target.value)}

        />

        <TextField
          label="Price"
          id="subscription-price"
          className={classes.textFieldPrice}
          helperText="Subscription price for the streaming service"
          margin="dense"
          variant="outlined"
          onChange={(e) => changeSubscriptionText(e.target.value)}
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
        Create Stream service
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
            <TableCell align="right">Subscription</TableCell>
            <TableCell align="right">Current Revenue</TableCell>
            <TableCell align="right">Previous Revenue</TableCell>
            <TableCell align="right">Total Revenue</TableCell>
            <TableCell align="right">Licensing</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.streamShortName}</TableCell>
              <TableCell>{row.streamLongName}</TableCell>
              <TableCell align="right">{row.streamSubscription}</TableCell>
              <TableCell align="right">{row.streamCurrentRevenue}</TableCell>
              <TableCell align="right">{row.streamPreviousRevenue}</TableCell>
              <TableCell align="right">{row.streamTotalRevenue}</TableCell>
              <TableCell align="right">{row.streamLicensing}</TableCell>
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
            Update a Streaming group's long name and fee. To exit out the modal click any where outside.
          <br/>
          </p>


                <TextField
                  label="Short Name"
                  id="short-name-update"
                  className={classes.textFieldShort}
                  helperText="Short Name for Streaming Group"
                  margin="dense"
                  variant="outlined"
                  value={update.streamShortName}
                  disabled={true}
                />

                <TextField
                label="Long Name"
                id="long-name-update"
                className={classes.textFieldLong}
                helperText="Long Name for Streaming Group"
                margin="dense"
                variant="outlined"
              />
                <TextField
                label="Streaming Fee"
                id="streaming-fee-update"
                className={classes.textFieldPrice}
                helperText="Streaming Fee for Streaming Group"
                margin="dense"
                variant="outlined"
                onChange={(e) => changeSubscriptionFee(e.target.value)}
              />
                <TextField
                label="Current Revenue"
                id="curr-rev-update"
                className={classes.textFieldCR}
                helperText="Current Revenue for Streaming Group"
                margin="dense"
                variant="outlined"
                value={update.streamCurrentRevenue}
                disabled={true}
              />
                <TextField
                label="Previous Revenue"
                id="prev-rev-update"
                className={classes.textFieldPR}
                helperText="Previous Revenue for Streaming Group"
                margin="dense"
                variant="outlined"
                value={update.streamPreviousRevenue}
                disabled={true}
              />

                <TextField
                label="Total Revenue"
                id="tot-rev-update"
                className={classes.textFieldTR}
                helperText="Total Revenue for Streaming Group"
                margin="dense"
                variant="outlined"
                value={update.streamTotalRevenue}
                disabled={true}
              />
                <TextField
                label="Licensing"
                id="lice-fee-update"
                className={classes.textFieldLicense}
                helperText="Licensing for Streaming Group"
                margin="dense"
                variant="outlined"
                value={update.streamLicensing}
                disabled={true}
              />
              <TextField
                label="Index"
                id="index-update"
                className={classes.textFieldIndex}
                helperText="Index for Streaming Group"
                margin="dense"
                variant="outlined"
                value={update.streamIndex}
                disabled={true}
              />
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    className={classes.buttonGrouping}
                    startIcon={<SaveIcon />}
                    onClick={(e) => handleUpdate(e)}
                  >
                    update streaming service
                </Button>

          </div>
        </Fade>
      </Modal>
    </div>

	</div>

);
};

export default StreamingServiceComp;